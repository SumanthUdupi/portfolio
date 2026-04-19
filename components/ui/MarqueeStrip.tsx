'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './MarqueeStrip.module.css'

type Props = {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  gap?: string
}

export function MarqueeStrip({ children, speed = 28, direction = 'left', className, gap = '2rem' }: Props) {
  const prefersReduced = useReducedMotion()
  const xFrom = direction === 'left' ? '0%' : '-50%'
  const xTo   = direction === 'left' ? '-50%' : '0%'

  return (
    <div
      className={`${styles.root} ${className ?? ''}`}
      aria-hidden="true"
      style={{ '--marquee-gap': gap } as React.CSSProperties}
    >
      <motion.div
        className={styles.track}
        animate={prefersReduced ? undefined : { x: [xFrom, xTo] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
      >
        <div className={styles.copy}>{children}</div>
        <div className={styles.copy}>{children}</div>
      </motion.div>
    </div>
  )
}
