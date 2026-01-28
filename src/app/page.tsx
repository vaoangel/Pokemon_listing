import { Suspense } from "react";
import { PokemonList } from "@/components/PokemonList";

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <header className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block pokemon-gradient rounded-3xl px-6 sm:px-8 py-4 sm:py-6 mb-4 shadow-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 drop-shadow-lg">
              Pokédex
            </h1>
            <div className="flex items-center justify-center gap-2 text-yellow-300">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Explora información en tiempo real de Pokémon usando PokéAPI
          </p>
        </header>
        <Suspense fallback={<LoadingFallback />}>
          <PokemonList />
        </Suspense>
      </div>
    </main>
  );
}
