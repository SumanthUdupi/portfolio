import Link from 'next/link'
import type { ProjectMeta } from '@/lib/mdx'
import { StampTag } from '@/components/ui/StampTag'
import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  project: ProjectMeta
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={styles.card}
      style={{ '--accent': project.project_accent_color } as React.CSSProperties}
    >
      <div
        className={styles.thumb}
        style={{ background: project.project_accent_color + '22' }}
      />

      <div className={styles.fold} aria-hidden="true" />

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.year}>{project.year}</span>
          <span className={styles.role}>{project.role}</span>
        </div>

        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.excerpt}>{project.excerpt}</p>

        <div className={styles.tags}>
          {project.tags.slice(0, 3).map(t => (
            <StampTag key={t} label={t} />
          ))}
        </div>
      </div>
    </Link>
  )
}
