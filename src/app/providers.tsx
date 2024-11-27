'use client'

import { Button, NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { PhotoProvider } from 'react-photo-view'

export function Providers({ className, children }: { className: string, children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextUIProvider className={className} navigate={router.push}>
      <PhotoProvider
        maskOpacity={0.8}
        toolbarRender={({ images, index, onIndexChange, rotate, onRotate, scale, onScale }) => (
          <div className="flex items-center gap-2">
            <Button size="sm" color="secondary" isIconOnly onClick={() => onIndexChange((index + images.length - 1) % images.length)}>
              <i className="icon-[mdi--arrow-left] text-xl" />
            </Button>
            <Button size="sm" color="secondary" isIconOnly onClick={() => onIndexChange((index + images.length + 1) % images.length)}>
              <i className="icon-[mdi--arrow-right]  text-xl" />
            </Button>
            <Button size="sm" color="secondary" isIconOnly onClick={() => onRotate(rotate - 90)}>
              <i className="icon-[mdi--rotate-left-variant] text-xl" />
            </Button>
            <Button size="sm" color="secondary" isIconOnly onClick={() => onRotate(rotate + 90)}>
              <i className="icon-[mdi--rotate-right-variant]  text-xl" />
            </Button>
            <Button size="sm" color="secondary" isIconOnly onClick={() => onScale(scale + 0.2)}>
              <i className="icon-[mdi--plus-circle-outline] text-xl" />
            </Button>
            <Button size="sm" color="secondary" isIconOnly onClick={() => onScale(scale - 0.2)}>
              <i className="icon-[mdi--minus-circle-outline]  text-xl" />
            </Button>
          </div>
        )}
        overlayRender={a => (
          <div>
            {a.overlay}
          </div>
        )}
      >
        {children}
      </PhotoProvider>
    </NextUIProvider>
  )
}
