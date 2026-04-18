'use client'

import { motion } from 'framer-motion'
import type { CuriosityData } from '@/lib/mdx'
import styles from './CuriosityMeter.module.css'

type CuriosityMeterProps = {
  data: CuriosityData
}

const labels: Record<keyof CuriosityData, string> = {
  technical:     'Technical',
  philosophical: 'Philosophical',
  absurd:        'Absurd',
  practical:     'Practical',
  strange:       'Strange',
}

const colors: Record<keyof CuriosityData, string> = {
  technical:     'var(--color-accent-teal)',
  philosophical: 'var(--color-accent-amber)',
  absurd:        'var(--color-accent-red)',
  practical:     'var(--color-accent-sage)',
  strange:       '#9B72AA',
}

export function CuriosityMeter({ data }: CuriosityMeterProps) {
  return (
    <div className={styles.meter} aria-label="Curiosity breakdown">
      <p className={styles.label}>Curiosity breakdown</p>
      <div className={styles.bars}>
        {(Object.keys(data) as (keyof CuriosityData)[]).map(key => (
          <div key={key} className={styles.barRow}>
            <span className={styles.barLabel}>{labels[key]}</span>
            <div className={styles.track} role="progressbar" aria-valuenow={data[key]} aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                className={styles.fill}
                style={{ background: colors[key] }}
                initial={{ width: 0 }}
                animate={{ width: `${data[key]}%` }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              />
            </div>
            <span className={styles.barVal}>{data[key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
