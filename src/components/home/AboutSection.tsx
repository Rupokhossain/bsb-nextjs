"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface AboutSectionProps {
  bannerImageUrl?: string;
}

export default function AboutSection({
  bannerImageUrl = "/luxury-steel-duplex-villa.jpg",
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative bg-white text-neutral-900 py-16 sm:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 sm:space-y-20">
        {/* TOP ROW: Left Headline & Right Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (Badge + Headline + Button) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>ABOUT NIRMAN BSB</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-neutral-950 leading-[1.25]">
              Nirman BSB is the specialized architectural, rooftop engineering, and turnkey steel construction wing of Bangladesh Steel Builders Ltd.
            </h2>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center rounded-sm bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm pl-5 pr-1.5 py-1.5 transition-all group active:scale-95 shadow-sm"
              >
                <span>Learn More</span>
                <div className="ml-4 w-8 h-8 rounded-sm bg-white flex items-center justify-center text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Right Column (Intro paragraph + Big Stat Counters) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 space-y-8 pt-2"
          >
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              From custom steel homes to large-scale industrial facilities, we
              provide made-to-measure solutions that secure durability,
              efficiency, and guaranteed on-time completion.
            </p>

            {/* 4 STATS GRID (Matching Real Company Data) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 pt-5 border-t border-neutral-100">
              {/* Stat 1: 28+ Employees */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E5A53D]/15 text-[#E5A53D] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                    28
                    <sup className="text-lg sm:text-xl font-bold text-[#E5A53D]">
                      +
                    </sup>
                  </span>
                  <span className="block text-xs sm:text-sm text-neutral-600 font-medium leading-snug">
                    Employees
                  </span>
                </div>
              </div>

              {/* Stat 2: 12+ Programs & Trainings */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E5A53D]/15 text-[#E5A53D] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                    12
                    <sup className="text-lg sm:text-xl font-bold text-[#E5A53D]">
                      +
                    </sup>
                  </span>
                  <span className="block text-xs sm:text-sm text-neutral-600 font-medium leading-snug">
                    Programs & Trainings
                  </span>
                </div>
              </div>

              {/* Stat 3: 112+ Successfully Projects */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E5A53D]/15 text-[#E5A53D] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                    112
                    <sup className="text-lg sm:text-xl font-bold text-[#E5A53D]">
                      +
                    </sup>
                  </span>
                  <span className="block text-xs sm:text-sm text-neutral-600 font-medium leading-snug">
                    Successful Projects
                  </span>
                </div>
              </div>

              {/* Stat 4: 17+ Years of experience */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E5A53D]/15 text-[#E5A53D] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                    17
                    <sup className="text-lg sm:text-xl font-bold text-[#E5A53D]">
                      +
                    </sup>
                  </span>
                  <span className="block text-xs sm:text-sm text-neutral-600 font-medium leading-snug">
                    Years of Experience
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MIDDLE: Big Wide Architectural Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[320px] sm:h-[460px] lg:h-[580px] overflow-hidden rounded-sm shadow-md bg-neutral-100"
        >
          <Image
            src={bannerImageUrl}
            alt="BSB Architectural Custom Project Banner"
            fill
            className="object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </motion.div>

        {/* BOTTOM: 4 Key Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4">
          {[
            {
              num: "01.",
              title: "Fixed Pricing",
              desc: "Transparent engineering cost estimation before we break ground. No hidden expenses or surprises.",
            },
            {
              num: "02.",
              title: "Craftsmanship",
              desc: "Certified steel fabrication, high-grade structural alloys, and precision welding built to last decades.",
            },
            {
              num: "03.",
              title: "One Team",
              desc: "A single dedicated team of structural engineers and architects oversees your project end to end.",
            },
            {
              num: "04.",
              title: "On Time",
              desc: "Strict milestone adherence, modern erection technology, and guaranteed on-time project handover.",
            },
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="space-y-2 p-3 -m-3 rounded hover:bg-neutral-50/70 transition-colors"
            >
              <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                <span className="text-[#E5A53D] font-bold mr-1.5">
                  {pillar.num}
                </span>
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-lg text-neutral-600 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
