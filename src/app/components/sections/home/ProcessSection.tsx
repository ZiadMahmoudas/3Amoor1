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

export default function ProcessSection() {
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
                <span className="p-4 absolute -top-3 -left-1 text-[100px] font-black text-white/[0.5] group-hover:text-hook-red/[1] transition-colors duration-300 leading-none select-none pointer-events-none">{step.num}</span>
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
