"use client";

import { useState, useEffect } from "react";
import { fetchFilterOptions } from "@/lib/supabase/courses.queries";

export type FilterOption = {
  id: string;
  name: string;
};

export type FilterOptionsData = {
  classes: FilterOption[];
  fields: FilterOption[];
};

export function useFilterOptions() {
  const [filters, setFilters] = useState<FilterOptionsData>({
    classes: [],
    fields: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const data = await fetchFilterOptions();
        setFilters({
          classes: data.classes || [],
          fields: data.fields || [],
        });
      } catch (error) {
        console.error("Failed to load filter options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  return { filters, isLoading };
}
