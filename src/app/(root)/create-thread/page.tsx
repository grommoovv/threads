import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { CreateThread } from '@/components/forms/CreateThread'
import { fetchUser } from '@/lib/actions/user'

const Page = async () => {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect('/onboard')

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>

      <CreateThread userId={userInfo._id} />
    </>
  )
}

export default Page
