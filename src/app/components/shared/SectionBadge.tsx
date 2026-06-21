"use client";

import React from "react";

export default function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2 mb-6 border border-hook-red/15 bg-hook-red/5">
      <span className="w-1.5 h-1.5 bg-hook-red rounded-full animate-pulse" />
      <span className="text-[13px] text-hook-red font-bold">{text}</span>
    </div>
  )
}

/* ─────────── Navbar ─────────── */
