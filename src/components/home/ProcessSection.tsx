"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface ProcessSectionProps {
  processImageUrl?: string;
  bannerImageUrl?: string;
}

export default function ProcessSection({
  // Timber frame / construction site photo from public
  processImageUrl = "/service-6.jpg",
  bannerImageUrl = "/progress-banner.jpg",
}: ProcessSectionProps) {
  return (
    <section id="process" className="w-full bg-white text-neutral-900 pt-16 sm:pt-26 border-t border-neutral-100">
      
      {/* 1. TOP PART: "HOW WE WORK" */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
        <div className="space-y-12 sm:space-y-16">
          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>OUR PROCESS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
                How We Work
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xs font-light leading-relaxed">
              From first consultation to handover day, the process is clear and predictable.
            </p>
          </motion.div>

          {/* Workflow Content: Left Image + Right 3-Step Horizontal Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Construction Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-4"
            >
              <div className="relative h-[280px] sm:h-[340px] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md group">
                <Image
                  src={processImageUrl}
                  alt="Construction & Craftsmanship Process"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Right 3 Connected Timeline Steps (Upgraded to modern structured cards for mobile & desktop) */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Horizontal Dashed Timeline Line (Desktop only) */}
                <div className="hidden md:block absolute top-[28px] left-[40px] right-[40px] border-t border-dashed border-[#E5A53D]/50 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
                  {[
                    {
                      step: "01",
                      phase: "PHASE 01",
                      title: "Consultation & Audit",
                      desc: "We analyze your site conditions, structural load requirements, and project budget to map out the ideal engineering path forward.",
                    },
                    {
                      step: "02",
                      phase: "PHASE 02",
                      title: "Design & 3D Modeling",
                      desc: "Our engineering studio converts your brief into a millimeter-accurate 3D BIM model, BNBC-compliant blueprints, and fixed cost estimation.",
                    },
                    {
                      step: "03",
                      phase: "PHASE 03",
                      title: "Fabrication & Handover",
                      desc: "Our factory fabricates certified high-tensile steel components, followed by safe on-site erection and guaranteed on-time handover.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                      className="group flex flex-col justify-between p-5 sm:p-6 rounded-sm bg-[#FAF9F6] border border-neutral-200/90 shadow-xs hover:border-[#E5A53D]/60 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="space-y-3.5">
                        {/* Step Header: Gold Badge + Phase Label */}
                        <div className="flex items-center justify-between">
                          <span className="w-9 h-9 rounded-sm bg-[#E5A53D] text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center shadow-xs">
                            {item.step}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 group-hover:text-[#E5A53D] transition-colors">
                            {item.phase}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1.5">
                          <h3 className="text-base sm:text-lg font-extrabold text-neutral-950 tracking-tight leading-snug group-hover:text-[#E5A53D] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Gold Progress Accent */}
                      <div className="w-8 h-0.5 bg-[#E5A53D] mt-4 group-hover:w-16 transition-all duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH CINEMATIC BANNER */}
      <div className="relative w-full overflow-hidden bg-neutral-950 text-white py-24 sm:py-32 lg:py-40 px-6 sm:px-12 flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
        {bannerImageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={bannerImageUrl}
              alt="Every Detail Designed And Built By One Dedicated Team"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        )}

        {/* Centered Banner Content with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>BUILT WITH INTENT</span>
          </div>

          {/* Large Grotesque Uppercase Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white uppercase leading-[1.15] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
            EVERY DETAIL DESIGNED AND BUILT <br className="hidden sm:inline" />
            BY ONE DEDICATED TEAM
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/90 font-normal max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            From the first sketch to the final finish, your home is delivered by the same hands — no handoffs, no surprises.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
