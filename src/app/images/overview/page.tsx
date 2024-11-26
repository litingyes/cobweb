import { BING_DOMAIN, connectDatabase } from '@/utils/database'
import { Card, CardBody, CardFooter, Chip, Image, Link } from '@nextui-org/react'
import { Fragment } from 'react'

const db = connectDatabase()

export default function ImagesOverview() {
  return (
    <div>
      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {
          ...Object.entries(db.dailyWallpaper).map(([mkt, mktData]) => mktData.map(({ date, data }) => (
            <Fragment key={`dailyWallpaper_${mkt}_${date}`}>
              {data.map(item => (
                <Card className="mb-6 w-full" key={item.urlbase} shadow="sm" isPressable isFooterBlurred>
                  <CardBody className="relative p-0" style={{ paddingTop: `${9 / 16 * 100}%` }}>
                    <Image classNames={{ wrapper: 'absolute inset-0 size-full' }} className="!size-full" src={BING_DOMAIN + item.url} width={960} height={540} alt={item.title} />
                  </CardBody>
                  <CardFooter className="block justify-between text-small">
                    <div className="flex items-center truncate text-base font-semibold">{item.title}</div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <Chip className="gap-0.5" color="secondary" size="sm" startContent={<i className="icon-[material-symbols-light--language] text-base" />}>{mkt}</Chip>
                      <div className="flex items-center">
                        <Link href={`${BING_DOMAIN}${item.urlbase}_UHD.jpg`} size="sm" color="primary" isBlock isExternal showAnchorIcon>4K</Link>
                        <Link href={item.copyrightlink} size="sm" color="warning" isBlock isExternal showAnchorIcon>Copyright</Link>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </Fragment>
          )))
        }
        {
          ...Object.entries(db.trendingImages).map(([mkt, mktData]) => mktData.map(({ date, data }) => (
            <Fragment key={`trendingImages_${mkt}_${date}`}>
              {data.map(item => item.tiles.map(({ image, query }) => (
                <Card className="mb-6 w-full" key={mkt + date + image.thumbnailUrl} shadow="sm" isPressable isFooterBlurred>
                  <CardBody className="relative p-0" style={{ paddingTop: `${image.thumbnail.height / image.thumbnail.width * 100}%` }}>
                    <Image classNames={{ wrapper: 'absolute inset-0 size-full' }} className="!size-full" src={image.thumbnailUrl} width={image.thumbnail.width * 2} height={image.thumbnail.height * 2} alt={query.displayText} />
                  </CardBody>
                  <CardFooter className="block justify-between text-small">
                    <div className="flex items-center truncate text-base font-semibold">{query.displayText}</div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <Chip className="gap-0.5" color="secondary" size="sm" startContent={<i className="icon-[material-symbols-light--language] text-base" />}>{mkt}</Chip>
                      <Link href={image.contentUrl} size="sm" color="primary" isBlock isExternal showAnchorIcon>Original image</Link>
                    </div>
                  </CardFooter>
                </Card>
              ))).flat(2)}
            </Fragment>
          )))
        }
      </div>
    </div>
  )
}
