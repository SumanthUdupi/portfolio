import type { ReactNode } from 'react'
import styles from './Takeaway.module.css'

type TakeawayProps = {
  children: ReactNode
}

export function Takeaway({ children }: TakeawayProps) {
  return (
    <div className={styles.box}>
      <p className={styles.label}>TL;DR</p>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
