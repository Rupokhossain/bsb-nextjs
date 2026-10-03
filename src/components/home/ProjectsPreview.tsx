"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { projectsData } from "@/data/projects";

export default function ProjectsPreview() {
  // Take the first 3 projects for the home showcase
  const previewProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="bg-white text-neutral-900 py-24 sm:py-32 border-t border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* HEADER: Badge + Headline + Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
            <span>SELECTED WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase">
            Projects We&apos;re Proud To Have Built
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto font-light">
            A look at recent custom rooftops, infinity pools, and architectural renovations — each designed, engineered and built by the same dedicated team.
          </p>
        </motion.div>

        {/* 3 PROJECTS GRID WITH STAGGERED REVEAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group space-y-4 block cursor-pointer"
              >
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

                <div className="space-y-1 pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 group-hover:text-[#E5A53D] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <span className="text-xs text-neutral-400 group-hover:text-[#E5A53D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all font-medium">
                      View Case Study ↗
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 capitalize">
                    {project.category} • {project.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CENTER CTA BUTTON: "View All Projects" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center pt-6"
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
