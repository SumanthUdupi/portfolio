import { Chip } from '@/components/chip/Chip'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { EGGS, TOTAL_EGGS } from '@/config/easter-eggs'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Secret',
  description: 'You found the secret page.',
}

export default function SecretPage() {
  return (
    <PageWrapper>
      <section className={styles.wrapper}>
        <Chip state="excited" size={64} commentary="You found me." />

        <h1 className={styles.heading}>The Secret Page</h1>
        <p className={styles.sub}>
          There are {TOTAL_EGGS} easter eggs hidden across this site.
          Collecting all of them unlocks... something. Probably.
        </p>

        <div className={styles.eggGrid}>
          {Object.entries(EGGS).map(([key, egg]) => (
            <div key={key} className={styles.egg} data-egg-id={key}>
              <div className={styles.eggIcon}>🥚</div>
              <div className={styles.eggInfo}>
                <strong className={styles.eggName}>{egg.label}</strong>
                <p className={styles.eggHint}>{egg.trigger}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          Found eggs are tracked in your browser. No account needed.
          CHIP is watching, though.
        </p>
      </section>
    </PageWrapper>
  )
}
