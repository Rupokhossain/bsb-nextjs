import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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

              <div className="flex flex-col justify-center">
                <span className="text-[15px] font-black uppercase tracking-wider leading-tight text-white whitespace-nowrap">
                  <span>NIRMAN </span>
                  <span className="text-[#E5A53D]">BSB</span>
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] leading-tight text-neutral-400 whitespace-nowrap">
                  A Concern of BSB Ltd.
                </span>
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

            {/* Social Media Links (Facebook, Instagram, Twitter/X, LinkedIn) */}
            <div className="pt-2">
              <p className="text-xs text-neutral-400 font-semibold mb-3 tracking-wider uppercase">
                Follow Us
              </p>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/nirmanbsbofficial?mibextid=wwXIfr&rdid=szrpyRPLEdyt03N0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19XpRZ9MBy%2F%3Fmibextid%3DwwXIfr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSB on Facebook"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-[#E5A53D] hover:text-neutral-950 hover:border-[#E5A53D] transition-all shadow-sm group"
                >
                  <svg
                    className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSB on Instagram"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-[#E5A53D] hover:text-neutral-950 hover:border-[#E5A53D] transition-all shadow-sm group"
                >
                  <svg
                    className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441 6.45-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSB on X (Twitter)"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-[#E5A53D] hover:text-neutral-950 hover:border-[#E5A53D] transition-all shadow-sm group"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSB on LinkedIn"
                  className="w-9 h-9 rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-[#E5A53D] hover:text-neutral-950 hover:border-[#E5A53D] transition-all shadow-sm group"
                >
                  <svg
                    className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide uppercase text-xs">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/steel-building-services"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Steel Building Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/rooftop-steel-structures"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Rooftop Steel &amp; Sky Lounges
                </Link>
              </li>
              <li>
                <Link
                  href="/services/steel-duplex-building"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Steel Duplex Buildings
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
                  href="/services/rooftop-steel-structures"
                  className="hover:text-[#E5A53D] transition-colors"
                >
                  Rooftop Steel &amp; Sky Lounges
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
              <p>
                House # 9/2, Khan Niketon, Flat # 2/A, Garden Street, Ring Road,
                Shyamoli, Dhaka-1207.
              </p>
              <p>Hotline: +880 1711-181860</p>
              <p>Phone: +880 1977-181860</p>
              <p>Email: smebsbltd@gmail.com</p>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/8801711181860"
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
          </div>
        </div>
      </div>
    </footer>
  );
}
