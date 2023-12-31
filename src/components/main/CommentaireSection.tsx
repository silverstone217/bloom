"use server"
import { prisma } from '@/lib/prisma';
import { BlogsType } from '@/types/BlogType';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import CommentForm from '../form/CommentForm';
import { authOptions } from '@/lib/auth';

interface Props {
    blog :  BlogsType | undefined;
};


const CommentaireSection: FC<Props> = async({blog}) => {

    const session = await getServerSession(authOptions);


  return (
    <main className='w-full mt-3 bg-black-rgb1 justify-center items-center tracking-wider font-serif flex flex-col gap-2'>
        
        <h2 className='flex items-center justify-center flex-row gap-2 p-2 w-max  h-10 text-xl'>Comments <span className='font-bold'>({blog?._count.comments})</span></h2>

        <div className='relative w-full flex items-center justify-center gap-8 flex-wrap flex-col'>
                {
                    session?.user.id && blog?.id ?  <CommentForm session={session} id={blog?.id}/>
                    : <Link href="/" className='h-14 w-3/5 flex items-center justify-center p-2 text-xl 
                        border border-black-rgb
                        hover:shadow-3xl transition-all duration-300 delay-150 ease-in rounded-md'>
                        Login to comment
                    </Link>
                }
                <ul className='relative w-4/5 sm:w-full flex items-center justify-center gap-8 flex-wrap flex-col pb-2'>
                    {
                        blog?.comments.map((comment, id) =>{
                            return(
                                <li key={id} className={`w-11/12 flex flex-row items-center gap-4 justify-center`}>
                                  { comment?.image && <Image src={comment?.image} alt='' width={200} height={200}
                                        className='w-20 h-20 rounded-full object-cover'
                                    />}
                                    <div className={`w-full flex flex-col items-center justify-start p-2 overflow-x-hidden rounded-md ${id % 2 !== 0 ? "bg-gray-700" : "bg-slate-800"}`}>
                                        <h3 className='flex w-full overflow-hidden items-center p-1'>{comment.name}</h3>
                                        <p className='w-full opacity-90 flex items-center p-1'>{comment.text}</p>
                                    </div>
                                </li>
                            )})
                    }
                </ul>
        </div>
        
    </main>
  )
}

export default CommentaireSection