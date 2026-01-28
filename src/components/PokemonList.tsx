"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";
import { PokemonFilters } from "./PokemonFilters";
import { MasterBallSpinner } from "./MasterBallSpinner";
import { useFilters } from "@/contexts/FilterContext";
import {
  fetchAllPokemon,
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  getAllEvolutionNames,
} from "@/lib/api";
import { getPokemonIdFromUrl, getGenerationFromId } from "@/lib/generationMap";
import type { PokemonType } from "@/types/pokemon";

const ITEMS_PER_PAGE = 50; // Show 50 Pokemon per page

export function PokemonList() {
  // Use global filter state
  const {
    selectedType,
    selectedGeneration,
    searchQuery,
    currentPage,
    setSelectedType,
    setSelectedGeneration,
    setSearchQuery,
    setCurrentPage,
  } = useFilters();

  // Debounce search query
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch all Pokemon (just the list with names and URLs)
  // First, fetch only the first page for immediate display
  const {
    data: initialPokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["initial-pokemon"],
    queryFn: () => fetchPokemonList(ITEMS_PER_PAGE * 2, 0), // Load 2 pages initially
    staleTime: 10 * 60 * 1000,
  });

  // Then, fetch all Pokemon in background (lower priority)
  const { data: allPokemon } = useQuery({
    queryKey: ["all-pokemon"],
    queryFn: fetchAllPokemon,
    staleTime: 10 * 60 * 1000,
    // Only start loading after initial load is complete
    enabled: !!initialPokemon,
  });

  // Use all Pokemon if available, otherwise use initial Pokemon
  const pokemonList = allPokemon || initialPokemon;

  // Enrich Pokemon list with IDs and generation info (no API calls needed!)
  const enrichedPokemon = useMemo(() => {
    if (!pokemonList?.results) return [];

    return pokemonList.results.map((pokemon) => {
      const id = getPokemonIdFromUrl(pokemon.url);
      const genInfo = getGenerationFromId(id);
      return {
        ...pokemon,
        id,
        generation: genInfo.generation,
        generationName: genInfo.name,
      };
    });
  }, [pokemonList]);

  // For type filtering, we need to fetch details
  // We'll fetch details in batches as needed
  const { data: pokemonDetailsMap } = useQuery({
    queryKey: ["pokemon-details-map", selectedType],
    queryFn: async () => {
      if (!selectedType || !enrichedPokemon.length) return new Map();

      const detailsMap = new Map();

      // Fetch details in batches to check types
      const batchSize = 50;
      for (let i = 0; i < enrichedPokemon.length; i += batchSize) {
        const batch = enrichedPokemon.slice(i, i + batchSize);
        const detailsPromises = batch.map((p) => fetchPokemonDetails(p.url));
        const batchDetails = await Promise.all(detailsPromises);

        batchDetails.forEach((details, idx) => {
          detailsMap.set(batch[idx].name, details);
        });
      }

      return detailsMap;
    },
    enabled: !!selectedType && enrichedPokemon.length > 0,
    staleTime: 10 * 60 * 1000,
  });

  // First, filter by name quickly (no API calls)
  const nameFilteredPokemon = useMemo(() => {
    if (!debouncedSearch || !enrichedPokemon.length) return enrichedPokemon;

    const query = debouncedSearch.toLowerCase();
    return enrichedPokemon.filter((p) => p.name.toLowerCase().includes(query));
  }, [enrichedPokemon, debouncedSearch]);

  // Then, fetch evolution chains ONLY for name-matched Pokemon (much smaller set)
  const { data: evolutionMap } = useQuery({
    queryKey: ["evolution-map", debouncedSearch, nameFilteredPokemon.length],
    queryFn: async () => {
      if (!debouncedSearch || nameFilteredPokemon.length === 0) {
        return new Map<string, string[]>();
      }

      const evolutionData = new Map<string, string[]>();

      // Only process the filtered Pokemon (much smaller number)
      const batchSize = 20;
      for (let i = 0; i < nameFilteredPokemon.length; i += batchSize) {
        const batch = nameFilteredPokemon.slice(i, i + batchSize);

        const speciesPromises = batch.map(async (p) => {
          try {
            const details = await fetchPokemonDetails(p.url);
            const species = await fetchPokemonSpecies(details.species.url);
            const evolutionChain = await fetchEvolutionChain(
              species.evolution_chain.url
            );
            const evolutionNames = getAllEvolutionNames(evolutionChain);

            return { name: p.name, evolutionNames };
          } catch (error) {
            return { name: p.name, evolutionNames: [p.name] };
          }
        });

        const batchResults = await Promise.all(speciesPromises);
        batchResults.forEach(({ name, evolutionNames }) => {
          evolutionData.set(name, evolutionNames);
        });
      }

      return evolutionData;
    },
    enabled:
      !!debouncedSearch &&
      nameFilteredPokemon.length > 0 &&
      nameFilteredPokemon.length < 100,
    staleTime: 30 * 60 * 1000, // 30 minutes cache
  });

  // Filter Pokemon based on selected filters
  const filteredPokemon = useMemo(() => {
    if (!enrichedPokemon.length) return [];

    let filtered = [...enrichedPokemon];

    // Filter by generation (no API call needed!)
    if (selectedGeneration) {
      filtered = filtered.filter((p) => p.generation === selectedGeneration);
    }

    // Filter by type (requires details)
    if (selectedType && pokemonDetailsMap) {
      filtered = filtered.filter((p) => {
        const details = pokemonDetailsMap.get(p.name);
        return details?.types.some(
          (t: PokemonType) => t.type.name === selectedType
        );
      });
    }

    // Filter by search query (optimized two-step approach)
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();

      // Step 1: Quick name match (no API calls)
      const nameMatches = new Set(
        filtered
          .filter((p) => p.name.toLowerCase().includes(query))
          .map((p) => p.name)
      );

      // Step 2: Evolution match (only if we have evolution data)
      if (evolutionMap && evolutionMap.size > 0) {
        // Find Pokemon whose evolutions match the search
        enrichedPokemon.forEach((p) => {
          const evolutions = evolutionMap.get(p.name) || [];
          if (evolutions.some((evo) => evo.toLowerCase().includes(query))) {
            // Add all Pokemon in this evolution chain
            evolutions.forEach((evo) => nameMatches.add(evo));
          }
        });
      }

      // Filter to only include matches
      filtered = filtered.filter((p) => nameMatches.has(p.name));
    }

    // Already sorted by ID
    return filtered;
  }, [
    enrichedPokemon,
    selectedGeneration,
    selectedType,
    debouncedSearch,
    pokemonDetailsMap,
    evolutionMap,
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPagePokemon = filteredPokemon.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <MasterBallSpinner size="h-16 w-16" />
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Cargando Pokémon...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        <p className="text-xl">Error al cargar los Pokémon</p>
        <p className="text-sm mt-2">{(error as Error).message}</p>
      </div>
    );
  }

  const isLoadingTypeFilter = selectedType && !pokemonDetailsMap;
  const isLoadingSearch =
    debouncedSearch &&
    debouncedSearch !== "" &&
    !evolutionMap &&
    nameFilteredPokemon.length > 0 &&
    nameFilteredPokemon.length < 100;
  const isTyping = searchQuery !== debouncedSearch;
  const isLoadingMore = initialPokemon && !allPokemon; // Background loading

  return (
    <div>
      {isLoadingMore && (
        <div className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <MasterBallSpinner size="h-5 w-5" />
          <span className="text-sm font-medium">Cargando más Pokémon...</span>
        </div>
      )}

      <PokemonFilters
        selectedType={selectedType}
        selectedGeneration={selectedGeneration}
        searchQuery={searchQuery}
        onTypeChange={setSelectedType}
        onGenerationChange={setSelectedGeneration}
        onSearchChange={setSearchQuery}
      />

      {isTyping && (
        <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="animate-pulse">
              <MasterBallSpinner size="h-5 w-5" />
            </div>
            <p className="text-purple-800 dark:text-purple-200">
              Escribiendo...
            </p>
          </div>
        </div>
      )}

      {(isLoadingTypeFilter || isLoadingSearch) && !isTyping && (
        <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MasterBallSpinner size="h-5 w-5" />
            <p className="text-purple-800 dark:text-purple-200">
              {isLoadingTypeFilter &&
                "Cargando Pokémon del tipo seleccionado..."}
              {isLoadingSearch && "Buscando evoluciones relacionadas..."}
            </p>
          </div>
        </div>
      )}

      {!isLoadingTypeFilter && !isLoadingSearch && !isTyping && (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                Mostrando{" "}
                <span className="font-bold">
                  {startIndex + 1}-{Math.min(endIndex, filteredPokemon.length)}
                </span>{" "}
                de <span className="font-bold">{filteredPokemon.length}</span>{" "}
                Pokémon
                {(selectedType || selectedGeneration || debouncedSearch) && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {" "}
                    (filtrado de {enrichedPokemon.length})
                  </span>
                )}
              </p>
              {debouncedSearch && nameFilteredPokemon.length >= 100 && (
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  💡 Búsqueda de evoluciones limitada. Refina tu búsqueda para
                  mejores resultados.
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-red-600 hover:to-red-700 transition-all font-bold shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none text-sm sm:text-base"
                >
                  ← Anterior
                </button>

                <div className="flex gap-1 flex-wrap justify-center">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-gray-500"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page as number);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`px-3 sm:px-4 py-2 rounded-xl transition-all font-bold text-sm sm:text-base ${
                          currentPage === page
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg transform scale-110"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 shadow-sm hover:shadow-md transform hover:scale-105"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all font-bold shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none text-sm sm:text-base"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {currentPagePokemon.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
              <button
                onClick={() => {
                  setCurrentPage(Math.max(1, currentPage - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                ← Anterior
              </button>

              <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => {
                  setCurrentPage(Math.min(totalPages, currentPage + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}

          {currentPagePokemon.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No se encontraron Pokémon con los filtros seleccionados
              </p>
              <button
                onClick={() => {
                  setSelectedType("");
                  setSelectedGeneration("");
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
