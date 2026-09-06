"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const NAV_LINKS = [
  { href: "/#a-propos", label: "À Propos" },
  { href: "/#actions", label: "Nos Actions" },
  { href: "/actualites", label: "Actualités" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white shadow-sm">
      <div className="h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <a href="/#accueil" className="flex items-center gap-3">
            <span className="relative h-12 w-20 shrink-0">
              <Image src={logo} alt="Humanis Guinée Solidarité" fill className="object-contain" />
            </span>
            <span className="hidden sm:inline font-poppins font-bold text-humanis-blue text-xl">
              HUMANIS GUINÉE
            </span>
          </a>

          <nav className="hidden md:flex space-x-6 font-medium text-humanis-blue">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-humanis-yellow transition">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#dons"
              className="bg-humanis-red text-white px-4 sm:px-6 py-2 rounded-full font-bold hover:bg-red-700 transition text-sm sm:text-base"
            >
              Soutenir
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="md:hidden p-2 text-humanis-blue"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1 shadow-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-humanis-blue font-medium py-3 border-b border-gray-50 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
