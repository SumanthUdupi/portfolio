import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/work/ProjectCard'
import { PageWrapper } from '@/components/layout/PageWrapper'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects from my product design practice.',
}

export default function WorkPage() {
  const projects = getAllProjects()

  return (
    <PageWrapper>
      <header className={styles.header}>
        <h1 className={styles.heading}>Selected Work</h1>
        <p className={styles.sub}>Product design, systems thinking, and the occasional experiment.</p>
      </header>

      {projects.length === 0 ? (
        <p className={styles.empty}>Case studies coming soon.</p>
      ) : (
        <ul className={styles.grid} role="list">
          {projects.map(p => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      )}
    </PageWrapper>
  )
}
