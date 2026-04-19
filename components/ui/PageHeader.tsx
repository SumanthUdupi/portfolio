'use client'

import { motion } from 'framer-motion'
import { TextReveal } from './TextReveal'
import styles from './PageHeader.module.css'

type Props = {
  title: string
  sub: string
  accent?: string
}

export function PageHeader({ title, sub, accent }: Props) {
  return (
    <header className={styles.header}>
      {accent && (
        <motion.span
          className={styles.accent}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {accent}
        </motion.span>
      )}
      <TextReveal as="h1" className={styles.title} stagger={0.04}>
        {title}
      </TextReveal>
      <div className={styles.subSlot}>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {sub}
        </motion.p>
      </div>
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </header>
  )
}
