'use client'
import { Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react'
import { PhotoView } from 'react-photo-view'

interface ImageCardWithPreviewProps {
  url: string
  alt: string
  width: number
  height: number
  lang: string
  actions?: React.ReactNode
}

export default function ImageCardWithPreview({ url, alt, width, height, lang, actions }: ImageCardWithPreviewProps) {
  return (
    <PhotoView src={url}>
      <Card className="mb-6 w-full" shadow="sm" isPressable isFooterBlurred>
        <CardBody className="relative p-0" style={{ paddingTop: `${height / width * 100}%` }}>
          <Image classNames={{ wrapper: 'absolute inset-0 size-full' }} className="!size-full" src={url} width={width} height={height} alt={alt} />
        </CardBody>
        <CardFooter className="block justify-between text-small">
          <div className="flex items-center truncate text-base font-semibold">{alt}</div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <Chip className="gap-0.5" color="secondary" size="sm" startContent={<i className="icon-[material-symbols-light--language] text-base" />}>{lang}</Chip>
            {actions}
          </div>
        </CardFooter>
      </Card>
    </PhotoView>
  )
}
