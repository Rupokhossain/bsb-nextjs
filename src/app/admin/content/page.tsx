"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FileText,
  Save,
  CheckCircle2,
  Upload,
  FileImage,
  Sparkles,
  Layers,
  Building2,
  Sliders,
  Eye,
} from "lucide-react";

export default function AdminSiteContentPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "process" | "banner" | "footer">("hero");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // File Upload Refs
  const heroFileRef = useRef<HTMLInputElement>(null);
  const aboutFileRef = useRef<HTMLInputElement>(null);
  const processFileRef = useRef<HTMLInputElement>(null);
  const bannerFileRef = useRef<HTMLInputElement>(null);

  // Comprehensive Site Content State (Matches Home & Global Sections)
  const [content, setContent] = useState({
    // 1. HERO SECTION
    heroBadge: "PRECISION STRUCTURAL STEEL & ARCHITECTURE",
    heroHeadline1: "ENGINEERED FOR STRENGTH,",
    heroHeadline2: "CRAFTED FOR ELEGANCE.",
    heroSubtitle: "Turnkey structural steel duplex villas, modern rooftop architecture, and industrial pre-engineered buildings across Bangladesh.",
    heroPrimaryCtaText: "Explore Services",
    heroSecondaryCtaText: "Book a Consult",
    heroImageUrl: "/Sunset Concrete Construction Skyline.png",

    // 2. ABOUT SECTION & FOUNDER
    aboutEyebrow: "ABOUT BANGLADESH STEEL BUILDERS",
    aboutHeadline: "Pioneering Modern Steel Architecture Since 2009",
    founderName: "S.M. Anayet Hossain",
    founderTitle: "Founder & Managing Director",
    founderQuote: "We replace heavy, slow concrete with precision-engineered structural steel, building homes and factory structures that last generations.",
    stat1Number: "15+",
    stat1Label: "Years of Engineering Excellence",
    stat2Number: "500+",
    stat2Label: "Completed Structures across Bangladesh",
    stat3Number: "150,000",
    stat3Label: "sq.ft Modern Fabrication Yard",
    aboutImageUrl: "/sm-anayet-office.jpg",

    // 3. PROCESS SECTION ("HOW WE WORK")
    processBadge: "OUR PROCESS",
    processHeadline: "How We Work",
    processSubtitle: "From first consultation to handover day, the process is clear and predictable.",
    phase1Title: "Consultation & Audit",
    phase1Desc: "We analyze your site conditions, structural load requirements, and project budget to map out the ideal engineering path forward.",
    phase2Title: "Design & 3D Modeling",
    phase2Desc: "Our engineering studio converts your brief into a millimeter-accurate 3D BIM model, BNBC-compliant blueprints, and fixed cost estimation.",
    phase3Title: "Fabrication & Handover",
    phase3Desc: "Our factory fabricates certified high-tensile steel components, followed by safe on-site erection and guaranteed on-time handover.",
    processImageUrl: "/steel-building.jpg",

    // 4. FULL-WIDTH CINEMATIC BANNER
    bannerBadge: "BUILT WITH INTENT",
    bannerHeadline: "EVERY DETAIL DESIGNED AND BUILT BY ONE DEDICATED TEAM",
    bannerSubtitle: "From the first sketch to the final finish, your home is delivered by the same hands, no handoffs, no surprises.",
    bannerImageUrl: "/Sunset Concrete Construction Skyline.png",

    // 5. FOOTER & TRUST BADGES
    footerBio: "Nirman BSB is the specialized structural engineering, architectural consultancy, and turnkey construction wing of Bangladesh Steel Builders Ltd.",
    trustBadge: "BNBC & AISC Structural Safety Certified",
    copyrightText: `© ${new Date().getFullYear()} Nirman BSB • A Concern of Bangladesh Steel Builders Ltd. All rights reserved.`,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  // Generic File Upload Handler
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "heroImageUrl" | "aboutImageUrl" | "processImageUrl" | "bannerImageUrl"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setContent((prev) => ({ ...prev, [field]: preview }));
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 max-w-5xl">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Site Content CMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Edit headlines, subtitles, statistics, and section photos on mobile or desktop.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-bold text-sm transition-colors shadow-2xs shrink-0 cursor-pointer self-start sm:self-auto active:scale-98"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Website content successfully updated and saved!</span>
        </div>
      )}

      {/* Section Tabs: Horizontal Scroll Strip for Phones */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs scrollbar-none">
        {[
          { id: "hero", label: "Hero" },
          { id: "about", label: "About & Stats" },
          { id: "process", label: "How We Work" },
          { id: "banner", label: "Cinematic Banner" },
          { id: "footer", label: "Footer & Badges" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#E5A53D] text-slate-950 font-black shadow-2xs"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Form */}
      <form onSubmit={handleSave} className="space-y-3.5 sm:space-y-4">
        {/* TAB 1: HERO SECTION */}
        {activeTab === "hero" && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-950 uppercase tracking-wider">
                Homepage Hero Section
              </h3>
              <span className="text-xs text-slate-500 font-medium">Top viewport</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Top Gold Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={content.heroBadge}
                  onChange={(e) => setContent({ ...content, heroBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Main Headline (Line 1)
                  </label>
                  <input
                    type="text"
                    value={content.heroHeadline1}
                    onChange={(e) => setContent({ ...content, heroHeadline1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Main Headline (Line 2)
                  </label>
                  <input
                    type="text"
                    value={content.heroHeadline2}
                    onChange={(e) => setContent({ ...content, heroHeadline2: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Hero Paragraph Subtitle
                </label>
                <textarea
                  rows={2}
                  value={content.heroSubtitle}
                  onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.heroPrimaryCtaText}
                    onChange={(e) => setContent({ ...content, heroPrimaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.heroSecondaryCtaText}
                    onChange={(e) => setContent({ ...content, heroSecondaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>

              {/* Hero Image Upload */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-[#E5A53D]" />
                    <span>Hero Background Photo</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">Desktop &amp; Mobile</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <Image
                      src={content.heroImageUrl}
                      alt="Hero Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={heroFileRef}
                      onChange={(e) => handleFileUpload(e, "heroImageUrl")}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => heroFileRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50 text-slate-900 font-bold text-sm transition-colors shadow-2xs w-full cursor-pointer active:scale-98"
                    >
                      <Upload className="w-4 h-4 text-[#E5A53D]" />
                      <span>Choose File from Device</span>
                    </button>
                    <input
                      type="text"
                      value={content.heroImageUrl}
                      onChange={(e) => setContent({ ...content, heroImageUrl: e.target.value })}
                      placeholder="or paste path /Sunset Concrete Construction Skyline.png"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-700 focus:outline-hidden focus:border-[#E5A53D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT & FOUNDER */}
        {activeTab === "about" && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-950 uppercase tracking-wider">
                Founder Note &amp; Experience Stats
              </h3>
              <span className="text-xs text-slate-500 font-medium">Profile details</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Founder Full Name
                  </label>
                  <input
                    type="text"
                    value={content.founderName}
                    onChange={(e) => setContent({ ...content, founderName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={content.founderTitle}
                    onChange={(e) => setContent({ ...content, founderTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Founder Keynote Quote / Message
                </label>
                <textarea
                  rows={3}
                  value={content.founderQuote}
                  onChange={(e) => setContent({ ...content, founderQuote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white leading-relaxed"
                />
              </div>

              {/* 3 Key Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Stat 1 (e.g. 15+)</label>
                  <input
                    type="text"
                    value={content.stat1Number}
                    onChange={(e) => setContent({ ...content, stat1Number: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-black text-sm"
                  />
                  <input
                    type="text"
                    value={content.stat1Label}
                    onChange={(e) => setContent({ ...content, stat1Label: e.target.value })}
                    className="w-full px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs text-slate-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Stat 2 (e.g. 500+)</label>
                  <input
                    type="text"
                    value={content.stat2Number}
                    onChange={(e) => setContent({ ...content, stat2Number: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-black text-sm"
                  />
                  <input
                    type="text"
                    value={content.stat2Label}
                    onChange={(e) => setContent({ ...content, stat2Label: e.target.value })}
                    className="w-full px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs text-slate-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Stat 3 (e.g. 150,000)</label>
                  <input
                    type="text"
                    value={content.stat3Number}
                    onChange={(e) => setContent({ ...content, stat3Number: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-black text-sm"
                  />
                  <input
                    type="text"
                    value={content.stat3Label}
                    onChange={(e) => setContent({ ...content, stat3Label: e.target.value })}
                    className="w-full px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs text-slate-600"
                  />
                </div>
              </div>

              {/* Founder Image Upload */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-[#E5A53D]" />
                    <span>Founder Official Photo</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">Portrait</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <Image
                      src={content.aboutImageUrl}
                      alt="Founder Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={aboutFileRef}
                      onChange={(e) => handleFileUpload(e, "aboutImageUrl")}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => aboutFileRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50 text-slate-900 font-bold text-sm transition-colors shadow-2xs w-full cursor-pointer active:scale-98"
                    >
                      <Upload className="w-4 h-4 text-[#E5A53D]" />
                      <span>Choose File from Device</span>
                    </button>
                    <input
                      type="text"
                      value={content.aboutImageUrl}
                      onChange={(e) => setContent({ ...content, aboutImageUrl: e.target.value })}
                      placeholder="e.g. /sm-anayet-office.jpg"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-700 focus:outline-hidden focus:border-[#E5A53D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROCESS SECTION */}
        {activeTab === "process" && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-950 uppercase tracking-wider">
                &ldquo;How We Work&rdquo; Process (3 Phases)
              </h3>
              <span className="text-xs text-slate-500 font-medium">Roadmap</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={content.processHeadline}
                    onChange={(e) => setContent({ ...content, processHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Badge Title
                  </label>
                  <input
                    type="text"
                    value={content.processBadge}
                    onChange={(e) => setContent({ ...content, processBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>

              {/* 3 PHASES */}
              <div className="space-y-3">
                {/* Phase 1 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-xs uppercase text-[#E5A53D] tracking-wider">
                    Phase 01: Initial Feasibility &amp; Audit
                  </div>
                  <input
                    type="text"
                    value={content.phase1Title}
                    onChange={(e) => setContent({ ...content, phase1Title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold text-sm"
                  />
                  <textarea
                    rows={2}
                    value={content.phase1Desc}
                    onChange={(e) => setContent({ ...content, phase1Desc: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-700"
                  />
                </div>

                {/* Phase 2 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-xs uppercase text-[#E5A53D] tracking-wider">
                    Phase 02: 3D BIM Design &amp; Estimation
                  </div>
                  <input
                    type="text"
                    value={content.phase2Title}
                    onChange={(e) => setContent({ ...content, phase2Title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold text-sm"
                  />
                  <textarea
                    rows={2}
                    value={content.phase2Desc}
                    onChange={(e) => setContent({ ...content, phase2Desc: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-700"
                  />
                </div>

                {/* Phase 3 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-xs uppercase text-[#E5A53D] tracking-wider">
                    Phase 03: Fabrication &amp; Erection Handover
                  </div>
                  <input
                    type="text"
                    value={content.phase3Title}
                    onChange={(e) => setContent({ ...content, phase3Title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold text-sm"
                  />
                  <textarea
                    rows={2}
                    value={content.phase3Desc}
                    onChange={(e) => setContent({ ...content, phase3Desc: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-700"
                  />
                </div>
              </div>

              {/* Process Image */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-[#E5A53D]" />
                    <span>Process Illustration Photo</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">Fabrication / Erection</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <Image
                      src={content.processImageUrl}
                      alt="Process Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={processFileRef}
                      onChange={(e) => handleFileUpload(e, "processImageUrl")}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => processFileRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50 text-slate-900 font-bold text-sm transition-colors shadow-2xs w-full cursor-pointer active:scale-98"
                    >
                      <Upload className="w-4 h-4 text-[#E5A53D]" />
                      <span>Choose File from Device</span>
                    </button>
                    <input
                      type="text"
                      value={content.processImageUrl}
                      onChange={(e) => setContent({ ...content, processImageUrl: e.target.value })}
                      placeholder="e.g. /steel-building.jpg"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-700 focus:outline-hidden focus:border-[#E5A53D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CINEMATIC BANNER */}
        {activeTab === "banner" && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-950 uppercase tracking-wider">
                Full-Width Cinematic Steel Banner
              </h3>
              <span className="text-xs text-slate-500 font-medium">Featured visual CTA</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Banner Badge
                </label>
                <input
                  type="text"
                  value={content.bannerBadge}
                  onChange={(e) => setContent({ ...content, bannerBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Main Cinematic Headline
                </label>
                <input
                  type="text"
                  value={content.bannerHeadline}
                  onChange={(e) => setContent({ ...content, bannerHeadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={content.bannerSubtitle}
                  onChange={(e) => setContent({ ...content, bannerSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              {/* Banner Image Upload */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-[#E5A53D]" />
                    <span>Banner Background Image</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">Wide High-Resolution</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <div className="relative w-36 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <Image
                      src={content.bannerImageUrl}
                      alt="Banner Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={bannerFileRef}
                      onChange={(e) => handleFileUpload(e, "bannerImageUrl")}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => bannerFileRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50 text-slate-900 font-bold text-sm transition-colors shadow-2xs w-full cursor-pointer active:scale-98"
                    >
                      <Upload className="w-4 h-4 text-[#E5A53D]" />
                      <span>Choose File from Device</span>
                    </button>
                    <input
                      type="text"
                      value={content.bannerImageUrl}
                      onChange={(e) => setContent({ ...content, bannerImageUrl: e.target.value })}
                      placeholder="e.g. /Sunset Concrete Construction Skyline.png"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-700 focus:outline-hidden focus:border-[#E5A53D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FOOTER & TRUST */}
        {activeTab === "footer" && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-950 uppercase tracking-wider">
                Footer Bio &amp; Trust Badges
              </h3>
              <span className="text-xs text-slate-500 font-medium">Bottom global</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Global Footer Bio Note
                </label>
                <textarea
                  rows={3}
                  value={content.footerBio}
                  onChange={(e) => setContent({ ...content, footerBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Safety &amp; Trust Badge Text
                </label>
                <input
                  type="text"
                  value={content.trustBadge}
                  onChange={(e) => setContent({ ...content, trustBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Copyright Text
                </label>
                <input
                  type="text"
                  value={content.copyrightText}
                  onChange={(e) => setContent({ ...content, copyrightText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at Bottom */}
        <div className="flex items-center justify-end pt-1">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-bold text-sm uppercase tracking-wider transition-colors shadow-xs cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save All Content</span>
          </button>
        </div>
      </form>
    </div>
  );
}
