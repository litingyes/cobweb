import ImageCardWithPreview from '@/components/ImageCardWithPreview'
import ImagesOverviewFilter from '@/components/Images/OverviewFilter'
import { BING_DOMAIN, db } from '@/utils/database'
import { Divider, Link } from '@nextui-org/react'
import { Fragment } from 'react'

interface ImagesOverviewProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ImagesOverview({ searchParams }: ImagesOverviewProps) {
  const query = await searchParams
  let tags: string[] = []
  if (query.tag) {
    if (Array.isArray(query.tag)) {
      tags = query.tag
    }
    else {
      tags = [query.tag]
    }
  }

  return (
    <div>
      <ImagesOverviewFilter />
      <Divider className="mb-6 mt-4" />
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
        {
          (!tags.length || tags.includes('daily-wallpaper'))
          && (
            // eslint-disable-next-line react/no-useless-fragment
            <>
              {
                ...Object.entries(db.dailyWallpaper).map(([mkt, mktData]) => {
                  if (tags.length && !tags.includes(mkt)) {
                    return []
                  }

                  return mktData.map(({ date, data }) => (
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
                  ))
                })
              }
            </>
          )
        }
        {
          (!tags.length || tags.includes('trending-images'))
          && (
            // eslint-disable-next-line react/no-useless-fragment
            <>
              {
                ...Object.entries(db.trendingImages).map(([mkt, mktData]) => {
                  if (tags.length && !tags.includes(mkt)) {
                    return []
                  }

                  return (
                    <Fragment key={`trending-images__${mkt}`}>
                      {mktData.map(item => item.tiles.map(({ image, query }) => (
                        <ImageCardWithPreview
                          key={mkt + image.thumbnailUrl}
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
                  )
                })
              }
            </>
          )
        }
      </div>
    </div>
  )
}
