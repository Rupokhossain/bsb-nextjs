"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  User,
  Share2,
  Save,
  CheckCircle2,
  Upload,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  ShieldCheck,
  Lock,
  Globe,
  ExternalLink,
} from "lucide-react";
import { settingsApi, uploadApi, authApi, getStoredUser, setStoredUser } from "@/lib/api";
import { useToast } from "@/components/admin/ToastContext";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "profile" ? "profile" : "company";

  const [activeTab, setActiveTab] = useState<"company" | "profile" | "social">(initialTab);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  // File Upload Refs
  const logoFileRef = useRef<HTMLInputElement>(null);
  const adminAvatarRef = useRef<HTMLInputElement>(null);

  // Company Settings State
  const [formData, setFormData] = useState({
    companyName: "Bangladesh Steel Builders Ltd. (BSB) / Nirman BSB",
    registrationNo: "C-109283/2009",
    tagline: "Engineering Excellence in Structural Steel, PEB & Rooftop Architecture",
    companyLogo: "/logo.png",
    hotline: "+880 1711-181860",
    whatsapp: "+880 1711-181860",
    supportPhone: "+880 1977-181860",
    email: "smebsbltd@gmail.com",
    dhakaOffice: "House # 9/2, Khan Niketon, Flat # 2/A, Garden Street, Ring Road, Shyamoli, Dhaka-1207.",
    factoryLocation: "BSB Steel Fabrication Yard, Savar Industrial Area, Dhaka.",
    founderName: "Engr. S.M. Anayet Hossain",
    founderTitle: "Founder & Managing Director",
    founderPhoto: "/sm-anayet-office.jpg",
    founderBio:
      "Since 2009, Bangladesh Steel Builders Ltd. has pioneered modern pre-engineered steel buildings (PEB), classical steel duplex villas, and innovative rooftop architecture across Bangladesh.",
    facebookUrl: "https://www.facebook.com/nirmanbsbofficial",
    youtubeUrl: "https://youtube.com/@bangladeshsteelbuilders",
    linkedinUrl: "https://linkedin.com/company/bangladeshsteelbuilders",
    instagramUrl: "https://instagram.com/bangladeshsteelbuilders",
    twitterUrl: "https://twitter.com/bangladeshsteel",
  });

  // Dynamic Social Links List (User can add as many as they want, or delete down to 1 or 0)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: "1", platform: "Facebook", url: "https://www.facebook.com/nirmanbsbofficial" },
    { id: "2", platform: "LinkedIn", url: "https://www.linkedin.com/company/bangladesh-steel-builders" },
    { id: "3", platform: "YouTube", url: "https://www.youtube.com/@bangladeshsteelbuilders" },
    { id: "4", platform: "Instagram", url: "https://www.instagram.com/bangladeshsteelbuilders" },
    { id: "5", platform: "Twitter / X", url: "https://twitter.com/bangladeshsteel" },
    { id: "6", platform: "WhatsApp", url: "https://wa.me/8801711181860" },
  ]);

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: "Engr. S.M. Anayet Hossain",
    title: "Founder & Managing Director",
    email: "admin@nirmanbsb.com",
    phone: "+880 1711-234567",
    avatar: "/sm-anayet-office.jpg",
    newPassword: "",
    confirmPassword: "",
  });

  // Load from backend on mount
  useEffect(() => {
    settingsApi
      .get()
      .then((data) => {
        if (data) {
          setFormData((prev) => ({
            ...prev,
            companyName: data.companyName || prev.companyName,
            registrationNo: data.registrationNo || prev.registrationNo,
            tagline: data.tagline || prev.tagline,
            companyLogo: data.companyLogo || prev.companyLogo,
            hotline: data.hotline || prev.hotline,
            whatsapp: data.whatsapp || prev.whatsapp,
            supportPhone: data.supportPhone || prev.supportPhone,
            email: data.email || prev.email,
            dhakaOffice: data.dhakaOffice || prev.dhakaOffice,
            factoryLocation: data.factoryLocation || prev.factoryLocation,
            founderName: data.founderName || prev.founderName,
            founderTitle: data.founderTitle || prev.founderTitle,
            founderPhoto: data.founderPhoto || prev.founderPhoto,
            founderBio: data.founderBio || prev.founderBio,
            facebookUrl: data.facebookUrl || prev.facebookUrl,
            youtubeUrl: data.youtubeUrl || prev.youtubeUrl,
            linkedinUrl: data.linkedinUrl || prev.linkedinUrl,
          }));

          if (data.socialLinks && Array.isArray(data.socialLinks)) {
            setSocialLinks(data.socialLinks);
          } else if (data.facebookUrl || data.youtubeUrl || data.linkedinUrl) {
            const list: SocialLink[] = [];
            if (data.facebookUrl) list.push({ id: "1", platform: "Facebook", url: data.facebookUrl });
            if (data.linkedinUrl) list.push({ id: "2", platform: "LinkedIn", url: data.linkedinUrl });
            if (data.youtubeUrl) list.push({ id: "3", platform: "YouTube", url: data.youtubeUrl });
            if (list.length > 0) setSocialLinks(list);
          }

          // Also populate adminProfile with latest saved values
          setAdminProfile((prev) => ({
            ...prev,
            name: data.founderName || prev.name,
            title: data.founderTitle || prev.title,
            avatar: data.founderPhoto || prev.avatar,
            phone: data.hotline || prev.phone,
          }));
        }
      })
      .catch((err) => console.warn("Could not load backend settings:", err));

    authApi
      .getProfile()
      .then((user: any) => {
        if (user) {
          setAdminProfile((prev) => ({
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            avatar: user.avatar || prev.avatar,
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Upload Handlers
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadRes = await uploadApi.uploadImage(file);
        setFormData((prev) => ({ ...prev, companyLogo: uploadRes.url }));
        toast.success("Company logo uploaded successfully!");
      } catch {
        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, companyLogo: previewUrl }));
        toast.warning("Logo preview loaded from device.");
      }
    }
  };

  const handleAdminAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadRes = await uploadApi.uploadImage(file);
        setAdminProfile((prev) => ({ ...prev, avatar: uploadRes.url }));
        setFormData((prev) => ({ ...prev, founderPhoto: uploadRes.url }));
        toast.success("Admin avatar uploaded successfully!");
      } catch {
        const previewUrl = URL.createObjectURL(file);
        setAdminProfile((prev) => ({ ...prev, avatar: previewUrl }));
        setFormData((prev) => ({ ...prev, founderPhoto: previewUrl }));
        toast.warning("Avatar preview loaded from device.");
      }
    }
  };

  // Add / Remove Dynamic Social Links
  const handleAddSocialLink = (presetPlatform?: string) => {
    const newId = Date.now().toString();
    const platform = presetPlatform || "Facebook";
    let defaultUrl = "https://";
    const p = platform.toLowerCase();
    if (p === "whatsapp") defaultUrl = "https://wa.me/";
    else if (p === "facebook") defaultUrl = "https://facebook.com/";
    else if (p === "youtube") defaultUrl = "https://youtube.com/@";
    else if (p === "linkedin") defaultUrl = "https://linkedin.com/company/";
    else if (p === "instagram") defaultUrl = "https://instagram.com/";
    else if (p.includes("twitter") || p.includes("x")) defaultUrl = "https://twitter.com/";
    else if (p === "tiktok") defaultUrl = "https://tiktok.com/@";

    setSocialLinks((prev) => [
      ...prev,
      { id: newId, platform, url: defaultUrl },
    ]);
  };

  const handleRemoveSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateSocialLink = (id: string, field: "platform" | "url", value: string) => {
    setSocialLinks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Save All Settings
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);

    try {
      // 1. Validate password if entered
      if (adminProfile.newPassword) {
        if (adminProfile.newPassword !== adminProfile.confirmPassword) {
          toast.error("Passwords do not match. Please re-enter.");
          setSaving(false);
          return;
        }
        if (adminProfile.newPassword.length < 6) {
          toast.error("Password must be at least 6 characters long.");
          setSaving(false);
          return;
        }
      }

      // Sync top platforms to legacy columns for safety
      const fb = socialLinks.find((s) => s.platform.toLowerCase().includes("facebook"))?.url || "";
      const yt = socialLinks.find((s) => s.platform.toLowerCase().includes("youtube"))?.url || "";
      const li = socialLinks.find((s) => s.platform.toLowerCase().includes("linkedin"))?.url || "";

      // 2. Sync directly to backend API
      const payloadToUpdate = {
        ...formData,
        founderName: adminProfile.name || formData.founderName,
        founderTitle: adminProfile.title || formData.founderTitle,
        founderPhoto: adminProfile.avatar || formData.founderPhoto,
        facebookUrl: fb,
        youtubeUrl: yt,
        linkedinUrl: li,
        socialLinks,
        adminProfile: {
          name: adminProfile.name,
          title: adminProfile.title,
          email: adminProfile.email,
          phone: adminProfile.phone,
          avatar: adminProfile.avatar,
          newPassword: adminProfile.newPassword || undefined,
        },
      };

      await settingsApi.update(payloadToUpdate);

      // 3. Update auth user profile via authApi
      try {
        await authApi.updateProfile({
          name: adminProfile.name,
          title: adminProfile.title,
          email: adminProfile.email,
          phone: adminProfile.phone,
          avatar: adminProfile.avatar,
          password: adminProfile.newPassword || undefined,
        });
      } catch (authErr) {
        console.warn("Auth profile sync error:", authErr);
      }

      // 4. Update stored user in localStorage
      const stored = getStoredUser();
      if (stored) {
        setStoredUser({
          ...stored,
          name: adminProfile.name,
          email: adminProfile.email,
          avatar: adminProfile.avatar,
        });
      }

      // 5. Notify AdminSidebar & AdminHeader
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("adminProfileUpdated", {
            detail: {
              name: adminProfile.name,
              title: adminProfile.title,
              avatar: adminProfile.avatar,
            },
          })
        );
      }

      // 6. Reset password fields
      setAdminProfile((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));

      setSavedSuccess(true);
      toast.success("All settings & profile saved to database successfully!");
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err: any) {
      console.warn("Save error:", err);
      toast.error(err.message || "An error occurred while saving to database.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-3 sm:space-y-3.5">
      {/* Page Header (No dead space, prominent font) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Company Info, Profile &amp; Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Manage official contacts, addresses, executive profile, social platforms, and admin credentials.
          </p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={() => handleSaveAll()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-black text-xs sm:text-sm transition-all shadow-sm shrink-0 cursor-pointer active:scale-98"
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Settings, social channels, and profile successfully saved!</span>
        </div>
      )}

      {/* Modern Compact Navigation Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/60 rounded-xl border border-slate-200/80 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("company")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "company"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <Building2 className="w-4 h-4 text-[#E5A53D]" />
          <span>Company &amp; Offices</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "social"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <Share2 className="w-4 h-4 text-[#E5A53D]" />
          <span>Social Media Channels ({socialLinks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "profile"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
          }`}
        >
          <User className="w-4 h-4 text-[#E5A53D]" />
          <span>Admin Profile &amp; Login</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-3 sm:space-y-3.5">
        
        {/* ========================================================================= */}
        {/* TAB 1: COMPANY BRANDING & OFFICIAL OFFICES                                */}
        {/* ========================================================================= */}
        {activeTab === "company" && (
          <div className="space-y-3">
            {/* 1. BRANDING & IDENTIFICATION */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200 text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#E5A53D]" />
                <span>Company Branding &amp; Identification</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
                {/* Logo Section */}
                <div className="lg:col-span-4 flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-slate-300 shrink-0 p-1 flex items-center justify-center">
                    <Image
                      src={formData.companyLogo}
                      alt="Logo"
                      fill
                      unoptimized
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <input
                      type="file"
                      ref={logoFileRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoFileRef.current?.click()}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 text-slate-900 font-bold text-xs border border-slate-300 hover:border-[#E5A53D] transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#E5A53D]" />
                      <span>Upload Logo File</span>
                    </button>
                    <span className="text-[10px] text-slate-500 block font-medium">PNG or SVG transparent</span>
                  </div>
                </div>

                {/* Company Name & Registration */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                      Company Official Title
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                      Incorporation / Reg No.
                    </label>
                    <input
                      type="text"
                      value={formData.registrationNo}
                      onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                      Corporate Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. OFFICIAL CONTACT NUMBERS & PHYSICAL ADDRESSES */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200 text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#E5A53D]" />
                <span>Official Contact Numbers &amp; Physical Offices</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                    Primary Hotline Number
                  </label>
                  <input
                    type="text"
                    value={formData.hotline}
                    onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                    WhatsApp Direct Consultation
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                    Secondary Support Line
                  </label>
                  <input
                    type="text"
                    value={formData.supportPhone}
                    onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                    Dhaka Head Office Address
                  </label>
                  <input
                    type="text"
                    value={formData.dhakaOffice}
                    onChange={(e) => setFormData({ ...formData, dhakaOffice: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                    Fabrication Yard &amp; Factory Location
                  </label>
                  <input
                    type="text"
                    value={formData.factoryLocation}
                    onChange={(e) => setFormData({ ...formData, factoryLocation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SOCIAL MEDIA CHANNELS (EXPANDABLE, DELETABLE & DYNAMIC)            */}
        {/* ========================================================================= */}
        {activeTab === "social" && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">
                  <Share2 className="w-4 h-4 text-[#E5A53D]" />
                  <span>Dynamic Social Media Channels ({socialLinks.length})</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Add, customize, or delete platforms. You can keep 1, 2, or as many as you need. All channels will automatically show in the website footer.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddSocialLink("Facebook")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3] text-[#E5A53D]" />
                <span>+ Add Platform</span>
              </button>
            </div>

            {/* Quick Add Presets */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1">
                Quick Add:
              </span>
              {[
                { name: "Facebook", color: "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300" },
                { name: "YouTube", color: "hover:bg-red-50 hover:text-red-700 hover:border-red-300" },
                { name: "LinkedIn", color: "hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300" },
                { name: "Instagram", color: "hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300" },
                { name: "Twitter / X", color: "hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400" },
                { name: "WhatsApp", color: "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300" },
                { name: "TikTok", color: "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300" },
              ].map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleAddSocialLink(preset.name)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs ${preset.color}`}
                >
                  <Plus className="w-3 h-3 text-[#E5A53D]" />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>

            {/* Platform Suggestions Datalist */}
            <datalist id="social-platform-suggestions">
              <option value="Facebook" />
              <option value="YouTube" />
              <option value="LinkedIn" />
              <option value="Instagram" />
              <option value="Twitter / X" />
              <option value="WhatsApp" />
              <option value="TikTok" />
              <option value="Pinterest" />
              <option value="Telegram" />
              <option value="Website" />
            </datalist>

            {/* Dynamic Social Links List */}
            {socialLinks.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <Share2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No social media channels added yet.</p>
                <p className="text-xs text-slate-500 mt-0.5 mb-3">
                  Click the button below to add your first social media platform.
                </p>
                <button
                  type="button"
                  onClick={() => handleAddSocialLink("Facebook")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E5A53D] text-slate-950 font-bold text-xs hover:bg-[#d89832] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add First Platform</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {socialLinks.map((item, index) => {
                  const p = (item.platform || "").toLowerCase();
                  let dotColor = "bg-[#E5A53D]";
                  if (p.includes("facebook") || p.includes("fb")) dotColor = "bg-blue-600";
                  else if (p.includes("youtube")) dotColor = "bg-red-600";
                  else if (p.includes("linkedin")) dotColor = "bg-blue-700";
                  else if (p.includes("instagram") || p.includes("insta")) dotColor = "bg-pink-600";
                  else if (p.includes("twitter") || p.includes(" x") || p === "x") dotColor = "bg-slate-900";
                  else if (p.includes("whatsapp")) dotColor = "bg-emerald-600";
                  else if (p.includes("tiktok")) dotColor = "bg-purple-600";

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-400 w-5 text-center hidden sm:block">
                        {index + 1}.
                      </span>

                      {/* Platform Name / Selector */}
                      <div className="w-full sm:w-48 shrink-0">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block sm:hidden mb-0.5">
                          Platform Name
                        </label>
                        <div className="relative flex items-center">
                          <span className={`absolute left-3 w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                          <input
                            type="text"
                            list="social-platform-suggestions"
                            value={item.platform}
                            onChange={(e) => handleUpdateSocialLink(item.id, "platform", e.target.value)}
                            placeholder="Platform name..."
                            className="w-full pl-8 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm focus:outline-hidden focus:border-[#E5A53D]"
                          />
                        </div>
                      </div>

                      {/* URL input */}
                      <div className="flex-1 min-w-0">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block sm:hidden mb-0.5">
                          Profile / Page URL
                        </label>
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => handleUpdateSocialLink(item.id, "url", e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 font-medium text-xs sm:text-sm focus:outline-hidden focus:border-[#E5A53D]"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0 justify-end pt-1 sm:pt-0">
                        {item.url && item.url.startsWith("http") && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Test Link in new tab"
                            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveSocialLink(item.id)}
                          title="Delete this platform"
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ADMIN PROFILE & CREDENTIALS                                        */}
        {/* ========================================================================= */}
        {activeTab === "profile" && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200 text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#E5A53D]" />
              <span>Admin Profile &amp; Login Credentials</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Avatar Upload */}
              <div className="space-y-1.5 shrink-0 text-center mx-auto sm:mx-0">
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-slate-100 border-2 border-[#E5A53D] shadow-xs">
                  <Image
                    src={adminProfile.avatar}
                    alt={adminProfile.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <input
                  type="file"
                  ref={adminAvatarRef}
                  onChange={handleAdminAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => adminAvatarRef.current?.click()}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 text-slate-900 font-bold text-xs border border-slate-300 hover:border-[#E5A53D] transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#E5A53D]" />
                  <span>Change Avatar</span>
                </button>
              </div>

              {/* Profile Details & Password Update */}
              <div className="flex-1 space-y-2.5 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                      Admin Full Name
                    </label>
                    <input
                      type="text"
                      value={adminProfile.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAdminProfile((prev) => ({ ...prev, name: val }));
                        setFormData((prev) => ({ ...prev, founderName: val }));
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                      Role / Position Title
                    </label>
                    <input
                      type="text"
                      value={adminProfile.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAdminProfile((prev) => ({ ...prev, title: val }));
                        setFormData((prev) => ({ ...prev, founderTitle: val }));
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                      Login Email Address
                    </label>
                    <input
                      type="email"
                      value={adminProfile.email}
                      onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={adminProfile.phone}
                      onChange={(e) => setAdminProfile({ ...adminProfile, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                    Founder Bio &amp; About Note (Displayed on Website)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.founderBio}
                    onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
                    placeholder="Since 2009, Bangladesh Steel Builders Ltd. has pioneered..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white leading-relaxed"
                  />
                </div>

                {/* Password Change Sub-section */}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#E5A53D]" />
                    <span>Change Login Password (Leave blank if keeping current password)</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="password"
                        value={adminProfile.newPassword}
                        onChange={(e) => setAdminProfile({ ...adminProfile, newPassword: e.target.value })}
                        placeholder="New Password (min 6 characters)"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        value={adminProfile.confirmPassword}
                        onChange={(e) => setAdminProfile({ ...adminProfile, confirmPassword: e.target.value })}
                        placeholder="Confirm New Password"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at Bottom */}
        <div className="flex items-center justify-end pt-1">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E5A53D] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#d89832] transition-colors shadow-sm cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>{saving ? "Saving All Settings..." : "Save All Settings & Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}