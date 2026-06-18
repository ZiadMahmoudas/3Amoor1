'use client'

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import {
  Megaphone, ShoppingCart, TrendingUp, Palette, Search, Share2,
  Globe, ChevronDown, Menu, X, Phone, Mail, MapPin, ArrowUp,
  Users, Award, Zap, Target, BarChart3, Monitor,
  CheckCircle, Send, Sparkles, ArrowLeft,
  LineChart, Lightbulb, PenTool, Video, Smartphone,
  Rocket,
} from 'lucide-react'
import { HookRig, GsapCardFields } from '@/components/hook'
import gsap from 'gsap'
import PinSectionsFlow from "@/components/hook/PinSectionsFlow";
/* ─────────── Hook SVG Component (reusable) ─────────── */
function HookSVG({ width = 55, height = 0, className = '' }: { width?: number; height?: number; className?: string }) {
  return (
    <svg width={width} height={height} viewBox="0 0 60 110" className={className}>
      <circle cx="30" cy="8" r="7" stroke="#C80000" strokeWidth="3" fill="none" />
      <circle cx="30" cy="8" r="3" stroke="#C80000" strokeWidth="1.5" fill="none" opacity="0.5" />
      <line x1="30" y1="15" x2="30" y2="50" stroke="#C80000" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 50 Q30 82 17 90 Q0 100 5 80 Q8 66 22 63 Q34 60 34 73" stroke="#C80000" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M5 80 L0 75" stroke="#E00000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="3" cy="77" r="4" fill="#E00000" opacity="0.6" />
      <circle cx="3" cy="77" r="8" fill="#E00000" opacity="0.15" />
    </svg>
  )
}

