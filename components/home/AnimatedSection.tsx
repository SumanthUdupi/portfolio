'use client'

import { motion } from 'framer-motion'
import type { ReactNode, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export function AnimatedSection({ children, className, ...props }: Props) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...(props as React.ComponentProps<typeof motion.section>)}
    >
      {children}
    </motion.section>
  )
}
