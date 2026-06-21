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
      <GsapCardFields />
      <PinSectionsFlow />

      <section className="pin-card hook-scene"><HeroSection /></section>
      <section className="pin-card hook-scene"><MarqueeSection /></section>
      <section className="pin-card hook-scene"><AboutSection /></section>

      <ServicesSection  />
      <ProcessSection  />

      <section className="pin-card hook-scene"><StatsSection /></section>
      <section className="pin-card hook-scene"><PartnersSection /></section>

      <FAQSection  />
      <CTASection  />
      <ContactSection  />

      <Footer />
      <ScrollToTop />
    </main>
  );
}
