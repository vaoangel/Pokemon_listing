"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGenerations, fetchTypes } from "@/lib/api";
import { getGenerationName } from "@/lib/generationMap";
import { CustomDropdown } from "./CustomDropdown";

interface PokemonFiltersProps {
  selectedType: string;
  selectedGeneration: string;
  searchQuery: string;
  onTypeChange: (type: string) => void;
  onGenerationChange: (generation: string) => void;
  onSearchChange: (query: string) => void;
}

export function PokemonFilters({
  selectedType,
  selectedGeneration,
  searchQuery,
  onTypeChange,
  onGenerationChange,
  onSearchChange,
}: PokemonFiltersProps) {
  const { data: generationsData } = useQuery({
    queryKey: ["generations"],
    queryFn: fetchGenerations,
    staleTime: Infinity, // Generations don't change
  });

  const { data: typesData } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
    staleTime: Infinity, // Types don't change
  });

  return (
    <div className="mb-6 sm:mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-red-200 dark:border-blue-800">
      <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text pokemon-gradient mb-4">
        Buscador y Filtros
      </h2>

      {/* Search Box */}
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
        >
          Buscar Pokémon (incluye evoluciones)
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Ej: Pikachu, Charizard..."
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Generation Filter */}
        <CustomDropdown
          id="generation-filter"
          label="Generación"
          value={selectedGeneration}
          onChange={onGenerationChange}
          placeholder="Todas las generaciones"
          options={[
            ...(generationsData?.results.map((gen) => ({
              value: gen.name,
              label: getGenerationName(gen.name),
            })) || []),
          ]}
        />

        {/* Type Filter */}
        <CustomDropdown
          id="type-filter"
          label="Tipo"
          value={selectedType}
          onChange={onTypeChange}
          placeholder="Todos los tipos"
          options={[
            ...(typesData?.results
              .filter((type) => !["unknown", "shadow", "stellar"].includes(type.name))
              .map((type) => ({
                value: type.name,
                label: type.spanishName || type.name,
              })) || []),
          ]}
        />
      </div>

      {(selectedType || selectedGeneration || searchQuery) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              onTypeChange("");
              onGenerationChange("");
              onSearchChange("");
            }}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold transition-all text-sm shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Limpiar todo
          </button>
          {searchQuery && (
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-blue-900 dark:to-purple-900 text-yellow-800 dark:text-blue-200 rounded-xl text-sm font-semibold border-2 border-yellow-300 dark:border-blue-700">
              Buscando: <strong>{searchQuery}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
