'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EGGS, TOTAL_EGGS, type Egg } from '@/config/easter-eggs'
import { getFoundEggs } from '@/lib/easter-eggs'
import styles from './EggHuntBoard.module.css'

export function EggHuntBoard() {
  const [found, setFound] = useState<string[]>([])

  useEffect(() => {
    setFound(getFoundEggs())
    const handler = () => setFound(getFoundEggs())
    window.addEventListener('egg-found', handler)
    return () => window.removeEventListener('egg-found', handler)
  }, [])

  const pct = Math.round((found.length / TOTAL_EGGS) * 100)

  return (
    <div className={styles.board}>
      <div className={styles.progress}>
        <div className={styles.progressLabel}>
          <span>{found.length}/{TOTAL_EGGS} discovered</span>
          <span className={styles.pct}>{pct}%</span>
        </div>
        <div className={styles.track}>
          <motion.div
            className={styles.fill}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {(Object.entries(EGGS) as [string, Egg][]).map(([num, egg], i) => {
          const isFound = found.includes(egg.key)
          return (
            <motion.div
              key={egg.key}
              className={`${styles.egg} ${isFound ? styles.found : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <div className={styles.eggNum}>#{num}</div>
              <div className={styles.eggIcon} aria-hidden="true">
                {isFound ? '🥚' : '?'}
              </div>
              <div className={styles.eggInfo}>
                <strong className={styles.eggName}>
                  {isFound ? egg.label : '???'}
                </strong>
                <p className={styles.eggHint}>
                  {isFound ? `✓ found` : egg.trigger}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {found.length === TOTAL_EGGS && (
        <motion.div
          className={styles.winner}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          🎉 You found all {TOTAL_EGGS} eggs. Chaos mastered.
        </motion.div>
      )}
    </div>
  )
}
