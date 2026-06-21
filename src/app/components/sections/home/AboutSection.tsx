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

export default function AboutSection() {
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
