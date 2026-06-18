"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { emitHookPull } from "./hookBus";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HookPullSection({
  children,
  delay = 0,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  index?: number;
}) {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const catchRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const panel = panelRef.current;
      const catchPoint = catchRef.current;
      const line = lineRef.current;
      if (!wrapper || !panel) return;

      gsap.set(wrapper, { zIndex: index });
      gsap.set(panel, {
        y: -260,
        scale: 1.5,
        opacity: 0,
        rotateX: 12,
        filter: "blur(12px)",
        transformOrigin: "center top",
        clipPath: "inset(18% 0% 0% 0% round 34px)",
      });
      gsap.set(catchPoint, { scale: 0.5, opacity: 0.18 });
      gsap.set(line, { scaleX: 0, transformOrigin: "right center" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapper,
          start: "top 92%",
          end: "top 28%",
          scrub: 1.1,
          onUpdate: (self) => emitHookPull({ id, progress: self.progress }),
          onLeaveBack: () => emitHookPull({ id, progress: 0 }),
          onLeave: () => emitHookPull({ id, progress: 1 }),
        },
      });

      tl.to(catchPoint, { scale: 1.65, opacity: 1, duration: 0.24 }, 0.08)
        .to(line, { scaleX: 1, duration: 0.28 }, 0.12)
        .to(
          panel,
          {
            y: -36,
            scale: 1.015,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 0.68,
            ease: "power3.out",
          },
          Math.max(0.05, delay)
        )
        .to(panel, { y: 0, scale: 1, duration: 0.22, ease: "back.out(1.7)" }, 0.78)
        .to(catchPoint, { scale: 0.85, opacity: 0.32, duration: 0.2 }, 0.78)
        .to(line, { scaleX: 0.18, opacity: 0.4, duration: 0.2 }, 0.78);
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={`hook-card-section relative ${className}`}>
      <div className="hook-catch-ui absolute right-[-44px] top-1/2 z-30 hidden -translate-y-1/2 items-center lg:flex" aria-hidden="true">
        <div ref={catchRef} className="h-3 w-3 rounded-full bg-hook-red shadow-[0_0_22px_rgba(200,0,0,0.95)]" />
        <div ref={lineRef} className="h-[2px] w-14 bg-gradient-to-l from-transparent to-hook-red" />
      </div>

      <div ref={panelRef} className="hook-card-panel relative will-change-transform">
        {children}
      </div>
    </div>
  );
}
