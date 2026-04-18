import { Chip } from '@/components/chip/Chip'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { site } from '@/config/site'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sumanth Udupi.',
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <section className={styles.wrapper}>
        <Chip state="excited" size={56} />
        <h1 className={styles.heading}>Say Hello</h1>
        <p className={styles.sub}>
          I'm always up for interesting conversations about design, data, philosophy,
          or whatever rabbit hole you're currently falling down.
        </p>

        <div className={styles.options}>
          <a href={`mailto:${site.email}`} className={styles.option}>
            <span className={styles.optionLabel}>Email</span>
            <span className={styles.optionValue}>{site.email}</span>
          </a>

          {site.socials.github && (
            <a href={site.socials.github} className={styles.option} target="_blank" rel="noopener noreferrer">
              <span className={styles.optionLabel}>GitHub</span>
              <span className={styles.optionValue}>@sumanthudupi</span>
            </a>
          )}

          {site.socials.linkedin && (
            <a href={site.socials.linkedin} className={styles.option} target="_blank" rel="noopener noreferrer">
              <span className={styles.optionLabel}>LinkedIn</span>
              <span className={styles.optionValue}>Sumanth Udupi</span>
            </a>
          )}
        </div>

        <p className={styles.note}>
          <Chip state="reading" size={16} />
          {' '}CHIP will not forward your message anywhere. This isn&apos;t a real form.
        </p>
      </section>
    </PageWrapper>
  )
}
