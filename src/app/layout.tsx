import type { Metadata } from 'next'
import Footer from '@/components/Footer'
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
        <NextUIProvider className="h-screen w-screen font-sans">
          <main className="min-h-full">
            {children}
          </main>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  )
}
