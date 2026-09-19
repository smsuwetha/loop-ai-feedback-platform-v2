import Navbar from "./Navbar";
import Hero from "./Hero";
import Stats from "./Stats";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import AISection from "./AISection";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <AISection />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}