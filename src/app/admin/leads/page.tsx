"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Phone,
  MapPin,
  ArrowUpRight,
  Download,
  Trash2,
  Eye,
  X,
  Mail,
  Calendar,
} from "lucide-react";
import { leadsApi } from "@/lib/api";
import { useToast } from "@/components/admin/ToastContext";

interface Lead {
  id: string;
  dbId?: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  status: "New" | "In Discussion" | "Quotation Sent" | "Won / Deal Closed" | "Archived";
  date: string;
}

export default function AdminLeadsPage() {
  const { toast, confirmModal } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLeadModal, setActiveLeadModal] = useState<Lead | null>(null);

  const statuses = ["All", "New", "In Discussion", "Quotation Sent", "Won / Deal Closed"];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedStatus === "All") return matchesSearch;
    return matchesSearch && lead.status === selectedStatus;
  });

  const mapFromBackend = (item: any): Lead => {
    const statusMap: Record<string, Lead["status"]> = {
      NEW: "New",
      IN_DISCUSSION: "In Discussion",
      QUOTATION_SENT: "Quotation Sent",
      WON: "Won / Deal Closed",
      ARCHIVED: "Archived",
    };
    return {
      id: item.leadNumber || item.id.slice(0, 8),
      dbId: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email || "N/A",
      projectType: item.projectType,
      location: item.location,
      budget: item.budget || "Custom",
      message: item.message,
      status: statusMap[item.status] || "New",
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await leadsApi.getAll({ limit: 100 });
      if (res?.data && Array.isArray(res.data)) {
        setLeads(res.data.map(mapFromBackend));
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.warn("Could not load leads from backend:", err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    const lead = leads.find((l) => l.id === id || l.dbId === id);
    const targetId = lead?.dbId || lead?.id || id;

    setLeads((prev) =>
      prev.map((l) => (l.id === id || l.dbId === id ? { ...l, status: newStatus } : l))
    );

    const reverseMap: Record<string, string> = {
      New: "NEW",
      "In Discussion": "IN_DISCUSSION",
      "Quotation Sent": "QUOTATION_SENT",
      "Won / Deal Closed": "WON",
      Archived: "ARCHIVED",
    };

    try {
      await leadsApi.update(targetId, { status: reverseMap[newStatus] || "NEW" });
      toast.success(`Status updated to "${newStatus}"`, lead?.name || "Client Lead");
    } catch (err: any) {
      console.warn("Failed to update status in backend:", err);
      toast.error("Failed to sync status with server.");
    }
  };

  const handleDelete = async (id: string) => {
    const lead = leads.find((l) => l.id === id || l.dbId === id);
    const confirmed = await confirmModal({
      title: "Delete Lead Record",
      message: `Are you sure you want to delete inquiry for "${lead?.name || id}"? This action cannot be undone.`,
      confirmText: "Yes, Delete Record",
      cancelText: "Cancel",
      isDestructive: true,
    });

    if (confirmed) {
      const targetId = lead?.dbId || lead?.id || id;
      try {
        await leadsApi.delete(targetId);
        toast.success("Lead record has been removed successfully.");
        await fetchLeads();
      } catch (err: any) {
        console.warn("Backend lead delete error:", err);
        toast.error(err.message || "Failed to delete lead from database.");
      }

      if (activeLeadModal?.id === id || activeLeadModal?.dbId === id) {
        setActiveLeadModal(null);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Phone,Email,Project,Location,Budget,Status,Date\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.phone}","${l.email}","${l.projectType}","${l.location}","${l.budget}","${l.status}","${l.date}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Nirman_BSB_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported to CSV file successfully.");
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Client Inquiries &amp; Quotation Leads
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Real-time prospective client tracking from Get a Quote forms and consultations.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-colors border border-slate-300 shadow-2xs shrink-0 cursor-pointer self-start sm:self-auto active:scale-98"
        >
          <Download className="w-4 h-4 text-[#E5A53D]" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar: Horizontal Touch Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
        {/* Horizontal scrollable status pills for phone users */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0 cursor-pointer ${
                selectedStatus === status
                  ? "bg-[#E5A53D] text-slate-950 shadow-2xs font-black"
                  : "bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative min-w-full md:min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, phone, location..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#E5A53D] focus:bg-white"
          />
        </div>
      </div>

      {/* Content Area: Loading, Empty, or Data */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-full border-3 border-slate-200 border-t-[#E5A53D] animate-spin" />
          <p className="text-xs sm:text-sm font-bold text-slate-600">Loading client inquiries from database...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-16 px-4 text-center rounded-2xl bg-white border border-dashed border-slate-300 shadow-2xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E5A53D]/10 text-[#E5A53D] flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {searchQuery || selectedStatus !== "All" ? "No Matching Queries Found" : "No Client Inquiries Found"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {searchQuery || selectedStatus !== "All"
                ? "No client inquiries match your selected filters. Try clearing your search query or status filter."
                : "Real-time client inquiries submitted through the website (Contact Us, Consultation, and Get a Quote forms) will appear here."}
            </p>
          </div>
          {(searchQuery || selectedStatus !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("All");
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* A) MOBILE-FIRST LEAD CARDS (Optimized for Smartphone Users) */}
          <div className="md:hidden space-y-3">
            {filteredLeads.map((lead) => {
              const cleanPhone = lead.phone.replace(/[^0-9]/g, "");

              return (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                >
                  {/* Card Header: Client Name, ID & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#E5A53D]/15 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 border border-[#E5A53D]/30">
                        {lead.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-slate-950 text-base">{lead.name}</span>
                          {lead.status === "New" && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {lead.id} • {lead.date}
                        </span>
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value as Lead["status"])
                      }
                      className={`text-[11px] font-bold uppercase rounded-lg px-2 py-1 border transition-colors cursor-pointer focus:outline-hidden ${
                        lead.status === "New"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : lead.status === "In Discussion"
                          ? "bg-[#E5A53D]/20 text-slate-950 border-[#E5A53D]/50 font-black"
                          : lead.status === "Quotation Sent"
                          ? "bg-purple-50 text-purple-800 border-purple-200"
                          : lead.status === "Won / Deal Closed"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-300"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Discussion">Discussion</option>
                      <option value="Quotation Sent">Quote Sent</option>
                      <option value="Won / Deal Closed">Won</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  {/* Card Body: Project, Budget & Requirement preview */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900">
                      <span className="truncate">{lead.projectType}</span>
                      <span className="text-[#E5A53D] font-black shrink-0 ml-2">{lead.budget}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E5A53D] shrink-0" />
                      <span className="truncate">{lead.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-normal line-clamp-2 pt-1 border-t border-slate-200/60">
                      &ldquo;{lead.message}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: 1-Tap Connect Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Assalamu%20Alaikum%20${encodeURIComponent(
                        lead.name
                      )},%20thank%20you%20for%20contacting%20Bangladesh%20Steel%20Builders%20Ltd.%20Regarding%20your%20${encodeURIComponent(
                        lead.projectType
                      )}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs active:scale-98"
                    >
                      <span>WhatsApp Chat</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 active:scale-98"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-600" />
                      <span>Call</span>
                    </a>

                    <button
                      onClick={() => setActiveLeadModal(lead)}
                      title="View In-Depth Message"
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-98 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(lead.id)}
                      title="Delete Lead"
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 active:scale-98 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* B) DESKTOP CRM TABLE (Visible on Tablet/Laptop/Desktop) */}
          <div className="hidden md:block rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-black tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3.5">Client Name &amp; Contact</th>
                    <th className="py-2.5 px-3.5">Project &amp; Location</th>
                    <th className="py-2.5 px-3.5">Estimated Budget</th>
                    <th className="py-2.5 px-3.5">Lead Status</th>
                    <th className="py-2.5 px-3.5">Date</th>
                    <th className="py-2.5 px-3.5 text-right">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredLeads.map((lead) => {
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Name & Contact */}
                        <td className="py-2.5 px-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-950 text-sm sm:text-base">{lead.name}</span>
                            {lead.status === "New" && (
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                            )}
                          </div>
                          <div className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {lead.phone}
                            </span>
                          </div>
                        </td>

                        {/* Project & Location */}
                        <td className="py-2.5 px-3.5">
                          <div className="font-bold text-slate-900 text-sm">{lead.projectType}</div>
                          <div className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#E5A53D] shrink-0" />
                            {lead.location}
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="py-2.5 px-3.5 font-black text-slate-950 text-sm whitespace-nowrap">
                          {lead.budget}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-2.5 px-3.5 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as Lead["status"])
                            }
                            className={`text-xs sm:text-sm font-bold uppercase rounded-md px-2.5 py-1 border transition-colors cursor-pointer focus:outline-hidden ${
                              lead.status === "New"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : lead.status === "In Discussion"
                                ? "bg-[#E5A53D]/20 text-slate-950 border-[#E5A53D]/50 font-black"
                                : lead.status === "Quotation Sent"
                                ? "bg-purple-50 text-purple-800 border-purple-200"
                                : lead.status === "Won / Deal Closed"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-slate-100 text-slate-600 border-slate-300"
                            }`}
                          >
                            <option value="New">New Lead</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Quotation Sent">Quotation Sent</option>
                            <option value="Won / Deal Closed">Won / Deal Closed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-2.5 px-3.5 text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">
                          {lead.date}
                        </td>

                        {/* Connect Actions */}
                        <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setActiveLeadModal(lead)}
                              title="View In-Depth Message"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <a
                              href={`https://wa.me/${cleanPhone}?text=Assalamu%20Alaikum%20${encodeURIComponent(
                                lead.name
                              )},%20thank%20you%20for%20contacting%20Bangladesh%20Steel%20Builders%20Ltd.%20Regarding%20your%20${encodeURIComponent(
                                lead.projectType
                              )}...`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                            >
                              <span>WhatsApp</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => handleDelete(lead.id)}
                              title="Delete Lead"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-500 text-slate-600 hover:text-white transition-colors cursor-pointer"
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
        </>
      )}

      {/* LEAD DETAILS & MESSAGE MODAL */}
      {activeLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-6 space-y-3.5 my-6 animate-in fade-in zoom-in-95 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  {activeLeadModal.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {activeLeadModal.id} • {activeLeadModal.date}
                </p>
              </div>
              <button
                onClick={() => setActiveLeadModal(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block">Phone</span>
                  <a
                    href={`tel:${activeLeadModal.phone}`}
                    className="font-bold text-slate-900 hover:text-[#E5A53D]"
                  >
                    {activeLeadModal.phone}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block">Email</span>
                  <span className="font-semibold text-slate-900 truncate block">
                    {activeLeadModal.email}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block">Project</span>
                  <span className="font-bold text-slate-900">
                    {activeLeadModal.projectType}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block">Budget</span>
                  <span className="font-bold text-[#E5A53D]">
                    {activeLeadModal.budget}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Client Requirement Note:
                </span>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed">
                  &ldquo;{activeLeadModal.message}&rdquo;
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  onClick={() => setActiveLeadModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/${activeLeadModal.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
