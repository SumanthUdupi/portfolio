'use client'

import { useEffect, useRef, useState } from 'react'
import { COMMANDS } from '@/config/terminal-commands'
import styles from './Terminal.module.css'

type Line = { type: 'input' | 'output'; text: string }

export function Terminal() {
  const [open, setOpen]         = useState(false)
  const [input, setInput]       = useState('')
  const [history, setHistory]   = useState<Line[]>([
    { type: 'output', text: 'chaos.curious.me terminal — type "help" for commands' },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const raw = input.trim().toLowerCase()
    if (!raw) return

    const newLines: Line[] = [{ type: 'input', text: `> ${input}` }]

    if (raw === 'exit') {
      setOpen(false)
      setInput('')
      return
    }

    if (raw === 'clear') {
      setHistory([{ type: 'output', text: 'chaos.curious.me terminal — type "help" for commands' }])
      setInput('')
      return
    }

    const cmd = COMMANDS.find(c => c.command === raw)
    if (cmd) {
      if (cmd.action === 'navigate' && cmd.target) {
        newLines.push({ type: 'output', text: `Navigating to ${cmd.target}...` })
        setTimeout(() => { window.location.href = cmd.target! }, 400)
      } else {
        newLines.push({ type: 'output', text: cmd.output })
      }
    } else {
      newLines.push({ type: 'output', text: `Command not found: ${raw}. Try "help".` })
    }

    setHistory(prev => [...prev, ...newLines])
    setInput('')
  }

  if (!open) return null

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
    >
      <div className={styles.terminal}>
        <div className={styles.titleBar}>
          <span className={styles.dot} style={{ background: '#FF5F57' }} />
          <span className={styles.dot} style={{ background: '#FEBC2E' }} />
          <span className={styles.dot} style={{ background: '#28C840' }} />
          <span className={styles.title}>chaos — terminal</span>
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close terminal">×</button>
        </div>

        <div className={styles.output}>
          {history.map((line, i) => (
            <p key={i} className={line.type === 'input' ? styles.inputLine : styles.outputLine}>
              {line.text}
            </p>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputRow}>
          <span className={styles.prompt}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.input}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  )
}
