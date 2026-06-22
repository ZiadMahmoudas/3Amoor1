"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HookPullSection from "@/app/components/hook/HookPullSection";

gsap.registerPlugin(ScrollTrigger);

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const partners = [
    "Google",
    "Meta",
    "TikTok",
    "Shopify",
    "WordPress",
    "Zid",
  ];

  const line = partners.join(" × ");

  useEffect(() => {
    const section = sectionRef.current;
    const marquee = marqueeRef.current;

    if (!section || !marquee) return;

    const ctx = gsap.context(() => {
      gsap.set(marquee, {
        xPercent: 0,
        willChange: "transform",
        force3D: true,
      });

      tweenRef.current = gsap.to(marquee, {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      gsap.fromTo(
        section.querySelectorAll("[data-marquee-head]"),
        {
          y: 40,
          autoAlpha: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const speed = Math.min(4.5, 1 + velocity / 900);

          gsap.to(tweenRef.current, {
            timeScale: speed,
            duration: 0.18,
            overwrite: true,
          });

          gsap.to(tweenRef.current, {
            timeScale: 1,
            duration: 1.1,
            delay: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    }, section);

    return () => {
      tweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-40 overflow-hidden bg-[#000] py-24 lg:py-32 border-y border-white/[0.05]"
      id="partners"
    >
      <div className="">
        <HookPullSection index={16}>
          <div className="mb-12 text-center">
            <p
              data-marquee-head
              className="text-gray-500 text-sm font-bold tracking-wide mb-4"
            >
              فخورين بالعمل مع أكبر المنصات والعلامات التجارية
            </p>

            <h2
              data-marquee-head
              className="text-white text-3xl md:text-5xl font-black tracking-tight"
            >
              شركاء النجاح
            </h2>
          </div>

          <div className="relative overflow-hidden select-none">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-l from-black via-black/80 to-transparent" />

            <div
              ref={marqueeRef}
              className="flex w-max whitespace-nowrap"
              dir="ltr"
            >
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex shrink-0 items-center"
                >
                  <span
                    className="premium-marquee-text px-[4vw] text-[clamp(4rem,10vw,11rem)] font-black uppercase leading-none tracking-[-0.06em] text-transparent transition-all duration-500 hover:text-white/5"
                    style={{
                      WebkitTextStroke: "1px rgba(255,255,255,0.28)",
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        WebkitTextStrokeColor: "rgba(255,255,255,1)",
                        scale: 1.025,
                        duration: 0.45,
                        ease: "power3.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        WebkitTextStrokeColor: "rgba(255,255,255,0.28)",
                        scale: 1,
                        duration: 0.45,
                        ease: "power3.out",
                      });
                    }}
                  >
                    {line} ×
                  </span>
                </div>
              ))}
            </div>
          </div>
        </HookPullSection>
      </div>
    </section>
  );
}