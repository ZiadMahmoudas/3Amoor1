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
import SectionBadge from "@/app/components/shared/SectionBadge";
import HookPullSection from "@/app/components/hook/HookPullSection";

export default function StatsSection() {
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
