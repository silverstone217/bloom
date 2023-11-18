import React from 'react';
import Image from 'next/image';
import logo from '../../public/images/cherry-blossom.svg';

const Loading = () => {
  return (
    <div className='self-center flex flex-row w-full h-1/2 items-center justify-center  text-transparent bg-clip-text bg-gradient-to-br from-pink-gb1 via-pink-gb2 to-pink-gb3
        transition-all duration-300 ease-in delay-200
        gap-2 p-3'>
          
        <div className='w-12 h-auto group'>
            <Image src={logo} alt='cherry blossom' className='w-full h-full object-cover animate-spin'/>
        </div>
        <h2 className='text-2xl font-semibold tracking-widest font-serif'>
            BLOOM...
        </h2>
    </div>
  )
}

export default Loading