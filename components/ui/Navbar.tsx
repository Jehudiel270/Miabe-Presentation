"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";

type Theme = "light" | "night";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
      setTheme(savedTheme);
    }
  }, [mounted]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "night" : "light"));
  };

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("theme", theme);
      } catch {}
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Fonctionnalités", href: "/features" },
    { label: "Maquettes", href: "/mockups" },
    { label: "Blockchain", href: "/blockchain" },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        {/* Logo */}
        <Link
          href="/"
          className="btn btn-ghost text-xl md:text-2xl font-bold gap-2"
        >
          <span className="text-primary">Tontine</span>
          <span className="text-secondary">Chain</span>
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex gap-2 items-center">
        {/* Nav */}
        <div className="flex gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="btn btn-ghost btn-md text-base-content/80 hover:text-primary transition-colors no-underline"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="divider divider-horizontal mx-1 h-6"></div>

        {/* Auth (restauré comme demandé) */}
        <Link href="/login" className="btn btn-ghost btn-md">
          Se connecter
        </Link>

        <Link href="/register" className="btn btn-primary btn-md">
          S&apos;inscrire
        </Link>

        {/* Theme */}
        <button
          onClick={handleThemeToggle}
          className="btn btn-ghost btn-circle btn-md"
          aria-label="Basculer le thème"
        >
          {mounted &&
            (theme === "light" ? <Moon size={20} /> : <Sun size={20} />)}
          {!mounted && <Sun size={20} />}
        </button>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden gap-2">
        <button
          onClick={handleThemeToggle}
          className="btn btn-ghost btn-circle btn-sm"
        >
          {mounted &&
            (theme === "light" ? <Moon size={20} /> : <Sun size={20} />)}
          {!mounted && <Sun size={20} />}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-ghost btn-circle btn-sm"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed left-0 right-0 top-16 w-full bg-base-100 border-b border-base-300 shadow-lg z-40 flex flex-col py-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block w-full px-6 py-3 hover:bg-base-200 transition-colors text-base-content/80 hover:text-primary no-underline"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div className="divider my-1 mx-0"></div>

          {/* Auth Mobile */}
          <Link
            href="/login"
            className="block w-full px-6 py-3 hover:bg-base-200 transition-colors text-base-content/80 no-underline"
            onClick={() => setIsOpen(false)}
          >
            Se connecter
          </Link>

          <div className="px-6 py-3">
            <Link
              href="/register"
              className="btn btn-primary btn-sm w-full"
              onClick={() => setIsOpen(false)}
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
