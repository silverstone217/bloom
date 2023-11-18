'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const BsSignOutBtn = () => {
  return (
    <button onClick={()=>signOut({
        redirect : true,
        callbackUrl: "/"
    })}
        className='flex flex-row w-1/6 h-10 items-center justify-center bg-gradient-to-r hover:bg-none hover:border hover:border-red-bg1
        transition-all duration-500 ease-in delay-200 hover:shadow-4xl 
        gap-2 p-3 bg-transparent text-xl tracking-wider rounded-md from-red-bg1 via-red-bg2 to-red-bg2 z-10'>
        Sign out
    </button>
  )
}

export default BsSignOutBtn