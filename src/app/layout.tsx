import type { Metadata } from 'next'
import { NextUIProvider } from '@nextui-org/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'cobweb',
  description: 'Collect and store meaningful static information',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
