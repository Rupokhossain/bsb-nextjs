import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { HeroMotion, StaggerContainer, StaggerItem, FadeIn } from "@/components/common/MotionWrapper";
import { completedProjectsData } from "@/data/projects";

export const metadata = {
  title: "Projects Portfolio | Bangladesh Steel Builders Ltd. (BSB)",
  description:
    "Explore our completed portfolio of pre-engineered steel buildings, factory sheds, cold storages, spinning mills, and commercial infrastructure across Bangladesh.",
};

// 📋 6 Project Types from client's official site
const projectTypes = [
  "Industrial Steel Building Projects",
  "Factory Shed Construction Projects",
  "Warehouse Steel Building Projects",
  "Pre-Engineered Steel Building (PEB) Projects",
  "Commercial Steel Structure Projects",
  "Customized Steel Structure Projects",
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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Light Navbar for white background */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-40 pb-24 space-y-20 sm:space-y-28">
        
        {/* ============================================================ */}
        {/* 1. HEADER SECTION & EXPERIENCE OVERVIEW (From Image 3) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-4">
          <HeroMotion className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E31E24] text-white text-xs font-bold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              <span>OUR PROJECT EXPERIENCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl  font-extrabold  text-neutral-950 uppercase leading-tight mt-4">
              Our Project Experience
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed pt-2">
              We have extensive experience in delivering steel building projects across various industries and locations in Bangladesh. Our completed projects demonstrate our capability to handle small to large-scale steel construction with efficiency and professionalism.
            </p>
          </HeroMotion>
        </section>

        {/* ============================================================ */}
        {/* 2. TYPES OF PROJECTS WE HAVE COMPLETED (From Image 3) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="bg-[#FAF9F6] p-8 sm:p-10 lg:p-12 rounded-sm border border-neutral-200/90 shadow-xs">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-neutral-200/80">
                <div className="space-y-1 max-w-xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006837] block">
                    SPECIALIZED CAPABILITIES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                    Types of Projects We Have Completed
                  </h2>
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
                    className="flex items-center gap-3 p-4 bg-white rounded-sm border border-neutral-200/70 shadow-xs  transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors">
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
            </div>
          </FadeIn>
        </section>

        {/* ============================================================ */}
        {/* 3. FULL-WIDTH 8 COMPLETED PROJECTS MOSAIC (Images 1 & 2) */}
        {/* ============================================================ */}
        {/* ⚠️ Pure visual showcase, no detail links as instructed */}
        <section className="w-full">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-y border-neutral-800/20">
            {completedProjectsData.map((project, idx) => (
              <div
                key={project.id}
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

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent transition-opacity duration-300" />

                {/* Hover Subtle Tint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />

                {/* Index Pill */}
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-sm bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
                  {String(idx + 1).padStart(2, "0")} / 08
                </div>

                {/* Bottom Content: Title & Location */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 space-y-2 z-10">
                  <h3 className="text-base sm:text-lg lg:text-[19px] font-extrabold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-[#E5A53D] transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-neutral-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24] inline-block" />
                    <span>Location: {project.location}</span>
                  </div>
                </div>

                {/* Bottom Gold Accent Line on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5A53D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. NATIONWIDE PROJECT DELIVERY (From Image 3 Bottom) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="p-8 sm:p-12 rounded-sm bg-neutral-950 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Column: Title & Text */}
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                  <span>NATIONWIDE COVERAGE</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
                  Nationwide Project Delivery
                </h2>

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
            </div>
          </FadeIn>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
