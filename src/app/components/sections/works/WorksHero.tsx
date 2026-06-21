"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import SectionBadge from "@/app/components/shared/SectionBadge";

export default function WorksHero() {
  return (
    <section className="relative min-h-[72vh] flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0">
        <div className="absolute top-[18%] right-[12%] w-[480px] h-[480px] bg-hook-red/7 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] left-[14%] w-[360px] h-[360px] bg-hook-red/4 rounded-full blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(200,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,0,0,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
          <SectionBadge text="أعمالنا" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.08] mb-6 text-white">
            شغل بيشد العميل
            <span className="text-gradient-red block mt-3">مش مجرد شكل حلو</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-9 max-w-3xl mb-10">هنا هتلاقي نماذج منظمة من نوعية الشغل اللي بنقدمه: متاجر، مواقع، حملات، هوية بصرية، وتحسين نمو. الصفحة جاهزة إنك تضيف عليها المشاريع الحقيقية واحدة واحدة.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="bg-hook-red hover:bg-hook-red-light text-white px-8 py-4 rounded-lg text-base font-bold transition-all duration-200 hover:shadow-[0_0_35px_rgba(200,0,0,0.35)] inline-flex items-center justify-center gap-2">اطلب مشروع مشابه <ArrowLeft className="w-4 h-4" /></Link>
            <Link href="/#services" className="border border-white/15 hover:border-white/25 hover:bg-white/[0.04] text-white px-8 py-4 rounded-lg text-base font-bold transition-all duration-200 inline-flex items-center justify-center gap-2"><Sparkles className="w-4 h-4 text-hook-red" /> شوف خدماتنا</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
