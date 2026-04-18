'use client'

import dynamic from 'next/dynamic'
import styles from './RabbitHoleNavigator.module.css'

const RabbitHoleGraph = dynamic(() => import('./RabbitHoleGraph'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading graph...</div>,
})

type RabbitHoleNavigatorProps = {
  currentSlug: string
  relatedSlugs: string[]
}

export function RabbitHoleNavigator({ currentSlug, relatedSlugs }: RabbitHoleNavigatorProps) {
  if (relatedSlugs.length === 0) return null

  return (
    <aside className={styles.aside} aria-label="Related posts graph">
      <p className={styles.label}>Rabbit Hole Navigator</p>
      <RabbitHoleGraph currentSlug={currentSlug} relatedSlugs={relatedSlugs} />
    </aside>
  )
}
