'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Chip } from '@/components/chip/Chip'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ChipClickEgg } from '@/components/easter-eggs/ChipClickEgg'
import { site } from '@/config/site'
import styles from './HeroSection.module.css'

const words = site.tagline.split(' ')

const PARTICLES = [
  { top: '22%', left: '18%', size: 5, duration: 4.8, delay: 0    },
  { top: '65%', left: '72%', size: 3, duration: 3.6, delay: 0.6  },
  { top: '38%', left: '88%', size: 4, duration: 5.2, delay: 1.1  },
  { top: '78%', left: '32%', size: 3, duration: 4.1, delay: 0.3  },
  { top: '15%', left: '55%', size: 2, duration: 6.0, delay: 0.9  },
]

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { mass: 0.08, stiffness: 100, damping: 20 })
  const prog = prefersReduced ? scrollYProgress : smooth

  const yGrid = useTransform(prog, [0, 1], ['0%',  '-5%'])
  const yOrb2 = useTransform(prog, [0, 1], ['0%',  '-25%'])
  const yOrb1 = useTransform(prog, [0, 1], ['0%',  '-45%'])
  const yChip = useTransform(prog, [0, 1], ['0%',  '-15%'])
  const opacity = useTransform(prog, [0, 0.55], [1, 0])

  return (
    <section ref={ref} className={styles.hero} aria-label="Introduction">
      {/* Background — multi-layer parallax */}
      <motion.div className={styles.bgGrid}    style={{ y: yGrid }} aria-hidden="true" />
      <motion.div className={styles.bgOrb2}    style={{ y: yOrb2 }} aria-hidden="true" />
      <motion.div className={styles.bgOrb1}    style={{ y: yOrb1 }} aria-hidden="true" />

      {/* Drifting particles */}
      {!prefersReduced && PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className={styles.particle}
          aria-hidden="true"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

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

        {/* Name — letter by letter */}
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

        {/* Tagline — word by word */}
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

        {/* CTAs — magnetic */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <MagneticButton strength={20} radius={90}>
            <Link href="/work" className={styles.ctaPrimary}>
              View my work
              <span className={styles.ctaArrow} aria-hidden="true">↗</span>
            </Link>
          </MagneticButton>

          <MagneticButton strength={14} radius={70}>
            <Link href="/blog" className={styles.ctaSecondary}>Read the blog</Link>
          </MagneticButton>

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

        {/* Floating CHIP — parallax layer + click egg */}
        <motion.div
          className={styles.chipFloat}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 1.6, type: 'spring', stiffness: 200 }}
          style={{ y: yChip, position: 'relative' }}
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
