import React from "react";
import AboutPageContent from "./AboutPageContent";

async function getAboutContent() {
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
        return json?.data?.dictionary?.about || null;
      }
    } catch {
      // try next
    }
  }
  return null;
}

export const metadata = {
  title: "About Us | Bangladesh Steel Builders Ltd. (BSB)",
  description:
    "Discover Bangladesh Steel Builders Ltd. (BSB), pioneering pre-engineered steel buildings, industrial factories, and custom structures across Bangladesh since 2009.",
};

export default async function AboutPage() {
  const initialData = await getAboutContent();
  return <AboutPageContent initialData={initialData} />;
}
