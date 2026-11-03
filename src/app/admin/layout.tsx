"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import { ToastProvider } from "@/components/admin/ToastContext";
import { getAccessToken } from "@/lib/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsCheckingAuth(false);
      return;
    }

    const token = getAccessToken();
    if (!token) {
      router.replace("/admin/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [pathname, router]);

  // Standalone fullscreen layout for the Login page (No Sidebar, No Header)
  if (pathname === "/admin/login") {
    return <ToastProvider>{children}</ToastProvider>;
  }

  if (isCheckingAuth) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-bold text-sm">
          Checking admin session...
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased selection:bg-[#E5A53D] selection:text-neutral-950">
        {/* Sidebar (Desktop Fixed, Mobile Slide-Over) */}
        <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-72 w-full">
          {/* Sticky Admin Header */}
          <AdminHeader onToggleMobileMenu={() => setMobileOpen(true)} />

          {/* Page Content Viewport with mobile bottom navigation offset (pb-20) */}
          <main className="flex-1 p-2.5 sm:p-4 lg:p-5 pb-20 lg:pb-6 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto space-y-3.5">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Native-Style Bottom Navigation Bar */}
        <AdminBottomNav />
      </div>
    </ToastProvider>
  );
}
