"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { FadeIn } from "@/components/common/MotionWrapper";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instantaneous smooth submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
                  <span>GET IN TOUCH</span>
                </div>
              </div>

              {/* Map Container with "Open in Maps" button (Matching Screenshot) */}
              <div className="relative w-full h-[280px] sm:h-[320px] rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.070196884144!2d90.40716615!3d23.77881775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd75f5e3ad72!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
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
                  href="https://maps.google.com/?q=Gulshan-1,Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-sm border border-neutral-200 text-xs font-semibold text-neutral-800 shadow-sm hover:text-[#E5A53D] hover:border-[#E5A53D] transition-colors"
                >
                  <span>Open in Maps</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              {/* Black Contact Info Box (Matching Screenshot) */}
              <div className="rounded-sm bg-neutral-950 text-white p-7 sm:p-9 shadow-md space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-neutral-400 block tracking-wider">
                      Email
                    </span>
                    <a
                      href="mailto:hello@bsbliving.com"
                      className="text-sm sm:text-base font-medium text-white hover:text-[#E5A53D] transition-colors block break-all"
                    >
                      hello@bsbliving.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-neutral-400 block tracking-wider">
                      Phone
                    </span>
                    <a
                      href="tel:+8801700000000"
                      className="text-sm sm:text-base font-medium text-white hover:text-[#E5A53D] transition-colors block"
                    >
                      +880 1700-000000
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                  <span className="text-xs font-semibold text-neutral-400 block tracking-wider">
                    Address
                  </span>
                  <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                    House 12, Road 4, Gulshan-1 / Banani, Dhaka 1212, Bangladesh
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Headline + Subtext + Consultation Form */}
            {/* ============================================================ */}
            <FadeIn delay={0.15} className="lg:col-span-7 space-y-7 sm:space-y-8 pt-2 lg:pt-0 scroll-mt-36">
              <div id="contact-form">
              {/* Main Headline & Bio (Matching Screenshot) */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.08]">
                  LET&apos;S START THE <br />
                  CONVERSATION
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-xl">
                  Whether you&apos;re planning a new build, a renovation, or just exploring ideas — our team is ready to help you take the first step.
                </p>
              </div>

              {/* Consultation / Contact Form */}
              {submitted ? (
                <div className="p-8 sm:p-10 rounded-sm bg-neutral-50 border border-neutral-200 text-center space-y-4 shadow-sm animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-[#E5A53D] text-neutral-950 flex items-center justify-center mx-auto text-xl font-black">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-950">
                    Thank You, {formData.name || "Client"}!
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
                    We have received your message. Our principal architectural builder will contact you at {formData.phone || formData.email} within 24 hours to schedule your consultation.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-sm bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-semibold text-neutral-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-semibold text-neutral-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700">
                        Phone Number
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
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Subject / Service"
                        className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-semibold text-neutral-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Message"
                      className="w-full px-4 py-3 rounded-sm bg-[#F5F4F0] border border-neutral-200/80 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:bg-white transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button (Matching wide dark button in Screenshot) */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 sm:py-4 rounded-sm bg-neutral-950 hover:bg-neutral-850 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </form>
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
                  <a
                    href="#contact-form"
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
