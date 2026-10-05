import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { servicesData } from "@/data/services";
import { HeroMotion, StaggerContainer, StaggerItem, FadeIn } from "@/components/common/MotionWrapper";

export const metadata = {
  title: "Engineering Services | Bangladesh Steel Builders Ltd. (BSB)",
  description:
    "Comprehensive steel building solutions, pre-engineered buildings (PEB), structural fabrication, civil construction, piling, and architectural modeling.",
};

// 📸 Banner image:
const servicesPageImages = {
  banner: "/about-bottom.jpg",
};

// 🌟 Why Choose Us data (Derived from client's official website)
const whyChooseUsData = [
  {
    title: "Expertise",
    badge: "Since 2009",
    desc: "We have been providing steel building construction and related structural engineering services since 2009.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004-6.75A4.5 4.5 0 106.626 9.375h10.748A4.502 4.502 0 0014.5 5.25z" />
      </svg>
    ),
  },
  {
    title: "Quality",
    badge: "Certified Materials",
    desc: "We use high-quality materials, a professional workforce, and skilled engineers in every single project.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Customization",
    badge: "Tailored Engineering",
    desc: "We are committed to making your unique industrial requirements, architectural layouts, and dreams come true.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12l3 3v15" />
      </svg>
    ),
  },
  {
    title: "Timely Delivery",
    badge: "Guaranteed Schedule",
    desc: "We consistently complete projects strictly on schedule and within budget with disciplined milestone management.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  // 3 Core Corporate Services
  const coreServices = servicesData.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Sticky Navbar (Light theme on clean white page background) */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-40 pb-20 sm:pb-28">
        
        {/* ============================================================ */}
        {/* 1. SERVICES HEADER */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-4 mb-16 sm:mb-20">
          <HeroMotion>
            {/* Yellow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>OUR SERVICES</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.08] mt-4">
              EVERYTHING WE DO<br />
              UNDER ONE ROOF
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed pt-2">
              From certified pre-engineered steel buildings to heavy turnkey civil construction and 3D architectural modeling, our integrated team delivers excellence across Bangladesh.
            </p>
          </HeroMotion>
        </section>

        {/* ============================================================ */}
        {/* 2. ENHANCED 3 CORE SERVICE CARDS GRID */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-24 sm:mb-32">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {coreServices.map((service, index) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full cursor-pointer"
                >
                  <div className="h-full flex flex-col justify-between bg-white rounded-sm border border-neutral-200  transition-all duration-300 shadow-smc overflow-hidden">
                    
                    {/* Image Container with hover zoom */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      
                      {/* Department / Index Pill */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-neutral-950/80 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider uppercase border border-white/20">
                        {String(index + 1).padStart(2, "0")} / DIVISION
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                      
                      {/* Title & Short Description */}
                      <div className="space-y-2.5">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 group-hover:text-[#E31E24] transition-colors leading-snug">
                          {service.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-3">
                          {service.shortDesc}
                        </p>
                      </div>

                      {/* Capabilities Checklist (Client's exact features) */}
                      {service.features && service.features.length > 0 && (
                        <div className="pt-4 border-t border-neutral-100 space-y-2.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                            Key Capabilities & Scope
                          </span>
                          <ul className="space-y-2">
                            {service.features.slice(0, 5).map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium">
                                <span className="w-4 h-4 rounded-full bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center shrink-0">
                                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                                <span className="truncate">{feat}</span>
                              </li>
                            ))}
                            {service.features.length > 5 && (
                              <li className="text-[11px] font-semibold text-[#006837] pl-6 pt-0.5">
                                + {service.features.length - 5} more specialized capabilities
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Prominent CTA Button / Arrow */}
                      <div className="pt-2 mt-auto">
                        <div className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-sm bg-neutral-50 group-hover:bg-[#E5A53D] text-neutral-950 text-xs sm:text-sm font-bold tracking-wide transition-all border border-neutral-200 group-hover:border-[#E5A53D]">
                          <span>View Full Details & Specs</span>
                          <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ============================================================ */}
        {/* 3. WHY CHOOSE US? SECTION (Client's Official 4 Pillars) */}
        {/* ============================================================ */}
        <section className="bg-[#FAF9F6] border-y border-neutral-200/80 py-20 sm:py-28 mb-24 sm:mb-32">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
            
            {/* Section Header */}
            <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E31E24] text-white text-xs font-bold tracking-wider uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                <span>CORE ADVANTAGES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
                Why Choose Us?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Backed by 17+ years of engineering leadership, certified fabrication facilities, and rigorous QA/QC safety standards across Bangladesh.
              </p>
            </FadeIn>

            {/* 4 Cards Grid */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUsData.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="h-full bg-white p-6 sm:p-7 rounded-sm border border-neutral-200/90 shadow-xs hover:border-neutral-950 transition-colors space-y-4 flex flex-col justify-between group">
                    <div className="space-y-3">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-sm bg-[#FAF9F6] border border-neutral-200 flex items-center justify-center text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white transition-colors shadow-xs">
                        {item.icon}
                      </div>

                      {/* Title & Badge */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] block">
                          {item.badge}
                        </span>
                        <h3 className="text-lg font-bold text-neutral-950 tracking-tight">
                          {item.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="w-6 h-0.5 bg-[#E5A53D] group-hover:w-12 transition-all duration-300" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. READY TO WORK WITH US? BANNER */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
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
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent sm:bg-gradient-to-r sm:from-neutral-950/85 sm:via-neutral-950/40 sm:to-transparent" />
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
                    Start your industrial or commercial engineering project with Bangladesh Steel Builders Ltd. Schedule a site visit with our senior engineering team today.
                  </p>
                </div>

                {/* Right Column: Signature Gold CTA Button with black arrow square */}
                <div className="self-start md:self-end">
                  <a
                    href="https://wa.me/8801711181860"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-sm bg-[#E5A53D] hover:bg-[#d89830] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-md group"
                  >
                    <span>Book a Consultation</span>
                    <div className="ml-3 sm:ml-4 w-7 h-7 rounded-sm bg-neutral-950 flex items-center justify-center text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </a>
                </div>

              </div>

            </div>
          </FadeIn>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
