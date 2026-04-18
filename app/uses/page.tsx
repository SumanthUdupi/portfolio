import { PageWrapper } from '@/components/layout/PageWrapper'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Tools, gear, and software Sumanth Udupi uses daily.',
}

const uses = [
  {
    category: 'Design',
    items: [
      { name: 'Figma', note: 'Primary design tool — components, prototypes, the whole stack' },
      { name: 'Framer', note: 'High-fidelity interactive prototypes' },
    ],
  },
  {
    category: 'Development',
    items: [
      { name: 'VS Code', note: 'With a dark theme that doesn\'t hurt at 2am' },
      { name: 'Claude Code', note: 'This very site was built with it' },
      { name: 'Vercel', note: 'Deploy and forget' },
    ],
  },
  {
    category: 'Productivity',
    items: [
      { name: 'Notion', note: 'Everything that isn\'t code lives here' },
      { name: 'Obsidian', note: 'Where thoughts go when they\'re not ready for Notion' },
    ],
  },
  {
    category: 'Hardware',
    items: [
      { name: 'Windows 11', note: 'Yes, really. It works.' },
    ],
  },
]

export default function UsesPage() {
  return (
    <PageWrapper>
      <header className={styles.header}>
        <h1 className={styles.heading}>Uses</h1>
        <p className={styles.sub}>The tools that make the work possible.</p>
      </header>

      <div className={styles.sections}>
        {uses.map(section => (
          <section key={section.category} className={styles.section}>
            <h2 className={styles.category}>{section.category}</h2>
            <ul className={styles.items} role="list">
              {section.items.map(item => (
                <li key={item.name} className={styles.item}>
                  <strong className={styles.itemName}>{item.name}</strong>
                  <p className={styles.itemNote}>{item.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageWrapper>
  )
}
