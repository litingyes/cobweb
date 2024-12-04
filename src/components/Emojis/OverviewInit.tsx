'use client'

import { useEffect } from 'react'

export default function OverviewInit() {
  useEffect(() => {
    const id = location.hash.slice(1)
    if (!id) {
      return
    }

    document.getElementById(decodeURIComponent(id))?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [])

  return null
}
