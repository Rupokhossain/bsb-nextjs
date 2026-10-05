import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { HeroMotion, StaggerContainer, StaggerItem, FadeIn } from "@/components/common/MotionWrapper";

export const metadata = {
  title: "Nirman BSB | Steel Building Consulting & Structural Feasibility in Bangladesh",
  description:
    "Professional steel building consulting by Nirman BSB, the specialized engineering advisory arm of Bangladesh Steel Builders Ltd. Structural design optimization, BOQ budgeting, and pre-construction feasibility.",
};

// 🌟 6 Core Consultancy Services (Derived from client's official website)
const consultancyServices = [
  {
    id: "project-planning",
    phase: "PHASE 01",
    tag: "PLANNING & FEASIBILITY",
    title: "Steel Building Project Planning & Feasibility",
    desc: "Comprehensive site evaluation, industrial zoning compliance, soil capacity matching, and pre-construction feasibility audits to eliminate bottlenecks before breaking ground.",
    focusList: [
      "Site topography & soil capacity analysis",
      "Factory operational workflow layout",
      "Regulatory zoning & municipal permissions",
    ],
    image: "/Steel-Building-Projects.jpg",
  },
  {
    id: "structural-review",
    phase: "PHASE 02",
    tag: "DESIGN OPTIMIZATION",
    title: "Structural Design Review & Optimization",
    desc: "Advanced 3D computerized structural stress analysis, wind and seismic simulations, and PEB member optimization to save 15-20% in excess steel tonnage safely.",
    focusList: [
      "BNBC & AISC building code compliance",
      "Computerized 3D BIM structural modeling",
      "Steel weight reduction & deflection checks",
    ],
    image: "/Steel-Building-Projects-8.webp",
  },
  {
    id: "cost-estimation",
    phase: "PHASE 03",
    tag: "BUDGET & BOQ",
    title: "Cost Estimation & Budget Planning",
    desc: "Itemized Bill of Quantities (BOQ), raw steel market indexing, foundation piling cost verification, and milestone contingency schedules with zero hidden cost overrun.",
    focusList: [
      "Mill-direct steel price forecasting",
      "Accurate material-by-material BOQ audit",
      "Turnkey timeline & cash-flow planning",
    ],
    image: "/Steel-Building-Projects-2.jpg",
  },
  {
    id: "construction-guidance",
    phase: "PHASE 04",
    tag: "ERECTION METHODOLOGY",
    title: "Construction Method Guidance",
    desc: "Turnkey erection sequencing, heavy mobile crane rigging logistics, high-tensile anchor bolt torquing protocols, and strict on-site occupational safety governance.",
    focusList: [
      "Crane positioning & rigging sequence",
      "Bolt torquing & torque-wrench calibration",
      "Site safety & hazard mitigation protocols",
    ],
    image: "/construction.jpg",
  },
  {
    id: "material-selection",
    phase: "PHASE 05",
    tag: "MATERIAL QUALITY & QA",
    title: "Material Selection Consultancy",
    desc: "Specification audits of high-yield ASTM A572 Grade 50 steel, hot-dip galvanizing thickness, anti-corrosive primer chemistry, and insulated sandwich roofing panels.",
    focusList: [
      "Mill test certificate (MTC) verification",
      "Ultrasonic weld flaw & NDT inspection",
      "Anti-rust coating & paint micron audit",
    ],
    image: "/steel-building.jpg",
  },
  {
    id: "project-coordination",
    phase: "PHASE 06",
    tag: "TECHNICAL SUPERVISION",
    title: "Project Coordination & Technical Support",
    desc: "Dedicated third-party on-site QA/QC engineering inspections, milestone handover verification, contractor coordination, and as-built architectural documentation.",
    focusList: [
      "Independent third-party QA/QC inspection",
      "Contractor milestone sign-off audits",
      "Comprehensive as-built documentation",
    ],
    image: "/Steel-Building-Projects-1.jpg",
  },
];

