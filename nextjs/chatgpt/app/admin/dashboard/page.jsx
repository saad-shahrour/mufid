import { options } from '@/app/api/auth/[...nextauth]/options'
import AddBundleForm from '@/components/AddBundleForm/AddBundleForm'
import BundleCard from '@/components/BundleCard/BundleCard'
import FreeMessagesForm from '@/components/FreeMessagesForm/FreeMessagesForm'
import UserCardsContainer from '@/components/UserCardsContainer/UserCardsContainer'
import { getServerSession } from 'next-auth'
import React from 'react'

async function getUsers() {

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        cache: 'no-store'
      })
      if (!res.ok) {
        throw new Error('failed to fetch')
      }
    
      return await res.json()
      
    } catch (error) {
      console.log('error loading', error);
    }
}



async function getBundles() {

    try {
      const res = await fetch('http://localhost:3000/api/bundles', {
        cache: 'no-store'
      })
    
      return await res.json()
      
    } catch (error) {
      console.log('error loading', error);
    }
  }

async function getFreeMessages() {

    try {
      const res = await fetch('http://localhost:3000/api/freemessages', {
        cache: 'no-store'
      })
    
      const data = await res.json()
      return data.freeMessagesNumber
      
    } catch (error) {
      console.log('error loading', error);
    }
  }


async function page() {

    const session = await getServerSession(options)
    if (session?.user?.role === "admin" || !session) {
        return (<div className='text-xl font-bold flex justify-center items-center text-lightBlue' style={{height: "calc(100vh - 64px)"}}>
            <div>
                You can't access this page
            </div>
        </div>)
    }

    const usersData = await getUsers()
    const bundlesData = await getBundles()
    const freeMessages = await getFreeMessages()
    console.log(freeMessages, true);
    
    return (
        <div className='p-6 md:px-28 md:py-5' style={{direction: "rtl"}}>

            <UserCardsContainer users={usersData?.users} bundles={bundlesData?.bundles}/>



            <div className='w-48 h-0.5 bg-lightBlue m-auto mt-24 mb-20'></div>

            
            <div>
                    <h1 className='text-2xl font-bold '>
                                الرسائل المجانية:
                                <span className="mr-3">
                                  {freeMessages}
                                </span>
                                
                    </h1>
                    <FreeMessagesForm messagesNumber={freeMessages}/>
                    
            </div>
            <div>
              
            </div>

            
            <div className='w-48 h-0.5 bg-lightBlue m-auto mt-24 mb-20'></div>


            <div>
                <div>
                    <h1 className='text-2xl font-bold '>
                                الباقات المتاحة:
                    </h1>
                </div>
                <div className='flex justify-between items-center gap-10 py-5 flex-wrap my-10' style={{direction: 'rtl'}}>
                  {bundlesData?.bundles.map(bundle => (   
                        <BundleCard
                            key={bundle._id}
                            cost={bundle.cost}
                            id={bundle._id}
                            name={bundle.name}
                            messages={bundle.messages} 
                            time={bundle.time}
                            imgUrl={bundle.imgUrl}
                            country={bundle.country}
                            admin={true}
                            />
                            ))}
                </div>
            </div>
            
            <div className='w-48 h-0.5 bg-lightBlue m-auto mt-24 mb-20'></div>
        
            <h1 className='text-2xl font-bold'>
                    اضافة باقة:         
            </h1>
            <AddBundleForm/>

        </div>
    )
}

export default page