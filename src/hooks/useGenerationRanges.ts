"use client";

import { useQuery } from "@tanstack/react-query";
import { buildGenerationRanges } from "@/lib/api";
import { getGenerationRanges } from "@/lib/generationMap";

/**
 * Hook to access generation ranges with loading state
 * @returns Object containing generation ranges and loading state
 */
export function useGenerationRanges() {
  const { data: dynamicRanges, isLoading, error } = useQuery({
    queryKey: ["generation-ranges"],
    queryFn: buildGenerationRanges,
    staleTime: Infinity, // Generation ranges are static
  });

  return {
    ranges: getGenerationRanges(),
    isLoading,
    isDynamic: dynamicRanges !== null && dynamicRanges !== undefined,
    isFallback: !dynamicRanges,
    error,
  };
}
