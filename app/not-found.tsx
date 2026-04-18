import Link from 'next/link'
import { Chip } from '@/components/chip/Chip'
import { PageWrapper } from '@/components/layout/PageWrapper'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <PageWrapper>
      <section className={styles.wrapper}>
        <Chip state="confused" size={80} commentary="This URL doesn't compute." />
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>This page has gone exploring without a map.</p>
        <Link href="/" className={styles.home}>Take me home →</Link>
      </section>
    </PageWrapper>
  )
}
