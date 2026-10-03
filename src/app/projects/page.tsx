import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { HeroMotion, StaggerContainer, StaggerItem, FadeIn } from "@/components/common/MotionWrapper";

export const metadata = {
  title: "Projects | BSB Architectural Living & Custom Pools",
  description: "Explore our portfolio of bespoke rooftop retreats, infinity pools, and luxury residential projects.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Light Navbar for white background */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-36 pb-24 space-y-20 sm:space-y-24">
        
        {/* 1. HEADER SECTION */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-4">
          <HeroMotion>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>SELECTED WORK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase max-w-4xl mx-auto leading-tight mt-4">
              Recent Architectural Projects & Living Spaces
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto font-light mt-4">
              A comprehensive look at our recent rooftop transformations, custom swimming pools, and architectural builds across Dhaka and resort destinations.
            </p>
          </HeroMotion>
        </section>

        {/* 2. FULL PROJECTS GRID WITH STAGGERED MOTION */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {projectsData.map((project) => (
              <StaggerItem key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="group space-y-4 block cursor-pointer"
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative h-[280px] sm:h-[340px] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-sm">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                  </div>

                  {/* Project Titles */}
                  <div className="space-y-1 pt-1">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-950 group-hover:text-[#E5A53D] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <span className="text-xs text-neutral-400 group-hover:text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all font-semibold">
                        Explore ↗
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 capitalize">
                      {project.category} • {project.location}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* 3. BOTTOM CINEMATIC CTA BANNER */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="relative rounded-sm overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 lg:p-20 shadow-2xl min-h-[380px] sm:min-h-[440px] flex items-center">
              {/* Background Villa & Pool Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/p-banner.jpg"
                  alt="Ready to Work With Us"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  priority
                />
              </div>

              {/* Banner Content */}
              <div className="relative z-10 max-w-2xl space-y-6">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-tight">
                  Ready to Work <br /> With Us?
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
                  We believe every client deserves a space engineered with care, precision, and lasting architectural value. Take the next step and start the conversation with our engineering team.
                </p>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm sm:text-base pl-6 pr-2 py-2 transition-all group shadow-lg active:scale-95"
                  >
                    <span>Book a Consultation</span>
                    <div className="ml-4 w-9 h-9 rounded-sm bg-neutral-950 flex items-center justify-center text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
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
