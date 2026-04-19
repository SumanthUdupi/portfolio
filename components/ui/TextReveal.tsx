'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import styles from './TextReveal.module.css'

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

type Props = {
  children: string
  as?: Tag
  delay?: number
  className?: string
  stagger?: number
  id?: string
}

const wordVariants = {
  hidden: { y: '105%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      delay: i,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i },
  }),
}

export function TextReveal({
  children,
  as: Tag = 'h2',
  delay = 0,
  className,
  stagger = 0.06,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()

  const variants = prefersReduced ? reducedVariants : wordVariants
  const words = children.split(' ')

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.h2

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      id={id}
      className={`${styles.wrap} ${className ?? ''}`}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span key={i} className={styles.line} aria-hidden="true">
          <motion.span
            className={styles.word}
            custom={delay + i * stagger}
            variants={variants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className={styles.space}>&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  )
}
