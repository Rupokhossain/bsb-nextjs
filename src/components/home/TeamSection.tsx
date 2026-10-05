"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

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
  teamMainImageUrl = "/s2.jpg",
  members = defaultTeamMembers,
}: TeamSectionProps) {
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
        {/* 2. BOTTOM PART: 4 LEADERSHIP MEMBERS GRID (From About Page) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              className="space-y-3 group"
            >
              {/* Member Portrait Card */}
              <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-neutral-200 shadow-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-colors duration-300" />
              </div>

              {/* Member Details */}
              <div className="space-y-0.5 pt-0.5">
                <h3 className="text-base sm:text-[17px] font-bold text-neutral-950 group-hover:text-[#006837] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                  {member.role}
                </p>
                {member.specialty && (
                  <p className="text-[11px] text-[#E5A53D] font-semibold tracking-wide uppercase pt-0.5">
                    {member.specialty}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
