"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  X,
  Upload,
  FileImage,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { servicesData, ServiceDetail } from "@/data/services";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceDetail[]>(servicesData);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("/d1.jpg");

  // Form State
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    tagline: "",
    shortDesc: "",
    image: "/d1.jpg",
    features: [
      "Custom 3D BIM Architectural Modeling",
      "Earthquake & High-Seismic Resistant Steel Frame",
      "50% Faster Construction Timeline than RCC",
      "Expansive Column-Free Interior Floor Spaces",
      "Acoustic & Thermal Insulated Sandwich Panels",
      "High Wind & Cyclone Load Certified Anchor Fasteners",
      "Electrostatic Anti-Rust Primer & Protective Paint",
      "Turnkey Design, Fabrication & Fast Site Handover",
    ],
  });

  const categories = [
    { id: "all", label: "All Services" },
    { id: "duplex", label: "Duplex & Residential" },
    { id: "rooftop", label: "Rooftop Specialty" },
    { id: "peb", label: "Commercial & PEB" },
  ];

  const filteredServices = services.filter((service) => {
    const isLegacy = [
      "pre-engineered-steel-buildings",
      "structural-steel-fabrication",
      "industrial-commercial-construction",
      "architectural-design",
      "construction-management",
      "custom-home-building",
      "rooftop-solar-canopies",
      "architectural-services",
      "construction-services",
    ].includes(service.slug);

    if (isLegacy) return false;

    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "duplex") {
      return (
        matchesSearch &&
        (service.slug.includes("duplex") || service.slug.includes("villa"))
      );
    }
    if (selectedCategory === "rooftop") {
      return matchesSearch && service.slug.startsWith("rooftop-");
    }
    if (selectedCategory === "peb") {
      return (
        matchesSearch &&
        !service.slug.includes("duplex") &&
        !service.slug.includes("villa") &&
        !service.slug.startsWith("rooftop-")
      );
    }

    return matchesSearch;
  });

  // Handle Local File Upload from Computer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleEdit = (service: ServiceDetail) => {
    setEditingService(service);
    setImagePreview(service.image);
    setFormData({
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      shortDesc: service.shortDesc,
      image: service.image,
      features: service.features || [],
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setImagePreview("/d1.jpg");
    setFormData({
      slug: "",
      title: "",
      tagline: "",
      shortDesc: "",
      image: "/d1.jpg",
      features: [
        "Custom 3D BIM Architectural Modeling",
        "Earthquake & High-Seismic Resistant Steel Frame",
        "50% Faster Construction Timeline than RCC",
        "Expansive Column-Free Interior Floor Spaces",
        "Acoustic & Thermal Insulated Sandwich Panels",
        "High Wind & Cyclone Load Certified Anchor Fasteners",
        "Electrostatic Anti-Rust Primer & Protective Paint",
        "Turnkey Design, Fabrication & Fast Site Handover",
      ],
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.slug === editingService.slug ? { ...s, ...formData } : s
        )
      );
    } else {
      const newService: ServiceDetail = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        mainHeadline: formData.title,
        introParagraph: formData.shortDesc,
        subHeadline: "Certified Engineering & Construction Standards",
        subParagraph1: "Designed to meet stringent BNBC structural codes.",
        subParagraph2: "High-tensile steel frame with precision bolted connections.",
        projectIds: ["modern-multistorey-complex"],
      };
      setServices((prev) => [newService, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to remove this service from the website?")) {
      setServices((prev) => prev.filter((s) => s.slug !== slug));
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Engineering Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Manage titles, capabilities, and photos for all active engineering wings.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#E5A53D] text-slate-950 font-bold text-xs sm:text-sm hover:bg-[#d89832] transition-colors shadow-2xs shrink-0 cursor-pointer self-start sm:self-auto active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
        {/* Horizontal scrollable category pills for phone users */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#E5A53D] text-slate-950 shadow-2xs font-black"
                  : "bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative min-w-full md:min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service title..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
          />
        </div>
      </div>

      {/* A) MOBILE-OPTIMIZED SERVICE CARDS (Visible on Phone/Tablet) */}
      <div className="md:hidden space-y-3">
        {filteredServices.map((service) => {
          let divisionTag = "COMMERCIAL & PEB";
          let divisionColor = "bg-blue-100 text-blue-800 border-blue-200";

          if (service.slug.includes("duplex") || service.slug.includes("villa")) {
            divisionTag = "DUPLEX & RESIDENTIAL";
            divisionColor = "bg-[#E5A53D]/25 text-slate-950 border-[#E5A53D]/40 font-black";
          } else if (service.slug.startsWith("rooftop-")) {
            divisionTag = "ROOFTOP SPECIALTY";
            divisionColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
          }

          return (
            <div
              key={service.slug}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border mb-1 ${divisionColor}`}
                  >
                    {divisionTag}
                  </span>
                  <h3 className="font-black text-slate-950 text-base leading-snug line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {service.features?.length || 8} Capabilities • BNBC Certified
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium line-clamp-2">
                {service.shortDesc}
              </p>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <Link
                  href={`/services/${service.slug}`}
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Live</span>
                </Link>

                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-bold text-xs shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(service.slug)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* B) DESKTOP SERVICES TABLE (Visible on Tablet/Laptop/Desktop) */}
      <div className="hidden md:block rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[650px]">
            <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-black tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3.5 w-20">Photo</th>
                <th className="py-2.5 px-3.5">Service Title &amp; Description</th>
                <th className="py-2.5 px-3.5">Division Category</th>
                <th className="py-2.5 px-3.5">Capabilities</th>
                <th className="py-2.5 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredServices.map((service) => {
                let divisionTag = "COMMERCIAL & PEB";
                let divisionColor = "bg-blue-100 text-blue-800 border-blue-200";

                if (service.slug.includes("duplex") || service.slug.includes("villa")) {
                  divisionTag = "DUPLEX & RESIDENTIAL";
                  divisionColor = "bg-[#E5A53D]/25 text-slate-950 border-[#E5A53D]/40 font-black";
                } else if (service.slug.startsWith("rooftop-")) {
                  divisionTag = "ROOFTOP SPECIALTY";
                  divisionColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
                }

                return (
                  <tr key={service.slug} className="hover:bg-slate-50/70 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-2.5 px-3.5">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & Tagline */}
                    <td className="py-2.5 px-3.5 max-w-sm">
                      <div className="font-black text-slate-950 text-sm sm:text-base leading-snug">
                        {service.title}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-0.5 font-medium leading-relaxed">
                        {service.shortDesc}
                      </p>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        slug: /{service.slug}
                      </div>
                    </td>

                    {/* Division Tag */}
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-bold uppercase rounded-md border ${divisionColor}`}
                      >
                        {divisionTag}
                      </span>
                    </td>

                    {/* Capabilities Count */}
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <span className="text-slate-900 font-bold text-sm block">
                        {service.features?.length || 8} Capabilities
                      </span>
                      <div className="text-xs text-slate-500 font-medium">BNBC Certified</div>
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          title="View Live Page"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleEdit(service)}
                          title="Edit Service"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#E5A53D] text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(service.slug)}
                          title="Delete Service"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-500 text-slate-700 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT SERVICE MODAL WITH FILE UPLOAD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-6 space-y-3.5 my-6 animate-in fade-in zoom-in-95 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                {editingService ? "Edit Service Details" : "Add New Engineering Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-sm">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Structure Duplex Building"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="e.g. structure-duplex-building"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Service Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  placeholder="e.g. Earthquake-resilient steel frame duplex houses..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDesc: e.target.value })
                  }
                  placeholder="Describe the engineering service, benefits, and handover..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-[#E5A53D]" />
                    <span>Service Photo (File Upload from Phone/PC)</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">JPG, PNG, WEBP</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <Image
                      src={imagePreview}
                      alt="Service preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50 text-slate-900 font-bold text-sm transition-colors shadow-2xs w-full cursor-pointer active:scale-98"
                    >
                      <Upload className="w-4 h-4 text-[#E5A53D]" />
                      <span>Choose File from Device</span>
                    </button>

                    <div>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="or paste image path (e.g. /d1.jpg)"
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-700 focus:outline-hidden focus:border-[#E5A53D]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#E5A53D] text-slate-950 font-bold text-sm hover:bg-[#d89832] transition-colors shadow-xs active:scale-98"
                >
                  {editingService ? "Update Service" : "Save & Publish Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
