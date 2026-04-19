import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/work/ProjectCard'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { PageHeader } from '@/components/ui/PageHeader'
import { StaggerList } from '@/components/home/StaggerList'
import { AnimatedCard } from '@/components/home/AnimatedCard'
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
      <PageHeader
        accent="// selected work"
        title="Case Studies"
        sub="Product design, systems thinking, and the occasional experiment."
      />

      {projects.length === 0 ? (
        <p className={styles.empty}>Case studies coming soon.</p>
      ) : (
        <StaggerList className={styles.grid} stagger={0.1}>
          {projects.map(p => (
            <AnimatedCard key={p.slug}>
              <ProjectCard project={p} />
            </AnimatedCard>
          ))}
        </StaggerList>
      )}
    </PageWrapper>
  )
}