// 🏭 4 Core Sectors We Advise (From Client's Screenshot)
const coreSectors = [
  {
    num: "01",
    title: "Industrial Steel Buildings",
    desc: "Heavy industrial processing plants, chemical facilities, power structures, and multi-bay clear-span workshops.",
  },
  {
    num: "02",
    title: "Factory & Production Units",
    desc: "Export-oriented garment manufacturing complexes, spinning mills, pharmaceutical production units, and agro factories.",
  },
  {
    num: "03",
    title: "Warehouse & Storage Facilities",
    desc: "Multi-rack automated logistics fulfillment centers, 200+ MT cold storage plants, and container freight stations.",
  },
  {
    num: "04",
    title: "Pre-Engineered Steel Buildings (PEB)",
    desc: "Custom high-tensile portal frame structures, aircraft hangars, sports arenas, and commercial multi-storey steel towers.",
  },
];

// ⚙️ 4-Step Consulting Lifecycle
const consultingSteps = [
  {
    step: "01",
    title: "Initial Site & Requirement Audit",
    desc: "Our senior structural engineers evaluate your site topography, soil characteristics, and operational footprint requirements.",
  },
  {
    step: "02",
    title: "3D BIM Stress & Tonnage Optimization",
    desc: "We run finite element stress simulations under BNBC seismic and wind criteria to optimize steel weight without compromising safety.",
  },
  {
    step: "03",
    title: "Itemized BOQ & Erection Blueprint",
    desc: "You receive an unyielding material estimation, milestone expenditure schedule, and crane rigging assembly guidelines.",
  },
  {
    step: "04",
    title: "On-Site Supervision & Final Handover",
    desc: "We perform ultrasonic weld testing, bolt torque audits, and independent contractor verification through commissioning.",
  },
];

