"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FileText,
  Save,
  CheckCircle2,
  Upload,
  FileImage,
  Sparkles,
  Building2,
  Eye,
  Plus,
  Trash2,
  Users,
  User,
  Compass,
  PhoneCall,
  Home,
  ShieldCheck,
  Check,
  MapPin,
  Phone,
  Mail,
  Clock,
  Layers,
  Award,
} from "lucide-react";
import { siteContentApi, uploadApi } from "@/lib/api";
import { useToast } from "@/components/admin/ToastContext";

interface ClientPartnerItem {
  id: string;
  src: string;
}

interface NirmanPillarItem {
  id: string;
  tag?: string;
  title: string;
  desc: string;
  image: string;
  focusList?: string[];
}

const defaultNirmanPillars: NirmanPillarItem[] = [
  {
    id: "1",
    tag: "01. PLANNING & FEASIBILITY",
    title: "Steel Building Project Planning & Feasibility",
    desc: "Comprehensive site evaluation, industrial zoning compliance, soil capacity matching, and pre-construction feasibility audits.",
    image: "/p6.jpg",
    focusList: [
      "Site topography & soil capacity analysis",
      "Factory operational workflow layout",
      "Regulatory zoning & municipal permissions",
    ],
  },
  {
    id: "2",
    tag: "02. DESIGN REVIEW & OPTIMIZATION",
    title: "Structural Design Review & Optimization",
    desc: "Advanced 3D computerized structural stress analysis, wind and seismic simulations, saving 15-20% excess steel tonnage.",
    image: "/pohs-convention-hall-perspective.jpg",
    focusList: [
      "BNBC & AISC building code compliance",
      "Computerized 3D BIM structural modeling",
      "Steel weight reduction & deflection checks",
    ],
  },
  {
    id: "3",
    tag: "03. COST ESTIMATION & BOQ",
    title: "Cost Estimation & Budget Planning (BOQ)",
    desc: "Itemized Bill of Quantities (BOQ), raw steel market indexing, and milestone contingency schedules with zero hidden cost overrun.",
    image: "/Steel-Building-Projects-6.jpg",
    focusList: [
      "Mill-direct steel price forecasting",
      "Accurate material-by-material BOQ audit",
      "Turnkey timeline & cash-flow planning",
    ],
  },
  {
    id: "4",
    tag: "04. CONSTRUCTION & ERECTION GUIDANCE",
    title: "Construction Method & Erection Guidance",
    desc: "Turnkey erection sequencing, heavy mobile crane rigging logistics, high-tensile anchor bolt torquing protocols, and safety governance.",
    image: "/s4.jpg",
    focusList: [
      "Crane positioning & rigging sequence",
      "Bolt torquing & torque-wrench calibration",
      "Site safety & hazard mitigation protocols",
    ],
  },
  {
    id: "5",
    tag: "05. MATERIAL SELECTION CONSULTANCY",
    title: "Material Selection & Quality Consultancy",
    desc: "Specification audits of high-yield ASTM A572 Grade 50 steel, hot-dip galvanizing thickness, anti-corrosive primer, and sandwich panels.",
    image: "/s5.jpg",
    focusList: [
      "Mill test certificate (MTC) verification",
      "Ultrasonic weld flaw & NDT inspection",
      "Anti-rust coating & paint micron audit",
    ],
  },
  {
    id: "6",
    tag: "06. PROJECT COORDINATION & QA/QC",
    title: "Project Coordination & Technical Supervision",
    desc: "Dedicated third-party on-site QA/QC engineering inspections, milestone handover verification, and as-built architectural documentation.",
    image: "/s6.jpg",
    focusList: [
      "Independent third-party QA/QC inspection",
      "Contractor milestone sign-off audits",
      "Comprehensive as-built documentation",
    ],
  },
];

