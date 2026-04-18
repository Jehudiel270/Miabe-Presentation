import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  pc?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  image?: React.ReactNode;
}

export function Hero({
  title,
  subtitle,
  pc,
  primaryAction,
  secondaryAction,
  image,
}: HeroProps) {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

          <p className={`${pc} mb-8`}>{subtitle}</p>

          <div className="flex gap-4">
            {primaryAction}
            {secondaryAction}
          </div>
        </div>

        {/* Right image */}
        {image && <div className="flex justify-center">{image}</div>}
      </div>
    </section>
  );
}
