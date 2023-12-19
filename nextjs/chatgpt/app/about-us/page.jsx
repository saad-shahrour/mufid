import React from 'react'
import bg from '../../public/background.jpg'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

async function page() {

  const session = await getServerSession(options)

  return (
    <div className='flex justify-center items-center py-6 px-4 md:px-28 md:py-5' style={{direction: "rtl"}}>
        <div>
            <h1 className='font-bold text-3xl md:text-4xl mt-3 md:mt-5 mb-1 text-lightBlue'>
            مرحبًا بك في مفيد AI!
            </h1>
            <p className='font-bold text-md md:text-lg'>
                <br/>
                نحن مفيد AI، نفتخر بتقديم أفضل وأول خدمة للدردشة على منصة تيليجرام في الوطن العربي. باستخدام تقنية GPT-3.5 turbo، نوفر لك تجربة دردشة فائقة الجودة ومتقدمة.
                <br/>
                <br/>
                تمتاز منصتنا بسهولة الاستخدام والمرونة، حيث يمكنك التفاعل معنا عبر تيليجرام بشكل آمن ومريح. نحن نقدم حلاً فعالًا للاستفسارات والمعلومات في مختلف المجالات، سواء كنت تبحث عن مساعدة في السفر والسياحة، أو الصحة والعافية، أو التعليم والثقافة، والمزيد.
                <br/>
                <br/>
                فريقنا مكون من خبراء محترفين في مجالات مختلفة، يعملون جاهدين لتقديم معلومات موثوقة ودقيقة ومفيدة لك. نحن نهتم بتلبية احتياجاتك وتوفير الدعم اللازم لكل زبون. نحن نعتقد أن الاطلاع على المعلومات الصحيحة هو الأساس في بناء مستقبل أفضل، ولهذا السبب نسعى جاهدين لتوفير مصادر موثوقة ومجربة تساعدك في اتخاذ القرارات الصائبة.
                <br/>
                <br/>
                مفيد AI موجودة في اليمن، ونحن نفاخر بكوننا جزءًا من تطوير المحتوى المحلي وتمكينك من الوصول إلى المعرفة والموارد المحلية. نحن نتطلع إلى خدمتك والإجابة على أسئلتك ومساعدتك على الوصول إلى المعلومات التي تحتاجها.
                <br/>
                <br/>
                شكرًا لاهتمامك بمفيد AI، ونأمل أن تستفيد من خدماتنا وتجد الإجابات التي تبحث عنها. نحن هنا لنكون الشريك الموثوق لك في رحلتك نحو المعرفة والتطوير.
                
                
            </p>
            <div className='flex justify-center items-center'>
              <button className='bg-lightBlue text-white my-12 text-md md:text-lg font-bold rounded-lg pt-3 pb-4 px-6 outline-none hover:opacity-75 mx-2'>
                  {
                    session? (
                      <Link href="/bundles" >
                              العروض                    
                      </Link>
                    ) : (
                      <Link href="/subscribe">
                            اشترك الان
                      </Link>
                      )
                  }
                  
                </button>
                {!session && (
                  <button className='text-lightBlue border-2 border-lightBlue my-5 text-md md:text-lg font-bold rounded-lg pt-3 pb-4 px-6 outline-none hover:opacity-60 m-2'>
                      <Link href="https://t.me/chatgpt_turbo_assistant_bot" target='_blank'>
                        جرب الان
                      </Link>
                  </button>
                )}
            </div>
        </div>
    </div>
  )
}

export default page