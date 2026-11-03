"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Building2,
  X,
  FileText,
  ShieldCheck,
  User,
} from "lucide-react";
import { useToast } from "@/components/admin/ToastContext";
import { authApi, dashboardApi, settingsApi } from "@/lib/api";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { confirmModal, toast } = useToast();

  const [newLeadsCount, setNewLeadsCount] = useState<number | null>(null);
  const [adminProfile, setAdminProfile] = useState({
    name: "Engr. S.M. Anayet Hossain",
    title: "Founder & Managing Director",
    avatar: "/sm-anayet-office.jpg",
  });

  useEffect(() => {
    const loadProfile = () => {
      authApi
        .getProfile()
        .then((user) => {
          if (user && user.name) {
            setAdminProfile((prev) => ({
              ...prev,
              name: user.name,
              avatar: user.avatar || prev.avatar,
            }));
          }
        })
        .catch(() => {});

      settingsApi
        .get()
        .then((data) => {
          if (data) {
            setAdminProfile((prev) => ({
              ...prev,
              name: data.founderName || prev.name,
              title: data.founderTitle || prev.title,
              avatar: data.founderPhoto || prev.avatar,
            }));
          }
        })
        .catch(() => {});
    };

    loadProfile();

    const onProfileUpdated = (e: any) => {
      if (e?.detail) {
        setAdminProfile((prev) => ({
          ...prev,
          name: e.detail.name || prev.name,
          title: e.detail.title || prev.title,
          avatar: e.detail.avatar || prev.avatar,
        }));
      } else {
        loadProfile();
      }
    };

    window.addEventListener("adminProfileUpdated", onProfileUpdated);

    dashboardApi
      .getStats()
      .then((data) => {
        if (data?.metrics?.newLeads !== undefined) {
          setNewLeadsCount(data.metrics.newLeads);
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener("adminProfileUpdated", onProfileUpdated);
    };
  }, []);

  const handleLogout = async () => {
    const confirmed = await confirmModal({
      title: "Sign Out of Admin Portal",
      message: "Are you sure you want to sign out from the Nirman BSB Admin Console?",
      confirmText: "Yes, Sign Out",
      cancelText: "Stay Logged In",
      isDestructive: true,
    });

    if (confirmed) {
      authApi.logout();
      toast.info("Signed out successfully.");
      router.push("/admin/login");
    }
  };

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
      badge: newLeadsCount && newLeadsCount > 0 ? `${newLeadsCount} New` : null,
      badgeColor: "bg-[#E5A53D] text-slate-950 font-bold",
    },
    {
      name: "Website Content (CMS)",
      href: "/admin/content",
      icon: FileText,
      badge: "Pages",
      badgeColor: "bg-blue-100 text-blue-700 font-bold",
    },
    {
      name: "Company Info & Contacts",
      href: "/admin/settings",
      icon: Building2,
      badge: "Official",
      badgeColor: "bg-amber-100 text-amber-800 font-bold",
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
                  className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 group ${
                    active
                      ? "bg-[#E5A53D]/15 text-slate-950 border-l-[3.5px] border-[#E5A53D]"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 transition-colors shrink-0 ${
                        active ? "text-[#E5A53D]" : "text-slate-500 group-hover:text-slate-900"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap leading-tight ${
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
          </div>
        </div>

        {/* Bottom User Profile & Sign Out Bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/90 space-y-2">
          <Link
            href="/admin/settings?tab=profile"
            onClick={() => setMobileOpen(false)}
            title="Edit My Profile & Credentials"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-200/70 transition-colors group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#E5A53D] flex items-center justify-center text-slate-950 font-black text-xs uppercase shadow-xs shrink-0 border border-slate-300">
                {adminProfile.avatar ? (
                  <Image
                    src={adminProfile.avatar}
                    alt={adminProfile.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span>AH</span>
                )}
              </div>
              <div className="truncate">
                <div className="text-xs sm:text-sm font-black text-slate-950 truncate flex items-center gap-1">
                  <span className="truncate">{adminProfile.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E5A53D] shrink-0" />
                </div>
                <div className="text-[11px] text-slate-500 truncate font-medium">
                  {adminProfile.title}
                </div>
              </div>
            </div>

            <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 shrink-0">
              Edit
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
            <span>Sign Out / Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
