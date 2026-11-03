"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { siteContentApi, settingsApi } from "@/lib/api";

// 13 Unique Industrial Client Logos default
const defaultClientLogos = [
  { id: "1", name: "Prime Pusti Limited", src: "/c1.png" },
  { id: "2", name: "Advance Tech Ltd.", src: "/c2.png" },
  { id: "3", name: "HR Jute Mills Pvt. Ltd.", src: "/c3.jpg" },
  { id: "4", name: "Hasan Jute Mills Limited", src: "/c4.jpg" },
  { id: "6", name: "Bengal Steel & Agro", src: "/c6.jpg" },
  { id: "7", name: "Apex Industrial Solutions", src: "/c7.jpg" },
  { id: "8", name: "Crown Spinning Mills", src: "/c8.jpg" },
  { id: "9", name: "Delta Commercial Logistics", src: "/c9.jpg" },
  { id: "10", name: "Standard Composite Mills", src: "/c10.jpg" },
  { id: "11", name: "Eastern Engineering Works", src: "/c11.jpg" },
  { id: "13", name: "Meghna Industrial Park", src: "/c13.jpg" },
  { id: "14", name: "Universal Polymer Ltd.", src: "/c14.jpg" },
  { id: "15", name: "Padma Commercial Center", src: "/c15.jpg" },
];

const defaultMetrics = {
  badge: "HONORED CLIENTS & PARTNERS",
  headline: "Trusted by Bangladesh's Leading Enterprises",
  subtitle:
    "From heavy manufacturing mills and textile giants to mega agro-conglomerates and commercial developers, we deliver verified steel engineering excellence with unwavering trust.",
  metric1Number: "150+",
  metric1Label: "Industrial Projects Delivered",
  metric2Number: "17+",
  metric2Label: "Years of Industry Trust",
  metric3Number: "64",
  metric3Label: "Districts Covered Nationwide",
  metric4Number: "100%",
  metric4Label: "BNBC & AISC Safety Certified",
};

interface ClientsSectionProps {
  initialData?: any;
}

