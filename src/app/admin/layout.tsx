"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminBottomNav from "@/components/admin/AdminBottomNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
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
  );
}
