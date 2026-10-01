"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  theme?: "dark" | "light";
}

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLight = theme === "light";

  // Sticky scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 transition-all duration-300 ${
        isLight
          ? scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm py-4"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-100 py-6"
          : scrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Text Logo (BSB) */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className={`text-2xl font-black tracking-tight transition-colors ${
              isLight
                ? "text-neutral-950 group-hover:text-[#E5A53D]"
                : "text-white group-hover:text-[#E5A53D]"
            }`}
          >
            BSB
          </span>
          <span
            className={`text-[10px] tracking-widest uppercase font-semibold border-l pl-2 transition-colors ${
              isLight
                ? "text-neutral-500 border-neutral-300"
                : "text-slate-300 border-white/30"
            }`}
          >
            Outdoor Living
          </span>
        </Link>

        {/* Center Nav Links (Desktop) - Home, About, Services, Team, Projects */}
        <nav
          className={`hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium transition-colors ${
            isLight ? "text-neutral-700" : "text-white/90"
          }`}
        >
          <Link
            href="/"
            className={isLight ? "hover:text-[#E5A53D]" : "hover:text-[#E5A53D]"}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={isLight ? "hover:text-[#E5A53D]" : "hover:text-[#E5A53D]"}
          >
            About
          </Link>
          <Link
            href="/#services"
            className={isLight ? "hover:text-[#E5A53D]" : "hover:text-[#E5A53D]"}
          >
            Services
          </Link>
          <Link
            href="/#team"
            className={isLight ? "hover:text-[#E5A53D]" : "hover:text-[#E5A53D]"}
          >
            Team
          </Link>
          <Link
            href="/#projects"
            className={isLight ? "hover:text-[#E5A53D]" : "hover:text-[#E5A53D]"}
          >
            Projects
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/#contact"
            className={`px-6 py-2.5 rounded-sm font-semibold text-sm transition-all active:scale-95 shadow-sm ${
              isLight
                ? "bg-neutral-950 text-white hover:bg-neutral-800"
                : "bg-white text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            Book a Consult
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 focus:outline-none transition-colors ${
            isLight ? "text-neutral-950" : "text-white"
          }`}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-neutral-950/98 backdrop-blur-md rounded-lg p-6 border border-white/10 space-y-4 text-white shadow-2xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base hover:text-[#E5A53D] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base hover:text-[#E5A53D] transition-colors"
          >
            About
          </Link>
          <Link
            href="/#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base hover:text-[#E5A53D] transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#team"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base hover:text-[#E5A53D] transition-colors"
          >
            Team
          </Link>
          <Link
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base hover:text-[#E5A53D] transition-colors"
          >
            Projects
          </Link>
          <div className="pt-2 border-t border-white/10">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-sm bg-white text-neutral-950 font-bold"
            >
              Book a Consult
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}