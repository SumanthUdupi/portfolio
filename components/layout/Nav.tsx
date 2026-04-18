'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Chip } from '../chip/Chip'
import { ThemeToggle } from '../ui/ThemeToggle'
import { site } from '@/config/site'
import styles from './Nav.module.css'

const navLinks = [
  { href: '/work',  label: 'Work'  },
  { href: '/blog',  label: 'Blog'  },
  { href: '/about', label: 'About' },
]

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY]   = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 80)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <header className={`${styles.nav} ${hidden ? styles.hidden : ''}`} role="banner">
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={`${site.name} — home`}>
          <Chip state="idle" size={32} />
          <span className={styles.brandName}>{site.name}</span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className={styles.links} role="list">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
