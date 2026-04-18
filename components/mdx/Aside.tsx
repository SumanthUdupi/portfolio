import type { ReactNode } from 'react'
import styles from './Aside.module.css'

type AsideProps = {
  children: ReactNode
  type?: 'note' | 'warning' | 'tip'
}

const icons = { note: 'ℹ', warning: '⚠', tip: '💡' }

export function Aside({ children, type = 'note' }: AsideProps) {
  return (
    <aside className={`${styles.aside} ${styles[type]}`} role="note">
      <span className={styles.icon} aria-hidden="true">{icons[type]}</span>
      <div className={styles.content}>{children}</div>
    </aside>
  )
}
