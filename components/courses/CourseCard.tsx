"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import type { CourseWithDetails } from "@/types/courses";

interface CourseCardProps {
  course: CourseWithDetails;
  onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const router = useRouter();
  const chapterCount = course.chapterCount || 0;
  const progressPercent = course.progressPercent || 0;

  const handleClick = () => {
    onClick?.();
    router.push(`/dashboard/cours/${course.id}`);
  };

  return (
    <button
      className="group card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left cursor-pointer"
      onClick={handleClick}
      aria-label={`Voir le cours ${course.title}`}
    >
      {/* Image Container */}
      <figure className="relative overflow-hidden bg-linear-to-br from-primary/20 to-secondary/20 h-40">
        <Image
          src={course.cloudinary_url || "/placeholder.png"}
          alt={course.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Badge for chapters */}
        <div className="absolute top-3 right-3 badge badge-primary gap-1 text-xs font-semibold">
          <BookOpen size={14} />
          {chapterCount}
        </div>
      </figure>

      <div className="card-body p-4 gap-3">
        {/* Title */}
        <h2 className="card-title text-base line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h2>

        {/* Description */}
        {course.description && (
          <p className="text-sm text-base-content/70 line-clamp-2 group-hover:text-base-content/90 transition-colors">
            {course.description}
          </p>
        )}

        {/* Progress bar if available */}
        {progressPercent > 0 && (
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-base-content/60">Progression</span>
              <span className="text-primary font-semibold">
                {progressPercent}%
              </span>
            </div>
            <progress
              className="progress progress-primary w-full h-1"
              value={progressPercent}
              max="100"
            />
          </div>
        )}

        {/* Meta info */}
        {course.classes || course.fields ? (
          <div className="flex flex-wrap gap-2 text-xs">
            {course.classes && (
              <span className="badge badge-sm badge-outline">
                {typeof course.classes === "string"
                  ? course.classes
                  : "name" in course.classes
                    ? (course.classes as { name: string }).name
                    : "Classe"}
              </span>
            )}
            {course.fields && (
              <span className="badge badge-sm badge-outline">
                {typeof course.fields === "string"
                  ? course.fields
                  : "name" in course.fields
                    ? (course.fields as { name: string }).name
                    : "Domaine"}
              </span>
            )}
          </div>
        ) : null}

        {/* CTA */}
        <div className="card-actions justify-end pt-2">
          <span className="text-primary text-sm font-semibold gap-2 flex items-center group-hover:gap-3 transition-all">
            Voir
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </div>
    </button>
  );
}
