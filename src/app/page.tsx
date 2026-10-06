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

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Services Slider Section */}
      <ServicesSection />

      {/* How We Work Process Section & Built With Intent Full-width Banner */}
      <ProcessSection />

      <ProjectsPreview />


      {/* The Team Behind Every Home & Team Grid */}
      <TeamSection />

      {/* Our Happy Clients & Industrial Partners */}
      <ClientsSection />

      {/* Testimonials Slider Section */}
      <TestimonialsSection />

      {/* Projects Showcase with "View All Projects" button */}

      {/* Footer */}
      <Footer />
    </main>
  );
}
