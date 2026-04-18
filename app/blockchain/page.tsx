"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Users,
  AlertTriangle,
  RefreshCw,
  Eye,
  Clock,
  Bell,
  FileText,
  Layers,
  Zap,
  BarChart3,
  Globe,
  TrendingUp,
  DollarSign,
  Calendar,
  UserMinus,
  Info,
  ChevronDown,
  ChevronRight,
  Code2,
  GitBranch,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const whyBlockchainPoints = [
  {
    icon: Lock,
    title: "Règles immuables",
    body: "Les règles de la tontine sont encodées dans un smart contract à la création. Ni l'organisateur, ni aucun membre ne peut les modifier par la suite. Ce que vous signez est ce que vous obtenez.",
  },
  {
    icon: ShieldCheck,
    title: "Zéro dépositaire",
    body: "Personne ne « détient » la cagnotte. Les fonds sont dans le contrat lui-même, sur la blockchain. Aucun intermédiaire, aucun risque de fuite.",
  },
  {
    icon: Zap,
    title: "Exécution automatique",
    body: "La libération des fonds au bénéficiaire du tour se déclenche automatiquement à la date prévue, sans intervention humaine.",
  },
  {
    icon: Eye,
    title: "Transparence permanente",
    body: "Chaque transaction est visible par tous les membres en temps réel. L'historique est immuable et vérifiable sur la blockchain publique à tout moment.",
  },
];

type FeatureVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

const variantStyles: Record<
  FeatureVariant,
  { card: string; badge: string; icon: string }
> = {
  primary: {
    card: "border-primary/20 hover:border-primary/50 hover:bg-primary/5",
    badge: "badge-primary",
    icon: "text-primary bg-primary/10",
  },
  secondary: {
    card: "border-secondary/20 hover:border-secondary/50 hover:bg-secondary/5",
    badge: "badge-secondary",
    icon: "text-secondary bg-secondary/10",
  },
  accent: {
    card: "border-accent/20 hover:border-accent/50 hover:bg-accent/5",
    badge: "badge-accent",
    icon: "text-accent bg-accent/10",
  },
  success: {
    card: "border-success/20 hover:border-success/50 hover:bg-success/5",
    badge: "badge-success",
    icon: "text-success bg-success/10",
  },
  warning: {
    card: "border-warning/20 hover:border-warning/50 hover:bg-warning/5",
    badge: "badge-warning",
    icon: "text-warning bg-warning/10",
  },
  error: {
    card: "border-error/20 hover:border-error/50 hover:bg-error/5",
    badge: "badge-error",
    icon: "text-error bg-error/10",
  },
  info: {
    card: "border-info/20 hover:border-info/50 hover:bg-info/5",
    badge: "badge-info",
    icon: "text-info bg-info/10",
  },
};

// ─── FEATURE GROUPS ──────────────────────────────────────────────────────────

