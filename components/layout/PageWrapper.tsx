'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './PageWrapper.module.css'

type PageWrapperProps = {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main id="main-content" className={`${styles.wrapper} ${className ?? ''}`}>
      {/* Ambient background blob — subtle on inner pages */}
      <div className={styles.ambient} aria-hidden="true">
        <motion.div
          className={styles.ambientBlob1}
          animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.10, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.ambientBlob2}
          animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  )
}
