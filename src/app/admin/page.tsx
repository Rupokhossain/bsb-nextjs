"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Layers,
  MessageSquare,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Phone,
  Building2,
  ShieldCheck,
  FileText,
  MapPin,
  Calendar,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { completedProjectsData } from "@/data/projects";

export default function AdminDashboardPage() {
  const activeServicesCount = servicesData.filter(
    (s) =>
      ![
        "pre-engineered-steel-buildings",
        "structural-steel-fabrication",
        "industrial-commercial-construction",
        "architectural-design",
        "construction-management",
        "custom-home-building",
        "rooftop-solar-canopies",
        "architectural-services",
        "construction-services",
      ].includes(s.slug)
  ).length;

  const totalProjectsCount = completedProjectsData.length;

  const recentLeads = [
    {
      id: "LEAD-1042",
      name: "Tariqul Islam",
      phone: "+880 1711-234567",
      projectType: "Steel Duplex Villa",
      location: "Gulshan-2, Dhaka",
      budget: "৳ 1.2 - 1.5 Cr",
      status: "New",
      date: "Today, 10:45 AM",
    },
    {
      id: "LEAD-1041",
      name: "Al-Amin Spinning Mills",
      phone: "+880 1819-987654",
      projectType: "Industrial PEB Warehouse",
      location: "Gazipur Industrial Belt",
      budget: "৳ 2.8 - 3.2 Cr",
      status: "In Discussion",
      date: "Yesterday",
    },
    {
      id: "LEAD-1040",
      name: "Dr. Rafiqul Hasan",
      phone: "+880 1912-345678",
      projectType: "Rooftop Bioclimatic Pergola",
      location: "Banani, Dhaka",
      budget: "৳ 18 - 25 Lakh",
      status: "Quotation Sent",
      date: "Oct 22, 2026",
    },
    {
      id: "LEAD-1039",
      name: "Shahrier Chowdhury",
      phone: "+880 1611-889900",
      projectType: "2-Storey Commercial Steel Building",
      location: "Uttara Sector 11",
      budget: "৳ 85 Lakh",
      status: "New",
      date: "Oct 21, 2026",
    },
    {
      id: "LEAD-1038",
      name: "Bashundhara Residence Owner",
      phone: "+880 1722-334455",
      projectType: "1st & 2nd Floor Rooftop Shed",
      location: "Bashundhara R/A",
      budget: "৳ 14 Lakh",
      status: "Won / Deal Closed",
      date: "Oct 20, 2026",
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* 1. WELCOME HERO BANNER */}
      <div className="rounded-2xl bg-white border border-slate-200 p-3.5 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5A53D]/15 text-slate-900 text-[11px] sm:text-xs font-black uppercase tracking-wider border border-[#E5A53D]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5A53D]" />
              <span>Executive Control Console</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
              Welcome, Engr. S.M. Anayet
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
              Nirman BSB real-time operations, client leads, and active projects overview.
            </p>
          </div>

          {/* Quick Action Buttons for Thumb Access */}
          <div className="flex items-center gap-2 shrink-0 pt-1 md:pt-0">
            <Link
              href="/admin/projects"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E5A53D] text-slate-950 font-bold text-xs sm:text-sm hover:bg-[#d89832] transition-colors shadow-xs active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-xs active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-[#E5A53D]" />
              <span>View Leads</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS KPI METRICS ROW: Mobile-first 2x2 Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {/* Metric 1 */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
              Projects
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-950">
              {totalProjectsCount}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-600 flex items-center gap-0.5 shrink-0">
              <TrendingUp className="w-3 h-3" /> +2
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
            Live in portfolio
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
              Services
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E5A53D]/15 text-[#E5A53D] flex items-center justify-center font-bold shrink-0">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-950">
              {activeServicesCount}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
              3 Wings
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
            Duplex &amp; Rooftop
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
              Inquiries
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-950">
              28
            </span>
            <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
              4 New
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
            Submitted online
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
              Pipeline
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-xl sm:text-3xl font-black text-slate-950 truncate">
              ৳ 4.85 Cr
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 shrink-0">
              8 Deals
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
            Active quotes
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION: RECENT INQUIRIES + SERVICES/PROJECTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-8 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                Recent Client Inquiries
              </h3>
              <p className="text-xs text-slate-500 font-medium">Newest leads ready for consultation</p>
            </div>

            <Link
              href="/admin/leads"
              className="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#E5A53D] flex items-center gap-1 transition-colors shrink-0"
            >
              <span>All Leads</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* A) MOBILE-OPTIMIZED CARD VIEW (Visible on Phone/Tablet) */}
          <div className="md:hidden space-y-2.5">
            {recentLeads.map((lead) => {
              const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
              const statusColors: Record<string, string> = {
                New: "bg-blue-100 text-blue-800 border-blue-200",
                "In Discussion": "bg-[#E5A53D]/25 text-slate-950 border-[#E5A53D]/40 font-black",
                "Quotation Sent": "bg-purple-100 text-purple-800 border-purple-200",
                "Won / Deal Closed": "bg-emerald-100 text-emerald-800 border-emerald-200",
              };

              return (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5"
                >
                  {/* Top row: Name, status & time */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-slate-950 text-base">{lead.name}</span>
                        {lead.status === "New" && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{lead.date}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded-md border shrink-0 ${
                        statusColors[lead.status] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  {/* Middle row: Project, Location, Budget */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span className="truncate">{lead.projectType}</span>
                      <span className="text-[#E5A53D] font-black shrink-0 ml-2">{lead.budget}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E5A53D] shrink-0" />
                      <span className="truncate">{lead.location}</span>
                    </div>
                  </div>

                  {/* Bottom row: Touch CTAs (WhatsApp & Phone Call) */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Assalamu%20Alaikum%20${encodeURIComponent(
                        lead.name
                      )},%20thank%20you%20for%20contacting%20Bangladesh%20Steel%20Builders%20Ltd.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs active:scale-98"
                    >
                      <span>WhatsApp Chat</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 active:scale-98"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-600" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* B) DESKTOP TABLE VIEW (Visible on tablet/laptop/desktop) */}
          <div className="hidden md:block rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[620px]">
                <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-black tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3.5">Client / Contact</th>
                    <th className="py-2.5 px-3.5">Project Details</th>
                    <th className="py-2.5 px-3.5">Budget</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5 text-right">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {recentLeads.map((lead) => {
                    const statusColors: Record<string, string> = {
                      New: "bg-blue-100 text-blue-800 border-blue-200",
                      "In Discussion": "bg-[#E5A53D]/25 text-slate-950 border-[#E5A53D]/40 font-black",
                      "Quotation Sent": "bg-purple-100 text-purple-800 border-purple-200",
                      "Won / Deal Closed": "bg-emerald-100 text-emerald-800 border-emerald-200",
                    };
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3.5">
                          <div className="font-bold text-slate-950 text-sm">{lead.name}</div>
                          <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {lead.phone}
                          </div>
                        </td>

                        <td className="py-2.5 px-3.5">
                          <div className="font-semibold text-slate-900 text-sm">{lead.projectType}</div>
                          <div className="text-xs text-slate-500 font-medium">{lead.location}</div>
                        </td>

                        <td className="py-2.5 px-3.5 font-bold text-slate-900 text-sm whitespace-nowrap">
                          {lead.budget}
                        </td>

                        <td className="py-2.5 px-3.5 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-xs font-bold uppercase rounded-md border ${
                              statusColors[lead.status] || "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>

                        <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=Assalamu%20Alaikum%20from%20Nirman%20BSB`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                          >
                            <span>WhatsApp</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
              <Link
                href="/admin/leads"
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 transition-colors"
              >
                Open Full CRM Leads View ({recentLeads.length} total) →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Engineering Divisions & Featured Projects */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-3.5">
          {/* Engineering Divisions Summary */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">
                Services Division Split
              </h3>
              <Link
                href="/admin/services"
                className="text-xs font-bold text-[#E5A53D] hover:underline"
              >
                Configure
              </Link>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Duplex &amp; Residential</div>
                  <div className="text-[11px] text-slate-500 font-medium">Classical villas &amp; multi-storey</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#E5A53D]/25 text-slate-950 font-bold text-xs">
                  3
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Rooftop Specialty</div>
                  <div className="text-[11px] text-slate-500 font-medium">Truss sheds, pergolas &amp; lounges</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                  3
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Commercial &amp; PEB</div>
                  <div className="text-[11px] text-slate-500 font-medium">Industrial warehouses &amp; sheds</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-xs">
                  3
                </span>
              </div>
            </div>
          </div>

          {/* Featured Projects Preview */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">
                Featured Projects
              </h3>
              <Link
                href="/admin/projects"
                className="text-xs font-bold text-slate-800 hover:text-[#E5A53D]"
              >
                All ({totalProjectsCount})
              </Link>
            </div>

            <div className="space-y-2">
              {completedProjectsData.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="relative w-11 h-11 rounded-md overflow-hidden shrink-0 bg-slate-200">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {project.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate font-medium">
                      {project.location} • {project.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
