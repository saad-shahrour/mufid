"use client"
import React, { useState } from 'react'
import Select from 'react-select'
import { useRouter } from "next/navigation";


function UserCardBundlesChange({bundles, user}) {

    const router = useRouter()
    const options = bundles.map(bundle => ({value: bundle, label: bundle.name}))
    const [bundleOption, setBundleOption] = useState(null)
    const [userEdited,setUserEdited] = useState(false)

    const handleChange = (e) => {
        setBundleOption(e.value)
    }

    const handleSubmit = async () => {
        if (bundleOption) {
            // send the user and bundle data            
            const res = await fetch(`http://localhost:3000/api/users`, {
                method: "PATCH",
                body: JSON.stringify({boughtBundle : bundleOption, userId: user._id}),
                headers: {
                    "content-type": "application/json"
                },
                cache: 'no-store'
            })
            if (res.ok) {
                router.replace('http://localhost:3000/admin/dashboard', 'replace')
                setUserEdited(true)
                return await res.json()
            }
        } else {
            return
        }

    }

  return (
    <div>
        <div className='flex justify-between items-center my-2'>
            <div className='text-lightBlue font-bold ml-3'>
                اختر باقة:
            </div>
            <div>
                <Select options={options} onChange={handleChange}/>
            </div>
        </div>
            <input type='submit' value="تعيين" onClick={(handleSubmit)} className='text-white bg-lightBlue py-1 px-3 mr-10 my-1 rounded-lg cursor-pointer hover:opacity-70 outline-none'/>
    </div>
  )
}

export default UserCardBundlesChange