"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  HeroMotion,
  HeroZoom,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/MotionWrapper";
import ClientsSection from "@/components/home/ClientsSection";
import { siteContentApi, settingsApi } from "@/lib/api";

const specialties = [
  "Pre-Engineered Buildings (PEB)",
  "Industrial Factories & Sheds",
  "Commercial Multi-Storey Buildings",
  "Heavy Steel Warehouses",
  "Custom Residential Steel Homes",
  "Structural Steel Fabrication",
];

const whyChoosePillars = [
  {
    title: "Pioneering Steel Expertise",
    desc: "Over 17 years of leadership in structural steel fabrication, delivering certified, robust frameworks engineered for maximum safety.",
    icon: (
      <svg
        className="w-5 h-5 text-[#E5A53D]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Tailored Custom Engineering",
    desc: "From complex manufacturing facilities to bespoke commercial spaces, every structure is made-to-measure for your operational needs.",
    icon: (
      <svg
        className="w-5 h-5 text-[#E5A53D]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  },
  {
    title: "Cost-Effective & Sustainable",
    desc: "Optimized PEB structural modeling and advanced fabrication reduce material wastage and deliver lasting cost efficiency.",
    icon: (
      <svg
        className="w-5 h-5 text-[#E5A53D]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Guaranteed Timely Handover",
    desc: "Rigorous milestone scheduling, dedicated project supervisors, and precision erection guarantee project completion strictly on schedule.",
    icon: (
      <svg
        className="w-5 h-5 text-[#E5A53D]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function AboutPageContent({ initialData }: { initialData?: any } = {}) {
  const [content, setContent] = useState(() => ({
    aboutPageEyebrow: initialData?.aboutPageEyebrow || "BUILT TO STAND STRONG",
    aboutPageHeadline: initialData?.aboutPageHeadline || "Engineering Steel Structures \nBuilt To Stand For Generations",
    aboutPageSubtitle:
      initialData?.aboutPageSubtitle ||
      "Pioneering pre-engineered steel buildings, heavy industrial infrastructure, and sustainable commercial architecture across Bangladesh since 2009.",
    aboutPageStory1:
      initialData?.aboutPageStory1 ||
      "Founded by S.M. Anayet, a visionary passionate about structural precision and world-class building standards, Bangladesh Steel Builders Ltd. was established to transform the commercial and industrial landscape through sustainable steel engineering.",
    aboutPageStory2:
      initialData?.aboutPageStory2 ||
      "With more than 17 years of leadership across the construction and steel fabrication sector, Mr. Anayet has steered BSB with an unyielding commitment to delivering projects on schedule, within budget, and to the highest safety and engineering benchmarks.",
    aboutLeadershipTag: initialData?.aboutLeadershipTag || "OUR LEADERSHIP",
    aboutLeadershipHeadline: initialData?.aboutLeadershipHeadline || "Pioneering Ingenuity \n& Structural Integrity",
    founderExpBadge: initialData?.founderExpBadge || "17+ Years",
    founderName: initialData?.founderName || "S.M. Anayet",
    founderTitle: initialData?.founderTitle || "Founder & Managing Director",
    founderQuote:
      initialData?.founderQuote ||
      "Our reputation for excellence is founded on a devotion to creative designs, certified craftsmanship, and on-time project completion, making us the dependable partner for nationwide industries.",
    visionTag: initialData?.visionTag || "OUR VISION",
    visionHeadline: initialData?.visionHeadline || "To Pioneer Sustainable & Modern Steel Building Solutions",
    visionStatement:
      initialData?.visionStatement ||
      "Our vision is to be the foremost leader in pre-engineered steel buildings across Bangladesh, celebrated for innovation, structural resilience, and an unwavering commitment to environmental sustainability and technological advancement.",
    missionTag: initialData?.missionTag || "OUR MISSION",
    missionHeadline: initialData?.missionHeadline || "Precision Fabrication & Guaranteed On-Time Delivery",
    missionStatement:
      initialData?.missionStatement ||
      "At Bangladesh Steel Builders Ltd., our mission is to deliver superior steel building solutions that surpass customer expectations. We engineer innovative designs, supply certified high-grade materials, and uphold international safety standards across every industrial, commercial, and residential endeavor.",
    aboutHeroImageUrl: initialData?.aboutHeroImageUrl || "/about-banner.jpg",
    founderImageUrl: initialData?.founderImageUrl || "/sm-anayet-office.jpg",
    visionImageUrl: initialData?.visionImageUrl || "/vision.jpg",
    missionImageUrl: initialData?.missionImageUrl || "/mission.jpg",
  }));
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/8801711181860");

  useEffect(() => {
    let isMounted = true;

    const loadFreshData = async () => {
      try {
        const [contentRes, settingsRes] = await Promise.allSettled([
          siteContentApi.getAll(),
          settingsApi.get(),
        ]);

        if (!isMounted) return;

        const a =
          contentRes.status === "fulfilled"
            ? contentRes.value?.dictionary?.about
            : null;
        const s =
          settingsRes.status === "fulfilled" ? settingsRes.value : null;

        if (s?.whatsapp) {
          setWhatsappUrl(`https://wa.me/${s.whatsapp.replace(/[^0-9]/g, "")}`);
        }

        if (a || s) {
          setContent((prev) => ({
            ...prev,
            aboutPageEyebrow: a?.aboutPageEyebrow || prev.aboutPageEyebrow,
            aboutPageHeadline: a?.aboutPageHeadline || prev.aboutPageHeadline,
            aboutPageSubtitle: a?.aboutPageSubtitle || prev.aboutPageSubtitle,
            aboutPageStory1: a?.aboutPageStory1 || prev.aboutPageStory1,
            aboutPageStory2: a?.aboutPageStory2 || prev.aboutPageStory2,
            aboutLeadershipTag: a?.aboutLeadershipTag || prev.aboutLeadershipTag,
            aboutLeadershipHeadline: a?.aboutLeadershipHeadline || prev.aboutLeadershipHeadline,
            founderExpBadge: a?.founderExpBadge || prev.founderExpBadge,
            // Prioritize About Page CMS content, fallback to global company settings, fallback to initial state
            founderName: a?.founderName || s?.founderName || prev.founderName,
            founderTitle: a?.founderTitle || s?.founderTitle || prev.founderTitle,
            founderQuote: a?.founderQuote || prev.founderQuote,
            founderImageUrl: a?.founderImageUrl || s?.founderPhoto || prev.founderImageUrl,
            visionTag: a?.visionTag || prev.visionTag,
            visionHeadline: a?.visionHeadline || prev.visionHeadline,
            visionStatement: a?.visionStatement || prev.visionStatement,
            missionTag: a?.missionTag || prev.missionTag,
            missionHeadline: a?.missionHeadline || prev.missionHeadline,
            missionStatement: a?.missionStatement || prev.missionStatement,
            aboutHeroImageUrl: a?.aboutHeroImageUrl || prev.aboutHeroImageUrl,
            visionImageUrl: a?.visionImageUrl || prev.visionImageUrl,
            missionImageUrl: a?.missionImageUrl || prev.missionImageUrl,
          }));
        }
      } catch (err) {
        console.warn("Client sync failed, using initial server data:", err);
      }
    };

    loadFreshData();

    window.addEventListener("focus", loadFreshData);
    window.addEventListener("siteContentUpdated", loadFreshData);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", loadFreshData);
      window.removeEventListener("siteContentUpdated", loadFreshData);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Clean White Sticky Navbar */}
      <Navbar theme="light" />

      {/* ============================================================ */}
      {/* 1. HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center justify-center bg-neutral-950 text-white overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 z-0">
          <HeroZoom className="relative w-full h-full">
            <Image
              src={content.aboutHeroImageUrl || "/about-banner.jpg"}
              alt="Bangladesh Steel Builders Ltd. Infrastructure"
              fill
              unoptimized
              className="object-cover object-center opacity-40"
              priority
              sizes="100vw"
            />
          </HeroZoom>
        </div>

        <HeroMotion className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>{content.aboutPageEyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white uppercase leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] whitespace-pre-line">
            {content.aboutPageHeadline}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {content.aboutPageSubtitle}
          </p>
        </HeroMotion>
      </section>

      {/* ============================================================ */}
      {/* 3. OUR FOUNDER SECTION */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA] border-t border-neutral-200/70">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Founder Office Desk Card */}
            <FadeIn className="lg:col-span-5">
              <div className="rounded-sm overflow-hidden bg-neutral-950 shadow-xl border border-neutral-200/90 group">
                <div className="relative aspect-[4/3.15] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                  <Image
                    src={content.founderImageUrl || "/sm-anayet-office.jpg"}
                    alt={`${content.founderName} - ${content.founderTitle}`}
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>

                <div className="p-4 sm:p-5 bg-neutral-950 text-white border-t border-neutral-800 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                      {content.founderName}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#E5A53D]/15 text-[#E5A53D] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#E5A53D]/30">
                      {content.founderExpBadge || "17+ Years"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-light">
                    {content.founderTitle}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Right: Founder Story & Vision */}
            <FadeIn delay={0.15} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                <span>{content.aboutLeadershipTag || "OUR LEADERSHIP"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight whitespace-pre-line">
                {content.aboutLeadershipHeadline || "Pioneering Ingenuity \n& Structural Integrity"}
              </h2>

              <div className="space-y-4 text-neutral-600 font-light text-base sm:text-lg leading-relaxed">
                <p>{content.aboutPageStory1}</p>
                <p>{content.aboutPageStory2}</p>
              </div>

              {/* Blockquote */}
              <div className="p-5 rounded-sm bg-neutral-100/80 border-l-4 border-[#006837] space-y-2">
                <p className="text-sm sm:text-base font-medium text-neutral-900 italic leading-snug">
                  “{content.founderQuote}”
                </p>
                <span className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  {content.founderName}, {content.founderTitle}
                </span>
              </div>

              {/* Consultation Button */}
              <div className="self-start md:self-end">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-sm bg-[#E5A53D] hover:bg-[#d89830] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-md group"
                >
                  <span>Book a Consultation</span>
                  <div className="ml-3 sm:ml-4 w-7 h-7 rounded-sm bg-neutral-950 flex items-center justify-center text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHO WE ARE SECTION */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-26 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12 sm:space-y-16">
          <FadeIn className="space-y-4 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>WHO WE ARE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight text-neutral-950 leading-[1.25]">
              A Decade & A Half of Pioneering Steel Building Construction,
              Precision Engineering, and Nationwide Trust.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <FadeIn delay={0.1} className="lg:col-span-6">
              <div className="relative h-[340px] sm:h-[440px] lg:h-[480px] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md">
                <Image
                  src="/about1.jpg"
                  alt="BSB Steel Fabrication and Construction"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-6 space-y-8">
              <div className="flex flex-wrap gap-2">
                {specialties.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-sm bg-neutral-100 text-neutral-800 text-xs font-medium tracking-wide border border-neutral-200/60"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                Established in 2009, Bangladesh Steel Builders Ltd. (BSB) stands
                as a prominent name in structural steel fabrication and
                pre-engineered buildings. From custom residential steel homes to
                sprawling industrial manufacturing plants and high-capacity
                warehouses, we deliver turnkey solutions tailored for maximum
                durability, cost efficiency, and structural safety.
              </p>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-sm bg-[#E5A53D] hover:bg-[#d89830] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-md group"
                >
                  <span>Consult an Engineer</span>
                  <div className="ml-4 w-8 h-8 rounded-sm bg-black text-[#E5A53D] flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. VISION & MISSION DUAL CARDS */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-26 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
          <FadeIn className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>CORE PURPOSE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase">
              Our Vision & Mission
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Vision Card */}
            <FadeIn
              delay={0.1}
              className="flex flex-col rounded-sm overflow-hidden border border-neutral-200/90 shadow-md group bg-[#FAF9F6]"
            >
              <div className="relative h-[260px] sm:h-[300px] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={content.visionImageUrl || "/vision.jpg"}
                  alt="Our Vision - Bangladesh Steel Builders Ltd."
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-wider shadow">
                  {content.visionTag || "OUR VISION"}
                </div>
              </div>
              <div className="p-8 sm:p-10 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                    {content.visionHeadline || "To Pioneer Sustainable & Modern Steel Building Solutions"}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                    {content.visionStatement}
                  </p>
                </div>
                <div className="pt-2 text-xs font-bold text-[#006837] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006837]" />
                  <span>Redefining The Construction Industry</span>
                </div>
              </div>
            </FadeIn>

            {/* Mission Card */}
            <FadeIn
              delay={0.2}
              className="flex flex-col rounded-sm overflow-hidden border border-neutral-200/90 shadow-md group bg-[#FAF9F6]"
            >
              <div className="relative h-[260px] sm:h-[300px] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={content.missionImageUrl || "/mission.jpg"}
                  alt="Our Mission - Bangladesh Steel Builders Ltd."
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-wider shadow">
                  {content.missionTag || "OUR MISSION"}
                </div>
              </div>
              <div className="p-8 sm:p-10 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                    {content.missionHeadline || "Precision Fabrication & Guaranteed On-Time Delivery"}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                    {content.missionStatement}
                  </p>
                </div>
                <div className="pt-2 text-xs font-bold text-[#E5A53D] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5A53D]" />
                  <span>Uncompromising Quality & Client Trust</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHY CHOOSE BSB (Built to Stand Strong) */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 bg-[#F9F8F6] border-t border-neutral-200/60">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 sm:space-y-20">
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                <span>BUILT TO STAND STRONG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
                Why Choose Bangladesh <br className="hidden sm:inline" />
                Steel Builders Ltd.?
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Industrial entrepreneurs, corporate developers, and homeowners
                rely on BSB for bespoke engineering, cost-effective structural
                steel fabrication, and reliable turnkey execution.
              </p>
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#006837] hover:text-[#00502a] transition-colors"
                >
                  <span>Explore Our Steel Services</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChoosePillars.map((item, idx) => (
              <StaggerItem
                key={idx}
                className="space-y-4 p-6 rounded-sm bg-white hover:bg-neutral-50 shadow-sm border border-neutral-200/70 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#E5A53D]/15 text-[#E5A53D] group-hover:text-neutral-950 transition-colors flex items-center justify-center">
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-neutral-950 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. OUR CLIENTS & INDUSTRIAL PARTNERS */}
      {/* ============================================================ */}
      <ClientsSection />

      {/* ============================================================ */}
      {/* 9. READY TO WORK WITH US? BANNER */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="relative w-full rounded-sm overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-8 sm:p-12 lg:p-16 flex flex-col justify-end shadow-md">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/about-bottom.jpg"
                  alt="Ready to work with BSB"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  priority
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent sm:bg-gradient-to-r sm:from-neutral-950/85 sm:via-neutral-950/35 sm:to-transparent" />
              </div>

              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
                <div className="space-y-4 max-w-lg">
                  <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white uppercase leading-[1.05] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                    READY TO WORK <br />
                    WITH US?
                  </h2>
                  <p className="text-xs sm:text-sm text-white/95 font-light leading-relaxed max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Every commercial and industrial facility deserves precision
                    structural engineering. Take the next step and consult with
                    our principal engineers.
                  </p>
                </div>

                <div className="self-start md:self-end">
                  <a
                    href="https://wa.me/8801711181860"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-sm bg-[#E5A53D] hover:bg-[#d89830] text-neutral-950 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-md group"
                  >
                    <span>Book a Consultation</span>
                    <div className="ml-3 sm:ml-4 w-7 h-7 rounded-sm bg-neutral-950 flex items-center justify-center text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
