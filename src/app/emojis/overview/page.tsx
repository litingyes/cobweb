import type { UNICODE_EMOJI } from '@/utils/database'
import OverviewEmoji from '@/components/Emojis/OverviewEmoji'
import OverviewInit from '@/components/Emojis/OverviewInit'
import { db } from '@/utils/database'
import Link from 'next/link'
import { useMemo } from 'react'

interface Subgroup {
  name: string
  items: UNICODE_EMOJI[]
}

interface Group {
  name: string
  items: Subgroup[]
}

export default function EmojisOverview() {
  const emojisGroups = useMemo(() => {
    const groups: Group[] = []
    let currentGroup: Group = {
      name: '',
      items: [],
    }
    let currentSubGroup: Subgroup = {
      name: '',
      items: [],
    }

    db.emojis.unicode.forEach((item) => {
      const groupName = item.categories[0]
      const subGroupName = item.categories[1]

      if (groupName !== currentGroup.name) {
        if (currentGroup.items.length) {
          groups.push(currentGroup)
        }

        currentGroup = {
          name: groupName,
          items: [],
        }
        currentSubGroup = {
          name: subGroupName,
          items: [
            item,
          ],
        }
        return
      }

      if (subGroupName !== currentSubGroup.name) {
        if (currentSubGroup.items.length) {
          currentGroup.items.push(currentSubGroup)
        }
        currentSubGroup = {
          name: subGroupName,
          items: [
            item,
          ],
        }
        return
      }

      currentSubGroup.items.push(item)
    })

    return groups
  }, [])

  const emojis = useMemo(() => {
    return (
      <div>
        {emojisGroups.map(group => (
          <div key={group.name} className="mt-6 first:mt-0">
            <Link href={`#${encodeURIComponent(group.name)}`}>
              <h1 className="mb-2 inline-block scroll-mt-14 bg-gradient-to-bl from-sky-800 to-pink-800 bg-clip-text text-2xl font-bold text-transparent decoration-pink-500 decoration-solid decoration-2 hover:underline" id={group.name}>{group.name}</h1>
            </Link>
            <div>
              {group.items.map(subgroup => (
                <div key={subgroup.name} className="mt-4 first:mt-0">
                  <Link href={`#${encodeURIComponent(subgroup.name)}`}>
                    <h2 className="mb-1 inline-block scroll-mt-14 bg-gradient-to-bl from-sky-600 to-pink-600 bg-clip-text text-xl font-semibold text-transparent decoration-pink-500 decoration-solid decoration-2 hover:underline" id={subgroup.name}>{subgroup.name}</h2>
                  </Link>
                  <div className="flex flex-wrap items-center gap-2">
                    {subgroup.items.map(item => (
                      <OverviewEmoji key={`${item.name}_${item.codePoints.join('-')}`} data={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }, [emojisGroups])

  return (
    <div>
      <OverviewInit />
      {emojis}
    </div>
  )
}
