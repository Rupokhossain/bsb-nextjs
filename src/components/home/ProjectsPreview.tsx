"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { completedProjectsData } from "@/data/projects";

// 📋 Project Types from client's official site & specialized engineering
const projectTypes = [
  "Steel Structure Duplex Houses & Luxury Villas",
  "Convention Halls & Commercial Event Centers",
  "Rooftop Steel Structure & Shed Projects",
  "Rooftop Restaurant & Sky Lounge Enclosures",
  "Rooftop Garden, Pergola & Canopy Structures",
  "Pre-Engineered Steel Building (PEB) Projects",
  "Industrial Factory Shed & Warehouse Projects",
  "Commercial Multi-Storey Buildings & Towers",
];

// 📍 Key Industrial Delivery Zones across Bangladesh
const deliveryLocations = [
  { name: "Dhaka", role: "HQ & Commercial Hub" },
  { name: "Chattogram", role: "Heavy Industrial & Port Zone" },
  { name: "Gazipur", role: "Textile & Manufacturing Core" },
  { name: "Narayanganj", role: "Riverport & Mill District" },
  { name: "Savar", role: "EPZ & Industrial Belts" },
  { name: "Rangpur & Pabna", role: "Agro-Industrial Projects" },
];

export default function ProjectsPreview() {
  return (
    <section
      id="projects"
      className="bg-white text-neutral-900 py-20 sm:py-28 border-t border-neutral-100 overflow-hidden"
    >
      {/* ============================================================ */}
      {/* 1. SECTION INTRO & PROJECT EXPERIENCE (From Client's Image 3) */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-16 sm:mb-20 space-y-12">
        
        {/* Top Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
            <span>OUR PROJECT EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
            Our Project Experience
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            We have extensive experience in delivering steel building projects across various industries and locations in Bangladesh. Our completed projects demonstrate our capability to handle small to large-scale steel construction with efficiency and professionalism.
          </p>
        </motion.div>

        {/* 2-Column Showcase Box for Types of Projects (Designed for luxury & corporate clarity) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF9F6] p-8 sm:p-10 lg:p-12 rounded-sm border border-neutral-200/90 shadow-xs"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-neutral-200/80">
            <div className="space-y-1 max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006837] block">
                SPECIALIZED EXPERTISE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                Types of Projects We Have Completed
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-md leading-relaxed">
              Each project is designed according to client requirements, site conditions, and international engineering standards.
            </p>
          </div>

          {/* 6 Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
            {projectTypes.map((type, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-white rounded-sm border border-neutral-200/70 shadow-xs group"
              >
                <div className="w-7 h-7 rounded-full bg-[#E5A53D]/20 text-neutral-950 flex items-center justify-center shrink-0 group-hover:bg-[#E5A53D] group-hover:text-neutral-950 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight leading-snug">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ============================================================ */}
      {/* 2. FULL-WIDTH 8 COMPLETED PROJECTS MOSAIC (Images 1 & 2) */}
      {/* ============================================================ */}
      {/* ⚠️ Edge-to-Edge full width, no link/details page as requested */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-y border-neutral-800/20">
        {completedProjectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.08, ease: "easeOut" }}
            className="relative h-[360px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden group select-none border-b sm:border-r border-neutral-200/30 lg:border-neutral-800/40"
          >
            {/* Image with zoom effect */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Subtle Bottom Gradient (Light & Crisp, only behind text so photos stay bright & natural) */}
            <div className="absolute inset-x-0 bottom-0 h-40 sm:h-44 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none transition-opacity duration-300" />

            {/* Index Pill in Top Left */}
            <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-sm bg-neutral-900/50 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
              {String(idx + 1).padStart(2, "0")} / {String(completedProjectsData.length).padStart(2, "0")}
            </div>

            {/* Category Pill in Top Right (Highlights Rooftop Specialties) */}
            {project.category && (
              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                {project.category}
              </div>
            )}

            {/* Bottom Content: Title & Location (Exact match with reference screenshots) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 space-y-2 z-10">
              <h3 className="text-base sm:text-lg lg:text-[19px] font-extrabold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-[#E5A53D] transition-colors">
                {project.title}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-neutral-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D] inline-block" />
                <span>Location: {project.location}</span>
              </div>
            </div>

            {/* Bottom Gold/Red Accent Line on Hover */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5A53D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </motion.div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* 3. NATIONWIDE PROJECT DELIVERY (From Client's Image 3 Bottom) */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-12 rounded-sm bg-neutral-950 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          {/* Left Column: Title & Text */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>NATIONWIDE COVERAGE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              Nationwide Project Delivery
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              We proudly serve clients across Dhaka, Chattogram, Gazipur, Narayanganj, Savar, and other industrial zones of Bangladesh. Regardless of the project&apos;s scale or location, we guarantee uniform quality and skilled execution.
            </p>
          </div>

          {/* Right Column: Industrial Hubs Badge Strip + Contact CTA */}
          <div className="w-full lg:w-auto space-y-4">
            <div className="flex flex-wrap gap-2 max-w-md">
              {deliveryLocations.map((loc, lIdx) => (
                <span
                  key={lIdx}
                  className="px-3 py-1.5 rounded-sm bg-white/10 text-neutral-200 text-xs font-medium border border-white/10 hover:border-[#E5A53D] transition-colors"
                >
                  {loc.name}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/8801711181860"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md"
              >
                <span>Consult Our Site Engineers</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
