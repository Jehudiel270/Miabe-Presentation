/**
 * Loading skeleton for course card
 * DaisyUI based, matches CourseCard dimensions
 */

export function CourseSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md">
      {/* Image skeleton */}
      <div className="h-40 w-full bg-base-300 animate-pulse rounded-t-2xl" />

      <div className="card-body p-4">
        {/* Title skeleton */}
        <div className="h-6 w-32 bg-base-300 rounded animate-pulse mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 w-full bg-base-300 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-base-300 rounded animate-pulse" />
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-16 bg-base-300 rounded animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="h-8 w-24 bg-primary/20 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function CoursesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CourseSkeleton key={i} />
      ))}
    </div>
  );
}
