"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { siteContentApi, settingsApi } from "@/lib/api";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  image: string;
}

interface TeamSectionProps {
  // Main photo in the middle column of the top row
  teamMainImageUrl?: string;
  // Team members
  members?: TeamMember[];
  // Initial server data
  initialData?: any;
}

const defaultSpecialties = [
  "Pre-Engineered Buildings",
  "Structural Steel Fabrication",
  "Industrial Factories & Sheds",
  "Heavy Warehouses",
  "Commercial Multi-Storey",
  "Turnkey Construction",
];

const defaultPillars = [
  {
    title: "17+ Years Experience",
    desc: "Decades of combined engineering leadership in steel fabrication.",
  },
  {
    title: "Precision Engineering",
    desc: "High-grade structural modeling engineered for maximum earthquake & wind safety.",
  },
  {
    title: "Certified Materials",
    desc: "Tested, certified structural steel compliant with international safety codes.",
  },
  {
    title: "Guaranteed Handover",
    desc: "Dedicated project engineers ensuring strict milestone completion on schedule.",
  },
];

// Key Executive Leadership Members (Matching About Page)
const defaultTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Umme Habiba",
    role: "Chairwoman",
    image: "/Chairwoman.webp",
  },
  {
    id: "2",
    name: "S.M. Anayet",
    role: "Founder & Managing Director",
    image: "/founder.jpg",
  },
  {
    id: "3",
    name: "Nayeem Rezvan",
    role: "Director",
    image: "/Director.webp",
  },
  {
    id: "4",
    name: "Shoaib Hossen Yamin",
    role: "Executive Director",
    image: "/ED - Executive Director.webp",
  },
];

