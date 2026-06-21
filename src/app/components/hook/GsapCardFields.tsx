'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type DeckKind = 'services' | 'process' | 'faq' | 'default'


function getDeckKind(deck: HTMLElement): DeckKind {
  if (deck.classList.contains('services-stack')) return 'services'
  if (deck.classList.contains('process-stack')) return 'process'
  if (deck.classList.contains('faq-stack')) return 'faq'
  return 'default'
}

function getDeckSettings(kind: DeckKind, cardsCount: number) {
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900

  if (kind === 'services') {
    return {
      deckHeight: Math.max(430, Math.min(520, vh * 0.62)),
      stepDistance: Math.max(560, Math.min(760, vh * 0.82)),
      start: 'top 18%',
      side: 2.8,
    }
  }

  if (kind === 'process') {
    return {
      deckHeight: Math.max(520, Math.min(640, vh * 0.76)),
      stepDistance: Math.max(650, Math.min(860, vh * 0.92)),
      start: 'top 13%',
      side: 3.2,
    }
  }

  if (kind === 'faq') {
    return {
      deckHeight: Math.max(300, Math.min(390, vh * 0.46)),
      stepDistance: Math.max(430, Math.min(590, vh * 0.66)),
      start: 'top 22%',
      side: 2,
    }
  }

  return {
    deckHeight: Math.max(420, Math.min(560, vh * 0.62)),
    stepDistance: Math.max(520, Math.min(700, vh * 0.75)),
    start: 'top 16%',
    side: 2.5,
  }
}

export default function GsapCardFields() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const decks = gsap.utils.toArray<HTMLElement>('.gsap-stacked-deck')

        decks.forEach((deck) => {
          const cards = gsap.utils.toArray<HTMLElement>('.gsap-card-item', deck)
          if (cards.length < 2) return

          const kind = getDeckKind(deck)
          const settings = getDeckSettings(kind, cards.length)

          gsap.set(deck, {
            position: 'relative',
            height: settings.deckHeight,
            minHeight: settings.deckHeight,
            overflow: 'hidden',
            perspective: 1800,
            isolation: 'isolate',
            maxWidth: 1040,
            marginInline: 'auto',
          })

          cards.forEach((card, index) => {
            const inner = card.firstElementChild as HTMLElement | null

            gsap.set(card, {
              position: 'absolute',
              inset: 0,
              zIndex: index + 1,
              yPercent: index === 0 ? 0 : 112,
              xPercent: 0,
              scale: index === 0 ? 1 : 0.985,
              rotateX: index === 0 ? 0 : 5,
              rotateZ: 0,
              opacity: index === 0 ? 1 : 0,
              filter: index === 0 ? 'brightness(1) blur(0px)' : 'brightness(0.9) blur(0px)',
              transformOrigin: 'center top',
              willChange: 'transform, opacity, filter',
              force3D: true,
              pointerEvents: index === 0 ? 'auto' : 'none',
            })

            if (inner) {
              gsap.set(inner, {
                // height: '100%',
                // minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              })
            }
          })

          const tl = gsap.timeline({ defaults: { ease: 'none' } })

          for (let i = 1; i < cards.length; i += 1) {
            const current = cards[i]
            const previous = cards[i - 1]
            const at = i - 1
            const side = i % 2 === 0 ? 1 : -1

            tl.set(current, { pointerEvents: 'auto' }, at)
              .to(current, {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateZ: 0,
                filter: 'brightness(1) blur(0px)',
                duration: 0.84,
              }, at)
              .to(previous, {
                yPercent: -7,
                xPercent: side * settings.side,
                scale: 0.9,
                rotateX: side * 7,
                rotateZ: side * 1.25,
                opacity: 0.08,
                filter: 'brightness(0.32) blur(1.8px)',
                duration: 0.84,
              }, at)
              .set(previous, { pointerEvents: 'none' }, at + 0.84)

            cards.slice(0, i - 1).forEach((oldCard, oldIndex) => {
              const depth = i - oldIndex
              tl.to(oldCard, {
                yPercent: -10 - depth * 1.2,
                xPercent: (oldIndex % 2 === 0 ? 1 : -1) * Math.min(4.5, depth * 1.4),
                scale: Math.max(0.78, 0.86 - depth * 0.025),
                rotateZ: (oldIndex % 2 === 0 ? 1 : -1) * Math.min(2.4, depth * 0.7),
                opacity: 0,
                filter: 'brightness(0.16) blur(2.6px)',
                duration: 0.84,
              }, at)
            })

            // readable pause after every card lands
            tl.to({}, { duration: 0.22 }, at + 0.84)
          }

          ScrollTrigger.create({
            animation: tl,
            trigger: deck,
            start: settings.start,
            end: () => `+=${(cards.length - 1) * settings.stepDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          })
        })

        const refresh = () => ScrollTrigger.refresh()
        window.addEventListener('load', refresh)
        requestAnimationFrame(refresh)

        return () => {
          window.removeEventListener('load', refresh)
        }
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.set('.gsap-stacked-deck', { clearProps: 'all' })
        gsap.set('.gsap-card-item', { clearProps: 'all' })

        const cards = gsap.utils.toArray<HTMLElement>('.gsap-card-item')
        cards.forEach((card, index) => {
          gsap.from(card, {
            y: 34,
            opacity: 0,
            scale: 0.97,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: (index % 4) * 0.025,
          })
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
