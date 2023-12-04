'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs'

import { sidebarLinks } from '@/lib/constants'

const LeftSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { userId } = useAuth()

  return (
    <section className='leftsidebar custom-scrollbar'>
      <Link href='/' className='mb-10 h-[38px]'>
        <p className='text-heading2-bold leading-none text-light-1 max-xs:hidden'>Threads</p>
      </Link>

      <div className='flex w-full flex-1 flex-col gap-5'>
        {sidebarLinks.map((link) => {
          if (link.route === '/profile') {
            link.route = `${link.route}/${userId}`
          }

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${pathname === link.route && 'bg-primary-500 '}`}
            >
              <Image src={link.imgURL} alt={link.label} width={20} height={20} />

              <p className='text-[14px] leading-[100%] text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className=''>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className='flex cursor-pointer items-center gap-3 py-3 px-4'>
              <Image src='/assets/logout.svg' alt='logout' width={20} height={20} />

              <p className='text-[14px] leading-[100%] text-light-1 max-lg:hidden'>Sign out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export { LeftSidebar }
