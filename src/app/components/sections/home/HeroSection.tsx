"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Megaphone, ShoppingCart, TrendingUp, Palette, Search, Share2,
  Globe, ChevronDown, Menu, X, Phone, Mail, MapPin, ArrowUp,
  Users, Award, Zap, Target, BarChart3, Monitor,
  CheckCircle, Send, Sparkles, ArrowLeft,
  LineChart, Lightbulb, PenTool, Video, Smartphone,
  Rocket,
} from "lucide-react";
import Counter from "@/app/components/shared/Counter";
import HookPullSection from "@/app/components/hook/HookPullSection";

export default function HeroSection() {
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
