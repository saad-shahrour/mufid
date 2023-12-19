"use client"

import React from 'react'
import Image from "next/image"
import {signIn} from "next-auth/react"

async function FacebookSubscribe() {

    const handleFacebookSignIn = async () => {
        await signIn("facebook", {
            callbackUrl: "/subscribe/moreinfo"
        })     

    }

    return (
            <div onClick={handleFacebookSignIn} className='rounded-lg text-center w-full border-2 p-3 hover:opacity-60 m-3 flex gap-2 justify-center hover:cursor-pointer'>
                    
                    <Image src="/facebook.png" width={24} height={24} alt='facebook'/>
                    Facebook
            </div>
    )
}

export default FacebookSubscribe