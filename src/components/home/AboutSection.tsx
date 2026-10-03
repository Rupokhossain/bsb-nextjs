"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface AboutSectionProps {
  bannerImageUrl?: string;
}

export default function AboutSection({
  bannerImageUrl = "/about-banner.jpg",
}: AboutSectionProps) {
  return (
    <section id="about" className="relative bg-white text-neutral-900 py-24 sm:py-32 overflow-hidden">
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
              <span>ABOUT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-neutral-950 leading-[1.25]">
              We design and build one-of-a-kind custom spaces, rooftop retreats, and luxury pools, guiding you from first sketch to handover with clarity, craftsmanship and care.
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
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
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-8 pt-2"
          >
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Fixed, transparent pricing from day one. A single dedicated engineering team for your whole build. 100% leak-proof structural craftsmanship guaranteed in writing.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-neutral-100">
              <div>
                <span className="block text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
                  15<sup className="text-2xl sm:text-3xl font-bold text-[#E5A53D]">+</sup>
                </span>
                <span className="mt-2 block text-xs sm:text-sm text-neutral-500 font-medium leading-snug">
                  Years Building Custom Spaces
                </span>
              </div>

              <div>
                <span className="block text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
                  250<sup className="text-2xl sm:text-3xl font-bold text-[#E5A53D]">+</sup>
                </span>
                <span className="mt-2 block text-xs sm:text-sm text-neutral-500 font-medium leading-snug">
                  Projects Designed & Built
                </span>
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
              desc: "Your price is locked in writing before we break ground. No surprise costs or hidden fees.",
            },
            {
              num: "02.",
              title: "Craftsmanship",
              desc: "Master trades, precision waterproofing, and architectural finishes built to last decades.",
            },
            {
              num: "03.",
              title: "One Team",
              desc: "A single dedicated team of engineers and architects owns your build from end to end.",
            },
            {
              num: "04.",
              title: "On Time",
              desc: "Clear milestone schedules and weekly photo/video progress updates, start to finish.",
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
                <span className="text-[#E5A53D] font-bold mr-1.5">{pillar.num}</span>
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
