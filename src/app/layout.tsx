import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'cobweb',
  description: 'Collect, store and distribute meaningful static data',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider className="h-screen w-screen font-sans">
          <main className="min-h-full">
            {children}
          </main>
          <Footer />
        </NextUIProvider>
        <Analytics />
      </body>
    </html>
  )
}
