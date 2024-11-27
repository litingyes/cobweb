import { Link } from '@nextui-org/react'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed top-0 z-20 flex h-14 w-full items-center justify-between px-16 backdrop-blur-md">
      <Link href="/">
        <div className="flex items-center gap-4">
          <Image src="/images/icon-512.png" alt="logo" width={32} height={32} />
          <div className="text-3xl font-bold">cobweb</div>
        </div>
      </Link>
      <div className="flex items-center gap-1">
        <Link href="/images" isBlock>
          Images
        </Link>
        <Link href="https://api.cobweb.litingyes.top/" isExternal isBlock showAnchorIcon>API document</Link>
        <Link className="size-8" href="https://github.com/litingyes/cobweb" isExternal isBlock>
          <i className="icon-[mdi--github]  text-2xl" />
        </Link>
      </div>
    </header>
  )
}
