"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  HeroMotion,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/common/MotionWrapper";
import { siteContentApi } from "@/lib/api";

export interface ConsultancyServiceItem {
  id: string;
  phase: string;
  tag: string;
  title: string;
  desc: string;
  focusList: string[];
  image: string;
}

const defaultConsultancyServices: ConsultancyServiceItem[] = [
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
    image: "/p6.jpg",
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
    image: "/pohs-convention-hall-perspective.jpg",
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
    image: "/Steel-Building-Projects-6.jpg",
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
    image: "/s4.jpg",
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
    image: "/s5.jpg",
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
    image: "/s6.jpg",
  },
];

// 🏭 4 Core Sectors We Advise
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

export default function NirmanBsbContent({ initialData }: { initialData?: any } = {}) {
  const [content, setContent] = useState(() => ({
    badge: initialData?.nirmanBadge || "CONSULTING & ENGINEERING ADVISORY WING",
    title: initialData?.nirmanTitle || "Intelligent Steel Consulting \nBefore You Break Ground",
    subtitle:
      initialData?.nirmanSubtitle ||
      "Nirman BSB was established to provide professional steel building consulting services in Bangladesh — helping developers and industrial investors make smart, cost-effective decisions before and during construction.",
    heroImageUrl: initialData?.nirmanHeroImageUrl || "/Sunset Concrete Construction Skyline.png",
    introBadge: initialData?.nirmanIntroBadge || "WHY CONSULT NIRMAN BSB",
    introHeadline: initialData?.nirmanIntroHeadline || "Why Professional Steel Building Consultancy Protects Your Capital Investment",
    intro1:
      initialData?.nirmanIntro1 ||
      "Every commercial steel structure and industrial warehouse represents a substantial capital investment. Unvetted architectural drawings and unoptimized member sizes often cause cost overruns.",
    intro2:
      initialData?.nirmanIntro2 ||
      "At Nirman BSB, our senior engineering consultants bridge the critical gap between conceptual architectural visions and safe, economical structural execution.",
    ctaBadge: initialData?.nirmanCtaBadge || "CONFIDENTIAL ADVISORY",
    ctaHeadline: initialData?.nirmanCtaHeadline || "Schedule a Free Pre-Construction Feasibility Audit",
    ctaSubtitle:
      initialData?.nirmanCtaSubtitle ||
      "Bring your architectural drawings or land dimensions. Our senior engineers will calculate exact steel tonnage, foundation requirements, and estimated project timelines within 48 hours.",
    ctaButtonText: initialData?.nirmanCtaButtonText || "Schedule Consultation",
    ctaPhone: initialData?.nirmanCtaPhone || "+880 1711-181860",
  }));

  const [services, setServices] = useState<ConsultancyServiceItem[]>(() => {
    if (initialData?.nirmanPillars && Array.isArray(initialData.nirmanPillars) && initialData.nirmanPillars.length > 0) {
      return initialData.nirmanPillars.map((p: any, idx: number) => {
        const num = idx + 1;
        const numStr = num < 10 ? `0${num}` : `${num}`;
        return {
          id: p.id || `pillar-${idx}`,
          phase: p.phase || `PHASE ${numStr}`,
          tag: p.tag || `PILLAR ${numStr}`,
          title: p.title || "",
          desc: p.desc || "",
          image: p.image || "/p6.jpg",
          focusList: Array.isArray(p.focusList) && p.focusList.length > 0
            ? p.focusList
            : [
                "Pre-construction technical analysis",
                "Quality assurance & compliance audit",
                "Expert advisory & site supervision",
              ],
        };
      });
    }

    if (initialData) {
      return defaultConsultancyServices.map((def, idx) => {
        const i = idx + 1;
        return {
          ...def,
          title: initialData[`nirmanService${i}Title`] || def.title,
          desc: initialData[`nirmanService${i}Desc`] || def.desc,
          image: initialData[`nirmanService${i}Image`] || def.image,
        };
      });
    }
    return defaultConsultancyServices;
  });

  useEffect(() => {
    siteContentApi
      .getAll()
      .then((res) => {
        if (res?.dictionary?.nirman) {
          const n = res.dictionary.nirman;
          setContent((prev) => ({
            ...prev,
            badge: n.nirmanBadge || prev.badge,
            title: n.nirmanTitle || prev.title,
            subtitle: n.nirmanSubtitle || prev.subtitle,
            heroImageUrl: n.nirmanHeroImageUrl || prev.heroImageUrl,
            introBadge: n.nirmanIntroBadge || prev.introBadge,
            introHeadline: n.nirmanIntroHeadline || prev.introHeadline,
            intro1: n.nirmanIntro1 || n.nirmanIntro || prev.intro1,
            intro2: n.nirmanIntro2 || prev.intro2,
            ctaBadge: n.nirmanCtaBadge || prev.ctaBadge,
            ctaHeadline: n.nirmanCtaHeadline || prev.ctaHeadline,
            ctaSubtitle: n.nirmanCtaSubtitle || prev.ctaSubtitle,
            ctaButtonText: n.nirmanCtaButtonText || prev.ctaButtonText,
            ctaPhone: n.nirmanCtaPhone || prev.ctaPhone,
          }));

          if (Array.isArray(n.nirmanPillars) && n.nirmanPillars.length > 0) {
            setServices(
              n.nirmanPillars.map((p: any, idx: number) => {
                const num = idx + 1;
                const numStr = num < 10 ? `0${num}` : `${num}`;
                return {
                  id: p.id || `pillar-${idx}`,
                  phase: p.phase || `PHASE ${numStr}`,
                  tag: p.tag || `PILLAR ${numStr}`,
                  title: p.title || "",
                  desc: p.desc || "",
                  image: p.image || "/p6.jpg",
                  focusList: Array.isArray(p.focusList) && p.focusList.length > 0
                    ? p.focusList
                    : [
                        "Pre-construction technical analysis",
                        "Quality assurance & compliance audit",
                        "Expert advisory & site supervision",
                      ],
                };
              })
            );
          } else {
            // Merge custom titles, descriptions, and images for the legacy 6 services
            setServices([
              {
                ...defaultConsultancyServices[0],
                title: n.nirmanService1Title || defaultConsultancyServices[0].title,
                desc: n.nirmanService1Desc || defaultConsultancyServices[0].desc,
                image: n.nirmanService1Image || defaultConsultancyServices[0].image,
              },
              {
                ...defaultConsultancyServices[1],
                title: n.nirmanService2Title || defaultConsultancyServices[1].title,
                desc: n.nirmanService2Desc || defaultConsultancyServices[1].desc,
                image: n.nirmanService2Image || defaultConsultancyServices[1].image,
              },
              {
                ...defaultConsultancyServices[2],
                title: n.nirmanService3Title || defaultConsultancyServices[2].title,
                desc: n.nirmanService3Desc || defaultConsultancyServices[2].desc,
                image: n.nirmanService3Image || defaultConsultancyServices[2].image,
              },
              {
                ...defaultConsultancyServices[3],
                title: n.nirmanService4Title || defaultConsultancyServices[3].title,
                desc: n.nirmanService4Desc || defaultConsultancyServices[3].desc,
                image: n.nirmanService4Image || defaultConsultancyServices[3].image,
              },
              {
                ...defaultConsultancyServices[4],
                title: n.nirmanService5Title || defaultConsultancyServices[4].title,
                desc: n.nirmanService5Desc || defaultConsultancyServices[4].desc,
                image: n.nirmanService5Image || defaultConsultancyServices[4].image,
              },
              {
                ...defaultConsultancyServices[5],
                title: n.nirmanService6Title || defaultConsultancyServices[5].title,
                desc: n.nirmanService6Desc || defaultConsultancyServices[5].desc,
                image: n.nirmanService6Image || defaultConsultancyServices[5].image,
              },
            ]);
          }
        }
      })
      .catch(() => {});
  }, []);

  const cleanPhone = content.ctaPhone.replace(/[^0-9+]/g, "");

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
              <Link href="/" className="hover:text-neutral-900 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#E5A53D]">Nirman BSB</span>
            </div>

            {/* Signature Gold Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>{content.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.08] pt-1 whitespace-pre-line">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
              {content.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full">
              <a
                href={`https://wa.me/${cleanPhone.replace("+", "")}?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20request%20a%20technical%20consultation%20with%20Nirman%20BSB.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all active:scale-95 shadow-md text-center"
              >
                <span>Request Technical Consultation</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-sm border border-neutral-300 text-neutral-900 font-semibold text-xs sm:text-sm transition-all text-center hover:bg-neutral-50"
              >
                <svg
                  className="w-4 h-4 text-neutral-700 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <span>Speak With a Principal Engineer</span>
              </a>
            </div>
          </HeroMotion>
        </section>

        {/* ============================================================ */}
        {/* 2. WHO WE ARE & WHAT WE DO */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-24 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Side: Who We Are Card */}
            <FadeIn className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-sm bg-neutral-950 text-white shadow-xl relative overflow-hidden group">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                  <span>{content.introBadge}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-white uppercase leading-tight">
                  About Nirman BSB
                </h2>

                <div className="space-y-4 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
                  <p>{content.intro1}</p>
                  <p>{content.intro2}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Backed by Bangladesh Steel Builders Ltd.</span>
                <span className="font-bold text-[#E5A53D]">17+ Years Legacy</span>
              </div>
            </FadeIn>

            {/* Right Side: What We Do Card */}
            <FadeIn
              delay={0.15}
              className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-sm bg-[#FAF9F6] border border-neutral-200/90 shadow-sm"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-950 text-white text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D] inline-block" />
                  <span>OUR MISSION</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-neutral-950 uppercase leading-tight">
                  {content.introHeadline}
                </h2>

                <div className="space-y-4 text-neutral-600 font-light text-sm sm:text-base leading-relaxed">
                  <p>
                    Steel construction offers immense benefits — faster delivery,
                    lower foundation loads, superior seismic tolerance, and clear
                    open spaces. But without experienced structural planning, costs
                    can spiral.
                  </p>
                  <p>
                    Nirman BSB bridges the critical gap between architectural
                    vision and real-world steel fabrication. We protect your
                    investment with rigorous analysis and precision engineering.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-sm bg-white border border-neutral-200">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                      15-20%
                    </span>
                    <span className="block text-xs text-neutral-500 font-medium mt-1">
                      Steel Tonnage Cost Optimization
                    </span>
                  </div>
                  <div className="p-4 rounded-sm bg-white border border-neutral-200">
                    <span className="text-2xl sm:text-3xl font-black text-[#E5A53D]">
                      100%
                    </span>
                    <span className="block text-xs text-neutral-500 font-medium mt-1">
                      BNBC & AISC Standard Adherence
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. 6 CORE CONSULTANCY PILLARS */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-24 sm:mb-32">
          <div className="space-y-12 sm:space-y-16">
            <FadeIn className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-widest block">
                SPECIALIZED CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
                What We Consult On
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-light">
                Comprehensive technical oversight across every critical phase of
                structural steel construction.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col bg-white rounded-sm border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all group"
                >
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-neutral-950/80 backdrop-blur-xs text-[#E5A53D] text-[10px] font-bold tracking-wider uppercase">
                      {service.phase}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                        {service.tag}
                      </span>
                      <h3 className="text-lg font-bold text-neutral-950 tracking-tight leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {service.focusList && Array.isArray(service.focusList) && service.focusList.length > 0 && (
                      <ul className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs text-neutral-700">
                        {service.focusList.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. 4 CORE SECTORS */}
        {/* ============================================================ */}
        <section className="bg-[#FAF9F6] py-20 sm:py-28 border-y border-neutral-200/80 mb-24 sm:mb-32">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
            <FadeIn className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-widest block">
                INDUSTRY ADVICE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
                Sectors We Advise
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreSectors.map((sector) => (
                <div
                  key={sector.num}
                  className="bg-white p-6 sm:p-8 rounded-sm border border-neutral-200/90 shadow-xs space-y-3"
                >
                  <span className="text-2xl sm:text-3xl font-black text-neutral-300">
                    {sector.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-950">
                    {sector.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              ))}
            </div>
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
                  <span>{content.ctaBadge}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight whitespace-pre-line">
                  {content.ctaHeadline}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-lg">
                  {content.ctaSubtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <a
                  href={`https://wa.me/${cleanPhone.replace("+", "")}?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20schedule%20a%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-7 py-3.5 rounded-sm bg-[#E5A53D] hover:bg-[#d89830] text-neutral-950 font-bold text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md whitespace-nowrap"
                >
                  {content.ctaButtonText}
                </a>
                <a
                  href={`tel:${cleanPhone}`}
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
