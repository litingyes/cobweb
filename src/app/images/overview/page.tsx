import ImageCardWithPreview from '@/components/ImageCardWithPreview'
import { BING_DOMAIN, db } from '@/utils/database'
import { Link } from '@nextui-org/react'
import { Fragment } from 'react'

export default function ImagesOverview() {
  return (
    <div>
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
        {
          ...Object.entries(db.dailyWallpaper).map(([mkt, mktData]) => mktData.map(({ date, data }) => (
            <Fragment key={`dailyWallpaper_${mkt}_${date}`}>
              {data.map(item => (
                <ImageCardWithPreview
                  key={item.urlbase}
                  url={BING_DOMAIN + item.url}
                  alt={item.title}
                  width={960}
                  height={540}
                  lang={mkt}
                  actions={(
                    <div className="flex items-center">
                      <Link href={`${BING_DOMAIN}${item.urlbase}_UHD.jpg`} size="sm" color="primary" isBlock isExternal showAnchorIcon>4K</Link>
                      <Link href={item.copyrightlink} size="sm" color="warning" isBlock isExternal showAnchorIcon>Copyright</Link>
                    </div>
                  )}
                />
              ))}
            </Fragment>
          )))
        }
        {
          ...Object.entries(db.trendingImages).map(([mkt, mktData]) => mktData.map(({ date, data }) => (
            <Fragment key={`trendingImages_${mkt}_${date}`}>
              {data.map(item => item.tiles.map(({ image, query }) => (
                <ImageCardWithPreview
                  key={mkt + date + image.thumbnailUrl}
                  url={image.thumbnailUrl}
                  alt={query.displayText}
                  width={image.thumbnail.width}
                  height={image.thumbnail.height}
                  lang={mkt}
                  actions={(
                    <Link href={image.contentUrl} size="sm" color="primary" isBlock isExternal showAnchorIcon>Origin</Link>
                  )}
                />
              ))).flat(2)}
            </Fragment>
          )))
        }
      </div>
    </div>
  )
}
