// Generation mapping based on Pokemon ID ranges
// This avoids having to fetch species data for every Pokemon
export const GENERATION_RANGES = [
  { generation: "generation-i", name: "Gen I", min: 1, max: 151 },
  { generation: "generation-ii", name: "Gen II", min: 152, max: 251 },
  { generation: "generation-iii", name: "Gen III", min: 252, max: 386 },
  { generation: "generation-iv", name: "Gen IV", min: 387, max: 493 },
  { generation: "generation-v", name: "Gen V", min: 494, max: 649 },
  { generation: "generation-vi", name: "Gen VI", min: 650, max: 721 },
  { generation: "generation-vii", name: "Gen VII", min: 722, max: 809 },
  { generation: "generation-viii", name: "Gen VIII", min: 810, max: 905 },
  { generation: "generation-ix", name: "Gen IX", min: 906, max: 1025 },
];

export function getGenerationFromId(id: number): { generation: string; name: string } {
  const gen = GENERATION_RANGES.find((g) => id >= g.min && id <= g.max);
  return gen || { generation: "unknown", name: "Unknown" };
}

export function getGenerationName(generationKey: string): string {
  const gen = GENERATION_RANGES.find((g) => g.generation === generationKey);
  return gen?.name || generationKey;
}

export function getPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1]) : 0;
}
