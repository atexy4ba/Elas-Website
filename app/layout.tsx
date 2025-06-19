import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ELAS TRADING',
  description: 'Created by DigitKom',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
