import ImageCardWithPreview from '@/components/ImageCardWithPreview'
import ImagesOverviewFilter from '@/components/Images/OverviewFilter'
import { BING_DOMAIN, db } from '@/utils/database'
import { Divider, Link } from '@nextui-org/react'
import { Fragment } from 'react'

interface ImagesOverviewProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const LANGS = ['en-US', 'zh-CN']
const MODULES = ['daily-wallpaper', 'search-wallpaper', 'trending-images']

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
          (!tags.find(tag => MODULES.includes(tag)) || tags.includes(MODULES[0]))
          && (
            // eslint-disable-next-line react/no-useless-fragment
            <>
              {
                ...Object.entries(db.dailyWallpaper).map(([mkt, mktData]) => {
                  if (tags.find(tag => LANGS.includes(tag)) && !tags.includes(mkt)) {
                    return []
                  }

                  const bucket = new Set()

                  return mktData.map(({ date, data }) => (
                    <Fragment key={`dailyWallpaper_${mkt}_${date}`}>
                      {data.map((item) => {
                        if (bucket.has(item.urlbase)) {
                          return null
                        }
                        bucket.add(item.urlbase)

                        return (
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
                        )
                      }).filter(Boolean)}
                    </Fragment>
                  ))
                })
              }
            </>
          )
        }
        {
          (!tags.find(tag => MODULES.includes(tag)) || tags.includes(MODULES[1]))
          && (
            // eslint-disable-next-line react/no-useless-fragment
            <>
              {
                ...db.searchWallpaper['en-US'].map((item) => {
                  if (tags.find(tag => LANGS.includes(tag)) && !tags.includes('en-US')) {
                    return []
                  }

                  return (
                    <ImageCardWithPreview
                      key={`searchWallpaper_${item.thumbnailUrl}`}
                      url={item.thumbnailUrl}
                      alt={item.title}
                      width={960}
                      height={540}
                      lang="en-US"
                    />
                  )
                })
              }
            </>
          )
        }
        {
          (!tags.find(tag => MODULES.includes(tag)) || tags.includes(MODULES[2]))
          && (
            // eslint-disable-next-line react/no-useless-fragment
            <>
              {
                ...Object.entries(db.trendingImages).map(([mkt, mktData]) => {
                  if (tags.find(tag => LANGS.includes(tag)) && !tags.includes(mkt)) {
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
