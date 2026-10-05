import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { HeroMotion, FadeIn, StaggerContainer, StaggerItem } from "@/components/common/MotionWrapper";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.id === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];

  // Prev & Next project
  const prevProject =
    projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Light Navbar for white background */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-36 pb-24 space-y-20 sm:space-y-24">
        
        {/* 1. PROJECT HEADER */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <HeroMotion className="max-w-4xl mx-auto text-center space-y-4">
            {/* Breadcrumbs */}
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-neutral-900 transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-[#E5A53D]">{project.title}</span>
            </div>

            {/* Case study badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>PROJECT {String(projectIndex + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight mt-2">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-light">
              {project.description}
            </p>
          </HeroMotion>
        </section>

        {/* 2. SPECIFICATION RIBBON */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-sm bg-neutral-50 border border-neutral-200 shadow-sm">
              <div className="space-y-1 border-r border-neutral-200 pr-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Location</span>
                <span className="text-sm sm:text-base font-extrabold text-neutral-950 block">{project.location}</span>
              </div>
              <div className="space-y-1 sm:border-r border-neutral-200 pr-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Footprint</span>
                <span className="text-sm sm:text-base font-extrabold text-neutral-950 block">{project.area}</span>
              </div>
              <div className="space-y-1 border-r border-neutral-200 pr-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Timeline</span>
                <span className="text-sm sm:text-base font-extrabold text-[#E5A53D] block">{project.duration}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Typology</span>
                <span className="text-sm sm:text-base font-extrabold text-neutral-950 block capitalize">{project.category}</span>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 3. HERO PROJECT IMAGE */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <FadeIn delay={0.2} scale>
            <div className="relative w-full h-[360px] sm:h-[520px] lg:h-[640px] rounded-sm overflow-hidden bg-neutral-100 shadow-md group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1200px) 100vw, 1024px"
                priority
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider rounded-sm border border-white/20">
                Completed {project.year} • BSB Turnkey Delivery
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 4. THE VISION & ENGINEERING */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Vision */}
              <div className="space-y-3 p-6 rounded-sm bg-neutral-50 border border-neutral-200/70">
                <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-widest block">The Concept</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                  Architectural Vision
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {project.vision}
                </p>
              </div>

              {/* Engineering */}
              <div className="space-y-3 p-6 rounded-sm bg-neutral-50 border border-neutral-200/70">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">The Execution</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                  Structural Engineering
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {project.engineeringHighlight}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* 3 Key Deliverables Grid */}
          <div className="space-y-4 pt-4">
            <FadeIn>
              <h3 className="text-lg font-bold text-neutral-950 tracking-tight">Key Project Deliverables</h3>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.highlights.map((highlight, idx) => (
                <StaggerItem key={idx} className="p-5 rounded-sm bg-white border border-neutral-200 space-y-2 hover:border-neutral-900 transition-colors">
                  <span className="text-base font-black text-[#E5A53D]">0{idx + 1}.</span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">{highlight}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 5. TWO-IMAGE DETAIL GALLERY */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 sm:px-8 space-y-6">
            <FadeIn className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
                Craftsmanship & Finish Details
              </h3>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {project.galleryImages.map((img, i) => (
                <StaggerItem key={i}>
                  <div className="relative h-[280px] sm:h-[360px] rounded-sm overflow-hidden bg-neutral-100 shadow-sm group">
                    <Image
                      src={img}
                      alt={`${project.title} detail ${i + 1}`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* 6. CONSULTATION BANNER */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="rounded-sm bg-neutral-950 text-white p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-widest block">Ready To Transform Your Space?</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Interested in a similar build?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md">
                  Schedule a complimentary site consultation with our architectural team and get a full 3D design blueprint.
                </p>
              </div>
              <a
                href="https://wa.me/8801711181860"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm whitespace-nowrap active:scale-95 shadow-md"
              >
                Request 3D Blueprint
              </a>
            </div>
          </FadeIn>
        </section>

        {/* 7. BOTTOM PREV / NEXT PROJECT NAVIGATION */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-8 border-t border-neutral-100">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-700">
            <Link
              href={`/projects/${prevProject.id}`}
              className="inline-flex items-center gap-1.5 hover:text-[#E5A53D] transition-colors"
            >
              <span>‹ {prevProject.title}</span>
            </Link>

            <Link
              href={`/projects/${nextProject.id}`}
              className="inline-flex items-center gap-1.5 hover:text-[#E5A53D] transition-colors"
            >
              <span>{nextProject.title} ›</span>
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
