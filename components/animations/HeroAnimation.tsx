"use client";

import { useRive } from "rive-react";
import { useEffect, useState } from "react";

const HeroAnimation = () => {
  const [error, setError] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const { rive, RiveComponent } = useRive({
    src: "/animations/22673-42423-for-education-purpose.riv",
    autoplay: true,
    onLoad: () => {
      setError(null);
    },
  });

  useEffect(() => {
    // Component mounted
  }, [rive]);

  const handleClick = () => {
    // Relancer l'animation en forçant le remontage
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="w-full h-48 sm:h-64 md:h-96 flex justify-center items-center bg-base-200 rounded-lg overflow-hidden cursor-pointer group">
      {error ? (
        <p className="text-error">{error}</p>
      ) : (
        <div
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          onClick={handleClick}
          key={animationKey}
        >
          {RiveComponent && <RiveComponent />}
        </div>
      )}
    </div>
  );
};

export default HeroAnimation;
