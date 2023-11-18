"use client"
import { BlogsType } from '@/types/BlogType';
import Link from 'next/link';
import React, { FC } from 'react';
import Image from 'next/image';

interface DataProps {
    blogs : BlogsType[];
}


const LatestSectionBlog:FC<DataProps> = ({blogs}) => {
    const slicedBlog = blogs && blogs.sort((x, y)=>{
        if(x.createdAt < y.createdAt) return 1;
        if(x.createdAt > y.createdAt) return -1;
        return 0
    }).slice(0, 4)
  return (
    <main className='md:-z-20 sm:-z-20 sm:h-3/5 md:h-3/5 h-3/4 w-full mt-3 bg-black-rgb3 justify-center items-center tracking-wider font-serif flex flex-col gap-2'>
        <h2 className=' flex items-center justify-center text-3xl'>New Blogs</h2>
            <div className='sm:w-11/12 md:w-11/12 h-3/4   items-center justify-start w-5/6 p-2 flex flex-row overflow-y-hidden overflow-x-auto gap-8 sm:gap-4 
                scroll-smooth nap-x-mandatory '>
                {
               slicedBlog && slicedBlog.map((blog, id) =>(
                    <Link href={`/blog/${blog.id}`} key={id} className='flex flex-col h-full w-10/12 sm:flex-shrink-0 md:flex-shrink-0 sm:w-full md:w-full snap-start 
                        rounded-md hover:scale-105 hover:cursor-pointer hover:shadow-3xl transition-all duration-300 ease-in delay-150 shadow-5xl'>
                        { typeof blog.image === "string" &&  <Image src={blog.image} alt="" width={200} height={200} className='w-full h-3/5 object-cover rounded-t-md'/>}
                        <div className='text-white flex w-full items-center flex-col h-36 overflow-hidden justify-evenly gap-2 p-1'>
                                <h2 className='text-xl w-full overflow-hidden line-clamp-1 pl-1 '>{blog.title}</h2>
                                <p className='text-sm w-full  overflow-hidden line-clamp-4 opacity-60 pl-1'>{blog.content}</p>
                        </div>
                    </Link>
                ))
                }
            </div>
    </main>
  )
}

export default LatestSectionBlog