"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PullPhase = "drop" | "catch" | "pull" | "release";

function getPhase(progress: number): PullPhase {
  if (progress < 0.3) return "drop";
  if (progress < 0.43) return "catch";
  if (progress < 0.86) return "pull";
  return "release";
}

function emitHookPull(progress: number, active: number) {
  window.dispatchEvent(
    new CustomEvent("hook:pull", {
      detail: {
        progress,
        active,
        phase: getPhase(progress),
      },
    })
  );
}

function emitHookIdle() {
  window.dispatchEvent(new CustomEvent("hook:idle"));
}

function getTopLevelSections() {
  const main = document.querySelector("main");
  if (!main) return [];

  return Array.from(main.children).filter(
    (item): item is HTMLElement => item instanceof HTMLElement && item.tagName === "SECTION"
  );
}

export default function PinSectionsFlow() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pinnedSections = gsap.utils.toArray<HTMLElement>(".pin-card");
        const hookSections = getTopLevelSections();

        emitHookIdle();

        pinnedSections.forEach((section, index) => {
          const nextSection = pinnedSections[index + 1];
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
            refreshPriority: 1,
          });
        });

        hookSections.forEach((section, index) => {
          const nextSection = hookSections[index + 1];
          if (!nextSection) return;

          ScrollTrigger.create({
            trigger: nextSection,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: 3,
            onEnter: () => emitHookPull(0, index + 1),
            onEnterBack: () => emitHookPull(1, index + 1),
            onLeave: () => emitHookIdle(),
            onLeaveBack: () => emitHookIdle(),
            onUpdate: (self) => {
              emitHookPull(self.progress, index + 1);
            },
          });
        });

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        requestAnimationFrame(refresh);

        return () => {
          window.removeEventListener("load", refresh);
          emitHookIdle();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        emitHookIdle();
      });

      return () => mm.revert();
    });

    return () => {
      ctx.revert();
      emitHookIdle();
    };
  }, []);

  return null;
}
