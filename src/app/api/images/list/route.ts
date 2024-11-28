import type { NextRequest } from 'next/server'
import type { ValueOf } from 'type-fest'
import { createResponseJSON } from '@/utils/api'
import { db } from '@/utils/database'
import { FORMAT_DATE_FOR_IMAGE, getUTCToday } from '@/utils/date'
import { format, subDays } from 'date-fns'

const TYPES = {
  DAILY_WALLPAPER: 1,
  TRENDING_IMAGES: 2,
}

const LANGS: {
  EN_US: 'en-US'
  ZH_CN: 'zh-CN'
} = {
  EN_US: 'en-US',
  ZH_CN: 'zh-CN',
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  let type = Number(searchParams.get('type') ?? TYPES.DAILY_WALLPAPER)
  if (!Object.values(TYPES).includes(type)) {
    type = TYPES.DAILY_WALLPAPER
  }

  let lang = (searchParams.get('lang') ?? LANGS.EN_US) as ValueOf<typeof LANGS>
  if (!Object.values(LANGS).includes(lang)) {
    lang = LANGS.EN_US
  }

  const date = searchParams.get('date') ?? format(subDays(getUTCToday(), 1), FORMAT_DATE_FOR_IMAGE)

  if (type === TYPES.TRENDING_IMAGES) {
    const item = db.trendingImages[lang].find(item => item.date === date)
    if (!item) {
      return createResponseJSON(null, {
        status: 404,
        statusMessage: `The date parameter is invalid. The current valid range is 2024-11-24 to ${format(subDays(getUTCToday(), 1), FORMAT_DATE_FOR_IMAGE)}`,
      })
    }

    return createResponseJSON(item)
  }

  const item = db.dailyWallpaper[lang].find((item) => {
    return item.date === date
  })
  if (!item) {
    return createResponseJSON(null, {
      status: 404,
      statusMessage: `The date parameter is invalid. The current valid range is 2024-11-24 to ${format(subDays(getUTCToday(), 1), FORMAT_DATE_FOR_IMAGE)}`,
    })
  }

  return createResponseJSON(item)
}
