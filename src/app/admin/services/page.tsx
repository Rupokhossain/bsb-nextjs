"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Building,
  Home,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { servicesData, ServiceDetail } from "@/data/services";
import { servicesApi, uploadApi } from "@/lib/api";
import { useToast } from "@/components/admin/ToastContext";

// Recommended capability presets
const PRESET_CAPABILITIES = {
  DUPLEX: [
    "Custom 3D BIM Architectural Duplex Plans",
    "Earthquake & High-Seismic Resistant Steel Frame",
    "50% Faster Construction Timeline than RCC",
    "Expansive Column-Free Living & Lounge Spaces",
    "Neoclassical Pillars & Front Car Porch Design",
    "Acoustic & Thermal Insulated Sandwich Panels",
    "Modern Cantilever Balconies & Glass Railings",
    "Turnkey Design, Fabrication & Site Erection",
  ],
  ROOFTOP: [
    "Certified Lightweight High-Tensile Steel Trusses",
    "100% Water-Sealed Flashings & Rust-Proof Gutters",
    "Zero Structural Load Impact on Existing Concrete Slab",
    "Thermal-Insulated Sandwich Roofing Panels",
    "Panoramic Glass Wall Enclosures & Sky Lounge Finish",
    "BNBC High-Velocity Cyclone Wind Resistance",
    "Modern Pergolas, Sunrooms & Rooftop Lounges",
    "Fast Zero-Disturbance On-Site Erection",
  ],
  PEB: [
    "Custom Pre-Engineered Building (PEB) Structural Design",
    "Large-Span Column-Free Industrial Warehouses",
    "Heavy Industrial Factory Shed Fabrication",
    "High-Tensile BNBC Certified Structural Steel",
    "Thermal & Acoustic Insulated Sandwich Panels",
    "Anti-Rust Epoxy Primer & Weather Coating",
    "Heavy Vehicle Loading Bays & Canopies",
    "Turnkey Design, Automated Fabrication & Rapid Erection",
  ],
};

interface ServiceCategoryConfig {
  id: string;
  title: string;
  subtitle: string;
  presetKey?: keyof typeof PRESET_CAPABILITIES;
}

const DEFAULT_SERVICE_CATEGORIES: ServiceCategoryConfig[] = [
  { id: "DUPLEX", title: "Duplex Villa", subtitle: "Residential Villas", presetKey: "DUPLEX" },
  { id: "ROOFTOP", title: "Rooftop Shed", subtitle: "Pergola & Sky Lounge", presetKey: "ROOFTOP" },
  { id: "PEB", title: "Industrial PEB", subtitle: "Warehouses & Sheds", presetKey: "PEB" },
];

