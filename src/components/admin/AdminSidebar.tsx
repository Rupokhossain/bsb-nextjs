"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  Building2,
  X,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: Layers,
      badge: "9 Active",
    },
    {
      name: "Projects Portfolio",
      href: "/admin/projects",
      icon: Briefcase,
      badge: "12",
    },
    {
      name: "Leads & Quotes",
      href: "/admin/leads",
      icon: MessageSquare,
      badge: "4 New",
      badgeColor: "bg-[#E5A53D] text-slate-950 font-bold",
    },
    {
      name: "Site Content CMS",
      href: "/admin/content",
      icon: FileText,
      badge: "Edit All",
      badgeColor: "bg-blue-100 text-blue-700 font-bold",
    },
    {
      name: "Site Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container: Clean Light Theme */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xs lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Branding & Navigation */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo & Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center gap-3 group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-10 h-10 rounded-lg bg-[#E5A53D] flex items-center justify-center text-slate-950 shadow-xs font-black text-lg shrink-0">
                <Building2 className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-slate-950 flex items-center gap-1.5">
                  NIRMAN BSB
                  <span className="text-[11px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-[#E5A53D]/20 text-slate-900 border border-[#E5A53D]/40">
                    CMS
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Steel Engineering Admin</p>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-2.5 space-y-1 flex-1">
            <div className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Control Panel
            </div>

            {navigation.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 group ${
                    active
                      ? "bg-[#E5A53D]/15 text-slate-950 border-l-[3.5px] border-[#E5A53D]"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors shrink-0 ${
                        active ? "text-[#E5A53D]" : "text-slate-500 group-hover:text-slate-900"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.badgeColor
                          ? item.badgeColor
                          : active
                          ? "bg-[#E5A53D]/25 text-slate-950 font-bold"
                          : "bg-slate-100 text-slate-700 group-hover:bg-slate-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Quick Live Site Link */}
            <div className="pt-3 mt-2 border-t border-slate-200">
              <div className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                Front-End Website
              </div>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors border border-dashed border-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[#E5A53D]" />
                  <span>View Live Website</span>
                </div>
                <span className="text-xs text-slate-500">Public ↗</span>
              </Link>
            </div>
          </div>

          {/* System Online Status Badge */}
          <div className="p-3 mx-2.5 mb-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Online &amp; Active</span>
            </div>
            <p className="text-xs text-slate-600 leading-normal font-medium">
              Next.js Client Mode. All changes reflect in real time across the portal.
            </p>
          </div>
        </div>

        {/* Bottom User Profile */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E5A53D] flex items-center justify-center text-slate-950 font-black text-xs uppercase shadow-2xs">
              AH
            </div>
            <div className="truncate">
              <div className="text-sm font-black text-slate-950 truncate flex items-center gap-1">
                S.M. Anayet
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A53D]" />
              </div>
              <div className="text-xs text-slate-500 truncate font-medium">
                Managing Director
              </div>
            </div>
          </div>

          <Link
            href="/admin/login"
            title="Log Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}
