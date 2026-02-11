"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FilterProvider } from "@/contexts/FilterContext";
import { buildGenerationRanges } from "@/lib/api";
import { setGenerationRanges } from "@/lib/generationMap";

function GenerationLoader({ children }: { children: React.ReactNode }) {
  const { data: generationRanges } = useQuery({
    queryKey: ["generation-ranges"],
    queryFn: buildGenerationRanges,
    staleTime: Infinity, // Generation ranges don't change frequently
    retry: 1, // Only retry once if it fails
  });

  useEffect(() => {
    if (generationRanges && generationRanges.length > 0) {
      setGenerationRanges(generationRanges);
      console.log('✅ Dynamic generation ranges loaded:', generationRanges.length, 'generations');
    }
  }, [generationRanges]);

  // Don't block rendering - use fallback ranges until dynamic ones load
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchInterval: 60 * 1000, // Refetch every minute for real-time updates
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GenerationLoader>
        <FilterProvider>{children}</FilterProvider>
      </GenerationLoader>
    </QueryClientProvider>
  );
}
