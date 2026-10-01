import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
}

interface TeamSectionProps {
  // Main photo in the middle column of the top row (Site engineers & blueprints)
  teamMainImageUrl?: string;
  // 3 Team members (Marcus Hale, Daniel Reyes, Nathan Brooks)
  members?: TeamMember[];
}

const defaultSpecialties = [
  "Architectural Design",
  "Construction Management",
  "Custom Home Building",
  "Kitchens & Bathrooms",
  "Outdoor Living",
  "Renovations & Additions",
];

const defaultPillars = [
  {
    title: "Experience",
    desc: "Decades of combined building expertise across custom homes.",
  },
  {
    title: "Design",
    desc: "Design-led thinking applied from first concept to completion.",
  },
  {
    title: "Quality",
    desc: "A proven track record of homes delivered to the highest standard.",
  },
  {
    title: "Client Care",
    desc: "Clear communication and dedicated support at every step.",
  },
];

// 3 Team Members matching the exact reference screenshot
const defaultTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Marcus Hale",
    role: "Founder & Principal Builder",
    specialty: "Architectural Design",
    // 📸 Apnar chobi public folder e rekhe eikhane path boshiye nite parben (e.g. "/team-1.jpg")
    image: "/team1.png",
  },
  {
    id: "2",
    name: "Daniel Reyes",
    role: "Lead Architect",
    specialty: "Renovations & Additions",
    // 📸 Apnar chobi public folder e rekhe eikhane path boshiye nite parben (e.g. "/team-2.jpg")
    image: "/team2.png",
  },
  {
    id: "3",
    name: "Nathan Brooks",
    role: "Design Director",
    specialty: "Kitchens & Bathrooms",
    // 📸 Apnar chobi public folder e rekhe eikhane path boshiye nite parben (e.g. "/team-3.jpg")
    image: "/team3.png",
  },
];

export default function TeamSection({
  // Main photo in middle: defaults to verified site construction image
  teamMainImageUrl = "/team.jpg",
  members = defaultTeamMembers,
}: TeamSectionProps) {
  return (
    <section id="team" className="w-full bg-[#F9F8F6] text-neutral-900 py-24 sm:py-32 border-t border-neutral-200/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20 sm:space-y-28">
        
        {/* ============================================================ */}
        {/* 1. TOP PART: "THE TEAM BEHIND EVERY HOME" (Photo height matches right cards) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Badge + Title + Description + Specialty Pills */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E5A53D] text-neutral-950 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block" />
                <span>OUR TEAM</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-neutral-950 uppercase leading-[1.15]">
                The Team Behind <br />
                Every Home
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Our team brings together architects, builders and craftspeople dedicated to delivering exceptional custom homes.
              </p>

                         {/* Black Specialty Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {defaultSpecialties.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-sm bg-neutral-950 text-white text-[11px] font-medium tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
            </div>

 
          </div>

          {/* Middle Column: Large Site Photo - Stretches to EXACT equal height as right cards stack */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-sm overflow-hidden bg-neutral-200 shadow-md">
              <Image
                src={teamMainImageUrl}
                alt="Engineers and architects on construction site"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Right Column: 4 Clean White Feature Cards - Equal height alignment */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3 sm:gap-3.5 h-full">
            {defaultPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col justify-center bg-white rounded-sm p-4 sm:p-5 shadow-sm border border-neutral-100/90 space-y-1 hover:shadow-md transition-shadow"
              >
                <h3 className="text-base font-bold text-neutral-950">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. BOTTOM PART: EXACT 4-COLUMN ROW (Heads fully visible, object-top) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
          
          {/* Card 1, 2, 3: The 3 Team Members */}
          {members.slice(0, 3).map((member) => (
            <div key={member.id} className="space-y-3 group">
              {/* Photo Frame with object-top so head/hair is never cropped */}
              <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-neutral-200 shadow-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Specialty Pill at bottom-left corner of image */}
                <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-sm bg-neutral-950/85 backdrop-blur-sm text-white text-[11px] font-medium tracking-normal shadow-sm">
                  {member.specialty}
                </div>
              </div>

              {/* Name & Role below image */}
              <div className="space-y-0.5 pt-0.5">
                <h4 className="text-base sm:text-[17px] font-bold text-neutral-950">
                  {member.name}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                  {member.role}
                </p>
              </div>
            </div>
          ))}

          {/* Card 4: Gold CTA Card (Matching exact height of team photos) */}
          <div className="space-y-3">
            <div className="relative aspect-[4/4.5] w-full rounded-sm overflow-hidden bg-[#E5A53D] p-6 sm:p-7 flex flex-col justify-end text-neutral-950 shadow-sm group hover:bg-[#d89830] transition-colors">
              <div className="space-y-3">
                <p className="text-sm sm:text-base font-medium text-neutral-950 leading-snug">
                  Meet the architects and builders behind BSB
                </p>
                <div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-neutral-950 underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    <span>Meet The Team</span>
                    <span className="text-sm leading-none">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
