"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Search,
  Edit3,
  Trash2,
  MapPin,
  X,
  Upload,
  FileImage,
  CheckCircle2,
} from "lucide-react";
import { completedProjectsData, CompletedProject } from "@/data/projects";
import { projectsApi, uploadApi } from "@/lib/api";
import { useToast } from "@/components/admin/ToastContext";

export default function AdminProjectsPage() {
  const { toast, confirmModal } = useToast();
  const [projects, setProjects] = useState<CompletedProject[]>(completedProjectsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CompletedProject | null>(null);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("/d1.jpg");

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    location: "",
    image: "/d1.jpg",
    category: "Duplex Villa",
  });

  // Dynamic Categories state
  const [categoryList, setCategoryList] = useState<string[]>([
    "Duplex Villa",
    "Duplex Pool Villa",
    "Rooftop Structure",
    "Rooftop Restaurant",
    "Rooftop Garden",
    "Industrial PEB",
    "Convention Hall",
    "Factory Shed",
  ]);

  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCustomCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    if (!categoryList.includes(trimmed)) {
      setCategoryList((prev) => [...prev, trimmed]);
    }
    setFormData((prev) => ({ ...prev, category: trimmed }));
    setNewCategoryName("");
    setShowNewCategoryInput(false);
    toast.success(`Category "${trimmed}" created & selected!`);
  };

  const categories = [
    { id: "all", label: "All Projects" },
    ...categoryList.map((cat) => ({ id: cat, label: cat })),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && project.category === selectedCategory;
  });

  const fetchProjects = async () => {
    try {
      const res = await projectsApi.getAll({ limit: 100 });
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        const loadedProjects = res.data.map((p: any) => ({
          id: p.slug || p.id,
          dbId: p.id,
          title: p.title,
          location: p.location,
          image: p.image,
          category: p.category,
        }));
        setProjects(loadedProjects);

        const projectCats = loadedProjects
          .map((p: any) => p.category)
          .filter(Boolean);
        setCategoryList((prev) => Array.from(new Set([...prev, ...projectCats])));
      }
    } catch (err) {
      console.warn("Could not fetch projects from backend:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle File Upload from Computer / Phone
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadRes = await uploadApi.uploadImage(file);
        setImagePreview(uploadRes.url);
        setFormData((prev) => ({ ...prev, image: uploadRes.url }));
        toast.success("Cover photo uploaded successfully!");
      } catch (err) {
        console.error("Upload error, using local preview:", err);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setFormData((prev) => ({ ...prev, image: previewUrl }));
        toast.warning("Preview loaded from device.");
      }
    }
  };

  const handleEdit = (project: CompletedProject) => {
    setEditingProject(project);
    setImagePreview(project.image);
    setShowNewCategoryInput(false);
    setNewCategoryName("");
    setFormData({
      id: project.id,
      title: project.title,
      location: project.location,
      image: project.image,
      category: project.category || "Duplex Villa",
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setImagePreview("/d1.jpg");
    setShowNewCategoryInput(false);
    setNewCategoryName("");
    setFormData({
      id: "",
      title: "",
      location: "",
      image: "/d1.jpg",
      category: "Duplex Villa",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const dbId = (editingProject as any).dbId || editingProject.id;
        await projectsApi.update(dbId, formData);
        toast.success("Project updated in database successfully!");
      } else {
        const newSlug = formData.id || formData.title.toLowerCase().replace(/\s+/g, "-");
        await projectsApi.create({
          slug: newSlug,
          title: formData.title,
          category: formData.category || "Duplex Villa",
          location: formData.location,
          image: formData.image,
        });
        toast.success("New project created in database successfully!");
      }
      await fetchProjects();
    } catch (err: any) {
      toast.error(err.message || "Failed to save project.");
      console.warn("Backend project save error:", err);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const toDelete = projects.find((p) => p.id === id);
    const confirmed = await confirmModal({
      title: "Remove Project",
      message: `Are you sure you want to remove "${toDelete?.title || id}" from the portfolio? This action cannot be undone.`,
      confirmText: "Yes, Remove Project",
      cancelText: "Cancel",
      isDestructive: true,
    });

    if (confirmed) {
      const dbId = (toDelete as any)?.dbId || id;
      try {
        await projectsApi.delete(dbId);
        toast.success("Project removed from database.");
        await fetchProjects();
      } catch (err: any) {
        toast.error(err.message || "Failed to delete project.");
        console.warn("Backend project delete error:", err);
      }
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Projects Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Showcase delivered duplex villas, rooftop sheds, and PEB buildings.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#E5A53D] text-slate-950 font-bold text-xs sm:text-sm hover:bg-[#d89832] transition-colors shadow-2xs shrink-0 cursor-pointer self-start sm:self-auto active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter and Search Bar: Horizontal Touch Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
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

        <div className="relative min-w-full md:min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search project title or location..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
          />
        </div>
      </div>

      {/* Projects Grid Display (Mobile Optimized Feed) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Image Preview with Category Badge */}
              <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-xs text-[#E5A53D] font-bold text-xs uppercase tracking-wider">
                  {project.category || "General Construction"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 space-y-1">
                <h3 className="font-black text-slate-950 text-base leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A53D] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </p>
              </div>
            </div>

            {/* Card Footer: Action Controls with Big Touch Targets */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-xs text-slate-400 font-mono">
                ID: {project.id}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-xl bg-white hover:bg-[#E5A53D] text-slate-700 hover:text-slate-950 border border-slate-200 transition-colors cursor-pointer active:scale-95"
                  title="Edit Project"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer active:scale-95"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT PROJECT MODAL WITH FILE UPLOAD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-6 space-y-3.5 my-6 animate-in fade-in zoom-in-95 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                {editingProject ? "Edit Project Details" : "Add New Showcase Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-sm">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Bespoke Classical Steel Duplex Villa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 uppercase">
                    Project Category
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                    className="text-xs font-bold text-[#E5A53D] hover:text-[#d89832] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showNewCategoryInput ? "Choose from list" : "+ Add New Category"}</span>
                  </button>
                </div>

                {showNewCategoryInput ? (
                  <div className="p-3 rounded-xl bg-amber-50/90 border border-[#E5A53D]/50 space-y-2 animate-in fade-in">
                    <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span>Type New Category Name:</span>
                      <button
                        type="button"
                        onClick={() => setShowNewCategoryInput(false)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustomCategory();
                          }
                        }}
                        placeholder="e.g. Modern Steel Showroom, Resort Villa..."
                        className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D]"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomCategory}
                        className="px-3.5 py-2 rounded-lg bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-xs active:scale-95"
                      >
                        Add Category
                      </button>
                    </div>
                  </div>
                ) : (
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      if (e.target.value === "__NEW__") {
                        setShowNewCategoryInput(true);
                      } else {
                        setFormData({ ...formData, category: e.target.value });
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                  >
                    {categoryList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__NEW__" className="font-bold text-[#E5A53D]">
                      + Add New Category...
                    </option>
                  </select>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-800 uppercase">
                  Location (City &amp; Zone)
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Dhanmondi, Dhaka."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
                />
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-[#E5A53D]" />
                    <span>Cover Photo (Upload from Phone/PC)</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">JPG, PNG, WEBP</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <Image
                      src={imagePreview}
                      alt="Project preview"
                      fill
                      unoptimized
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
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Photo selected &amp; ready to publish</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-bold text-sm shadow-xs cursor-pointer active:scale-98"
                >
                  {editingProject ? "Update Project" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
