"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  return (
    <button onClick={()=>signIn("google", {callbackUrl : "http://localhost:3000/home"})}
          className=' group flex flex-row sm:w-5/6  w-3/4 h-16 mt-10 from-pink-gb1 via-pink-gb2 to-pink-gb3 items-center 
          justify-center gap-3 rounded-md bg-gradient-to-r hover:bg-none hover:border hover:border-pink-gb1
          transition duration-500 ease-in delay-200 hover:shadow-3xl '>
          <FcGoogle size={25} className="w-10 h-full bg-red" /> 
          <span className='text-2xl tracking-wider group-hover:scale-95'>Continue with Google</span>
    </button>
  )
}

export default Login