'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HookStackCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`hook-stack-card relative min-h-screen overflow-hidden bg-[#0A0A0A] ${className}`}>
      <div className="hook-card-overlay pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
      <div className="hook-catch-line pointer-events-none absolute right-[92px] top-1/2 z-30 hidden h-[2px] w-28 origin-right -translate-y-1/2 bg-gradient-to-l from-hook-red via-hook-red/50 to-transparent opacity-0 lg:block" />
      <div className="hook-catch-dot pointer-events-none absolute right-[84px] top-1/2 z-30 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-hook-red opacity-0 shadow-[0_0_28px_rgba(200,0,0,0.95)] lg:block" />
      <div className="hook-card-content relative z-10">{children}</div>
    </div>
  )
}

export default function HookCardsStack({ children }: { children: React.ReactNode }) {
  const stackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = stackRef.current
      if (!root) return

      const cards = gsap.utils.toArray<HTMLElement>('.hook-stack-card', root)
      if (cards.length < 2) return

      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      if (!isDesktop) {
        window.dispatchEvent(new CustomEvent('hook:idle'))
        return
      }

      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: index + 1,
          transformOrigin: index % 2 === 0 ? 'right top' : 'left top',
        })
      })

      cards.forEach((card, index) => {
        if (index >= cards.length - 1) return

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        })

        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => window.dispatchEvent(new CustomEvent('hook:pull', { detail: { progress: 0, active: index + 1 } })),
          onLeaveBack: () => window.dispatchEvent(new CustomEvent('hook:idle')),
          onUpdate: (self) => {
            const p = self.progress
            const overlay = card.querySelector<HTMLElement>('.hook-card-overlay')
            const line = cards[index + 1].querySelector<HTMLElement>('.hook-catch-line')
            const dot = cards[index + 1].querySelector<HTMLElement>('.hook-catch-dot')

            gsap.set(card, {
              scale: 1 - p * 0.18,
              yPercent: -p * 7,
              rotation: index % 2 === 0 ? p * 3 : -p * 3,
              rotationX: index % 2 === 0 ? p * 18 : -p * 18,
              filter: `blur(${p * 1.8}px)`,
            })

            if (overlay) {
              gsap.set(overlay, { opacity: p * 0.58 })
            }

            if (line) {
              gsap.set(line, {
                opacity: p > 0.18 && p < 0.82 ? 1 : 0,
                scaleX: Math.min(1, Math.max(0, (p - 0.16) / 0.22)),
              })
            }

            if (dot) {
              gsap.set(dot, {
                opacity: p > 0.22 && p < 0.9 ? 1 : 0,
                scale: 0.75 + Math.sin(p * Math.PI) * 0.9,
              })
            }

            window.dispatchEvent(new CustomEvent('hook:pull', { detail: { progress: p, active: index + 1 } }))
          },
        })
      })

      ScrollTrigger.refresh()
    },
    { scope: stackRef }
  )

  return <div ref={stackRef} className="hook-cards-stack relative">{children}</div>
}
