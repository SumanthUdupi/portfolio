'use client'

import Link from 'next/link'
import {
  motion,
  useScroll, useTransform, useSpring,
  useMotionValue, useReducedMotion,
} from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Chip } from '@/components/chip/Chip'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ChipClickEgg } from '@/components/easter-eggs/ChipClickEgg'
import { site } from '@/config/site'
import styles from './HeroSection.module.css'

const WORDS = site.tagline.split(' ')

// Particle definitions — varied sizes, positions, speeds
const PARTICLES = [
  { cx: 15, cy: 20, r: 28, color: 'teal',  dur: 6.2, delay: 0    },
  { cx: 82, cy: 15, r: 18, color: 'amber', dur: 4.8, delay: 1.1  },
  { cx: 70, cy: 72, r: 36, color: 'teal',  dur: 7.5, delay: 0.4  },
  { cx: 22, cy: 65, r: 16, color: 'amber', dur: 5.3, delay: 2.0  },
  { cx: 90, cy: 45, r: 22, color: 'teal',  dur: 8.1, delay: 0.7  },
  { cx: 50, cy: 88, r: 12, color: 'amber', dur: 4.1, delay: 1.6  },
  { cx: 35, cy: 42, r: 10, color: 'teal',  dur: 5.8, delay: 3.0  },
  { cx: 60, cy: 28, r: 8,  color: 'amber', dur: 6.6, delay: 0.2  },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  // ── Scroll parallax ──────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scrollSpring = useSpring(scrollYProgress, { mass: 0.05, stiffness: 80, damping: 18 })
  const sp = prefersReduced ? scrollYProgress : scrollSpring

  const yBlob1   = useTransform(sp, [0, 1], ['0%',  '-30%'])
  const yBlob2   = useTransform(sp, [0, 1], ['0%',  '-50%'])
  const yBlob3   = useTransform(sp, [0, 1], ['0%',  '-20%'])
  const yContent = useTransform(sp, [0, 1], ['0%',  '-12%'])
  const yChip    = useTransform(sp, [0, 1], ['0%',  '-22%'])
  const opacity  = useTransform(sp, [0, 0.5], [1, 0])

  // ── Mouse parallax ───────────────────────────────────────
  const rawMX = useMotionValue(0)
  const rawMY = useMotionValue(0)
  const mxS = useSpring(rawMX, { stiffness: 40, damping: 18, mass: 0.6 })
  const myS = useSpring(rawMY, { stiffness: 40, damping: 18, mass: 0.6 })

  // Different layers move at different rates and directions
  const b1x = useTransform(mxS, [-1, 1], ['-4%',  '4%'])
  const b1y = useTransform(myS, [-1, 1], ['-4%',  '4%'])
  const b2x = useTransform(mxS, [-1, 1], ['6%',  '-6%'])
  const b2y = useTransform(myS, [-1, 1], ['5%',  '-5%'])
  const b3x = useTransform(mxS, [-1, 1], ['-2%',  '2%'])
  const b3y = useTransform(myS, [-1, 1], ['3%',  '-3%'])
  const cxT = useTransform(mxS, [-1, 1], ['-12px', '12px'])
  const cyT = useTransform(myS, [-1, 1], ['-12px', '12px'])
  const txT = useTransform(mxS, [-1, 1], ['-5px',  '5px'])
  const tyT = useTransform(myS, [-1, 1], ['-4px',  '4px'])

  useEffect(() => {
    if (prefersReduced) return
    const handler = (e: MouseEvent) => {
      rawMX.set((e.clientX / window.innerWidth)  * 2 - 1)
      rawMY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [prefersReduced, rawMX, rawMY])

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Introduction">

      {/* ── Background blobs — outside overflow clip ─────── */}
      <div className={styles.blobLayer} aria-hidden="true">
        <motion.div className={styles.blob1} style={{ y: yBlob1, x: b1x, translateY: b1y }} />
        <motion.div className={styles.blob2} style={{ y: yBlob2, x: b2x, translateY: b2y }} />
        <motion.div className={styles.blob3} style={{ y: yBlob3, x: b3x, translateY: b3y }} />
      </div>

      {/* ── Grid — scrolls slower ───────────────────────── */}
      <motion.div
        className={styles.bgGrid}
        style={{ y: useTransform(sp, [0, 1], ['0%', '-8%']) }}
        aria-hidden="true"
      />

      {/* ── Floating particles ───────────────────────────── */}
      {!prefersReduced && (
        <div className={styles.particleLayer} aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className={`${styles.particle} ${styles[`particle_${p.color}`]}`}
              style={{
                left: `${p.cx}%`,
                top:  `${p.cy}%`,
                width:  p.r,
                height: p.r,
              }}
              animate={{
                y:       [0, -(p.r * 1.5), 0],
                x:       [0, p.r * 0.4, 0],
                opacity: [0.4, 0.85, 0.4],
                scale:   [1, 1.15, 1],
              }}
              transition={{
                duration:   p.dur,
                delay:      p.delay,
                repeat:     Infinity,
                ease:       'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Main content ─────────────────────────────────── */}
      <motion.div className={styles.content} style={{ opacity, y: yContent, x: txT, translateY: tyT }}>

        {/* Eyebrow */}
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Chip state="idle" size={20} />
          <span>{site.role}</span>
          <span className={styles.separator} aria-hidden="true">·</span>
          <motion.span
            className={styles.available}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Available for work
          </motion.span>
        </motion.div>

        {/* Name */}
        <h1 className={styles.nameWrap} aria-label={site.name}>
          {'Sumanth Udupi'.split('').map((char, i) => (
            <motion.span
              key={i}
              className={styles.nameChar}
              initial={{ opacity: 0, y: 80, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay:    0.15 + i * 0.038,
                ease:     [0.22, 1, 0.36, 1],
              }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <div className={styles.taglineWrap}>
          {WORDS.map((word, i) => (
            <div key={i} className={styles.taglineSlot}>
              <motion.span
                className={styles.taglineWord}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.9 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <MagneticButton strength={22} radius={100}>
            <Link href="/work" className={styles.ctaPrimary}>
              View my work
              <motion.span
                className={styles.ctaArrow}
                aria-hidden="true"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↗
              </motion.span>
            </Link>
          </MagneticButton>

          <MagneticButton strength={14} radius={80}>
            <Link href="/blog" className={styles.ctaSecondary}>Read the blog</Link>
          </MagneticButton>

          <motion.span
            className={styles.konamiHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0] }}
            transition={{ delay: 4, duration: 2.5, repeat: Infinity, repeatDelay: 12 }}
            aria-hidden="true"
            title="↑↑↓↓←→←→BA"
          >⌨</motion.span>
        </motion.div>
      </motion.div>

      {/* ── CHIP — deepest parallax layer ───────────────── */}
      <motion.div
        className={styles.chipWrap}
        style={{ y: yChip, x: cxT, translateY: cyT }}
        initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 1.7, type: 'spring', stiffness: 180, damping: 18 }}
      >
        <ChipClickEgg size={120} hint />
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────── */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ opacity }}
        aria-hidden="true"
      >
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0], y: [0, 12, 24] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className={styles.scrollLabel}>scroll</span>
      </motion.div>
    </section>
  )
}
