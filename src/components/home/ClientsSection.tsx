"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

// 13 Unique Industrial Client Logos (c12 duplicate removed)
const clientLogos = [
  { id: 1, name: "Prime Pusti Limited", src: "/c1.png" },
  { id: 2, name: "Advance Tech Ltd.", src: "/c2.png" },
  { id: 3, name: "HR Jute Mills Pvt. Ltd.", src: "/c3.jpg" },
  { id: 4, name: "Hasan Jute Mills Limited", src: "/c4.jpg" },
  { id: 6, name: "Bengal Steel & Agro", src: "/c6.jpg" },
  { id: 7, name: "Apex Industrial Solutions", src: "/c7.jpg" },
  { id: 8, name: "Crown Spinning Mills", src: "/c8.jpg" },
  { id: 9, name: "Delta Commercial Logistics", src: "/c9.jpg" },
  { id: 10, name: "Standard Composite Mills", src: "/c10.jpg" },
  { id: 11, name: "Eastern Engineering Works", src: "/c11.jpg" },
  { id: 13, name: "Meghna Industrial Park", src: "/c13.jpg" },
  { id: 14, name: "Universal Polymer Ltd.", src: "/c14.jpg" },
  { id: 15, name: "Padma Commercial Center", src: "/c15.jpg" },
];

export default function ClientsSection() {
  return (
    <section
      id="clients"
      className="py-20 sm:py-28 bg-white border-t border-neutral-200/80 overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10 sm:space-y-12">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADER: Badge + Headline + Context */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>HONORED CLIENTS & PARTNERS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
              Trusted by Bangladesh&apos;s <br />
              Leading Enterprises
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              From heavy manufacturing mills and textile giants to mega agro-conglomerates and commercial developers, we deliver verified steel engineering excellence with unwavering trust.
            </p>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. PROVEN TRUST METRICS STRIP */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 bg-[#FAF9F6] rounded-sm border border-neutral-200/90 shadow-xs"
        >
          <div className="space-y-1 border-r border-neutral-200/70 last:border-none pr-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              150<span className="text-[#E5A53D]">+</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              Industrial Projects Delivered
            </div>
          </div>

          <div className="space-y-1 border-r border-neutral-200/70 last:border-none pr-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              17<span className="text-[#E5A53D]">+</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              Years of Industry Trust
            </div>
          </div>

          <div className="space-y-1 border-r border-neutral-200/70 last:border-none pr-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              64
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              Districts Covered Nationwide
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              100<span className="text-[#E5A53D]">%</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              BNBC & AISC Safety Certified
            </div>
          </div>
        </motion.div>

      </div>

      {/* ============================================================ */}
      {/* 3. BORDERLESS FLOATING LOGOS (LARGE & CLEAN, NO CARD BOXES) */}
      {/* ============================================================ */}
      <div className="relative mt-12 sm:mt-16 w-full overflow-hidden py-6 sm:py-8">
        
        {/* Left & Right Gradient Edge Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-44 lg:w-64 z-20 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-44 lg:w-64 z-20 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Single Seamless Infinite Marquee with Spacious Pure Logos */}
        <div className="flex items-center gap-6 sm:gap-12  animate-marquee py-3">
          {[...clientLogos, ...clientLogos].map((client, idx) => (
            <div
              key={`client-${client.id}-${idx}`}
              className="flex-shrink-0 w-44 sm:w-56 md:w-64 h-24 sm:h-28 md:h-32 relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-115"
            >
              <Image
                src={client.src}
                alt={client.name}
                fill
                className="object-contain filter contrast-[1.05]"
                sizes="(max-width: 768px) 180px, 260px"
              />
            </div>
          ))}
        </div>

      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM TRUST BADGE & WHATSAPP ACTION CALLOUT */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14">
        <div className="p-6 sm:p-8 rounded-sm bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-neutral-800">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-wider block">
              Enterprise Partnership
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Ready to construct your next industrial or commercial steel facility?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Join over 150+ satisfied industrial partners with guaranteed on-time delivery and structural excellence.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto flex justify-center">
            <a
              href="https://wa.me/8801711181860"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-wide whitespace-nowrap transition-all active:scale-95 shadow-md text-center"
            >
              <span className="whitespace-nowrap">Consult Our Senior Engineers</span>
              <span className="shrink-0">→</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