const featureGroups = [
  {
    id: "blockchain",
    title: "🔐 Sécurité Blockchain",
    description: "La couche de confiance irréfutable.",
    features: [
      {
        icon: ShieldCheck,
        title: "Sécurité blockchain",
        description:
          "Toutes les transactions sont enregistrées de manière immuable et sécurisée.",
        variant: "primary" as FeatureVariant,
      },
      {
        icon: Lock,
        title: "Règles immuables",
        description:
          "Les règles de la tontine sont définies dès la création et ne peuvent plus être modifiées.",
        variant: "secondary" as FeatureVariant,
      },
      {
        icon: Eye,
        title: "Transparence totale",
        description:
          "Tous les membres peuvent voir les paiements, retraits et historiques en temps réel.",
        variant: "info" as FeatureVariant,
      },
      {
        icon: FileText,
        title: "Historique infalsifiable",
        description: "Chaque action est tracée et vérifiable à tout moment.",
        variant: "accent" as FeatureVariant,
      },
    ],
  },
  {
    id: "gestion",
    title: "💰 Gestion de la Tontine",
    description: "Outils pour organiser et suivre chaque tontine.",
    features: [
      {
        icon: Users,
        title: "Gestion des membres",
        description:
          "Ajout, suivi et organisation des participants facilement.",
        variant: "primary" as FeatureVariant,
      },
      {
        icon: DollarSign,
        title: "Suivi des contributions",
        description: "Visualise qui a payé, combien et à quel moment.",
        variant: "success" as FeatureVariant,
      },
      {
        icon: Calendar,
        title: "Calendrier intelligent",
        description:
          "Affiche les dates de paiement, retraits passés et futurs.",
        variant: "warning" as FeatureVariant,
      },
      {
        icon: BarChart3,
        title: "Dashboard financier",
        description: "Vue globale des fonds, contributions et progression.",
        variant: "success" as FeatureVariant,
      },
    ],
  },
  {
    id: "auto",
    title: "⚙️ Automatisation",
    description: "Le contrat s'exécute lui-même, sans intervention humaine.",
    features: [
      {
        icon: RefreshCw,
        title: "Paiements automatisés",
        description:
          "Les contributions sont exécutées automatiquement selon les règles.",
        variant: "primary" as FeatureVariant,
      },
      {
        icon: Zap,
        title: "Distribution automatique",
        description:
          "Les fonds sont libérés automatiquement au bénéficiaire prévu.",
        variant: "secondary" as FeatureVariant,
      },
      {
        icon: Clock,
        title: "Gestion des échéances",
        description: "Respect automatique des dates de paiement et de retrait.",
        variant: "warning" as FeatureVariant,
      },
    ],
  },
  {
    id: "strict",
    title: "⚠️ Mode Strict",
    description: "Protection maximale contre les défauts de paiement.",
    features: [
      {
        icon: AlertTriangle,
        title: "Mode strict",
        description:
          "Active un système où les paiements sont forcés automatiquement même en cas de défaut.",
        variant: "error" as FeatureVariant,
      },
      {
        icon: TrendingUp,
        title: "Avance automatique",
        description:
          "Le système couvre automatiquement un membre en cas de non-paiement.",
        variant: "accent" as FeatureVariant,
      },
      {
        icon: ShieldCheck,
        title: "Zéro défaut de paiement",
        description: "Aucun membre ne peut bloquer la tontine.",
        variant: "success" as FeatureVariant,
      },
    ],
  },
  {
    id: "user",
    title: "👤 Contrôle Utilisateur",
    description:
      "Transparence totale sur les droits et obligations de chaque membre.",
    features: [
      {
        icon: UserMinus,
        title: "Quitter la tontine sécurisé",
        description:
          "Visualise les pénalités et conséquences avant de quitter.",
        variant: "error" as FeatureVariant,
      },
      {
        icon: Info,
        title: "Détails des règles",
        description: "Accède à toutes les règles et conditions de la tontine.",
        variant: "info" as FeatureVariant,
      },
    ],
  },
  {
    id: "utility",
    title: "🔔 Utilité & Accessibilité",
    description: "Conçu pour fonctionner partout au Bénin.",
    features: [
      {
        icon: Bell,
        title: "Notifications intelligentes",
        description:
          "Alertes pour paiements, retraits et événements importants.",
        variant: "warning" as FeatureVariant,
      },
      {
        icon: Globe,
        title: "Accessible partout",
        description: "Utilisable sur mobile avec une connexion limitée.",
        variant: "success" as FeatureVariant,
      },
    ],
  },
];

const extraFeatures = [
  {
    title: "Simulation de tontine",
    description: "Teste différents scénarios avant de créer ta tontine.",
    icon: Layers,
    variant: "info" as FeatureVariant,
  },
  {
    title: "Score de fiabilité",
    description: "Évalue la crédibilité des participants.",
    icon: ShieldCheck,
    variant: "success" as FeatureVariant,
  },
  {
    title: "Multi-tontines",
    description: "Participe à plusieurs tontines en même temps.",
    icon: Users,
    variant: "primary" as FeatureVariant,
  },
  {
    title: "Historique financier personnel",
    description: "Construis un profil financier exploitable.",
    icon: BarChart3,
    variant: "accent" as FeatureVariant,
  },
  {
    title: "Mode prévision",
    description: "Anticipe les gains et les flux d'argent.",
    icon: TrendingUp,
    variant: "secondary" as FeatureVariant,
  },
  {
    title: "Rappels automatiques",
    description: "Ne rate jamais une échéance.",
    icon: Bell,
    variant: "warning" as FeatureVariant,
  },
  {
    title: "Export des données",
    description: "Télécharge les historiques pour analyse.",
    icon: FileText,
    variant: "info" as FeatureVariant,
  },
];

