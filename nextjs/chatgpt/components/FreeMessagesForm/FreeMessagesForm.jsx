"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function FreeMessagesForm({messagesNumber}) {

    const [number, setNumber] = useState(messagesNumber)
    const router = useRouter()

    const handleChange = (e) => {
        setNumber(e.target.value)
    }

    const handleEdit = async () => {
        console.log(number)
        const res = await fetch('http://localhost:3000/api/freemessages', {
            method: "PUT",
            body: JSON.stringify({number}),
            headers: {
                "content-type": "application/json"
            }
        })
        console.log(res.json());
        console.log(false,false,false)
        router.refresh()
    }

  return (
    <div className="flex gap-6 flex-wrap items-center my-10">
        <input type="number" onChange={handleChange} value={number} className='text-sm border border-lightBlue p-1 rounded-lg outline-none w-52'/>
        <input type='button' value='عدل' onClick={handleEdit} className='text-white bg-lightBlue py-1 px-3 mx-2 rounded-lg cursor-pointer hover:opacity-70 outline-none'/>
    </div>
  )
}

export default FreeMessagesForm