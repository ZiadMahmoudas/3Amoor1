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

export default function PartnersSection() {
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