export default function AdminServicesPage() {
  const { toast, confirmModal } = useToast();
  const [services, setServices] = useState<ServiceDetail[]>(servicesData);

  const [categoryWings, setCategoryWings] = useState<ServiceCategoryConfig[]>(DEFAULT_SERVICE_CATEGORIES);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategorySubtitle, setNewCategorySubtitle] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"homepage" | "details">("homepage");
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("/d1.jpg");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Capability Input
  const [newCapability, setNewCapability] = useState<string>("");

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    slug: "",
    title: "",
    tagline: "Precision Structural Steel Engineering",
    category: "DUPLEX",
    shortDesc: "",
    image: "/d1.jpg",
    features: PRESET_CAPABILITIES.DUPLEX,
    mainHeadline: "",
    introParagraph: "",
    subHeadline: "",
    subParagraph1: "",
    subParagraph2: "",
  });

  const dynamicFilterCategories = [
    { id: "all", label: "All Services" },
    ...categoryWings.map((w) => ({
      id: w.id.toLowerCase(),
      label: w.title,
    })),
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

    const cat = (service.category || (
      service.slug.includes("duplex") || service.slug.includes("villa")
        ? "DUPLEX"
        : service.slug.startsWith("rooftop-")
        ? "ROOFTOP"
        : "PEB"
    )).toLowerCase();

    if (selectedCategory !== "all") {
      return matchesSearch && cat === selectedCategory.toLowerCase();
    }

    return matchesSearch;
  });

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll();
      if (Array.isArray(data) && data.length > 0) {
        setServices(data as ServiceDetail[]);

        // Dynamically extract categories from all services in database
        const dynamicCats: ServiceCategoryConfig[] = [...DEFAULT_SERVICE_CATEGORIES];
        data.forEach((s: any) => {
          const cat = s.category;
          if (cat && !dynamicCats.some((c) => c.id.toUpperCase() === cat.toUpperCase())) {
            dynamicCats.push({
              id: cat,
              title: cat.replace(/_/g, " "),
              subtitle: "Specialized Structure Wing",
            });
          }
        });
        setCategoryWings(dynamicCats);
      }
    } catch (err) {
      console.warn("Could not load services from backend:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateNewCategory = () => {
    if (!newCategoryTitle.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    const cleanId = newCategoryTitle.trim().toUpperCase().replace(/\s+/g, "_");
    const newCat: ServiceCategoryConfig = {
      id: cleanId,
      title: newCategoryTitle.trim(),
      subtitle: newCategorySubtitle.trim() || "Specialized Structure Wing",
    };
    setCategoryWings((prev) => {
      if (prev.some((c) => c.id.toUpperCase() === cleanId)) return prev;
      return [...prev, newCat];
    });
    setFormData((prev) => ({
      ...prev,
      category: cleanId,
    }));
    setNewCategoryTitle("");
    setNewCategorySubtitle("");
    setShowNewCategoryInput(false);
    toast.success(`Category "${newCat.title}" created & selected!`);
  };

  // Handle Local File Upload from Computer / Mobile
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const uploadRes = await uploadApi.uploadImage(file);
        setImagePreview(uploadRes.url);
        setFormData((prev) => ({ ...prev, image: uploadRes.url }));
        toast.success("Cover image uploaded successfully!");
      } catch (err) {
        console.warn("Server upload failed, using local device preview:", err);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setFormData((prev) => ({ ...prev, image: previewUrl }));
        toast.warning("Photo loaded from device.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleEdit = (service: ServiceDetail) => {
    setEditingService(service);
    setImagePreview(service.image);

    const cat = (service.category as "DUPLEX" | "ROOFTOP" | "PEB") || (
      service.slug.includes("duplex") || service.slug.includes("villa")
        ? "DUPLEX"
        : service.slug.startsWith("rooftop-")
        ? "ROOFTOP"
        : "PEB"
    );

    setFormData({
      id: (service as any).id || "",
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      category: cat,
      shortDesc: service.shortDesc,
      image: service.image,
      features: Array.isArray(service.features) ? service.features : [],
      mainHeadline: service.mainHeadline || "",
      introParagraph: service.introParagraph || "",
      subHeadline: service.subHeadline || "",
      subParagraph1: service.subParagraph1 || "",
      subParagraph2: service.subParagraph2 || "",
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setImagePreview("/d1.jpg");
    setFormData({
      id: "",
      slug: "",
      title: "",
      tagline: "Precision Structural Steel Engineering",
      category: "DUPLEX",
      shortDesc: "",
      image: "/d1.jpg",
      features: [...PRESET_CAPABILITIES.DUPLEX],
      mainHeadline: "",
      introParagraph: "",
      subHeadline: "",
      subParagraph1: "",
      subParagraph2: "",
    });
    setIsModalOpen(true);
  };

  const handleAddCapability = () => {
    if (!newCapability.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newCapability.trim()],
    }));
    setNewCapability("");
  };

  const handleRemoveCapability = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleApplyPresetCapabilities = (cat: string) => {
    const preset = PRESET_CAPABILITIES[cat as keyof typeof PRESET_CAPABILITIES];
    if (preset) {
      setFormData((prev) => ({
        ...prev,
        category: cat,
        features: [...preset],
      }));
      toast.info(`Loaded standard ${cat} capability checklist.`);
    } else {
      setFormData((prev) => ({
        ...prev,
        category: cat,
      }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a service title.");
      return;
    }

    const generatedSlug =
      formData.slug.trim() ||
      formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const servicePayload: ServiceDetail = {
      ...formData,
      slug: generatedSlug,
      tagline: formData.tagline?.trim() || formData.title || "Precision Structural Steel Engineering",
      mainHeadline: formData.mainHeadline.trim() || formData.title,
      introParagraph: formData.introParagraph.trim() || formData.shortDesc,
      subHeadline:
        formData.subHeadline.trim() ||
        "Column-Free Architectural Freedom & Maximum Structural Resilience",
      subParagraph1:
        formData.subParagraph1.trim() ||
        "Every joint is precision-bolted and seismically tested according to the latest BNBC standards.",
      subParagraph2:
        formData.subParagraph2.trim() ||
        "Integrated anti-corrosive finishes, insulated panels, and turnkey project delivery.",
      projectIds: editingService?.projectIds || ["bespoke-steel-duplex-villa"],
    };

    try {
      if (editingService) {
        const serviceId = (editingService as any).id || formData.id || editingService.slug;
        await servicesApi.update(serviceId, servicePayload);
        toast.success("Service details updated in database!");
      } else {
        await servicesApi.create(servicePayload);
        toast.success("New engineering service saved to database!");
      }
      await fetchServices();
    } catch (err: any) {
      toast.error(err.message || "Failed to save service to database.");
      console.warn("Backend save error:", err);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (slug: string) => {
    const toDelete = services.find((s) => s.slug === slug);
    const confirmed = await confirmModal({
      title: "Remove Service",
      message: `Are you sure you want to remove "${toDelete?.title || slug}" from the website? This will remove it from both the Homepage and Services page.`,
      confirmText: "Yes, Remove Service",
      cancelText: "Cancel",
      isDestructive: true,
    });

    if (confirmed) {
      const serviceId = (toDelete as any)?.id || slug;
      try {
        await servicesApi.delete(serviceId);
        toast.success("Service removed from database.");
        await fetchServices();
      } catch (err: any) {
        toast.error(err.message || "Failed to delete service.");
        console.warn("Backend delete skipped:", err);
      }
    }
  };

  // Helper for Category badge label and color
  const getCategoryInfo = (cat: string, slug: string) => {
    const c = (cat || "").toUpperCase();
    if (c === "DUPLEX" || (!cat && (slug.includes("duplex") || slug.includes("villa")))) {
      return {
        label: "DUPLEX & RESIDENTIAL",
        pillClass: "bg-[#E5A53D] text-neutral-950 font-black shadow-xs",
        borderClass: "border-[#E5A53D]",
      };
    }
    if (c === "ROOFTOP" || (!cat && slug.startsWith("rooftop-"))) {
      return {
        label: "ROOFTOP SPECIALTY",
        pillClass: "bg-neutral-900 text-[#E5A53D] font-black border border-[#E5A53D]/40",
        borderClass: "border-neutral-900",
      };
    }
    if (c === "PEB" || (!cat && (slug.includes("peb") || slug.includes("industrial") || slug.includes("convention")))) {
      return {
        label: "COMMERCIAL & PEB",
        pillClass: "bg-[#006837] text-white font-bold border border-emerald-500/40",
        borderClass: "border-[#006837]",
      };
    }

    // Custom Category
    const customMatch = categoryWings.find((w) => w.id === c);
    const displayLabel = customMatch ? customMatch.title.toUpperCase() : (cat || "ENGINEERING").toUpperCase();

    return {
      label: displayLabel,
      pillClass: "bg-slate-900 text-amber-400 font-extrabold border border-amber-400/40",
      borderClass: "border-slate-900",
    };
  };

  return (
    <div className="space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Engineering Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Manage titles, capabilities, categories, and cover photos matching the Homepage presentation.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-extrabold text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap gap-1.5">
          {dynamicFilterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
          />
        </div>
      </div>

      {/* Services Table & Mobile Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Mobile View: Modern Clean Cards (block md:hidden) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredServices.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm font-medium">
              No services found matching your search.
            </div>
          ) : (
            filteredServices.map((service) => {
              const catInfo = getCategoryInfo(service.category || "", service.slug);

              return (
                <div key={service.slug} className="p-3.5 space-y-3">
                  {/* Top Row: Thumbnail + Title + Category Pill */}
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9.5px] font-extrabold uppercase rounded-md tracking-wider shrink-0 ${catInfo.pillClass}`}
                        >
                          {catInfo.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono truncate">
                          /{service.slug}
                        </span>
                      </div>
                      <h4 className="font-black text-slate-950 text-sm leading-snug line-clamp-1">
                        {service.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 font-medium leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Capabilities & Badges */}
                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#E5A53D]"></span>
                      <span>{service.features?.length || 8} Capabilities</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      BNBC Certified
                    </span>
                  </div>

                  {/* Mobile Actions: Touch-Friendly Buttons */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-50 hover:bg-[#E5A53D] text-amber-950 border border-amber-200/80 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#E5A53D]" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(service.slug)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-200/80 transition-colors cursor-pointer shrink-0"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop View: Full Table (hidden md:block) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3.5 w-20">Photo</th>
                <th className="py-2.5 px-3.5">Service Title &amp; Description</th>
                <th className="py-2.5 px-3.5">Homepage Category</th>
                <th className="py-2.5 px-3.5">Capabilities</th>
                <th className="py-2.5 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-sm font-medium">
                    No services found matching your search.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => {
                  const catInfo = getCategoryInfo(service.category || "", service.slug);

                  return (
                    <tr key={service.slug} className="hover:bg-slate-50/70 transition-colors">
                      {/* Thumbnail */}
                      <td className="py-2.5 px-3.5">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            unoptimized
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
                          className={`inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md tracking-wider ${catInfo.pillClass}`}
                        >
                          {catInfo.label}
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT SERVICE MODAL (EXPANDED SIZE + DYNAMIC CATEGORY CREATOR)         */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-6xl xl:max-w-7xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-6 md:p-7 space-y-4 my-auto sm:my-4 animate-in fade-in zoom-in-95 max-h-[95vh] overflow-y-auto overflow-x-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-2xl font-black text-slate-950 truncate">
                  {editingService ? "Edit Engineering Service" : "Add New Engineering Service"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-2">
                  Matches the Homepage 3-card carousel presentation and full service landing page.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COLUMN: FORM CONTROLS (7 Cols) */}
                <div className="lg:col-span-7 space-y-4 min-w-0 w-full">
                  {/* 1. HOMEPAGE DIVISION CATEGORY SELECTOR & ADDER */}
                  <div className="space-y-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0">
                        <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 block">
                          1. Select Homepage Category (Division Wing)
                        </label>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Choose a division wing or add your own custom category for this service.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50/50 text-slate-900 font-bold text-xs shadow-2xs transition-all cursor-pointer self-start sm:self-auto shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E5A53D] stroke-[2.5]" />
                        <span>{showNewCategoryInput ? "Cancel" : "+ Add New Category"}</span>
                      </button>
                    </div>

                    {showNewCategoryInput && (
                      <div className="p-3.5 bg-white rounded-xl border-2 border-[#E5A53D] shadow-sm space-y-3 animate-in fade-in">
                        <div className="text-xs font-bold text-slate-900 uppercase">Create New Category Wing</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">Category Name *</label>
                            <input
                              type="text"
                              placeholder="e.g. Industrial Warehouse, Rooftop Lounge..."
                              value={newCategoryTitle}
                              onChange={(e) => setNewCategoryTitle(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-300 focus:outline-hidden focus:border-[#E5A53D] focus:bg-white text-slate-950"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">Short Subtitle (Optional)</label>
                            <input
                              type="text"
                              placeholder="e.g. Modern Logistics Sheds..."
                              value={newCategorySubtitle}
                              onChange={(e) => setNewCategorySubtitle(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-300 focus:outline-hidden focus:border-[#E5A53D] focus:bg-white text-slate-950"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setShowNewCategoryInput(false)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleCreateNewCategory}
                            className="px-4 py-1.5 rounded-lg bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 text-xs font-extrabold uppercase tracking-wide cursor-pointer shadow-xs"
                          >
                            Save &amp; Select
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {categoryWings.map((catWing) => {
                        const isSelected = formData.category.toUpperCase() === catWing.id.toUpperCase();
                        let selectedStyle = "bg-slate-900 border-2 border-slate-900 text-amber-400 shadow-sm";
                        let titleStyle = "text-amber-400 font-black";
                        let subStyle = "text-slate-200 font-medium";

                        if (catWing.id === "DUPLEX") {
                          selectedStyle = "bg-[#E5A53D] border-2 border-[#d89832] text-slate-950 shadow-sm";
                          titleStyle = "text-slate-950 font-black";
                          subStyle = "text-slate-900 font-bold";
                        } else if (catWing.id === "ROOFTOP") {
                          selectedStyle = "bg-slate-950 border-2 border-slate-900 text-white shadow-sm";
                          titleStyle = "text-[#E5A53D] font-black";
                          subStyle = "text-slate-300 font-medium";
                        } else if (catWing.id === "PEB") {
                          selectedStyle = "bg-[#006837] border-2 border-emerald-800 text-white shadow-sm";
                          titleStyle = "text-white font-black";
                          subStyle = "text-emerald-100 font-medium";
                        }

                        return (
                          <button
                            key={catWing.id}
                            type="button"
                            onClick={() => {
                              if (catWing.presetKey && PRESET_CAPABILITIES[catWing.presetKey]) {
                                handleApplyPresetCapabilities(catWing.id);
                              } else {
                                setFormData((prev) => ({ ...prev, category: catWing.id }));
                              }
                            }}
                            className={`p-2.5 sm:p-3 rounded-xl border-2 text-left transition-all cursor-pointer min-w-0 ${
                              isSelected
                                ? selectedStyle
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-2xs"
                            }`}
                          >
                            <div className="text-xs uppercase tracking-wider font-black flex items-center justify-between gap-1">
                              <span className={`truncate ${isSelected ? titleStyle : "text-slate-950 font-black"}`}>
                                {catWing.title}
                              </span>
                              {isSelected && <Check className="w-4 h-4 stroke-[3] shrink-0" />}
                            </div>
                            <div className={`text-[11px] sm:text-xs mt-1 font-semibold truncate ${isSelected ? subStyle : "text-slate-600"}`}>
                              {catWing.subtitle}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. TITLE & SLUG */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800 uppercase">
                        Service Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            title: val,
                            slug: prev.slug || val.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
                          }));
                        }}
                        placeholder="e.g. Structure Duplex Building"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800 uppercase">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        placeholder="e.g. structure-duplex-building"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* 3. SHORT DESCRIPTION (HOMEPAGE CARD TEXT) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 uppercase flex items-center justify-between">
                      <span>Homepage Card Short Description <span className="text-rose-500">*</span></span>
                      <span className="text-[10px] text-slate-400 font-normal">Displayed on Homepage carousel</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.shortDesc}
                      onChange={(e) =>
                        setFormData({ ...formData, shortDesc: e.target.value })
                      }
                      placeholder="e.g. Turnkey luxury steel structure duplex homes and multi-level modern villas. 50% faster construction, column-free interior flexibility, and superior seismic safety."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white leading-relaxed"
                    />
                  </div>

                  {/* 4. PHOTO UPLOAD (CLEAN - NO RAW LOCALHOST URL BOX) */}
                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5 truncate">
                        <FileImage className="w-4 h-4 text-[#E5A53D] shrink-0" />
                        <span>Service Cover Photo</span>
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium shrink-0">Device Upload</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                      <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 shadow-2xs">
                        <Image
                          src={imagePreview}
                          alt="Service preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5 w-full">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />

                        <button
                          type="button"
                          disabled={isUploading}
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#E5A53D] hover:bg-amber-50/50 text-slate-900 font-bold text-xs transition-colors shadow-2xs w-full cursor-pointer active:scale-98"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#E5A53D] shrink-0" />
                          <span className="truncate">{isUploading ? "Uploading Photo..." : "Choose File from Device"}</span>
                        </button>

                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">Photo selected &amp; ready to publish</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. KEY CAPABILITIES CHECKLIST BUILDER (THE HOMEPAGE CHECKMARKS) */}
                  <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <label className="text-xs font-black text-slate-900 uppercase block truncate">
                          Key Capabilities Checklist
                        </label>
                        <p className="text-[10px] text-slate-500">
                          The first 4 capabilities appear on the Homepage card with gold checkmarks.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                        {formData.features.length} Items
                      </span>
                    </div>

                    {/* Capability Input Field */}
                    <div className="flex gap-2 w-full min-w-0">
                      <input
                        type="text"
                        value={newCapability}
                        onChange={(e) => setNewCapability(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCapability();
                          }
                        }}
                        placeholder="e.g. Expansive Column-Free Spaces"
                        className="flex-1 min-w-0 w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-hidden focus:border-[#E5A53D]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCapability}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>

                    {/* Capabilities List */}
                    <div className="space-y-1.5 max-h-40 overflow-y-auto overflow-x-hidden pr-1">
                      {formData.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-slate-200/80 text-xs min-w-0"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="w-4 h-4 rounded-full bg-[#E5A53D] text-neutral-950 font-black text-[9px] flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <span className="text-slate-800 font-medium truncate">{feat}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCapability(idx)}
                            className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 6. ADVANCED SERVICE PAGE DETAILS (COLLAPSIBLE) */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedDetails(!showAdvancedDetails)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                    >
                      <span>Full Service Landing Page Details (Headlines &amp; Paragraphs)</span>
                      {showAdvancedDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showAdvancedDetails && (
                      <div className="p-3.5 space-y-3 bg-white border-t border-slate-200">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">Tagline / Header Subtitle</label>
                          <input
                            type="text"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            placeholder="e.g. Earthquake-resilient steel frame duplex houses..."
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">Main Headline</label>
                          <input
                            type="text"
                            value={formData.mainHeadline}
                            onChange={(e) => setFormData({ ...formData, mainHeadline: e.target.value })}
                            placeholder="e.g. Modern Steel Frame Duplex Buildings Engineered for Luxury, Speed & Safety"
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">Executive Introduction Paragraph</label>
                          <textarea
                            rows={2}
                            value={formData.introParagraph}
                            onChange={(e) => setFormData({ ...formData, introParagraph: e.target.value })}
                            placeholder="Detailed overview for the service page..."
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* RIGHT COLUMN: REAL-TIME HOMEPAGE CARD LIVE PREVIEW (5 Cols) */}
                <div className="lg:col-span-5 space-y-2 min-w-0 w-full">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A53D]" />
                      <span>Live Homepage Card Preview</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Real-Time Sync
                    </span>
                  </div>

                  {/* EXACT REPLICA OF THE HOMEPAGE SERVICE CARD */}
                  <div className="bg-[#FAF9F6] p-4 sm:p-5 rounded-2xl border border-neutral-300 shadow-md flex flex-col justify-between space-y-4">
                    <div className="space-y-3.5">
                      
                      {/* Card Image with Hover Badges */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl bg-neutral-900 shadow-xs">
                        <Image
                          src={imagePreview}
                          alt="Live Preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        
                        {/* Top Badges */}
                        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                          <div className={`px-2 py-0.5 rounded-sm text-[9.5px] uppercase tracking-wider shadow-sm truncate ${getCategoryInfo(formData.category, formData.slug).pillClass}`}>
                            {getCategoryInfo(formData.category, formData.slug).label}
                          </div>

                          <div className="px-2 py-0.5 rounded-sm bg-neutral-950/85 backdrop-blur-sm text-white text-[9.5px] font-bold uppercase tracking-wider border border-white/10 shadow-xs flex items-center gap-1">
                            <span>Details</span>
                            <span>↗</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Title & Description */}
                      <div className="space-y-1.5">
                        <h4 className="text-base sm:text-lg font-black text-neutral-950 leading-snug">
                          {formData.title || "Your Service Title Here"}
                        </h4>
                        <p className="text-xs text-neutral-600 line-clamp-2 font-light leading-relaxed">
                          {formData.shortDesc || "Your short description will appear here on the homepage card carousel..."}
                        </p>
                      </div>

                      {/* Capabilities Checklist Preview */}
                      <div className="space-y-1.5 pt-2 border-t border-neutral-200/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          Key Capabilities:
                        </span>
                        <ul className="space-y-1">
                          {(formData.features.slice(0, 4)).map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-[11px] text-neutral-700 font-medium">
                              <span className="w-3.5 h-3.5 rounded-full bg-[#E5A53D] text-neutral-950 flex items-center justify-center shrink-0 text-[8px] font-black shadow-xs">
                                ✓
                              </span>
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                        {formData.features.length > 4 && (
                          <span className="text-[10px] font-semibold text-neutral-500 block pt-0.5">
                            + {formData.features.length - 4} more specialized capabilities
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-neutral-200/70 flex items-center justify-between text-neutral-950">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        View Full Service Details →
                      </span>
                      <span className="w-6 h-6 rounded-full bg-white text-neutral-950 flex items-center justify-center text-xs font-bold border border-neutral-200 shadow-2xs">
                        ↗
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center italic pt-1">
                    What you see here is exactly how this card appears to visitors on the Homepage.
                  </p>
                </div>

              </div>

              {/* Submit / Cancel Footer Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-black text-xs sm:text-sm transition-colors shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingService ? "Update & Sync Service" : "Save & Publish to Homepage"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}