import styles from './StampTag.module.css'

type StampTagProps = {
  label: string
  color?: 'red' | 'teal' | 'amber' | 'sage'
  href?: string
}

export function StampTag({ label, color = 'teal', href }: StampTagProps) {
  const cls = `${styles.tag} ${styles[color]}`
  if (href) {
    return <a href={href} className={cls}>{label}</a>
  }
  return <span className={cls}>{label}</span>
}
