import React from "react";
import ContactContent from "./ContactContent";

async function getContactData() {
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
        return json?.data?.dictionary || null;
      }
    } catch {
      // try next url
    }
  }
  return null;
}

async function getCompanySettings() {
  const urls = [
    "http://127.0.0.1:5000/api/v1/settings",
    "http://localhost:5000/api/v1/settings",
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      });
      if (res.ok) {
        const json = await res.json();
        return json?.data || null;
      }
    } catch {
      // try next url
    }
  }
  return null;
}

export const metadata = {
  title: "Contact Us | Bangladesh Steel Builders Ltd. (BSB)",
  description:
    "Connect with our structural engineering team. Get in touch for pre-engineered steel buildings, modern rooftop structures, and turnkey construction across Bangladesh.",
};

export default async function ContactPage() {
  const [dictionary, settings] = await Promise.all([
    getContactData(),
    getCompanySettings(),
  ]);

  return (
    <ContactContent
      initialContact={dictionary?.contact}
      initialSettings={settings}
    />
  );
}
