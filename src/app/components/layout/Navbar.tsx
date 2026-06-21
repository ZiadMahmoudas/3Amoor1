"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X, Sparkles } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const desktopLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const desktopCtasRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileCtasRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/#about", label: "عن هوّك" },
    { href: "/#services", label: "خدماتنا" },
    { href: "/works", label: "أعمالنا" },
    { href: "/#process", label: "طريقة عملنا" },
    { href: "/#faq", label: "الأسئلة الشائعة" },
    { href: "/#contact", label: "تواصل معنا" },
  ];

  useGSAP(() => {
    const desktopLinks = desktopLinksRef.current.filter(Boolean);
    const desktopCtas = desktopCtasRef.current.filter(Boolean);

    gsap.set(navRef.current, {
      y: -24,
      autoAlpha: 0,
    });

    gsap.set(logoRef.current, {
      yPercent: -120,
      autoAlpha: 0,
      scale: 0.92,
    });

    gsap.set(desktopLinks, {
      yPercent: -140,
      autoAlpha: 0,
      rotateX: -24,
      transformPerspective: 900,
      transformOrigin: "center top",
    });

    gsap.set(desktopCtas, {
      yPercent: -120,
      autoAlpha: 0,
      scale: 0.94,
    });

    gsap.set(menuBtnRef.current, {
      yPercent: -120,
      autoAlpha: 0,
      scale: 0.88,
    });

    gsap
      .timeline({
        defaults: {
          ease: "expo.out",
        },
      })
      .to(navRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
      })
      .to(
        logoRef.current,
        {
          yPercent: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.35)",
        },
        "-=0.35"
      )
      .to(
        desktopLinks,
        {
          yPercent: 0,
          autoAlpha: 1,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.085,
          ease: "back.out(1.45)",
        },
        "-=0.62"
      )
      .to(
        desktopCtas,
        {
          yPercent: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "back.out(1.35)",
        },
        "-=0.55"
      )
      .to(
        menuBtnRef.current,
        {
          yPercent: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.6)",
        },
        "-=0.9"
      );

    gsap.set(overlayRef.current, {
      display: "none",
      autoAlpha: 0,
      pointerEvents: "none",
    });

    gsap.set(drawerRef.current, {
      xPercent: 110,
    });

    gsap.set(mobileLinksRef.current, {
      autoAlpha: 0,
      x: 35,
    });

    gsap.set(mobileCtasRef.current, {
      autoAlpha: 0,
      y: 18,
    });

    gsap.set(closeBtnRef.current, {
      autoAlpha: 0,
      scale: 0.4,
      rotate: 90,
    });
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        setScrolled(currentY > 50);

        if (!isOpenRef.current && navRef.current) {
          if (currentY > lastY && currentY > 130) {
            gsap.to(navRef.current, {
              yPercent: -120,
              duration: 0.48,
              ease: "power3.out",
            });
          } else if (currentY < lastY) {
            gsap.to(navRef.current, {
              yPercent: 0,
              duration: 0.48,
              ease: "power3.out",
            });
          }
        }

        lastY = Math.max(currentY, 0);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const openMenu = () => {
    if (isOpenRef.current || isAnimatingRef.current) return;

    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    const closeBtn = closeBtnRef.current;
    const linksItems = mobileLinksRef.current.filter(Boolean);
    const ctas = mobileCtasRef.current.filter(Boolean);

    if (!overlay || !drawer || !closeBtn) return;

    isOpenRef.current = true;
    isAnimatingRef.current = true;
    setMobileOpen(true);

    document.documentElement.style.overflow = "hidden";

    gsap.killTweensOf([overlay, drawer, closeBtn, ...linksItems, ...ctas]);

    gsap.set(overlay, {
      display: "block",
      pointerEvents: "auto",
    });

    gsap.set(drawer, {
      xPercent: 110,
    });

    gsap.set(linksItems, {
      autoAlpha: 0,
      x: 35,
    });

    gsap.set(ctas, {
      autoAlpha: 0,
      y: 18,
    });

    gsap.set(closeBtn, {
      autoAlpha: 0,
      scale: 0.4,
      rotate: 90,
    });

    gsap
      .timeline({
        defaults: {
          ease: "power3.out",
        },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      })
      .to(overlay, {
        autoAlpha: 1,
        duration: 0.25,
      })
      .to(
        drawer,
        {
          xPercent: 0,
          duration: 0.85,
          ease: "expo.out",
        },
        "<"
      )
      .fromTo(
        "[data-mobile-menu-head]",
        {
          autoAlpha: 0,
          y: -18,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.55"
      )
      .to(
        linksItems,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.52,
          stagger: 0.075,
          ease: "back.out(1.35)",
        },
        "-=0.25"
      )
      .to(
        ctas,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "back.out(1.25)",
        },
        "-=0.18"
      )
      .to(
        closeBtn,
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: "back.out(1.8)",
        },
        "-=0.05"
      );
  };

  const closeMenu = () => {
    if (!isOpenRef.current || isAnimatingRef.current) return;

    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    const closeBtn = closeBtnRef.current;
    const linksItems = mobileLinksRef.current.filter(Boolean).reverse();
    const ctas = mobileCtasRef.current.filter(Boolean).reverse();

    if (!overlay || !drawer || !closeBtn) return;

    isAnimatingRef.current = true;

    gsap.killTweensOf([overlay, drawer, closeBtn, ...linksItems, ...ctas]);

    gsap
      .timeline({
        defaults: {
          ease: "power2.inOut",
        },
        onComplete: () => {
          gsap.set(overlay, {
            display: "none",
            pointerEvents: "none",
          });

          document.documentElement.style.overflow = "";

          isOpenRef.current = false;
          isAnimatingRef.current = false;
          setMobileOpen(false);
        },
      })
      .to(closeBtn, {
        autoAlpha: 0,
        scale: 0.45,
        rotate: 90,
        duration: 0.22,
        ease: "power2.in",
      })
      .to(
        ctas,
        {
          autoAlpha: 0,
          y: 18,
          duration: 0.25,
          stagger: 0.045,
          ease: "power2.in",
        },
        "-=0.04"
      )
      .to(
        linksItems,
        {
          autoAlpha: 0,
          x: 35,
          duration: 0.28,
          stagger: 0.035,
          ease: "power2.in",
        },
        "-=0.12"
      )
      .to(
        drawer,
        {
          xPercent: 110,
          duration: 0.62,
          ease: "power4.inOut",
        },
        "-=0.04"
      )
      .to(
        overlay,
        {
          autoAlpha: 0,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "-=0.38"
      );
  };

  const handleBarsEnter = () => {
    const btn = menuBtnRef.current;
    if (!btn) return;

    const lines = btn.querySelectorAll("[data-menu-line]");

    gsap.to(btn, {
      scale: 1.06,
      y: -2,
      backgroundColor: "rgba(200,0,0,0.16)",
      borderColor: "rgba(255,255,255,0.18)",
      boxShadow: "0 18px 45px rgba(200,0,0,0.26)",
      duration: 0.75,
      ease: "elastic.out(1, 0.45)",
    });

    gsap.to(lines, {
      x: (i) => [6, -5, 3][i] || 0,
      duration: 0.65,
      ease: "elastic.out(1, 0.35)",
      stagger: 0.035,
    });
  };

  const handleBarsMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = menuBtnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

    gsap.to(btn, {
      x: -dx * 9,
      y: -dy * 9,
      rotate: -dx * 4,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleBarsLeave = () => {
    const btn = menuBtnRef.current;
    if (!btn) return;

    const lines = btn.querySelectorAll("[data-menu-line]");

    gsap.to(btn, {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.08)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.55,
      ease: "elastic.out(1, 0.45)",
    });

    gsap.to(lines, {
      x: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.35)",
      stagger: 0.03,
    });
  };

  const handleDesktopLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: -4,
      scale: 1.06,
      rotateX: 7,
      duration: 0.42,
      ease: "elastic.out(1, 0.45)",
    });
  };

  const handleDesktopLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.38,
      ease: "power3.out",
    });
  };

  const handleDesktopCtaEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: -4,
      scale: 1.04,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)",
    });
  };

  const handleDesktopCtaLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 right-0 left-0 z-50 transition-[padding,background,border] duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-2xl py-3 border-b border-white/[0.04]"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between overflow-visible">
          <div className="overflow-hidden">
            <Link
              ref={logoRef}
              href="/"
              className="flex items-center gap-2.5 group will-change-transform"
            >
              <div className="w-[72px] h-[72px] relative">
                <img
                  src="/logo.png"
                  alt="هوّك"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((link, index) => (
              <span key={link.href} className="overflow-hidden py-3">
                <Link
                  href={link.href}
                  ref={(el) => {
                    desktopLinksRef.current[index] = el;
                  }}
                  onMouseEnter={handleDesktopLinkEnter}
                  onMouseLeave={handleDesktopLinkLeave}
                  className="block relative text-[13px] text-gray-400 hover:text-white transition-colors duration-200 font-medium after:absolute after:-bottom-2 after:right-0 after:w-0 after:h-[2px] after:bg-hook-red after:rounded-full hover:after:w-full after:transition-all after:duration-300 will-change-transform"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          <div className="hidden lg:flex gap-5">
            <span className="overflow-hidden py-3">
              <Link
                ref={(el) => {
                  desktopCtasRef.current[0] = el;
                }}
                href="/#contact"
                onMouseEnter={handleDesktopCtaEnter}
                onMouseLeave={handleDesktopCtaLeave}
                className="bg-hook-red hover:bg-hook-red-light text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors duration-200 hover:shadow-[0_0_25px_rgba(200,0,0,0.35)] inline-flex items-center gap-2 will-change-transform"
              >
                احجز استشارتك
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </span>

            <span className="overflow-hidden py-3">
              <Link
                ref={(el) => {
                  desktopCtasRef.current[1] = el;
                }}
                href="/works"
                onMouseEnter={handleDesktopCtaEnter}
                onMouseLeave={handleDesktopCtaLeave}
                className="bg-white/[0.06] hover:bg-white/[0.1] text-white px-6 py-2.5 rounded-lg text-sm font-bold border border-white/[0.08] transition-colors duration-200 inline-flex items-center gap-2 will-change-transform"
              >
                أعمالنا
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </span>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            aria-label="فتح القائمة"
            aria-expanded={mobileOpen}
            onClick={openMenu}
            onMouseEnter={handleBarsEnter}
            onMouseMove={handleBarsMove}
            onMouseLeave={handleBarsLeave}
            className="lg:hidden relative w-12 h-12 rounded-2xl border border-white/[0.08] bg-white/[0.05] flex items-center justify-center overflow-hidden will-change-transform"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />

            <span className="relative flex flex-col gap-1.5">
              <span
                data-menu-line
                className="block w-6 h-[2px] bg-white rounded-full"
              />
              <span
                data-menu-line
                className="block w-6 h-[2px] bg-white rounded-full"
              />
              <span
                data-menu-line
                className="block w-6 h-[2px] bg-white rounded-full"
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={overlayRef}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
        className="lg:hidden fixed inset-0 z-[80] bg-black/65 backdrop-blur-md"
      >
        <aside
          ref={drawerRef}
          dir="rtl"
          className="absolute top-0 right-0 h-full w-[86%] max-w-[390px] bg-[#0A0A0A] border-l border-white/[0.08] shadow-[-30px_0_90px_rgba(0,0,0,0.65)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,0,0,0.24),transparent_42%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),transparent_45%)] pointer-events-none" />

          <div className="relative h-full p-6 flex flex-col">
            <div
              data-mobile-menu-head
              className="flex items-center justify-between mb-10"
            >
              <Link href="/" onClick={closeMenu} className="block">
                <img
                  src="/logo.png"
                  alt="هوّك"
                  className="w-[78px] h-[78px] object-contain"
                />
              </Link>

              <button
                ref={closeBtnRef}
                type="button"
                aria-label="إغلاق القائمة"
                onClick={closeMenu}
                className="w-12 h-12 rounded-2xl bg-hook-red/15 border border-hook-red/25 text-white flex items-center justify-center hover:bg-hook-red transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    mobileLinksRef.current[index] = el;
                  }}
                  onClick={closeMenu}
                  className="group relative overflow-hidden rounded-2xl px-5 py-4 text-gray-200 font-bold border border-white/[0.06] bg-white/[0.035] hover:bg-white/[0.07] transition-colors"
                >
                  <span className="absolute inset-y-0 right-0 w-1 bg-hook-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
                  <span className="relative block group-hover:translate-x-[-6px] transition-transform duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 flex flex-col gap-3">
              <Link
                href="/#contact"
                ref={(el) => {
                  mobileCtasRef.current[0] = el;
                }}
                onClick={closeMenu}
                className="bg-hook-red text-white px-6 py-4 rounded-2xl text-center font-black shadow-[0_18px_45px_rgba(200,0,0,0.26)]"
              >
                احجز استشارتك المجانية
              </Link>

              <Link
                href="/works"
                ref={(el) => {
                  mobileCtasRef.current[1] = el;
                }}
                onClick={closeMenu}
                className="bg-white/[0.06] text-white px-6 py-4 rounded-2xl text-center font-black border border-white/[0.08]"
              >
                شوف أعمالنا
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}