'use client'

import type { UNICODE_EMOJI } from '@/utils/database'
import { Button, Tooltip } from '@nextui-org/react'
import copy from 'copy-to-clipboard'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

interface OverviewEmojiProps {
  data: UNICODE_EMOJI
}

export default function OverviewEmoji({ data }: OverviewEmojiProps) {
  const toCopy = useCallback((val: string | null) => {
    if (!val) {
      return
    }

    copy(val)
    toast.success('Copied')
  }, [])

  return (
    <Tooltip content={data.name} showArrow>
      <Button variant="flat" color="secondary" className="text-xl" isIconOnly onClick={() => toCopy(data.char)}>
        {data.char ?? data.url}
      </Button>
    </Tooltip>
  )
}
