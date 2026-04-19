'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { unlockEgg } from '@/lib/easter-eggs'

const HOVER_MS = 3000

export function CopyrightEgg({ year }: { year: string }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  const startTimer = () => {
    startRef.current = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startRef.current
      const pct = Math.min(elapsed / HOVER_MS, 1)
      setProgress(pct)
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDone(true)
        unlockEgg('egg_copyright')
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const stopTimer = () => {
    cancelAnimationFrame(rafRef.current)
    if (!done) setProgress(0)
  }

  return (
    <span
      style={{ position: 'relative', cursor: 'help', display: 'inline-block' }}
      onMouseEnter={startTimer}
      onMouseLeave={stopTimer}
      onFocus={startTimer}
      onBlur={stopTimer}
      aria-label={`${year} — hover to discover`}
    >
      {year}
      {progress > 0 && !done && (
        <motion.span
          style={{
            position: 'absolute',
            bottom: '-3px',
            left: 0,
            height: '2px',
            background: 'var(--color-accent-teal)',
            transformOrigin: 'left',
            scaleX: progress,
            width: '100%',
            display: 'block',
          }}
        />
      )}
      {done && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-accent-teal)',
            color: 'var(--color-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            padding: '0.2em 0.5em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          existential
        </motion.span>
      )}
    </span>
  )
}
