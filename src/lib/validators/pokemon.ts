import { z } from "zod";

/**
 * Zod schemas for Pokemon API validation
 * Following T3 Stack patterns for type-safe API responses
 */

export const pokemonSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const pokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(pokemonSchema),
});

export const pokemonTypeSchema = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

export const pokemonDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(pokemonTypeSchema),
  sprites: z.object({
    front_default: z.string().url().nullable(),
    front_shiny: z.string().url().nullable(),
    front_female: z.string().url().nullable(),
    front_shiny_female: z.string().url().nullable(),
    back_default: z.string().url().nullable(),
    back_shiny: z.string().url().nullable(),
    back_female: z.string().url().nullable(),
    back_shiny_female: z.string().url().nullable(),
  }),
  species: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
      is_hidden: z.boolean(),
      slot: z.number(),
    })
  ),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    })
  ),
});

export const pokemonSpeciesSchema = z.object({
  id: z.number(),
  name: z.string(),
  generation: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  evolution_chain: z.object({
    url: z.string().url(),
  }),
});

export const evolutionLinkSchema: z.ZodType<{
  species: { name: string; url: string };
  evolves_to: Array<{ species: { name: string; url: string }; evolves_to: unknown[] }>;
}> = z.object({
  species: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  evolves_to: z.array(z.lazy(() => evolutionLinkSchema)),
});

export const evolutionChainSchema = z.object({
  id: z.number(),
  chain: evolutionLinkSchema,
});

// Type exports inferred from schemas
export type Pokemon = z.infer<typeof pokemonSchema>;
export type PokemonListResponse = z.infer<typeof pokemonListResponseSchema>;
export type PokemonDetails = z.infer<typeof pokemonDetailsSchema>;
export type PokemonSpecies = z.infer<typeof pokemonSpeciesSchema>;
export type EvolutionChain = z.infer<typeof evolutionChainSchema>;
export type EvolutionLink = z.infer<typeof evolutionLinkSchema>;
