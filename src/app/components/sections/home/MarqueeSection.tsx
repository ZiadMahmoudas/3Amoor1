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
import HookPullSection from "@/app/components/hook/HookPullSection";

export default function MarqueeSection() {
  const items = ['SEO', 'BRANDING', 'DESIGN', 'CRO', 'UI/UX', 'MOTION GRAPHIC', 'MARKETING', 'SOCIAL MEDIA']
  return (
    <div className="py-4 border-y border-white/[0.04] overflow-hidden bg-[#000]" id="marquee">
      <div className="flex animate-scroll-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-xs font-bold tracking-[0.25em] text-white/[0.07]">{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ─────────── About ─────────── */
