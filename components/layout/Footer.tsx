'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { TOTAL_EGGS } from '@/config/easter-eggs'
import { countFoundEggs } from '@/lib/easter-eggs'
import { CopyrightEgg } from '@/components/easter-eggs/CopyrightEgg'
import styles from './Footer.module.css'

export function Footer() {
  const [found, setFound] = useState(0)

  useEffect(() => {
    setFound(countFoundEggs())
    const handler = () => setFound(countFoundEggs())
    window.addEventListener('egg-found', handler)
    return () => window.removeEventListener('egg-found', handler)
  }, [])

  const year = new Date().getFullYear().toString()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <p className={styles.copy}>
          &copy; {site.founded}–<CopyrightEgg year={year} /> {site.name}
        </p>

        <nav aria-label="Footer navigation" className={styles.links}>
          <Link href="/uses">Uses</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/secret" className={styles.eggLink}>
            <span aria-label={`Easter eggs: ${found} of ${TOTAL_EGGS} found`}>
              🥚{' '}
              <span aria-hidden="true" className={found > 0 ? styles.eggActive : ''}>
                {found}/{TOTAL_EGGS}
              </span>
            </span>
          </Link>
        </nav>
      </div>
    </footer>
  )
}
