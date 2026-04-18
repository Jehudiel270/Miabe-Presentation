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
} from "lucide-react";

export const advancedFeatures = [
  // 🔐 CORE BLOCKCHAIN
  {
    icon: ShieldCheck,
    title: "Sécurité blockchain",
    description:
      "Toutes les transactions sont enregistrées de manière immuable et sécurisée.",
    variant: "primary",
  },
  {
    icon: Lock,
    title: "Règles immuables",
    description:
      "Les règles de la tontine sont définies dès la création et ne peuvent plus être modifiées.",
    variant: "secondary",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    description:
      "Tous les membres peuvent voir les paiements, retraits et historiques en temps réel.",
    variant: "info",
  },
  {
    icon: FileText,
    title: "Historique infalsifiable",
    description: "Chaque action est tracée et vérifiable à tout moment.",
    variant: "accent",
  },

  // 💰 GESTION TONTINE
  {
    icon: Users,
    title: "Gestion des membres",
    description: "Ajout, suivi et organisation des participants facilement.",
    variant: "primary",
  },
  {
    icon: DollarSign,
    title: "Suivi des contributions",
    description: "Visualise qui a payé, combien et à quel moment.",
    variant: "success",
  },
  {
    icon: Calendar,
    title: "Calendrier intelligent",
    description: "Affiche les dates de paiement, retraits passés et futurs.",
    variant: "warning",
  },
  {
    icon: BarChart3,
    title: "Dashboard financier",
    description: "Vue globale des fonds, contributions et progression.",
    variant: "success",
  },

  // ⚙️ AUTOMATISATION
  {
    icon: RefreshCw,
    title: "Paiements automatisés",
    description:
      "Les contributions sont exécutées automatiquement selon les règles.",
    variant: "primary",
  },
  {
    icon: Zap,
    title: "Distribution automatique",
    description:
      "Les fonds sont libérés automatiquement au bénéficiaire prévu.",
    variant: "secondary",
  },
  {
    icon: Clock,
    title: "Gestion des échéances",
    description: "Respect automatique des dates de paiement et de retrait.",
    variant: "warning",
  },

  // ⚠️ MODE STRICT (TRÈS IMPORTANT)
  {
    icon: AlertTriangle,
    title: "Mode strict",
    description:
      "Active un système où les paiements sont forcés automatiquement même en cas de défaut.",
    variant: "error",
  },
  {
    icon: TrendingUp,
    title: "Avance automatique",
    description:
      "Le système couvre automatiquement un membre en cas de non-paiement.",
    variant: "accent",
  },
  {
    icon: ShieldCheck,
    title: "Zéro défaut de paiement",
    description: "Aucun membre ne peut bloquer la tontine.",
    variant: "success",
  },

  // 👤 CONTRÔLE UTILISATEUR
  {
    icon: UserMinus,
    title: "Quitter la tontine sécurisé",
    description: "Visualise les pénalités et conséquences avant de quitter.",
    variant: "error",
  },
  {
    icon: Info,
    title: "Détails des règles",
    description: "Accède à toutes les règles et conditions de la tontine.",
    variant: "info",
  },

  // 🔔 UTILITÉ
  {
    icon: Bell,
    title: "Notifications intelligentes",
    description: "Alertes pour paiements, retraits et événements importants.",
    variant: "warning",
  },
  {
    icon: Globe,
    title: "Accessible partout",
    description: "Utilisable sur mobile avec une connexion limitée.",
    variant: "success",
  },
];

export const extraFeatures = [
  {
    title: "Simulation de tontine",
    description: "Teste différents scénarios avant de créer ta tontine.",
    icon: Layers,
    variant: "info",
  },
  {
    title: "Score de fiabilité",
    description: "Évalue la crédibilité des participants.",
    icon: ShieldCheck,
    variant: "success",
  },
  {
    title: "Multi-tontines",
    description: "Participe à plusieurs tontines en même temps.",
    icon: Users,
    variant: "primary",
  },
  {
    title: "Historique financier personnel",
    description: "Construis un profil financier exploitable.",
    icon: BarChart3,
    variant: "accent",
  },
  {
    title: "Mode prévision",
    description: "Anticipe les gains et les flux d’argent.",
    icon: TrendingUp,
    variant: "secondary",
  },
  {
    title: "Rappels automatiques",
    description: "Ne rate jamais une échéance.",
    icon: Bell,
    variant: "warning",
  },
  {
    title: "Export des données",
    description: "Télécharge les historiques pour analyse.",
    icon: FileText,
    variant: "info",
  },
];
