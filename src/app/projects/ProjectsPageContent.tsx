/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { HeroMotion, FadeIn } from "@/components/common/MotionWrapper";
import { completedProjectsData, CompletedProject } from "@/data/projects";
import { projectsApi } from "@/lib/api";

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
const engineeringServices = [
  { name: 'Industrial Epoxy & PU Flooring' },
  { name: 'Structural Retrofitting & Repair' },
  { name: 'Chemical Waterproofing & Membrane' },
  { name: 'PEB & Heavy Steel Structure' },
  { name: 'Heavy Machinery Foundation Grouting' },
  { name: 'Concrete Crack Injection & Rehabilitation' },
  { name: 'Thermal Insulation & Fair Facing' },
];

export default function ProjectsPageContent() {
  const [projects, setProjects] = useState<CompletedProject[]>(completedProjectsData);

  // Fetch live projects directly from the database
  useEffect(() => {
    let isMounted = true;

    const loadLiveProjects = async () => {
      try {
        const res = await projectsApi.getAll({ limit: 100 });
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: CompletedProject[] = res.data.map((p: any) => ({
            id: p.slug || p.id,
            title: p.title,
            location: p.location,
            image: p.image,
            category: p.category,
          }));
          setProjects(mapped);
        }
      } catch (err) {
        console.warn("Could not load projects from backend API:", err);
      }
    };

    loadLiveProjects();

    return () => {
      isMounted = false;
    };
  }, []);

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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              <span>OUR PROJECT EXPERIENCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase leading-tight mt-4">
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

              {/* 8 Types Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {projectTypes.map((type, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-white rounded-sm border border-neutral-200/70 shadow-xs transition-colors group"
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
            </div>
          </FadeIn>
        </section>

        {/* ============================================================ */}
        {/* 3. FULL-WIDTH COMPLETED PROJECTS MOSAIC (Images 1 & 2) */}
        {/* ============================================================ */}
        {/* ⚠️ Edge-to-Edge full width, original clean layout */}
        <section className="w-full">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-y border-neutral-800/20">
            {projects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="relative h-[360px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden group select-none border-b sm:border-r border-neutral-200/30 lg:border-neutral-800/40"
              >
                {/* Image with zoom effect */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized={project.image.startsWith("http") || project.image.startsWith("blob:")}
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Subtle Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 sm:h-44 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none transition-opacity duration-300" />

                {/* Index Pill in Top Left */}
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-sm bg-neutral-900/50 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
                  {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>

                {/* Category Pill in Top Right */}
                {project.category && (
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                    {project.category}
                  </div>
                )}

                {/* Bottom Content: Title & Location */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 space-y-2 z-10">
                  <h3 className="text-base sm:text-lg lg:text-[19px] font-extrabold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-[#E5A53D] transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-neutral-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D] inline-block" />
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
        {/* 4. NATIONWIDE PROJECT DELIVERY (Balanced Grid & Larger Fonts) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <FadeIn>
            <div className="p-6 sm:p-10 lg:p-12 rounded-sm bg-neutral-950 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
              
              {/* 👈 বাম পাশ (৭ কলাম): বড় টাইটেল, ক্লিয়ার টেক্সট ও ৪টি বুলেট */}
              <div className="lg:col-span-7 space-y-5">
                {/* টপ ব্যাজ */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-black tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block" />
                  <span>NATIONWIDE EXECUTION &amp; COVERAGE</span>
                </div>

                {/* বড় ও স্পষ্ট হেডলাইন */}
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black tracking-tight text-white uppercase leading-tight">
                  Nationwide Project Execution &amp; Delivery
                </h2>

                {/* সহজে পড়ার মতো বড় প্যারাগ্রাফ */}
                <p className="text-sm sm:text-base text-neutral-200/90 font-light leading-relaxed">
                  We deliver turnkey industrial engineering and steel building solutions across all 64 districts of Bangladesh. No matter the scale or remote location of your facility, our certified site engineers mobilize directly on-location with specialized machinery to ensure uniform precision, certified materials, and international standards.
                </p>

                {/* ৪টি বড় ও স্পষ্ট বুলেট পয়েন্ট */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-200 font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#E5A53D] shrink-0" />
                    <span>All 64 districts on-site mobilization</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#E5A53D] shrink-0" />
                    <span>Heavy-duty industrial epoxy &amp; PU flooring</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#E5A53D] shrink-0" />
                    <span>Structural retrofitting &amp; load strengthening</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#E5A53D] shrink-0" />
                    <span>Turnkey chemical waterproofing &amp; insulation</span>
                  </div>
                </div>
              </div>

              {/* 👉 ডান পাশ (৫ কলাম): সুন্দরভাবে সাজানো সার্ভিস ব্যাজ ও বড় CTA বাটন */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
                {/* ব্যাজগুলো এখন আরও বড় ও দৃশ্যমান */}
                <div className="flex flex-wrap gap-2.5">
                  {engineeringServices.map((service, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-sm bg-white/10 text-neutral-100 text-xs sm:text-[13px] font-semibold border border-white/15 hover:border-[#E5A53D] hover:bg-[#E5A53D]/10 hover:text-[#E5A53D] transition-all cursor-default"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>

                {/* বড় ও স্পষ্ট কনসাল্টেশন বাটন */}
                <div className="pt-1">
                  <a
                    href="https://wa.me/8801711181860"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-lg"
                  >
                    <span>Consult Our Site Engineers</span>
                    <span className="text-base">→</span>
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
