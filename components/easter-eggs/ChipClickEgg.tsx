'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chip } from '@/components/chip/Chip'
import { unlockEgg } from '@/lib/easter-eggs'
import type { ChipState } from '@/components/chip/chip-states'

const CLICK_TARGET = 5
const STATES: ChipState[] = ['idle', 'confused', 'excited', 'working', 'error', 'victory']

type Props = { size?: number; hint?: boolean }

export function ChipClickEgg({ size = 96, hint = true }: Props) {
  const [clicks, setClicks] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [shaking, setShaking] = useState(false)

  const currentState = STATES[Math.min(clicks, STATES.length - 1)]

  const handleClick = useCallback(() => {
    const next = clicks + 1
    setClicks(next)
    setShaking(true)
    setTimeout(() => setShaking(false), 300)

    if (next >= CLICK_TARGET && !unlocked) {
      setUnlocked(true)
      unlockEgg('egg_chip_click')
      setTimeout(() => { setClicks(0); setUnlocked(false) }, 3000)
    }
  }, [clicks, unlocked])

  const hints = ['poke me', 'again!', 'keep going…', 'almost!', '🎉']
  const commentary = unlocked
    ? 'You found me! Glitch mode: ON'
    : hint && clicks > 0
    ? hints[Math.min(clicks - 1, hints.length - 1)]
    : undefined

  return (
    <motion.button
      onClick={handleClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      animate={shaking ? { rotate: [0, -8, 8, -8, 0] } : { rotate: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      aria-label={`CHIP mascot — click ${CLICK_TARGET - clicks} more times`}
    >
      <Chip
        state={unlocked ? 'victory' : currentState}
        size={size}
        commentary={commentary}
      />
      {hint && clicks > 0 && !unlocked && (
        <AnimatePresence>
          <motion.div
            key={clicks}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -24, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent-amber)',
              pointerEvents: 'none',
            }}
          >
            +{clicks}/{CLICK_TARGET}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.button>
  )
}
