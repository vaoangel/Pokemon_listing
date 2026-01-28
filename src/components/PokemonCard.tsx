"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { fetchPokemonDetails } from "@/lib/api";
import { getPokemonIdFromUrl, getGenerationFromId } from "@/lib/generationMap";
import { getTypeClass, translateType } from "@/lib/typeUtils";
import type { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { data: details, isLoading } = useQuery({
    queryKey: ["pokemon-details", pokemon.name],
    queryFn: () => fetchPokemonDetails(pokemon.url),
  });

  // Get generation from ID (no API call needed)
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const generationInfo = getGenerationFromId(pokemonId);

  if (isLoading || !details) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 pokemon-card-hover cursor-pointer border-2 border-transparent hover:border-red-400 dark:hover:border-blue-400 relative overflow-hidden">
        {/* Decorative Pokéball background */}
        <div className="absolute -right-8 -top-8 w-32 h-32 opacity-5 dark:opacity-10">
          <div className="w-full h-full border-8 border-gray-400 rounded-full"></div>
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
        </div>

        <div className="relative w-full h-40 sm:h-48 mb-4">
          <Image
            src={details.sprites.front_default || "/placeholder.png"}
            alt={details.name}
            fill
            className="object-contain"
            priority={false}
          />
        </div>

        <h3 className="text-lg sm:text-xl font-bold capitalize text-gray-800 dark:text-gray-100 mb-2 truncate">
          {details.name}
        </h3>

        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <p className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 rounded-full shadow-md">
            #{details.id.toString().padStart(3, "0")}
          </p>
          <p className="text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 rounded-full shadow-md">
            {generationInfo.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
          {details.types.map((type) => (
            <span
              key={type.type.name}
              className={`${getTypeClass(type.type.name)} text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-md border-2 border-white/30`}
            >
              {translateType(type.type.name)}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <div className="text-center">
            <span className="block text-gray-500 dark:text-gray-400 text-xs">
              Altura
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {details.height / 10}m
            </span>
          </div>
          <div className="text-center border-l border-gray-300 dark:border-gray-600">
            <span className="block text-gray-500 dark:text-gray-400 text-xs">
              Peso
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {details.weight / 10}kg
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
