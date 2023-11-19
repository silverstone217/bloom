"use client"
import { sendComment } from '@/app/ssr/sendComments'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react';

interface Props {
    id:string, 
    session: Session | null, 
}

const CommentForm :FC<Props> = ({id, session}) => {
    
    const [comm, setComm] = useState("");
    const router = useRouter();

  return (
        <form className='w-3/4  flex items-center justify-center p-2 flex-wrap gap-4'>
            <textarea value={comm} onChange={(event) => setComm(event.target.value)}
                placeholder='comment something...' 
                className='border border-white outline-none bg-transparent sm:w-full md:w-full w-3/4 h-14 p-2 flex-shrink-0 rounded-md'/>
            <button onClick={(e)=>{
                e.preventDefault();
                    if(comm.replace(/\s/g, '') !== "" ){
                         sendComment(id, session, comm);
                         setComm("");
                         router.refresh();
                    }          
                }}
                className='w-24 h-10 p-2 flex items-center justify-center border rounded-md 
                hover:shadow-3xl duration-300 delay-150 transition-all ease-in hover:border-x-pink-gb1 hover:border-y-pink-gb3'>
                Submit
            </button>
    </form>
  )
}

export default CommentForm