import BundleCard from '@/components/BundleCard/BundleCard'
import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function getData() {

  
  try {
    const session = await getServerSession(options)
    const userEmail = session?.user?.email
    const userRes = await fetch(`http://localhost:3000/api/user?email=${userEmail}`)
    const userData = await userRes.json()

    const bundleRes = await fetch(`http://localhost:3000/api/bundles?country=${userData.user.country}`, {
      cache: 'no-store'
    })

    const bundleData = await bundleRes.json()
  
    return {bundleData, userData}
    
  } catch (error) {
    console.log('error loading', error);
  }
}

async function page() {

  const session = await getServerSession(options)
  if (!session) {
    redirect("/subscribe", "replace")
  }



    const data = await getData()

    console.log(data?.bundleData?.bundles[0]);

    return (
      <div className='py-10 p-6 md:px-28 md:py-5'>
        <div className='text-2xl font-bold' style={{direction: "rtl"}}>
          <h1>
            أهلا بك
          
            <span className='text-lightBlue mr-2'>
              {data?.userData?.user?.firstName}!
            </span>
          </h1>
          <p className=' text-sm mt-2'>
            ال
            ID 
            الخاص بك للشراء:
            <span className='text-lightBlue mr-2'>
              {data?.userData?.user?._id}
            </span>
          </p>
        </div>
        <div className='flex justify-between flex-wrap items-center gap-12 py-5 w-full my-10' style={{direction: 'rtl'}}>
            {data?.bundleData?.bundles.map(bundle => (
              <>
              <BundleCard 
              cost={bundle.cost}
              key={bundle._id}
              name={bundle.name}
              messages={bundle.messages} 
              time={bundle.time}
              imgUrl={bundle.imgUrl}
              />
              </>
              
              ))}
        </div>
        <div className='flex justify-center items-center'>
          <button className='m-auto border border-lightBlue text-lightBlue my-5 text-md md:text-lg font-bold rounded-lg pt-3 pb-4 px-6 outline-none hover:opacity-75 mx-2'>
              <Link href="https://t.me/chatgpt_turbo_assistant_bot" target='_blank'>
                !اذهب الى البوت
              </Link>
          </button>
        </div>
      </div>
    )
}

export default page