export default function NirmanBSBPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Light Navbar for crisp white background */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-40 pb-20 sm:pb-28">
        
        {/* ============================================================ */}
        {/* 1. HERO HEADER: ARCHITECTURAL EDITORIAL STYLE */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
          <HeroMotion className="max-w-4xl mx-auto text-center space-y-5">
            {/* Breadcrumb */}
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#E5A53D]">Nirman BSB</span>
            </div>

            {/* Signature Gold Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>CONSULTING & ENGINEERING ADVISORY WING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.08] pt-1">
              Intelligent Steel Consulting <br />
              Before You Break Ground
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
              Nirman BSB was established to provide professional steel building consulting services in Bangladesh — helping developers and industrial investors make smart, cost-effective decisions before and during construction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full">
              <a
                href="https://wa.me/8801711181860"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all active:scale-95 shadow-md text-center"
              >
                <span>Request Technical Consultation</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="tel:+8801711181860"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-sm border border-neutral-300 hover:border-neutral-900 text-neutral-900 font-semibold text-xs sm:text-sm transition-all text-center"
              >
                <svg className="w-4 h-4 text-neutral-700 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>Speak With a Principal Engineer</span>
              </a>
            </div>
          </HeroMotion>
        </section>

        {/* ============================================================ */}
        {/* 2. WHO WE ARE & WHAT WE DO (Clean Monochrome + Gold Accent) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-24 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Side: Who We Are Card (Solid Architectural Matte Black) */}
            <FadeIn className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-sm bg-neutral-950 text-white shadow-xl relative overflow-hidden group">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                  <span>WHO WE ARE</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                  About Nirman BSB
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  Nirman BSB was established to provide professional steel building consultancy services in Bangladesh, helping clients make informed decisions before and during construction.
                </p>

                <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                  Our consultancy services follow the exact same rigorous quality standards, engineering expertise, and construction excellence practiced by our parent company, <span className="text-white font-semibold">Bangladesh Steel Builders Ltd.</span>
                </p>

                <div className="p-4 rounded-sm bg-white/5 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-wider block">
                    Our Strategic Focus
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    We focus on providing intelligent, cost-effective, and sustainable steel structural solutions tailored to Bangladesh&apos;s industrial and commercial business needs.
                  </p>
                </div>
              </div>

              {/* Bottom footer bar with responsive layout */}
              <div className="pt-6 sm:pt-8 mt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Independent Advisory</span>
                  <span className="text-sm font-bold text-white">Turnkey Feasibility & QA</span>
                </div>
                <a
                  href="https://wa.me/8801711181860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-5 py-2.5 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
                >
                  Get Consultant
                </a>
              </div>
            </FadeIn>

            {/* Right Side: What We Do (4 Core Sectors We Consult For) */}
            <FadeIn delay={0.15} className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-sm bg-[#FAF9F6] border border-neutral-200/90 shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-950 text-white text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D] inline-block" />
                  <span>WHAT WE DO</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 uppercase">
                  Sectors We Provide Advisory For
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  We provide specialized structural consultancy and construction management for:
                </p>

                {/* 4 Sector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {coreSectors.map((sector) => (
                    <div
                      key={sector.num}
                      className="p-4 bg-white rounded-sm border border-neutral-200/80 shadow-xs hover:border-neutral-950 transition-colors space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-neutral-900 group-hover:text-[#E5A53D] transition-colors">
                          {sector.num}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-[#E5A53D] transition-colors" />
                      </div>
                      <h3 className="text-sm font-bold text-neutral-950 leading-snug">
                        {sector.title}
                      </h3>
                      <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                        {sector.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200/70">
                <p className="text-xs text-neutral-600 font-light leading-relaxed italic">
                  &ldquo;Our goal is to ensure each project is technically sound, cost-effective, and fully prepared for future industrial needs.&rdquo;
                </p>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. 6 CORE CONSULTANCY SERVICES (Clean Architectural Cards) */}
        {/* ============================================================ */}
        <section className="bg-white py-12 sm:py-16 mb-24 sm:mb-32">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
            
            {/* Header */}
            <FadeIn className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>TECHNICAL EXPERTISE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
                Consultancy Services in Nirman BSB
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                We provide end-to-end technical consultancy services across the entire lifecycle of industrial and commercial steel construction:
              </p>
            </FadeIn>

            {/* 6 Grid Cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {consultancyServices.map((service) => (
                <StaggerItem key={service.id}>
                  <div className="h-full bg-white rounded-sm border border-neutral-200/90 shadow-xs  transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden group">
                    
                    {/* Top Image Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      
                      {/* Phase Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-neutral-950/85 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
                        {service.phase}
                      </div>

                      {/* Tag Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                        {service.tag}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                      
                      {/* Title & Desc */}
                      <div className="space-y-2.5">
                        <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 group-hover:text-[#E5A53D] transition-colors leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                          {service.desc}
                        </p>
                      </div>

                      {/* Focus Scope Checklist */}
                      <div className="pt-4 border-t border-neutral-100 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          Technical Focus:
                        </span>
                        <ul className="space-y-1.5">
                          {service.focusList.map((item, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                              <span className="w-3.5 h-3.5 rounded-full bg-[#E5A53D]/20 text-neutral-950 flex items-center justify-center shrink-0">
                                <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. 4-STEP CONSULTING WORKFLOW LIFECYCLE */}
        {/* ============================================================ */}
        <section className="bg-[#FAF9F6] border-y border-neutral-200/80 py-20 sm:py-28 mb-24 sm:mb-32">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
            
            <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-950 text-white text-xs font-bold tracking-wider uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D] inline-block" />
                <span>STRUCTURED METHODOLOGY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
                How We Deliver Consulting Value
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                A disciplined four-step engineering lifecycle that prevents design flaws and eliminates budget creep.
              </p>
            </FadeIn>

            {/* 4 Steps Grid */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultingSteps.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="h-full bg-white p-6 sm:p-7 rounded-sm border border-neutral-200/90 shadow-xs  transition-colors space-y-3 flex flex-col justify-between group">
                    <div className="space-y-3">
                      <span className="text-2xl sm:text-3xl font-black text-[#E5A53D] block">
                        {step.step}
                      </span>
                      <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        {step.desc}
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
        {/* 5. STRATEGIC VIP CONSULTATION BANNER (CTA) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="relative rounded-sm overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 lg:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800">
              
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[11px] font-bold tracking-wider uppercase">
                  <span>CONFIDENTIAL ADVISORY</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                  Plan Your Steel Structure With Confidence
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-lg">
                  Speak directly with Nirman BSB&apos;s senior steel consultants. We review your preliminary architectural drawings, assess site soil limits, and provide an initial structural feasibility audit within 48 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <a
                  href="https://wa.me/8801711181860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-7 py-3.5 rounded-sm bg-[#E5A53D] hover:bg-[#d89830] text-neutral-950 font-bold text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md whitespace-nowrap"
                >
                  Schedule Consultation
                </a>
                <a
                  href="tel:+8801711181860"
                  className="w-full sm:w-auto text-center px-6 py-3.5 rounded-sm border border-neutral-700 hover:border-white text-white font-medium text-sm transition-all whitespace-nowrap"
                >
                  Call Hotline
                </a>
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
