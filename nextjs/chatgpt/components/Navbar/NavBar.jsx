import React from 'react'
import styles from "./navbar.module.scss"
import Link from "next/link"
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'


async function NavBar() {

  const session = await getServerSession(options)

  return (
    <nav className='w-full '>
        <div className={`flex items-center justify-around w-full gap-3 py-6 px-4 md:gap-10 md:px-28 md:py-5 md:!justify-start  ${styles.navBarDirection}`} >
            <Link href="/">
              <span>الرئيسية</span>
            </Link>
            <Link href="/about-us">
              <span>من نحن</span>
            </Link>
            <Link href="/contact-us">
              <span>تواصل معنا</span>
            </Link>

            <Link href="/bundles">
              <span>الباقات</span>
            </Link>

            <Link href="/customers-opinions">
              <span>اراء العملاء</span>
            </Link>
            
            {!session && (
              <>
                <Link href="https://t.me/chatgpt_turbo_assistant_bot" target='_blank'>
                <span>جرب الان</span>
                </Link>
                <Link href="/subscribe">
                <span>اشترك الان</span>
                </Link>
              </>
            )} 
            
        </div>
    </nav>
  )
}

export default NavBar