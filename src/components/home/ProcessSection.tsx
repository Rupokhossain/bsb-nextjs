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
    <section id="process" className="w-full bg-white text-neutral-900 pt-24 sm:pt-32 border-t border-neutral-100">
      
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

            {/* Right 3 Connected Timeline Steps */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Horizontal Dashed Timeline Line (Desktop only) */}
                <div className="hidden md:block absolute top-[18px] left-[36px] right-[36px] border-t border-dashed border-[#E5A53D]/50 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
                  {[
                    {
                      step: "01.",
                      title: "Consult",
                      desc: "We learn how you live, your site and your budget, then map the path forward.",
                    },
                    {
                      step: "02.",
                      title: "Design",
                      desc: "Our studio turns your brief into a buildable, design-led plan and a fixed price.",
                    },
                    {
                      step: "03.",
                      title: "Build",
                      desc: "One dedicated team constructs your home to spec, on programme and on budget.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                      className="space-y-4 group"
                    >
                      <div className="w-9 h-9 rounded-sm bg-white border border-neutral-300 group-hover:border-[#E5A53D] group-hover:bg-[#E5A53D] group-hover:text-neutral-950 text-neutral-950 font-bold text-xs flex items-center justify-center shadow-sm transition-all duration-300">
                        {item.step}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-neutral-950 group-hover:text-[#E5A53D] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
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
