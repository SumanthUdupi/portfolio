'use client'

import { useEffect, useRef } from 'react'
import styles from './CursorGlow.module.css'

export function CursorGlow() {
  const mainRef  = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const main  = mainRef.current
    const trail = trailRef.current
    if (!main || !trail) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let mx = tx, my = ty   // main blob (slow)
    let rx = tx, ry = ty   // trail dot (fast)
    let raf: number

    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }

    const tick = () => {
      // Main blob — slow, buttery
      mx += (tx - mx) * 0.06
      my += (ty - my) * 0.06
      main.style.transform = `translate(${mx}px, ${my}px)`

      // Trail dot — faster
      rx += (tx - rx) * 0.22
      ry += (ty - ry) * 0.22
      trail.style.transform = `translate(${rx}px, ${ry}px)`

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={mainRef}  className={styles.glow}  aria-hidden="true" />
      <div ref={trailRef} className={styles.trail} aria-hidden="true" />
    </>
  )
}