/* ─────────── 3D Hook - The PULLING Mechanism ─────────── */
function Hook3D() {
  const { scrollYProgress } = useScroll()

  // Hook descends as you scroll — like lowering a fishing line
  const hookYRaw = useTransform(scrollYProgress, [0, 1], [30, 5800])
  const hookY = useSpring(hookYRaw, { stiffness: 60, damping: 25 })

  // Rope stretches as hook goes down
  const ropeLengthRaw = useTransform(scrollYProgress, [0, 1], [80, 5950])
  const ropeLength = useSpring(ropeLengthRaw, { stiffness: 60, damping: 25 })

  // Hook sways
  const hookRotateRaw = useTransform(scrollYProgress, [0, 0.12, 0.28, 0.45, 0.62, 0.78, 1], [0, 8, -6, 10, -7, 5, -3])
  const hookRotate = useSpring(hookRotateRaw, { stiffness: 40, damping: 16 })

  // Hook scale pulses at "catch" points
  const hookScaleRaw = useTransform(scrollYProgress, [0, 0.08, 0.15, 0.25, 0.38, 0.5, 0.63, 0.75, 0.88, 1], [1, 1.15, 1, 1.2, 1, 1.15, 1, 1.18, 1, 1])
  const hookScale = useSpring(hookScaleRaw, { stiffness: 120, damping: 18 })

  // Glow intensity increases at catch points
  const glowIntensityRaw = useTransform(scrollYProgress, [0, 0.08, 0.15, 0.25, 0.38, 0.5, 0.63, 0.75, 0.88, 1], [0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 0.5])
  const glowIntensity = useSpring(glowIntensityRaw, { stiffness: 120, damping: 18 })

  return (
    <div className="fixed left-0 top-0 z-40 pointer-events-none hidden lg:block" style={{ width: '120px', height: '100vh' }}>
      {/* ── Reel mechanism at top ── */}
      <div className="absolute top-3 left-3 z-10">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-[3px] border-hook-red/50 bg-[#0A0A0A]/95 flex items-center justify-center shadow-[0_0_40px_rgba(200,0,0,0.25)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 rounded-full border-2 border-hook-red/70 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-hook-red/90" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-hook-red/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-hook-red/40" />
            </motion.div>
          </div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-2.5 rounded-full bg-hook-red/40" />
          {/* Reel label */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] text-hook-red/50 font-bold tracking-widest whitespace-nowrap">REEL</div>
        </div>
      </div>

      {/* ── Rope/Line from reel to hook ── */}
      <div className="absolute left-[42px] top-[46px]" style={{ width: '4px' }}>
        <motion.div
          style={{
            height: ropeLength,
            background: 'linear-gradient(to bottom, rgba(200,0,0,0.15) 0%, rgba(200,0,0,0.4) 10%, rgba(200,0,0,0.65) 40%, rgba(200,0,0,0.8) 70%, rgba(200,0,0,0.5) 100%)',
            borderRadius: '2px',
            boxShadow: '0 0 12px rgba(200,0,0,0.2), 0 0 4px rgba(200,0,0,0.1)',
          }}
        />
      </div>

      {/* ── The Hook itself ── */}
      <motion.div
        className="absolute left-[14px]"
        style={{
          top: '46px',
          y: hookY,
          rotate: hookRotate,
          scale: hookScale,
          transformOrigin: 'top center',
        }}
      >
        {/* Dynamic glow - intensifies when "catching" */}
        <motion.div
          style={{ opacity: glowIntensity }}
          className="absolute -inset-16 bg-hook-red/15 rounded-full blur-3xl transition-opacity"
        />
        <motion.div
          style={{ opacity: glowIntensity }}
          className="absolute -inset-8 bg-hook-red/8 rounded-full blur-xl transition-opacity"
        />

        {/* Hook SVG */}
        <div className="relative z-10">
          <HookSVG
            width={65}
            height={115}
            className="drop-shadow-[0_0_40px_rgba(200,0,0,0.7)]"
          />
        </div>

        {/* Spark particles around hook */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1.4, 0.6], y: [-3, 3, -3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 -left-5 w-3 h-3 rounded-full bg-hook-red/60"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1.2, 0.5], y: [3, -3, 3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-32 -right-3 w-2.5 h-2.5 rounded-full bg-hook-red/45"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.4, 1, 0.4], x: [-2, 2, -2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-16 left-1 w-2 h-2 rounded-full bg-hook-red/35"
        />
      </motion.div>

      {/* ── "PULLING" indicator ── */}
      <motion.div
        style={{ opacity: glowIntensity }}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 text-center"
      >
        <div className="text-hook-red text-[8px] font-black tracking-[0.3em] animate-pulse">PULLING</div>
      </motion.div>
    </div>
  )
}

/* ─────────── Hook Catch Point — the red indicator on each section where hook grabs ─────────── */
// function HookCatchPoint({ visible }: { visible: boolean }) {
//   return (
//     <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
//       {/* The catch point dot */}
//       <motion.div
//         animate={visible ? { scale: [1, 2, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 0.2 }}
//         transition={visible ? { duration: 0.6, repeat: Infinity } : {}}
//         className="relative"
//       >
//       </motion.div>
//       {/* Horizontal fishing line from catch point to content */}

//     </div>
//   )
// }

/* ─────────── Hook Pull Section — sections get YANKED up by the hook ─────────── */
function HookPullSection({
  children,
  delay = 0,
  className = '',
  index = 0,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  index?: number
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sparksRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current || !cardRef.current) return

    const ctx = gsap.context(() => {
      const card = cardRef.current
      const sparks = sparksRef.current?.children
      const trail = trailRef.current

      gsap.set(card, {
        opacity: 0,
        y: 280 + (index % 3) * 40,
        scaleX: 0.92,
        scaleY: 0.92,
        filter: 'blur(10px)',
        rotationX: 12,
        rotationZ: -2,
        transformPerspective: 1200,
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter',
      })

      if (sparks?.length) {
        gsap.set(sparks, {
          x: 0,
          y: 0,
          scaleX: 1.5,
          scaleY: 1.5,
          opacity: 0,
        })
      }

      if (trail) {
        gsap.set(trail, {
          opacity: 0,
          height: 100,
        })
      }

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 82%',
          once: true,
        },
      })

      tl.to(card, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        filter: 'blur(0px)',
        rotationX: 0,
        rotationZ: 0,
        duration: 1.15,
        ease: 'back.out(1.35)',
      })

      if (trail) {
        tl.to(
          trail,
          {
            opacity: 0.6,
            duration: 0.12,
            ease: 'power2.out',
          },
          '-=0.95'
        )

        tl.to(
          trail,
          {
            opacity: 0,
            height: 0,
            duration: 1.1,
            ease: 'power2.out',
          },
          '-=0.85'
        )
      }

      if (sparks?.length) {
        Array.from(sparks).forEach((spark, i) => {
          tl.fromTo(
            spark,
            {
              x: 0,
              y: 0,
              scaleX: 1.5,
              scaleY: 1.5,
              opacity: 1,
            },
            {
              x: 25 + i * 15,
              y: (i - 3) * 18,
              scaleX: 0,
              scaleY: 0,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            0.28 + i * 0.04
          )
        })
      }
    }, wrapperRef)

    return () => ctx.revert()
  }, [delay, index])

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div ref={cardRef} className="relative">
        {/* Spark burst */}
        <div
          ref={sparksRef}
          className="absolute -left-2 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-hook-red shadow-[0_0_6px_rgba(200,0,0,0.8)]"
            />
          ))}
        </div>

        {/* Red upward trail */}
        <div
          ref={trailRef}
          className="absolute left-0 bottom-0 w-[2px] bg-gradient-to-t from-hook-red/40 to-transparent hidden lg:block"
        />

        {children}
      </div>
    </div>
  )
}
/* ─────────── Counter ─────────── */
function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])
  useEffect(() => {
    if (!started) return
    let t: number
    const anim = (ts: number) => {
      if (!t) t = ts
      const p = Math.min((ts - t) / (duration * 1000), 1)
      setCount(Math.floor(p * end))
      if (p < 1) requestAnimationFrame(anim)
    }
    requestAnimationFrame(anim)
  }, [started, end, duration])
  return <div ref={ref}>{count}{suffix}</div>
}

/* ─────────── Section Badge ─────────── */
function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2 mb-6 border border-hook-red/15 bg-hook-red/5">
      <span className="w-1.5 h-1.5 bg-hook-red rounded-full animate-pulse" />
      <span className="text-[13px] text-hook-red font-bold">{text}</span>
    </div>
  )
}

