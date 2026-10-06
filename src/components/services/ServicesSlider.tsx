"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { servicesData, ServiceDetail } from "@/data/services";

export default function ServicesSlider() {
  const [activeFilter, setActiveFilter] = useState<"all" | "rooftop" | "industrial">("all");

  // Get active primary services
  const allActiveServices = servicesData.filter(
    (s) =>
      ![
        "pre-engineered-steel-buildings",
        "structural-steel-fabrication",
        "industrial-commercial-construction",
        "architectural-design",
        "construction-management",
        "custom-home-building",
      ].includes(s.slug)
  );

  // Filter based on selected category
  const filteredServices = allActiveServices.filter((s) => {
    if (activeFilter === "rooftop") {
      return s.slug.startsWith("rooftop-");
    }
    if (activeFilter === "industrial") {
      return !s.slug.startsWith("rooftop-");
    }
    return true;
  });

  const serviceCount = filteredServices.length;

  // 5-set buffer so forward and backward slides always have rendered cards visible
  const displayServices = [
    ...filteredServices,
    ...filteredServices,
    ...filteredServices,
    ...filteredServices,
    ...filteredServices,
  ];

  // Middle set base offset
  const baseOffset = serviceCount * 2;

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(baseOffset);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Reset index when filter changes
  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(filteredServices.length * 2);
  }, [activeFilter, filteredServices.length]);

  // Responsive items-per-view calculation
  useEffect(() => {
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

  // Infinite Forward & Backward Navigation
  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Continuous Auto-Play Loop
  useEffect(() => {
    if (isHovered || serviceCount <= 1) return;

    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;

      setIsTransitioning(true);
      setCurrentIndex((prev) => {
        if (prev >= serviceCount * 3) {
          return baseOffset + 1;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, serviceCount, baseOffset]);

  // Fallback & Safety Normalizer
  const normalizeIndex = () => {
    setCurrentIndex((prev) => {
      if (prev >= serviceCount * 3) {
        setIsTransitioning(false);
        const offset = prev % serviceCount;
        return baseOffset + offset;
      }
      if (prev < serviceCount) {
        setIsTransitioning(false);
        const offset = ((prev % serviceCount) + serviceCount) % serviceCount;
        return baseOffset + offset;
      }
      return prev;
    });
  };

  const handleTransitionEnd = () => {
    normalizeIndex();
  };

  // Fallback timer
  useEffect(() => {
    if (currentIndex >= serviceCount * 3 || currentIndex < serviceCount) {
      const fallbackTimer = setTimeout(() => {
        normalizeIndex();
      }, 750);
      return () => clearTimeout(fallbackTimer);
    }
  }, [currentIndex, serviceCount, baseOffset]);

  // Re-enable transition smoothly
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Touch swipe handling for mobile
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

  const getTransformStyle = () => {
    const maxIndex = Math.max(0, displayServices.length - itemsPerView);
    const safeIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

    if (itemsPerView === 1) {
      return `translateX(calc(-${safeIndex} * (100% + 1.5rem)))`;
    }
    if (itemsPerView === 2) {
      return `translateX(calc(-${safeIndex} * (50% + 12px)))`;
    }
    return `translateX(calc(-${safeIndex} * ((100% + 2rem) / 3)))`;
  };

  const activeDot =
    serviceCount > 0 ? ((currentIndex % serviceCount) + serviceCount) % serviceCount : 0;

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 sm:px-5 py-2 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeFilter === "all"
              ? "bg-[#E5A53D] text-neutral-950 shadow-sm"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
          }`}
        >
          All Engineering Services ({allActiveServices.length})
        </button>

        <button
          onClick={() => setActiveFilter("rooftop")}
          className={`px-4 sm:px-5 py-2 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeFilter === "rooftop"
              ? "bg-neutral-950 text-white shadow-sm"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#E5A53D]" />
          <span>Rooftop Specialties (4)</span>
        </button>

        <button
          onClick={() => setActiveFilter("industrial")}
          className={`px-4 sm:px-5 py-2 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeFilter === "industrial"
              ? "bg-[#E5A53D] text-neutral-950 shadow-sm"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
          }`}
        >
          Industrial & Civil (3)
        </button>
      </div>

      {/* CONTINUOUS AUTO-LOOP 3-CARD CAROUSEL */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="overflow-hidden py-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex gap-6 lg:gap-8"
            style={{
              transform: getTransformStyle(),
              transition: isTransitioning
                ? "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {displayServices.map((service, idx) => (
              <div
                key={`${service.slug}-${idx}`}
                className="flex-shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col justify-between h-full bg-[#FAF9F6] p-6 rounded-sm border border-neutral-200/90 transition-all duration-300 relative cursor-pointer shadow-xs"
                >
                  <div className="space-y-5">
                    {/* Card Image with Hover Overlay & "View More Details" Button */}
                    <div className="relative h-[240px] sm:h-[270px] w-full overflow-hidden rounded-sm bg-neutral-900 shadow-xs">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Dark Overlay with Pop-up Button on Hover */}
                      <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-5 py-2.5 rounded-sm bg-[#E5A53D] text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                          <span>View More Details</span>
                          <span>→</span>
                        </span>
                      </div>

                      {/* Department / Rooftop Tag in Top Left */}
                      {service.slug.startsWith("rooftop-") ? (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                          ROOFTOP SPECIALTY
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-neutral-950/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                          CORE DIVISION
                        </div>
                      )}

                      {/* Top-Right Pill */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-neutral-950/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 group-hover:border-[#E5A53D] transition-colors">
                        Details Available ↗
                      </div>
                    </div>

                    {/* Card Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 font-light leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Service Capabilities Checklist Preview */}
                    {service.features && (
                      <div className="space-y-2 pt-1 border-t border-neutral-200/60">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                          Key Capabilities:
                        </span>
                        <ul className="space-y-1.5">
                          {service.features.slice(0, 4).map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium"
                            >
                              <span className="w-4 h-4 rounded-full bg-[#E5A53D] text-neutral-950 flex items-center justify-center shrink-0 text-[9px] font-black shadow-xs">
                                ✓
                              </span>
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                        {service.features.length > 4 && (
                          <span className="text-[11px] font-semibold text-neutral-600 block pt-1">
                            + {service.features.length - 4} more specialized capabilities
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Prominent Bottom Action Bar */}
                  <div className="pt-5 mt-5 border-t border-neutral-200/70 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 group-hover:text-[#E5A53D] transition-colors">
                      <span>View Full Service Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white group-hover:bg-[#E5A53D] text-neutral-950 flex items-center justify-center text-xs font-bold border border-neutral-200/70 transition-all shadow-xs">
                      ↗
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDER CONTROLS (Dots on Left + Infinite Loop Buttons on Right) */}
        <div className="flex items-center justify-between pt-8 sm:pt-10">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: serviceCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(baseOffset + idx);
                }}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  activeDot === idx
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
              className="w-10 h-10 rounded-sm bg-[#E5A53D] text-neutral-950 hover:bg-[#d6952c] active:scale-95 shadow-sm flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous services"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-sm bg-[#E5A53D] text-neutral-950 hover:bg-[#d6952c] active:scale-95 shadow-sm flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next services"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
