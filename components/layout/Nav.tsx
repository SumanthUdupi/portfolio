'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Chip } from '../chip/Chip'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useCalm } from '@/lib/calm-mode'
import { site } from '@/config/site'
import styles from './Nav.module.css'

const navLinks = [
  { href: '/work',  label: 'Work'  },
  { href: '/blog',  label: 'Blog'  },
  { href: '/about', label: 'About' },
]

export function Nav() {
  const [hidden,    setHidden]    = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [lastY,     setLastY]     = useState(0)
  const pathname = usePathname()
  const { calm, toggle } = useCalm()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 80)
      setScrolled(y > 20)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <motion.header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      role="banner"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={`${site.name} — home`}>
          <Chip state="idle" size={28} />
          <span className={styles.brandName}>{site.name}</span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className={styles.links} role="list">
            {navLinks.map(l => {
              const active = pathname.startsWith(l.href)
              return (
                <li key={l.href} className={styles.linkItem}>
                  <Link href={l.href} className={`${styles.link} ${active ? styles.active : ''}`}>
                    {l.label}
                    {active && (
                      <motion.span
                        className={styles.underline}
                        layoutId="nav-underline"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            onClick={toggle}
            className={`${styles.calmBtn} ${calm ? styles.calmActive : ''}`}
            aria-label={calm ? 'Calm mode on — click to disable' : 'Enable calm mode'}
            title="Calm mode (Ctrl+Shift+C)"
          >
            {calm ? '~' : '≋'}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