/* ─────────── Navbar ─────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#about', label: 'عن هوّك' },
    { href: '#services', label: 'خدماتنا' },
    { href: '#process', label: 'طريقة عملنا' },
    { href: '#faq', label: 'الأسئلة الشائعة' },
    { href: '#contact', label: 'تواصل معنا' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-2xl py-3 border-b border-white/[0.04]'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 relative">
            <img src="/hook-logo.png" alt="هوّك" className="w-full h-full object-contain" />
          </div>
          <div className="leading-none">
            <span className="text-xl font-black text-white tracking-tight block">HOOK</span>
            <span className="text-[9px] text-hook-red font-bold">هوّك</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200 font-medium">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#contact" className="bg-hook-red hover:bg-hook-red-light text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:shadow-[0_0_25px_rgba(200,0,0,0.35)] inline-flex items-center gap-2">
            احجز استشارتك
            <Sparkles className="w-3.5 h-3.5" />
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0A0A]/98 backdrop-blur-2xl mt-3 mx-4 rounded-2xl overflow-hidden border border-white/[0.04]"
          >
            <div className="p-6 flex flex-col gap-1">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-hook-red transition-colors font-medium py-3 border-b border-white/[0.03] last:border-0 text-base">
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)}
                className="bg-hook-red text-white px-6 py-3.5 rounded-xl text-center font-bold mt-3">
                احجز استشارتك المجانية
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ─────────── Hero ─────────── */
function HeroSection() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, -60])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-hook-red/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] bg-hook-red/3 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(200,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,0,0,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2 mb-8 border border-hook-red/15 bg-hook-red/5">
              <span className="w-1.5 h-1.5 bg-hook-red rounded-full animate-pulse" />
              <span className="text-[13px] text-gray-300 font-medium">وكالة تسويق إلكتروني متكاملة</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.08] mb-5">
              <span className="text-white">اصطد عملائك</span>
              <br />
              <span className="text-gradient-red">مع هوّك</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.6 }}
              className="text-hook-red font-bold text-lg sm:text-xl mb-5 tracking-wide">
              من التواجد إلى السيادة
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-gray-200 max-w-xl mb-10 leading-relaxed">
              مؤسسة هوّك | Hook Agency واحدة من أفضل وكالات التسويق الإلكتروني في مصر والوطن العربي. نقدملك حلول متكاملة عشان نمّي متجرك الإلكتروني ونعزز وجودك الرقمي.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-12">
              <a href="#contact"
                className="bg-hook-red hover:bg-hook-red-light text-white px-8 py-4 rounded-lg text-base font-bold transition-all duration-200 hover:shadow-[0_0_35px_rgba(200,0,0,0.35)] inline-flex items-center gap-2 animate-pulse-red">
                ابدأ رحلتك دلوقتي
                <ArrowLeft className="w-4 h-4" />
              </a>
              <a href="#services"
                className="border border-white/15 hover:border-white/25 hover:bg-white/[0.04] text-white px-8 py-4 rounded-lg text-base font-bold transition-all duration-200 inline-flex items-center gap-2">
                اكتشف خدماتنا
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-10 pt-8 border-t border-white/[0.06]">
              {[
                { value: 150, suffix: '+', label: 'عميل يثق فينا' },
                { value: 200, suffix: '+', label: 'مشروع ناجح' },
                { value: 95, suffix: '%', label: 'رضا العملاء' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white mb-0.5"><Counter end={s.value} suffix={s.suffix} /></div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual Side - Large Hook with fishing line */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.7 }}
            className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-[420px] h-[420px]">
              {/* Animated rings */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-hook-red/10" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border border-hook-red/[0.06]" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-16 rounded-full border border-white/[0.03]" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-24 rounded-full border border-hook-red/[0.04]" />

              {/* Center hook with fishing line */}
              <div className="absolute inset-0 flex flex-col items-center">
                <motion.div
                  animate={{ scaleY: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[2px] bg-gradient-to-b from-hook-red/10 via-hook-red/40 to-hook-red/20 origin-top"
                  style={{ height: '140px' }}
                />
                <motion.div animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                  <svg width="120" height="180" viewBox="0 0 60 90" className="drop-shadow-[0_0_50px_rgba(200,0,0,0.35)]">
                    <path d="M30 0 L30 40 Q30 70 15 75 Q0 80 5 65 Q8 55 20 55 Q30 55 30 65" stroke="#C80000" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <circle cx="7" cy="68" r="3" fill="#E00000" />
                    <circle cx="30" cy="6" r="5" stroke="#C80000" strokeWidth="2.5" fill="none" />
                  </svg>
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 left-4 bg-[#111] rounded-xl p-3.5 border border-white/[0.05] shadow-lg">
                <div className="text-hook-red font-black text-sm">+150</div>
                <div className="text-gray-400 text-[10px]">عميل</div>
              </motion.div>
              <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 right-4 bg-[#111] rounded-xl p-3.5 border border-white/[0.05] shadow-lg">
                <div className="text-hook-red font-black text-sm">95%</div>
                <div className="text-gray-400 text-[10px]">رضا العملاء</div>
              </motion.div>
              <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -translate-y-1/2 -left-2 bg-[#111] rounded-xl p-3.5 border border-white/[0.05] shadow-lg">
                <div className="text-hook-red font-black text-sm">+200</div>
                <div className="text-gray-400 text-[10px]">مشروع</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

   
    </section>
  )
}

/* ─────────── Marquee ─────────── */
function MarqueeSection() {
  const items = ['SEO', 'BRANDING', 'DESIGN', 'CRO', 'UI/UX', 'MOTION GRAPHIC', 'MARKETING', 'SOCIAL MEDIA']
  return (
    <div className="py-4 border-y border-white/[0.04] overflow-hidden bg-[#000]" id="marquee">
      <div className="flex animate-scroll-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-xs font-bold tracking-[0.25em] text-white/[0.07]">{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ─────────── About ─────────── */
function AboutSection() {
  return (
    <section id="about" className="py-28 relative overflow-hidden bg-[#000]">
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-hook-red/3 rounded-full blur-[0]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <HookPullSection index={1}>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <div>
              <SectionBadge text="من نحن" />

              <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
                من التواجد إلى <span className="text-gradient-red">السيادة</span>
              </h2>

              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                في بيئة أعمال تتجه بخطى متسارعة نحو التحول الرقمي، تُدرك المؤسسات الطموحة إن التسويق بيتجاوز مجرد الإعلان — هو المحرك الأساسي للنمو.
              </p>
              <p className="text-gray-200 text-lg leading-relaxed mb-10">
                إحنا لسنا مجرد وكالة تسويق، بل مركز عملياتك الرقمية. بنحوّل علامتك التجارية لرائدة في قطاعها. مع بعض نحلم، نبني، نقود، ونحقق النجاح اللي تستحقه.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Target, label: 'استراتيجيات مخصصة', desc: 'خطط تسويقية مصممة خصيصاً ليك' },
                  { icon: Zap, label: 'نتائج سريعة', desc: 'أداء فوري ونتائج ملموسة' },
                  { icon: Users, label: 'فريق محترف', desc: 'خبرة سنين في المجال الرقمي' },
                  { icon: Award, label: 'جودة عالية', desc: 'معايير احترافية في كل تفصيلة' },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-hook-red/15 hover:bg-hook-red/[0.02] transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-hook-red/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-hook-red" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{item.label}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-hook-red/10" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6 rounded-full border border-hook-red/[0.06]" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-14 rounded-full border border-white/[0.03]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                    <svg width="100" height="150" viewBox="0 0 60 90" className="drop-shadow-[0_0_35px_rgba(200,0,0,0.35)]">
                      <path d="M30 0 L30 40 Q30 70 15 75 Q0 80 5 65 Q8 55 20 55 Q30 55 30 65" stroke="#C80000" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <circle cx="7" cy="68" r="3" fill="#E00000" />
                      <circle cx="30" cy="6" r="5" stroke="#C80000" strokeWidth="2.5" fill="none" />
                    </svg>
                  </motion.div>
                </div>
                {[
                  { top: '2%', right: '5%', value: '+150', label: 'عميل' },
                  { bottom: '8%', left: '0%', value: '+200', label: 'مشروع' },
                ].map((stat, i) => (
                  <motion.div key={i} animate={{ y: [-6, 6, -6] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bg-[#111] rounded-xl p-3.5 text-center border border-white/[0.04] shadow-lg"
                    style={{ top: stat.top, right: stat.right, bottom: stat.bottom, left: stat.left }}>
                    <div className="text-hook-red font-black text-base">{stat.value}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </HookPullSection>
      </div>
    </section>
  )
}

/* ─────────── Services ─────────── */
function ServicesSection() {
  const services = [
    { num: '01', icon: ShoppingCart, title: 'حلول التجارة الإلكترونية', desc: 'نوفرلك أفضل استراتيجيات وحلول التجارة الإلكترونية، نساعدك في إدارة نشاطك التجاري بدقة وتحقيق الأهداف والخطط الموضوعة لضمان زيادة المبيعات واكتساب عملاء جدد.' },
    { num: '02', icon: Monitor, title: 'تصميم المواقع الإلكترونية', desc: 'نساعدك على التوسع في نشاط عملك وعرض وتوصيل منتجاتك وخدماتك بشكل فريد يعكس هويتك ويساعد العملاء على اكتشاف منتجاتك بالشكل الأمثل.' },
    { num: '03', icon: Megaphone, title: 'إدارة الحملات المدفوعة', desc: 'نقدملك خطط مدروسة تساعد نشاطك في التوسع والظهور لأكبر عدد ممكن من العملاء المحتملين، تشمل إعلانات السوشيال ميديا وإعلانات جوجل.' },
    { num: '04', icon: Share2, title: 'إدارة السوشيال ميديا', desc: 'نُدير جميع حساباتك من خلال خدمة إدارة مواقع التواصل الاجتماعي وزيادة التفاعل والمتابعين بشكل احترافي ووصول علامتك التجارية للجمهور المستهدف.' },
    { num: '05', icon: Search, title: 'تحسين محركات البحث SEO', desc: 'نعيد ترتيب موقعك الإلكتروني ونضمن ظهوره في الصفحات الأولى بمحركات البحث مما يساعدك على جذب عملاء جدد ويضمن التواجد بقوة بين منافسيك.' },
    { num: '06', icon: Palette, title: 'تصميم جرافيك وموشن جرافيك', desc: 'نساعدك في تصميم هوية بصرية احترافية تعزز ثقة عملائك وتعطي انطباع يتسم بالاحترافية والمصداقية — من اللوجو للألوان للتصميمات المتحركة.' },
    { num: '07', icon: TrendingUp, title: 'تحسين معدل التحويل CRO', desc: 'نعتمد على استراتيجيات مبتكرة لزيادة مبيعاتك من خلال رفع معدل تحويل زوار موقعك لعملاء حقيقيين مهتمين بإكمال عملية الشراء.' },
  ]

  return (
    <section id="services" className="py-28 relative bg-[#000]">
      <div className="absolute inset-0  " />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <HookPullSection index={2}>
          <div className="text-center mb-20">
            <SectionBadge text="خدماتنا" />
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              الحلول اللي <span className="text-gradient-red">نقدمها</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">مع كل عميل لدينا، نُظهر شغفًا عميقًا بالابتكارات الإبداعية في حل مشكلاته والتفكير في تطوير علامته التجارية</p>
          </div>
        </HookPullSection>

        <div className="gsap-stacked-deck services-stack">
          {services.map((service, i) => (
            <div key={i} className="gsap-card-item">
              <div className="group min-h-[100px] rounded-3xl border border-white/[0.06] hover:border-hook-red/20 bg-[#0F0F0F] hover:bg-[#111] transition-all duration-300 overflow-hidden service-card">
                <div className="flex flex-col md:flex-row">
                  {/* Number + Icon */}
                  <div className="md:w-56 shrink-0 py-8 px-6 md:px-8 flex flex-row md:flex-col items-center gap-4 md:gap-5 border-b md:border-b-0 md:border-l border-white/[0.04] bg-[#0C0C0C] group-hover:bg-hook-red/[0.03] transition-colors duration-300">
                    <div className="relative w-14 h-14 shrink-0 rounded-xl bg-hook-red/10 group-hover:bg-hook-red/15 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                      <service.icon className="w-7 h-7 text-hook-red" />
                    </div>
                    <span className="text-4xl font-black text-white/[0.04] group-hover:text-hook-red/10 transition-colors duration-300">{service.num}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-8 px-6 md:px-10 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-hook-red-light transition-colors duration-200">{service.title}</h3>
                    <p className="text-gray-300 text-[15px] leading-relaxed mb-5">{service.desc}</p>
                    <a href="#contact" className="inline-flex items-center gap-1.5 text-hook-red text-sm font-bold hover:gap-3 transition-all duration-200">
                      اعرف أكثر
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Process ─────────── */
function ProcessSection() {
  const steps = [
    { num: '01', icon: Lightbulb, title: 'دراسة وتحليل الأعمال', points: ['دراسة الوضع الحالي للعلامة التجارية', 'دراسة وضع المحتوى والسوشيال ميديا', 'تحليل الموقع الإلكتروني', 'تحليل SWOT للوضع الحالي', 'تحليل المنافسين بالسوق'] },
    { num: '02', icon: PenTool, title: 'بناء استراتيجية تسويقية', points: ['أهداف محددة قابلة للتحقيق والقياس', 'استراتيجية عمل بتوقيتات محددة', 'خطة تسويقية دقيقة واضحة', 'حلول للتفوق على المنافسين', 'توزيع مناسب للتكلفة على المنصات'] },
    { num: '03', icon: Rocket, title: 'التنفيذ والمراقبة', points: ['توزيع المهام للفرق المختصة', 'تنفيذ خطة التسويق والإعلانات', 'مراقبة الحملات المدفوعة ونتائجها', 'مراقبة وسائل التواصل الإجتماعي', 'تحسين الحملات الإعلانية'] },
    { num: '04', icon: LineChart, title: 'قياس النتائج', points: ['قياس نتائج الحملات الإعلانية', 'تقارير مواقع التواصل الإجتماعي', 'نتائج زيارات الموقع الإلكتروني', 'قياس النتائج بالخطة التسويقية', 'الاستفادة من النتائج للحملات المستقبلية'] },
  ]

  return (
    <section id="process" className="py-28 relative overflow-hidden bg-[#000]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hook-red/[0.02] rounded-full blur-[130px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <HookPullSection index={10}>
          <div className="text-center mb-20">
            <SectionBadge text="طريقة عملنا" />
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              إزاي <span className="text-gradient-red">ننجح؟</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">منهجية عمل متكاملة بتحول رؤيتك لواقع ملموس ونتائج فعلية</p>
          </div>
        </HookPullSection>

        <div className="gsap-stacked-deck process-stack">
          {steps.map((step, i) => (
            <div key={i} className="gsap-card-item">
              <div className="group min-h-[100px] rounded-3xl border border-white/[0.06] hover:border-hook-red/20 bg-[#0F0F0F] p-9 transition-all duration-300 relative overflow-hidden">
                <span className="absolute -top-3 -left-1 text-[100px] font-black text-white/[1] group-hover:text-hook-red/[1] transition-colors duration-300 leading-none select-none pointer-events-none">{step.num}</span>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-hook-red/10 group-hover:bg-hook-red/15 flex items-center justify-center transition-colors shrink-0">
                      <step.icon className="w-6 h-6 text-hook-red" />
                    </div>
                    <div>
                      <span className="text-hook-red text-xs font-bold">{step.num}</span>
                      <h3 className="text-white text-lg font-bold leading-tight">{step.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {step.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-hook-red/70 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Stats ─────────── */
function StatsSection() {
  const stats = [
    { value: 150, suffix: '+', label: 'شريك نجاح', icon: Users },
    { value: 200, suffix: '+', label: 'موقع إلكتروني', icon: Globe },
    { value: 50, suffix: 'K+', label: 'تصميم وفيديو', icon: Palette },
    { value: 91, suffix: '%', label: 'نسبة المبيعات', icon: BarChart3 },
  ]
  return (
    <section className="py-31 border-y border-white/[0.04] bg-[#000]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <HookPullSection index={15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-hook-red/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-5 h-5 text-hook-red" />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white mb-1"><Counter end={stat.value} suffix={stat.suffix} /></div>
                <div className="text-hook-red font-bold text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </HookPullSection>
      </div>
    </section>
  )
}

/* ─────────── Partners ─────────── */
function PartnersSection() {
  const partners = [
    "Google",
    "Meta",
    "TikTok",
    "Shopify",
    "WordPress",
    "Zid",
    "Google",
    "Meta",
    "TikTok",
    "Shopify",
    "WordPress",
    "Zid",
  ];

  return (
    <section className="relative z-40 py-30 overflow-hidden bg-[#000]" id="partners">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <HookPullSection index={16}>
          <p className="text-center text-gray-500 text-sm mb-10">
            فخورين بالعمل مع أكبر العلامات التجارية
          </p>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

            <motion.div
              className="flex w-max gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 18,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="flex h-16 min-w-[150px] items-center justify-center rounded-xl border border-white/[0.04] bg-[#0D0D0D] hover:border-hook-red/15 hover:bg-hook-red/[0.03] transition-all duration-200 cursor-pointer group"
                >
                  <span className="text-sm font-bold text-white/[0.12] group-hover:text-white/30 transition-colors tracking-wider">
                    {p}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </HookPullSection>
      </div>
    </section>
  );
}
/* ─────────── FAQ ─────────── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = [
    { q: 'إزاي أقدر أبني متجر إلكتروني ناجح؟', a: 'تبدأ بتحديد المنتجات، تختار منصة التجارة الإلكترونية المناسبة، نصمملك المتجر بشكل احترافي، نضيف المنتجات، نجهز طرق الدفع والشحن، وبعدين نبدأ التسويق للمتجر. إحنا معاك من أول خطوة لحد ما متجرك يبدأ يبيع.' },
    { q: 'إزاي أزود مبيعات مشروعي؟', a: 'تقدر تزود مبيعاتك من خلال تقديم عروض حصرية، وتشغل حملات إعلانية مستهدفة توصل لعميلك المباشر، وتحسن خدمة العملاء. كمان بنشتغل على تحسين معدل التحويل CRO عشان كل زائر يبقي فرصة حقيقية.' },
    { q: 'إيه أهمية تحليلات البيانات لمتجري؟', a: 'تحليلات البيانات بتساعدك تفهم سلوك عملائك وتتتبع أداء المتجر عشان تاخد قرارات مدروسة لتحسين استراتيجيات التسويق وزيادة المبيعات. بنقدملك تقارير تفصيلية عن كل حاجة.' },
    { q: 'إزاي أحسن استراتيجية التسويق لمشروعي؟', a: 'تقدر تحسن استراتيجية التسويق بتحسين صفحات ترويج منتجاتك وتقديم عروض خاصة، بالإضافة لاستخدام الإعلانات المدفوعة بشكل استراتيجي وفعال. بنساعدك تعمل خطة تسويقية متكاملة.' },
    { q: 'قد إيه بتاخد عملية تصميم وبناء المتجر؟', a: 'المدة بتختلف حسب حجم المشروع، لكن بشكل العام المتجر البسيط بيكون جاهز في أسبوعين لثلاث أسابيع، والمتاجر الكبيرة بتاخد من شهر لشهرين. بنحرص إننا نسلمك المشروع في الوقت المتفق عليه.' },
    { q: 'هل بتقدموا خدمات ما بعد التسليم؟', a: 'أكيد! بنقدم دعم فني مستمر بعد تسليم المشروع، وخدمات صيانة دورية، وتحديثات مستمرة عشان متجرك يفضل شغال بأعلى كفاءة. كمان بنقدم استشارات تسويقية دورية.' },
  ]

  return (
    <section id="faq" className="py-28 bg-[#000]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <HookPullSection index={17}>
          <div className="text-center mb-16">
            <SectionBadge text="الأسئلة الشائعة" />
            <h2 className="text-4xl sm:text-5xl font-black mb-4">عندك <span className="text-gradient-red">سؤال؟</span></h2>
            <p className="text-gray-400 text-lg">خلينا نجاوب على أكتر الأسئلة اللي بتتكرر</p>
          </div>
        </HookPullSection>

        <div className="gsap-stacked-deck faq-stack">
          {faqs.map((faq, i) => (
            <div key={i} className="gsap-card-item">
              <div className="faq-stack-card min-h-[100px] rounded-3xl border border-white/[0.06] hover:border-white/[0.1] bg-[#0F0F0F] overflow-hidden transition-colors">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-7 md:p-9 text-right">
                  <span className="text-white font-black text-xl md:text-2xl leading-relaxed">{faq.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mr-4">
                    <div className="w-7 h-7 rounded-full bg-hook-red/10 flex items-center justify-center">
                      <ChevronDown className="w-3.5 h-3.5 text-hook-red" />
                    </div>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="px-7 md:px-9 pb-8 text-gray-300 text-base leading-8 border-t border-white/[0.04] pt-6">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── CTA ─────────── */
function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden bg-[#000]">
      <div className="absolute inset-0 bg-gradient-to-br from-hook-red/6 via-hook-red/2 to-transparent" />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-hook-red/6 rounded-full blur-[100px]" />
      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <HookPullSection index={25}>
          <motion.div animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="inline-block mb-8">
            <svg width="70" height="105" viewBox="0 0 60 90" className="drop-shadow-[0_0_25px_rgba(200,0,0,0.4)]">
              <path d="M30 0 L30 40 Q30 70 15 75 Q0 80 5 65 Q8 55 20 55 Q30 55 30 65" stroke="#C80000" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="7" cy="68" r="3" fill="#E00000" />
              <circle cx="30" cy="6" r="5" stroke="#C80000" strokeWidth="2.5" fill="none" />
            </svg>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">هوّك على <span className="text-gradient-red">نجاحك</span></h2>
          <p className="text-gray-200 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            احصل على جلسة مجانية تقدر قيمتها بـ 800 جنيه خاصة بالاستراتيجية لمدة 30 دقيقة مع مسوق رقمي خبير.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="bg-hook-red hover:bg-hook-red-light text-white px-10 py-4 rounded-lg text-lg font-bold transition-all duration-200 hover:shadow-[0_0_35px_rgba(200,0,0,0.35)] inline-flex items-center gap-2.5">
              أحصل على 30 دقيقة مجانية
              <ArrowLeft className="w-4 h-4" />
            </a>
            <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer"
              className="border border-white/10 hover:border-white/20 hover:bg-white/[0.03] text-white px-10 py-4 rounded-lg text-lg font-bold transition-all duration-200 inline-flex items-center gap-2.5">
              <Phone className="w-5 h-5" />
              تواصل عبر واتساب
            </a>
          </div>
        </HookPullSection>
      </div>
    </section>
  )
}

/* ─────────── Contact ─────────── */
function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <section id="contact" className="py-28 bg-[#000]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <HookPullSection index={26}>
          <div className="text-center mb-16">
            <SectionBadge text="تواصل معنا" />
            <h2 className="text-4xl sm:text-5xl font-black mb-4">كن مع <span className="text-gradient-red">المحترفين</span></h2>
            <p className="text-gray-300 text-lg">تواصل معانا واحصل على استشارتك المجانية دلوقتي</p>
          </div>
        </HookPullSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Info */}
          <HookPullSection delay={0.1} index={27}>
            <div className="space-y-4">
              {[
                { icon: Phone, label: 'اتصل بينا', value: '+20 100 000 0000', href: 'tel:+201000000000' },
                { icon: Mail, label: 'البريد الإلكتروني', value: 'info@hookagency.com', href: 'mailto:info@hookagency.com' },
                { icon: MapPin, label: 'العنوان', value: 'القاهرة، مصر', href: '#' },
              ].map((info, i) => (
                <a key={i} href={info.href}
                  className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.04] hover:border-hook-red/15 bg-[#0F0F0F] hover:bg-hook-red/[0.02] transition-all duration-200 group block">
                  <div className="w-11 h-11 rounded-lg bg-hook-red/10 flex items-center justify-center shrink-0 group-hover:bg-hook-red/15 transition-colors">
                    <info.icon className="w-5 h-5 text-hook-red" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">{info.label}</div>
                    <div className="text-white font-bold text-sm">{info.value}</div>
                  </div>
                </a>
              ))}
              <div className="p-5 rounded-xl border border-white/[0.04] bg-[#0F0F0F]">
                <div className="text-gray-500 text-xs mb-3">تابعنا على</div>
                <div className="flex gap-2">
                  {['Fb', 'Ig', 'Tw', 'Li', 'Tk', 'Be'].map((s, i) => (
                    <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-hook-red/10 flex items-center justify-center text-gray-500 hover:text-hook-red transition-all text-[10px] font-bold" aria-label={s}>{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </HookPullSection>

          {/* Form */}
          <HookPullSection delay={0.15} index={28}>
            <form onSubmit={handleSubmit}
              className="lg:col-span-2 rounded-2xl border border-white/[0.04] bg-[#0F0F0F] p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-gray-500 text-xs mb-1.5 block">الاسم</label>
                  <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="اسمك الكامل"
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-hook-red/40 transition-colors" required />
                </div>
                <div>
                  <label className="text-gray-500 text-xs mb-1.5 block">البريد الإلكتروني</label>
                  <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="email@example.com"
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-hook-red/40 transition-colors" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-gray-500 text-xs mb-1.5 block">رقم الموبايل</label>
                  <input type="tel" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} placeholder="+20 1XX XXX XXXX"
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-hook-red/40 transition-colors" />
                </div>
                <div>
                  <label className="text-gray-500 text-xs mb-1.5 block">الخدمة المطلوبة</label>
                  <select value={formState.service} onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-hook-red/40 transition-colors appearance-none">
                    <option value="" className="bg-[#111]">اختر الخدمة</option>
                    <option value="store" className="bg-[#111]">حلول التجارة الإلكترونية</option>
                    <option value="web" className="bg-[#111]">تصميم مواقع الويب</option>
                    <option value="ads" className="bg-[#111]">إدارة الحملات الإعلانية</option>
                    <option value="seo" className="bg-[#111]">تحسين محركات البحث</option>
                    <option value="social" className="bg-[#111]">إدارة السوشيال ميديا</option>
                    <option value="design" className="bg-[#111]">تصميم جرافيك</option>
                    <option value="cro" className="bg-[#111]">تحسين معدل التحويل</option>
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label className="text-gray-500 text-xs mb-1.5 block">رسالتك</label>
                <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="اكتب رسالتك هنا..." rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-hook-red/40 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-hook-red hover:bg-hook-red-light text-white py-3.5 rounded-lg font-bold text-base transition-all duration-200 hover:shadow-[0_0_25px_rgba(200,0,0,0.3)] flex items-center justify-center gap-2">
                {submitted ? <><CheckCircle className="w-4 h-4" /> تم الإرسال بنجاح!</> : <><Send className="w-4 h-4" /> أرسل رسالتك</>}
              </button>
            </form>
          </HookPullSection>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] pt-16 pb-8 bg-[#000]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9"><img src="/hook-logo.png" alt="هوّك" className="w-full h-full object-contain" /></div>
              <div className="leading-none"><span className="text-lg font-black text-white">HOOK</span><span className="block text-[8px] text-hook-red font-bold">هوّك</span></div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">مؤسسة هوّك | Hook Agency أفضل وكالة تسويق إلكتروني في مصر والوطن العربي.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {['الرئيسية', 'عن هوّك', 'خدماتنا', 'طريقة عملنا', 'الأسئلة الشائعة', 'تواصل معنا'].map((link, i) => (
                <li key={i}><a href={`#${['home', 'about', 'services', 'process', 'faq', 'contact'][i]}`} className="text-gray-500 hover:text-hook-red transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">خدماتنا</h4>
            <ul className="space-y-2.5">
              {['حلول التجارة الإلكترونية', 'تصميم المواقع', 'الحملات المدفوعة', 'السوشيال ميديا', 'تحسين محركات البحث', 'تصميم جرافيك'].map((s, i) => (
                <li key={i}><a href="#services" className="text-gray-500 hover:text-hook-red transition-colors text-sm">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold font-bold text-sm mb-4">تواصل معنا</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-gray-500 text-sm"><Phone className="w-3.5 h-3.5 text-hook-red shrink-0" />+20 100 000 0000</li>
              <li className="flex items-center gap-2 text-gray-500 text-sm"><Mail className="w-3.5 h-3.5 text-hook-red shrink-0" />info@hookagency.com</li>
              <li className="flex items-center gap-2 text-gray-500 text-sm"><MapPin className="w-3.5 h-3.5 text-hook-red shrink-0" />القاهرة، مصر</li>
            </ul>
            <div className="flex gap-2 mt-4">
              {['Fb', 'Ig', 'Tw', 'Li', 'Tk', 'Be'].map((s, i) => (
                <a key={i} href="#" className="w-7 h-7 rounded bg-white/[0.04] hover:bg-hook-red/10 flex items-center justify-center text-gray-500 hover:text-hook-red transition-all text-[9px] font-bold" aria-label={s}>{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">جميع الحقوق محفوظة لشركة هوّك Hook Agency &copy; {new Date().getFullYear()}</p>
          <p className="text-gray-600 text-xs">صنع بـ ❤️ في مصر</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────── Scroll to Top ─────────── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-50 w-11 h-11 rounded-lg bg-hook-red text-white flex items-center justify-center shadow-[0_0_15px_rgba(200,0,0,0.25)] hover:shadow-[0_0_25px_rgba(200,0,0,0.4)] transition-all"
          aria-label="العودة للأعلى">
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─────────── Main ─────────── */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <HookRig />
      <GsapCardFields />
      <PinSectionsFlow />

      <section className="pin-card">
        <HeroSection />
      </section>

      <section className="pin-card">
        <MarqueeSection />
      </section>

      <section className="pin-card">
        <AboutSection />
      </section>

        <ServicesSection />

        <ProcessSection />

      <section className="pin-card">
        <StatsSection />
      </section>

      <section className="pin-card">
        <PartnersSection />
      </section>

        <FAQSection />

        <CTASection />

        <ContactSection />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
