import React from 'react'
import styles from "./contactus.module.scss"
import { Facebook } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function ContactUs() {
  return (
    <div className={`flex items-center justify-center text-center ${styles.contactUsContainer}`}>
      <div className='flex justify-center items-center w-full flex-wrap gap-10 p-6 md:px-28 md:py-5 md:flex-row md:flex-nowrap md:flex md:!justify-between md:items-center '>
          <div>
              <h1 className='text-3xl font-bold lg:text-4xl my-5 text-lightBlue'>
                نحن هنا دائما!
                
              </h1>
              <p className='text-md font-bold lg:text-lg'>
                    تواصل معنا اذا أردت الاستفسار عن أي شيء أو واجهتك مشاكل في الدفع الالكتروني عن طريق هذه الروابط.
              </p>
          </div>
          <div className='relative flex justify-center items-center bg-lightBlue w-[300px] h-[350px] md:w-[400px] md:h-[450px] mt-6 mr-6'>
              <div className='absolute bg-white w-[300px] h-[350px] md:w-[400px] md:h-[450px] drop-shadow-2xl -top-6 -right-6 flex justify-center items-center'>
                <div className='flex flex-col justify-between items-center'>
                    <h1 className='text-xl font-bold lg:text-2xl mb-16 border-b border-gray-600'>
                     شركة مفيد AI في الخدمة:
                    </h1>
                  <div className='flex justfy-center items-center gap-3 my-4 font-bold text-center'>
                    <Link className='cursor-pointer' href="https://www.facebook.com/profile.php?id=61554741688824&mibextid=ZbWKwL">
                        تواصل معنا على فيسبوك
                    </Link>
                    
                    <Link className='cursor-pointer' href="https://www.facebook.com/profile.php?id=61554741688824&mibextid=ZbWKwL">
                        <Image src='/facebook.png' height={25} width={25}/>              
                    </Link>
                  </div>
                  <div className='flex justfy-center items-center gap-3 my-4 font-bold text-center'>
                    <Link className='cursor-pointer' href="https://wa.me/967781311716" target='_blank'>
                        تواصل معنا على واتساب
                    </Link>
                    <Link className='cursor-pointer' href="https://wa.me/967781311716" target='_blank'>
                        <Image src='/whatsapp.png' height={25} width={25}/>
                    </Link>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ContactUs