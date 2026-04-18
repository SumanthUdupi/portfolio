import { temperatureEmoji, type Temperature } from '@/lib/temperature'
import styles from './TemperatureBadge.module.css'

type TemperatureBadgeProps = {
  temperature: Temperature
}

const labels: Record<Temperature, string> = {
  fresh:   'Fresh take',
  hot:     'Trending',
  cold:    'Archived',
  classic: 'Classic',
}

export function TemperatureBadge({ temperature }: TemperatureBadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[temperature]}`}
      title={labels[temperature]}
    >
      <span aria-hidden="true">{temperatureEmoji[temperature]}</span>
      <span className="sr-only">{labels[temperature]}</span>
    </span>
  )
}
