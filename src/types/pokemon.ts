export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites;
  species: {
    name: string;
    url: string;
  };
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  generation: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
}

export interface Generation {
  id: number;
  name: string;
  main_region: {
    name: string;
    url: string;
  };
}

export interface TypeData {
  id: number;
  name: string;
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionLink;
}

export interface EvolutionLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionLink[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
