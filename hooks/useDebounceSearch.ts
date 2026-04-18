/**
 * Custom hook for debounced search
 * Optimizes real-time search by reducing API calls
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface UseDebounceSearchOptions {
  delay?: number;
  minCharacters?: number;
}

interface UseDebounceSearchResult<T> {
  query: string;
  setQuery: (value: string) => void;
  results: T[];
  isLoading: boolean;
  debouncedSearch: (searchFn: (query: string) => Promise<T[]>) => void;
  clearSearch: () => void;
}

export function useDebounceSearch<T>(
  options: UseDebounceSearchOptions = {},
): UseDebounceSearchResult<T> {
  const { delay = 300, minCharacters = 2 } = options;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedSearch = useCallback(
    (searchFn: (query: string) => Promise<T[]>) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // If query is too short, clear results
      if (query.length < minCharacters) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // Set new timeout
      timeoutRef.current = setTimeout(async () => {
        try {
          const newResults = await searchFn(query);
          setResults(newResults);
        } catch (error) {
          console.error("[useDebounceSearch]", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, delay);
    },
    [query, delay, minCharacters],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    debouncedSearch,
    clearSearch,
  };
}
