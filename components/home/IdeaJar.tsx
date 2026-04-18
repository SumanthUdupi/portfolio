'use client'

import { useState } from 'react'
import { ideaJar } from '@/config/current'
import { Chip } from '@/components/chip/Chip'
import styles from './IdeaJar.module.css'

export function IdeaJar() {
  const [idx, setIdx] = useState(0)

  const next = () => setIdx(i => (i + 1) % ideaJar.length)

  return (
    <div className={styles.jar}>
      <div className={styles.header}>
        <Chip state="working" size={24} />
        <span className={styles.label}>Idea Jar</span>
      </div>
      <blockquote className={styles.quote}>
        "{ideaJar[idx]}"
      </blockquote>
      <button onClick={next} className={styles.btn} aria-label="Next idea">
        shake the jar →
      </button>
    </div>
  )
}
