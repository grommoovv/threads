import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { SearchbarWidget } from '@/components/widgets/SearchbarWidget'
import { Pagination } from '@/components/shared/Pagination'
import { CommunityCard } from '@/components/cards/CommunityCard'

import { fetchUser } from '@/lib/actions/user'
import { fetchCommunities } from '@/lib/actions/community'

interface PageProps {
  searchParams: { [key: string]: string | undefined }
}

const Page = async ({ searchParams }: PageProps) => {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect('/onboard')

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  })

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-5'>
        <SearchbarWidget routeType='communities' />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        {result.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  )
}

export default Page
