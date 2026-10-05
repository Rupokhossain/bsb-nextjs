import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { HeroMotion, FadeIn, StaggerContainer, StaggerItem } from "@/components/common/MotionWrapper";

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

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Top Navbar with light theme for crisp visibility */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-36 pb-24 space-y-20 sm:space-y-24">
        
        {/* 1. HEADER SECTION */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <HeroMotion className="max-w-4xl mx-auto text-center space-y-4">
            {/* Breadcrumbs */}
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-neutral-900 transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[#E5A53D]">{service.title}</span>
            </div>

            {/* Service Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>SERVICE {String(serviceIndex + 1).padStart(2, "0")} / 03</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight mt-2">
              {service.title}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-light">
              {service.tagline}
            </p>
          </HeroMotion>
        </section>

        {/* 2. FEATURED HERO IMAGE */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <FadeIn delay={0.2} scale>
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
          </FadeIn>
        </section>

        {/* 4. EXECUTIVE ARCHITECTURAL OVERVIEW */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
          <FadeIn className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 leading-snug">
              &ldquo;{service.mainHeadline}&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              {service.introParagraph}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
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
          </FadeIn>
        </section>

        {/* 4.5. SERVICE SCOPE & SPECIALIZED CAPABILITIES */}
        {service.features && service.features.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 sm:px-8">
            <FadeIn>
              <div className="bg-[#FAF9F6] p-8 sm:p-10 rounded-sm border border-neutral-200/90 shadow-sm space-y-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#E5A53D] text-neutral-950 text-[11px] font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                    <span>SERVICE SCOPE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 pt-2">
                    Included Capabilities & Specialized Solutions
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                  {service.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-3 p-3.5 bg-white rounded-sm border border-neutral-200/70 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#E31E24] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-[15px] font-bold text-neutral-900 tracking-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>
        )}

        {/* 5. METHODOLOGY / CAPABILITIES GRID */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
          <FadeIn className="text-center space-y-2">
            <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-widest">Our Methodology</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              How We Deliver Exceptional Quality
            </h3>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Structural Modeling",
                desc: "Certified load capacity analysis, wind & seismic simulation, and BNBC building code compliance.",
              },
              {
                num: "02",
                title: "Precision 3D BIM",
                desc: "Advanced 3D virtual modeling and detailing to prevent assembly conflicts before on-site fabrication.",
              },
              {
                num: "03",
                title: "Certified Fabrication",
                desc: "High-grade certified steel plates, ultrasonic tested welding, and anti-corrosive primer coating.",
              },
              {
                num: "04",
                title: "Guaranteed Handover",
                desc: "Dedicated crane rigging, strict on-site safety supervision, and turnkey commissioning on schedule.",
              },
            ].map((m) => (
              <StaggerItem
                key={m.num}
                className="p-6 rounded-sm bg-white border border-neutral-200 shadow-sm space-y-3 hover:border-neutral-900 transition-colors"
              >
                <span className="text-2xl font-black text-[#E5A53D] block">{m.num}</span>
                <h4 className="text-base font-bold text-neutral-950">{m.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {m.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* 6. VIP CONSULTATION BANNER */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8">
          <FadeIn>
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
                <a
                  href="https://wa.me/8801711181860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm transition-all active:scale-95 shadow-md whitespace-nowrap"
                >
                  Schedule Site Visit
                </a>
                <a
                  href="tel:+8801711181860"
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-sm border border-neutral-700 hover:border-white text-white font-medium text-sm transition-all whitespace-nowrap"
                >
                  Call Hotline
                </a>
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
