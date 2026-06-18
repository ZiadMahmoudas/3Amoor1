"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinSectionsFlow() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".pin-card");

      sections.forEach((section, index) => {
        const nextSection = sections[index + 1];
        if (!nextSection) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          endTrigger: nextSection,
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, []);

  return null;
}