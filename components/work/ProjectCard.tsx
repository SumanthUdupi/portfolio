'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ProjectMeta } from '@/lib/mdx'
import { StampTag } from '@/components/ui/StampTag'
import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  project: ProjectMeta
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.a
      ref={ref}
      href={`/work/${project.slug}`}
      className={styles.card}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        '--accent': project.project_accent_color,
      } as React.CSSProperties}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      variants={{
        hidden:  { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      <div className={styles.thumb}>
        <div
          className={styles.thumbBg}
          style={{ background: `linear-gradient(135deg, ${project.project_accent_color}44, ${project.project_accent_color}11)` }}
        />
        <div className={styles.thumbGlyph} aria-hidden="true">
          {project.title.slice(0, 1)}
        </div>
        <div className={styles.yearBadge}>{project.year}</div>
      </div>

      <div className={styles.fold} aria-hidden="true" />

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.role}>{project.role}</span>
        </div>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.excerpt}>{project.excerpt}</p>
        <div className={styles.tags}>
          {project.tags.slice(0, 3).map(t => <StampTag key={t} label={t} />)}
        </div>
      </div>

      <div className={styles.accentBar} />
    </motion.a>
  )
}
