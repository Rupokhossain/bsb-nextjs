import React from "react";
import Link from "next/link";

interface HeroSectionProps {
  backgroundImageUrl?: string;
}

export default function HeroSection({
  // Natural bright architectural villa photo (exact match to the reference screenshot)
  backgroundImageUrl = "/hero-bg.jpg",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-neutral-900 text-white overflow-hidden">
      {/* Background Image - Clean, bright, and natural without heavy dark filters */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      />

      {/* Very subtle soft left gradient only to ensure text readability while keeping the photo bright */}
       {/* <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" /> */}

      {/* Hero Content Container - Aligned further to the left */}
      <div className="relative z-10 max-w-[1440px] mx-auto   w-full pt-32 pb-20">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          
          {/* Badge (Pill tag matching the reference screenshot) */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs sm:text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>CUSTOM DESIGN & BUILDERS</span>
          </div>

          {/* Big Bold Headline (Architectural grotesque typography) */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-20 uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            We Build <br />
            Spaces Made To <br />
            Last A Lifetime
          </h1>

          {/* Subheading / Description covering rooftops, pools, and all related exterior works */}
          <p className="max-w-xl text-base sm:text-lg text-white/95 leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            From luxury rooftop retreats and custom swimming pools to complete architectural outdoor living, we craft bespoke spaces with fixed pricing and true craftsmanship.
          </p>

          {/* Call to Action Button */}
          <div className="pt-2">
            <Link
              href="#contact"
              className="inline-flex items-center rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm sm:text-base pl-5 pr-1.5 py-1.5 transition-all group shadow-md active:scale-95"
            >
              <span>Book a Consultation</span>
              <div className="ml-4 w-9 h-9 rounded-sm bg-neutral-950 flex items-center justify-center text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <svg
                  className="w-5 h-5"
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

        </div>
      </div>
    </section>
  );
}