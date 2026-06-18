'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function emitHook(progress: number, active: number) {
  window.dispatchEvent(new CustomEvent('hook:pull', { detail: { progress, active } }))
}

export default function GsapCardFields() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const decks = gsap.utils.toArray<HTMLElement>('.gsap-stacked-deck')

        decks.forEach((deck, deckIndex) => {
          const cards = gsap.utils.toArray<HTMLElement>('.gsap-card-item', deck)
          if (cards.length < 2) return

          const isFaq = deck.classList.contains('faq-stack')
          const deckHeight = isFaq ? Math.min(620, window.innerHeight * 0.74) : Math.min(600, window.innerHeight * 0.7)

          gsap.set(deck, {
            position: 'relative',
            height: deckHeight,
            overflow: 'visible',
            perspective: 1400,
          })

          cards.forEach((card, index) => {
            gsap.set(card, {
              position: 'absolute',
              inset: 0,
              zIndex: index + 1,
              yPercent: index === 0 ? 0 : 112,
              scale: index === 0 ? 1 : 0.965,
              rotateX: index === 0 ? 0 : 8,
              opacity: 1,
              filter: index === 0 ? 'brightness(1) blur(0px)' : 'brightness(0.92) blur(0px)',
              transformOrigin: 'center top',
              willChange: 'transform, filter',
            })
          })

          const tl = gsap.timeline({ defaults: { ease: 'none' } })

          for (let i = 1; i < cards.length; i += 1) {
            const current = cards[i]
            const previous = cards[i - 1]
            const at = i - 1

            tl.to(current, { yPercent: 0, scale: 1, rotateX: 0, filter: 'brightness(1) blur(0px)', duration: 1 }, at)
            tl.to(previous, {
              yPercent: -7,
              scale: 0.88,
              rotateX: i % 2 === 0 ? 10 : -10,
              filter: 'brightness(0.48) blur(2.5px)',
              duration: 1,
            }, at)

            cards.slice(0, i - 1).forEach((oldCard, oldIndex) => {
              tl.to(oldCard, {
                yPercent: -11 - (i - oldIndex) * 1.4,
                scale: Math.max(0.78, 0.84 - (i - oldIndex) * 0.018),
                filter: 'brightness(0.3) blur(3.5px)',
                duration: 1,
              }, at)
            })
          }

          ScrollTrigger.create({
            animation: tl,
            trigger: deck,
            start: 'top 14%',
            end: () => `+=${Math.max(cards.length - 1, 1) * window.innerHeight * (isFaq ? 0.9 : 0.82)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const total = cards.length - 1
              const scaled = self.progress * total
              const local = scaled - Math.floor(scaled)
              emitHook(local || self.progress, deckIndex + 1)
            },
            onLeave: () => window.dispatchEvent(new CustomEvent('hook:idle')),
            onLeaveBack: () => window.dispatchEvent(new CustomEvent('hook:idle')),
          })
        })

        ScrollTrigger.refresh()
        return () => window.dispatchEvent(new CustomEvent('hook:idle'))
      })

      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.gsap-card-item')
        cards.forEach((card, index) => {
          gsap.from(card, {
            y: 42,
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
            delay: (index % 4) * 0.03,
          })
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
