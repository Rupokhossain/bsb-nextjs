"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  ArrowUpRight,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { leadsApi, dashboardApi } from "@/lib/api";

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
}

export default function AdminHeader({ onToggleMobileMenu }: AdminHeaderProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const markNotificationsAsViewed = () => {
    setUnreadCount(0);
    try {
      localStorage.setItem("bsb_admin_last_viewed_notification", new Date().toISOString());
      window.dispatchEvent(new Event("notificationsViewed"));
    } catch (e) {
      console.warn("Could not save notification seen state:", e);
    }
  };

  const loadNotifications = () => {
    leadsApi
      .getAll({ limit: 10 })
      .then((res) => {
        if (res?.data && Array.isArray(res.data)) {
          const lastSeenStr =
            typeof window !== "undefined"
              ? localStorage.getItem("bsb_admin_last_viewed_notification")
              : null;
          const lastSeenTime = lastSeenStr ? new Date(lastSeenStr).getTime() : 0;

          const mapped = res.data.map((item: any) => {
            const rawTime = new Date(item.createdAt).getTime();
            const isFresh = item.status === "NEW" && (!lastSeenTime || rawTime > lastSeenTime);
            return {
              id: item.id,
              name: item.name,
              project: item.projectType || "General Consultation",
              time: new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              status: item.status === "NEW" ? "New Lead" : item.status.replace("_", " "),
              isNew: item.status === "NEW",
              isFresh,
            };
          });

          setNotifications(mapped);

          // Real-world behavior: Count only NEW leads received after user last viewed/opened notifications
          const unviewedCount = mapped.filter((n: any) => n.isFresh).length;
          setUnreadCount(unviewedCount);
        } else {
          setNotifications([]);
          setUnreadCount(0);
        }
      })
      .catch(() => {
        setNotifications([]);
        setUnreadCount(0);
      });
  };

  useEffect(() => {
    loadNotifications();

    // If currently on leads CRM page, automatically mark as viewed
    if (pathname === "/admin/leads") {
      markNotificationsAsViewed();
    }

    const handleSync = () => {
      loadNotifications();
    };

    window.addEventListener("notificationsViewed", handleSync);
    window.addEventListener("focus", handleSync);

    return () => {
      window.removeEventListener("notificationsViewed", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, [pathname]);

  const handleToggleNotifications = () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);
    if (nextState) {
      // Real-world behavior: Viewing notifications clears the unread badge
      markNotificationsAsViewed();
    }
  };

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

      {/* Right: Notification Only with Dynamic Count Badge */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={handleToggleNotifications}
            className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center justify-center"
            aria-label={`Open notifications (${unreadCount} new)`}
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E5A53D] text-slate-950 text-[10px] font-black flex items-center justify-center ring-2 ring-white shadow-xs animate-in zoom-in-75 duration-150">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
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
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-slate-950 uppercase tracking-wider">
                      Recent Inquiries
                    </span>
                    {notifications.length > 0 && (
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-full">
                        {notifications.length}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markNotificationsAsViewed}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Mark all as read
                  </button>
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-slate-500 text-xs space-y-1">
                      <Bell className="w-5 h-5 mx-auto text-slate-300" />
                      <p className="font-semibold text-slate-700">No New Inquiries</p>
                      <p className="text-[11px] text-slate-400">Queries from website forms will appear here.</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href="/admin/leads"
                        onClick={() => {
                          setShowNotifications(false);
                          markNotificationsAsViewed();
                        }}
                        className={`block p-2.5 rounded-lg border transition-colors ${
                          notif.isFresh
                            ? "bg-amber-50/50 border-amber-200/80 hover:bg-amber-50"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              {notif.isFresh && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A53D] inline-block shrink-0" />
                              )}
                              <p className="text-sm font-bold text-slate-950">{notif.name}</p>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1">{notif.project}</p>
                          </div>
                          <span
                            className={`text-xs font-bold uppercase px-2 py-0.5 rounded-sm shrink-0 ${
                              notif.isFresh
                                ? "bg-[#E5A53D] text-neutral-950"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {notif.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 mt-1 block">{notif.time}</span>
                      </Link>
                    ))
                  )}
                </div>

                <Link
                  href="/admin/leads"
                  onClick={() => {
                    setShowNotifications(false);
                    markNotificationsAsViewed();
                  }}
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
