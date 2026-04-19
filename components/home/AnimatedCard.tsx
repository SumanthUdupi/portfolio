'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'
import { cardItemVariant, reducedCardItemVariant } from './StaggerList'

type Props = {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export function AnimatedCard({ children, style, className }: Props) {
  const prefersReduced = useReducedMotion()
  const variant = prefersReduced ? reducedCardItemVariant : cardItemVariant

  return (
    <motion.li variants={variant} style={style} className={className}>
      {children}
    </motion.li>
  )
}
