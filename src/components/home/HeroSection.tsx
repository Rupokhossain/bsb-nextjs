"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { siteContentApi, settingsApi } from "@/lib/api";

interface HeroSectionProps {
  backgroundImageUrl?: string;
  initialData?: any;
}

export default function HeroSection({
  backgroundImageUrl = "/hero-bg.jpg",
  initialData,
}: HeroSectionProps) {
  const [heroData, setHeroData] = useState(() => ({
    badge: initialData?.heroBadge || "NIRMAN BSB • ARCHITECTURAL & ROOFTOP STEEL",
    headline1: initialData?.heroHeadline1 || "We Build",
    headline2: initialData?.heroHeadline2 || "Stand Strong To Last A Lifetime",
    subtitle:
      initialData?.heroSubtitle ||
      "Nirman BSB is the premier structural engineering, rooftop architecture, steel duplex, and consultancy wing of Bangladesh Steel Builders Ltd. We engineer precision spaces built for lasting beauty and certified structural safety across Bangladesh.",
    ctaText: initialData?.heroPrimaryCtaText || "Book a Consultation",
    imageUrl: initialData?.heroImageUrl || backgroundImageUrl,
  }));
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/8801711181860");

  useEffect(() => {
    siteContentApi
      .getAll()
      .then((res) => {
        if (res?.dictionary?.home) {
          const h = res.dictionary.home;
          setHeroData((prev) => ({
            ...prev,
            badge: h.heroBadge || prev.badge,
            headline1: h.heroHeadline1 || prev.headline1,
            headline2: h.heroHeadline2 || prev.headline2,
            subtitle: h.heroSubtitle || prev.subtitle,
            ctaText: h.heroPrimaryCtaText || prev.ctaText,
            imageUrl: h.heroImageUrl || prev.imageUrl,
          }));
        }
      })
      .catch(() => {});

    settingsApi
      .get()
      .then((s) => {
        if (s?.whatsapp) {
          setWhatsappUrl(`https://wa.me/${s.whatsapp.replace(/[^0-9]/g, "")}`);
        }
      })
      .catch(() => {});
  }, []);

  const activeBg = heroData.imageUrl || backgroundImageUrl || "/hero-bg.jpg";

  return (
    <section className="relative min-h-screen flex items-center bg-neutral-900 text-white overflow-hidden">
      {/* Background Image - Cinematic slow zoom out into position */}
      <motion.div
        key={activeBg}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${activeBg}')` }}
      />

      {/* Balanced Soft Cinematic Overlay - Architecture stays bright & sunny, text stays crisp */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-neutral-950/25 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/35 via-transparent to-neutral-950/15 z-[1]" />

      {/* Hero Content Container - Aligned with consistent responsive side padding */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs sm:text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>{heroData.badge}</span>
            </div>
          </motion.div>

          {/* Big Bold Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.2] lg:leading-[1.16] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            {heroData.headline1} <br />
            {heroData.headline2}
          </motion.h1>

          {/* Subheading / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="max-w-xl text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            {heroData.subtitle}
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="pt-2"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm sm:text-base pl-5 pr-1.5 py-1.5 transition-all group shadow-md active:scale-95"
            >
              <span>{heroData.ctaText}</span>
              <div className="ml-4 w-9 h-9 rounded-sm bg-neutral-950 flex items-center justify-center text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}