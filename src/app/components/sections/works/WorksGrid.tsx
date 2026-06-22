"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { works } from "./worksData";

gsap.registerPlugin(ScrollTrigger);

const galleryWorks = [
  {
    title: "Industrial Vibe",
    category: "Brand Identity",
    number: "01",
    href: "/works/industrial-vibe",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Void & Light",
    category: "Web Experience",
    number: "02",
    href: "/works/void-light",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Neutral Tones",
    category: "Creative Direction",
    number: "03",
    href: "/works/neutral-tones",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Future Forms",
    category: "Digital Campaign",
    number: "04",
    href: "/works/future-forms",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Kinetic Design",
    category: "Motion System",
    number: "05",
    href: "/works/kinetic-design",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Digital Strategy",
    category: "Marketing",
    number: "06",
    href: "/works/digital-strategy",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "E-Commerce Flow",
    category: "E-commerce",
    number: "07",
    href: "/works/ecommerce-flow",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Social Impact",
    category: "Social Media",
    number: "08",
    href: "/works/social-impact",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Brand System",
    category: "Branding",
    number: "09",
    href: "/works/brand-system",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Performance Ads",
    category: "Paid Ads",
    number: "10",
    href: "/works/performance-ads",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Content Engine",
    category: "Content",
    number: "11",
    href: "/works/content-engine",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Creative Lab",
    category: "Creative",
    number: "12",
    href: "/works/creative-lab",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Growth Loop",
    category: "Growth",
    number: "13",
    href: "/works/growth-loop",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Mobile First",
    category: "UX/UI",
    number: "14",
    href: "/works/mobile-first",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Campaign Room",
    category: "Campaigns",
    number: "15",
    href: "/works/campaign-room",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=90&auto=format&fit=crop",
  },
  {
    title: "Visual Story",
    category: "Production",
    number: "16",
    href: "/works/visual-story",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1800&q=90&auto=format&fit=crop",
  },
];

const galleryTitle = "THE GALLERY";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

const resetFollowBtn = (card: HTMLElement) => {
  const btn  = card.querySelector<HTMLElement>("[data-follow-btn]");
  const ring = card.querySelector<HTMLElement>("[data-follow-ring]");
  const img  = card.querySelector<HTMLImageElement>("img");
  const glow = card.querySelector<HTMLElement>("[data-card-glow]");

  if (btn)  gsap.set(btn,  { xPercent: -50, yPercent: -50, opacity: 0, visibility: "hidden", scale: 0.4, rotate: -12 });
  if (ring) gsap.set(ring, { rotate: 0 });
  if (img)  gsap.set(img,  { scale: 1, filter: "grayscale(100%) contrast(1)" });
  if (glow) gsap.set(glow, { opacity: 0, x: 0, y: 0 });
};
/* ─── pointer handlers ────────────────────────────────────────────────────── */

const handleGalleryEnter = (e: React.PointerEvent<HTMLAnchorElement>) => {
  const card = e.currentTarget;
  const btn  = card.querySelector<HTMLElement>("[data-follow-btn]");
  const ring = card.querySelector<HTMLElement>("[data-follow-ring]");
  const img  = card.querySelector<HTMLImageElement>("img");
  const glow = card.querySelector<HTMLElement>("[data-card-glow]");

  if (!btn) return;

  // ← اقتل كل الـ tweens على كل الكروت الثانية أول حاجة
  document.querySelectorAll<HTMLElement>("[data-gallery-card]").forEach((otherCard) => {
    if (otherCard === card) return;
    const otherBtn = otherCard.querySelector<HTMLElement>("[data-follow-btn]");
    if (otherBtn) {
      gsap.killTweensOf(otherBtn);
      gsap.set(otherBtn, { opacity: 0, visibility: "hidden" });
    }
  });

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.killTweensOf([btn, ring, img, glow]);

  gsap.set(btn, {
    x,
    y,
    xPercent: -50,
    yPercent: -50,
    rotate: -12,
    scale: 0.4,
    opacity: 0,
    visibility: "visible",
  });

  gsap.to(btn, {
    opacity: 1,
    scale: 1,
    rotate: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.5)",
  });

  if (ring) {
    gsap.fromTo(ring, { rotate: -90 }, {
      rotate: 360,
      duration: 0.9,
      ease: "power3.out",
    });
  }

  if (img) {
    gsap.to(img, {
      scale: 1.06,
      filter: "grayscale(0%) contrast(1.08)",
      duration: 0.85,
      ease: "power3.out",
    });
  }

  if (glow) {
    gsap.to(glow, { opacity: 1, duration: 0.35, ease: "power3.out" });
  }
};

const handleGalleryLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
  const card = e.currentTarget;
  const btn  = card.querySelector<HTMLElement>("[data-follow-btn]");
  const ring = card.querySelector<HTMLElement>("[data-follow-ring]");
  const img  = card.querySelector<HTMLImageElement>("img");
  const glow = card.querySelector<HTMLElement>("[data-card-glow]");

  if (btn) {
    gsap.to(btn, {
      opacity: 0,          // ← مش autoAlpha
      scale: 0.4,
      rotate: -14,
      duration: 0.25,
      ease: "power2.out",
    });
  }

  if (ring) {
    gsap.to(ring, { rotate: 0, duration: 0.3, ease: "power2.out" });
  }

  if (img) {
    gsap.to(img, {
      scale: 1,
      filter: "grayscale(100%) contrast(1)",
      duration: 0.8,
      ease: "power3.out",
    });
  }

  if (glow) {
    gsap.to(glow, { opacity: 0, x: 0, y: 0, duration: 0.35, ease: "power2.out" });
  }
};
const handleGalleryMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
  const card = e.currentTarget;
  const btn  = card.querySelector<HTMLElement>("[data-follow-btn]");
  const ring = card.querySelector<HTMLElement>("[data-follow-ring]");
  const glow = card.querySelector<HTMLElement>("[data-card-glow]");

  if (!btn) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const dx = (x - rect.width  / 2) / rect.width;
  const dy = (y - rect.height / 2) / rect.height;

  // ← شيل overwrite من هنا خالص
  gsap.to(btn, {
    x,
    y,
    rotate: dx * 14,
    duration: 0.28,
    ease: "power3.out",
  });

  if (ring) {
    gsap.to(ring, {
      rotate: `+=${dx * 40}`,
      duration: 0.45,
      ease: "power3.out",
    });
  }

  if (glow) {
    gsap.to(glow, {
      x: dx * 55,
      y: dy * 55,
      duration: 0.35,
      ease: "power3.out",
    });
  }
};
/* ─── component ───────────────────────────────────────────────────────────── */

