"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from "@/lib/api";
import { getGenerationFromId } from "@/lib/generationMap";
import { getTypeClass, translateType } from "@/lib/typeUtils";
import type { EvolutionLink } from "@/types/pokemon";
import { MasterBallSpinner } from "./MasterBallSpinner";

interface PokemonDetailPageProps {
  name: string;
}

export function PokemonDetailPage({ name }: PokemonDetailPageProps) {
  const router = useRouter();

  const { data: details, isLoading: detailsLoading } = useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: () =>
      fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${name}`),
  });

  const { data: species } = useQuery({
    queryKey: ["pokemon-species", name],
    queryFn: () => fetchPokemonSpecies(details?.species.url || ""),
    enabled: !!details?.species.url,
  });

  const { data: evolutionChain } = useQuery({
    queryKey: ["evolution-chain", name],
    queryFn: () => fetchEvolutionChain(species?.evolution_chain.url || ""),
    enabled: !!species?.evolution_chain.url,
  });

  // Get all evolutions as a flat list
  const getEvolutions = (chain: EvolutionLink): string[] => {
    const evolutions: string[] = [chain.species.name];
    chain.evolves_to.forEach((evolution) => {
      evolutions.push(...getEvolutions(evolution));
    });
    return evolutions;
  };

  const statColors: Record<string, string> = {
    hp: "bg-green-500",
    attack: "bg-red-500",
    defense: "bg-blue-500",
    "special-attack": "bg-purple-500",
    "special-defense": "bg-yellow-500",
    speed: "bg-pink-500",
  };

  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "At. Especial",
    "special-defense": "Def. Especial",
    speed: "Velocidad",
  };

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <MasterBallSpinner size="h-16 w-16" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Cargando Pokémon...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600 dark:text-red-400">
            <p className="text-xl">Pokémon no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  const generationInfo = getGenerationFromId(details.id);
  const evolutions = evolutionChain ? getEvolutions(evolutionChain.chain) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-4 sm:mb-6 flex items-center gap-2 px-4 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-bold transform hover:scale-105"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm sm:text-base">Volver al listado</span>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-4 border-red-200 dark:border-blue-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              <div className="bg-gradient-to-br from-red-100 via-yellow-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-inner relative overflow-hidden">
                {/* Decorative Pokéball */}
                <div className="absolute -right-16 -bottom-16 w-48 h-48 opacity-10">
                  <div className="w-full h-full border-8 border-white rounded-full"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-white transform -translate-y-1/2"></div>
                </div>
                <div className="relative w-full h-64 sm:h-80 md:h-96">
                  <Image
                    src={details.sprites.front_default || "/placeholder.png"}
                    alt={details.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold capitalize text-transparent bg-clip-text pokemon-gradient drop-shadow-lg">
                    {details.name}
                  </h1>
                  <p className="text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full inline-block mt-2 shadow-lg">
                    #{details.id.toString().padStart(3, "0")}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    🎮 Generación
                  </p>
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg">
                    {generationInfo.name}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    Tipos
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {details.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`${getTypeClass(type.type.name)} text-sm sm:text-base font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg border-2 border-white/30 transform hover:scale-110 transition-transform`}
                      >
                        {translateType(type.type.name)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-3 sm:p-4 shadow-md border-2 border-red-200 dark:border-red-900">
                    <p className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400">
                      Altura
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {details.height / 10}m
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-3 sm:p-4 shadow-md border-2 border-blue-200 dark:border-blue-900">
                    <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                      Peso
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {details.weight / 10}kg
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats and Evolutions */}
            <div className="space-y-6 sm:space-y-8">
              {/* Stats */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text pokemon-gradient mb-4">
                  Estadísticas Base
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {details.stats.map((stat) => (
                    <div
                      key={stat.stat.name}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 shadow-sm"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 capitalize">
                          {statNames[stat.stat.name] || stat.stat.name}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white bg-gradient-to-r from-gray-600 to-gray-700 px-3 py-1 rounded-full shadow-md">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3 sm:h-4 shadow-inner">
                        <div
                          className={`${
                            statColors[stat.stat.name] || "bg-gray-400"
                          } h-3 sm:h-4 rounded-full transition-all duration-500 shadow-md`}
                          style={{
                            width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-xl shadow-lg border-4 border-yellow-300 dark:border-yellow-700">
                  <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                    Total
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-yellow-900 dark:text-yellow-100">
                    {details.stats.reduce(
                      (sum, stat) => sum + stat.base_stat,
                      0
                    )}
                  </p>
                </div>
              </div>

              {/* Evolutions */}
              {evolutions.length > 1 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text pokemon-gradient mb-4">
                    Cadena Evolutiva
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {evolutions.map((evolutionName) => (
                      <EvolutionCard
                        key={evolutionName}
                        name={evolutionName}
                        isCurrent={evolutionName === details.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EvolutionCard({
  name,
  isCurrent,
}: {
  name: string;
  isCurrent: boolean;
}) {
  const { data: details } = useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: () =>
      fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${name}`),
  });

  if (!details) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl p-3 sm:p-4 animate-pulse shadow-md">
        <div className="w-full h-20 sm:h-24 bg-gray-300 dark:bg-gray-500 rounded-lg mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded"></div>
      </div>
    );
  }

  const content = (
    <div
      className={`bg-white dark:bg-gray-700 rounded-xl p-3 sm:p-4 transition-all shadow-md relative overflow-hidden ${
        isCurrent
          ? "ring-4 ring-yellow-400 shadow-2xl scale-105 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20"
          : "hover:scale-105 hover:shadow-xl"
      }`}
    >
      {isCurrent && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-400 opacity-20 rounded-full -mr-8 -mt-8"></div>
      )}
      <div className="relative w-full h-20 sm:h-24 mb-2">
        <Image
          src={details.sprites.front_default || "/placeholder.png"}
          alt={details.name}
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>
      <p className="text-xs sm:text-sm font-bold capitalize text-center text-gray-800 dark:text-gray-100">
        {details.name}
      </p>
      <p className="text-xs text-center font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 rounded-full inline-block mx-auto mt-1">
        #{details.id.toString().padStart(3, "0")}
      </p>
      {isCurrent && (
        <div className="mt-2 text-center">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs font-bold rounded-full shadow-lg">
            ⭐ Actual
          </span>
        </div>
      )}
    </div>
  );

  if (isCurrent) {
    return content;
  }

  return (
    <Link href={`/pokemon/${name}`} className="block">
      {content}
    </Link>
  );
}
