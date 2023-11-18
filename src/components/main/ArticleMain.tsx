import React from 'react';
import Image from 'next/image';
import travel from '../../../public/images/travel.jpg'
import Link from 'next/link';
import { IoIosArrowRoundForward } from "react-icons/io"

const ArticleMain = () => {
  return (
    <article className='relative text-xl tracking-wider w-full h-full flex flex-col items-center 
        justify-center gap-3 md:h-full sm:h-full transition-all duration-300 delay-150 ease-in sm:mt-16 md:mt-16 md:-z-0 sm:-z-0'>
        <Image src={travel} alt='travel'className='absolute -z-20 h-full object-cover '/>

        <div className='flex flex-col bg-black-rgba w-full h-full items-start justify-center sm:pl-6 pl-56'>
            <h1 className='text-4xl sm:text-3xl font-serif w-1/2 md:w-3/4 sm:w-4/5 '>{"Let's Create..."}</h1>
            <h2 className='text-5xl sm:text-4xl font-serif my-6 w-1/2 md:w-3/4 sm:w-4/5 '>Your own view in B.L.O.O.M</h2>
            <Link href="create" className='w-1/4 md:w-1/2 sm:w-1/2 bg-black-rgba rounded-md flex flex-row items-center 
            justify-evenly h-14 hover:shadow-3xl hover:bg-transparent hover:border hover:border-pink-gb1 transition-all
            duration-500 delay-150 ease-in hover:animate-pulse z-10'>
                <span>Get Started</span>
                <IoIosArrowRoundForward size={20} color="white" className="w-8 h-8" />
            </Link>
        </div>

    </article>
  )
}

export default ArticleMain