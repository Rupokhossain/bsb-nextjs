"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

// Default list of testimonials (Apni eikhane apnar chobi, quote o nam boshiye nite parben)
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "“BSB built our forever home on time and on budget. The fixed price never moved, and the craftsmanship speaks for itself.”",
    author: "Michael & Sarah Henderson",
    role: "Homeowners - Oakhill",
    // 📸 Apnar chobi public folder e rekhe eikhane path boshate parben, jemon: "/testimonial-1.jpg"
    image: "/t1.jpg",
  },
  {
    id: "2",
    quote:
      "“From the initial 3D rooftop concept to the final bioclimatic pergola installation, the attention to structural waterproofing and luxury finish was second to none.”",
    author: "Tanvir & Nabila Ahmed",
    role: "Penthouse Owners - Gulshan 2",
    // 📸 Apnar chobi public folder e rekhe eikhane path boshate parben, jemon: "/testimonial-2.jpg"
    image: "/t2.jpg",
  },
  {
    id: "3",
    quote:
      "“Their engineering team designed our rooftop infinity pool with zero leak tolerance. Two years later, the water clarity and acoustics are still flawless.”",
    author: "Dr. K. Rashid",
    role: "Villa Owner - Bashundhara R/A",
    // 📸 Apnar chobi public folder e rekhe eikhane path boshate parben, jemon: "/testimonial-3.jpg"
    image: "/t3.jpg",
  },
  {
    id: "4",
    quote:
      "“Having one accountable lead engineer oversee our entire luxury build gave us total peace of mind. We received weekly photographic progress reports every Friday without fail.”",
    author: "Zubair & Farhana Karim",
    role: "Estate Owners - Dhanmondi",
    // 📸 Apnar chobi public folder e rekhe eikhane path boshate parben, jemon: "/testimonial-4.jpg"
    image: "/t4.jpg",
  },
];

export default function TestimonialsSection({
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  const current = testimonials[activeIndex] || testimonials[0];

  return (
    <section id="testimonials" className="w-full bg-white text-neutral-900 py-24 sm:py-32 border-t border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 sm:space-y-20">
        
        {/* ============================================================ */}
        {/* HEADER: Centered Badge + Uppercase Grotesque Title */}
        {/* ============================================================ */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>TESTIMONIALS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
            Trusted By The <br />
            Families We Build For
          </h2>
        </div>

        {/* ============================================================ */}
        {/* MAIN SLIDER CARD: Left Photo + Right Quote & Controls */}
        {/* ============================================================ */}
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Homeowner / Client Photo */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md">
                <Image
                  key={current.id}
                  src={current.image}
                  alt={current.author}
                  fill
                  className="object-cover object-center transition-all duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Quote + Author Details */}
            <div className="md:col-span-7 space-y-6 sm:space-y-8">
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-neutral-900 leading-snug tracking-tight">
                {current.quote}
              </blockquote>

              <div className="space-y-1 pt-2">
                <h3 className="text-base sm:text-lg font-bold text-neutral-950">
                  {current.author}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                  {current.role}
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDER CONTROLS: Dot Indicators on Left + Arrows on Right */}
          {/* ============================================================ */}
          <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? "w-8 bg-neutral-950"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev & Next Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-sm bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-sm bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
