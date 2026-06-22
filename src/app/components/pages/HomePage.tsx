"use client";

import { Navbar, Footer, ScrollToTop } from "@/app/components/layout";
import { HookRig, GsapCardFields } from "@/app/components/hook";
import PinSectionsFlow from "@/app/components/hook/PinSectionsFlow";
import {
  HeroSection,
  MarqueeSection,
  AboutSection,
  ServicesSection,
  ProcessSection,
  StatsSection,
  PartnersSection,
  FAQSection,
  CTASection,
  ContactSection,
} from "@/app/components/sections/home";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <HookRig />

      {/* لو ده بيحرك كروت بس خليه، لو بيبعت hook:pull شيله */}
      <GsapCardFields />

      <PinSectionsFlow />

      <section className="hook-scene">
        <HeroSection />
      </section>

      <section className="hook-scene">
        <MarqueeSection />
      </section>

      <section className="hook-scene">
        <AboutSection />
      </section>

      <section className="hook-scene">
        <ServicesSection />
      </section>

      <section className="hook-scene">
        <ProcessSection />
      </section>

      <section className="hook-scene">
        <StatsSection />
      </section>

      <section className="hook-scene">
        <PartnersSection />
      </section>

      <section className="hook-scene">
        <FAQSection />
      </section>

      <section className="hook-scene">
        <CTASection />
      </section>

      <section className="hook-scene">
        <ContactSection />
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}