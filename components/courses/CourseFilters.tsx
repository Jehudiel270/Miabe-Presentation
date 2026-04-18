/**
 * Advanced course filters component with class and field filters
 * Includes responsive design and accessibility features
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";
import { useFilterOptions } from "@/hooks/useCourses";
import { FilterSkeleton } from "./ui/FilterSkeleton";
import type { FilterValues } from "@/types/courses";

interface CourseFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  disabled?: boolean;
}

export default function CourseFilters({
  onFilterChange,
  disabled = false,
}: CourseFiltersProps) {
  const { filters, isLoading } = useFilterOptions();
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});
  const [expandedSections, setExpandedSections] = useState({
    class: true,
    field: true,
    level: true,
  });

  // Hardcoded levels data (can be moved to DB later)
  const levels = [
    { id: "l1", name: "L1" },
    { id: "l2", name: "L2" },
    { id: "l3", name: "L3" },
    { id: "m1", name: "Master 1" },
    { id: "term", name: "Terminale" },
  ];

  const toggleSection = useCallback(
    (section: keyof typeof expandedSections) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    [],
  );

  const handleFilterChange = useCallback(
    (filterKey: keyof FilterValues, value: string | undefined) => {
      const newFilters = {
        ...activeFilters,
        [filterKey]: value === activeFilters[filterKey] ? undefined : value,
      };

      setActiveFilters(newFilters);
      onFilterChange(newFilters);
    },
    [activeFilters, onFilterChange],
  );

  const clearFilters = useCallback(() => {
    setActiveFilters({});
    onFilterChange({});
  }, [onFilterChange]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).filter(Boolean).length;
  }, [activeFilters]);

  if (isLoading) {
    return <FilterSkeleton />;
  }

  return (
    <aside
      className="card bg-base-100 p-4 shadow-md space-y-4 h-fit sticky top-24"
      role="navigation"
      aria-label="Filtres de cours"
    >
      {/* Header avec compteur */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filtres</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="btn btn-ghost btn-xs gap-1"
            aria-label="Réinitialiser tous les filtres"
          >
            <X size={14} />
            Réinit
          </button>
        )}
      </div>

      {/* Classes Filter */}
      <FilterSection
        title="Classe"
        isExpanded={expandedSections.class}
        onToggle={() => toggleSection("class")}
        itemCount={filters?.classes?.length || 0}
      >
        <div className="space-y-2">
          {filters?.classes?.map((cls) => (
            <label
              key={cls.id}
              className="checkbox-item flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={activeFilters.selectedClass === cls.id}
                onChange={() =>
                  handleFilterChange(
                    "selectedClass",
                    activeFilters.selectedClass === cls.id ? undefined : cls.id,
                  )
                }
                disabled={disabled}
              />
              <span className="text-sm flex-1">{cls.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Fields Filter */}
      <FilterSection
        title="Domaine"
        isExpanded={expandedSections.field}
        onToggle={() => toggleSection("field")}
        itemCount={filters?.fields?.length || 0}
      >
        <div className="space-y-2">
          {filters?.fields?.map((field) => (
            <label
              key={field.id}
              className="checkbox-item flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={activeFilters.selectedField === field.id}
                onChange={() =>
                  handleFilterChange(
                    "selectedField",
                    activeFilters.selectedField === field.id
                      ? undefined
                      : field.id,
                  )
                }
                disabled={disabled}
              />
              <span className="text-sm flex-1">{field.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Levels Filter */}
      <FilterSection
        title="Niveaux"
        isExpanded={expandedSections.level}
        onToggle={() => toggleSection("level")}
        itemCount={levels.length}
      >
        <div className="space-y-2">
          {levels.map((level) => (
            <label
              key={level.id}
              className="checkbox-item flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={activeFilters.selectedLevel === level.id}
                onChange={() =>
                  handleFilterChange(
                    "selectedLevel",
                    activeFilters.selectedLevel === level.id
                      ? undefined
                      : level.id,
                  )
                }
                disabled={disabled}
              />
              <span className="text-sm flex-1">{level.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Active filters display */}
      {activeFilterCount > 0 && (
        <div className="pt-3 border-t border-base-300 space-y-2">
          <p className="text-xs text-base-content/60 font-semibold">
            Filtres actifs ({activeFilterCount})
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)
              .filter(([, value]) => value)
              .map(([key, value]) => {
                let label = value;
                if (key === "selectedClass") {
                  label =
                    filters?.classes?.find((c) => c.id === value)?.name ||
                    value;
                } else if (key === "selectedField") {
                  label =
                    filters?.fields?.find((f) => f.id === value)?.name || value;
                } else if (key === "selectedLevel") {
                  label = levels.find((l) => l.id === value)?.name || value;
                }
                return (
                  <div key={key} className="badge badge-primary badge-sm gap-1">
                    {label}
                    <button
                      onClick={() =>
                        handleFilterChange(key as keyof FilterValues, undefined)
                      }
                      className="hover:text-error"
                      aria-label={`Supprimer le filtre ${label}`}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </aside>
  );
}

/**
 * Reusable filter section component
 */
interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  itemCount: number;
  children: React.ReactNode;
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  itemCount,
  children,
}: FilterSectionProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full hover:text-primary transition-colors py-2"
        {...(isExpanded
          ? { "aria-expanded": "true" }
          : { "aria-expanded": "false" })}
      >
        <span className="font-semibold text-sm">{title}</span>
        <span className="flex items-center gap-2">
          <span className="badge badge-sm badge-ghost">{itemCount}</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {isExpanded && (
        <div
          className="pl-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
          role="region"
          aria-live="polite"
        >
          {children}
        </div>
      )}
    </div>
  );
}
