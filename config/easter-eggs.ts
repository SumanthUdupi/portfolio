export type Egg = {
  key: string
  label: string
  trigger: string
}

export const EGGS: Record<number, Egg> = {
  1: { key: 'egg_konami',       label: 'Old School',     trigger: 'Konami code (↑↑↓↓←→←→BA)' },
  2: { key: 'egg_chip_click',   label: 'Glitch Mode',    trigger: 'Click CHIP 5 times fast' },
  3: { key: 'egg_three_posts',  label: 'On a Roll 🎲',   trigger: 'Read 3 blog posts in one session' },
  4: { key: 'egg_copyright',    label: 'Existential',    trigger: 'Hover the copyright year for 3 seconds' },
  5: { key: 'egg_secret_route', label: 'Explorer',       trigger: 'Visit /secret' },
  6: { key: 'egg_all_projects', label: 'Window Shopper', trigger: 'Click every project card in one session' },
  7: { key: 'egg_midnight',     label: 'Night Owl',      trigger: 'Submit the contact form at midnight' },
}

export const TOTAL_EGGS = Object.keys(EGGS).length

export function getEggKeys(): string[] {
  return Object.values(EGGS).map(e => e.key)
}
