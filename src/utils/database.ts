import type { JsonObject } from 'type-fest'
import { readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { cwd } from 'node:process'
import { destr } from 'destr'
import { globSync } from 'glob'

const databaseDir = resolve(cwd(), 'database')

interface DAILY_WALLPAPER_ITEM extends JsonObject {
  title: string
  url: string
  urlbase: string
  copyright: string
  copyrightlink: string
  quiz: string
}

interface SEARCH_WALLPAPER_ITEM extends JsonObject {
  displayText: string
  thumbnail: {
    thumbnailUrl: string
  }
}

interface TRENDING_IMAGES_ITEM extends JsonObject {
  title: string
  tiles: Array<{
    query: {
      text: string
      displayText: string
      webSearchUrl: string
    }
    image: {
      thumbnailUrl: string
      contentUrl: string
      thumbnail: {
        width: number
        height: number
      }
    }
  }>
}

export const BING_DOMAIN = 'https://bing.com'

export function connectDatabase() {
  return {
    dailyWallpaper: {
      'en-US': globSync(`${databaseDir}/images/bing-daily-wallpaper/en-US/*.json`).map(path => ({
        date: basename(path, '.json'),
        data: destr<DAILY_WALLPAPER_ITEM[]>(readFileSync(path, 'utf-8')),
      })),
      'zh-CN': globSync(`${databaseDir}/images/bing-daily-wallpaper/zh-CN/*.json`).map(path => ({
        date: basename(path, '.json'),
        data: destr<DAILY_WALLPAPER_ITEM[]>(readFileSync(path, 'utf-8')),
      })),
    },
    searchWallpaper: globSync(`${databaseDir}/images/bing-search-wallpaper/*.json`).map(path => ({
      date: basename(path, '.json'),
      data: destr<SEARCH_WALLPAPER_ITEM[]>(readFileSync(path, 'utf-8')),
    })),
    trendingImages: {
      'en-US': destr<TRENDING_IMAGES_ITEM[]>(readFileSync(`${databaseDir}/images/bing-trending-images/en-US.json`, 'utf-8')),
      'zh-CN': destr<TRENDING_IMAGES_ITEM[]>(readFileSync(`${databaseDir}/images/bing-trending-images/zh-CN.json`, 'utf-8')),
    },
  }
}

export const db = connectDatabase()
