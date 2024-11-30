'use client'

import { CheckboxGroup } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChipCheckbox } from '../ChipCheckbox'

export default function ImagesOverviewFilter() {
  const searchParams = useSearchParams()
  const tags = searchParams.getAll('tag')

  const router = useRouter()
  const changeFilters = (tags: string[]) => {
    if (!tags.length) {
      router.push('/images/overview')
      return
    }

    router.push(`/images/overview?${tags.map(tag => `tag=${tag}`).join('&')}`)
  }

  return (
    <CheckboxGroup defaultValue={tags} orientation="horizontal" onChange={changeFilters}>
      <ChipCheckbox value="en-US" variant="light">en-US</ChipCheckbox>
      <ChipCheckbox value="zh-CN" variant="light">zh-CN</ChipCheckbox>
      <ChipCheckbox value="daily-wallpaper" variant="light">Daily wallpaper</ChipCheckbox>
      <ChipCheckbox value="search-wallpaper" variant="light">Search wallpaper</ChipCheckbox>
      <ChipCheckbox value="trending-images" variant="light">Trending images</ChipCheckbox>
    </CheckboxGroup>
  )
}
