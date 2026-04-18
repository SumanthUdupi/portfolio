import type { ChipState } from './chip-states'
import { chipStates } from './chip-states'
import styles from './Chip.module.css'

type ChipProps = {
  state?: ChipState
  commentary?: string
  size?: number
  className?: string
}

export function Chip({ state = 'idle', commentary, size = 48, className }: ChipProps) {
  const svg = chipStates[state]

  return (
    <span className={`${styles.wrapper} ${className ?? ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className={styles.svg}
        data-state={state}
      >
        <path d={svg.body} fill="var(--color-surface)" stroke="currentColor" />
        <path d={svg.eyeLeft} />
        <path d={svg.eyeRight} />
        <path d={svg.mouth} fill="none" />
        {svg.extras && (
          <g dangerouslySetInnerHTML={{ __html: svg.extras }} />
        )}
      </svg>
      {commentary && (
        <span className={styles.bubble} aria-hidden="true">
          {commentary}
        </span>
      )}
    </span>
  )
}
