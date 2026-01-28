import type {
  PokemonListResponse,
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
  TypeData,
  TypeListItem,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchAllPokemon(): Promise<PokemonListResponse> {
  // Fetch first 1000 Pokemon (covers all generations up to Gen 9)
  const response = await fetch(`${BASE_URL}/pokemon?limit=1000&offset=0`);

  if (!response.ok) {
    throw new Error("Error al cargar la lista de Pokémon");
  }

  return response.json();
}

export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Error al cargar la lista de Pokémon");
  }

  return response.json();
}

export async function fetchPokemonDetails(
  url: string
): Promise<PokemonDetails> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al cargar los detalles del Pokémon");
  }

  return response.json();
}

export async function fetchPokemonSpecies(
  url: string
): Promise<PokemonSpecies> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al cargar la especie del Pokémon");
  }

  return response.json();
}

export async function fetchGenerations(): Promise<{
  results: Array<{ name: string; url: string }>;
}> {
  const response = await fetch(`${BASE_URL}/generation`);

  if (!response.ok) {
    throw new Error("Error al cargar las generaciones");
  }

  return response.json();
}

export async function fetchTypes(): Promise<{ results: TypeListItem[] }> {
  const response = await fetch(`${BASE_URL}/type`);

  if (!response.ok) {
    throw new Error("Error al cargar los tipos");
  }

  const data = await response.json();

  // Fetch details for each type to get Spanish names
  const typesWithNames = await Promise.all(
    data.results.map(async (type: { name: string; url: string }) => {
      try {
        const detailResponse = await fetch(type.url);
        if (!detailResponse.ok) {
          return { ...type, spanishName: type.name };
        }
        const details: TypeData = await detailResponse.json();

        // Find Spanish name
        const spanishName =
          details.names.find((n) => n.language.name === "es")?.name ||
          type.name;

        return { ...type, spanishName };
      } catch (error) {
        console.error(`Error fetching type details for ${type.name}:`, error);
        return { ...type, spanishName: type.name };
      }
    })
  );

  return { results: typesWithNames };
}

// Helper function to get generation number from generation name
export function getGenerationNumber(generationName: string): number {
  const match = generationName.match(/generation-(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Helper function to format generation name
export function formatGenerationName(generationName: string): string {
  const num = getGenerationNumber(generationName);
  return num ? `Gen ${num}` : generationName;
}

export async function fetchEvolutionChain(
  url: string
): Promise<EvolutionChain> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al cargar la cadena de evolución");
  }

  return response.json();
}

// Helper to get all Pokemon names in an evolution chain
export function getAllEvolutionNames(chain: EvolutionChain): string[] {
  const names: string[] = [];

  function traverse(link: EvolutionChain["chain"]) {
    names.push(link.species.name);
    link.evolves_to.forEach(traverse);
  }

  traverse(chain.chain);
  return names;
}
