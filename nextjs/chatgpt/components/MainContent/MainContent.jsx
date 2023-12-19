import Image from 'next/image'
import React from 'react'
import styles from "./maincontent.module.scss"
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

async function MainContent() {

  const session = await getServerSession(options)

  return (
    <div className={`flex items-center justify-center text-center ${styles.mainContentContainer}`}>
      <div className='flex flex-wrap-reverse gap-10 p-6 md:px-28 md:py-5 md:flex-row md:flex-nowrap md:flex md:justify-between md:items-center '>
          <div>
              <h1 className='text-3xl font-bold lg:text-4xl my-5 text-lightBlue'>
                ماهو ChatGPT-3.5 Turbo؟
              </h1>
              <p className='text-md font-bold lg:text-lg'>
                  هو نموذج لغة قوي بشكل لايصدق مدعوم بالذكاء الاصطناعي يمكنه فهم وانشاء نص يشبه الانسان بناء على موجه فقط، مما يجعله أداة قيمة لمجموعة متنوعة من التطبيقات.
                  <br/>
                  يسمح لك بالتواصل مع النموذج والتحدث، وتفلي ردود مفصلة عن الموضوع الذي تم سؤال النموذج عنه.
              </p>
              <button className='text-md bg-lightBlue text-white my-5 lg:text-lg font-bold rounded-lg pt-3 pb-4 px-6 outline-none hover:opacity-75 mx-2'>
                {
                  session? (
                    <Link href="/bundles" >
                            العروض                    
                    </Link>
                  ) : (
                    <Link href="/subscribe">
                          اشترك الان
                    </Link>
                    )
                }
                
              </button>
              {!session && (
                <button className='text-md text-lightBlue border-2 border-lightBlue my-5 lg:text-lg font-bold rounded-lg pt-3 pb-4 px-6 outline-none hover:opacity-60 m-2'>
                    <Link href="https://t.me/chatgpt_turbo_assistant_bot" target='_blank'>
                      جرب الان
                    </Link>
                </button>
              )}
              
          </div>
          <div>
              <Image src="/logo.png" width={800} height={800} alt='logo'/>
          </div>
      </div>
    </div>
  )
}

export default MainContent