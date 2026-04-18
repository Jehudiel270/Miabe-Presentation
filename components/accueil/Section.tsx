import React from "react";

interface SectionProps {
  title?: string;
  description?: string;
  pc?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  pc,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            )}
            {description && (
              <p className={`${pc} max-w-2xl mx-auto`}>{description}</p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
