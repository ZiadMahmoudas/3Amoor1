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

export default function FAQSection() {
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
