'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

const variants = {
  initial: { opacity: 0, y: 8 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
