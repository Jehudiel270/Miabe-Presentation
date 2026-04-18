"use client";

import { useState } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  ExternalLink,
  Play,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const screens = [
  // {
  //   id: "home",
  //   label: "Accueil",
  //   badge: "Landing",
  //   badgeColor: "badge-primary",
  //   description:
  //     "L'écran d'accueil présente TontineChain, les statistiques clés du problème et l'appel à l'action.",
  //   // Remplacer src par ton image réelle
  //   placeholder: "Capture d'écran — Page d'accueil",
  //   aspectRatio: "aspect-[9/16]",
  //   src: null, // "/mockups/home.png"
  // },
  {
    id: "create",
    label: "Créer une tontine",
    badge: "Formulaire",
    badgeColor: "badge-secondary",
    description:
      "L'organisateur définit les règles : montant de la cotisation, fréquence, nombre de membres, ordre des tours.",
    placeholder: "Capture d'écran — Création de tontine",
    aspectRatio: "aspect-[9/16]",
    src: "/create_tontine.png",
  },
  {
    id: "dashboard",
    label: "Tableau de bord membre",
    badge: "Dashboard",
    badgeColor: "badge-accent",
    description:
      "Vue en temps réel de la tontine : qui a payé, le montant de la cagnotte, le bénéficiaire du tour actif.",
    placeholder: "Capture d'écran — Dashboard membre",
    aspectRatio: "aspect-[9/16]",
    src: "/tableau_de_bord_membre.png",
  },
  {
    id: "payment",
    label: "Écran de paiement",
    badge: "Transaction",
    badgeColor: "badge-success",
    description:
      "Le membre confirme sa cotisation. La transaction est signée et enregistrée sur la blockchain instantanément.",
    placeholder: "Capture d'écran — Paiement",
    aspectRatio: "aspect-[9/16]",
    src: "/PaymentScreen.png",
  },
  {
    id: "history",
    label: "Historique & Transparence",
    badge: "Audit",
    badgeColor: "badge-warning",
    description:
      "L'historique immuable de toutes les transactions de la tontine, consultable par n'importe quel membre.",
    placeholder: "Capture d'écran — Historique",
    aspectRatio: "aspect-[9/16]",
    src: "/historyScreen.png",
  },
];

const previewDevice = [
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "max-w-xs" },
  { id: "tablet", label: "Tablette", icon: Tablet, width: "max-w-sm" },
  { id: "desktop", label: "Desktop", icon: Monitor, width: "max-w-3xl" },
];

// ─── LIVE PREVIEW MINI ────────────────────────────────────────────────────────

