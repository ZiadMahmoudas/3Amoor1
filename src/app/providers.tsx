"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.05,
        duration: 1.6,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
        syncTouch: true,
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}