export default function WorksGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const gridRef    = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const trackRef   = useRef<HTMLDivElement | null>(null);

  const filters = useMemo(() => {
    const cats = works.map((w) => w.category);
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  const filteredWorks = useMemo(() => {
    if (activeFilter === "All") return works;
    return works.filter((w) => w.category === activeFilter);
  }, [activeFilter]);

  /* grid entrance animation */
  useLayoutEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-work-card]",
        { y: 55, autoAlpha: 0, scale: 0.96, filter: "blur(10px)" },
        {
          y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)",
          duration: 0.75, stagger: 0.055, ease: "power3.out",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [activeFilter]);

  /* gallery horizontal scroll */
  useLayoutEffect(() => {
    const section = galleryRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-gallery-card]", section);
      const chars = gsap.utils.toArray<HTMLElement>("[data-gallery-title-char]", section);

      cards.forEach(resetFollowBtn);

      gsap.set(track, { x: 0, willChange: "transform", force3D: true });

      gsap.set(chars, {
        yPercent: 120, autoAlpha: 0, rotateX: -24,
        transformPerspective: 900, transformOrigin: "center bottom",
      });

      gsap.to(chars, {
        yPercent: 0, autoAlpha: 1, rotateX: 0,
        duration: 0.85, stagger: 0.035, ease: "back.out(1.45)",
        scrollTrigger: { trigger: section, start: "top 76%", once: true },
      });

      gsap.fromTo(
        cards,
        { y: 60, autoAlpha: 0, scale: 0.95, filter: "blur(10px)" },
        {
          y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)",
          duration: 0.85, stagger: 0.04, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );

      const getScrollAmount = () => {
        const safeEnd = window.innerWidth * 0.12;
        return -Math.max(track.scrollWidth - window.innerWidth + safeEnd, 0);
      };

      const horizontalTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      const refreshCall = gsap.delayedCall(0.25, () => ScrollTrigger.refresh());
      return () => { refreshCall.kill(); horizontalTween.kill(); };
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-gallery-card]", section);
      cards.forEach(resetFollowBtn);

      gsap.fromTo(
        cards,
        { y: 55, autoAlpha: 0, filter: "blur(8px)" },
        {
          y: 0, autoAlpha: 1, filter: "blur(0px)",
          duration: 0.75, stagger: 0.045, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        }
      );
    });

    return () => mm.revert();
  }, []);

  /* ─── render ──────────────────────────────────────────────────────────── */

  return (
    <>
      {/* ── Works grid ── */}
      <section ref={gridRef} className="relative overflow-hidden bg-[#000] py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,0,0,0.08),transparent_38%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* header */}
          <div className="mb-9 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-hook-red/15 bg-hook-red/5 px-4 py-2 text-xs font-black text-hook-red">
                SELECTED WORKS
              </span>
              <h2 className="text-4xl font-black text-white md:text-6xl">أعمال مختارة</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-gray-400">
              اختار النوع وشوف الأعمال المناسبة بسرعة من غير زحمة.
            </p>
          </div>

          {/* filters */}
          <div className="mb-12 flex flex-wrap gap-3">
            {filters.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.14em] transition-all duration-300 ${
                    active
                      ? "border-hook-red bg-hook-red text-white shadow-[0_18px_45px_rgba(200,0,0,0.28)]"
                      : "border-white/[0.08] bg-white/[0.035] text-gray-400 hover:border-hook-red/40 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => {
              const Icon = work.icon;
              return (
                <article
                  key={work.title}
                  data-work-card
                  className="group relative min-h-[310px] overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0F0F0F] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-hook-red/40 hover:bg-[#121212]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,0,0,0.18),transparent_55%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hook-red/10 to-transparent" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hook-red/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-hook-red/20">
                        <Icon className="h-6 w-6 text-hook-red" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-hook-red/70">
                        {work.category}
                      </span>
                    </div>

                    <h2 className="mb-4 text-2xl font-black text-white transition-colors duration-300 group-hover:text-hook-red-light">
                      {work.title}
                    </h2>

                    <p className="mb-8 text-sm leading-8 text-gray-400">{work.description}</p>

                    <div className="mt-auto inline-flex w-fit items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs font-bold text-gray-300">
                      {work.stats}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Gallery horizontal scroll ── */}
      <section
        ref={galleryRef}
        id="gallery"
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-[#0A0A0A] py-24 lg:h-screen lg:py-0"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(200,0,0,0.16),transparent_34%)]" />

        {/* title */}
        <div
          data-gallery-title
          dir="ltr"
          className="relative z-30 mb-10 px-6 text-left lg:absolute lg:left-12 lg:top-[4.2vh] lg:mb-0 lg:px-0"
        >
          <span className="mb-5 inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-xs font-black uppercase tracking-[0.24em] text-gray-400 backdrop-blur-md">
            Case Gallery
          </span>
          <h2
            aria-label={galleryTitle}
            dir="ltr"
            className="flex flex-row overflow-hidden text-left text-[clamp(3.6rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-white"
          >
            {galleryTitle.split("").map((char, i) => (
              <span key={`${char}-${i}`} data-gallery-title-char className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

        {/* scrolling track */}
        <div
          ref={trackRef}
          dir="ltr"
          className="relative z-10 flex flex-col gap-8 px-6 pt-8 lg:mt-[24vh] lg:w-max lg:flex-row lg:gap-12 lg:px-[6vw] lg:pt-0"
        >
          {galleryWorks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              data-gallery-card
              dir="ltr"
              onPointerEnter={handleGalleryEnter}
              onPointerMove={handleGalleryMove}
              onPointerLeave={handleGalleryLeave}
              className="group relative flex h-[58vh] min-h-[430px] cursor-none overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#111] text-left shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:w-[52vw] lg:min-w-[720px]"
            >
              {/* ── image layer ── */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/42 to-black/10" />
                <div className="absolute inset-0 bg-hook-red/0 transition-colors duration-500 group-hover:bg-hook-red/10" />

                {/* subtle glow that follows pointer */}
                <span
                  data-card-glow
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hook-red/18 opacity-0 blur-3xl"
                />

                {/* ── "Read More" cursor button ── */}
       <span
  data-follow-btn
  className="pointer-events-none absolute left-0 top-0 z-[9999] h-[110px] w-[110px]"
  style={{ opacity: 0, visibility: "hidden" }} // ← شيل الـ transform من هنا، GSAP هيتولاه
>
                  {/* base circle */}
                  <span className="absolute inset-0 rounded-full border border-white/25 bg-white/[0.92] backdrop-blur-md" />

                  {/* spinning ring — rotated by GSAP */}
                  <span
                    data-follow-ring
                    className="absolute inset-2 rounded-full border-[1.5px] border-transparent border-t-hook-red border-r-[rgba(200,0,0,0.3)]"
                  />

                  {/* red accent dot */}
                  <span className="absolute right-2.5 top-3.5 h-2.5 w-2.5 rounded-full bg-hook-red shadow-[0_0_12px_rgba(200,0,0,0.9)]" />

                  {/* label */}
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <span className="text-[9px] font-black uppercase leading-none tracking-[0.22em] text-black/45">
                      Read
                    </span>
                    <span className="flex items-center gap-1.5 text-[12px] font-black uppercase leading-none tracking-[0.1em] text-black">
                      More
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-hook-red shadow-[0_4px_14px_rgba(200,0,0,0.45)]">
                        <ArrowUpRight className="h-3 w-3 text-white" strokeWidth={2.5} />
                      </span>
                    </span>
                  </span>
                </span>
              </div>

              {/* ── text layer ── */}
              <div className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-between p-7 md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs font-black text-white/50 backdrop-blur-md">
                    [{item.number}]
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="max-w-2xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-white md:text-6xl">
                    {item.title}
                  </h3>
                  <div className="mt-6 h-[1px] w-full origin-left scale-x-0 bg-white/45 transition-transform duration-700 group-hover:scale-x-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}