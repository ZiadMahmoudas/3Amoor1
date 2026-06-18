"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HookPullSection({
  children,
  index = 1,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const panel = section.querySelector(".hook-panel");
      const hook = section.querySelector(".hook-icon");
      const rope = section.querySelector(".hook-rope");

      gsap.set(panel, {
        y: 120,
        scale: 0.96,
        opacity: 0.65,
      });

      gsap.set(hook, {
        y: -120,
        rotate: -10,
      });

      gsap.set(rope, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tl.to(
        hook,
        {
          y: 180,
          rotate: 8,
          ease: "none",
        },
        0
      )
        .to(
          rope,
          {
            scaleY: 1,
            ease: "none",
          },
          0
        )
        .to(
          panel,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          },
          0.1
        );
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="hook-pull-section"
      style={{ zIndex: index }}
    >
      <div className="hook-visual" aria-hidden="true">
        <span className="hook-rope" />
        <span className="hook-icon">
          <svg
            width="34"
            height="58"
            viewBox="0 0 34 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 2V30C17 41 9 47 2 42"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M17 30C17 46 31 47 31 34"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      <div className="hook-panel">{children}</div>
    </div>
  );
}