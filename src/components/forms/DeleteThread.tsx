'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { deleteThread } from '@/lib/actions/thread'
import { FC } from 'react'

interface DeleteThreadProps {
  threadId: string
  currentUserId: string
  authorId: string
  parentId: string | null
  isComment?: boolean
}

const DeleteThread: FC<DeleteThreadProps> = (props) => {
  const { threadId, currentUserId, authorId, parentId, isComment } = props
  const pathname = usePathname()
  const router = useRouter()

  if (currentUserId !== authorId || pathname === '/') return null

  return (
    <Image
      src='/assets/delete.svg'
      alt='delte'
      width={18}
      height={18}
      className='cursor-pointer object-contain'
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname)
        if (!parentId || !isComment) {
          router.push('/')
        }
      }}
    />
  )
}

export { DeleteThread }
