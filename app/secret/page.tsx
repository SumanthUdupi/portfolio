import { Chip } from '@/components/chip/Chip'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { SecretEggUnlocker } from '@/components/easter-eggs/SecretEggUnlocker'
import { EggHuntBoard } from '@/components/easter-eggs/EggHuntBoard'
import { TOTAL_EGGS } from '@/config/easter-eggs'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Secret',
  description: 'You found the secret page.',
}

export default function SecretPage() {
  return (
    <PageWrapper>
      <SecretEggUnlocker />
      <section className={styles.wrapper}>
        <Chip state="excited" size={64} commentary="You found me." />

        <h1 className={styles.heading}>Egg Hunt</h1>
        <p className={styles.sub}>
          {TOTAL_EGGS} easter eggs are hidden across this site.
          Each one is a breadcrumb. Follow the chaos.
        </p>

        <EggHuntBoard />

        <p className={styles.note}>
          Progress lives in your browser. No account needed.
          CHIP is watching though.
        </p>
      </section>
    </PageWrapper>
  )
}
