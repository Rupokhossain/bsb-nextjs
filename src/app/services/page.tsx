import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { servicesData } from "@/data/services";

export const metadata = {
  title: "Our Services | BSB Architectural Living & Custom Builders",
  description:
    "Everything we do, under one roof. Architectural design, construction management, custom home building, kitchens & bathrooms, outdoor living, and renovations.",
};

// 📸 Apnar chobi thakle public folder e rekhe eikhane path change kore nite parben
const servicesPageImages = {
  banner: "/about-banner.jpg",
};

export default function ServicesPage() {
  // Primary 6 services matching the reference screenshots
  const mainServices = servicesData.slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Sticky Navbar (Light theme on clean white page background) */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-40 pb-20 sm:pb-28">
        {/* ============================================================ */}
        {/* 1. SERVICES HEADER (Matching Screenshot 1) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-4 mb-16 sm:mb-20">
          {/* Yellow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>SERVICES</span>
          </div>

          {/* Heading: All-Caps, Bold, Centered */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.08]">
            EVERYTHING WE DO, <br />
            UNDER ONE ROOF
          </h1>
        </section>

        {/* ============================================================ */}
        {/* 2. 6-CARD GRID (3 Columns × 2 Rows on Desktop - Matching Screenshot 1) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-24 sm:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {mainServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block space-y-3.5 cursor-pointer"
              >
                {/* Image Container with hover zoom */}
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Title & Category text beneath image */}
                <div className="space-y-0.5 pt-0.5">
                  <h2 className="text-lg sm:text-[19px] font-bold text-neutral-950 group-hover:text-[#E5A53D] transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                    {service.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. READY TO WORK WITH US? BANNER (Matching Screenshot 2) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="relative w-full rounded-sm overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-8 sm:p-12 lg:p-16 flex flex-col justify-end shadow-md">
            
            {/* Background Image: Crisp, natural building photo */}
            <div className="absolute inset-0 z-0">
              <Image
                src={servicesPageImages.banner}
                alt="Ready to work with BSB"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1440px) 100vw, 1440px"
                priority
              />
              {/* Subtle dark gradient on left/bottom for text contrast */}
              <div className="absolute inset-0 bg-neutral-950/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/25 to-transparent sm:bg-gradient-to-r sm:from-neutral-950/80 sm:via-neutral-950/30 sm:to-transparent" />
            </div>

            {/* Content Row: Bottom-aligned left text + bottom-right button */}
            <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
              
              {/* Left Column: Heading + Paragraph */}
              <div className="space-y-4 max-w-lg">
                <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white uppercase leading-[1.05] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                  READY TO WORK <br />
                  WITH US?
                </h2>
                <p className="text-xs sm:text-sm text-white/95 font-light leading-relaxed max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  We believe every family deserves a home built with care. Take the next step and start the conversation with our team.
                </p>
              </div>

              {/* Right Column: Signature Gold CTA Button with black arrow square */}
              <div className="self-start md:self-end">
                <Link
                  href="/#contact"
                  className="inline-flex items-center pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-sm bg-[#E5A53D] hover:bg-[#d89830] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-md group"
                >
                  <span>Book a Consultation</span>
                  <div className="ml-3 sm:ml-4 w-7 h-7 rounded-sm bg-neutral-950 flex items-center justify-center text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </Link>
              </div>

            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
