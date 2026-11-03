"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { FadeIn } from "@/components/common/MotionWrapper";
import { leadsApi, siteContentApi, settingsApi } from "@/lib/api";

interface ContactContentProps {
  initialContact?: any;
  initialSettings?: any;
}

export default function ContactContent({ initialContact, initialSettings }: ContactContentProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Determine initial state by merging CMS contact content with company settings fallback
  const [contactContent, setContactContent] = useState({
    badge:
      initialContact?.contactBadge ||
      "GET IN TOUCH WITH ENGINEERS",
    headline:
      initialContact?.contactTitle ||
      "Let's Build Your Vision in Steel",
    subtitle:
      initialContact?.contactSubtitle ||
      "Have a duplex villa, rooftop expansion, or industrial factory shed in mind? Our structural engineering team is ready to assist you.",
    email:
      initialContact?.contactEmail ||
      initialSettings?.email ||
      "smebsbltd@gmail.com",
    phone:
      initialContact?.contactPhone ||
      initialSettings?.hotline ||
      "+880 1711-181860",
    whatsapp:
      initialContact?.contactWhatsapp ||
      initialSettings?.whatsapp ||
      "+880 1711-181860",
    dhakaAddress:
      initialContact?.contactDhakaAddress ||
      initialSettings?.dhakaOffice ||
      "House # 9/2, Khan Niketon, Flat # 2/A, Garden Street, Ring Road, Shyamoli, Dhaka-1207.",
    mapEmbedUrl:
      initialContact?.contactMapEmbedUrl ||
      "https://maps.google.com/maps?q=BANGLADESH+STEEL+BUILDERS+LTD.%2C++Shyamoli%2C+Dhaka-1207&z=17&hl=en&t=k&output=embed&iwloc=near",
    mapLink:
      initialContact?.contactMapLink ||
      "https://maps.google.com/?q=BANGLADESH+STEEL+BUILDERS+LTD.%2C++Shyamoli%2C+Dhaka-1207",
    formHeading:
      initialContact?.contactFormTitle ||
      "Send Us a Message or Request a Quotation",
    formSubtitle:
      initialContact?.contactFormSubtitle ||
      "Fill out the consultation form below and our lead engineer will contact you within 24 hours.",
    ctaHeadline:
      initialContact?.contactCtaHeadline ||
      "Ready to Work With Us?",
    ctaSubtitle:
      initialContact?.contactCtaSubtitle ||
      "We believe every client deserves a space engineered with care, precision, and lasting architectural value. Take the next step and start the conversation with our engineering team.",
    ctaButtonText:
      initialContact?.contactCtaButtonText ||
      "Book a Consultation",
    ctaLink:
      initialContact?.contactCtaLink ||
      `https://wa.me/${(initialContact?.contactWhatsapp || initialSettings?.whatsapp || "8801711181860").replace(/[^0-9]/g, "")}`,
  });

  // Client-side background sync: ensures instant refresh if updated while navigating
  useEffect(() => {
    let isMounted = true;

    async function loadFreshData() {
      try {
        const [contentRes, settingsRes] = await Promise.allSettled([
          siteContentApi.getAll(),
          settingsApi.get(),
        ]);

        if (!isMounted) return;

        const c = contentRes.status === "fulfilled" ? contentRes.value?.dictionary?.contact : null;
        const s = settingsRes.status === "fulfilled" ? settingsRes.value : null;

        if (c || s) {
          setContactContent((prev) => ({
            ...prev,
            badge: c?.contactBadge || prev.badge,
            headline: c?.contactTitle || prev.headline,
            subtitle: c?.contactSubtitle || prev.subtitle,
            email: c?.contactEmail || s?.email || prev.email,
            phone: c?.contactPhone || s?.hotline || prev.phone,
            whatsapp: c?.contactWhatsapp || s?.whatsapp || prev.whatsapp,
            dhakaAddress: c?.contactDhakaAddress || s?.dhakaOffice || prev.dhakaAddress,
            mapEmbedUrl: c?.contactMapEmbedUrl || prev.mapEmbedUrl,
            mapLink: c?.contactMapLink || prev.mapLink,
            formHeading: c?.contactFormTitle || prev.formHeading,
            formSubtitle: c?.contactFormSubtitle || prev.formSubtitle,
            ctaHeadline: c?.contactCtaHeadline || prev.ctaHeadline,
            ctaSubtitle: c?.contactCtaSubtitle || prev.ctaSubtitle,
            ctaButtonText: c?.contactCtaButtonText || prev.ctaButtonText,
            ctaLink:
              c?.contactCtaLink ||
              `https://wa.me/${(c?.contactWhatsapp || s?.whatsapp || prev.whatsapp).replace(/[^0-9]/g, "")}`,
          }));
        }
      } catch (err) {
        console.warn("Client sync failed, using server data:", err);
      }
    }

    loadFreshData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        throw new Error("Please enter your name.");
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 6) {
        throw new Error("Please enter a valid phone number.");
      }

      await leadsApi.createLead({
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim(),
        projectType: formData.subject.trim() || "Contact Consultation",
        location: "Bangladesh",
        message: formData.message.trim() || "Consultation request from Contact page",
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error("Failed to submit lead to backend:", err);
      setErrorMsg(
        err?.message ||
          "Failed to send inquiry. Please check your network or message us directly on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* Sticky Navbar (Light theme on white background) */}
      <Navbar theme="light" />

      <main className="flex-1 pt-32 sm:pt-40 pb-20 sm:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ============================================================ */}
            {/* LEFT COLUMN: Badge + Map + Dark Contact Info Box */}
            {/* ============================================================ */}
            <FadeIn className="lg:col-span-5 space-y-6 sm:space-y-7">
              {/* Gold Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                  <span>{contactContent.badge}</span>
                </div>
              </div>

              {/* Map Container with "Open in Maps" button */}
              <div className="relative w-full h-[280px] sm:h-[320px] rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-sm">
                <iframe
                  src={contactContent.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] contrast-[1.02]"
                  title="BSB Office Location"
                />

                {/* Floating "Open in Maps ↗" Button */}
                <a
                  href={contactContent.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-sm border border-neutral-200 text-xs font-semibold text-neutral-800 shadow-sm hover:text-[#E5A53D] hover:border-[#E5A53D] transition-colors"
                >
                  <span>Open in Maps</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              {/* Black Contact Info Box */}
              <div className="rounded-sm bg-neutral-950 text-white p-6 sm:p-8 shadow-md space-y-5">
                {/* Primary Official Email */}
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-400 block tracking-wider">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${contactContent.email}`}
                    className="text-xs sm:text-sm font-medium text-white hover:text-[#E5A53D] transition-colors block break-all"
                  >
                    {contactContent.email}
                  </a>
                </div>

                {/* Phone Hotline & WhatsApp Chat */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-neutral-800">
                  {/* Phone */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-neutral-400 block tracking-wider">
                      Phone Hotline
                    </span>
                    <a
                      href={`tel:${contactContent.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-xs sm:text-sm font-medium text-white hover:text-[#E5A53D] transition-colors block"
                    >
                      {contactContent.phone}
                    </a>
                  </div>

                  {/* WhatsApp (Matching brand styling) */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-neutral-400 block tracking-wider">
                      WhatsApp Chat
                    </span>
                    <a
                      href={`https://wa.me/${contactContent.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-white hover:text-[#E5A53D] transition-colors block"
                    >
                      {contactContent.whatsapp} ↗
                    </a>
                  </div>
                </div>

                {/* Dhaka Corporate Address */}
                <div className="space-y-1 pt-3 border-t border-neutral-800">
                  <span className="text-xs font-semibold text-neutral-400 block tracking-wider">
                    Dhaka Corporate Head Office
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    {contactContent.dhakaAddress}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Headline + Subtext + Consultation Form */}
            {/* ============================================================ */}
            <FadeIn delay={0.15} className="lg:col-span-7 space-y-7 sm:space-y-8 pt-2 lg:pt-0 scroll-mt-36">
              <div id="contact-form">
                {/* Main Headline & Subtitle */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.08] whitespace-pre-line">
                    {contactContent.headline}
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-xl">
                    {contactContent.subtitle}
                  </p>
                </div>

                {/* Consultation / Contact Form */}
                {submitted ? (
                  <div className="p-8 sm:p-10 rounded-sm bg-neutral-50 border border-neutral-200 text-center space-y-4 shadow-sm animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-[#E5A53D] text-neutral-950 flex items-center justify-center mx-auto text-xl font-black">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-950">
                      Thank You, {formData.name || "Valued Client"}!
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
                      We have received your message. Our principal architectural builder will contact you at{" "}
                      <span className="font-semibold text-neutral-900">{formData.phone || formData.email}</span> within 24 hours to discuss your project.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-sm bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="pt-2 pb-1 border-t border-neutral-200/60">
                      <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                        {contactContent.formHeading}
                      </h3>
                      <p className="text-xs text-neutral-500 font-medium mt-0.5">
                        {contactContent.formSubtitle}
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between">
                        <span>{errorMsg}</span>
                        <a
                          href={`https://wa.me/${contactContent.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-rose-900"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Row 1: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-xs font-semibold text-neutral-700">
                            Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your Name / Company"
                            className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-xs font-semibold text-neutral-700">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="client@company.com"
                            className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone Number & Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+880 1700-000000"
                            className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="block text-xs font-semibold text-neutral-700">
                            Subject / Project Type
                          </label>
                          <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="e.g. Duplex Villa, Factory Shed, Rooftop"
                            className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 3: Message */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-xs font-semibold text-neutral-700">
                          Message / Requirements
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe your plot size, location, requirements, or questions..."
                          className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all resize-y"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 sm:py-4 rounded-sm bg-neutral-950 hover:bg-neutral-850 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <span>Submitting Inquiry...</span>
                          </span>
                        ) : (
                          <span>Submit Message</span>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM CINEMATIC CTA BANNER (Ready to Work With Us?) */}
        {/* ============================================================ */}
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mt-24 sm:mt-32">
          <FadeIn>
            <div className="relative rounded-sm overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 lg:p-20 shadow-2xl min-h-[380px] sm:min-h-[440px] flex items-center">
              {/* Background Villa & Pool Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/p-banner.jpg"
                  alt={contactContent.ctaHeadline}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  priority
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/35 to-transparent md:bg-gradient-to-r md:from-neutral-950/80 md:via-neutral-950/40 md:to-transparent" />
              </div>

              {/* Banner Content */}
              <div className="relative z-10 max-w-2xl space-y-6">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] whitespace-pre-line">
                  {contactContent.ctaHeadline}
                </h2>

                <p className="text-sm sm:text-base text-white font-medium leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {contactContent.ctaSubtitle}
                </p>

                <div className="pt-2">
                  <a
                    href={contactContent.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-sm bg-[#E5A53D] hover:bg-[#d6952c] text-neutral-950 font-bold text-sm sm:text-base pl-6 pr-2 py-2 transition-all group shadow-lg active:scale-95"
                  >
                    <span>{contactContent.ctaButtonText}</span>
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
                  </a>
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
