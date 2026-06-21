"use client";

import { Navbar, Footer, ScrollToTop } from "@/app/components/layout";
import { WorksHero, WorksGrid } from "@/app/components/sections/works";

export default function WorksPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <WorksHero />
      <WorksGrid />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
