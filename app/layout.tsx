import type { Metadata } from "next";
import './globals.css'
import '../styles/globals.css'
import '../styles/typography.css'
import '../styles/prose.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Sumanth Udupi',
    default: 'Sumanth Udupi — Product Designer',
  },
  description: 'Product Designer. Mechanical Engineer turned Data Scientist turned Designer. Building interfaces that feel magical.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{
        '--font-display': 'Georgia, serif',
        '--font-body': 'Georgia, serif',
        '--font-mono': '"Courier New", monospace',
        '--font-ui': 'system-ui, sans-serif',
      } as React.CSSProperties}>
        {children}
      </body>
    </html>
  )
}
