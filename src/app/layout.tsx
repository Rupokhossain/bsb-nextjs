import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Nirman BSB | Structural Engineering, Rooftop Architecture & Steel Construction",
  description:
    "Nirman BSB is the specialized structural engineering, modern rooftop architecture, steel duplex villa, and turnkey consultancy wing of Bangladesh Steel Builders Ltd.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-neutral-950 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
