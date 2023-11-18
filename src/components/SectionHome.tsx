import React from 'react';
import Image from 'next/image';
import quote from '../../public/images/quote.svg';
import { phrase } from '@/data';

const SectionHome = () => {
  
  const choosedPhrase = phrase[Math.floor( Math.random() * phrase.length)];

  return (
    <section className="sm:hidden md:hidden flex flex-1 flex-col tracking-wider items-center justify-center h-full
       bg-black-rgb2 gap-4 relative transition-all duration-500 ease-in delay-200">
        <Image src={quote} alt='quote' className='absolute -z-0 w-36 h-auto left-24 top-1/4 opacity-40'/>
        <p className='w-1/2 text-2xl opacity-80'>{choosedPhrase.text}</p>
        <p className='w-1/2 text-xl opacity-60'>{choosedPhrase.author}</p>
    </section>
  )
}

export default SectionHome