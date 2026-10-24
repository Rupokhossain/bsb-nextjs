"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Building2,
  User,
  Share2,
  Save,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const founderFileRef = useRef<HTMLInputElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);

  // Form State initialized with Nirman BSB real corporate details
  const [formData, setFormData] = useState({
    companyName: "Bangladesh Steel Builders Ltd. (BSB) / Nirman BSB",
    registrationNo: "C-109283/2009",
    tagline: "Engineering Excellence in Structural Steel, PEB & Rooftop Architecture",
    companyLogo: "/logo.png",
    hotline: "+880 1711-234567",
    whatsapp: "+880 1711-234567",
    supportPhone: "+880 1819-987654",
    email: "info@bangladeshsteelbuilders.com",
    dhakaOffice: "House #12, Road #04, Sector #03, Uttara, Dhaka-1230, Bangladesh.",
    factoryLocation: "BSB Steel Fabrication Yard, Savar Industrial Area, Dhaka.",
    founderName: "S.M. Anayet Hossain",
    founderTitle: "Founder & Managing Director",
    founderPhoto: "/sm-anayet-office.jpg",
    founderBio:
      "Since 2009, Bangladesh Steel Builders Ltd. has pioneered modern pre-engineered steel buildings (PEB), classical steel duplex villas, and innovative rooftop architecture across Bangladesh.",
    facebookUrl: "https://facebook.com",
    youtubeUrl: "https://youtube.com",
    linkedinUrl: "https://linkedin.com",
  });

  // Local File Upload Handler for Founder Photo
  const handleFounderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, founderPhoto: previewUrl }));
    }
  };

  // Local File Upload Handler for Company Logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, companyLogo: previewUrl }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
            Company Settings &amp; Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Manage official contacts, company addresses, founder profile, and social links with live file uploads.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[#E5A53D] text-slate-950 font-bold text-sm hover:bg-[#d89832] transition-colors shadow-2xs shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Settings successfully saved and updated across all systems!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-3.5 sm:space-y-4">
        {/* 1. BRANDING & GENERAL INFO */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-sm font-black text-slate-950 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#E5A53D]" />
            <span>Company Branding &amp; Identification</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Logo Preview & Upload */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 block">
                Company Official Logo
              </label>
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center p-2">
                  <Image
                    src={formData.companyLogo}
                    alt="Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
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
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#E5A53D]" />
                    <span>Upload Logo File</span>
                  </button>
                  <p className="text-xs text-slate-400 font-medium">PNG or SVG transparent recommended</p>
                </div>
              </div>
            </div>

            {/* Company Name & Registration */}
            <div className="lg:col-span-2 space-y-3">
              <div>
                <label className="text-sm font-bold text-slate-800 block mb-1">
                  Company Official Title
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-1">
                    Incorporation / Reg No.
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNo}
                    onChange={(e) =>
                      setFormData({ ...formData, registrationNo: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-1">
                    Corporate Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. OFFICIAL CONTACT & LOCATIONS */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-sm font-black text-slate-950 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#E5A53D]" />
            <span>Official Contact Numbers &amp; Physical Offices</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-sm font-bold text-slate-800 block mb-1">
                Primary Hotline Number
              </label>
              <input
                type="text"
                value={formData.hotline}
                onChange={(e) =>
                  setFormData({ ...formData, hotline: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-800 block mb-1">
                WhatsApp Direct Consultation
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-800 block mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-800 block mb-1">
                Secondary Support Line
              </label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={(e) =>
                  setFormData({ ...formData, supportPhone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-bold text-slate-800 block mb-1">
                Dhaka Head Office Address
              </label>
              <input
                type="text"
                value={formData.dhakaOffice}
                onChange={(e) =>
                  setFormData({ ...formData, dhakaOffice: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-bold text-slate-800 block mb-1">
                Fabrication Yard &amp; Factory Location
              </label>
              <input
                type="text"
                value={formData.factoryLocation}
                onChange={(e) =>
                  setFormData({ ...formData, factoryLocation: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* 3. FOUNDER & LEADERSHIP PROFILE */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-sm font-black text-slate-950 uppercase tracking-wider">
            <User className="w-4 h-4 text-[#E5A53D]" />
            <span>Managing Director &amp; Executive Profile</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Photo Preview & File Upload */}
            <div className="space-y-2 shrink-0 sm:w-44 text-center mx-auto sm:mx-0">
              <div className="relative w-36 h-36 mx-auto rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-xs">
                <Image
                  src={formData.founderPhoto}
                  alt={formData.founderName}
                  fill
                  className="object-cover"
                />
              </div>

              <input
                type="file"
                ref={founderFileRef}
                onChange={handleFounderPhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => founderFileRef.current?.click()}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#E5A53D]/10 hover:bg-[#E5A53D]/20 text-slate-900 font-bold text-xs sm:text-sm border border-[#E5A53D]/30 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#E5A53D]" />
                <span>Upload From Computer</span>
              </button>
            </div>

            {/* Inputs */}
            <div className="flex-1 space-y-3 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-1">
                    Executive Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.founderName}
                    onChange={(e) =>
                      setFormData({ ...formData, founderName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-1">
                    Designation &amp; Role
                  </label>
                  <input
                    type="text"
                    value={formData.founderTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, founderTitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-800 block mb-1">
                  Manual Image Path (or use upload button)
                </label>
                <input
                  type="text"
                  value={formData.founderPhoto}
                  onChange={(e) =>
                    setFormData({ ...formData, founderPhoto: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-800 block mb-1">
                  Executive Bio &amp; About Note
                </label>
                <textarea
                  rows={3}
                  value={formData.founderBio}
                  onChange={(e) =>
                    setFormData({ ...formData, founderBio: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. DIGITAL & SOCIAL CHANNELS */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-sm font-black text-slate-950 uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-[#E5A53D]" />
            <span>Digital Channels &amp; Social Profiles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-bold text-slate-800 block mb-1">
                Facebook Page URL
              </label>
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) =>
                  setFormData({ ...formData, facebookUrl: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-800 block mb-1">
                YouTube Channel URL
              </label>
              <input
                type="text"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeUrl: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-800 block mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={formData.linkedinUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkedinUrl: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#E5A53D] text-slate-950 font-bold text-sm uppercase tracking-wider hover:bg-[#d89832] transition-colors shadow-2xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
