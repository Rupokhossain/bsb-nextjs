"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { servicesData } from "@/data/services";

export default function ServicesSection() {
  const mainServices = servicesData.slice(0, 6);

  // Current slide index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);

  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Responsive items-per-view detection
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Max index depends on screen size (0 on mobile shows 1 card at a time through index 5)
  const maxIndex = Math.max(0, mainServices.length - itemsPerView);

  // Clamp index if screen resized
  React.useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Exact transform calculation for mobile (1 card), tablet (2 cards), and desktop (3 cards)
  const getTransformStyle = () => {
    if (itemsPerView === 1) {
      return `translateX(calc(-${currentIndex} * (100% + 1.5rem)))`;
    }
    if (itemsPerView === 2) {
      return `translateX(calc(-${currentIndex} * (50% + 12px)))`;
    }
    return `translateX(calc(-${currentIndex} * ((100% + 2rem) / 3)))`;
  };

  return (
    <section id="services" className="bg-white text-neutral-900 py-24 sm:py-32 overflow-hidden border-t border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* HEADER: Badge + All-Caps Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>OUR SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase">
            Services We Offer
          </h2>
        </motion.div>

        {/* CAROUSEL CONTAINER (1 Card on mobile, 2 on tablet, 3 on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-6 lg:gap-8"
              style={{
                transform: getTransformStyle(),
              }}
            >
              {mainServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block flex-shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)] space-y-4 cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden rounded-sm bg-neutral-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>

                  {/* Card Title & Short Desc */}
                  <div className="space-y-1 pt-1">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-950 group-hover:text-[#E5A53D] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SLIDER CONTROLS (Dots on Left/Center + Arrow Buttons on Right) */}
          <div className="flex items-center justify-between pt-8 sm:pt-10">
            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? "w-8 bg-neutral-900"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev & Next Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all ${
                  currentIndex === 0
                    ? "bg-[#E5A53D]/30 text-neutral-400 cursor-not-allowed"
                    : "bg-[#E5A53D] text-neutral-950 hover:bg-[#d6952c] active:scale-95 shadow-sm"
                }`}
                aria-label="Previous services"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all ${
                  currentIndex === maxIndex
                    ? "bg-[#E5A53D]/30 text-neutral-400 cursor-not-allowed"
                    : "bg-[#E5A53D] text-neutral-950 hover:bg-[#d6952c] active:scale-95 shadow-sm"
                }`}
                aria-label="Next services"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM DARK BANNER ("Built Right. Built to Last." + Stats) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-sm overflow-hidden bg-neutral-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl"
        >
          {/* Background villa image with Next.js Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/service-1.jpg"
              alt="Built Right. Built to Last."
              fill
              className="object-cover object-center opacity-80"
              priority
            />
            {/* Gradient: dark on left for text, clear on right to showcase the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-neutral-950/25" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column (Headline + Paragraph + Button) */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Built Right. Built to Last.
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg font-light">
                We deliver rooftop transformations and custom swimming pools of exceptional quality through design-led thinking, transparent pricing, and a genuinely client-first process.
              </p>
              <div>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 rounded-sm bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-100 transition-all active:scale-95 shadow-md"
                >
                  View Our Work
                </Link>
              </div>
            </div>

            {/* Right Column (4 Gold Metrics Columns) */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-neutral-800 lg:pl-10">
              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#E5A53D] tracking-tight">
                  100%
                </span>
                <span className="block text-xs text-neutral-400 font-medium">
                  Leak-Proof Guarantee
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#E5A53D] tracking-tight">
                  250+
                </span>
                <span className="block text-xs text-neutral-400 font-medium">
                  Projects Completed
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#E5A53D] tracking-tight">
                  98%
                </span>
                <span className="block text-xs text-neutral-400 font-medium">
                  On-Time Delivery
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#E5A53D] tracking-tight">
                  15+
                </span>
                <span className="block text-xs text-neutral-400 font-medium">
                  Years of Building
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
