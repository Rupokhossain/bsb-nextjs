import React from "react";
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

export const metadata = {
  title: "About Us | Bangladesh Steel Builders Ltd. (BSB)",
  description:
    "Discover Bangladesh Steel Builders Ltd. (BSB) — pioneering pre-engineered steel buildings, industrial factories, and custom structures across Bangladesh since 2009.",
};

// 📸 Image Configuration:
const aboutImages = {
  heroBg: "/about-banner.jpg",
  whoWeAre: "/about1.jpg",
  founder: "/S.M-Anayet.webp",
  vision: "/vision.jpg",
  mission: "/mission.jpg",
  journeySite: "/about2.jpg",
  bottomBanner: "/about-bottom.jpg",
};

// Specialty tags under Who We Are
const specialties = [
  "Pre-Engineered Buildings (PEB)",
  "Industrial Factories & Sheds",
  "Commercial Multi-Storey Buildings",
  "Heavy Steel Warehouses",
  "Custom Residential Steel Homes",
  "Structural Steel Fabrication",
];

// Why Choose BSB - 4 Core Pillars
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

// Key Executive Leadership
const leadershipMembers = [
  {
    name: "Umme Habiba",
    role: "Chairwoman",
    image: "/Chairwoman.webp",
  },
  {
    name: "S.M. Anayet",
    role: "Founder & Managing Director",
    image: "/founder.jpg",
  },
  {
    name: "Nayeem Rezvan",
    role: "Director",
    image: "/Director.webp",
  },
  {
    name: "Shoaib Hossen Yamin",
    role: "Founder & Managing Director",
    image: "/ED - Executive Director.webp",
  },
];

