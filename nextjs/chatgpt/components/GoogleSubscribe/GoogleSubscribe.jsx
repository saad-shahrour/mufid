"use client"
import React from 'react'
import Image from "next/image"
import {signIn} from "next-auth/react"

async function GoogleSubscribe() {

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", {
                callbackUrl: "/subscribe/moreinfo"
            })
            
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
            <div onClick={handleGoogleSignIn} className='font-medium rounded-lg text-center w-full border-2 p-4 hover:opacity-60 m-3 flex gap-2 justify-center'>
                        <Image src="/google.png" width={24} height={24} alt='google'/>
                        Google
            </div>
    )
}

export default GoogleSubscribe