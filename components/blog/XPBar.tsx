'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import styles from './XPBar.module.css'

export function XPBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className={styles.track} aria-hidden="true" role="presentation">
      <motion.div className={styles.fill} style={{ scaleX, transformOrigin: 'left' }} />
    </div>
  )
}
