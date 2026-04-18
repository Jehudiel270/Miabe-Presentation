"use client";

import {
  ShieldCheck,
  Lock,
  Users,
  Repeat,
  AlertTriangle,
  Eye,
  BarChart3,
  Globe,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/accueil/Hero";
import Button from "@/components/ui/Button";
import { Section } from "@/components/accueil/Section";
import { FeatureCard } from "@/components/accueil/FeatureCard";
import Footer from "@/components/ui/footer";

const HeroAnimation = dynamic(
  () => import("@/components/animations/HeroAnimation"),
  { ssr: false },
);

function Home() {
  type variant =
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "accent"
    | "warning"
    | "error";

  // PROBLÈMES
  const features_problem = [
    {
      icon: <AlertTriangle />,
      title: "Absence de règles contraignantes",
      description:
        "Les règles reposent uniquement sur la confiance, sans garantie d'exécution.",
      variant: "warning",
    },
    {
      icon: <Users />,
      title: "Risque de non-paiement",
      description:
        "Certains membres peuvent ne pas payer, mettant en danger toute la tontine.",
      variant: "error",
    },
    {
      icon: <Eye />,
      title: "Manque de transparence",
      description:
        "Aucune visibilité fiable sur les transactions et les contributions.",
      variant: "info",
    },
    {
      icon: <AlertTriangle />,
      title: "Pertes financières fréquentes",
      description:
        "Des mois d’épargne peuvent être perdus en cas de fraude ou d’abandon.",
      variant: "error",
    },
  ];

  // SOLUTIONS
  const features_solution = [
    {
      icon: <Lock />,
      title: "Règles immuables",
      description:
        "Les règles sont définies dès le départ et ne peuvent plus être modifiées.",
      variant: "primary",
    },
    {
      icon: <Repeat />,
      title: "Automatisation des paiements",
      description:
        "Les contributions et redistributions sont exécutées automatiquement.",
      variant: "success",
    },
    {
      icon: <ShieldCheck />,
      title: "Sécurité blockchain",
      description:
        "Chaque transaction est enregistrée de manière sécurisée et vérifiable.",
      variant: "accent",
    },
    {
      icon: <BarChart3 />,
      title: "Transparence totale",
      description:
        "Tous les membres peuvent suivre l’évolution de la tontine en temps réel.",
      variant: "info",
    },
  ];

  // IMPACT
  const features_impact = [
    {
      icon: <ShieldCheck />,
      title: "Réduction des fraudes",
      description: "Un système sécurisé qui élimine les détournements et abus.",
      variant: "success",
    },
    {
      icon: <Users />,
      title: "Confiance renforcée",
      description:
        "Les membres participent avec assurance grâce à la transparence totale.",
      variant: "primary",
    },
    {
      icon: <BarChart3 />,
      title: "Historique financier",
      description:
        "Création d’un historique exploitable pour l’inclusion financière.",
      variant: "accent",
    },
    {
      icon: <Globe />,
      title: "Inclusion financière",
      description: "Accès à des mécanismes financiers modernes pour tous.",
      variant: "info",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <Hero
        title={
          "Sécuriser l’épargne collective en Afrique grâce à la blockchain"
        }
        subtitle={
          "Des millions circulent chaque année dans les tontines. Une seule rupture de confiance peut tout détruire. TontineChain transforme ce système en un modèle sécurisé, transparent et automatisé."
        }
        primaryAction={
          <Button className="btn-soft btn-sm sm:btn-md lg:btn-lg sm:w-auto">
            Créer une tontine sécurisée{" "}
          </Button>
        }
        secondaryAction={
          <Button className="btn-sm sm:btn-md lg:btn-lg sm:w-auto">
            Découvrir la solution{" "}
          </Button>
        }
        image={<HeroAnimation />}
      />

      {/* PROBLÈME */}
      <Section
        title="Le problème"
        description="Les tontines reposent sur la confiance humaine. Mais lorsque des montants importants sont en jeu, la confiance seule devient un risque."
      >
        <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-6">
          {features_problem.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant as variant}
            />
          ))}
        </div>
      </Section>
      {/* SOLUTION */}
      <Section
        title="La solution"
        description="TontineChain sécurise les tontines grâce à des règles immuables exécutées automatiquement par la blockchain."
      >
        <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-6">
          {features_solution.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant as variant}
            />
          ))}
        </div>
      </Section>
      {/* IMPACT */}
      <Section
        title="Impact"
        description="Une transformation profonde de l’épargne collective en Afrique."
      >
        <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-6">
          {features_impact.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant as variant}
            />
          ))}
        </div>
      </Section>
      {/* CALL TO ACTION */}
      <Section
        title="Rejoignez la révolution de l’épargne sécurisée"
        description="Passez d’un système basé sur la confiance fragile à une infrastructure financière fiable, transparente et automatisée."
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="btn-soft btn-md">Lancer ma tontine</Button>
          <Button className="btn-md">Voir comment ça marche</Button>
        </div>
      </Section>
      <Footer />
    </div>
  );
}

export default Home;
