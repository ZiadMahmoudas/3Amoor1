'use client'

import { useRef } from 'react'
import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type HookStackCardProps = {
  children: React.ReactNode
  className?: string
  /**
   * Scroll distance for this card in viewport units.
   * 100 = normal screen, 160/180 = section takes its time.
   */
  hold?: number
}

export function HookStackCard({
  children,
  className = '',
  hold = 125,
}: HookStackCardProps) {
  const style = {
    '--hook-card-hold': `${hold}vh`,
  } as CSSProperties

  return (
    <section className="hook-stack-card relative" style={style}>
      <div className={`hook-card-shell sticky top-0 min-h-screen overflow-hidden bg-[#0A0A0A] ${className}`}>
        <div className="hook-card-overlay pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
        <div className="hook-catch-line pointer-events-none absolute right-[92px] top-1/2 z-30 hidden h-[2px] w-28 origin-right -translate-y-1/2 bg-gradient-to-l from-hook-red via-hook-red/50 to-transparent opacity-0 lg:block" />
        <div className="hook-catch-dot pointer-events-none absolute right-[84px] top-1/2 z-30 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-hook-red opacity-0 shadow-[0_0_28px_rgba(200,0,0,0.95)] lg:block" />
        <div className="hook-card-content relative z-10 flex min-h-screen w-full items-center">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
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

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        cards.forEach((card, index) => {
          const shell = card.querySelector<HTMLElement>('.hook-card-shell')
          if (!shell) return

          gsap.set(card, { zIndex: index + 1 })
          gsap.set(shell, {
            zIndex: index + 1,
            transformOrigin: index % 2 === 0 ? 'right top' : 'left top',
            force3D: true,
          })
        })

        cards.forEach((card, index) => {
          if (index >= cards.length - 1) return

          const currentShell = card.querySelector<HTMLElement>('.hook-card-shell')
          const currentOverlay = card.querySelector<HTMLElement>('.hook-card-overlay')
          const nextCard = cards[index + 1]
          const nextLine = nextCard.querySelector<HTMLElement>('.hook-catch-line')
          const nextDot = nextCard.querySelector<HTMLElement>('.hook-catch-dot')

          if (!currentShell) return

          ScrollTrigger.create({
            trigger: nextCard,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              window.dispatchEvent(
                new CustomEvent('hook:pull', {
                  detail: { progress: 0, active: index + 1 },
                })
              )
            },
            onLeave: () => {
              window.dispatchEvent(new CustomEvent('hook:idle'))
            },
            onLeaveBack: () => {
              window.dispatchEvent(new CustomEvent('hook:idle'))
            },
            onUpdate: (self) => {
              const p = self.progress
              const pull = Math.sin(p * Math.PI)

              gsap.set(currentShell, {
                scale: 1 - p * 0.22,
                yPercent: -p * 8,
                rotation: index % 2 === 0 ? p * 3.5 : -p * 3.5,
                rotationX: index % 2 === 0 ? p * 24 : -p * 24,
                filter: `blur(${p * 2.2}px)`,
              })

              if (currentOverlay) {
                gsap.set(currentOverlay, { opacity: p * 0.56 })
              }

              if (nextLine) {
                gsap.set(nextLine, {
                  opacity: p > 0.18 && p < 0.82 ? 1 : 0,
                  scaleX: Math.min(1, Math.max(0, (p - 0.18) / 0.2)),
                })
              }

              if (nextDot) {
                gsap.set(nextDot, {
                  opacity: p > 0.2 && p < 0.9 ? 1 : 0,
                  scale: 0.85 + pull * 1.05,
                })
              }

              window.dispatchEvent(
                new CustomEvent('hook:pull', {
                  detail: { progress: p, active: index + 1 },
                })
              )
            },
          })
        })

        ScrollTrigger.refresh()

        return () => {
          window.dispatchEvent(new CustomEvent('hook:idle'))
        }
      })

      mm.add('(max-width: 1023px)', () => {
        window.dispatchEvent(new CustomEvent('hook:idle'))
      })

      return () => mm.revert()
    },
    { scope: stackRef }
  )

  return <div ref={stackRef} className="hook-cards-stack relative">{children}</div>
}
