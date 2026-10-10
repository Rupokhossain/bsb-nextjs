"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { servicesData } from "@/data/services";

export default function ServicesSection() {
  // Active Primary Services
  const activeServices = servicesData.filter(
    (s) =>
      ![
        "pre-engineered-steel-buildings",
        "structural-steel-fabrication",
        "industrial-commercial-construction",
        "architectural-design",
        "construction-management",
        "custom-home-building",
        "rooftop-solar-canopies",
        "architectural-services",
        "construction-services",
      ].includes(s.slug)
  );

  const serviceCount = activeServices.length;

  // 5-set buffer (15 items) so forward and backward slides always have rendered cards visible
  const displayServices = [
    ...activeServices,
    ...activeServices,
    ...activeServices,
    ...activeServices,
    ...activeServices,
  ];

  // Middle set base offset (index 6 for 3 services)
  const baseOffset = serviceCount * 2;

  // Start in the center buffer set
  const [currentIndex, setCurrentIndex] = useState(baseOffset);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  // 🔄 Continuous Auto-Play Loop (Pauses on hover, pauses when tab is hidden, caps at boundaries)
  useEffect(() => {
    if (isHovered || serviceCount <= 1) return;

    const timer = setInterval(() => {
      // NEVER advance when tab is inactive/hidden in background
      if (typeof document !== "undefined" && document.hidden) return;

      setIsTransitioning(true);
      setCurrentIndex((prev) => {
        // Prevent background runaway beyond the buffer
        if (prev >= serviceCount * 3) {
          return baseOffset + 1;
        }
        return prev + 1;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [isHovered, serviceCount, baseOffset]);

  // Fallback & Safety Normalizer:
  // If transition reaches clone boundaries, safely jump back to the center set without animation.
  // We use both onTransitionEnd AND a timeout fallback so browsers that drop transitionend (e.g. background tabs) NEVER get stuck!
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

  // Fallback timer in case browser drops transitionend event (e.g., hidden tab or throttled RAF)
  useEffect(() => {
    if (currentIndex >= serviceCount * 3 || currentIndex < serviceCount) {
      const fallbackTimer = setTimeout(() => {
        normalizeIndex();
      }, 750);
      return () => clearTimeout(fallbackTimer);
    }
  }, [currentIndex, serviceCount, baseOffset]);

  // Window Focus & Page Visibility Handlers:
  // When user returns to tab / focuses window, instantly restore and sanitize index so cards are 100% visible
  useEffect(() => {
    const handleFocusOrVisible = () => {
      if (typeof document !== "undefined" && !document.hidden) {
        setCurrentIndex((prev) => {
          if (prev >= serviceCount * 3 || prev < serviceCount) {
            setIsTransitioning(false);
            const offset = ((prev % serviceCount) + serviceCount) % serviceCount;
            return baseOffset + offset;
          }
          return prev;
        });
      }
    };

    document.addEventListener("visibilitychange", handleFocusOrVisible);
    window.addEventListener("focus", handleFocusOrVisible);
    return () => {
      document.removeEventListener("visibilitychange", handleFocusOrVisible);
      window.removeEventListener("focus", handleFocusOrVisible);
    };
  }, [serviceCount, baseOffset]);

  // Re-enable transition smoothly after instant jump
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

  // Responsive Transform calculation with Mathematical Safety Clamping
  // safeIndex guarantees the track CAN NEVER scroll past rendered cards into empty space
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

  // Active Dot Indicator (0, 1, 2)
  const activeDot =
    ((currentIndex % serviceCount) + serviceCount) % serviceCount;

  return (
    <section
      id="services"
      className="bg-white text-neutral-900 py-20 sm:py-26 overflow-hidden border-t border-neutral-100"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12 sm:space-y-16">
        {/* HEADER: Exactly matching the client's official website text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>OUR SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
            Our Services
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 max-w-3xl mx-auto font-light leading-relaxed">
            At Bangladesh Steel Builders Ltd., we deliver specialized engineering services tailored to each client&apos;s specific needs. We specialize in heavy industrial steel buildings, precision rooftop steel structures &amp; sky lounges, and turnkey construction management, ensuring every project receives high-quality, cost-effective attention from concept to completion.
          </p>
        </motion.div>

        {/* CONTINUOUS AUTO-LOOP 3-CARD CAROUSEL (NEVER REWINDS BACK) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
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
                    className="group flex flex-col justify-between h-full bg-[#FAF9F6] p-6 rounded-sm border border-neutral-200/90  transition-all duration-300 relative cursor-pointer"
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

                        {/* Top Badges: Responsive Flex Container (Never Collides or Overlaps) */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                          {/* Department / Division Tag */}
                          {service.slug.includes("duplex") || service.slug.includes("villa") ? (
                            <div className="px-2 sm:px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-sm truncate">
                              DUPLEX &amp; RESIDENTIAL
                            </div>
                          ) : service.slug.startsWith("rooftop-") ? (
                            <div className="px-2 sm:px-2.5 py-1 rounded-sm bg-neutral-900/90 text-[#E5A53D] text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider border border-[#E5A53D]/40 truncate">
                              ROOFTOP SPECIALTY
                            </div>
                          ) : (
                            <div className="px-2 sm:px-2.5 py-1 rounded-sm bg-neutral-950/80 backdrop-blur-xs text-white text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider border border-white/20 truncate">
                              COMMERCIAL &amp; PEB
                            </div>
                          )}

                          {/* Top-Right Pill (Compact on Mobile, Never Collides) */}
                          <div className="shrink-0 px-2 sm:px-2.5 py-1 rounded-sm bg-neutral-950/85 backdrop-blur-sm text-white text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider border border-white/10 group-hover:border-[#E5A53D] transition-colors flex items-center gap-1 shadow-xs">
                            <span className="hidden sm:inline">Details</span>
                            <span>↗</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Title & Description */}
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 group-hover:text-[#006837] transition-colors leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 font-light leading-relaxed">
                          {service.shortDesc}
                        </p>
                      </div>

                      {/* Service Capabilities Checklist Preview (Red checkmarks like reference image) */}
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
                              + {service.features.length - 4} more specialized services
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

            {/* Prev & Next Arrow Buttons (Infinite seamless loop) */}
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
        </motion.div>

        {/* BOTTOM DARK BANNER ("Built to Stand Strong" + Steel Metrics) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-sm overflow-hidden bg-neutral-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl"
        >
          {/* Background steel structure image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/about-banner.jpg"
              alt="Engineering Precision at Bangladesh Steel Builders Ltd."
              fill
              className="object-cover object-center opacity-60"
            />
            {/* Gradient: dark on left for text, clear on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column (Headline + Paragraph + Button) */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                Built to Stand Strong. <br />
                Engineered to Last.
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg font-light">
                We deliver heavy industrial pre-engineered steel buildings, turnkey civil infrastructure, and specialized commercial architecture through certified fabrication and guaranteed on-time project completion.
              </p>
              <div>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm transition-all active:scale-95 shadow-md"
                >
                  View Completed Projects
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
                  Safety Certified
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#E5A53D] tracking-tight">
                  150+
                </span>
                <span className="block text-xs text-neutral-400 font-medium">
                  Steel Projects
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#E5A53D] tracking-tight">
                  99%
                </span>
                <span className="block text-xs text-neutral-400 font-medium">
                  On-Time Handover
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#E5A53D] tracking-tight">
                  17+
                </span>
                <span className="block text-xs text-neutral-400 font-medium">
                  Years of Trust
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
