/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { completedProjectsData, CompletedProject } from "@/data/projects";
import { projectsApi } from "@/lib/api";
import { FadeIn } from "../common/MotionWrapper";

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

// ইঞ্জিনিয়ারিং ও ইন্ডাস্ট্রিয়াল কাজের তালিকা (বিভাগের পরিবর্তে)
const engineeringServices = [
  { name: 'Industrial Epoxy & PU Flooring' },
  { name: 'Structural Retrofitting & Repair' },
  { name: 'Chemical Waterproofing & Membrane' },
  { name: 'PEB & Heavy Steel Structure' },
  { name: 'Heavy Machinery Foundation Grouting' },
  { name: 'Concrete Crack Injection & Rehabilitation' },
  { name: 'Thermal Insulation & Fair Facing' },
];

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<CompletedProject[]>(completedProjectsData);

  useEffect(() => {
    let isMounted = true;

    const loadLiveProjects = async () => {
      try {
        const res = await projectsApi.getAll();
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((p: any) => ({
            id: p.slug || p.id,
            title: p.title,
            location: p.location,
            image: p.image,
            category: p.category,
          }));
          setProjects(mapped);
        }
      } catch (err) {
        console.warn("Could not load live projects:", err);
      }
    };
    loadLiveProjects();

    return () => {
      isMounted = false;
    };
  }, []);
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
        {projects.map((project, idx) => (
          <motion.div
            key={`${project.id}-${idx}`}
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
              unoptimized={project.image.startsWith("http") || project.image.startsWith("blob:")}
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Subtle Bottom Gradient (Light & Crisp, only behind text so photos stay bright & natural) */}
            <div className="absolute inset-x-0 bottom-0 h-40 sm:h-44 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none transition-opacity duration-300" />

            {/* Index Pill in Top Left */}
            <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-sm bg-neutral-900/50 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
              {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
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
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* 4. NATIONWIDE PROJECT DELIVERY (Balanced Grid & Larger Fonts) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-24">
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
    </section>
  );
}