function LivePreviewDashboard() {
  const previewUrl = "https://maquette-miabe.vercel.app/"; // Remplace cette URL par ton lien

  return (
    <div className="mockup-phone border-primary shadow-2xl mx-auto max-w-xs ">
      <div className="display bg-base-100 ">
        <iframe
          src={previewUrl}
          title="Aperçu du site"
          className="w-full h-full rounded-3xl border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────

function Lightbox({
  screen,
  onClose,
}: {
  screen: (typeof screens)[0];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-base-100 rounded-3xl max-w-lg w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">{screen.label}</h3>
            <span className={`badge ${screen.badgeColor} badge-sm`}>
              {screen.badge}
            </span>
          </div>
          <button className="btn btn-ghost btn-circle btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div
          className={`${screen.aspectRatio} bg-base-200 rounded-2xl flex items-center justify-center mb-4`}
        >
          {screen.src ? (
            <img
              src={screen.src}
              alt={screen.label}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="text-center p-6">
              <ImageIcon
                size={40}
                className="mx-auto text-base-content/30 mb-2"
              />
              <p className="text-sm text-base-content/50 font-mono">
                {screen.placeholder}
              </p>
              <p className="text-xs text-base-content/30 mt-1">
                Remplacer par l'image réelle
              </p>
            </div>
          )}
        </div>
        <p className="text-sm text-base-content/70">{screen.description}</p>
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function MaquettesPage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [device, setDevice] = useState("mobile");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const current = screens[activeScreen];
  const currentDevice = previewDevice.find((d) => d.id === device)!;

  return (
    <div className="min-h-screen bg-base-100">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-base-200 py-20 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge badge-primary badge-outline mb-4 text-sm px-4 py-3 font-mono">
            Phase 1 — Présélection
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Maquettes <span className="text-primary">TontineChain</span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Découvrez les écrans clés de l'application — du tableau de bord
            membre à l'écran de paiement sécurisé par la blockchain.
          </p>
        </div>
      </section>

      {/* ── GALERIE ── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black">Écrans de l'application</h2>
              <p className="text-base-content/60 mt-1">
                {screens.length} maquettes · Interface mobile-first
              </p>
            </div>
            {/* Device selector */}
            <div className="join hidden md:flex">
              {previewDevice.map((d) => (
                <button
                  key={d.id}
                  className={`join-item btn btn-sm gap-2 ${device === d.id ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setDevice(d.id)}
                >
                  <d.icon size={14} />
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main viewer */}
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
            {/* Preview */}
            <div
              className={`mx-auto w-full ${currentDevice.width} transition-all duration-500`}
            >
              <div
                className={`${current.aspectRatio} relative bg-base-200 rounded-3xl border-2 border-base-300 flex items-center justify-center overflow-hidden group cursor-pointer shadow-xl`}
                onClick={() => setLightbox(activeScreen)}
              >
                {current.src ? (
                  <img
                    src={current.src}
                    alt={current.label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon
                      size={48}
                      className="mx-auto text-base-content/20 mb-3"
                    />
                    <p className="text-sm text-base-content/40 font-mono leading-relaxed">
                      {current.placeholder}
                    </p>
                    <p className="text-xs text-base-content/25 mt-2">
                      Glissez votre image ici ou remplacez{" "}
                      <code className="bg-base-300 px-1 rounded">src</code>
                    </p>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-base-100/90 rounded-2xl px-4 py-2 flex items-center gap-2 text-sm font-semibold">
                    <Maximize2 size={14} /> Agrandir
                  </div>
                </div>
              </div>

              {/* Nav arrows */}
              <div className="flex items-center justify-between mt-4">
                <button
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() => setActiveScreen((p) => Math.max(0, p - 1))}
                  disabled={activeScreen === 0}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-base-content/50 font-mono">
                  {activeScreen + 1} / {screens.length}
                </span>
                <button
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() =>
                    setActiveScreen((p) => Math.min(screens.length - 1, p + 1))
                  }
                  disabled={activeScreen === screens.length - 1}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 pt-4">
              <span className={`badge ${current.badgeColor} badge-md`}>
                {current.badge}
              </span>
              <h3 className="text-3xl font-black">{current.label}</h3>
              <p className="text-base-content/70 text-lg leading-relaxed">
                {current.description}
              </p>

              <div className="divider" />

              {/* Thumb list */}
              <div className="space-y-2">
                {screens.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveScreen(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                      i === activeScreen
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-base-200"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {s.src ? (
                        <img
                          src={s.src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={16} className="text-base-content/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold text-sm truncate ${i === activeScreen ? "text-primary" : ""}`}
                      >
                        {s.label}
                      </p>
                      <span className={`badge ${s.badgeColor} badge-xs`}>
                        {s.badge}
                      </span>
                    </div>
                    {i === activeScreen && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE PREVIEW ── */}
      <section className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge badge-success badge-outline mb-3 text-sm px-4 py-3 font-mono gap-2">
              <Play size={12} /> Version interactive
            </div>
            <h2 className="text-4xl font-black mb-3">Aperçu en direct</h2>
            <p className="text-base-content/60 text-lg max-w-xl mx-auto">
              Voici une version simulée du tableau de bord membre pour illustrer
              l'expérience utilisateur de TontineChain.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <LivePreviewDashboard />
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Ce que vous voyez :</h3>
              {[
                {
                  label: "Cagnotte en temps réel",
                  desc: "Le montant total collecté, visible par tous les membres à tout instant.",
                },
                {
                  label: "Bénéficiaire du tour actif",
                  desc: "Désigné automatiquement par le smart contract, personne ne peut le modifier.",
                },
                {
                  label: "Statut des cotisations",
                  desc: "Chaque membre voit instantanément qui a payé et qui est en retard.",
                },
                {
                  label: "Bouton de paiement sécurisé",
                  desc: "La transaction est signée et enregistrée de façon immuable sur la blockchain.",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-base-content/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
              <a
                href="/blockchain"
                className="btn btn-primary btn-wide gap-2 mt-4"
              >
                Voir la solution blockchain
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
