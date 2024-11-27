'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function Providers({ className, children }: { className: string, children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextUIProvider className={className} navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}
