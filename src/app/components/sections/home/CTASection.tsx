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
import SectionBadge from "@/app/components/shared/SectionBadge";
import HookPullSection from "@/app/components/hook/HookPullSection";

export default function CTASection() {
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