export default function TeamSection({
  teamMainImageUrl = "/construction.jpg",
  members = defaultTeamMembers,
  initialData,
}: TeamSectionProps) {
  const [leadership, setLeadership] = useState(() => ({
    badge: initialData?.homeLeadershipBadge || "LEADERSHIP & VISION",
    headline:
      initialData?.homeLeadershipHeadline ||
      "Engineering With Integrity, \nBuilding With Vision",
    quote:
      initialData?.homeLeadershipQuote ||
      "Every structural member we fabricate carries our responsibility for life and investment. At Nirman BSB, our focus is delivering certified structural durability, innovative rooftop engineering, and turnkey excellence across Bangladesh.",
    desc:
      initialData?.homeLeadershipDesc ||
      "Under the strategic direction of S.M. Anayet, Nirman BSB combines cutting-edge 3D BIM structural modeling with the fabrication power and 15+ years legacy of Bangladesh Steel Builders Ltd.",
    expBadge: initialData?.homeLeadershipExpBadge || "17+ Years",
    name: initialData?.homeLeadershipName || "S.M. Anayet",
    title:
      initialData?.homeLeadershipTitle ||
      "Founder & Managing Director • Industry Leadership",
    photo: initialData?.homeLeadershipPhoto || "/sm-anayet-office.jpg",
    metric1Val: initialData?.homeLeadershipMetric1Val || "17+",
    metric1Label: initialData?.homeLeadershipMetric1Label || "Years Experience",
    metric2Val: initialData?.homeLeadershipMetric2Val || "150+",
    metric2Label: initialData?.homeLeadershipMetric2Label || "Steel Projects",
    metric3Val: initialData?.homeLeadershipMetric3Val || "100%",
    metric3Label: initialData?.homeLeadershipMetric3Label || "Code Compliance",
  }));

  useEffect(() => {
    Promise.allSettled([siteContentApi.getAll(), settingsApi.get()]).then(
      ([contentRes, settingsRes]) => {
        const homeData =
          contentRes.status === "fulfilled"
            ? contentRes.value?.dictionary?.home
            : null;
        const settings =
          settingsRes.status === "fulfilled" ? settingsRes.value : null;

        if (homeData || settings) {
          setLeadership((prev) => ({
            ...prev,
            badge: homeData?.homeLeadershipBadge || prev.badge,
            headline: homeData?.homeLeadershipHeadline || prev.headline,
            quote: homeData?.homeLeadershipQuote || prev.quote,
            desc: homeData?.homeLeadershipDesc || prev.desc,
            expBadge: homeData?.homeLeadershipExpBadge || prev.expBadge,
            name:
              homeData?.homeLeadershipName ||
              settings?.founderName ||
              prev.name,
            title:
              homeData?.homeLeadershipTitle ||
              (settings?.founderTitle
                ? `${settings.founderTitle} • Industry Leadership`
                : prev.title),
            photo:
              homeData?.homeLeadershipPhoto ||
              settings?.founderPhoto ||
              prev.photo,
            metric1Val: homeData?.homeLeadershipMetric1Val || prev.metric1Val,
            metric1Label:
              homeData?.homeLeadershipMetric1Label || prev.metric1Label,
            metric2Val: homeData?.homeLeadershipMetric2Val || prev.metric2Val,
            metric2Label:
              homeData?.homeLeadershipMetric2Label || prev.metric2Label,
            metric3Val: homeData?.homeLeadershipMetric3Val || prev.metric3Val,
            metric3Label:
              homeData?.homeLeadershipMetric3Label || prev.metric3Label,
          }));
        }
      }
    );
  }, []);
  return (
    <section
      id="team"
      className="w-full bg-[#F9F8F6] text-neutral-900 py-24 sm:py-32 border-t border-neutral-200/60"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20 sm:space-y-24">
        {/* ============================================================ */}
        {/* 1. TOP PART: "THE TEAM BEHIND EVERY STRUCTURE" */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Badge + Title + Description + Specialty Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>EXECUTIVE LEADERSHIP</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.15]">
                Experienced Engineers <br />
                Trusted Leadership
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Our leadership team brings together certified structural
                engineers, steel fabricators, and project directors dedicated to
                delivering resilient pre-engineered steel buildings nationwide.
              </p>

              {/* Specialty Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {defaultSpecialties.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-sm bg-neutral-950 text-white text-[11px] font-medium tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-[#006837] transition-colors group"
              >
                <span>Learn more about leadership</span>
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Middle Column: Large Engineering Site Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 flex flex-col h-full"
          >
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-sm overflow-hidden bg-neutral-200 shadow-md">
              <Image
                src={teamMainImageUrl}
                alt="BSB structural steel engineering and construction site"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Right Column: 4 Clean White Feature Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3 sm:gap-3.5 h-full">
            {defaultPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                className="flex-1 flex flex-col justify-center bg-white rounded-sm p-4 sm:p-5 shadow-sm border border-neutral-100/90 space-y-1 hover:shadow-md hover:border-[#E5A53D]/40 transition-all"
              >
                <h3 className="text-base font-bold text-neutral-950">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. BOTTOM PART: MANAGING DIRECTOR EXECUTIVE SPOTLIGHT (Matching About Page) */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-sm bg-white border border-neutral-200/90 shadow-md p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Managing Director Portrait Card (Full table 100% visible, no overlay blocking desk) */}
            <div className="lg:col-span-5">
              <div className="rounded-sm overflow-hidden bg-neutral-950 shadow-xl border border-neutral-200/90 group">
                {/* 100% Full Desk Photo: Zero Cropping, Zero Floating Overlay */}
                <div className="relative aspect-[4/3.15] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                  <Image
                    src={leadership.photo || "/sm-anayet-office.jpg"}
                    alt={`${leadership.name} - ${leadership.title}`}
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>

                {/* Info Bar BELOW the photo: 100% of the table, helmet, laptop & documents remain visible! */}
                <div className="p-4 sm:p-5 bg-neutral-950 text-white border-t border-neutral-800 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                      {leadership.name}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#E5A53D]/15 text-[#E5A53D] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#E5A53D]/30">
                      {leadership.expBadge}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-light">
                    {leadership.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Managing Director Vision & Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>{leadership.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.15] whitespace-pre-line">
                {leadership.headline}
              </h3>

              <blockquote className="border-l-2 border-[#E5A53D] pl-5 sm:pl-6 italic text-neutral-700 text-sm sm:text-base lg:text-lg font-light leading-relaxed">
                &ldquo;{leadership.quote}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {leadership.desc}
              </p>

              {/* 3 Key Track Record Metrics */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-neutral-100">
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-950">{leadership.metric1Val}</div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">{leadership.metric1Label}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-950">{leadership.metric2Val}</div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">{leadership.metric2Label}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-950">{leadership.metric3Val}</div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">{leadership.metric3Label}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
