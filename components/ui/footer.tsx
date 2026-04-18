"use client";

import React from "react";
import {
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
} from "lucide-react";
import { FooterItems } from "./FooterItems";
import Button from "./Button";

const Footer = () => {
  const [email, setEmail] = React.useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email inscrit:", email);
    setEmail("");
  };

  const navigationSections = [
    {
      title: "Produits",
      links: ["Cours", "Quiz", "Dashboard", "Progression", "Tarifs"],
    },
    {
      title: "Ressources",
      links: ["Blog", "Centre d'aide", "FAQ", "Guides"],
    },
    {
      title: "Entreprise",
      links: ["À propos", "Contact", "Partenaires", "Carrières"],
    },
  ];

  const legalLinks = [
    "Conditions d'utilisation",
    "Politique de confidentialité",
    "Mentions légales",
    "Cookies",
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter (X)", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="container mx-auto px-6 py-12">
        {/* Logo & Description */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-base-300">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <FooterItems
              title="LearnUp"
              description="Plateforme éducative moderne pour apprendre, progresser et réussir."
              variant="primary"
            />
          </div>

          {/* Navigation Sections */}
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-base-content mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-base-content/70 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-base-300">
          <div className="md:col-span-1">
            <h3 className="font-bold text-base-content mb-2">Reste informé</h3>
            <p className="text-sm text-base-content/70 mb-4">
              Reçois des conseils et mises à jour chaque semaine.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="md:col-span-2 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered flex-1 text-sm"
            />
            <Button type="submit" className="whitespace-nowrap">
              S'abonner
            </Button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Legal Links */}
            <div>
              <h4 className="font-bold text-base-content mb-4">Légal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-base-content/70 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-bold text-base-content mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-base-content/70 text-sm">
                  <Mail size={16} />
                  <a
                    href="mailto:support@learnup.com"
                    className="hover:text-primary transition-colors"
                  >
                    support@learnup.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-base-content/70 text-sm">
                  <Phone size={16} />
                  <a
                    href="tel:+33123456789"
                    className="hover:text-primary transition-colors"
                  >
                    +33 (0)1 23 45 67 89
                  </a>
                </li>
                <li className="flex items-center gap-2 text-base-content/70 text-sm">
                  <MapPin size={16} />
                  <span>France</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-base-content mb-4">
                Réseaux Sociaux
              </h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-base-300 pt-8 text-center">
            <p className="text-base-content/60 text-sm">
              © 2026 LearnUp. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
