"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { authApi } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await authApi.login({ email, password });
      router.push("/admin");
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to sign in. Please verify your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col justify-between p-3.5 sm:p-6 text-slate-800 font-sans">
      {/* Top Bar with Back to Live Site */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between pt-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Live Website</span>
        </Link>

        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#E5A53D]" />
          <span>Secure Admin Portal</span>
        </span>
      </div>

      {/* Center Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-md p-5 sm:p-8 space-y-5">
          {/* Logo & Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E5A53D] text-slate-950 shadow-xs mb-1">
              <Building2 className="w-6 h-6 text-slate-950" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              NIRMAN BSB <span className="text-[#E5A53D]">CMS</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Sign in to manage services, projects, client leads &amp; site content
            </p>
          </div>

          {/* Error message alert */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Staff / Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A53D] focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A53D] focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-[#E5A53D] focus:ring-[#E5A53D]"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#E5A53D] hover:bg-[#d89832] text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating with BSB Server...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-400 pb-1">
        © {new Date().getFullYear()} Nirman BSB • Bangladesh Steel Builders Ltd. Admin Console.
      </div>
    </div>
  );
}
