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

export default function ContactSection() {
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
