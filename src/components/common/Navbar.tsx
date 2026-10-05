"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavbarProps {
  theme?: "dark" | "light";
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Nirman Bsb", href: "/nirman-bsb" },
  { name: "Projects", href: "/projects" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
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

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // When scrolled OR when on light-themed pages, show the clean white background with dark text
  const isScrolledOrLight = isLight || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm py-4"
          : isLight
          ? "bg-white/90 backdrop-blur-sm border-b border-neutral-100 py-6"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Logo & Full Company Name */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group py-1">
          <Image
            src="/logo.png"
            alt="Bangladesh Steel Builders Ltd."
            width={64}
            height={48}
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            priority
          />
          <span
            className={`text-[11px] sm:text-xs md:text-sm lg:text-[15px] font-extrabold uppercase tracking-tight leading-none transition-colors whitespace-nowrap ${
              isScrolledOrLight ? "text-[#006837]" : "text-white"
            }`}
          >
            <span>BANGLADESH </span>
            <span className="text-[#E31E24]">STEEL </span>
            <span>BUILDERS LTD.</span>
          </span>
        </Link>

        {/* Center Nav Links (Desktop) - Home, About, Services, Team, Projects */}
        <nav
          className={`hidden md:flex items-center gap-7 lg:gap-9 text-sm transition-colors ${
            isScrolledOrLight ? "text-neutral-700" : "text-white"
          }`}
        >
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-1 transition-all ${
                  active
                    ? "text-[#E5A53D] font-bold"
                    : isScrolledOrLight
                    ? "font-medium text-neutral-700 hover:text-[#E5A53D]"
                    : "font-medium text-white/90 hover:text-white"
                }`}
              >
                <span>{item.name}</span>
                {/* Active Indicator Underline */}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E5A53D] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button -> WhatsApp Book a Consult */}
        <div className="hidden md:flex items-center">
          <a
            href="https://wa.me/8801711181860"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-2.5 rounded-sm font-semibold text-sm transition-all active:scale-95 shadow-sm ${
              isScrolledOrLight
                ? "bg-neutral-950 text-white hover:bg-neutral-800"
                : "bg-white text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            Book a Consult
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 focus:outline-none transition-colors ${
            isScrolledOrLight ? "text-neutral-950" : "text-white"
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
        <div className="md:hidden mt-4 bg-neutral-950/98 backdrop-blur-md rounded-lg p-5 border border-white/10 space-y-2 text-white shadow-2xl">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between text-base px-3.5 py-2.5 rounded-sm transition-all border-l-2 ${
                  active
                    ? "text-[#E5A53D] font-semibold bg-white/[0.06] border-[#E5A53D]"
                    : "text-neutral-300 hover:text-white hover:bg-white/5 font-normal border-transparent"
                }`}
              >
                <span>{item.name}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D]" />
                )}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10">
            <a
              href="https://wa.me/8801711181860"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-sm font-bold transition-all bg-[#E5A53D] text-neutral-950 shadow-md"
            >
              Book a Consult
            </a>
          </div>
        </div>
      )}
    </header>
  );
}