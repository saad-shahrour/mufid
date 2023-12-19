import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react';
import UserCardBundlesChange from '../UserCardBundlesChange/UserCardBundlesChange';
 

function UserCard({user, bundles}) {

  return (

        <div className='flex justify-between items-center gap-14 border-2 rounded-lg px-4 py-6 my-4 h-72'>
        <div className='flex justify-between items-start flex-col gap-2 text-right' style={{direction: "rtl"}}>
            <div style={{width: "350px"}}>
                <span className='text-lightBlue ml-2 font-bold'>
                    ID المستخدم: 
                </span>
            <span>
                {user._id}
            </span>
            </div>
            <div>
                <span className='text-lightBlue ml-2 font-bold'>
                    اسم المستخدم: 
                </span>
            <span>
                {user.firstName} {user.lastName}
            </span>
            </div>
            <div>
                <span className='text-lightBlue ml-2 font-bold'>
                الدولة:
                </span>
                <span>
                    {user.country}
                </span>
            </div>
            <div>
                <span className='text-lightBlue ml-2 font-bold'>
                    الايميل:
                </span>
                <span>
                    {user.email}
                </span>
            </div>
            {user?.boughtBundle?.messages > 0 ? <>           
                <div>
                    <span className='text-lightBlue ml-2 font-bold'> 
                        اسم الباقة:
                    </span>
                    <span>
                        {user.boughtBundle.name}
                    </span>
                </div>
                <div>
                    <span className='text-lightBlue ml-2 font-bold'>
                        الرسائل المتاحة:
                    </span>
                    <span>
                        {user.boughtBundle.messages}
                    </span>
                </div>
                <div>
                    <span className='text-lightBlue ml-2 font-bold'>
                    الوقت المتاح لهذه الباقة:
                    </span>
                    <span>
                        {user.boughtBundle.time}
                        أيام
                    </span>
                </div>
            </> 
            :
            <div>
                <div className='font-bold text-beige my-2'>
                    غير مشترك في باقة
                    <X className='inline-block mr-1 mb-1' width={25}/>
                </div>
                <UserCardBundlesChange user={user} bundles={bundles}/>
            </div>
            }
        </div>
        <div style={{width: "100px"}}>
            <Image src="/user.png" width={100} height={100}/>
        </div>
    </div>

  )
}

export default UserCard