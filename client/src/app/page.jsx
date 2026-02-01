import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

const TechHackathon = dynamic(() => import("@/components/home/TechHackathon"), { ssr: true });
const EvoxJourney = dynamic(() => import("@/components/home/EvoxJourney"), { ssr: true });
const EventsShowcase = dynamic(() => import("@/components/home/EventsShowcase"), { ssr: true });
const TrustedBy = dynamic(() => import("@/components/home/TrustedBy"), { ssr: true });
const ServicesSection = dynamic(() => import("@/components/home/ServicesSection"), { ssr: true });
const StatsSection = dynamic(() => import("@/components/home/StatsSection"), { ssr: true });
const TestimonialsCarousel = dynamic(() => import("@/components/home/TestimonialsCarousel"), { ssr: true });

export default function Home() {
  return (
    <main className="relative bg-[var(--bg-deep)] min-h-screen overflow-hidden">
      {/* 1. Hero — The Cinematic Entrance */}
      <Hero />

      {/* 2. Tech Hackathon — The Innovation Proof */}
      <div className="section-blend">
        <TechHackathon />
      </div>

      {/* 3. Evox Journey — The Agency Storyline */}
      <div className="section-blend section-glow overflow-hidden">
        <EvoxJourney />
      </div>

      {/* 4. Experiences Showcase — The Portfolio Highlights */}
      <div className="section-blend section-glow overflow-hidden" id="experiences">
        <EventsShowcase />
      </div>

      {/* 5. Trusted By — Global Partnerships */}
      <TrustedBy />

      {/* 6. Services — Domain Expertise */}
      <div className="section-blend section-glow overflow-hidden">
        <ServicesSection />
      </div>

      {/* 7. Stats — The Impact */}
      <StatsSection />

      {/* 8. Testimonials — Social Proof */}
      <TestimonialsCarousel />
    </main>
  );
}

