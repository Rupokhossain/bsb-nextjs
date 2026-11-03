import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TeamSection from "@/components/home/TeamSection";
import ClientsSection from "@/components/home/ClientsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Footer from "@/components/common/Footer";

async function getSiteContent() {
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
        if (json?.data?.dictionary) {
          return json.data.dictionary;
        }
      }
    } catch {
      // try next url
    }
  }
  return null;
}

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection initialData={content?.home} />

      {/* About Section */}
      <AboutSection initialData={content?.home} />

      {/* Services Slider Section */}
      <ServicesSection />

      {/* How We Work Process Section & Built With Intent Full-width Banner */}
      <ProcessSection initialData={content?.home} />

      <ProjectsPreview />

      {/* The Team Behind Every Home & Team Grid */}
      <TeamSection initialData={content?.home} />

      {/* Our Happy Clients & Industrial Partners */}
      <ClientsSection initialData={content?.clients} />

      {/* Testimonials Slider Section */}
      {/* <TestimonialsSection /> */}

      {/* Projects Showcase with "View All Projects" button */}

      {/* Footer */}
      <Footer />
    </main>
  );
}
