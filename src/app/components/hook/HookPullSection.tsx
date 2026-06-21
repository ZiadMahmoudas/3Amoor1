"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HookPullSection({
  children,
  delay = 0,
  className = '',
  index = 0,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  index?: number
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sparksRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current || !cardRef.current) return

    const ctx = gsap.context(() => {
      const card = cardRef.current
      const sparks = sparksRef.current?.children
      const trail = trailRef.current

      gsap.set(card, {
        opacity: 0,
        y: 280 + (index % 3) * 40,
        scaleX: 0.92,
        scaleY: 0.92,
        filter: 'blur(10px)',
        rotationX: 12,
        rotationZ: -2,
        transformPerspective: 1200,
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter',
      })

      if (sparks?.length) {
        gsap.set(sparks, {
          x: 0,
          y: 0,
          scaleX: 1.5,
          scaleY: 1.5,
          opacity: 0,
        })
      }

      if (trail) {
        gsap.set(trail, {
          opacity: 0,
          height: 100,
        })
      }

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 82%',
          once: true,
        },
      })

      tl.to(card, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        filter: 'blur(0px)',
        rotationX: 0,
        rotationZ: 0,
        duration: 1.15,
        ease: 'back.out(1.35)',
      })

      if (trail) {
        tl.to(
          trail,
          {
            opacity: 0.6,
            duration: 0.12,
            ease: 'power2.out',
          },
          '-=0.95'
        )

        tl.to(
          trail,
          {
            opacity: 0,
            height: 0,
            duration: 1.1,
            ease: 'power2.out',
          },
          '-=0.85'
        )
      }

      if (sparks?.length) {
        Array.from(sparks).forEach((spark, i) => {
          tl.fromTo(
            spark,
            {
              x: 0,
              y: 0,
              scaleX: 1.5,
              scaleY: 1.5,
              opacity: 1,
            },
            {
              x: 25 + i * 15,
              y: (i - 3) * 18,
              scaleX: 0,
              scaleY: 0,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            0.28 + i * 0.04
          )
        })
      }
    }, wrapperRef)

    return () => ctx.revert()
  }, [delay, index])

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div ref={cardRef} className="relative">
        {/* Spark burst */}
        <div
          ref={sparksRef}
          className="absolute -left-2 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-hook-red shadow-[0_0_6px_rgba(200,0,0,0.8)]"
            />
          ))}
        </div>

        {/* Red upward trail */}
        <div
          ref={trailRef}
          className="absolute left-0 bottom-0 w-[2px] bg-gradient-to-t from-hook-red/40 to-transparent hidden lg:block"
        />

        {children}
      </div>
    </div>
  )
}
/* ─────────── Counter ─────────── */
