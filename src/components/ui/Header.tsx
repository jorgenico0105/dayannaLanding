"use client";

import { useState, useEffect, memo } from "react";

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Quien Soy", href: "#quien-soy" },
  { name: "Servicios", href: "#servicios" },
  { name: "FAQ", href: "#faq" },
  { name: "Contacto", href: "#contacto" },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-medium py-3"
          : "bg-white/50 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-1 group">
            <span className="text-2xl font-extrabold text-dark group-hover:text-turquoise transition-colors">
              Dayanna
            </span>
            <span className="text-2xl font-extrabold text-turquoise">
              .
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-dark hover:text-turquoise transition-colors duration-300 font-medium group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-turquoise to-turquoise-dark rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contacto" className="btn-primary py-3 px-6">
              Agendar Cita
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-turquoise/10 flex items-center justify-center text-turquoise hover:bg-turquoise hover:text-white transition-all"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[400px] mt-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-1 bg-white rounded-2xl p-4 shadow-large border border-turquoise/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-dark hover:text-turquoise hover:bg-turquoise/5 transition-all duration-300 font-medium py-3 px-4 rounded-xl"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary text-center mt-3"
            >
              Agendar Cita
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
