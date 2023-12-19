
import Image from 'next/image'
import React from 'react'
import DeleteBundleButton from '../DeleteBundleButton/DeleteBundleButton'
// import PayPalClientButton from "./PayPalClientButton"
import PayPalButton from '../PayPalButtons/PayPalButtons';
import Link from 'next/link';
// import { PayPalButtons } from '@paypal/react-paypal-js';

async function BundleCard({cost, name, id, messages, time, imgUrl, admin, country}) {

    console.log(cost, name);

  return (
    <div className='border-2 rounded-lg py-7' style={{width: "325px"}}>
    <div className='flex flex-col items-center justify-between gap-6 flex-wrap w-full lg:w-auto '>
        <div>
            <Image src={imgUrl} width={100} height={100}/>
        </div>
        
        <div>
            <div className='text-center mb-5'>
                <h1 className='text-2xl m-auto font-bold mb-3 inline-block text-lightBlue border-b border-lightBlue'>
                    {name}
                </h1>
            </div>
            <div className='flex justify-between items-center mb-1'>
                <span className='font-bold'>
                الرسائل  المتاحة في هذه الباقة:
                </span>
                <span className='text-lightBlue font-bold w-20 text-center'>
                    {messages}
                </span>
            </div>
            <div className='flex justify-between items-center mb-1'>
                <span className='font-bold'>
                الوقت المتاح لهذه الباقة:
                </span>
                <span className='text-lightBlue font-bold w-20 text-center'>
                    {time} أيام
                </span>
            </div>
            <div className='flex justify-between items-center mb-1'>
                <span className='font-bold'>
                    سعر الباقة:
                </span>
                <span className='text-lightBlue font-bold w-20 text-center'>
                    {cost} دولار
                </span>
            </div>

            {admin && 
                <div>
                    <span className='font-bold'>
                        الدولة المتاحة فيها الباقة:
                    </span>
                    <span className='text-lightBlue font-bold mr-12'>
                        {country}
                    </span>
                    <div className='felx justify-center items-center'>
                        <DeleteBundleButton id={id}/>
                    </div>
                </div>
            
            }
            
        </div>
        
    </div>
    <div>
    {!admin && (
        <div className='flex flex-col items-center justify-center'>
        
            <button className='text-white font-bold bg-lightBlue py-1.5 mt-8 rounded-md cursor-pointer hover:opacity-70 outline-none' style={{width: '200px', wordSpacing: '5px'}}>
                <Link href="/contact-us" className='hover:cursor-pointer'>
                    تواصل معنا للشراء
                </Link>
            
            </button>
            <PayPalButton price={cost}/>
        </div>
            
        )}
    </div>

    </div>
  )
}

export default BundleCard