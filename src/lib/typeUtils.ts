/**
 * Get CSS class for a Pokemon type
 * @param typeName - The name of the Pokemon type (e.g., "fire", "water")
 * @returns CSS class name for the type
 */
export function getTypeClass(typeName: string): string {
  return `type-${typeName}`;
}
