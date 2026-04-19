'use client'

import { useEffect, useRef } from 'react'
import styles from './CursorGlow.module.css'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let x = 0, y = 0
    let cx = 0, cy = 0
    let raf: number

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const animate = () => {
      cx += (x - cx) * 0.08
      cy += (y - cy) * 0.08
      el.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />
}
