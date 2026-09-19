import Navbar from "./Navbar";
import Hero from "./Hero";
import Stats from "./Stats";
import Features from "./Features";
import HowItWorks from "./HowItWorks";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <HowItWorks />

    </main>
  );
}