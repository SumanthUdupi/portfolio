import type { ReactNode } from 'react'
import styles from './BeforeAfter.module.css'

type BeforeAfterProps = {
  before: ReactNode
  after: ReactNode
}

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        <span className={styles.label}>Before</span>
        <div className={styles.content}>{before}</div>
      </div>
      <div className={`${styles.panel} ${styles.after}`}>
        <span className={styles.label}>After</span>
        <div className={styles.content}>{after}</div>
      </div>
    </div>
  )
}
