/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { siteContentApi } from "@/lib/api";

interface ProcessSectionProps {
  processImageUrl?: string;
  bannerImageUrl?: string;
  initialData?: any;
}

export default function ProcessSection({
  processImageUrl = "/steel-building.jpg",
  bannerImageUrl = "/Sunset Concrete Construction Skyline.png",
  initialData,
}: ProcessSectionProps) {
  const [data, setData] = useState(() => ({
    processBadge: initialData?.processBadge || "OUR PROCESS",
    processHeadline: initialData?.processHeadline || "How We Work",
    processSubtitle: initialData?.processSubtitle || "From first consultation to handover day, the process is clear and predictable.",
    phase1Title: initialData?.phase1Title || "Consultation & Structural Audit",
    phase1Desc: initialData?.phase1Desc || "We analyze site soil conditions, structural load requirements, and project budget to map out the ideal engineering path forward.",
    phase2Title: initialData?.phase2Title || "Design & 3D BIM Modeling",
    phase2Desc: initialData?.phase2Desc || "Our engineering studio converts your brief into a millimeter-accurate 3D BIM model, BNBC-compliant blueprints, and fixed cost estimation.",
    phase3Title: initialData?.phase3Title || "Fabrication & Guaranteed Handover",
    phase3Desc: initialData?.phase3Desc || "Our automated factory fabricates certified high-tensile steel components, followed by safe on-site crane erection and guaranteed on-time handover.",
    processImageUrl: initialData?.processImageUrl || processImageUrl,

    bannerBadge: initialData?.bannerBadge || "BUILT WITH INTENT",
    bannerHeadline: initialData?.bannerHeadline || "EVERY DETAIL DESIGNED AND BUILT BY ONE DEDICATED TEAM",
    bannerSubtitle: initialData?.bannerSubtitle || "From the first architectural sketch to the final structural bolt, your building is delivered by the same hands, no handoffs, no surprises.",
    bannerImageUrl: initialData?.bannerImageUrl || bannerImageUrl,
  }));

  useEffect(() => {
    siteContentApi
      .getAll()
      .then((res) => {
        if (res?.dictionary?.home) {
          const h = res.dictionary.home;
          setData((prev) => ({
            ...prev,
            processBadge: h.processBadge || prev.processBadge,
            processHeadline: h.processHeadline || prev.processHeadline,
            processSubtitle: h.processSubtitle || prev.processSubtitle,
            phase1Title: h.phase1Title || prev.phase1Title,
            phase1Desc: h.phase1Desc || prev.phase1Desc,
            phase2Title: h.phase2Title || prev.phase2Title,
            phase2Desc: h.phase2Desc || prev.phase2Desc,
            phase3Title: h.phase3Title || prev.phase3Title,
            phase3Desc: h.phase3Desc || prev.phase3Desc,
            processImageUrl: h.processImageUrl || prev.processImageUrl,
            bannerBadge: h.bannerBadge || prev.bannerBadge,
            bannerHeadline: h.bannerHeadline || prev.bannerHeadline,
            bannerSubtitle: h.bannerSubtitle || prev.bannerSubtitle,
            bannerImageUrl: h.bannerImageUrl || prev.bannerImageUrl,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const activeProcessImage = data.processImageUrl || processImageUrl || "/steel-building.jpg";
  const activeBannerImage = data.bannerImageUrl || bannerImageUrl || "/Sunset Concrete Construction Skyline.png";

  const phases = [
    { num: "01", title: data.phase1Title, desc: data.phase1Desc },
    { num: "02", title: data.phase2Title, desc: data.phase2Desc },
    { num: "03", title: data.phase3Title, desc: data.phase3Desc },
  ];

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
                <span>{data.processBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
                {data.processHeadline}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xs font-light leading-relaxed">
              {data.processSubtitle}
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
                  src={activeProcessImage}
                  alt="Construction & Craftsmanship Process"
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Right 3 Phases Cards */}
            <div className="lg:col-span-8">
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  {phases.map((item, idx) => (
                    <motion.div
                      key={item.num}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                      className="group relative"
                    >
                      <div className="p-4 sm:p-5 rounded-sm bg-neutral-50 border border-neutral-200/80 hover:border-[#E5A53D] transition-colors h-full flex flex-col justify-between space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-[#E5A53D] tracking-tight">
                            {item.num}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-[#E5A53D] transition-colors" />
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
        {activeBannerImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={activeBannerImage}
              alt="Every Detail Designed And Built By One Dedicated Team"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            {/* Balanced dark overlay - subtle darkening for crisp text contrast */}
            <div className="absolute inset-0 bg-black/55" />
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
            <span>{data.bannerBadge}</span>
          </div>

          {/* Large Grotesque Uppercase Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white uppercase leading-[1.15] drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] whitespace-pre-line">
            {data.bannerHeadline}
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white font-medium max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {data.bannerSubtitle}
          </p>
        </motion.div>
      </div>

    </section>
  );
}
