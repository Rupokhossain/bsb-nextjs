import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { teamMembers } from "@/data/team";
import { HeroMotion, StaggerContainer, StaggerItem, FadeIn } from "@/components/common/MotionWrapper";

export const metadata = {
  title: "Our Team & Leadership | BSB Architectural Living & Custom Builders",
  description:
    "Experienced builders, trusted craftsmanship. Meet the architects, project managers, and craftspeople behind BSB.",
};

// 📸 Banner Image:
const teamPageImages = {
  banner: "/team1.jpg",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Sticky Navbar (Light theme on white background) */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-40 pb-20 sm:pb-28">
        {/* ============================================================ */}
        {/* 1. HEADER SECTION */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-4 mb-16 sm:mb-20">
          <HeroMotion>
            {/* Yellow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>LEADERSHIP</span>
            </div>

            {/* Heading: All-Caps, Bold, Centered */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.08] mt-4">
              EXPERIENCED BUILDERS, <br />
              TRUSTED CRAFTSMANSHIP
            </h1>
          </HeroMotion>
        </section>

        {/* ============================================================ */}
        {/* 2. 12-TEAM MEMBERS GRID WITH STAGGERED MOTION */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-24 sm:mb-32">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
            {teamMembers.map((member) => (
              <StaggerItem key={member.id} className="space-y-3 group">
                {/* Photo container with object-top */}
                <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm">
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

                {/* Name & Role beneath image */}
                <div className="space-y-0.5 pt-0.5">
                  <h2 className="text-base sm:text-[17px] font-bold text-neutral-950 group-hover:text-[#E5A53D] transition-colors">
                    {member.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                    {member.role}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ============================================================ */}
        {/* 3. MEET YOUR BUILD TEAM TODAY BANNER */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="relative w-full rounded-sm overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-8 sm:p-12 lg:p-16 flex flex-col justify-end shadow-md">
              
              {/* Background Image: Crisp architectural villa exterior */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={teamPageImages.banner}
                  alt="Meet Your Build Team Today"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  priority
                />
                {/* Subtle dark gradient behind text */}
                <div className="absolute inset-0 bg-neutral-950/20" />
              </div>

              {/* Content Row: Bottom-aligned left text + bottom-right button */}
              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
                
                {/* Left Column: Heading + Paragraph */}
                <div className="space-y-4 max-w-lg">
                  <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white uppercase leading-[1.05] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                    MEET YOUR <br />
                    BUILD TEAM <br />
                    TODAY.
                  </h2>
                  <p className="text-xs sm:text-sm text-white/95 font-light leading-relaxed max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Behind every great home is the right team. Browse our people and find the experts who&apos;ll bring your project to life.
                  </p>
                </div>

                {/* Right Column: Signature Gold CTA Button with black arrow square */}
                <div className="self-start md:self-end">
                  <Link
                    href="/contact"
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
          </FadeIn>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
