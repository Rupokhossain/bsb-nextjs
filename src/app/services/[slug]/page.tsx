import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const serviceIndex = servicesData.findIndex((s) => s.slug === slug);

  if (serviceIndex === -1) {
    notFound();
  }

  const service = servicesData[serviceIndex];

  // Dynamically resolve related projects from projectsData (Relational model ready for backend)
  const relatedProjects = projectsData.filter((project) =>
    service.projectIds.includes(project.id)
  );

  // Prev & Next navigation links
  const prevService =
    serviceIndex > 0 ? servicesData[serviceIndex - 1] : servicesData[servicesData.length - 1];
  const nextService =
    serviceIndex < servicesData.length - 1 ? servicesData[serviceIndex + 1] : servicesData[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Top Navbar with light theme for crisp visibility */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-36 pb-24 space-y-20 sm:space-y-24">
        
        {/* 1. HEADER SECTION */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {/* Breadcrumbs */}
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-neutral-900 transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[#E5A53D]">{service.title}</span>
            </div>

            {/* Service Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>SERVICE {String(serviceIndex + 1).padStart(2, "0")} / 05</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
              {service.title}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-light">
              {service.tagline}
            </p>
          </div>
        </section>

        {/* 2. SPECIFICATION STRIP */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-sm bg-neutral-50 border border-neutral-200/80 shadow-sm">
            <div className="space-y-1 border-r border-neutral-200/60 pr-4 last:border-none">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Timeline</span>
              <span className="text-sm sm:text-base font-extrabold text-neutral-950 block">3 – 6 Weeks</span>
            </div>
            <div className="space-y-1 sm:border-r border-neutral-200/60 pr-4 last:border-none">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Warranty</span>
              <span className="text-sm sm:text-base font-extrabold text-[#E5A53D] block">10-Yr Written</span>
            </div>
            <div className="space-y-1 border-r border-neutral-200/60 pr-4 last:border-none">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Deliverable</span>
              <span className="text-sm sm:text-base font-extrabold text-neutral-950 block">3D Plan + Build</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Quality QA</span>
              <span className="text-sm sm:text-base font-extrabold text-neutral-950 block">100% Tested</span>
            </div>
          </div>
        </section>

        {/* 3. FEATURED HERO IMAGE */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="relative w-full h-[340px] sm:h-[500px] lg:h-[600px] rounded-sm overflow-hidden bg-neutral-100 shadow-md group">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1200px) 100vw, 1024px"
              priority
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider rounded-sm border border-white/20">
              BSB Engineering Portfolio
            </div>
          </div>
        </section>

        {/* 4. EXECUTIVE ARCHITECTURAL OVERVIEW */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 leading-snug">
              &ldquo;{service.mainHeadline}&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              {service.introParagraph}
            </p>
          </div>

          <div className="bg-neutral-50 p-8 rounded-sm border border-neutral-200/80 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950">
              {service.subHeadline}
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              {service.subParagraph1}
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              {service.subParagraph2}
            </p>
          </div>
        </section>

        {/* 5. METHODOLOGY / CAPABILITIES GRID */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-widest">Our Methodology</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              How We Deliver Exceptional Quality
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-sm bg-white border border-neutral-200 shadow-sm space-y-3 hover:border-neutral-900 transition-colors">
              <span className="text-2xl font-black text-[#E5A53D] block">01</span>
              <h4 className="text-base font-bold text-neutral-950">Structural Verification</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Certified load capacity and waterproofing barrier testing before laying a single brick.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white border border-neutral-200 shadow-sm space-y-3 hover:border-neutral-900 transition-colors">
              <span className="text-2xl font-black text-[#E5A53D] block">02</span>
              <h4 className="text-base font-bold text-neutral-950">Photorealistic 3D</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Preview exact materials, night lights, and water reflections with virtual walk-throughs.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white border border-neutral-200 shadow-sm space-y-3 hover:border-neutral-900 transition-colors">
              <span className="text-2xl font-black text-[#E5A53D] block">03</span>
              <h4 className="text-base font-bold text-neutral-950">Premium Sourcing</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Marine-grade stainless hardware, weather-sealed teak, and German waterproofing membranes.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white border border-neutral-200 shadow-sm space-y-3 hover:border-neutral-900 transition-colors">
              <span className="text-2xl font-black text-[#E5A53D] block">04</span>
              <h4 className="text-base font-bold text-neutral-950">Turnkey Handover</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                72-hour static water testing, full cleanup, and handover with signed warranty certificate.
              </p>
            </div>
          </div>
        </section>

        {/* 6. VIP CONSULTATION BANNER */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="rounded-sm bg-neutral-950 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-widest block">Ready To Begin?</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Book a Free Site Survey & 3D Estimation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md">
                Our senior exterior engineer will visit your space, assess structural limits, and provide a complimentary 3D blueprint.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href="/#contact"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm transition-all active:scale-95 shadow-md whitespace-nowrap"
              >
                Schedule Site Visit
              </Link>
              <a
                href="tel:+8801700000000"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-sm border border-neutral-700 hover:border-white text-white font-medium text-sm transition-all whitespace-nowrap"
              >
                Call Hotline
              </a>
            </div>
          </div>
        </section>

        {/* 7. RELATED PROJECTS (Clickable and dynamically connected to projectsData) */}
        {relatedProjects.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-8 space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 text-center">
              Related projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group space-y-3 block"
                >
                  <div className="relative h-[240px] sm:h-[280px] rounded-sm overflow-hidden bg-neutral-100 shadow-sm">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-neutral-950 group-hover:text-[#E5A53D] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <span className="text-xs font-semibold text-neutral-400 group-hover:text-[#E5A53D] transition-colors">
                        View Details ↗
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-500 capitalize">{project.category} • {project.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 8. PREV / NEXT BOTTOM NAVIGATION */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-12 border-t border-neutral-100">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-700">
            <Link
              href={`/services/${prevService.slug}`}
              className="inline-flex items-center gap-1.5 hover:text-[#E5A53D] transition-colors"
            >
              <span>‹ {prevService.title}</span>
            </Link>

            <Link
              href={`/services/${nextService.slug}`}
              className="inline-flex items-center gap-1.5 hover:text-[#E5A53D] transition-colors"
            >
              <span>{nextService.title} ›</span>
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
