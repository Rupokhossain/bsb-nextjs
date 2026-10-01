import React from "react";
import Image from "next/image";

interface ProcessSectionProps {
  processImageUrl?: string;
  bannerImageUrl?: string;
}

export default function ProcessSection({
  // Timber frame / construction site photo from public
  processImageUrl = "/service-6.jpg",
  // 📸 BANNER IMAGE: Apni public folder-e chobi rekhe eikhane tar path dite parben (e.g. "/my-banner.jpg")
  bannerImageUrl = "/progress-banner.jpg",
}: ProcessSectionProps) {
  return (
    <section id="process" className="w-full bg-white text-neutral-900 pt-24 sm:pt-32 border-t border-neutral-100">
      
      {/* 1. TOP PART: "HOW WE WORK" (Contained in standard 1440px max-w container) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
        <div className="space-y-12 sm:space-y-16">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
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
          </div>

          {/* Workflow Content: Left Image + Right 3-Step Horizontal Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Construction Photo (Matching Reference Screenshot 1) */}
            <div className="lg:col-span-4">
              <div className="relative h-[280px] sm:h-[340px] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md">
                <Image
                  src={processImageUrl}
                  alt="Construction & Craftsmanship Process"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Right 3 Connected Timeline Steps */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Horizontal Dashed Timeline Line (Desktop only) */}
                <div className="hidden md:block absolute top-[18px] left-[36px] right-[36px] border-t border-dashed border-[#E5A53D]/50 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
                  {/* Step 01 */}
                  <div className="space-y-4">
                    <div className="w-9 h-9 rounded-sm bg-white border border-neutral-300 text-neutral-950 font-bold text-xs flex items-center justify-center shadow-sm">
                      01.
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-950">Consult</h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                        We learn how you live, your site and your budget, then map the path forward.
                      </p>
                    </div>
                  </div>

                  {/* Step 02 */}
                  <div className="space-y-4">
                    <div className="w-9 h-9 rounded-sm bg-white border border-neutral-300 text-neutral-950 font-bold text-xs flex items-center justify-center shadow-sm">
                      02.
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-950">Design</h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                        Our studio turns your brief into a buildable, design-led plan and a fixed price.
                      </p>
                    </div>
                  </div>

                  {/* Step 03 */}
                  <div className="space-y-4">
                    <div className="w-9 h-9 rounded-sm bg-white border border-neutral-300 text-neutral-950 font-bold text-xs flex items-center justify-center shadow-sm">
                      03.
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-950">Build</h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                        One dedicated team constructs your home to spec, on programme and on budget.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH CINEMATIC BANNER (100% Screen Width, Edge-to-Edge - Matching 2nd Reference Screenshot) */}
      <div className="relative w-full overflow-hidden bg-neutral-950 text-white py-24 sm:py-32 lg:py-40 px-6 sm:px-12 flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
        {/* Full-width Background Image Structure (100vw, screen edge to screen edge) */}
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
            {/* Soft, light overlay so the wood, yellow gloves and natural light are clearly visible */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}

        {/* Centered Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
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
        </div>
      </div>

    </section>
  );
}
