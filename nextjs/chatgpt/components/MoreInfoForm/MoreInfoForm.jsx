"use client"

import React, { useState } from 'react'
import {useRouter} from "next/navigation"
import styles from "./MoreInfoForm.module.scss"

 function MoreInfo() {

    const [formData, setFormData] = useState({firstName: "", lastName: "", country: "اليمن"})
    const router = useRouter()


    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({formData}),
            headers: {
                "content-type": "application/json"
            }
        })

        if (!res.ok) {
            const message = await res.json();
            console.log(message);
        } else {
            router.refresh()
            router.push('/')
        }

    }


  return (
    
    <div className={`flex items-center justify-center text-right ${styles.moreInfoFormContainer}`}>
        <div className="rounded-lg p-5 border-2 w-80 md:w-96">
        <h1 className='text-3xl font-bold text-lightBlue mb-1 mt-5 text-center'>
                أخبرنا بالقليل عنك!
        </h1>
        <p className='border-lightBlue border w-52 mb-20 text-center m-auto'></p>

        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    الاسم الأول
                </label>
                <input onChange={handleChange} value={formData.firstName} name="firstName" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="محمد" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    الاسم الأخير
                </label>
                <input onChange={handleChange} value={formData.lastName} name="lastName" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    الدولة
                </label>
                <div className="relative">
                    <select onChange={handleChange} value={formData.country} name="country" required className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        {/* entered manually to avoid styling issues */}
                        <option>اليمن</option>
                        <option>البحرين</option>
                        <option>مصر</option>
                        <option>ايران</option>
                        <option>العراق</option>
                        <option>الاردن</option>
                        <option>الكويت</option>
                        <option>لبنان</option>
                        <option>عَمان</option>
                        <option>فلسطين</option>
                        <option>قطر</option>
                        <option>المملكة العربية السعودية</option>
                        <option>سوريا</option>
                        <option>الامارات العربية المتحدة</option>
                        <option>عُمان</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>

            </div>
            <div className='flex items-center justify-center mt-6'>
                <input type='submit' value="تم" className='rounded-lg py-3 px-8 font-bold bg-lightBlue text-white hover:opacity-60 hover:cursor-pointer'/>
            </div>
        </form>

        </div>
        </div>
  )
}

export default MoreInfo