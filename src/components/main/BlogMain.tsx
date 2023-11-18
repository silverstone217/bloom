"use client"
import { BlogsType } from '@/types/BlogType';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { IoMdClose, IoIosSearch } from "react-icons/io";
import Image from 'next/image';

interface Props {
    blogs : BlogsType[];
}

const BlogMain: FC<Props> = ({blogs}) => {

    const [nbrToShow, setNbrToShow] = useState(4);
    const [search, setSearch ] = useState("");

    const filteredBlogs = blogs.sort((x, y)=>{
        if(x.createdAt < y.createdAt) return 1;
        if(x.createdAt > y.createdAt) return -1;
        return 0
    }).filter((x)=>(x.title.toLowerCase().includes(search.toLowerCase()) || 
        x.genre.toLowerCase().includes(search.toLowerCase())) || (x.author && x.author.toLowerCase().includes(search.toLowerCase())) )
        .slice(0, nbrToShow);

  return (
    <main className={`relative text-xl tracking-wider w-full flex flex-col items-center mt-10 
        justify-center gap-5  transition-all duration-300 delay-150 ease-in`}>
        <header className='relative w-full flex items-center justify-center gap-8 flex-wrap flex-row my-3'>
            <form className='w-1/2 sm:w-4/5 md:w-4/5 h-14 flex flex-rowitems-center bg-black-rgb px-1 rounded-md'>
                <IoIosSearch size={20} className="h-full w-8 flex items-center justify-center" />
                <input type="text" placeholder='Search...' value={search}
                    onChange={(event) => setSearch(event.target.value)}
                className='h-full outline-none border-none flex-1 p-2 text-white bg-transparent '
                />
                <IoMdClose size = {20} onClick={() =>setSearch("")}
                    className="h-full w-8 flex items-center justify-center cursor-pointer hover:opacity-70 hover:scale-95"/>
            </form>
        </header>

        <main className='relative w-full flex items-center justify-center gap-8 flex-wrap flex-col'>
            <div className='relative sm:w-4/5 md:w-4/5 w-3/4 p-2 flex items-center justify-center gap-8 flex-wrap flex-row overflow-hidden'>
                {
                    filteredBlogs.map((blog)=>(
                        <Link href={`/blog/${blog.id}`} key={blog.id} className='flex flex-col h-full w-2/5 sm:flex-shrink-0 md:flex-shrink-0 sm:w-full md:w-full snap-start 
                            rounded-md hover:scale-105 hover:cursor-pointer hover:shadow-3xl transition-all duration-300 ease-in delay-150 shadow-5xl'>
                            <Image src={blog.image} alt="" width={400} height={200} className='w-full h-48 object-cover rounded-t-md'/>
                            <div className='text-white flex w-full items-center flex-col h-36 overflow-hidden justify-evenly gap-2 p-1'>
                                <h2 className='text-xl w-full overflow-hidden line-clamp-1 pl-1 '>{blog.title}</h2>
                                <p className='text-sm w-full  overflow-hidden line-clamp-4 opacity-60 pl-1'>{blog.content}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <button onClick={()=>setNbrToShow(prev => prev + 4)}
                className='w-1/4 md:w-2/3 sm:w-2/3 bg-black-rgba rounded-md flex flex-row items-center 
                justify-evenly h-14 md:h-16 hover:shadow-3xl hover:bg-transparent border hover:border-pink-gb1 transition-all
                duration-500 delay-150 ease-in hover:animate-pulse z-10 mb-2'
            >Show more.</button>
        </main>
    </main>
  )
}

export default BlogMain