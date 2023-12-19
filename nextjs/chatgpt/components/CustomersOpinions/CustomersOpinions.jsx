"use client"

import { useState } from "react";
import styles from "./CustomersOpinions.module.scss"
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

 
const CustomersOpinions = ({opinions}) => {


    const [currentSlide, setCurrentSlide] = useState(0)

    const prevPicFunc = () => {
        setCurrentSlide(currentSlide === 0 ? opinions.length - 1 : (prev) => prev - 1)        
    }

    const nextPicFunc = () => {
        setCurrentSlide(currentSlide === opinions.length - 1 ? 0 : (prev) => prev + 1)
    }

    const handlePrevClick = () => {
        prevPicFunc(); // Invoke the function to change the slide
      };
    
      const handleNextClick = () => {
        nextPicFunc(); // Invoke the function to change the slide
      };
    

       //   <div className={`${styles.slider} w-[450px] md!:w-[600px]`}>
    //   <div className={`${styles.textContainer} w-[calc(450*${opinions.length})px] translate-x-[calc(450px*${currentSlide})] md:!w-[calc(600*${opinions.length})px] md:translate-x-[calc(600px*${currentSlide})]`}>
    //       {opinions?.map(item => (
    //           <div key={item._id} style={{height: '275px'}} className="text-2xl font-bold lg:text-l !w-[450px] md:!w-[600px]">
    //               {item.text}
    //           </div>    
    //       ))}
          
    //   </div>

    
    return ( 
            <div className={`w-full  ${styles.container}`}>
                <div className='p-6 md:px-28 md:py-5'>
                    <h1 className='text-3xl font-bold lg:text-4xl my-5 text-lightBlue'>
                        اراء العملاء في شركة مفيد AI:
                    </h1>
                </div>
                <div className={`${styles.slider} w-[450px]`}>
                    <div className={styles.textContainer} style={{transform: `translateX(${450 * currentSlide}px)`, width: `calc(450px * ${opinions.length})`}}>
                        {opinions?.map(item => (
                            <div key={item._id} style={{width: "450px", height: '275px'}} className="text-2xl font-bold lg:text-l">
                                {item.text}
                            </div>
                        ))}
                        
                    </div>
                    <div className={styles.icons}>
                        <div className={styles.icon} onClick={handleNextClick}>
                            <ArrowRight width={20} height={20}/>
                        </div>
                        <div className={styles.icon} onClick={handlePrevClick}>
                            <ArrowLeft width={20} height={20}/>
                        </div>
                    </div>
                </div>
                
            </div>
     );
}
 
export default CustomersOpinions;