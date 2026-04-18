import Link from 'next/link'
import { site } from '@/config/site'
import { TOTAL_EGGS } from '@/config/easter-eggs'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <p className={styles.copy}>
          &copy; {site.founded}–{new Date().getFullYear()} {site.name}
        </p>

        <nav aria-label="Footer navigation" className={styles.links}>
          <Link href="/uses">Uses</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/secret">
            <span aria-label={`Easter eggs: 0 of ${TOTAL_EGGS} found`}>
              🥚 <span aria-hidden="true">0/{TOTAL_EGGS}</span>
            </span>
          </Link>
        </nav>
      </div>
    </footer>
  )
}
