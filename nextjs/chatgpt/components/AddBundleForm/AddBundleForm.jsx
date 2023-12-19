"use client"

import React, { useState } from 'react'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { UploadButton } from "../../utils/uploadthing";

function AddBundle() {

    const [formData, setFormData] = useState({name: "", messages: 0,time: 0, country: "", })
    const router = useRouter()

    const countries = [
        "اليمن",
        "البحرين",
        "مصر",
        "ايران",
        "العراق",
        "الأردن",
        "الكويت",
        "لبنان",
        "عَمان",
        "فلسطين",
        "قطر",
        "المملكة العربية السعودية",
        "سوريا",
        "الامارات العربية المتحدة",
        "عُمان"
    ]

    const options = countries.map(country => ({
        value: country, label: country
    }))


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleOptionsChange = (e) => {
        setFormData(prev => ({...prev, country: e.value}))
    }

    const handleSubmit = async () => {
        if (!formData.imgUrl) {
            return
        }
        console.log(formData);
        const res = await fetch('http://localhost:3000/api/bundles', {
            method: "POST",
            body: JSON.stringify({formData}),
            headers: {
                "content-type": "application/json"
            }
        })
        if (!res.ok) {
            const message = await res.json();
            console.log(message);
        }

    }

  return (
    <form className='sm:w-1/3 mb-20 mt-16 m-auto' onSubmit={handleSubmit}>
        <div className='flex justify-between items-center gap-5'>
            <div>
                <h1 className='text-xl mb-2'>
                    اسم الباقة:
                </h1>
                <input className='p-1 w-44' name='name' onChange={handleChange} required/>
            </div>
            <div>
                <h1 className='text-xl mb-2'>
                    عدد الرسائل:
                </h1>
                <input className='p-1 w-44' type='number' name='messages' onChange={handleChange} required/>
            </div>
        </div>
        <div className='mt-8'> 
                <h1 className='text-xl mb-2'>
                    الوقت المتاح للباقة (بالأيام):
                </h1>
                <input className='p-1 w-44' type='number' name='time' onChange={handleChange} required/>
        </div>
        <div className='mt-8'> 
                <h1 className='text-xl mb-2'>
                    سعر الباقة (بالدولار):
                </h1>
                <input className='p-1 w-44' type='number' name='cost' onChange={handleChange} required/>
        </div>
        <div className='mt-8'>
            <h1 className='text-xl mb-2'>
                الدولة المتاحة فيها الباقة:
            </h1>
            <div>
                <Select options={options} className='w-44' name='country' onChange={handleOptionsChange} required/> 
            </div>
        </div>
        <div className='mt-8'>
            <h1 className='text-xl mb-2'>
                صورة الباقة
            </h1>
            <div>
                <UploadButton 
                    className="items-start ut-button:border-2 ut-button:rounded-none  ut-button:border-gray-500 ut-button:bg-gray-500 ut-button:text-white ut-button:text-xs ut-button:w-auto ut-button:px-2 ut-button:ut-readying:bg-gray-500/50"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                    // Do something with the response
                    const imgUrl = res[0].url
                    setFormData(prev => ({...prev, imgUrl}))
                    }}
                    onUploadError={(error) => {
                    // Do something with the error.
                    console.log(error);
                    router.refresh()
                    }}
                />
                <span>
                    {formData.imgUrl ? 
                    <span className='text-xs font-bold text-lightBlue'>
                        image is uploaded successfully
                    </span>
                    : 
                    <span className='text-xs font-bold text-danger'>
                        image is not uploaded
                    </span>
                    }
                </span>
            </div>
        </div>
        <div>
            <div className='flex justify-center items-center'>
                <input type='submit' value='أضف الباقة' className='text-white text-lg bg-lightBlue py-2 px-3 mt-12 rounded-lg cursor-pointer hover:opacity-70 outline-none'/>     
            </div>
        </div>
    </form>
  )
}

export default AddBundle