"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface FilterState {
  selectedType: string;
  selectedGeneration: string;
  searchQuery: string;
  currentPage: number;
}

interface FilterContextType extends FilterState {
  setSelectedType: (type: string) => void;
  setSelectedGeneration: (generation: string) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const initialState: FilterState = {
  selectedType: "",
  selectedGeneration: "",
  searchQuery: "",
  currentPage: 1,
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FilterState>(initialState);

  const setSelectedType = useCallback((type: string) => {
    setState((prev) => ({ ...prev, selectedType: type, currentPage: 1 }));
  }, []);

  const setSelectedGeneration = useCallback((generation: string) => {
    setState((prev) => ({ ...prev, selectedGeneration: generation, currentPage: 1 }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query, currentPage: 1 }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const resetFilters = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setSelectedType,
        setSelectedGeneration,
        setSearchQuery,
        setCurrentPage,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
