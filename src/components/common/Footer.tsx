"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { settingsApi } from "@/lib/api";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const defaultSocialLinks: SocialLink[] = [
  { id: "1", platform: "Facebook", url: "https://www.facebook.com/nirmanbsbofficial" },
  { id: "2", platform: "LinkedIn", url: "https://www.linkedin.com/company/bangladesh-steel-builders" },
  { id: "3", platform: "YouTube", url: "https://www.youtube.com/@bangladeshsteelbuilders" },
  { id: "4", platform: "Instagram", url: "https://www.instagram.com/bangladeshsteelbuilders" },
  { id: "5", platform: "Twitter / X", url: "https://twitter.com/bangladeshsteel" },
  { id: "6", platform: "WhatsApp", url: "https://wa.me/8801711181860" },
];

function renderSocialIcon(platform: string, url: string) {
  const p = (platform || "").toLowerCase();
  const u = (url || "").toLowerCase();
  const combo = `${p} ${u}`;

  // Facebook
  if (combo.includes("facebook") || combo.includes("fb.me")) {
    return (
      <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  }

  // YouTube
  if (combo.includes("youtube") || combo.includes("youtu.be")) {
    return (
      <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  // LinkedIn
  if (combo.includes("linkedin")) {
    return (
      <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    );
  }

  // Instagram
  if (combo.includes("instagram") || combo.includes("insta")) {
    return (
      <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }

  // Twitter / X
  if (combo.includes("twitter") || combo.includes("x.com") || p === "x" || p === "twitter / x") {
    return (
      <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  // WhatsApp
  if (combo.includes("whatsapp") || combo.includes("wa.me")) {
    return (
      <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    );
  }

  // TikTok
  if (combo.includes("tiktok")) {
    return (
      <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    );
  }

  // Fallback Globe
  return (
    <svg className="w-4 h-4 fill-none stroke-current group-hover:scale-110 transition-transform" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

export default function Footer() {
  const [settings, setSettings] = useState({
    companyName: "Bangladesh Steel Builders Ltd. (BSB) / Nirman BSB",
    hotline: "+880 1711-181860",
    supportPhone: "+880 1977-181860",
    email: "smebsbltd@gmail.com",
    dhakaOffice: "House # 9/2, Khan Niketon, Flat # 2/A, Garden Street, Ring Road, Shyamoli, Dhaka-1207.",
    facebookUrl: "https://www.facebook.com/nirmanbsbofficial",
    instagramUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
    whatsapp: "+880 1711-181860",
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    settingsApi
      .get()
      .then((data) => {
        if (data) {
          setSettings((prev) => ({
            ...prev,
            companyName: data.companyName || prev.companyName,
            hotline: data.hotline || prev.hotline,
            supportPhone: data.supportPhone || prev.supportPhone,
            email: data.email || prev.email,
            dhakaOffice: data.dhakaOffice || prev.dhakaOffice,
            facebookUrl: data.facebookUrl || prev.facebookUrl,
            whatsapp: data.whatsapp || prev.whatsapp,
            linkedinUrl: data.linkedinUrl || prev.linkedinUrl,
            youtubeUrl: data.youtubeUrl || (prev as any).youtubeUrl,
          }));

          if (Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
            setSocialLinks(data.socialLinks);
          } else {
            // Fallback for initial load
            const fallback: SocialLink[] = [];
            if (data.facebookUrl) fallback.push({ id: "1", platform: "Facebook", url: data.facebookUrl });
            if (data.linkedinUrl) fallback.push({ id: "2", platform: "LinkedIn", url: data.linkedinUrl });
            if (data.youtubeUrl) fallback.push({ id: "3", platform: "YouTube", url: data.youtubeUrl });
            setSocialLinks(fallback.length > 0 ? fallback : defaultSocialLinks);
          }
        }
      })
      .catch(() => {
        setSocialLinks(defaultSocialLinks);
      });
  }, []);

  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-20 pb-12 border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 sm:gap-3 group py-1"
            >
              <div className="bg-white px-3 py-1.5 rounded-sm flex items-center gap-2 shrink-0 shadow-xs border border-white/20">
                {/* Primary Logo: Nirman BSB */}
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/nirman-logo.png"
                    alt="Nirman BSB"
                    width={365}
                    height={254}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                {/* Secondary / Parent Logo: Bangladesh Steel Builders Ltd */}
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/bsb-logo.png"
                    alt="Bangladesh Steel Builders Ltd."
                    width={356}
                    height={258}
                    className="h-9 sm:h-11 w-auto object-contain"
                  />
                </div>
              </div>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Nirman BSB is the specialized structural engineering,
              architectural consultancy, and turnkey construction wing of
              Bangladesh Steel Builders Ltd.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#E5A53D] bg-neutral-900 px-3 py-2 rounded-sm border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D]" />
              <span>BNBC & AISC Structural Safety Certified</span>
            </div>

            {/* Social Media Links (Fully Dynamic from Settings / Database) */}
            {socialLinks.length > 0 && (
              <div className="pt-2">
                <p className="text-xs text-neutral-400 font-semibold mb-3 tracking-wider uppercase">
                  Follow Us
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {socialLinks.map((link) => {
                    if (!link.url) return null;
                    return (
                      <a
                        key={link.id || link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`BSB on ${link.platform}`}
                        title={link.platform}
                        className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-[#E5A53D] hover:text-neutral-950 hover:border-[#E5A53D] transition-all shadow-sm group"
                      >
                        {renderSocialIcon(link.platform, link.url)}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide uppercase text-xs">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/structure-duplex-building"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Structure Duplex Building
                </Link>
              </li>
              <li>
                <Link
                  href="/services/rooftop-structures-sheds"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Rooftop Structures Sheds
                </Link>
              </li>
              <li>
                <Link
                  href="/services/luxury-duplex-pool-villa"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Luxury Duplex Pool Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/services/duplex-multistorey-construction"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Duplex &amp; Multi-Storey Buildings
                </Link>
              </li>
              <li>
                <Link
                  href="/services/rooftop-restaurants-lounges"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Rooftop Restaurants Lounges
                </Link>
              </li>
              <li>
                <Link
                  href="/services/convention-hall-services"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Convention Halls &amp; PEB
                </Link>
              </li>
              <li>
                <Link
                  href="/nirman-bsb"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Nirman BSB Consultancy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  About BSB
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/nirman-bsb"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Nirman BSB
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold mb-4 tracking-wide uppercase text-xs">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-neutral-400">
              <p>{settings.dhakaOffice}</p>
              <p>Hotline: {settings.hotline}</p>
              <p>Phone: {settings.supportPhone}</p>
              <p>Email: {settings.email}</p>
            </div>
            <div className="pt-2">
              <a
                href={
                  settings.whatsapp
                    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`
                    : "https://wa.me/8801711181860"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 rounded-sm bg-[#E5A53D] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-[#d6952c] transition-all"
              >
                Get Free Estimate
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} Nirman BSB • A Concern of Bangladesh
            Steel Builders Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-300">
              Terms of Service
            </a>
            <Link
              href="/admin/login"
              className="text-neutral-500 hover:text-[#E5A53D] transition-colors flex items-center gap-1"
            >
              <span>Admin Portal</span>
              <span>🔒</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
