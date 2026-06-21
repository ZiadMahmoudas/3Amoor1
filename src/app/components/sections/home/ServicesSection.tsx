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

export default function ServicesSection() {
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
    <section id="services" className="py-28 relative bg-[#000] hook-scene">
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