// Esteemed Clients & Industrial Partners (c1.png to c15.jpg in public/)
const clientLogos = [
  { id: 1, name: "Prime Pusti Limited", src: "/c1.png" },
  { id: 2, name: "Advance Tech Ltd.", src: "/c2.png" },
  { id: 3, name: "HR Jute Mills Pvt. Limited", src: "/c3.jpg" },
  { id: 4, name: "Hasan Jute Mills Limited", src: "/c4.jpg" },
  // { id: 5, name: "Ayesha Knit Composite", src: "/c5.jpg" },
  { id: 6, name: "Industrial Partner 6", src: "/c6.jpg" },
  { id: 7, name: "Industrial Partner 7", src: "/c7.jpg" },
  { id: 8, name: "Industrial Partner 8", src: "/c8.jpg" },
  { id: 9, name: "Industrial Partner 9", src: "/c9.jpg" },
  { id: 10, name: "Industrial Partner 10", src: "/c10.jpg" },
  { id: 11, name: "Industrial Partner 11", src: "/c11.jpg" },
  { id: 12, name: "Industrial Partner 12", src: "/c12.jpg" },
  { id: 13, name: "Industrial Partner 13", src: "/c13.jpg" },
  { id: 14, name: "Industrial Partner 14", src: "/c14.jpg" },
  { id: 15, name: "Industrial Partner 15", src: "/c15.jpg" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Sticky Navbar (Dark theme at top with white text & transparent hero header) */}
      <Navbar theme="dark" />

      {/* ============================================================ */}
      {/* 1. HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center justify-center bg-neutral-950 text-white overflow-hidden pt-28 pb-20">
        {/* Background Image with subtle cinematic zoom */}
        <div className="absolute inset-0 z-0">
          <HeroZoom className="relative w-full h-full">
            <Image
              src={aboutImages.heroBg}
              alt="Bangladesh Steel Builders Ltd. Infrastructure"
              fill
              className="object-cover object-center opacity-40"
              priority
              sizes="100vw"
            />
          </HeroZoom>
        </div>

        {/* Hero Centered Content */}
        <HeroMotion className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>BUILT TO STAND STRONG</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white uppercase leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Engineering Steel Structures <br className="hidden sm:inline" />
            Built To Stand For Generations
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            Pioneering pre-engineered steel buildings, heavy industrial
            infrastructure, and sustainable commercial architecture across
            Bangladesh since 2009.
          </p>
        </HeroMotion>
      </section>

      {/* 3. OUR FOUNDER SECTION */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA] border-t border-neutral-200/70">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Founder Portrait Card */}
            <FadeIn className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden bg-neutral-900 shadow-xl border border-neutral-200/80 group">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-neutral-950">
                  <Image
                    src={aboutImages.founder}
                    alt="S.M. Anayet - Founder of Bangladesh Steel Builders Ltd."
                    fill
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" /> */}
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-sm bg-neutral-950/90 backdrop-blur-md border border-white/10 text-white space-y-1">
                  {/* <div className="text-xs uppercase tracking-widest text-[#E5A53D] font-bold">
                    Leadership & Vision
                  </div> */}
                  <div className="text-xl font-extrabold tracking-tight">
                    S.M. Anayet
                  </div>
                  <div className="text-xs text-neutral-300 font-light">
                    Founder & Managing Director • 17+ Years Industry Experience
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: Founder Story & Vision */}
            <FadeIn delay={0.15} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                <span>OUR FOUNDER</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
                Pioneering Ingenuity <br />& Structural Integrity
              </h2>

              <div className="space-y-4 text-neutral-600 font-light text-base sm:text-lg leading-relaxed">
                <p>
                  Founded by{" "}
                  <strong className="font-semibold text-neutral-950">
                    S.M. Anayet
                  </strong>
                  , a visionary passionate about structural precision and
                  world-class building standards, Bangladesh Steel Builders Ltd.
                  was established to transform the commercial and industrial
                  landscape through sustainable steel engineering.
                </p>
                <p>
                  With more than 17 years of leadership across the construction
                  and steel fabrication sector, Mr. Anayet has steered BSB with
                  an unyielding commitment to delivering projects on schedule,
                  within budget, and to the highest safety and engineering
                  benchmarks.
                </p>
              </div>

              {/* Blockquote */}
              <div className="p-5 rounded-sm bg-neutral-100/80 border-l-4 border-[#006837] space-y-2">
                <p className="text-sm sm:text-base font-medium text-neutral-900 italic leading-snug">
                  “Our reputation for excellence is founded on a devotion to
                  creative designs, certified craftsmanship, and on-time project
                  completion — making us the dependable partner for nationwide
                  industries.”
                </p>
                <span className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  — S.M. Anayet, Founder
                </span>
              </div>

              {/* Consultation Button & Social Links */}
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <a
                  href="https://wa.me/8801711181860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-sm bg-[#E5A53D] text-neutral-950 font-bold text-sm px-6 py-3 transition-all active:scale-95 shadow-md"
                >
                  <span>Book Consultation With Us</span>
                </a>

                <div className="flex items-center gap-2.5 text-neutral-500">
                  <span className="text-xs uppercase tracking-wider font-semibold mr-1">
                    Follow:
                  </span>
                  
                  {/* Facebook */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-sm bg-neutral-100 hover:bg-[#1877F2] hover:text-white text-neutral-600 flex items-center justify-center transition-all shadow-sm border border-neutral-200/80 active:scale-95 group"
                  >
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="w-9 h-9 rounded-sm bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-600 flex items-center justify-center transition-all shadow-sm border border-neutral-200/80 active:scale-95 group"
                  >
                    <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-sm bg-neutral-100 hover:bg-[#FF0000] hover:text-white text-neutral-600 flex items-center justify-center transition-all shadow-sm border border-neutral-200/80 active:scale-95 group"
                  >
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-sm bg-neutral-100 hover:bg-[#0A66C2] hover:text-white text-neutral-600 flex items-center justify-center transition-all shadow-sm border border-neutral-200/80 active:scale-95 group"
                  >
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                  </a>
                </div>
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
          {/* Header Row: Badge & Large Headline */}
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

          {/* 2 Columns: Left Photo + Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Industrial Construction Site Photo */}
            <FadeIn delay={0.1} className="lg:col-span-6">
              <div className="relative h-[340px] sm:h-[440px] lg:h-[480px] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md">
                <Image
                  src={aboutImages.whoWeAre}
                  alt="BSB Steel Fabrication and Construction"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            {/* Right Column: Specialty Pills + Description + Contact Button */}
            <FadeIn delay={0.2} className="lg:col-span-6 space-y-8">
              {/* Specialty Badges */}
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

              {/* Description Paragraph */}
              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                Established in 2009, Bangladesh Steel Builders Ltd. (BSB) stands
                as a prominent name in structural steel fabrication and
                pre-engineered buildings. From custom residential steel homes to
                sprawling industrial manufacturing plants and high-capacity
                warehouses, we deliver turnkey solutions tailored for maximum
                durability, cost efficiency, and structural safety.
              </p>

              {/* Contact Us Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/8801711181860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-sm bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm pl-5 pr-1.5 py-1.5 transition-all group active:scale-95 shadow-sm"
                >
                  <span>Consult an Engineer</span>
                  <div className="ml-4 w-8 h-8 rounded-sm bg-white flex items-center justify-center text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
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
                  src={aboutImages.vision}
                  alt="Our Vision - Bangladesh Steel Builders Ltd."
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-wider shadow">
                  OUR VISION
                </div>
              </div>
              <div className="p-8 sm:p-10 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                    To Pioneer Sustainable & Modern Steel Building Solutions
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                    Our vision is to be the foremost leader in pre-engineered
                    steel buildings across Bangladesh, celebrated for
                    innovation, structural resilience, and an unwavering
                    commitment to environmental sustainability and technological
                    advancement.
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
                  src={aboutImages.mission}
                  alt="Our Mission - Bangladesh Steel Builders Ltd."
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-wider shadow">
                  OUR MISSION
                </div>
              </div>
              <div className="p-8 sm:p-10 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
                    Precision Fabrication & Guaranteed On-Time Delivery
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                    At Bangladesh Steel Builders Ltd., our mission is to deliver
                    superior steel building solutions that surpass customer
                    expectations. We engineer innovative designs, supply
                    certified high-grade materials, and uphold international
                    safety standards across every industrial, commercial, and
                    residential endeavor.
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
          {/* Header Row: Left Title & Right Description */}
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950text-xs font-bold tracking-wider uppercase">
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
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#006837] hover:text-[#00502a] transition-colors underline underline-offset-4"
                >
                  <span>Explore Our Steel Services</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* 4 Pillars Grid with Staggered Motion */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChoosePillars.map((item, idx) => (
              <StaggerItem
                key={idx}
                className="space-y-4 p-6 rounded-sm bg-white hover:bg-neutral-50 shadow-sm border border-neutral-200/70 transition-all group"
              >
                {/* Icon in circle */}
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
      {/* 6. OUR JOURNEY & INFRASTRUCTURE BANNER */}
      {/* ============================================================ */}
      {/* <section className="py-20 sm:py-28 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-sm overflow-hidden shadow-lg border border-neutral-100 bg-[#FAF9F6]">
              <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] bg-neutral-200 group overflow-hidden">
                <Image
                  src={aboutImages.journeySite}
                  alt="BSB Steel Erection Site"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                  <span>OUR JOURNEY</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 leading-snug">
                  From Foundational Roots To Industry Leadership Across
                  Bangladesh.
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  Founded with a mission to deliver resilient steel
                  infrastructure, Bangladesh Steel Builders Ltd. has
                  successfully handed over hundreds of industrial, commercial,
                  and residential structures nationwide. Our adherence to
                  stringent engineering standards has earned us lasting
                  relationships with industry leaders.
                </p>

                <div className="pt-2">
                  <Link
                    href="/projects"
                    className="inline-flex items-center rounded-sm bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 transition-all active:scale-95 shadow-sm"
                  >
                    <span>View Completed Projects</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section> */}

      {/* ============================================================ */}
      {/* 7. LEADERSHIP TEAM SECTION */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-26 bg-[#F9F8F6] border-t border-neutral-200/60">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 sm:space-y-20">
          {/* Header Row */}
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>EXECUTIVE LEADERSHIP</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
                Experienced Engineers
                <br />
                Trusted Leadership
              </h2>
            </div>
          </FadeIn>

          {/* Leadership Grid with Staggered Motion */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
            {leadershipMembers.map((member, idx) => (
              <StaggerItem key={idx} className="space-y-3 group">
                <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-neutral-200 shadow-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-sm bg-neutral-950/85 backdrop-blur-sm text-white text-[11px] font-medium tracking-normal shadow-sm">
                    {member.specialty}
                  </div> */}
                </div>

                <div className="space-y-0.5 pt-0.5">
                  <h4 className="text-base sm:text-[17px] font-bold text-neutral-950 group-hover:text-[#006837] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                    {member.role}
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
            <ClientsSection/>

      {/* ============================================================ */}
      {/* 9. READY TO WORK WITH US? BANNER */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="relative w-full rounded-sm overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-8 sm:p-12 lg:p-16 flex flex-col justify-end shadow-md">
              <div className="absolute inset-0 z-0">
                <Image
                  src={aboutImages.bottomBanner}
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
