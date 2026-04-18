'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type CalmContextType = {
  calm: boolean
  toggle: () => void
}

const CalmContext = createContext<CalmContextType>({ calm: false, toggle: () => {} })

export function CalmProvider({ children }: { children: ReactNode }) {
  const [calm, setCalm] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('calm-mode')
    if (stored === 'true') {
      setCalm(true)
      document.documentElement.setAttribute('data-calm', 'true')
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'c') {
        setCalm(prev => {
          const next = !prev
          document.documentElement.setAttribute('data-calm', String(next))
          localStorage.setItem('calm-mode', String(next))
          return next
        })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const toggle = () => {
    setCalm(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-calm', String(next))
      localStorage.setItem('calm-mode', String(next))
      return next
    })
  }

  return <CalmContext.Provider value={{ calm, toggle }}>{children}</CalmContext.Provider>
}

export function useCalm() {
  return useContext(CalmContext)
}
