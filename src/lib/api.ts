import type {
  PokemonListResponse,
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
  GenerationDetails,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchAllPokemon(): Promise<PokemonListResponse> {
  // First, get the count of all Pokemon available
  const initialResponse = await fetch(`${BASE_URL}/pokemon?limit=1&offset=0`);

  if (!initialResponse.ok) {
    throw new Error("Error loading Pokémon list");
  }

  const initialData: PokemonListResponse = await initialResponse.json();
  const totalCount = initialData.count;

  // Now fetch all Pokemon using the actual count
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${totalCount}&offset=0`
  );

  if (!response.ok) {
    throw new Error("Error loading Pokémon list");
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
    throw new Error("Error loading Pokémon list");
  }

  return response.json();
}

export async function fetchPokemonDetails(
  url: string
): Promise<PokemonDetails> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error loading Pokémon details");
  }

  return response.json();
}

export async function fetchPokemonSpecies(
  url: string
): Promise<PokemonSpecies> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error loading Pokémon species");
  }

  return response.json();
}

export async function fetchGenerations(): Promise<{
  results: Array<{ name: string; url: string }>;
}> {
  const response = await fetch(`${BASE_URL}/generation`);

  if (!response.ok) {
    throw new Error("Error loading generations");
  }

  return response.json();
}

export async function fetchTypes(): Promise<{
  results: Array<{ name: string; url: string }>;
}> {
  const response = await fetch(`${BASE_URL}/type`);

  if (!response.ok) {
    throw new Error("Error loading types");
  }

  return response.json();
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
    throw new Error("Error loading evolution chain");
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

// Fetch generation details to build dynamic ranges
export async function fetchGenerationDetails(generationName: string): Promise<GenerationDetails> {
  const response = await fetch(`${BASE_URL}/generation/${generationName}`);

  if (!response.ok) {
    throw new Error(`Error loading generation ${generationName}`);
  }

  return response.json();
}

// Build generation ranges dynamically from API
export async function buildGenerationRanges() {
  try {
    const generationsResponse = await fetchGenerations();
    const generations = generationsResponse.results;

    const ranges = await Promise.all(
      generations.map(async (gen) => {
        const details = await fetchGenerationDetails(gen.name);
        
        // Extract Pokemon IDs from the generation
        const pokemonIds = details.pokemon_species.map((species) => {
          const match = species.url.match(/\/pokemon-species\/(\d+)\//);
          return match ? parseInt(match[1]) : 0;
        }).filter((id) => id > 0);

        if (pokemonIds.length === 0) {
          return null;
        }

        const min = Math.min(...pokemonIds);
        const max = Math.max(...pokemonIds);
        const genNumber = gen.name.match(/generation-(\w+)/)?.[1];
        
        // Convert roman numerals to arabic
        const romanToArabic: Record<string, string> = {
          'i': 'I', 'ii': 'II', 'iii': 'III', 'iv': 'IV', 
          'v': 'V', 'vi': 'VI', 'vii': 'VII', 'viii': 'VIII', 
          'ix': 'IX', 'x': 'X'
        };

        return {
          generation: gen.name,
          name: genNumber ? `Gen ${romanToArabic[genNumber.toLowerCase()] || genNumber.toUpperCase()}` : gen.name,
          min,
          max,
        };
      })
    );

    return ranges.filter((r): r is NonNullable<typeof r> => r !== null)
      .sort((a, b) => a.min - b.min);
  } catch (error) {
    console.error('Error building generation ranges:', error);
    return null;
  }
}
