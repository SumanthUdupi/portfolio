import styles from './TechStack.module.css'

type TechStackProps = {
  items: string[]
}

export function TechStack({ items }: TechStackProps) {
  return (
    <div className={styles.stack}>
      <span className={styles.label}>Tech used</span>
      <ul className={styles.list} role="list">
        {items.map(item => (
          <li key={item} className={styles.item}>
            <code>{item}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}
