import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/Hero";
import FeaturesSection from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}