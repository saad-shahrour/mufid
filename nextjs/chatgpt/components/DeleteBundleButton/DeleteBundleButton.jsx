"use client"
import React from 'react'
import {Trash2} from 'lucide-react'
import { useRouter } from 'next/navigation'

function DeleteBundleButton({id}) {

    const router = useRouter()

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/bundles?id=${id}`,{
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
            })
            console.log(await res.json());
        } catch (error) {
          console.log(error);  
        }
        router.refresh()

    }

  return (
    <div onClick={handleDelete} className='flex justify-center items-center gap-1 font-bold text-danger text-sm opacity-70 mt-6 cursor-pointer'>
        حذف الباقة
        <Trash2 width={15}/>
    </div>
  )
}

export default DeleteBundleButton