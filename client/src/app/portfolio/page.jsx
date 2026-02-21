"use client";

import PortfolioHero from "@/components/portfolio/PortfolioHero";
import ProjectStories from "@/components/portfolio/ProjectStories";
import { motion } from "framer-motion";

export default function PortfolioPage() {
  return (
    <main className="bg-[var(--bg-deep)] min-h-screen overflow-hidden">
      {/* 1. Portfolio Hero — The Cinematic Entrance */}
      <PortfolioHero />
      
      <div className="relative">
        {/* 2. Project Stories — The Immersive Narrative Flow */}
        <div className="section-blend">
          <ProjectStories />
        </div>
        {/* 3. Global FinalCTA handled in Layout */}
      </div>
    </main>
  );
}

