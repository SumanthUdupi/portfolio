'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Chip } from '@/components/chip/Chip'
import { site } from '@/config/site'
import { ChipClickEgg } from '@/components/easter-eggs/ChipClickEgg'
import styles from './HeroSection.module.css'

const words = site.tagline.split(' ')

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y1    = useTransform(scrollYProgress, [0, 1], ['0%',  '-20%'])
  const y2    = useTransform(scrollYProgress, [0, 1], ['0%',  '-40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className={styles.hero} aria-label="Introduction">
      {/* Parallax background elements */}
      <motion.div className={styles.bgOrb1} style={{ y: y2 }} aria-hidden="true" />
      <motion.div className={styles.bgOrb2} style={{ y: y1 }} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />

      <motion.div className={styles.content} style={{ opacity }}>
        {/* Eyebrow */}
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Chip state="idle" size={20} />
          <span>{site.role}</span>
          <span className={styles.separator} aria-hidden="true">·</span>
          <span className={styles.available}>Available for work</span>
        </motion.div>

        {/* Name */}
        <div className={styles.nameWrap} aria-label={site.name}>
          {'Sumanth Udupi'.split('').map((char, i) => (
            <motion.span
              key={i}
              className={styles.nameChar}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className={styles.taglineWord}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.07 }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Link href="/work" className={styles.ctaPrimary}>
            View my work
            <span className={styles.ctaArrow} aria-hidden="true">↗</span>
          </Link>
          <Link href="/blog" className={styles.ctaSecondary}>Read the blog</Link>
          <motion.span
            className={styles.konamiHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ delay: 3, duration: 2, repeat: 4, repeatDelay: 8 }}
            aria-hidden="true"
            title="↑↑↓↓←→←→BA"
          >
            ⌨
          </motion.span>
        </motion.div>

        {/* Floating CHIP — click 5 times for egg #2 */}
        <motion.div
          className={styles.chipFloat}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 1.6, type: 'spring', stiffness: 200 }}
          style={{ y: y1, position: 'relative' }}
        >
          <ChipClickEgg size={96} hint />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        aria-hidden="true"
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