export default function ClientsSection({ initialData }: ClientsSectionProps = {}) {
  const [logos, setLogos] = useState(() => {
    if (initialData?.clientPartners && Array.isArray(initialData.clientPartners) && initialData.clientPartners.length > 0) {
      return initialData.clientPartners
        .filter((item: any) => item && (typeof item === "string" ? item : item.src))
        .map((item: any, i: number) => ({
          id: typeof item === "object" && item.id ? item.id : `cp-${i}`,
          src: typeof item === "string" ? item : item.src,
          name: typeof item === "object" && item.name ? item.name : `BSB Client Partner ${i + 1}`,
        }));
    }
    return defaultClientLogos;
  });

  const [metrics, setMetrics] = useState(() => ({
    badge: initialData?.clientsBadge || defaultMetrics.badge,
    headline: initialData?.clientsHeadline || defaultMetrics.headline,
    subtitle: initialData?.clientsSubtitle || defaultMetrics.subtitle,
    metric1Number: initialData?.clientsMetric1Number || defaultMetrics.metric1Number,
    metric1Label: initialData?.clientsMetric1Label || defaultMetrics.metric1Label,
    metric2Number: initialData?.clientsMetric2Number || defaultMetrics.metric2Number,
    metric2Label: initialData?.clientsMetric2Label || defaultMetrics.metric2Label,
    metric3Number: initialData?.clientsMetric3Number || defaultMetrics.metric3Number,
    metric3Label: initialData?.clientsMetric3Label || defaultMetrics.metric3Label,
    metric4Number: initialData?.clientsMetric4Number || defaultMetrics.metric4Number,
    metric4Label: initialData?.clientsMetric4Label || defaultMetrics.metric4Label,
  }));
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/8801711181860");

  useEffect(() => {
    // Load directly from backend database API
    siteContentApi
      .getAll()
      .then((res) => {
        if (res?.dictionary?.clients) {
          const c = res.dictionary.clients;
          setMetrics((prev) => ({
            ...prev,
            badge: c.clientsBadge || prev.badge,
            headline: c.clientsHeadline || prev.headline,
            subtitle: c.clientsSubtitle || prev.subtitle,
            metric1Number: c.clientsMetric1Number || prev.metric1Number,
            metric1Label: c.clientsMetric1Label || prev.metric1Label,
            metric2Number: c.clientsMetric2Number || prev.metric2Number,
            metric2Label: c.clientsMetric2Label || prev.metric2Label,
            metric3Number: c.clientsMetric3Number || prev.metric3Number,
            metric3Label: c.clientsMetric3Label || prev.metric3Label,
            metric4Number: c.clientsMetric4Number || prev.metric4Number,
            metric4Label: c.clientsMetric4Label || prev.metric4Label,
          }));

          if (c.clientPartners && Array.isArray(c.clientPartners) && c.clientPartners.length > 0) {
            setLogos(
              c.clientPartners
                .filter((item: any) => item && (typeof item === "string" ? item : item.src))
                .map((item: any, i: number) => ({
                  id: typeof item === "object" && item.id ? item.id : `cp-${i}`,
                  src: typeof item === "string" ? item : item.src,
                  name: (typeof item === "object" && item.name) ? item.name : `BSB Client Partner ${i + 1}`,
                }))
            );
          }
        }
      })
      .catch(() => {});

    settingsApi
      .get()
      .then((s) => {
        if (s?.whatsapp) {
          setWhatsappUrl(`https://wa.me/${s.whatsapp.replace(/[^0-9]/g, "")}`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="clients"
      className="py-20 sm:py-28 bg-white border-t border-neutral-200/80 overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10 sm:space-y-12">
        {/* ============================================================ */}
        {/* 1. SECTION HEADER: Badge + Headline + Context */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
              <span>{metrics.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight whitespace-pre-line">
              {metrics.headline}
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              {metrics.subtitle}
            </p>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. PROVEN TRUST METRICS STRIP */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 bg-[#FAF9F6] rounded-sm border border-neutral-200/90 shadow-xs"
        >
          <div className="space-y-1 border-r border-neutral-200/70 last:border-none pr-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              {metrics.metric1Number}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              {metrics.metric1Label}
            </div>
          </div>

          <div className="space-y-1 border-r border-neutral-200/70 last:border-none pr-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              {metrics.metric2Number}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              {metrics.metric2Label}
            </div>
          </div>

          <div className="space-y-1 border-r border-neutral-200/70 last:border-none pr-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              {metrics.metric3Number}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              {metrics.metric3Label}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              {metrics.metric4Number}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-medium">
              {metrics.metric4Label}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. BORDERLESS FLOATING LOGOS (LARGE & CLEAN, NO CARD BOXES) */}
      {/* ============================================================ */}
      <div className="relative mt-12 sm:mt-16 w-full overflow-hidden py-6 sm:py-8">
        {/* Left & Right Gradient Edge Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-44 lg:w-64 z-20 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-44 lg:w-64 z-20 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Single Seamless Infinite Marquee with Spacious Pure Logos */}
        <div className="flex items-center gap-6 sm:gap-12 animate-marquee py-3">
          {[...logos, ...logos].map((client, idx) => (
            <div
              key={`client-${client.id || idx}-${idx}`}
              className="flex-shrink-0 w-44 sm:w-56 md:w-64 h-24 sm:h-28 md:h-32 relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <Image
                src={client.src}
                alt={client.name || "BSB Engineering Client Partner Logo"}
                fill
                unoptimized
                className="object-contain filter contrast-[1.05]"
                sizes="(max-width: 768px) 180px, 260px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM TRUST BADGE & WHATSAPP ACTION CALLOUT */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14">
        <div className="p-6 sm:p-8 rounded-sm bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-neutral-800">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#E5A53D] uppercase tracking-wider block">
              Enterprise Partnership
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Ready to construct your next industrial or commercial steel facility?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Join over 150+ satisfied industrial partners with guaranteed on-time delivery and structural excellence.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-wide whitespace-nowrap transition-all active:scale-95 shadow-md text-center"
            >
              <span className="whitespace-nowrap">Consult Our Senior Engineers</span>
              <span className="shrink-0">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
