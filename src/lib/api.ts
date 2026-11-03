/**
 * Nirman BSB - Central API Client & Services
 * Connects Next.js Frontend with the Express Backend (http://localhost:5000/api/v1)
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Helper to get stored access token on client-side
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("bsb_access_token");
};

export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("bsb_access_token", token);
  }
};

export const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("bsb_access_token");
    localStorage.removeItem("bsb_user");
  }
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("bsb_user");
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("bsb_user", JSON.stringify(user));
  }
};

// Base fetch wrapper with error handling & auth header injection
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data: T; meta?: any }> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const token = getAccessToken();

  const headers: HeadersInit = {
    ...(options.headers || {}),
  };

  // Only set Content-Type to JSON if body is not FormData
  if (!(options.body instanceof FormData)) {
    (headers as any)["Content-Type"] = "application/json";
  }

  if (token) {
    (headers as any).Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const resJson = await response.json().catch(() => ({
    success: false,
    message: "Failed to parse JSON response from server.",
  }));

  if (!response.ok) {
    throw new Error(resJson.message || `Request failed with status ${response.status}`);
  }

  return resJson;
}

// ----------------------------------------------------------------------
// 1. AUTH API
// ----------------------------------------------------------------------
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await apiRequest<{
      accessToken: string;
      refreshToken: string;
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
        avatar?: string | null;
      };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (res.data?.accessToken) {
      setAccessToken(res.data.accessToken);
      setStoredUser(res.data.user);
    }
    return res.data;
  },

  getProfile: async () => {
    const res = await apiRequest("/auth/me", { method: "GET" });
    return res.data;
  },

  updateProfile: async (payload: {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    title?: string;
    password?: string;
  }) => {
    const res = await apiRequest<{
      id: string;
      name: string;
      email: string;
      role: string;
      avatar?: string | null;
    }>("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (res.data) {
      setStoredUser(res.data);
    }
    return res.data;
  },

  logout: () => {
    removeAccessToken();
  },
};

// ----------------------------------------------------------------------
// 2. DASHBOARD STATS API
// ----------------------------------------------------------------------
export const dashboardApi = {
  getStats: async () => {
    const res = await apiRequest("/dashboard/stats", { method: "GET" });
    return res.data;
  },
};

// ----------------------------------------------------------------------
// 3. LEADS CRM API
// ----------------------------------------------------------------------
export const leadsApi = {
  // Public submission (used by website quote modals)
  createLead: async (payload: {
    name: string;
    phone: string;
    email?: string;
    projectType: string;
    location: string;
    budget?: string;
    message: string;
  }) => {
    const res = await apiRequest("/leads", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res;
  },

  getAll: async (params?: { status?: string; searchTerm?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.status && params.status !== "ALL") query.append("status", params.status);
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await apiRequest(`/leads${qs}`, { method: "GET" });
    return res;
  },

  getById: async (id: string) => {
    const res = await apiRequest(`/leads/${id}`, { method: "GET" });
    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await apiRequest(`/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  delete: async (id: string) => {
    const res = await apiRequest(`/leads/${id}`, { method: "DELETE" });
    return res;
  },
};

// ----------------------------------------------------------------------
// 4. SERVICES API
// ----------------------------------------------------------------------
export const servicesApi = {
  getAll: async (params?: { category?: string; searchTerm?: string; isPublished?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.category && params.category !== "ALL") query.append("category", params.category);
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.isPublished !== undefined) query.append("isPublished", params.isPublished.toString());

    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await apiRequest(`/services${qs}`, { method: "GET" });
    return res.data;
  },

  getBySlug: async (slug: string) => {
    const res = await apiRequest(`/services/slug/${slug}`, { method: "GET" });
    return res.data;
  },

  getById: async (id: string) => {
    const res = await apiRequest(`/services/${id}`, { method: "GET" });
    return res.data;
  },

  create: async (payload: any) => {
    const res = await apiRequest("/services", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await apiRequest(`/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  delete: async (id: string) => {
    const res = await apiRequest(`/services/${id}`, { method: "DELETE" });
    return res;
  },
};

// ----------------------------------------------------------------------
// 5. PROJECTS API
// ----------------------------------------------------------------------
export const projectsApi = {
  getAll: async (params?: { category?: string; searchTerm?: string; isFeatured?: boolean; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.category && params.category !== "ALL") query.append("category", params.category);
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.isFeatured !== undefined) query.append("isFeatured", params.isFeatured.toString());
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await apiRequest(`/projects${qs}`, { method: "GET" });
    return res;
  },

  getById: async (idOrSlug: string) => {
    const res = await apiRequest(`/projects/${idOrSlug}`, { method: "GET" });
    return res.data;
  },

  create: async (payload: any) => {
    const res = await apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await apiRequest(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  delete: async (id: string) => {
    const res = await apiRequest(`/projects/${id}`, { method: "DELETE" });
    return res;
  },
};

// ----------------------------------------------------------------------
// 6. SITE CONTENT (CMS) API
// ----------------------------------------------------------------------
export const siteContentApi = {
  getAll: async () => {
    const res = await apiRequest("/site-content", {
      method: "GET",
      cache: "no-store",
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
    return res.data;
  },

  getBySection: async (section: string) => {
    const res = await apiRequest(`/site-content/${section}`, {
      method: "GET",
      cache: "no-store",
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
    return res.data;
  },

  updateSection: async (section: string, data: any) => {
    const res = await apiRequest(`/site-content/${section}`, {
      method: "PATCH",
      body: JSON.stringify({ data }),
    });
    return res.data;
  },
};

// ----------------------------------------------------------------------
// 7. COMPANY SETTINGS API
// ----------------------------------------------------------------------
export const settingsApi = {
  get: async () => {
    const res = await apiRequest("/settings", { method: "GET" });
    return res.data;
  },

  update: async (payload: any) => {
    const res = await apiRequest("/settings", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return res.data;
  },
};

// ----------------------------------------------------------------------
// 8. IMAGE UPLOAD API
// ----------------------------------------------------------------------
export const uploadApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await apiRequest<{ url: string; storage: string }>("/upload/image", {
      method: "POST",
      body: formData,
    });

    // If local storage URL like /uploads/xyz, prefix with backend base URL if needed
    let finalUrl = res.data.url;
    if (finalUrl.startsWith("/uploads/")) {
      const backendOrigin = API_BASE_URL.replace("/api/v1", "");
      finalUrl = `${backendOrigin}${finalUrl}`;
    }

    return { ...res.data, url: finalUrl };
  },
};
