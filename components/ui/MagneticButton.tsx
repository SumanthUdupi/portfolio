'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import styles from './MagneticButton.module.css'

type Props = {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
}

export function MagneticButton({ children, strength = 18, radius = 80, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < radius) {
      const pull = 1 - dist / radius
      rawX.set(dx * pull * (strength / radius) * 2.5)
      rawY.set(dy * pull * (strength / radius) * 2.5)
    } else {
      rawX.set(0); rawY.set(0)
    }
  }

  const handleMouseLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ x, y }} className={styles.inner}>
        {children}
      </motion.div>
    </div>
  )
}
