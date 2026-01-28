/**
 * Get CSS class for a Pokemon type
 * @param typeName - The name of the Pokemon type (e.g., "fire", "water")
 * @returns CSS class name for the type
 */
export function getTypeClass(typeName: string): string {
  return `type-${typeName}`;
}

/**
 * Static translations for Pokemon types (fallback)
 * These match what the PokéAPI returns in Spanish
 */
const TYPE_TRANSLATIONS: Record<string, string> = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada",
};

/**
 * Translate Pokemon type names to Spanish
 * @param typeName - The English name of the Pokemon type
 * @returns Spanish translation of the type name
 */
export function translateType(typeName: string): string {
  return (
    TYPE_TRANSLATIONS[typeName] ||
    typeName.charAt(0).toUpperCase() + typeName.slice(1)
  );
}
