'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HookSvg from './HookSvg'

type HookPullDetail = {
  progress: number
  active?: number
}

export default function HookRig() {
  const rigRef = useRef<HTMLDivElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)
  const ropeRef = useRef<HTMLDivElement>(null)
  const hookRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!reelRef.current || !ropeRef.current || !hookRef.current) return

    const spin = gsap.to(reelRef.current, {
      rotate: 360,
      duration: 4,
      ease: 'linear',
      repeat: -1,
    })

    const hookY = gsap.quickTo(hookRef.current, 'y', { duration: 0.22, ease: 'power3.out' })
    const hookX = gsap.quickTo(hookRef.current, 'x', { duration: 0.22, ease: 'power3.out' })
    const hookRotate = gsap.quickTo(hookRef.current, 'rotate', { duration: 0.22, ease: 'power3.out' })
    const hookScale = gsap.quickTo(hookRef.current, 'scale', { duration: 0.18, ease: 'power3.out' })
    const ropeHeight = gsap.quickTo(ropeRef.current, 'height', { duration: 0.22, ease: 'power3.out' })
    const glowOpacity = glowRef.current ? gsap.quickTo(glowRef.current, 'opacity', { duration: 0.18, ease: 'power2.out' }) : null
    const labelOpacity = labelRef.current ? gsap.quickTo(labelRef.current, 'opacity', { duration: 0.18, ease: 'power2.out' }) : null

    const onPull = (event: Event) => {
      const custom = event as CustomEvent<HookPullDetail>
      const p = Math.max(0, Math.min(1, custom.detail?.progress ?? 0))

      // Fishing motion: down to catch, then back up while the next card covers the old one.
      const drop = p < 0.42 ? p / 0.42 : Math.max(0, 1 - (p - 0.42) / 0.58)
      const catchPulse = p > 0.34 && p < 0.68 ? 1 : 0
      const y = 18 + drop * 300
      const x = 0 - Math.sin(p * Math.PI) * 16

      hookY(y)
      hookX(x)
      hookRotate(-10 + Math.sin(p * Math.PI * 2) * 14)
      hookScale(1 + catchPulse * 0.2 + Math.sin(p * Math.PI) * 0.08)
      ropeHeight(74 + drop * 305)
      glowOpacity?.(0.28 + catchPulse * 0.72)
      labelOpacity?.(catchPulse ? 1 : 0.28)
    }

    const onIdle = () => {
      hookY(18)
      hookX(0)
      hookRotate(-8)
      hookScale(1)
      ropeHeight(74)
      glowOpacity?.(0.28)
      labelOpacity?.(0.28)
    }

    window.addEventListener('hook:pull', onPull)
    window.addEventListener('hook:idle', onIdle)
    onIdle()

    return () => {
      spin.kill()
      window.removeEventListener('hook:pull', onPull)
      window.removeEventListener('hook:idle', onIdle)
    }
  }, [])

  return (
    <div ref={rigRef} className="hook-rig fixed right-0 top-0 z-40 hidden h-screen w-[124px] pointer-events-none lg:block">
      <div className="absolute right-3 top-3 z-20">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-hook-red/50 bg-[#070707]/95 shadow-[0_0_42px_rgba(200,0,0,0.3)]">
          <div ref={reelRef} className="relative h-8 w-8 rounded-full border-2 border-hook-red/70">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-hook-red/90" />
            </div>
            <div className="absolute left-1/2 top-1/2 h-[1px] w-full -translate-x-1/2 -translate-y-1/2 bg-hook-red/40" />
            <div className="absolute left-1/2 top-1/2 h-full w-[1px] -translate-x-1/2 -translate-y-1/2 bg-hook-red/40" />
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-black tracking-[0.3em] text-hook-red/50">HOOK</div>
        </div>
      </div>

      <div className="absolute right-[42px] top-[46px] z-10 w-[4px]">
        <div
          ref={ropeRef}
          className="h-[74px] w-full rounded-full bg-gradient-to-b from-hook-red/20 via-hook-red/75 to-hook-red/35 shadow-[0_0_16px_rgba(200,0,0,0.35)]"
        />
      </div>

      <div ref={hookRef} className="absolute right-[14px] top-[46px] z-20 origin-top will-change-transform">
        <div ref={glowRef} className="absolute -inset-16 rounded-full bg-hook-red/15 blur-3xl" />
        <div className="relative z-10 text-hook-red drop-shadow-[0_0_36px_rgba(200,0,0,0.85)]">
          <HookSvg width={65} height={115} />
        </div>
        <div className="absolute -left-5 top-24 h-3 w-3 rounded-full bg-hook-red/60 shadow-[0_0_16px_rgba(200,0,0,0.8)]" />
        <div className="absolute -right-3 top-32 h-2.5 w-2.5 rounded-full bg-hook-red/45" />
      </div>

      <div ref={labelRef} className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-[8px] font-black tracking-[0.35em] text-hook-red">
        CATCHING
      </div>
    </div>
  )
}
