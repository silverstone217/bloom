import Link from 'next/link'
import React from 'react'

const SmSignBtn = () => {
  return (
    <Link href="/"
        className='flex flex-row w-1/2 h-14  from-pink-gb1 via-pink-gb2 to-pink-gb3 items-center 
        justify-center rounded-md bg-gradient-to-r hover:bg-none hover:border hover:border-pink-gb1 gap-2 p-3
        text-xl tracking-wider
        transition duration-500 ease-in delay-200 hover:shadow-3xl '>
        Sign in
    </Link>
  )
}

export default SmSignBtn