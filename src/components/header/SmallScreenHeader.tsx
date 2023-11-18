"use client";
import Link from 'next/link'
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/images/cherry-blossom.svg';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import SmSignOutBtn from '../signoutButton/SmSignOutBtn';
import { useSession } from 'next-auth/react';
import SmSignBtn from '../signInButton/SmSignBtn';


const SmallScreenHeader = () => {
    
    const {data: session } = useSession()

    const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className={`absolute top-0 w-full ${isOpen ? "h-5/6" : "h-16"} bg-black-rgb sm:flex hidden md:flex flex-col items-start justify-start px-4  transition-all duration-300 ease-in delay-200 overflow-hidden z-40`} >
        
        <div className={`h-16 w-full flex flex-row items-center justify-between ${isOpen ? " border-b border-b-gray-700" : "border-none"} transition-all duration-500 ease-in delay-100`}>
            <Link href="/home" className='flex flex-row w-1/2 h-14 items-center justify-center hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br from-pink-gb1 via-pink-gb2 to-pink-gb3
                transition-all duration-300 ease-in delay-200
                gap-2 p-3'>
            
                <div className='w-10 h-auto'>
                    <Image src={logo} alt='cherry blossom' className='w-full h-full object-cover'/>
                </div>
                <h2 className='text-xl font-semibold tracking-widest font-serif'>
                    BLOOM
                </h2>
            </Link>

            {
            !isOpen
            ?
            <AiOutlineMenu size={25} color = "white" onClick={()=>setIsOpen(true)} className="w-1/5 h-12 cursor-pointer"  />
            : 
            <AiOutlineClose size={25} color = "white"  onClick={()=>setIsOpen(false)} className="w-1/5 h-12 cursor-pointer"/>
        }
        </div>

      { isOpen && <div className={`flex ${!isOpen ? "opacity-0" : "opacity-100"} flex-col w-full h-1/3 items-start justify-evenly 
            gap-2 p-3 text-2xl tracking-wider my-12 transition-all duration-300 ease-in delay-200`}>
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
        </div>}

       {isOpen && ( session?.user.id ? <SmSignOutBtn/> : <SmSignBtn/>) }
       
    </header>
  )
}

export default SmallScreenHeader