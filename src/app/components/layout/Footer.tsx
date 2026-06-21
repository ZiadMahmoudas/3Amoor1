"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] pt-16 pb-8 bg-[#000]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9"><img src="/logo.png" alt="هوّك" className="w-full h-full object-contain" /></div>
              <div className="leading-none"><span className="text-lg font-black text-white">HOOK</span><span className="block text-[8px] text-hook-red font-bold">هوّك</span></div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">مؤسسة هوّك | Hook Agency أفضل وكالة تسويق إلكتروني في مصر والوطن العربي.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'الرئيسية', href: '/' },
                { label: 'عن هوّك', href: '/#about' },
                { label: 'خدماتنا', href: '/#services' },
                { label: 'أعمالنا', href: '/works' },
                { label: 'طريقة عملنا', href: '/#process' },
                { label: 'الأسئلة الشائعة', href: '/#faq' },
                { label: 'تواصل معنا', href: '/#contact' },
              ].map((link) => (
                <li key={link.href}><Link href={link.href} className="text-gray-500 hover:text-hook-red transition-colors text-sm">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">خدماتنا</h4>
            <ul className="space-y-2.5">
              {['حلول التجارة الإلكترونية', 'تصميم المواقع', 'الحملات المدفوعة', 'السوشيال ميديا', 'تحسين محركات البحث', 'تصميم جرافيك'].map((s, i) => (
                <li key={i}><a href="/#services" className="text-gray-500 hover:text-hook-red transition-colors text-sm">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold font-bold text-sm mb-4">تواصل معنا</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-gray-500 text-sm"><Phone className="w-3.5 h-3.5 text-hook-red shrink-0" />+20 100 000 0000</li>
              <li className="flex items-center gap-2 text-gray-500 text-sm"><Mail className="w-3.5 h-3.5 text-hook-red shrink-0" />info@hookagency.com</li>
              <li className="flex items-center gap-2 text-gray-500 text-sm"><MapPin className="w-3.5 h-3.5 text-hook-red shrink-0" />القاهرة، مصر</li>
            </ul>
            <div className="flex gap-2 mt-4">
              {['Fb', 'Ig', 'Tw', 'Li', 'Tk', 'Be'].map((s, i) => (
                <a key={i} href="#" className="w-7 h-7 rounded bg-white/[0.04] hover:bg-hook-red/10 flex items-center justify-center text-gray-500 hover:text-hook-red transition-all text-[9px] font-bold" aria-label={s}>{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">جميع الحقوق محفوظة لشركة هوّك Hook Agency &copy; {new Date().getFullYear()}</p>
          <p className="text-gray-600 text-xs">صنع بـ ❤️ في مصر</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────── Scroll to Top ─────────── */
