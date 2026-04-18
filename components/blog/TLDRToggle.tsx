'use client'

import { useState, type ReactNode } from 'react'
import styles from './TLDRToggle.module.css'

type TLDRToggleProps = {
  summary: ReactNode
  full: ReactNode
}

export function TLDRToggle({ summary, full }: TLDRToggleProps) {
  const [showFull, setShowFull] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={!showFull}
          className={`${styles.tab} ${!showFull ? styles.active : ''}`}
          onClick={() => setShowFull(false)}
        >
          TL;DR
        </button>
        <button
          role="tab"
          aria-selected={showFull}
          className={`${styles.tab} ${showFull ? styles.active : ''}`}
          onClick={() => setShowFull(true)}
        >
          Full article
        </button>
      </div>

      <div role="tabpanel">
        {showFull ? full : summary}
      </div>
    </div>
  )
}
