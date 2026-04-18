import { Chip } from '@/components/chip/Chip'
import { StampTag } from '@/components/ui/StampTag'
import { PageWrapper } from '@/components/layout/PageWrapper'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About',
  description: 'Product Designer. Mechanical Engineer turned Data Scientist turned Designer.',
}

const skills = {
  Design: ['Product Design', 'UX Research', 'Interaction Design', 'Design Systems', 'Prototyping', 'User Testing'],
  Engineering: ['React', 'TypeScript', 'Python', 'Data Analysis', 'ML/AI', 'Mechanical Systems'],
  Tools: ['Figma', 'Framer', 'Notion', 'Jupyter', 'Git', 'Vercel'],
}

const certifications = [
  { name: 'Google UX Design Certificate', org: 'Google / Coursera', year: 2023 },
  { name: 'IBM Data Science Professional Certificate', org: 'IBM / Coursera', year: 2022 },
]

const timeline = [
  { year: '2024–Now', role: 'Product Designer', company: 'Independent / Freelance', note: 'Building chaos.curious.me and client work' },
  { year: '2022–2024', role: 'Data Scientist', company: 'Industry', note: 'Bridging data and product decisions' },
  { year: '2018–2022', role: 'Mechanical Engineer', company: 'Industry', note: 'Where systems thinking began' },
]

const rpgStats = [
  { stat: 'Systems Thinking', val: 92 },
  { stat: 'Visual Design',    val: 85 },
  { stat: 'Research',         val: 78 },
  { stat: 'Engineering',      val: 80 },
  { stat: 'Philosophy',       val: 70 },
  { stat: 'Chaos Tolerance',  val: 99 },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className={styles.intro}>
        <div className={styles.introText}>
          <div className={styles.chipRow}>
            <Chip state="idle" size={48} />
            <div>
              <p className={styles.eyebrow}>Product Designer</p>
              <h1 className={styles.name}>Sumanth Udupi</h1>
            </div>
          </div>
          <p className={styles.bio}>
            I'm a product designer with an unusual origin story: Mechanical Engineer →
            Data Scientist → Designer. That path wasn't accidental. Every stop taught me
            something the others couldn't. Engineering gave me systems thinking. Data gave me
            pattern recognition. Design gave me a way to make all of it humane.
          </p>
          <p className={styles.bio}>
            I believe good design is invisible infrastructure — it reduces friction so quietly
            that nobody notices it working. I'm drawn to interfaces that reward curiosity,
            respect attention, and occasionally make you smile at 2am.
          </p>
          <div className={styles.introLinks}>
            <a href="/contact" className={styles.ctaLink}>Get in touch →</a>
            <a href="/work" className={styles.ctaLink}>See my work →</a>
          </div>
        </div>
      </section>

      {/* RPG Stats */}
      <section className={styles.section} aria-labelledby="stats-heading">
        <h2 id="stats-heading" className={styles.sectionTitle}>Character Sheet</h2>
        <div className={styles.stats}>
          {rpgStats.map(s => (
            <div key={s.stat} className={styles.statRow}>
              <div className={styles.statLabel}>{s.stat}</div>
              <div className={styles.statBar} role="progressbar" aria-valuenow={s.val} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.stat}: ${s.val}/100`}>
                <div className={styles.statFill} style={{ width: `${s.val}%` }} />
              </div>
              <span className={styles.statVal}>{s.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={styles.sectionTitle}>Skills</h2>
        <div className={styles.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillGroup}>
              <h3 className={styles.skillCategory}>{category}</h3>
              <div className={styles.skillTags}>
                {items.map(s => (
                  <StampTag key={s} label={s} color="teal" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.section} aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className={styles.sectionTitle}>Timeline</h2>
        <ol className={styles.timeline} role="list">
          {timeline.map(t => (
            <li key={t.year} className={styles.timelineItem}>
              <span className={styles.timelineYear}>{t.year}</span>
              <div className={styles.timelineContent}>
                <strong className={styles.timelineRole}>{t.role}</strong>
                <span className={styles.timelineCompany}>{t.company}</span>
                <p className={styles.timelineNote}>{t.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Certifications */}
      <section className={styles.section} aria-labelledby="certs-heading">
        <h2 id="certs-heading" className={styles.sectionTitle}>Certifications</h2>
        <ul className={styles.certList} role="list">
          {certifications.map(c => (
            <li key={c.name} className={styles.certItem}>
              <span className={styles.certName}>{c.name}</span>
              <span className={styles.certOrg}>{c.org} · {c.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageWrapper>
  )
}
