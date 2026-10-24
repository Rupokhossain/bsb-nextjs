"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
}

export default function AdminHeader({ onToggleMobileMenu }: AdminHeaderProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic Page Title
  const getPageTitle = () => {
    if (pathname === "/admin") return { title: "Executive Dashboard", subtitle: "Overview & Real-time Operations" };
    if (pathname.startsWith("/admin/services")) return { title: "Services Management", subtitle: "Configure Structural & Architectural Services" };
    if (pathname.startsWith("/admin/projects")) return { title: "Projects Portfolio", subtitle: "Manage Completed & Delivered Projects" };
    if (pathname.startsWith("/admin/leads")) return { title: "Inquiries & Leads CRM", subtitle: "Track Client Inquiries & Quotation Requests" };
    if (pathname.startsWith("/admin/content")) return { title: "Site Content CMS", subtitle: "Edit Hero, About, Process & Section Content" };
    if (pathname.startsWith("/admin/settings")) return { title: "Site Settings & Profile", subtitle: "Company Information & Digital Footprint" };
    return { title: "Admin Portal", subtitle: "Nirman BSB Management Console" };
  };

  const { title, subtitle } = getPageTitle();

  const recentNotifications = [
    {
      id: 1,
      name: "Tariqul Islam",
      project: "Steel Duplex Villa (Gulshan)",
      time: "15 mins ago",
      status: "New Lead",
    },
    {
      id: 2,
      name: "Al-Amin Spinning Mills",
      project: "Factory Shed 18,000 sq.ft (Gazipur)",
      time: "2 hours ago",
      status: "Quote Requested",
    },
    {
      id: 3,
      name: "Dr. Rafiqul Hasan",
      project: "Rooftop Bioclimatic Pergola (Banani)",
      time: "Yesterday",
      status: "Pending Callback",
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 transition-colors shrink-0"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="truncate">
          <h1 className="text-base sm:text-lg lg:text-xl font-black text-slate-950 tracking-tight flex items-center gap-2 truncate">
            <span>{title}</span>
          </h1>
          <p className="hidden sm:block text-xs sm:text-sm text-slate-500 font-medium truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions, Notifications & Quick Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search bar */}
        <div className="relative hidden md:block w-48 lg:w-60">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, services..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#E5A53D] focus:bg-white transition-colors"
          />
        </div>

        {/* Quick Add Project Shortcut */}
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5A53D] text-slate-950 font-bold text-xs sm:text-sm hover:bg-[#d89832] transition-colors shadow-2xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Project</span>
        </Link>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5A53D] ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown Card */}
          {showNotifications && (
            <>
              <div
                onClick={() => setShowNotifications(false)}
                className="fixed inset-0 z-30"
              />
              <div className="absolute right-0 mt-2 w-76 sm:w-96 rounded-xl bg-white border border-slate-200 shadow-xl z-40 p-3 sm:p-4 space-y-2.5 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-sm font-black text-slate-950 uppercase tracking-wider">
                    Recent Inquiries
                  </span>
                  <span className="text-xs font-bold text-slate-900 px-2.5 py-0.5 rounded-full bg-[#E5A53D]/25">
                    3 New Leads
                  </span>
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {recentNotifications.map((notif) => (
                    <Link
                      key={notif.id}
                      href="/admin/leads"
                      onClick={() => setShowNotifications(false)}
                      className="block p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-slate-950">{notif.name}</p>
                          <p className="text-xs text-slate-600 line-clamp-1">{notif.project}</p>
                        </div>
                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-sm bg-[#E5A53D]/20 text-slate-900 shrink-0">
                          {notif.status}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 mt-1 block">{notif.time}</span>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/admin/leads"
                  onClick={() => setShowNotifications(false)}
                  className="block text-center py-2 rounded-lg bg-slate-100 text-sm font-bold text-slate-800 hover:text-slate-950 hover:bg-slate-200 transition-colors"
                >
                  View All Leads CRM →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
