import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "About Us | BSB Architectural Living & Custom Builders",
  description:
    "We build every home the way we'd build our own. Discover our story, leadership, and obsessive craftsmanship.",
};

// ==========================================
// 📸 Image Configuration:
// Apni public folder e image rekhe eikhane path gulo change kore nite parben
// ==========================================
const aboutImages = {
  // 1. Top Hero Background (Dark villa facade - matching Screenshot 1)
  heroBg: "/about-banner.jpg",

  // 2. Who We Are Section Image (Modern living room interior - matching Screenshot 1 & 2)
  whoWeAre: "/about1.jpg",

  // 3. Our Journey Split Banner Image (Site construction & timber - matching Screenshot 3)
  journeySite: "/about2.jpg",

  // 4. Ready To Work Bottom Banner (Construction building with scaffolding - matching Screenshot 5)
  bottomBanner: "/about-bottom.jpg",
};

// Specialty tags under Who We Are
const specialties = [
  "Architectural Design",
  "Construction Management",
  "Custom Home Building",
  "Kitchens & Bathrooms",
  "Outdoor Living",
  "Renovations & Additions",
];

// 4 Core Principles (Matching Screenshot 2 & 3)
const principles = [
  {
    title: "Design-Led Thinking",
    desc: "We turn complex briefs into clear, buildable, design-led plans.",
    icon: (
      <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Client Commitment",
    desc: "Every home is handled with attention, care and a focus on real outcomes.",
    icon: (
      <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Proven Experience",
    desc: "Our experience ensures reliable, high-quality building across every project.",
    icon: (
      <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
  {
    title: "Clear Communication",
    desc: "We keep clarity and consistency throughout every stage of the build.",
    icon: (
      <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.502 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
];

// Leadership Team Members (Matching Screenshots 1 & 2: 7 members + 1 Gold Card = 8 cards total)
// 📸 Apnar chobi boshanor jonno image URL ba public folder er path (e.g. "/team/marcus.jpg") change kore nite parben
const leadershipMembers = [
  {
    name: "Marcus Hale",
    role: "Founder & Principal Builder",
    specialty: "Architectural Design",
    image: "/team1.png",
  },
  {
    name: "Daniel Reyes",
    role: "Lead Architect",
    specialty: "Renovations & Additions",
    image: "/team2.png",
  },
  {
    name: "Nathan Brooks",
    role: "Design Director",
    specialty: "Kitchens & Bathrooms",
    image: "/team3.png",
  },
  {
    name: "Owen Carter",
    role: "Senior Project Manager",
    specialty: "Custom Home Building",
    image: "/team4.png",
  },
  {
    name: "Ethan Walsh",
    role: "Construction Manager",
    specialty: "Outdoor Living",
    image: "/team5.png",
  },
  {
    name: "Cole Bennett",
    role: "Site Superintendent",
    specialty: "Construction Management",
    image: "/team6.png",
  },
  {
    name: "Liam Foster",
    role: "Interior Designer",
    specialty: "Kitchens & Bathrooms",
    image: "/team7.png",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Sticky Navbar (Dark theme at top with white text & transparent hero header) */}
      <Navbar theme="dark" />

      {/* ============================================================ */}
      {/* 1. HERO BANNER (Matching Screenshot 1) */}
      {/* ============================================================ */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center justify-center bg-neutral-950 text-white overflow-hidden pt-28 pb-20">
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={aboutImages.heroBg}
            alt="BSB Architectural Luxury Home"
            fill
            className="object-cover object-center opacity-45"
            priority
            sizes="100vw"
          />
          {/* <div className="absolute inset-0 bg-neutral-950/45" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/40" /> */}
        </div>

        {/* Hero Centered Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>WHY BSB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-white uppercase leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            We Build Every Home The Way <br className="hidden sm:inline" />
            We&apos;d Build Our Own
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            Fixed pricing, real craftsmanship and one accountable team — the standards BSB was founded on.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHO WE ARE SECTION (Matching Screenshot 1 & 2) */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12 sm:space-y-16">
          
          {/* Header Row: Badge & Large Headline */}
          <div className="space-y-4 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>WHO WE ARE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight text-neutral-950 leading-[1.25]">
              BSB was built on one principle — craftsmanship drives everything. We design and build custom homes with transparency, care and an obsessive eye for detail.
            </h2>
          </div>

          {/* 2 Columns: Left Photo + Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Modern Living Room / Interior Photo */}
            <div className="lg:col-span-6">
              <div className="relative h-[340px] sm:h-[440px] lg:h-[480px] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md">
                <Image
                  src={aboutImages.whoWeAre}
                  alt="BSB Architectural Interior"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column: Specialty Pills + Description + Contact Button */}
            <div className="lg:col-span-6 space-y-8">
              {/* Specialty Badges (matching screenshot tags) */}
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
                BSB is a design-build custom home builder delivering bespoke homes, rooftop retreats, and luxury renovations for families who value quality, honesty and homes made to last.
              </p>

              {/* Contact Us Button (Matching Screenshot 2) */}
              <div className="pt-2">
                <Link
                  href="/#contact"
                  className="inline-flex items-center rounded-sm bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm pl-5 pr-1.5 py-1.5 transition-all group active:scale-95 shadow-sm"
                >
                  <span>Contact Us</span>
                  <div className="ml-4 w-8 h-8 rounded-sm bg-white flex items-center justify-center text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PRINCIPLES THAT DEFINE OUR APPROACH (Matching Screenshot 2 & 3) */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 bg-[#F9F8F6] border-t border-neutral-200/60">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 sm:space-y-20">
          
          {/* Centered Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>WHAT DRIVES US</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
              Principles That <br />
              Define Our Approach
            </h2>
          </div>

          {/* 4 Pillars Grid (Matching Screenshot 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {principles.map((item, idx) => (
              <div key={idx} className="space-y-4">
                {/* Icon in light square */}
                <div className="w-10 h-10 rounded-sm bg-white border border-neutral-200/80 shadow-sm flex items-center justify-center">
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OUR JOURNEY BANNER (Matching Screenshot 3) */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-sm overflow-hidden shadow-lg border border-neutral-100 bg-[#FAF9F6]">
            
            {/* Left Photo: Timber construction framing with engineers */}
            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] bg-neutral-200">
              <Image
                src={aboutImages.journeySite}
                alt="BSB Building Journey on Construction Site"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            {/* Right Card: Story with vertical architectural ridges styling */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>OUR JOURNEY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 leading-snug">
                A Commitment That Guides Everything We Do.
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Founded with a vision to build homes the right way, BSB has grown into a trusted design-build studio known for craftsmanship, transparent pricing and homes families love for a lifetime.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. LEADERSHIP SECTION (Matching Screenshot 4) */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 bg-[#F9F8F6] border-t border-neutral-200/60">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 sm:space-y-20">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>LEADERSHIP</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
                Experienced Builders, <br />
                Trusted Craftsmanship
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xs font-light leading-relaxed">
              Experienced leaders guiding every build with clarity and precision.
            </p>
          </div>

          {/* Leadership 8-Card Grid (2 Rows of 4 Columns - Matching Screenshots 1 & 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
            {leadershipMembers.map((member, idx) => (
              <div key={idx} className="space-y-3 group">
                {/* Photo frame with object-top to keep hair/head fully visible */}
                <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-neutral-200 shadow-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Floating Specialty Pill at bottom-left corner */}
                  <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-sm bg-neutral-950/85 backdrop-blur-sm text-white text-[11px] font-medium tracking-normal shadow-sm">
                    {member.specialty}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="space-y-0.5 pt-0.5">
                  <h4 className="text-base sm:text-[17px] font-bold text-neutral-950">
                    {member.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}

            {/* 8th Card: Gold CTA Card (Matching Reference Screenshot 2) */}
            <div className="space-y-3">
              <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-[#F2AC3E] p-6 sm:p-7 flex flex-col justify-end text-neutral-950 shadow-sm group hover:bg-[#e69f30] transition-colors">
                <div className="space-y-3">
                  <p className="text-sm sm:text-base font-semibold text-neutral-950 leading-snug">
                    Meet the architects and builders behind BSB
                  </p>
                  <div>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-neutral-950 underline underline-offset-4 hover:opacity-80 transition-opacity"
                    >
                      <span>Meet The Team</span>
                      <span className="text-sm leading-none">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. READY TO WORK WITH US? BANNER (Matching Screenshot Exactly) */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="relative w-full rounded-sm overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-8 sm:p-12 lg:p-16 flex flex-col justify-end shadow-md">
            
            {/* Background Image: Crisp, bright building photo with subtle text-contrast gradient */}
            <div className="absolute inset-0 z-0">
              <Image
                src={aboutImages.bottomBanner}
                alt="Ready to work with BSB"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1440px) 100vw, 1440px"
                priority
              />
              {/* Subtle dark gradient behind left text only, keeping building and workers bright */}
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
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
