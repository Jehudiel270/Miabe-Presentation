"use client";

import { advancedFeatures, extraFeatures } from "@/data/advancedFeatures";
import { FeatureCard } from "@/components/accueil/FeatureCard";

export default function FeaturesSection() {
  const allFeatures = [...advancedFeatures, ...extraFeatures];

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold">
          Tout ce que tu peux faire avec LearnUp
        </h1>
        <p className="mt-4 text-base-content/70">
          Une plateforme complète qui mélange apprentissage, gaming et
          intelligence pour te faire progresser rapidement.
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={<feature.icon />}
            title={feature.title}
            description={feature.description}
            variant={feature.variant}
          />
        ))}
      </div>
    </div>
  );
}
