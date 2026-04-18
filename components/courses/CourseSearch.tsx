/**
 * Optimized course search component with real-time debounced search
 * Includes loading states, empty states, and accessibility features
 */

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { searchCourses } from "@/lib/supabase/courses.queries";
import type { CourseWithDetails, FilterValues } from "@/types/courses";

interface CourseSearchProps {
  onSelect: (course: CourseWithDetails) => void;
  onSearch: (query: string, results: CourseWithDetails[]) => void;
  filters?: FilterValues;
  placeholder?: string;
}

export default function CourseSearch({
  onSelect,
  onSearch,
  filters,
  placeholder = "Rechercher un cours...",
}: CourseSearchProps) {
  const { query, setQuery, results, isLoading, debouncedSearch, clearSearch } =
    useDebounceSearch({ delay: 300, minCharacters: 2 });

  // Perform search whenever query changes
  useEffect(() => {
    if (query.length >= 2) {
      debouncedSearch(async (searchQuery) => {
        const result = await searchCourses(searchQuery, {
          classId: filters?.selectedClass,
          fieldId: filters?.selectedField,
          limit: 8,
        });
        onSearch(searchQuery, result.courses);
        return result.courses;
      });
    } else {
      onSearch("", []);
    }
  }, [query, filters, debouncedSearch, onSearch]);

  return (
    <div className="relative">
      {/* Search Input */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40"
          animate={{ rotate: query ? 0 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Search size={20} />
        </motion.div>
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full pl-10 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={(e) => {
            // Show results on focus if query exists
            if (query.length >= 2) {
              e.currentTarget.parentElement
                ?.querySelector('[role="listbox"]')
                ?.classList.remove("hidden");
            }
          }}
          role="searchbox"
          aria-label="Rechercher un cours"
          aria-autocomplete="list"
          {...(query.length >= 2 && { "aria-controls": "search-results" })}
        />

        {/* Clear button */}
        <AnimatePresence>
          {query && (
            <motion.button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
              aria-label="Effacer la recherche"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && query.length >= 2 && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <span className="loading loading-spinner loading-sm" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {query.length >= 2 && (
          <motion.div
            role="listbox"
            id="search-results"
            className={`absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 ${
              results.length === 0 && !isLoading ? "hidden" : ""
            }`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? (
              <motion.div
                className="p-4 text-center"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="loading loading-spinner loading-sm" />
                <motion.p
                  className="text-xs text-base-content/60 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Recherche en cours...
                </motion.p>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div>
                {(results as CourseWithDetails[]).map(
                  (course: CourseWithDetails, index: number) => (
                    <motion.button
                      key={course.id}
                      role="option"
                      aria-selected="false"
                      onClick={() => {
                        onSelect(course);
                        clearSearch();
                      }}
                      className="w-full text-left p-3 hover:bg-base-200 flex gap-3 items-start group border-b border-base-200 last:border-b-0 cursor-pointer"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{
                        x: 4,
                        backgroundColor: "var(--color-base-200)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Course thumbnail */}
                      <motion.div
                        className="relative w-12 h-12 rounded shrink-0 overflow-hidden bg-base-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={course.cloudinary_url || "/placeholder.png"}
                          alt={course.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                          priority={false}
                        />
                      </motion.div>

                      {/* Course info */}
                      <div className="flex-1 min-w-0">
                        <motion.p
                          className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors"
                          whileHover={{ color: "var(--color-primary)" }}
                        >
                          {course.title}
                        </motion.p>
                        <p className="text-xs text-base-content/60 line-clamp-1">
                          {course.chapterCount} chapitres
                        </p>
                      </div>

                      {/* Right arrow */}
                      <motion.div
                        className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0, x: -4 }}
                        whileHover={{ opacity: 1, x: 4 }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  ),
                )}
              </motion.div>
            ) : (
              <motion.div
                className="p-4 text-center text-sm text-base-content/60"
                role="status"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Aucun cours trouvé
                </motion.p>
                <p className="text-xs mt-1">Essayez d&apos;autres mots-clés</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
