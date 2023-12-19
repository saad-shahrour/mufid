"use client"

import React, { useState } from 'react'
import UserCard from '../UserCard/UserCard'

function UserCardsContainer({users, bundles}) {

    const [usersState, setUsersState] = useState(users)
    const [searchValue, setSearchValue] = useState("")
    
    const handleChange = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value === "") {
            setUsersState(users)
        } 
    }

    const searchFunction = () => {
        if (searchValue !== "") {
            setUsersState(users.filter(user => user._id === searchValue))
        }
    }

    return (
        <>
            <div className='flex justify-between flex-wrap items-center my-10'>
                        <h1 className='text-2xl font-bold mb-4'>
                            المستخدمين المسجلين:         
                        </h1>
                        <div>
                            <input value={searchValue} onChange={handleChange} placeholder='ابحث عن مستخدم بواسطة ال ID' className='text-sm border border-lightBlue p-1 rounded-lg outline-none w-52'/>
                            <input type='button' value='ابحث' onClick={searchFunction} className='text-white bg-lightBlue py-1 px-3 mx-2 rounded-lg cursor-pointer hover:opacity-70 outline-none'/>
                        </div>
            </div>

            <div className='flex gap-20 justify-between overflow-x-scroll md:flex-wrap md:!justify-center md:gap-10 md:!items-center md:overflow-x-hidden md:!overflow-y-scroll' style={{maxHeight: "450px"}}>
                {usersState?.map(user => (
                        <UserCard user={user} key={user._id} bundles={bundles}/>
                ))}
            </div>

        </>
    )
}

export default UserCardsContainer