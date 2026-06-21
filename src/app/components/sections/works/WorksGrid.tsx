"use client";

import React from "react";
import { motion } from "framer-motion";
import { works } from "./worksData";

export default function WorksGrid() {
  return (
    <section className="relative py-24 bg-[#000]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((work, index) => {
            const Icon = work.icon;
            return (
              <motion.article key={work.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.05, duration: 0.45 }} className="group rounded-3xl border border-white/[0.06] bg-[#0F0F0F] p-7 min-h-[290px] hover:border-hook-red/35 hover:bg-hook-red/[0.025] transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="w-13 h-13 rounded-2xl bg-hook-red/10 flex items-center justify-center group-hover:bg-hook-red/15 transition-colors"><Icon className="w-6 h-6 text-hook-red" /></div>
                  <span className="text-[11px] font-black tracking-[0.2em] text-hook-red/70 uppercase">{work.category}</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-4">{work.title}</h2>
                <p className="text-gray-400 leading-8 text-sm mb-6">{work.description}</p>
                <div className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs font-bold text-gray-300">{work.stats}</div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
