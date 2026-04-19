'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { unlockEgg } from '@/lib/easter-eggs'
import styles from './KonamiCode.module.css'

const SEQUENCE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const LABELS   = ['↑','↑','↓','↓','←','→','←','→','B','A']

export function KonamiCode() {
  const [pos, setPos] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return

      const key = e.key.toLowerCase()
      const expected = SEQUENCE[pos].toLowerCase()

      if (key === expected) {
        const next = pos + 1
        if (next === SEQUENCE.length) {
          setPos(0)
          setShow(false)
          unlockEgg('egg_konami')
        } else {
          setPos(next)
          setShow(true)
          // Hide indicator after 3s of inactivity
          clearTimeout((handler as unknown as { _t: ReturnType<typeof setTimeout> })._t)
          ;(handler as unknown as { _t: ReturnType<typeof setTimeout> })._t = setTimeout(() => {
            setPos(0)
            setShow(false)
          }, 3000)
        }
      } else if (SEQUENCE[0].toLowerCase() === key) {
        setPos(1)
        setShow(true)
      } else {
        setPos(0)
        setShow(false)
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      clearTimeout((handler as unknown as { _t: ReturnType<typeof setTimeout> })._t)
    }
  }, [pos])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.indicator}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-hidden="true"
        >
          {LABELS.map((label, i) => (
            <span
              key={i}
              className={`${styles.key} ${i < pos ? styles.done : ''} ${i === pos ? styles.next : ''}`}
            >
              {label}
            </span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
