import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 flex h-14 w-full items-center justify-between px-16">
      <div className="flex items-center gap-4">
        <Image src="/images/icon-512.png" alt="logo" width={32} height={32} />
        <div className="text-3xl font-bold">cobweb</div>
      </div>
      <div>
        <Link href="https://github.com/litingyes/cobweb" target="_blank">
          <Button className="text-xl" variant="light" size="sm" isIconOnly>
            <i className="icon-[mdi--github]" />
          </Button>
        </Link>
      </div>
    </header>
  )
}