// ─── SMART CONTRACT FLOW ──────────────────────────────────────────────────────

const contractFlow = [
  {
    step: "01",
    title: "Création du contrat",
    desc: "L'organisateur définit les règles (montant, fréquence, ordre). Le smart contract est déployé sur la blockchain.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    step: "02",
    title: "Adhésion des membres",
    desc: "Chaque membre signe le contrat en acceptant les conditions. Leur accord est enregistré on-chain.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    step: "03",
    title: "Cotisations automatiques",
    desc: "À chaque échéance, le contrat collecte automatiquement les cotisations de tous les membres.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    step: "04",
    title: "Distribution automatique",
    desc: "La cagnotte est libérée automatiquement au bénéficiaire du tour. Zéro intervention humaine.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    step: "05",
    title: "Historique immuable",
    desc: "Chaque action est horodatée et inscrite en permanence. L'audit est disponible pour tous.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

// ─── PSEUDO-CODE BLOCK ────────────────────────────────────────────────────────

const pseudoCode = `// Smart Contract TontineChain (Solidity — simplifié)

contract TontineChain {

  struct Tontine {
    address[] members;       // Liste des membres
    uint256 contribution;    // Montant de la cotisation
    uint256 frequency;       // Fréquence (en jours)
    uint256 currentRound;    // Tour actif
    bool strictMode;         // Mode strict activé ?
  }

  // Règles encodées à la création — IMMUABLES
  constructor(
    address[] memory _members,
    uint256 _contribution,
    uint256 _frequency,
    bool _strictMode
  ) { ... }

  // Paiement d'une cotisation
  function payCotisation() external payable {
    require(msg.value == tontine.contribution, "Montant incorrect");
    // Enregistrement horodaté, immuable
    emit CotisationPaid(msg.sender, block.timestamp);
    _checkAndDistribute();
  }

  // Distribution automatique au bénéficiaire
  function _checkAndDistribute() private {
    if (_allMembersPaid()) {
      address beneficiary = members[currentRound];
      payable(beneficiary).transfer(address(this).balance);
      emit FundsDistributed(beneficiary, address(this).balance);
      currentRound++;
    }
  }

  // Mode strict : avance automatique en cas de défaut
  function strictModeAdvance() external {
    require(tontine.strictMode, "Mode strict desactive");
    // Le système couvre le membre défaillant
    ...
  }
}`;

// ─── ACCORDION GROUP ─────────────────────────────────────────────────────────

function AccordionGroup() {
  const [open, setOpen] = useState<string | null>(null);

  const items = [
    {
      id: "q1",
      q: "Pourquoi la blockchain et pas une base de données classique ?",
      a: "Une base de données classique peut être modifiée par son propriétaire. Avec la blockchain, aucune entité unique ne contrôle les données — les règles et les transactions sont gravées dans un registre public, distribué et infalsifiable. Personne, même l'équipe TontineChain, ne peut modifier une tontine créée.",
    },
    {
      id: "q2",
      q: "Que se passe-t-il si un membre ne paie pas ?",
      a: "En mode normal, le membre est signalé et la tontine attend. En mode strict, le contrat peut avancer automatiquement (couverture par le pool de réserve ou pénalités automatiques encodées dans les règles). Les autres membres ne sont jamais bloqués.",
    },
    {
      id: "q3",
      q: "Qui choisit l'ordre des bénéficiaires ?",
      a: "L'ordre est défini à la création du contrat et ne peut plus être modifié. Il peut être aléatoire (tirage on-chain vérifiable), fixe (défini à l'avance) ou consensuel (vote des membres). Une fois choisi et encodé, aucune manipulation n'est possible.",
    },
    {
      id: "q4",
      q: "Les fonds sont-ils sécurisés si TontineChain ferme ?",
      a: "Oui. Les fonds sont dans le smart contract sur la blockchain, pas sur les serveurs de TontineChain. Même si l'entreprise disparaît, le contrat continue de s'exécuter. C'est la promesse fondamentale de la décentralisation.",
    },
    {
      id: "q5",
      q: "Quelle blockchain est utilisée ?",
      a: "TontineChain cible une blockchain compatible EVM (Ethereum Virtual Machine) à faibles frais de transaction, adaptée au contexte africain : par exemple Polygon, Celo, ou une solution Layer 2 d'Ethereum. Le choix final optimise le coût des transactions pour les petites contributions.",
    },
  ];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-2xl"
        >
          <input
            type="radio"
            name="faq"
            checked={open === item.id}
            onChange={() => setOpen(open === item.id ? null : item.id)}
          />
          <div className="collapse-title font-semibold pr-10">{item.q}</div>
          <div className="collapse-content text-base-content/70 text-sm leading-relaxed">
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BlockchainPage() {
  const [activeGroup, setActiveGroup] = useState("blockchain");

  const currentGroup = featureGroups.find((g) => g.id === activeGroup)!;

  return (
    <div className="min-h-screen bg-base-100">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-base-900 bg-gradient-to-br from-primary/20 via-base-200 to-secondary/10 py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          {/* Hexagonal grid pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hex"
                x="0"
                y="0"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge badge-primary badge-outline mb-4 text-sm px-4 py-3 font-mono gap-2">
            <GitBranch size={12} /> Smart Contract · Blockchain
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            La Confiance, <span className="text-primary">Encodée</span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-8">
            TontineChain remplace la confiance aveugle par des règles immuables,
            exécutées automatiquement par un smart contract. Aucune main humaine
            sur la cagnotte.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="stat bg-base-100/80 rounded-2xl px-6 py-3 text-center shadow">
              <div className="stat-value text-primary text-2xl font-black">
                400M+
              </div>
              <div className="stat-desc text-xs">
                USD de tontines/an au Bénin
              </div>
            </div>
            <div className="stat bg-base-100/80 rounded-2xl px-6 py-3 text-center shadow">
              <div className="stat-value text-error text-2xl font-black">
                ~20%
              </div>
              <div className="stat-desc text-xs">
                de tontines avec incident grave
              </div>
            </div>
            <div className="stat bg-base-100/80 rounded-2xl px-6 py-3 text-center shadow">
              <div className="stat-value text-success text-2xl font-black">
                0
              </div>
              <div className="stat-desc text-xs">
                risque de fuite avec la blockchain
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI LA BLOCKCHAIN ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-3">
              Pourquoi la Blockchain ?
            </h2>
            <p className="text-base-content/60 text-lg max-w-xl mx-auto">
              Quatre propriétés fondamentales qui résolvent le problème des
              tontines béninoises.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBlockchainPoints.map((pt) => (
              <div
                key={pt.title}
                className="card bg-base-200 border border-base-300 hover:border-primary/40 hover:shadow-lg transition-all duration-300 rounded-3xl"
              >
                <div className="card-body gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <pt.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{pt.title}</h3>
                  <p className="text-base-content/65 text-sm leading-relaxed">
                    {pt.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-outline badge-secondary mb-3 text-sm px-4 py-3 font-mono gap-2">
              <Code2 size={12} /> Smart Contract Flow
            </div>
            <h2 className="text-4xl font-black mb-3">Comment ça fonctionne</h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Du premier versement à la libération des fonds — tout est
              automatique et vérifiable.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Steps */}
            <div className="space-y-4">
              {contractFlow.map((step, i) => (
                <div
                  key={step.step}
                  className="flex gap-4 p-4 rounded-2xl border border-base-300 bg-base-100 hover:border-primary/30 transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <span
                      className={`font-black text-sm font-mono ${step.color}`}
                    >
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{step.title}</p>
                    <p className="text-sm text-base-content/60 leading-relaxed mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                  {i < contractFlow.length - 1 && (
                    <ChevronRight
                      size={14}
                      className="text-base-content/20 flex-shrink-0 self-center ml-auto"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Code block */}
            <div>
              <div className="mockup-code text-xs rounded-3xl shadow-2xl">
                <pre className="overflow-x-auto whitespace-pre-wrap break-all px-4 py-2">
                  <code>{pseudoCode}</code>
                </pre>
              </div>
              <p className="text-xs text-base-content/40 font-mono mt-3 text-center">
                Code illustratif — simplifié pour la présentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-3">
              Toutes les Fonctionnalités
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Chaque fonctionnalité est conçue pour sécuriser, automatiser et
              rendre transparent le cycle de vie complet d'une tontine.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Tabs */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible flex-shrink-0 lg:w-56">
              {featureGroups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  className={`btn btn-sm lg:btn-md justify-start text-left whitespace-nowrap rounded-2xl transition-all ${
                    activeGroup === g.id
                      ? "btn-primary"
                      : "btn-ghost border border-base-300"
                  }`}
                >
                  {g.title.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-black">{currentGroup.title}</h3>
                <p className="text-base-content/60 mt-1">
                  {currentGroup.description}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {currentGroup.features.map((feat) => {
                  const style = variantStyles[feat.variant];
                  return (
                    <div
                      key={feat.title}
                      className={`card border bg-base-100 rounded-2xl transition-all duration-200 ${style.card}`}
                    >
                      <div className="card-body gap-3 p-5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.icon}`}
                        >
                          <feat.icon size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-sm">{feat.title}</h4>
                            <span className={`badge ${style.badge} badge-xs`}>
                              {feat.variant}
                            </span>
                          </div>
                          <p className="text-xs text-base-content/60 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXTRA FEATURES ── */}
      <section className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge badge-accent badge-outline mb-3 text-sm px-4 py-3 font-mono">
              ✨ Bonus & Fonctionnalités avancées
            </div>
            <h2 className="text-4xl font-black mb-3">Aller plus loin</h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Des outils additionnels pour construire une véritable identité
              financière numérique.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {extraFeatures.map((feat) => {
              const style = variantStyles[feat.variant];
              return (
                <div
                  key={feat.title}
                  className={`card border bg-base-100 rounded-2xl hover:shadow-md transition-all ${style.card}`}
                >
                  <div className="card-body gap-3 p-5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${style.icon}`}
                    >
                      <feat.icon size={16} />
                    </div>
                    <h4 className="font-bold text-sm">{feat.title}</h4>
                    <p className="text-xs text-base-content/55 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Impact Attendu</h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Des tontines sécurisées créent un cercle vertueux d'inclusion
              financière.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                color: "text-success",
                bg: "bg-success/10",
                value: "-60%",
                label: "d'incidents",
                desc: "Les projets similaires en Afrique de l'Est ont réduit les incidents de 60% avec la digitalisation.",
              },
              {
                icon: TrendingUp,
                color: "text-primary",
                bg: "bg-primary/10",
                value: "+35%",
                label: "d'épargne",
                desc: "L'épargne collective augmente quand la confiance est garantie par des règles immuables.",
              },
              {
                icon: Users,
                color: "text-secondary",
                bg: "bg-secondary/10",
                value: "70%",
                label: "de femmes protégées",
                desc: "Les femmes, premières victimes des incidents, sont les premières bénéficiaires de TontineChain.",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="card bg-base-200 border border-base-300 rounded-3xl"
              >
                <div className="card-body items-center text-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}
                  >
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div>
                    <p className={`text-4xl font-black ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="font-bold">{stat.label}</p>
                  </div>
                  <p className="text-sm text-base-content/60 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ODD ── */}
      <section className="py-16 px-4 bg-base-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-8">
            Objectifs de Développement Durable
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              {
                code: "ODD 1",
                label: "Fin de la pauvreté",
                color: "badge-error",
              },
              {
                code: "ODD 8",
                label: "Travail décent",
                color: "badge-warning",
              },
              {
                code: "ODD 10",
                label: "Inégalités réduites",
                color: "badge-accent",
              },
              {
                code: "ODD 16",
                label: "Institutions efficaces",
                color: "badge-primary",
              },
            ].map((odd) => (
              <div
                key={odd.code}
                className={`badge ${odd.color} badge-lg px-5 py-4 gap-2 font-semibold`}
              >
                <CheckCircle2 size={14} />
                {odd.code} — {odd.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Questions Techniques</h2>
            <p className="text-base-content/60">
              Les vraies questions sur la blockchain, répondues clairement.
            </p>
          </div>
          <AccordionGroup />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/15 to-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">
            Prêt à sécuriser votre tontine ?
          </h2>
          <p className="text-base-content/60 text-lg mb-8">
            Rejoignez le mouvement qui va changer la finance communautaire au
            Bénin.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/mockups"
              className="btn btn-primary btn-lg gap-2 rounded-2xl"
            >
              Voir les maquettes
              <ChevronRight size={18} />
            </a>
            <Link
              href="/"
              className="btn btn-ghost btn-lg rounded-2xl border border-base-300"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
