"use client";

import { useGenerationRanges } from "@/hooks/useGenerationRanges";

/**
 * Optional component to display generation loading status
 * Shows whether dynamic or fallback data is being used
 */
export function GenerationStatus() {
  const { isDynamic, isFallback, ranges, isLoading } = useGenerationRanges();

  if (isLoading) {
    return (
      <div className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
        🔄 Loading generation data...
      </div>
    );
  }

  if (isFallback) {
    return (
      <div className="fixed bottom-4 left-4 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
        ⚠️ Using fallback generation data ({ranges.length} generations)
      </div>
    );
  }

  if (isDynamic) {
    return (
      <div className="fixed bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
        ✅ Dynamic generation data loaded ({ranges.length} generations)
      </div>
    );
  }

  return null;
}
