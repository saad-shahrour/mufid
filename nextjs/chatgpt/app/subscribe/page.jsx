import React from 'react'
import GoogleSubscribe from '@/components/GoogleSubscribe/GoogleSubscribe'
import FacebookSubscribe from '@/components/FacebookSubscribe/FacebookSubscribe'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'


async function Subscribe() {

    const session = await getServerSession(options)
    if (session) {
        redirect("/bundles", "replace")
    }

    return (
        <div className="flex items-center justify-center text-right" style={{height: 'calc(100vh - 64px)'}}>
            <div className="rounded-lg p-5 border-2 w-80 md:w-96">
                <h1 className='text-3xl font-bold text-lightBlue mb-1 mt-5 text-center'>
                    AI أهلا بك في مفيد
                </h1>
                <p className='border-lightBlue border w-52 mb-20 text-center m-auto'></p>

                <p className='font-bold text-l text-center'>
                    :قم بانشاء حساب بواسطة
                </p>
                <div className='text-center flex justify-center flex-col items-center hover:cursor-pointer'>
                    <GoogleSubscribe/>
                    <div className='flex justify-between items-center'>
                        <span className='border border-gray-300 w-24'></span>
                        <span className='mx-2 font-medium'> 
                        أو
                        </span>
                        <span className='border border-gray-300 w-24'></span>
                    </div>
                    <FacebookSubscribe/>
                </div>
            </div>
        </div>
    )
    }

export default Subscribe