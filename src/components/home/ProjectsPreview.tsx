"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

// 📸 4 Featured Projects (Chobi gula public folder a rekhe eikhane path boshiye diben)
const featuredProjects = [
  {
    id: "jmi-shankur-auto-tank",
    title: "JMI Shankur Auto Tank Limited",
    location: "Chattogram",
    // 📸 Apnar 1st chobir path eikhane boshaben
    image: "/Steel-Building-Projects.jpg",
  },
  {
    id: "akij-biri-factory",
    title: "Akij Biri Factory Ltd.",
    location: "Rangpur",
    // 📸 Apnar 2nd chobir path eikhane boshaben
    image: "/Steel-Building-Projects-2.jpg",
  },
  {
    id: "pabna-onion-cold-storage",
    title: "Pabna Onion Cold Storage",
    location: "Pabna",
    // 📸 Apnar 3rd chobir path eikhane boshaben
    image: "/Steel-Building-Projects-3.jpg",
  },
  {
    id: "jmi-industrial-gas",
    title: "JMI Industrial Gas Limited",
    location: "Chattogram",
    // 📸 Apnar 4th chobir path eikhane boshaben
    image: "/Steel-Building-Projects-1.jpg",
  },
];

export default function ProjectsPreview() {
  return (
    <section
      id="projects"
      className="bg-white text-neutral-900 py-20 sm:py-28 border-t border-neutral-100 overflow-hidden"
    >
      {/* 1. SECTION HEADER (Container width) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-4 text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>LATEST WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
            Projects We&apos;re Proud To Have Built
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
            A showcase of high-capacity industrial manufacturing plants, pre-engineered steel buildings, and specialized commercial facilities engineered and erected across Bangladesh.
          </p>
        </motion.div>
      </div>

      {/* 2. FULL-WIDTH 4-COLUMN MOSAIC (Edge-to-Edge like the screenshot) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            className="relative h-[380px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden group cursor-pointer border-r border-neutral-200/40 last:border-r-0"
          >
            <Link href={`/projects/${project.id}`} className="block w-full h-full relative">
              {/* Image with zoom effect */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Cinematic Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent transition-opacity duration-300" />

              {/* Hover Golden Glow / Subtle Tint */}
              <div className="absolute inset-0 bg-[#E5A53D]/0 group-hover:bg-[#E5A53D]/10 transition-colors duration-500" />

              {/* Bottom Info Content (Positioned exactly as in the reference image) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-2 z-10">
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-[#E5A53D] transition-colors drop-shadow-md">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-medium tracking-wide">
                  Location: {project.location}
                </p>

                {/* Subtle Hover Action Line */}
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#E5A53D] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>View Project Details</span>
                  <span>→</span>
                </div>
              </div>

              {/* Bottom Gold Accent Border on Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5A53D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 3. CENTER CTA BUTTON: "View All Projects" */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm sm:text-base pl-6 pr-2 py-2 transition-all group shadow-md active:scale-95"
          >
            <span>View All Projects</span>
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
        </motion.div>
      </div>
    </section>
  );
}
