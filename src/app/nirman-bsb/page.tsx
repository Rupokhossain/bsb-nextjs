import React from "react";
import NirmanBsbContent from "./NirmanBsbContent";

async function getNirmanContent() {
  const urls = [
    "http://127.0.0.1:5000/api/v1/site-content",
    "http://localhost:5000/api/v1/site-content",
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      });
      if (res.ok) {
        const json = await res.json();
        return json?.data?.dictionary?.nirman || null;
      }
    } catch {
      // try next
    }
  }
  return null;
}

export const metadata = {
  title: "Nirman BSB | Steel Building Consulting & Structural Feasibility in Bangladesh",
  description:
    "Professional steel building consulting by Nirman BSB, the specialized engineering advisory arm of Bangladesh Steel Builders Ltd. Structural design optimization, BOQ budgeting, and pre-construction feasibility.",
};

export default async function NirmanBSBPage() {
  const initialData = await getNirmanContent();
  return <NirmanBsbContent initialData={initialData} />;
}
