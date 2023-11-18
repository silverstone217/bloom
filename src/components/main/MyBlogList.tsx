"use client"
import { BlogsType } from '@/types/BlogType';
import Link from 'next/link';
import React, { FC } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Image from 'next/image';
import travel from '../../../public/images/travel2.jpg'
import { useSession } from 'next-auth/react';
import { errorNotif, succesNotif } from '@/lib/notifToast';
import {  ref, deleteObject } from "firebase/storage";
import { storage } from '@/lib/firebase';

interface DataProps {
    blogs : BlogsType[];
}

const MyBlogList:FC<DataProps> = ({blogs}) => {

    const {data : session } = useSession();
    const URL = process.env.URL_PATH!

    if(!session?.user.id) return null

    const filteredBlogs = blogs.filter(blog => blog.userId === session?.user.id);

    const handleDelete = async (id: string, imageUrl: string) => {
        if(!session.user.id || !id) return
        
        try {

            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);

            const res = await fetch(`${URL}/api/blog/delete/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({id: id, userId : session.user.id}),
            });

            if(res.ok){
                succesNotif("Successfully deleted!")
              }
              else{
                errorNotif("Failed to delete the blog!")
              }

        } catch (error) {
            const err = error as Error;
            errorNotif(err.message)
        }
    }

  return (
    <main className={`relative text-xl tracking-wider w-full ${!filteredBlogs || filteredBlogs.length < 1 ? "h-3/4" : null} flex flex-col items-center 
    justify-center gap-3  transition-all duration-300 delay-150 ease-in sm:mt-16 md:mt-16 md:-z-0 -z-0`}>
        {
           !filteredBlogs || filteredBlogs.length < 1 && <Image src={travel} alt='travel'className='md:h-full absolute -z-10 h-1/2 object-cover ' />
        }

        {
            filteredBlogs && filteredBlogs.length > 0 && <h2 className=' flex items-center justify-center text-3xl my-2 '>My Blogs</h2>
        }

        {

        !filteredBlogs || filteredBlogs.length < 1
            ? 
            <div className='w-full flex flex-col items-center justify-center gap-4 h-full text-2xl bg-black-rgba'>
                <h3 className='text-3xl my-4'>Not blogs yet</h3>
                <Link href="create" className='w-1/4 md:w-2/3 sm:w-2/3 bg-black-rgba rounded-md flex flex-row items-center 
                    justify-evenly h-14 md:h-16 hover:shadow-3xl hover:bg-transparent border hover:border-pink-gb1 transition-all
                    duration-500 delay-150 ease-in hover:animate-pulse z-10'>
                    <span>Create new one</span>
                    <IoIosArrowRoundForward size={20} color="white" className="w-8 h-8" />
                </Link>
            </div> 
            : 
            <div className='w-1/2 flex flex-row flex-wrap gap-8 md:gap-6 sm:gap-6 items-center p-2 sm:w-full md:w-full md:bg-black-rgb'>
                 {
                    filteredBlogs.map((blog, idx) =>(
                        <Link href={`/blog/${blog.id}`} key={idx} className='flex-shrink-0 flex flex-col w-2/5 items-center sm:w-full md:w-full bg-black-rgb1 
                            rounded-md hover:cursor-pointer hover:shadow-3xl transition-all duration-300 ease-in delay-150 shadow-5xl hover:scale-105'> 
                            <Image src={blog.image} alt="" width={400} height={200} priority={true} className='w-full h-48 object-cover rounded-t-md'/>
                            <div className='text-white flex w-full items-center flex-col h-36 overflow-hidden justify-evenly gap-2 p-1'>
                                <h2 className='text-xl w-full overflow-hidden line-clamp-1 pl-1 '>{blog.title}</h2>
                                <p className='text-sm w-full  overflow-hidden line-clamp-4 opacity-60 pl-1'>{blog.content}</p>
                            </div>
                            <div className='text-white flex w-full items-center flex-row h-12 overflow-hidden justify-evenly gap-2 p-1'>
                                <button onClick={(e)=>{
                                    e.preventDefault();

                                    blog?.id && handleDelete(blog.id, blog.image);
                                }}
                                className=' w-2/5 bg-red-bg1 flex items-center justify-center 
                                rounded-md hover:scale-95 hover:opacity-70 transition-all ease-in duration-300 delay-150'>
                                    Delete
                                </button>
                                <button className=' w-2/5 flex items-center justify-center bg-pink-gb2
                                    rounded-md hover:text-white hover:scale-95 hover:opacity-70 transition-all ease-in duration-300 delay-150'>
                                    Modify
                                </button>
                            </div>
                        </Link>
                    ))
                 }
            </div> 
        }
    </main>
  )
}

export default MyBlogList