// Reusable Image Upload & Preview Component for CMS
function ImageUploadField({
  label,
  value,
  onChange,
  onUpload,
  aspect = "video",
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onUpload: (file: File) => Promise<void>;
  aspect?: "video" | "square" | "portrait";
  hint?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        await onUpload(file);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-bold text-slate-800">{label}</label>
        {hint && <span className="text-[11px] text-slate-400 font-medium">{hint}</span>}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
        {/* Preview Box */}
        <div
          className={`relative ${
            aspect === "square"
              ? "w-16 h-16"
              : aspect === "portrait"
              ? "w-14 h-20"
              : "w-28 h-16"
          } rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 shadow-2xs flex items-center justify-center`}
        >
          {value ? (
            <Image src={value} alt={label} fill unoptimized className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <FileImage className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* URL Input & Upload Action */}
        <div className="flex-1 min-w-0 space-y-1.5 w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image path or URL (e.g. /hero-bg.jpg)..."
            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-2xs active:scale-98"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? "Uploading..." : "Upload from Device"}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSiteContentPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"home" | "clients" | "about" | "nirman" | "contact">("home");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const clientLogoInputRef = useRef<HTMLInputElement>(null);

  // Client partner logos list (No text/names, pure brand logos)
  const [clientPartners, setClientPartners] = useState<ClientPartnerItem[]>([
    { id: "1", src: "/c1.png" },
    { id: "2", src: "/c2.png" },
    { id: "3", src: "/c3.jpg" },
    { id: "4", src: "/c4.jpg" },
    { id: "6", src: "/c6.jpg" },
    { id: "7", src: "/c7.jpg" },
    { id: "8", src: "/c8.jpg" },
    { id: "9", src: "/c9.jpg" },
    { id: "10", src: "/c10.jpg" },
    { id: "11", src: "/c11.jpg" },
    { id: "13", src: "/c13.jpg" },
    { id: "14", src: "/c14.jpg" },
    { id: "15", src: "/c15.jpg" },
  ]);

  // Dynamic Nirman BSB Engineering Consultancy Pillars
  const [nirmanPillars, setNirmanPillars] = useState<NirmanPillarItem[]>(defaultNirmanPillars);

  // Master Site Content State (Full Website Content Engine)
  const [content, setContent] = useState({
    // ==========================================
    // 1. HOME PAGE CONTENT
    // ==========================================
    heroBadge: "NIRMAN BSB • ARCHITECTURAL & ROOFTOP STEEL",
    heroHeadline1: "We Build",
    heroHeadline2: "Stand Strong To Last A Lifetime",
    heroSubtitle: "Nirman BSB is the premier structural engineering, rooftop architecture, steel duplex, and consultancy wing of Bangladesh Steel Builders Ltd. We engineer precision spaces built for lasting beauty and certified structural safety across Bangladesh.",
    heroPrimaryCtaText: "Book a Consultation",
    heroImageUrl: "/hero-bg.jpg",

    aboutEyebrow: "ABOUT NIRMAN BSB",
    aboutHeadline: "Nirman BSB is the specialized architectural, rooftop engineering, and turnkey steel construction wing of Bangladesh Steel Builders Ltd.",
    stat1Number: "17+",
    stat1Label: "Years of Engineering Excellence",
    stat2Number: "500+",
    stat2Label: "Completed Structures across Bangladesh",
    stat3Number: "150,000",
    stat3Label: "sq.ft Modern Fabrication Yard",
    aboutImageUrl: "/luxury-steel-duplex-villa.jpg",

    processBadge: "OUR PROCESS",
    processHeadline: "How We Work",
    processSubtitle: "From first consultation to handover day, the process is clear, certified, and predictable.",
    phase1Title: "Consultation & Structural Audit",
    phase1Desc: "We analyze site soil conditions, structural load requirements, and project budget to map out the ideal engineering path forward.",
    phase2Title: "Design & 3D BIM Modeling",
    phase2Desc: "Our engineering studio converts your brief into a millimeter-accurate 3D BIM model, BNBC-compliant blueprints, and fixed cost estimation.",
    phase3Title: "Fabrication & Guaranteed Handover",
    phase3Desc: "Our automated factory fabricates certified high-tensile steel components, followed by safe on-site crane erection and guaranteed on-time handover.",
    processImageUrl: "/steel-building.jpg",

    bannerBadge: "BUILT WITH INTENT",
    bannerHeadline: "EVERY DETAIL DESIGNED AND BUILT BY ONE DEDICATED TEAM",
    bannerSubtitle: "From the first architectural sketch to the final structural bolt, your building is delivered by the same hands, no handoffs, no surprises.",
    bannerImageUrl: "/Sunset Concrete Construction Skyline.png",

    // Homepage Executive Leadership Spotlight (Matching About Page style)
    homeLeadershipBadge: "LEADERSHIP & VISION",
    homeLeadershipHeadline: "Engineering With Integrity, \nBuilding With Vision",
    homeLeadershipQuote: "Every structural member we fabricate carries our responsibility for life and investment. At Nirman BSB, our focus is delivering certified structural durability, innovative rooftop engineering, and turnkey excellence across Bangladesh.",
    homeLeadershipDesc: "Under the strategic direction of S.M. Anayet, Nirman BSB combines cutting-edge 3D BIM structural modeling with the fabrication power and 15+ years legacy of Bangladesh Steel Builders Ltd.",
    homeLeadershipExpBadge: "17+ Years",
    homeLeadershipName: "S.M. Anayet",
    homeLeadershipTitle: "Founder & Managing Director • Industry Leadership",
    homeLeadershipPhoto: "/sm-anayet-office.jpg",
    homeLeadershipMetric1Val: "17+",
    homeLeadershipMetric1Label: "Years Experience",
    homeLeadershipMetric2Val: "150+",
    homeLeadershipMetric2Label: "Steel Projects",
    homeLeadershipMetric3Val: "100%",
    homeLeadershipMetric3Label: "Code Compliance",

    // ==========================================
    // 2. CLIENT PARTNERSHIPS & TRUST METRICS
    // ==========================================
    clientsBadge: "HONORED CLIENTS & PARTNERS",
    clientsHeadline: "Trusted by Bangladesh's Leading Enterprises",
    clientsSubtitle: "From heavy manufacturing mills and textile giants to mega agro-conglomerates and commercial developers, we deliver verified steel engineering excellence with unwavering trust.",
    clientsMetric1Number: "150+",
    clientsMetric1Label: "Industrial Projects Delivered",
    clientsMetric2Number: "17+",
    clientsMetric2Label: "Years of Industry Trust",
    clientsMetric3Number: "64",
    clientsMetric3Label: "Districts Covered Nationwide",
    clientsMetric4Number: "100%",
    clientsMetric4Label: "Structural Code Compliance",

    // ==========================================
    // 3. ABOUT US PAGE (/about)
    // ==========================================
    aboutPageEyebrow: "ABOUT NIRMAN BSB",
    aboutPageHeadline: "Engineering Tomorrow's Steel Landmarks Today",
    aboutPageSubtitle: "Over 17 years of specialized structural fabrication, pre-engineered buildings, and turnkey luxury residences across Bangladesh.",
    aboutPageStory1: "Founded in 2009 by Engr. S.M. Anayet Hossain, Bangladesh Steel Builders Ltd. (BSB) was born from a vision to revolutionize Bangladesh's construction sector with speed, safety, and modern steel engineering.",
    aboutPageStory2: "Today, with over 150,000 sq.ft of automated fabrication facilities in Savar and hundreds of landmark structures nationwide, Nirman BSB represents the gold standard of architectural steel construction.",
    aboutHeroImageUrl: "/about-banner.jpg",
    founderImageUrl: "/sm-anayet-office.jpg",

    // Dedicated /about Page Leadership Section
    aboutLeadershipTag: "OUR LEADERSHIP",
    aboutLeadershipHeadline: "Pioneering Ingenuity \n& Structural Integrity",
    founderExpBadge: "17+ Years",
    founderName: "S.M. Anayet",
    founderTitle: "Founder & Managing Director",
    founderQuote: "Our reputation for excellence is founded on a devotion to creative designs, certified craftsmanship, and on-time project completion, making us the dependable partner for nationwide industries.",

    // Vision Card
    visionTag: "OUR VISION",
    visionHeadline: "To Pioneer Sustainable & Modern Steel Building Solutions",
    visionStatement: "To be Bangladesh's most trusted and innovative steel architectural engineering conglomerate, setting national benchmarks for structural resilience, sustainability, and technological advancement.",
    visionImageUrl: "/vision.jpg",

    // Mission Card
    missionTag: "OUR MISSION",
    missionHeadline: "Precision Fabrication & Guaranteed On-Time Delivery",
    missionStatement: "To deliver certified, seismically resilient, and aesthetically breathtaking steel structures that empower industrial progress and provide families with secure luxury homes in half the time.",
    missionImageUrl: "/mission.jpg",

    // ==========================================
    // 4. NIRMAN BSB CONSULTANCY (/nirman-bsb)
    // ==========================================
    nirmanBadge: "ENGINEERING ADVISORY ARM",
    nirmanTitle: "Intelligent Steel Consulting Before You Break Ground",
    nirmanSubtitle: "Professional engineering consultancy, BOQ budgeting, pre-construction feasibility audits, and design optimization for high-value projects.",
    nirmanHeroImageUrl: "/Sunset Concrete Construction Skyline.png",

    nirmanIntroBadge: "WHY CONSULT NIRMAN BSB",
    nirmanIntroHeadline: "Why Professional Steel Building Consultancy Protects Your Capital Investment",
    nirmanIntro1: "Every commercial steel structure and industrial warehouse represents a substantial capital investment. Unvetted architectural drawings and unoptimized member sizes often cause cost overruns.",
    nirmanIntro2: "At Nirman BSB, our senior engineering consultants bridge the critical gap between conceptual architectural visions and safe, economical structural execution.",

    // 6 Consultancy Services
    nirmanService1Title: "Steel Building Project Planning & Feasibility",
    nirmanService1Desc: "Comprehensive site evaluation, industrial zoning compliance, soil capacity matching, and pre-construction feasibility audits.",
    nirmanService1Image: "/p6.jpg",

    nirmanService2Title: "Structural Design Review & Optimization",
    nirmanService2Desc: "Advanced 3D computerized structural stress analysis, wind and seismic simulations, saving 15-20% excess steel tonnage.",
    nirmanService2Image: "/pohs-convention-hall-perspective.jpg",

    nirmanService3Title: "Cost Estimation & Budget Planning (BOQ)",
    nirmanService3Desc: "Itemized Bill of Quantities (BOQ), raw steel market indexing, and milestone contingency schedules with zero hidden cost overrun.",
    nirmanService3Image: "/Steel-Building-Projects-6.jpg",

    nirmanService4Title: "Construction Method & Erection Guidance",
    nirmanService4Desc: "Turnkey erection sequencing, heavy mobile crane rigging logistics, high-tensile anchor bolt torquing protocols, and safety governance.",
    nirmanService4Image: "/s4.jpg",

    nirmanService5Title: "Material Selection & Quality Consultancy",
    nirmanService5Desc: "Specification audits of high-yield ASTM A572 Grade 50 steel, hot-dip galvanizing thickness, anti-corrosive primer, and sandwich panels.",
    nirmanService5Image: "/s5.jpg",

    nirmanService6Title: "Project Coordination & Technical Supervision",
    nirmanService6Desc: "Dedicated third-party on-site QA/QC engineering inspections, milestone handover verification, and as-built architectural documentation.",
    nirmanService6Image: "/s6.jpg",

    nirmanCtaBadge: "PRE-CONSTRUCTION FEASIBILITY AUDIT",
    nirmanCtaHeadline: "Schedule a Free Pre-Construction Feasibility Audit",
    nirmanCtaSubtitle: "Bring your architectural drawings or land dimensions. Our senior engineers will calculate exact steel tonnage, foundation requirements, and estimated project timelines.",
    nirmanCtaButtonText: "Schedule Consultation On WhatsApp",
    nirmanCtaPhone: "+880 1711-181860",

    // ==========================================
    // 5. CONTACT US PAGE (/contact)
    // ==========================================
    contactBadge: "GET IN TOUCH WITH ENGINEERS",
    contactTitle: "Let's Build Your Vision in Steel",
    contactSubtitle: "Have a duplex villa, rooftop expansion, or industrial factory shed in mind? Our structural engineering team is ready to assist you.",
    contactEmail: "smebsbltd@gmail.com",
    contactSupportEmail: "info@bangladeshsteelbuilders.com",
    contactPhone: "+880 1711-181860",
    contactWhatsapp: "+880 1711-181860",
    contactDhakaAddress: "House # 9/2, Khan Niketon, Flat # 2/A, Garden Street, Ring Road, Shyamoli, Dhaka-1207.",
    contactFactoryAddress: "Savar Fabrication Facility, Hemayetpur, Savar, Dhaka.",
    contactWorkingHours: "Saturday - Thursday: 9:00 AM - 7:00 PM (Friday Closed)",
    contactMapEmbedUrl: "https://maps.google.com/maps?q=BANGLADESH+STEEL+BUILDERS+LTD.%2C++Shyamoli%2C+Dhaka-1207&z=17&hl=en&t=k&output=embed&iwloc=near",
    contactMapLink: "https://maps.google.com/?q=BANGLADESH+STEEL+BUILDERS+LTD.%2C++Shyamoli%2C+Dhaka-1207",
    contactFormTitle: "Send Us a Message or Request a Quotation",
    contactFormSubtitle: "Fill out the consultation form below and our lead engineer will contact you within 24 hours.",
    contactCtaHeadline: "Ready to Work With Us?",
    contactCtaSubtitle: "We believe every client deserves a space engineered with care, precision, and lasting architectural value. Take the next step and start the conversation with our engineering team.",
    contactCtaButtonText: "Book a Consultation",
    contactCtaLink: "https://wa.me/8801711181860",
  });

  // Load saved content from backend database on mount
  useEffect(() => {
    siteContentApi
      .getAll()
      .then((res) => {
        if (res?.dictionary) {
          const d = res.dictionary;
          setContent((prev) => {
            const updated = { ...prev };

            // 1. Home Section fields
            if (d.home) {
              if (d.home.heroBadge) updated.heroBadge = d.home.heroBadge;
              if (d.home.heroHeadline1) updated.heroHeadline1 = d.home.heroHeadline1;
              if (d.home.heroHeadline2) updated.heroHeadline2 = d.home.heroHeadline2;
              if (d.home.heroSubtitle) updated.heroSubtitle = d.home.heroSubtitle;
              if (d.home.heroPrimaryCtaText) updated.heroPrimaryCtaText = d.home.heroPrimaryCtaText;
              if (d.home.heroImageUrl) updated.heroImageUrl = d.home.heroImageUrl;

              if (d.home.aboutEyebrow) updated.aboutEyebrow = d.home.aboutEyebrow;
              if (d.home.aboutHeadline) updated.aboutHeadline = d.home.aboutHeadline;
              if (d.home.stat1Number) updated.stat1Number = d.home.stat1Number;
              if (d.home.stat1Label) updated.stat1Label = d.home.stat1Label;
              if (d.home.stat2Number) updated.stat2Number = d.home.stat2Number;
              if (d.home.stat2Label) updated.stat2Label = d.home.stat2Label;
              if (d.home.stat3Number) updated.stat3Number = d.home.stat3Number;
              if (d.home.stat3Label) updated.stat3Label = d.home.stat3Label;
              if (d.home.aboutImageUrl) updated.aboutImageUrl = d.home.aboutImageUrl;

              if (d.home.processBadge) updated.processBadge = d.home.processBadge;
              if (d.home.processHeadline) updated.processHeadline = d.home.processHeadline;
              if (d.home.processSubtitle) updated.processSubtitle = d.home.processSubtitle;
              if (d.home.phase1Title) updated.phase1Title = d.home.phase1Title;
              if (d.home.phase1Desc) updated.phase1Desc = d.home.phase1Desc;
              if (d.home.phase2Title) updated.phase2Title = d.home.phase2Title;
              if (d.home.phase2Desc) updated.phase2Desc = d.home.phase2Desc;
              if (d.home.phase3Title) updated.phase3Title = d.home.phase3Title;
              if (d.home.phase3Desc) updated.phase3Desc = d.home.phase3Desc;
              if (d.home.processImageUrl) updated.processImageUrl = d.home.processImageUrl;

              if (d.home.bannerBadge) updated.bannerBadge = d.home.bannerBadge;
              if (d.home.bannerHeadline) updated.bannerHeadline = d.home.bannerHeadline;
              if (d.home.bannerSubtitle) updated.bannerSubtitle = d.home.bannerSubtitle;
              if (d.home.bannerImageUrl) updated.bannerImageUrl = d.home.bannerImageUrl;

              // Homepage Leadership Spotlight
              if (d.home.homeLeadershipBadge) updated.homeLeadershipBadge = d.home.homeLeadershipBadge;
              if (d.home.homeLeadershipHeadline) updated.homeLeadershipHeadline = d.home.homeLeadershipHeadline;
              if (d.home.homeLeadershipQuote) updated.homeLeadershipQuote = d.home.homeLeadershipQuote;
              if (d.home.homeLeadershipDesc) updated.homeLeadershipDesc = d.home.homeLeadershipDesc;
              if (d.home.homeLeadershipExpBadge) updated.homeLeadershipExpBadge = d.home.homeLeadershipExpBadge;
              if (d.home.homeLeadershipName) updated.homeLeadershipName = d.home.homeLeadershipName;
              if (d.home.homeLeadershipTitle) updated.homeLeadershipTitle = d.home.homeLeadershipTitle;
              if (d.home.homeLeadershipPhoto) updated.homeLeadershipPhoto = d.home.homeLeadershipPhoto;
              if (d.home.homeLeadershipMetric1Val) updated.homeLeadershipMetric1Val = d.home.homeLeadershipMetric1Val;
              if (d.home.homeLeadershipMetric1Label) updated.homeLeadershipMetric1Label = d.home.homeLeadershipMetric1Label;
              if (d.home.homeLeadershipMetric2Val) updated.homeLeadershipMetric2Val = d.home.homeLeadershipMetric2Val;
              if (d.home.homeLeadershipMetric2Label) updated.homeLeadershipMetric2Label = d.home.homeLeadershipMetric2Label;
              if (d.home.homeLeadershipMetric3Val) updated.homeLeadershipMetric3Val = d.home.homeLeadershipMetric3Val;
              if (d.home.homeLeadershipMetric3Label) updated.homeLeadershipMetric3Label = d.home.homeLeadershipMetric3Label;
            }

            // 2. Clients Section fields
            if (d.clients) {
              if (d.clients.clientsBadge) updated.clientsBadge = d.clients.clientsBadge;
              if (d.clients.clientsHeadline) updated.clientsHeadline = d.clients.clientsHeadline;
              if (d.clients.clientsSubtitle) updated.clientsSubtitle = d.clients.clientsSubtitle;
              if (d.clients.clientsMetric1Number) updated.clientsMetric1Number = d.clients.clientsMetric1Number;
              if (d.clients.clientsMetric1Label) updated.clientsMetric1Label = d.clients.clientsMetric1Label;
              if (d.clients.clientsMetric2Number) updated.clientsMetric2Number = d.clients.clientsMetric2Number;
              if (d.clients.clientsMetric2Label) updated.clientsMetric2Label = d.clients.clientsMetric2Label;
              if (d.clients.clientsMetric3Number) updated.clientsMetric3Number = d.clients.clientsMetric3Number;
              if (d.clients.clientsMetric3Label) updated.clientsMetric3Label = d.clients.clientsMetric3Label;
              if (d.clients.clientsMetric4Number) updated.clientsMetric4Number = d.clients.clientsMetric4Number;
              if (d.clients.clientsMetric4Label) updated.clientsMetric4Label = d.clients.clientsMetric4Label;
            }

            // 3. About Us page fields
            if (d.about) {
              if (d.about.aboutPageEyebrow) updated.aboutPageEyebrow = d.about.aboutPageEyebrow;
              if (d.about.aboutPageHeadline) updated.aboutPageHeadline = d.about.aboutPageHeadline;
              if (d.about.aboutPageSubtitle) updated.aboutPageSubtitle = d.about.aboutPageSubtitle;
              if (d.about.aboutPageStory1) updated.aboutPageStory1 = d.about.aboutPageStory1;
              if (d.about.aboutPageStory2) updated.aboutPageStory2 = d.about.aboutPageStory2;
              if (d.about.aboutHeroImageUrl) updated.aboutHeroImageUrl = d.about.aboutHeroImageUrl;
              if (d.about.founderImageUrl) updated.founderImageUrl = d.about.founderImageUrl;
              if (d.about.aboutLeadershipTag) updated.aboutLeadershipTag = d.about.aboutLeadershipTag;
              if (d.about.aboutLeadershipHeadline) updated.aboutLeadershipHeadline = d.about.aboutLeadershipHeadline;
              if (d.about.founderExpBadge) updated.founderExpBadge = d.about.founderExpBadge;
              if (d.about.founderName) updated.founderName = d.about.founderName;
              if (d.about.founderTitle) updated.founderTitle = d.about.founderTitle;
              if (d.about.founderQuote) updated.founderQuote = d.about.founderQuote;
              if (d.about.visionTag) updated.visionTag = d.about.visionTag;
              if (d.about.visionHeadline) updated.visionHeadline = d.about.visionHeadline;
              if (d.about.visionStatement) updated.visionStatement = d.about.visionStatement;
              if (d.about.visionImageUrl) updated.visionImageUrl = d.about.visionImageUrl;
              if (d.about.missionTag) updated.missionTag = d.about.missionTag;
              if (d.about.missionHeadline) updated.missionHeadline = d.about.missionHeadline;
              if (d.about.missionStatement) updated.missionStatement = d.about.missionStatement;
              if (d.about.missionImageUrl) updated.missionImageUrl = d.about.missionImageUrl;
            }

            // 4. Nirman BSB consultancy fields
            if (d.nirman) {
              if (d.nirman.nirmanBadge) updated.nirmanBadge = d.nirman.nirmanBadge;
              if (d.nirman.nirmanTitle) updated.nirmanTitle = d.nirman.nirmanTitle;
              if (d.nirman.nirmanSubtitle) updated.nirmanSubtitle = d.nirman.nirmanSubtitle;
              if (d.nirman.nirmanHeroImageUrl) updated.nirmanHeroImageUrl = d.nirman.nirmanHeroImageUrl;
              if (d.nirman.nirmanIntroBadge) updated.nirmanIntroBadge = d.nirman.nirmanIntroBadge;
              if (d.nirman.nirmanIntroHeadline) updated.nirmanIntroHeadline = d.nirman.nirmanIntroHeadline;
              if (d.nirman.nirmanIntro1) updated.nirmanIntro1 = d.nirman.nirmanIntro1;
              if (d.nirman.nirmanIntro2) updated.nirmanIntro2 = d.nirman.nirmanIntro2;

              for (let i = 1; i <= 6; i++) {
                const t = `nirmanService${i}Title` as keyof typeof updated;
                const desc = `nirmanService${i}Desc` as keyof typeof updated;
                const img = `nirmanService${i}Image` as keyof typeof updated;
                if (d.nirman[t]) (updated as any)[t] = d.nirman[t];
                if (d.nirman[desc]) (updated as any)[desc] = d.nirman[desc];
                if (d.nirman[img]) (updated as any)[img] = d.nirman[img];
              }

              if (d.nirman.nirmanCtaBadge) updated.nirmanCtaBadge = d.nirman.nirmanCtaBadge;
              if (d.nirman.nirmanCtaHeadline) updated.nirmanCtaHeadline = d.nirman.nirmanCtaHeadline;
              if (d.nirman.nirmanCtaSubtitle) updated.nirmanCtaSubtitle = d.nirman.nirmanCtaSubtitle;
              if (d.nirman.nirmanCtaButtonText) updated.nirmanCtaButtonText = d.nirman.nirmanCtaButtonText;
            }

            // 5. Contact fields
            if (d.contact) {
              if (d.contact.contactBadge) updated.contactBadge = d.contact.contactBadge;
              if (d.contact.contactTitle) updated.contactTitle = d.contact.contactTitle;
              if (d.contact.contactSubtitle) updated.contactSubtitle = d.contact.contactSubtitle;
              if (d.contact.contactEmail) updated.contactEmail = d.contact.contactEmail;
              if (d.contact.contactSupportEmail) updated.contactSupportEmail = d.contact.contactSupportEmail;
              if (d.contact.contactPhone) updated.contactPhone = d.contact.contactPhone;
              if (d.contact.contactWhatsapp) updated.contactWhatsapp = d.contact.contactWhatsapp;
              if (d.contact.contactDhakaAddress) updated.contactDhakaAddress = d.contact.contactDhakaAddress;
              if (d.contact.contactFactoryAddress) updated.contactFactoryAddress = d.contact.contactFactoryAddress;
              if (d.contact.contactWorkingHours) updated.contactWorkingHours = d.contact.contactWorkingHours;
              if (d.contact.contactMapEmbedUrl) updated.contactMapEmbedUrl = d.contact.contactMapEmbedUrl;
              if (d.contact.contactMapLink) updated.contactMapLink = d.contact.contactMapLink;
              if (d.contact.contactFormTitle) updated.contactFormTitle = d.contact.contactFormTitle;
              if (d.contact.contactFormSubtitle) updated.contactFormSubtitle = d.contact.contactFormSubtitle;
              if (d.contact.contactCtaHeadline) updated.contactCtaHeadline = d.contact.contactCtaHeadline;
              if (d.contact.contactCtaSubtitle) updated.contactCtaSubtitle = d.contact.contactCtaSubtitle;
              if (d.contact.contactCtaButtonText) updated.contactCtaButtonText = d.contact.contactCtaButtonText;
              if (d.contact.contactCtaLink) updated.contactCtaLink = d.contact.contactCtaLink;
            }

            return updated;
          });

          if (d.clients?.clientPartners && Array.isArray(d.clients.clientPartners) && d.clients.clientPartners.length > 0) {
            setClientPartners(
              d.clients.clientPartners.map((item: any, idx: number) => ({
                id: item.id || idx.toString(),
                name: item.name || `Client Partner ${idx + 1}`,
                src: item.src || item,
              }))
            );
          }

          if (d.nirman?.nirmanPillars && Array.isArray(d.nirman.nirmanPillars) && d.nirman.nirmanPillars.length > 0) {
            setNirmanPillars(d.nirman.nirmanPillars);
          } else if (d.nirman?.nirmanService1Title) {
            const list: NirmanPillarItem[] = [];
            for (let i = 1; i <= 6; i++) {
              if (d.nirman[`nirmanService${i}Title`]) {
                const def = defaultNirmanPillars[i - 1];
                list.push({
                  id: i.toString(),
                  tag: def?.tag || `0${i}. CONSULTANCY SERVICE`,
                  title: d.nirman[`nirmanService${i}Title`] || def?.title || "",
                  desc: d.nirman[`nirmanService${i}Desc`] || def?.desc || "",
                  image: d.nirman[`nirmanService${i}Image`] || def?.image || "/p6.jpg",
                  focusList: def?.focusList || [],
                });
              }
            }
            if (list.length > 0) {
              setNirmanPillars(list);
            }
          }
        }
      })
      .catch((err) => console.warn("Could not load backend content:", err));
  }, []);

  // Dynamic Nirman BSB Pillars Handlers
  const handleAddNirmanPillar = () => {
    const newId = Date.now().toString();
    const num = nirmanPillars.length + 1;
    const numStr = num < 10 ? `0${num}` : `${num}`;
    setNirmanPillars((prev) => [
      ...prev,
      {
        id: newId,
        tag: `${numStr}. NEW CONSULTANCY SERVICE`,
        title: "New Engineering Consultancy Pillar",
        desc: "Comprehensive engineering oversight, calculations, and execution methodology for this domain.",
        image: "/p6.jpg",
        focusList: [
          "Pre-construction technical analysis",
          "Quality assurance & compliance audit",
          "Expert advisory & site supervision",
        ],
      },
    ]);
    toast.success(`New pillar #${num} added!`);
  };

  const handleRemoveNirmanPillar = (id: string) => {
    setNirmanPillars((prev) => prev.filter((p) => p.id !== id));
    toast.info("Pillar removed.");
  };

  const handleUpdateNirmanPillar = (
    id: string,
    field: keyof NirmanPillarItem,
    value: any
  ) => {
    setNirmanPillars((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handlePillarImageUpload = async (id: string, file: File) => {
    try {
      const res = await uploadApi.uploadImage(file);
      handleUpdateNirmanPillar(id, "image", res.url);
      toast.success("Pillar image uploaded successfully!");
    } catch {
      const preview = URL.createObjectURL(file);
      handleUpdateNirmanPillar(id, "image", preview);
      toast.warning("Preview loaded from device.");
    }
  };

  // Generic File Upload Handler for Any State Image Field
  const handleImageUpload = async (field: keyof typeof content, file: File) => {
    try {
      const uploadRes = await uploadApi.uploadImage(file);
      setContent((prev) => ({ ...prev, [field]: uploadRes.url }));
      toast.success("Image uploaded successfully and linked to section!");
    } catch {
      const preview = URL.createObjectURL(file);
      setContent((prev) => ({ ...prev, [field]: preview }));
      toast.warning("Preview loaded from device.");
    }
  };

  // Add / Remove / Update Client Brand Logos (No Text Inputs)
  const handleAddClientLogoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name ? file.name.replace(/\.[^/.]+$/, "") : "Client Partner Logo";
      try {
        const uploadRes = await uploadApi.uploadImage(file);
        const newId = Date.now().toString();
        setClientPartners((prev) => [...prev, { id: newId, name: fileName, src: uploadRes.url }]);
        toast.success("Brand logo added successfully!");
      } catch {
        const preview = URL.createObjectURL(file);
        const newId = Date.now().toString();
        setClientPartners((prev) => [...prev, { id: newId, name: fileName, src: preview }]);
        toast.warning("Preview loaded from device.");
      }
    }
    // reset input
    if (clientLogoInputRef.current) {
      clientLogoInputRef.current.value = "";
    }
  };

  const handleUpdateClientLogoFile = async (id: string, file: File) => {
    const fileName = file.name ? file.name.replace(/\.[^/.]+$/, "") : "Client Partner Logo";
    try {
      const uploadRes = await uploadApi.uploadImage(file);
      setClientPartners((prev) =>
        prev.map((item) => (item.id === id ? { ...item, name: fileName, src: uploadRes.url } : item))
      );
      toast.success("Brand logo updated successfully!");
    } catch {
      const preview = URL.createObjectURL(file);
      setClientPartners((prev) =>
        prev.map((item) => (item.id === id ? { ...item, name: fileName, src: preview } : item))
      );
      toast.warning("Preview loaded from device.");
    }
  };

  const handleRemoveClientPartner = (id: string) => {
    setClientPartners((prev) => prev.filter((item) => item.id !== id));
    toast.info("Brand logo removed.");
  };

  // Save All Content to PostgreSQL Database (Saves all sections distinctly so nothing is overwritten)
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);

    try {
      const homeData = {
        heroBadge: content.heroBadge,
        heroHeadline1: content.heroHeadline1,
        heroHeadline2: content.heroHeadline2,
        heroSubtitle: content.heroSubtitle,
        heroPrimaryCtaText: content.heroPrimaryCtaText,
        heroImageUrl: content.heroImageUrl,
        aboutEyebrow: content.aboutEyebrow,
        aboutHeadline: content.aboutHeadline,
        stat1Number: content.stat1Number,
        stat1Label: content.stat1Label,
        stat2Number: content.stat2Number,
        stat2Label: content.stat2Label,
        stat3Number: content.stat3Number,
        stat3Label: content.stat3Label,
        aboutImageUrl: content.aboutImageUrl,
        processBadge: content.processBadge,
        processHeadline: content.processHeadline,
        processSubtitle: content.processSubtitle,
        phase1Title: content.phase1Title,
        phase1Desc: content.phase1Desc,
        phase2Title: content.phase2Title,
        phase2Desc: content.phase2Desc,
        phase3Title: content.phase3Title,
        phase3Desc: content.phase3Desc,
        processImageUrl: content.processImageUrl,
        bannerBadge: content.bannerBadge,
        bannerHeadline: content.bannerHeadline,
        bannerSubtitle: content.bannerSubtitle,
        bannerImageUrl: content.bannerImageUrl,
        // Homepage Leadership Spotlight
        homeLeadershipBadge: content.homeLeadershipBadge,
        homeLeadershipHeadline: content.homeLeadershipHeadline,
        homeLeadershipQuote: content.homeLeadershipQuote,
        homeLeadershipDesc: content.homeLeadershipDesc,
        homeLeadershipExpBadge: content.homeLeadershipExpBadge,
        homeLeadershipName: content.homeLeadershipName,
        homeLeadershipTitle: content.homeLeadershipTitle,
        homeLeadershipPhoto: content.homeLeadershipPhoto,
        homeLeadershipMetric1Val: content.homeLeadershipMetric1Val,
        homeLeadershipMetric1Label: content.homeLeadershipMetric1Label,
        homeLeadershipMetric2Val: content.homeLeadershipMetric2Val,
        homeLeadershipMetric2Label: content.homeLeadershipMetric2Label,
        homeLeadershipMetric3Val: content.homeLeadershipMetric3Val,
        homeLeadershipMetric3Label: content.homeLeadershipMetric3Label,
      };

      const clientsData = {
        clientsBadge: content.clientsBadge,
        clientsHeadline: content.clientsHeadline,
        clientsSubtitle: content.clientsSubtitle,
        clientsMetric1Number: content.clientsMetric1Number,
        clientsMetric1Label: content.clientsMetric1Label,
        clientsMetric2Number: content.clientsMetric2Number,
        clientsMetric2Label: content.clientsMetric2Label,
        clientsMetric3Number: content.clientsMetric3Number,
        clientsMetric3Label: content.clientsMetric3Label,
        clientsMetric4Number: content.clientsMetric4Number,
        clientsMetric4Label: content.clientsMetric4Label,
        clientPartners: clientPartners,
      };

      const aboutData = {
        aboutPageEyebrow: content.aboutPageEyebrow,
        aboutPageHeadline: content.aboutPageHeadline,
        aboutPageSubtitle: content.aboutPageSubtitle,
        aboutPageStory1: content.aboutPageStory1,
        aboutPageStory2: content.aboutPageStory2,
        aboutHeroImageUrl: content.aboutHeroImageUrl,
        founderImageUrl: content.founderImageUrl,
        aboutLeadershipTag: content.aboutLeadershipTag,
        aboutLeadershipHeadline: content.aboutLeadershipHeadline,
        founderExpBadge: content.founderExpBadge,
        founderName: content.founderName,
        founderTitle: content.founderTitle,
        founderQuote: content.founderQuote,
        visionTag: content.visionTag,
        visionHeadline: content.visionHeadline,
        visionStatement: content.visionStatement,
        visionImageUrl: content.visionImageUrl,
        missionTag: content.missionTag,
        missionHeadline: content.missionHeadline,
        missionStatement: content.missionStatement,
        missionImageUrl: content.missionImageUrl,
      };

      const nirmanData: Record<string, any> = {
        nirmanBadge: content.nirmanBadge,
        nirmanTitle: content.nirmanTitle,
        nirmanSubtitle: content.nirmanSubtitle,
        nirmanHeroImageUrl: content.nirmanHeroImageUrl,
        nirmanIntroBadge: content.nirmanIntroBadge,
        nirmanIntroHeadline: content.nirmanIntroHeadline,
        nirmanIntro1: content.nirmanIntro1,
        nirmanIntro2: content.nirmanIntro2,
        nirmanPillars: nirmanPillars,
        nirmanService1Title: content.nirmanService1Title,
        nirmanService1Desc: content.nirmanService1Desc,
        nirmanService1Image: content.nirmanService1Image,
        nirmanService2Title: content.nirmanService2Title,
        nirmanService2Desc: content.nirmanService2Desc,
        nirmanService2Image: content.nirmanService2Image,
        nirmanService3Title: content.nirmanService3Title,
        nirmanService3Desc: content.nirmanService3Desc,
        nirmanService3Image: content.nirmanService3Image,
        nirmanService4Title: content.nirmanService4Title,
        nirmanService4Desc: content.nirmanService4Desc,
        nirmanService4Image: content.nirmanService4Image,
        nirmanService5Title: content.nirmanService5Title,
        nirmanService5Desc: content.nirmanService5Desc,
        nirmanService5Image: content.nirmanService5Image,
        nirmanService6Title: content.nirmanService6Title,
        nirmanService6Desc: content.nirmanService6Desc,
        nirmanService6Image: content.nirmanService6Image,
        nirmanCtaBadge: content.nirmanCtaBadge,
        nirmanCtaHeadline: content.nirmanCtaHeadline,
        nirmanCtaSubtitle: content.nirmanCtaSubtitle,
        nirmanCtaButtonText: content.nirmanCtaButtonText,
        nirmanCtaPhone: content.nirmanCtaPhone,
      };

      // Keep first 6 synced to legacy fields for backward compatibility
      nirmanPillars.slice(0, 6).forEach((pillar, idx) => {
        const i = idx + 1;
        nirmanData[`nirmanService${i}Title`] = pillar.title;
        nirmanData[`nirmanService${i}Desc`] = pillar.desc;
        nirmanData[`nirmanService${i}Image`] = pillar.image;
      });

      const contactData = {
        contactBadge: content.contactBadge,
        contactTitle: content.contactTitle,
        contactSubtitle: content.contactSubtitle,
        contactEmail: content.contactEmail,
        contactSupportEmail: content.contactSupportEmail,
        contactPhone: content.contactPhone,
        contactWhatsapp: content.contactWhatsapp,
        contactDhakaAddress: content.contactDhakaAddress,
        contactFactoryAddress: content.contactFactoryAddress,
        contactWorkingHours: content.contactWorkingHours,
        contactMapEmbedUrl: content.contactMapEmbedUrl,
        contactMapLink: content.contactMapLink,
        contactFormTitle: content.contactFormTitle,
        contactFormSubtitle: content.contactFormSubtitle,
        contactCtaHeadline: content.contactCtaHeadline,
        contactCtaSubtitle: content.contactCtaSubtitle,
        contactCtaButtonText: content.contactCtaButtonText,
        contactCtaLink: content.contactCtaLink,
      };

      await Promise.all([
        siteContentApi.updateSection("home", homeData),
        siteContentApi.updateSection("clients", clientsData),
        siteContentApi.updateSection("about", aboutData),
        siteContentApi.updateSection("nirman", nirmanData),
        siteContentApi.updateSection("contact", contactData),
      ]);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("siteContentUpdated"));
      }

      setSavedSuccess(true);
      toast.success("Website content saved to database and live across all pages!");
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err: any) {
      console.warn("Save error:", err);
      toast.error(err.message || "An error occurred while saving content to database.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-3 sm:space-y-3.5">
      {/* Page Header (No dead space, prominent font) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
            <span>Website Content (CMS Engine)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Edit text, headlines, client partnerships, and banner photos for Home, About, Nirman BSB, and Contact pages.
          </p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-black text-xs sm:text-sm transition-all shadow-sm shrink-0 cursor-pointer active:scale-98"
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>{saving ? "Saving Changes..." : "Save All Content"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Website content successfully updated and live across all public pages!</span>
        </div>
      )}

      {/* Navigation Tabs for All 5 Major Content Sections */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/60 rounded-xl border border-slate-200/80 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "home"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <Home className="w-4 h-4 text-[#E5A53D]" />
          <span>Home Page</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("clients")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "clients"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <Users className="w-4 h-4 text-[#E5A53D]" />
          <span>Client Partnerships &amp; Logos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "about"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <Building2 className="w-4 h-4 text-[#E5A53D]" />
          <span>About Us Page (/about)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("nirman")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "nirman"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <Compass className="w-4 h-4 text-[#E5A53D]" />
          <span>Nirman BSB (/nirman-bsb)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "contact"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <PhoneCall className="w-4 h-4 text-[#E5A53D]" />
          <span>Contact Us Page (/contact)</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-3 sm:space-y-3.5">
        
        {/* ========================================================================= */}
        {/* TAB 1: HOME PAGE CONTENT (HERO, ABOUT SUMMARY, PROCESS, BANNER)            */}
        {/* ========================================================================= */}
        {activeTab === "home" && (
          <div className="space-y-3">
            {/* 1. HERO BANNER */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5A53D]" />
                  <span>Homepage Top Hero Banner</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Main Entrance Screen</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-3">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Hero Gold Tag Badge</label>
                  <input
                    type="text"
                    value={content.heroBadge}
                    onChange={(e) => setContent({ ...content, heroBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Headline Line 1</label>
                  <input
                    type="text"
                    value={content.heroHeadline1}
                    onChange={(e) => setContent({ ...content, heroHeadline1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Headline Line 2</label>
                  <input
                    type="text"
                    value={content.heroHeadline2}
                    onChange={(e) => setContent({ ...content, heroHeadline2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={content.heroPrimaryCtaText}
                    onChange={(e) => setContent({ ...content, heroPrimaryCtaText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={content.heroSubtitle}
                    onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-3 pt-1">
                  <ImageUploadField
                    label="Hero Cinematic Background Image"
                    value={content.heroImageUrl}
                    onChange={(val) => setContent({ ...content, heroImageUrl: val })}
                    onUpload={(file) => handleImageUpload("heroImageUrl", file)}
                    hint="Full-width desktop & mobile banner"
                  />
                </div>
              </div>
            </div>

            {/* 2. ABOUT SUMMARY & FOUNDER STATS */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#E5A53D]" />
                  <span>Homepage About Summary &amp; Key Metrics</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">About Eyebrow Tag</label>
                  <input
                    type="text"
                    value={content.aboutEyebrow}
                    onChange={(e) => setContent({ ...content, aboutEyebrow: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">About Main Headline</label>
                  <input
                    type="text"
                    value={content.aboutHeadline}
                    onChange={(e) => setContent({ ...content, aboutHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-bold text-slate-700 block">Metric 1 (Years)</label>
                  <input
                    type="text"
                    value={content.stat1Number}
                    onChange={(e) => setContent({ ...content, stat1Number: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-black text-slate-950 mt-1"
                  />
                  <input
                    type="text"
                    value={content.stat1Label}
                    onChange={(e) => setContent({ ...content, stat1Label: e.target.value })}
                    className="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 mt-1"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-bold text-slate-700 block">Metric 2 (Projects)</label>
                  <input
                    type="text"
                    value={content.stat2Number}
                    onChange={(e) => setContent({ ...content, stat2Number: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-black text-slate-950 mt-1"
                  />
                  <input
                    type="text"
                    value={content.stat2Label}
                    onChange={(e) => setContent({ ...content, stat2Label: e.target.value })}
                    className="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 mt-1"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-bold text-slate-700 block">Metric 3 (Yard Space)</label>
                  <input
                    type="text"
                    value={content.stat3Number}
                    onChange={(e) => setContent({ ...content, stat3Number: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-black text-slate-950 mt-1"
                  />
                  <input
                    type="text"
                    value={content.stat3Label}
                    onChange={(e) => setContent({ ...content, stat3Label: e.target.value })}
                    className="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 mt-1"
                  />
                </div>
              </div>

              <div className="pt-1">
                <ImageUploadField
                  label="About Section Showcase Photo"
                  value={content.aboutImageUrl}
                  onChange={(val) => setContent({ ...content, aboutImageUrl: val })}
                  onUpload={(file) => handleImageUpload("aboutImageUrl", file)}
                  aspect="video"
                  hint="Engineering facility or executive photo"
                />
              </div>
            </div>

            {/* 3. PROCESS SECTION */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#E5A53D]" />
                  <span>How We Work (3 Execution Phases)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-[#E5A53D] block">Phase 01</span>
                  <input
                    type="text"
                    value={content.phase1Title}
                    onChange={(e) => setContent({ ...content, phase1Title: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-bold"
                  />
                  <textarea
                    rows={2}
                    value={content.phase1Desc}
                    onChange={(e) => setContent({ ...content, phase1Desc: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-[#E5A53D] block">Phase 02</span>
                  <input
                    type="text"
                    value={content.phase2Title}
                    onChange={(e) => setContent({ ...content, phase2Title: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-bold"
                  />
                  <textarea
                    rows={2}
                    value={content.phase2Desc}
                    onChange={(e) => setContent({ ...content, phase2Desc: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-[#E5A53D] block">Phase 03</span>
                  <input
                    type="text"
                    value={content.phase3Title}
                    onChange={(e) => setContent({ ...content, phase3Title: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-bold"
                  />
                  <textarea
                    rows={2}
                    value={content.phase3Desc}
                    onChange={(e) => setContent({ ...content, phase3Desc: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600"
                  />
                </div>
              </div>

              <div className="pt-1">
                <ImageUploadField
                  label="Process Construction & Erection Photo"
                  value={content.processImageUrl}
                  onChange={(val) => setContent({ ...content, processImageUrl: val })}
                  onUpload={(file) => handleImageUpload("processImageUrl", file)}
                  aspect="video"
                />
              </div>
            </div>

            {/* 4. BUILT WITH INTENT BANNER */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E5A53D]" />
                  <span>Full-Width Intent Banner (Built With Intent)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Banner Badge</label>
                  <input
                    type="text"
                    value={content.bannerBadge}
                    onChange={(e) => setContent({ ...content, bannerBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Banner Headline</label>
                  <input
                    type="text"
                    value={content.bannerHeadline}
                    onChange={(e) => setContent({ ...content, bannerHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Banner Subtitle</label>
                  <textarea
                    rows={2}
                    value={content.bannerSubtitle}
                    onChange={(e) => setContent({ ...content, bannerSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="pt-1">
                <ImageUploadField
                  label="Full-Width Intent Banner Photo"
                  value={content.bannerImageUrl}
                  onChange={(val) => setContent({ ...content, bannerImageUrl: val })}
                  onUpload={(file) => handleImageUpload("bannerImageUrl", file)}
                  aspect="video"
                />
              </div>
            </div>

            {/* 5. EXECUTIVE LEADERSHIP & VISION SPOTLIGHT (Homepage) */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E5A53D]" />
                  <span>Executive Leadership &amp; Vision Spotlight (Homepage)</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Displayed above client partners</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Leadership Tag / Badge</label>
                  <input
                    type="text"
                    value={content.homeLeadershipBadge}
                    onChange={(e) => setContent({ ...content, homeLeadershipBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Experience Badge (Over Photo)</label>
                  <input
                    type="text"
                    value={content.homeLeadershipExpBadge}
                    onChange={(e) => setContent({ ...content, homeLeadershipExpBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Section Headline</label>
                  <input
                    type="text"
                    value={content.homeLeadershipHeadline}
                    onChange={(e) => setContent({ ...content, homeLeadershipHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Executive Quote (Italicized)</label>
                  <textarea
                    rows={2}
                    value={content.homeLeadershipQuote}
                    onChange={(e) => setContent({ ...content, homeLeadershipQuote: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Strategic Vision Story / Paragraph</label>
                  <textarea
                    rows={2}
                    value={content.homeLeadershipDesc}
                    onChange={(e) => setContent({ ...content, homeLeadershipDesc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Executive Full Name</label>
                  <input
                    type="text"
                    value={content.homeLeadershipName}
                    onChange={(e) => setContent({ ...content, homeLeadershipName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Designation &amp; Role Subtitle</label>
                  <input
                    type="text"
                    value={content.homeLeadershipTitle}
                    onChange={(e) => setContent({ ...content, homeLeadershipTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Executive Desk Photo (100% Uncropped Full Photo)"
                    value={content.homeLeadershipPhoto}
                    onChange={(val) => setContent({ ...content, homeLeadershipPhoto: val })}
                    onUpload={(file) => handleImageUpload("homeLeadershipPhoto", file)}
                    aspect="video"
                  />
                </div>
              </div>

              {/* 3 Key Metrics */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  3 Bottom Track Record Metrics
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Metric 1 (Years)</label>
                    <input
                      type="text"
                      value={content.homeLeadershipMetric1Val}
                      onChange={(e) => setContent({ ...content, homeLeadershipMetric1Val: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-black text-slate-950 mt-1"
                    />
                    <input
                      type="text"
                      value={content.homeLeadershipMetric1Label}
                      onChange={(e) => setContent({ ...content, homeLeadershipMetric1Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 mt-1"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Metric 2 (Projects)</label>
                    <input
                      type="text"
                      value={content.homeLeadershipMetric2Val}
                      onChange={(e) => setContent({ ...content, homeLeadershipMetric2Val: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-black text-slate-950 mt-1"
                    />
                    <input
                      type="text"
                      value={content.homeLeadershipMetric2Label}
                      onChange={(e) => setContent({ ...content, homeLeadershipMetric2Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 mt-1"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Metric 3 (Compliance)</label>
                    <input
                      type="text"
                      value={content.homeLeadershipMetric3Val}
                      onChange={(e) => setContent({ ...content, homeLeadershipMetric3Val: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-black text-slate-950 mt-1"
                    />
                    <input
                      type="text"
                      value={content.homeLeadershipMetric3Label}
                      onChange={(e) => setContent({ ...content, homeLeadershipMetric3Label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CLIENT PARTNERSHIPS & LOGOS (PURE LOGOS - NO HARSH BORDERS)       */}
        {/* ========================================================================= */}
        {activeTab === "clients" && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#E5A53D]" />
                  <span>Honored Clients, Partners &amp; Trust Metrics</span>
                </span>
                <p className="text-xs text-slate-500 font-medium">
                  Directly controls the Clients &amp; Partners section on Homepage and About page.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => clientLogoInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-black text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer active:scale-98"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Brand Logo</span>
                </button>
                <input
                  ref={clientLogoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAddClientLogoFile}
                />
              </div>
            </div>

            {/* Section Header Text - Clean Light Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Section Badge</label>
                <input
                  type="text"
                  value={content.clientsBadge}
                  onChange={(e) => setContent({ ...content, clientsBadge: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Section Headline</label>
                <input
                  type="text"
                  value={content.clientsHeadline}
                  onChange={(e) => setContent({ ...content, clientsHeadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Section Paragraph</label>
                <textarea
                  rows={2}
                  value={content.clientsSubtitle}
                  onChange={(e) => setContent({ ...content, clientsSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>
            </div>

            {/* 4 Trust Metrics Strip */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                4 Proven Trust Metrics (Strip)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="text"
                    value={content.clientsMetric1Number}
                    onChange={(e) => setContent({ ...content, clientsMetric1Number: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-black"
                  />
                  <input
                    type="text"
                    value={content.clientsMetric1Label}
                    onChange={(e) => setContent({ ...content, clientsMetric1Label: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-slate-600 mt-1"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="text"
                    value={content.clientsMetric2Number}
                    onChange={(e) => setContent({ ...content, clientsMetric2Number: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-black"
                  />
                  <input
                    type="text"
                    value={content.clientsMetric2Label}
                    onChange={(e) => setContent({ ...content, clientsMetric2Label: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-slate-600 mt-1"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="text"
                    value={content.clientsMetric3Number}
                    onChange={(e) => setContent({ ...content, clientsMetric3Number: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-black"
                  />
                  <input
                    type="text"
                    value={content.clientsMetric3Label}
                    onChange={(e) => setContent({ ...content, clientsMetric3Label: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-slate-600 mt-1"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="text"
                    value={content.clientsMetric4Number}
                    onChange={(e) => setContent({ ...content, clientsMetric4Number: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-black"
                  />
                  <input
                    type="text"
                    value={content.clientsMetric4Label}
                    onChange={(e) => setContent({ ...content, clientsMetric4Label: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-slate-600 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Client Brand Logos - Pure Logos, No Names, Soft Borders */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Client Brand Logos ({clientPartners.length})
                </span>
                <span className="text-xs text-slate-500 font-medium">Click Change to replace or upload new</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {clientPartners.map((client) => (
                  <div
                    key={client.id}
                    className="group relative p-2 rounded-xl bg-white border border-slate-200 hover:border-[#E5A53D] shadow-2xs hover:shadow-xs transition-all flex flex-col items-center justify-between gap-2"
                  >
                    <div className="relative w-full h-16 rounded-lg bg-slate-50 flex items-center justify-center p-2 overflow-hidden">
                      <Image
                        src={client.src}
                        alt="Client Brand Logo"
                        fill
                        unoptimized
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="w-full flex items-center justify-between pt-1 border-t border-slate-100">
                      <label className="text-[10px] font-bold text-slate-700 hover:text-slate-950 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpdateClientLogoFile(client.id, file);
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => handleRemoveClientPartner(client.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                        title="Delete Logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ABOUT US PAGE (/about) - INCL. VISION & MISSION CARDS              */}
        {/* ========================================================================= */}
        {activeTab === "about" && (
          <div className="space-y-3">
            {/* 1. About Header & Story */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#E5A53D]" />
                  <span>About Us Page Dedicated Content (/about)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">About Page Header Eyebrow</label>
                  <input
                    type="text"
                    value={content.aboutPageEyebrow}
                    onChange={(e) => setContent({ ...content, aboutPageEyebrow: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">About Page Main Headline</label>
                  <input
                    type="text"
                    value={content.aboutPageHeadline}
                    onChange={(e) => setContent({ ...content, aboutPageHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">About Page Header Subtitle</label>
                  <textarea
                    rows={2}
                    value={content.aboutPageSubtitle}
                    onChange={(e) => setContent({ ...content, aboutPageSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Who We Are Story (Paragraph 1)</label>
                  <textarea
                    rows={2}
                    value={content.aboutPageStory1}
                    onChange={(e) => setContent({ ...content, aboutPageStory1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Engineering Heritage (Paragraph 2)</label>
                  <textarea
                    rows={2}
                    value={content.aboutPageStory2}
                    onChange={(e) => setContent({ ...content, aboutPageStory2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2 pt-1">
                  <ImageUploadField
                    label="About Page Top Hero Banner Image"
                    value={content.aboutHeroImageUrl}
                    onChange={(val) => setContent({ ...content, aboutHeroImageUrl: val })}
                    onUpload={(file) => handleImageUpload("aboutHeroImageUrl", file)}
                    aspect="video"
                  />
                </div>
              </div>
            </div>

            {/* 2. OUR VISION & OUR MISSION DUAL CARDS */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E5A53D]" />
                  <span>Our Vision &amp; Our Mission Cards</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Displayed on /about page</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                {/* Vision Card Editor */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">
                      Our Vision
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-0.5">Vision Tag Label</label>
                    <input
                      type="text"
                      value={content.visionTag}
                      onChange={(e) => setContent({ ...content, visionTag: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-0.5">Vision Headline</label>
                    <input
                      type="text"
                      value={content.visionHeadline}
                      onChange={(e) => setContent({ ...content, visionHeadline: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-black text-slate-950"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-0.5">Vision Statement Text</label>
                    <textarea
                      rows={3}
                      value={content.visionStatement}
                      onChange={(e) => setContent({ ...content, visionStatement: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed"
                    />
                  </div>

                  <ImageUploadField
                    label="Vision Card Photo"
                    value={content.visionImageUrl}
                    onChange={(val) => setContent({ ...content, visionImageUrl: val })}
                    onUpload={(file) => handleImageUpload("visionImageUrl", file)}
                    aspect="video"
                  />
                </div>

                {/* Mission Card Editor */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#E5A53D] tracking-wider">
                      Our Mission
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-0.5">Mission Tag Label</label>
                    <input
                      type="text"
                      value={content.missionTag}
                      onChange={(e) => setContent({ ...content, missionTag: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-0.5">Mission Headline</label>
                    <input
                      type="text"
                      value={content.missionHeadline}
                      onChange={(e) => setContent({ ...content, missionHeadline: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-black text-slate-950"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-0.5">Mission Statement Text</label>
                    <textarea
                      rows={3}
                      value={content.missionStatement}
                      onChange={(e) => setContent({ ...content, missionStatement: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed"
                    />
                  </div>

                  <ImageUploadField
                    label="Mission Card Photo"
                    value={content.missionImageUrl}
                    onChange={(val) => setContent({ ...content, missionImageUrl: val })}
                    onUpload={(file) => handleImageUpload("missionImageUrl", file)}
                    aspect="video"
                  />
                </div>
              </div>
            </div>

            {/* 3. OUR LEADERSHIP & FOUNDER SPOTLIGHT (/about) */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E5A53D]" />
                  <span>Our Leadership / Founder Spotlight (/about Page)</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Displayed prominently on /about</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Leadership Tag / Badge</label>
                  <input
                    type="text"
                    value={content.aboutLeadershipTag}
                    onChange={(e) => setContent({ ...content, aboutLeadershipTag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Experience Badge (Over Photo)</label>
                  <input
                    type="text"
                    value={content.founderExpBadge}
                    onChange={(e) => setContent({ ...content, founderExpBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Leadership Section Headline</label>
                  <input
                    type="text"
                    value={content.aboutLeadershipHeadline}
                    onChange={(e) => setContent({ ...content, aboutLeadershipHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Executive Full Name</label>
                  <input
                    type="text"
                    value={content.founderName}
                    onChange={(e) => setContent({ ...content, founderName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Designation &amp; Role Subtitle</label>
                  <input
                    type="text"
                    value={content.founderTitle}
                    onChange={(e) => setContent({ ...content, founderTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Executive / Founder Quote Box</label>
                  <textarea
                    rows={2}
                    value={content.founderQuote}
                    onChange={(e) => setContent({ ...content, founderQuote: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Executive Desk Photo (100% Uncropped Full Photo)"
                    value={content.founderImageUrl}
                    onChange={(val) => setContent({ ...content, founderImageUrl: val })}
                    onUpload={(file) => handleImageUpload("founderImageUrl", file)}
                    aspect="video"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: NIRMAN BSB CONSULTANCY (/nirman-bsb)                                */}
        {/* ========================================================================= */}
        {activeTab === "nirman" && (
          <div className="space-y-3">
            {/* 1. Nirman BSB Top Hero & Executive Intro */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#E5A53D]" />
                  <span>Nirman BSB Hero &amp; Value Proposition (/nirman-bsb)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Page Tag Badge</label>
                  <input
                    type="text"
                    value={content.nirmanBadge}
                    onChange={(e) => setContent({ ...content, nirmanBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Main Page Title</label>
                  <input
                    type="text"
                    value={content.nirmanTitle}
                    onChange={(e) => setContent({ ...content, nirmanTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Consultancy Subtitle</label>
                  <input
                    type="text"
                    value={content.nirmanSubtitle}
                    onChange={(e) => setContent({ ...content, nirmanSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Nirman BSB Hero Banner Photo"
                    value={content.nirmanHeroImageUrl}
                    onChange={(val) => setContent({ ...content, nirmanHeroImageUrl: val })}
                    onUpload={(file) => handleImageUpload("nirmanHeroImageUrl", file)}
                    aspect="video"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Intro Badge</label>
                  <input
                    type="text"
                    value={content.nirmanIntroBadge}
                    onChange={(e) => setContent({ ...content, nirmanIntroBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Intro Headline</label>
                  <input
                    type="text"
                    value={content.nirmanIntroHeadline}
                    onChange={(e) => setContent({ ...content, nirmanIntroHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Value Proposition Paragraph 1</label>
                  <textarea
                    rows={2}
                    value={content.nirmanIntro1}
                    onChange={(e) => setContent({ ...content, nirmanIntro1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Value Proposition Paragraph 2</label>
                  <textarea
                    rows={2}
                    value={content.nirmanIntro2}
                    onChange={(e) => setContent({ ...content, nirmanIntro2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 2. Dynamic Engineering Consultancy Pillars */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                <div>
                  <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#E5A53D]" />
                    <span>Engineering Consultancy Pillars ({nirmanPillars.length})</span>
                  </span>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Add, edit, or delete consultancy pillars. You can keep as many or as few as needed. All will appear dynamically on the Nirman BSB page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddNirmanPillar}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3] text-[#E5A53D]" />
                  <span>+ Add Pillar</span>
                </button>
              </div>

              {nirmanPillars.length === 0 ? (
                <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                  <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">No consultancy pillars added yet.</p>
                  <p className="text-xs text-slate-500 mt-0.5 mb-3">
                    Click the button below to add your first consultancy pillar.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddNirmanPillar}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E5A53D] text-slate-950 font-bold text-xs hover:bg-[#d89832] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add First Pillar</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {nirmanPillars.map((pillar, index) => {
                      const num = index + 1;
                      const numStr = num < 10 ? `0${num}` : `${num}`;
                      return (
                        <div
                          key={pillar.id}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-2.5 relative group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            {/* Card Top: Number badge & Delete */}
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                              <span className="text-[11px] font-black uppercase text-[#E5A53D] tracking-wider">
                                Pillar {numStr}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveNirmanPillar(pillar.id)}
                                title="Delete this pillar"
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Tag / Category */}
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                                Phase Tag / Category
                              </label>
                              <input
                                type="text"
                                value={pillar.tag || ""}
                                onChange={(e) => handleUpdateNirmanPillar(pillar.id, "tag", e.target.value)}
                                placeholder={`e.g. ${numStr}. PLANNING & FEASIBILITY`}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#E5A53D]"
                              />
                            </div>

                            {/* Title */}
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                                Pillar Title
                              </label>
                              <input
                                type="text"
                                value={pillar.title}
                                onChange={(e) => handleUpdateNirmanPillar(pillar.id, "title", e.target.value)}
                                placeholder="Service title..."
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-[#E5A53D]"
                              />
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                                Description
                              </label>
                              <textarea
                                rows={2}
                                value={pillar.desc}
                                onChange={(e) => handleUpdateNirmanPillar(pillar.id, "desc", e.target.value)}
                                placeholder="Service description..."
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed focus:outline-hidden focus:border-[#E5A53D]"
                              />
                            </div>

                            {/* Key Focus Bullet Points */}
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                                Focus Bullet Points (one per line)
                              </label>
                              <textarea
                                rows={2}
                                value={Array.isArray(pillar.focusList) ? pillar.focusList.join("\n") : ""}
                                onChange={(e) =>
                                  handleUpdateNirmanPillar(
                                    pillar.id,
                                    "focusList",
                                    e.target.value.split("\n").filter((l) => l.trim().length > 0)
                                  )
                                }
                                placeholder="Point 1&#10;Point 2&#10;Point 3..."
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed focus:outline-hidden focus:border-[#E5A53D]"
                              />
                            </div>
                          </div>

                          {/* Photo upload */}
                          <div className="pt-1">
                            <ImageUploadField
                              label={`Pillar ${num} Photo`}
                              value={pillar.image}
                              onChange={(val) => handleUpdateNirmanPillar(pillar.id, "image", val)}
                              onUpload={(file) => handlePillarImageUpload(pillar.id, file)}
                              aspect="video"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Add Pillar Button */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleAddNirmanPillar}
                      className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50/50 text-slate-700 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#E5A53D]" />
                      <span>+ Add Another Engineering Consultancy Pillar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bottom Consultation CTA */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider block border-b border-slate-200 pb-1.5">
                Bottom Consultation CTA Banner
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">CTA Headline</label>
                  <input
                    type="text"
                    value={content.nirmanCtaHeadline}
                    onChange={(e) => setContent({ ...content, nirmanCtaHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Direct Hotline / WhatsApp</label>
                  <input
                    type="text"
                    value={content.nirmanCtaPhone}
                    onChange={(e) => setContent({ ...content, nirmanCtaPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">CTA Subtitle</label>
                  <textarea
                    rows={2}
                    value={content.nirmanCtaSubtitle}
                    onChange={(e) => setContent({ ...content, nirmanCtaSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CONTACT US PAGE (/contact) - FULLY COMPREHENSIVE                   */}
        {/* ========================================================================= */}
        {activeTab === "contact" && (
          <div className="space-y-3">
            {/* 1. Header & Text Content */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#E5A53D]" />
                  <span>Contact Us Page Header &amp; Form Messaging</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Contact Page Badge</label>
                  <input
                    type="text"
                    value={content.contactBadge}
                    onChange={(e) => setContent({ ...content, contactBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Contact Page Title</label>
                  <input
                    type="text"
                    value={content.contactTitle}
                    onChange={(e) => setContent({ ...content, contactTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Contact Page Subtitle</label>
                  <textarea
                    rows={2}
                    value={content.contactSubtitle}
                    onChange={(e) => setContent({ ...content, contactSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Consultation Form Heading</label>
                  <input
                    type="text"
                    value={content.contactFormTitle}
                    onChange={(e) => setContent({ ...content, contactFormTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Form Subtitle / Response Promise</label>
                  <input
                    type="text"
                    value={content.contactFormSubtitle}
                    onChange={(e) => setContent({ ...content, contactFormSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 2. Direct Numbers, Emails & Operating Hours */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider block border-b border-slate-200 pb-1.5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5A53D]" />
                <span>Phone Numbers, Emails &amp; Operating Hours</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Primary Hotline / Phone</label>
                  <input
                    type="text"
                    value={content.contactPhone}
                    onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">WhatsApp Chat Number</label>
                  <input
                    type="text"
                    value={content.contactWhatsapp}
                    onChange={(e) => setContent({ ...content, contactWhatsapp: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Official Company Email</label>
                  <input
                    type="email"
                    value={content.contactEmail}
                    onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 3. Physical Office Locations & Google Map Coordinates */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider block border-b border-slate-200 pb-1.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E5A53D]" />
                <span>Physical Addresses &amp; Interactive Google Map</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Dhaka Corporate Head Office Address</label>
                  <input
                    type="text"
                    value={content.contactDhakaAddress}
                    onChange={(e) => setContent({ ...content, contactDhakaAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Google Maps Embed URL (Iframe Source)</label>
                  <input
                    type="text"
                    value={content.contactMapEmbedUrl}
                    onChange={(e) => setContent({ ...content, contactMapEmbedUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Controls the live interactive map embedded on the Contact page.</p>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Google Maps External Link (Open in Maps Button)</label>
                  <input
                    type="text"
                    value={content.contactMapLink}
                    onChange={(e) => setContent({ ...content, contactMapLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 4. Bottom Architectural CTA Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider block border-b border-slate-200 pb-1.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E5A53D]" />
                <span>Bottom Architectural CTA Banner</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">CTA Headline</label>
                  <input
                    type="text"
                    value={content.contactCtaHeadline}
                    onChange={(e) => setContent({ ...content, contactCtaHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Button Text</label>
                  <input
                    type="text"
                    value={content.contactCtaButtonText}
                    onChange={(e) => setContent({ ...content, contactCtaButtonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">CTA Subtitle</label>
                  <textarea
                    rows={2}
                    value={content.contactCtaSubtitle}
                    onChange={(e) => setContent({ ...content, contactCtaSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">Button WhatsApp / Link URL</label>
                  <input
                    type="text"
                    value={content.contactCtaLink}
                    onChange={(e) => setContent({ ...content, contactCtaLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at Bottom */}
        <div className="flex items-center justify-end pt-1">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E5A53D] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#d89832] transition-colors shadow-sm cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>{saving ? "Saving All Content..." : "Save All Website Content"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
