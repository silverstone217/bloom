import React from 'react'
import Image from 'next/image';
import logo from '../../../public/images/cherry-blossom.svg';
import Link from 'next/link';
import BsSignOutBtn from '../signoutButton/BsSignOutBtn';
import { getServerSession } from 'next-auth';
import BsSignBtn from '../signInButton/BsSignBtn';
import { authOptions } from '@/lib/auth';


const BigScreenHeader = async () => {

    const data = await getServerSession(authOptions);

  return (

    
    <header className=' w-full h-16 bg-black-rgb sm:hidden md:hidden flex flex-row items-center justify-between px-14 sticky transition-all duration-300 ease-in delay-200'>
        <Link href="/home" className='flex flex-row w-1/6 h-14 items-center justify-center hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br from-pink-gb1 via-pink-gb2 to-pink-gb3
            transition-all duration-300 ease-in delay-200
            gap-2 p-3'>
          
            <div className='w-10 h-auto group'>
                <Image src={logo} alt='cherry blossom' className='w-full h-full object-cover group-hover:animate-spin'/>
            </div>
            <h2 className='text-xl font-semibold tracking-widest font-serif'>
                BLOOM
            </h2>
        </Link>

       <div className='flex flex-row w-1/3 h-14 items-center justify-evenly 
            gap-2 p-3 text-xl tracking-wider'>
            <Link href="/home" className='hover:border-b border-b-pink-gb1 transition-all 
                duration-300 ease-in delay-100'>
                Home
            </Link>
            <Link href="/blog" className='hover:border-b border-b-pink-gb1 transition-all 
                duration-300 ease-in delay-100'>
                Blog
            </Link>
            <Link href="/create" className='hover:border-b border-b-pink-gb1 transition-all 
                duration-300 ease-in delay-100'>
                Create
            </Link>
            <Link href="/myblog" className='hover:border-b border-b-pink-gb1 transition-all 
                duration-300 ease-in delay-100'>
                My blogs
            </Link>
       </div>

     { data?.user.id ? <BsSignOutBtn/> : <BsSignBtn/> }
    </header>
    
  )
}

export default BigScreenHeader