"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Layers,
  FileText,
} from "lucide-react";

export default function AdminBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Leads",
      href: "/admin/leads",
      icon: MessageSquare,
      badge: "4",
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: Briefcase,
      badge: null,
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: Layers,
      badge: null,
    },
    {
      name: "Site CMS",
      href: "/admin/content",
      icon: FileText,
      badge: null,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 py-1.5 px-2 lg:hidden flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none"
    >
      {navItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-150 ${
              active
                ? "text-slate-950 font-black scale-105"
                : "text-slate-500 font-bold hover:text-slate-900 active:scale-95"
            }`}
          >
            {/* Icon with badge */}
            <div className="relative">
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  active
                    ? "bg-[#E5A53D] text-slate-950 shadow-xs"
                    : "bg-transparent text-slate-600"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Notification Badge */}
              {item.badge && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-xs border-2 border-white">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[11px] tracking-tight mt-0.5 leading-none ${
                active ? "font-black text-slate-950" : "font-semibold text-slate-500"
              }`}
            >
              {item.name}
            </span>

            {/* Active Indicator bar */}
            {active && (
              <span className="absolute bottom-0 w-5 h-0.5 rounded-full bg-slate-950" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
