"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])
  useEffect(() => {
    if (!started) return
    let t: number
    const anim = (ts: number) => {
      if (!t) t = ts
      const p = Math.min((ts - t) / (duration * 1000), 1)
      setCount(Math.floor(p * end))
      if (p < 1) requestAnimationFrame(anim)
    }
    requestAnimationFrame(anim)
  }, [started, end, duration])
  return <div ref={ref}>{count}{suffix}</div>
}

/* ─────────── Section Badge ─────────── */
