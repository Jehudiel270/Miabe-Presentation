/**
 * Loading skeleton for filters sidebar
 */

export function FilterSkeleton() {
  return (
    <div className="card bg-base-100 p-4 shadow-md space-y-3">
      {/* Title skeleton */}
      <div className="h-6 w-24 bg-base-300 rounded animate-pulse mb-3" />

      {/* Buttons skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-full bg-base-300 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <FilterSkeleton />
      <div className="lg:col-span-3">
        <FilterSkeleton />
      </div>
    </div>
  );
}
