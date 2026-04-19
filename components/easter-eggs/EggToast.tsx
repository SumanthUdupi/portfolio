'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EGGS } from '@/config/easter-eggs'
import styles from './EggToast.module.css'

type Toast = { id: number; key: string; label: string }

export function EggToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handler = (e: Event) => {
      const key = (e as CustomEvent).detail?.key as string
      if (!key) return
      const egg = Object.values(EGGS).find(eg => eg.key === key)
      if (!egg) return
      const id = Date.now()
      const toast: Toast = { id, key, label: egg.label }
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 4000)
    }
    window.addEventListener('egg-found', handler)
    return () => window.removeEventListener('egg-found', handler)
  }, [])

  return (
    <div className={styles.portal} aria-live="polite">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            className={styles.toast}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            <span className={styles.egg} aria-hidden="true">🥚</span>
            <div>
              <p className={styles.found}>Easter egg found!</p>
              <p className={styles.label}>{t.label}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
