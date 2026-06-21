"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HookSvg from "./HookSvg";

type PullPhase = "drop" | "catch" | "pull" | "release";

type PullDetail = {
  progress?: number;
  active?: number;
  phase?: PullPhase;
  velocity?: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function getPhase(progress: number): PullPhase {
  if (progress < 0.34) return "drop";
  if (progress < 0.5) return "catch";
  if (progress < 0.86) return "pull";
  return "release";
}

export default function HookRig() {
  const reelRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  const lastPhaseRef = useRef<PullPhase>("release");
  const lastActiveRef = useRef<number | null>(null);

  useEffect(() => {
    const reel = reelRef.current;
    const rope = ropeRef.current;
    const hook = hookRef.current;

    if (!reel || !rope || !hook) return;

    const glow = glowRef.current;

    const sparks = sparksRef.current
      ? (Array.from(sparksRef.current.children) as HTMLElement[])
      : [];

    const redParts = hook.querySelectorAll<SVGPathElement>("[data-hook-red]");
    const hookBody = hook.querySelector<SVGGElement>("[data-hook-body]");

    const IDLE_LENGTH = 50;
    const MAX_DROP = 335;

    /**
     * مهم:
     * الـ SVG viewBox عرضه 687
     * الخط العمودي جوه الـ SVG عند x حوالي 575
     * فلو عرض الـ SVG = 72
     * نقطة الربط = 575 / 687 * 72 = حوالي 60px
     * والـ rope عرضه 4px، مركزه 2px
     * إذن left = 2 - 60 = -58
     */
    const HOOK_ATTACH_LEFT = -58;
    const HOOK_ATTACH_TOP_OVERLAP = -1;

    const state = {
      length: IDLE_LENGTH,
      scale: 1,
      ropeScale: 1,
      glowOpacity: 0.22,
      glowScale: 1,
      hookStretch: 1,
    };

    gsap.set(hook, {
      left: HOOK_ATTACH_LEFT,
      y: IDLE_LENGTH + HOOK_ATTACH_TOP_OVERLAP,
      x: 0,
      rotate: 0,
      scale: 1,
      transformOrigin: "83% 0%",
      force3D: true,
      zIndex: 10000,
    });

    gsap.set(rope, {
      height: IDLE_LENGTH,
      scaleX: 1,
      transformOrigin: "top center",
      force3D: true,
    });

    if (hookBody) {
      gsap.set(hookBody, {
        transformOrigin: "83% 0%",
        transformBox: "fill-box",
        y: 0,
        scaleY: 1,
      });
    }

    gsap.set(glow, {
      opacity: 0.22,
      scale: 1,
    });

    gsap.set(sparks, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0,
    });

    const render = () => {
      gsap.set(rope, {
        height: state.length,
        scaleX: state.ropeScale,
      });

      /**
       * أهم نقطة:
       * الخطاف بياخد نفس طول الخيط فقط.
       * مفيش x ومفيش rotate عشان الخط يفضل راكب صح.
       */
      gsap.set(hook, {
        y: state.length + HOOK_ATTACH_TOP_OVERLAP,
        x: 0,
        rotate: 0,
        scale: state.scale,
      });

      if (hookBody) {
        gsap.set(hookBody, {
          y: 0,
          scaleY: state.hookStretch,
        });
      }

      if (glow) {
        gsap.set(glow, {
          opacity: state.glowOpacity,
          scale: state.glowScale,
        });
      }
    };

    const moveRig = (
      vars: Partial<typeof state>,
      duration = 0.22,
      ease = "power3.out"
    ) => {
      gsap.to(state, {
        ...vars,
        duration,
        ease,
        overwrite: "auto",
        onUpdate: render,
      });
    };

    const spin = gsap.to(reel, {
      rotate: 360,
      duration: 4,
      ease: "linear",
      repeat: -1,
    });

    const idle = () => {
      spin.timeScale(1);

      moveRig(
        {
          length: IDLE_LENGTH,
          scale: 1,
          ropeScale: 1,
          glowOpacity: 0.22,
          glowScale: 1,
          hookStretch: 1,
        },
        0.35,
        "power3.out"
      );

      lastPhaseRef.current = "release";
      lastActiveRef.current = null;
    };

    const catchFlash = (active?: number) => {
      if (active === lastActiveRef.current) return;

      lastActiveRef.current = active ?? null;

      gsap.fromTo(
        redParts,
        { fill: "#ff3344" },
        {
          fill: "#A61C24",
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.02,
          overwrite: true,
        }
      );

      gsap.fromTo(
        state,
        {
          scale: 1.12,
          ropeScale: 1.55,
          hookStretch: 1.04,
        },
        {
          scale: 1,
          ropeScale: 1,
          hookStretch: 1,
          duration: 0.55,
          ease: "elastic.out(1, 0.35)",
          overwrite: true,
          onUpdate: render,
        }
      );

      gsap.fromTo(
        sparks,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        },
        {
          opacity: 0,
          x: (i) => -28 - i * 9,
          y: (i) => (i - 3) * 15,
          scale: 0,
          duration: 0.75,
          stagger: 0.035,
          ease: "power3.out",
          overwrite: true,
        }
      );
    };

    const onPull = (event: Event) => {
      const detail = (event as CustomEvent<PullDetail>).detail || {};
      const p = clamp01(detail.progress ?? 0);
      const phase = detail.phase || getPhase(p);
      const velocity = Math.abs(detail.velocity ?? 0);

      const rigDuration =
        velocity > 4200 ? 0.055 :
        velocity > 2600 ? 0.085 :
        velocity > 1400 ? 0.13 :
        0.22;

      const rigEase = velocity > 2600 ? "power4.out" : "power3.out";

      /**
       * ينزل -> يمسك -> يشد لفوق -> يرجع يستعد.
       */
      const dropAmount =
        p < 0.34
          ? p / 0.34
          : p < 0.56
          ? 1
          : Math.max(0, 1 - (p - 0.56) / 0.44);

      const pullPower = Math.sin(p * Math.PI);
      const snap = phase === "catch" ? 1 : 0;

      const length = IDLE_LENGTH + dropAmount * MAX_DROP;

      spin.timeScale(1 + pullPower * 3.4 + snap * 2);

      moveRig(
        {
          length,
          scale: 1 + pullPower * 0.045 + snap * 0.04,
          ropeScale: 1 + pullPower * 0.42 + snap * 0.22,
          glowOpacity: 0.22 + pullPower * 0.72 + snap * 0.18,
          glowScale: 1 + pullPower * 0.8,
          hookStretch: 1 + pullPower * 0.035,
        },
        rigDuration,
        rigEase
      );

      if (phase === "catch" && lastPhaseRef.current !== "catch") {
        catchFlash(detail.active);
      }

      lastPhaseRef.current = phase;
    };

    window.addEventListener("hook:pull", onPull);
    window.addEventListener("hook:idle", idle);

    render();
    idle();

    return () => {
      spin.kill();
      gsap.killTweensOf(state);

      window.removeEventListener("hook:pull", onPull);
      window.removeEventListener("hook:idle", idle);
    };
  }, []);

  return (
    <div className="fixed right-0 top-[58px] z-[9999] hidden h-[calc(100vh-58px)] w-[124px] pointer-events-none lg:block">
      <div className="absolute right-3 top-2 z-[10002]">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-hook-red/50 bg-[#070707]/95 shadow-[0_0_42px_rgba(200,0,0,0.3)]">
          <div
            ref={reelRef}
            className="relative h-8 w-8 rounded-full border-2 border-hook-red/70 will-change-transform"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-hook-red/90" />
            </div>

            <div className="absolute left-1/2 top-1/2 h-[1px] w-full -translate-x-1/2 -translate-y-1/2 bg-hook-red/40" />
            <div className="absolute left-1/2 top-1/2 h-full w-[1px] -translate-x-1/2 -translate-y-1/2 bg-hook-red/40" />
          </div>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-black tracking-[0.3em] text-hook-red/50">
            HOOK
          </div>
        </div>
      </div>

      <div className="absolute right-[42px] top-[45px] z-[10001] w-[4px]">
        <div
          ref={ropeRef}
          className="h-[50px] w-full origin-top rounded-full bg-gradient-to-b from-hook-red/20 via-hook-red/95 to-hook-red/55 shadow-[0_0_18px_rgba(200,0,0,0.55)] will-change-transform"
        />

        <div
          ref={hookRef}
          className="absolute top-0 z-[10003] will-change-transform"
        >
          <div
            ref={glowRef}
            className="absolute -inset-16 rounded-full bg-hook-red/20 blur-3xl"
          />

          <div className="relative z-10 drop-shadow-[0_0_38px_rgba(200,0,0,0.95)]">
            <HookSvg width={72} height={210} />
          </div>

          <div ref={sparksRef} className="absolute left-10 top-[120px]">
            {[...Array(7)].map((_, i) => (
              <span
                key={i}
                className="absolute block h-2 w-2 rounded-full bg-hook-red opacity-0 shadow-[0_0_12px_rgba(200,0,0,0.9)]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}