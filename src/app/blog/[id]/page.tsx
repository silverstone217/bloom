import { countViews } from '@/app/ssr/blogcount';
import BigScreenHeader from '@/components/header/BigScreenHeader';
import SmallScreenHeader from '@/components/header/SmallScreenHeader';
import CommentaireSection from '@/components/main/CommentaireSection';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BlogsType } from '@/types/BlogType';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import React from 'react';


// const URL = process.env.URL_PATH!
// const getBlog:()=>Promise<{error: boolean, message? : string, data: BlogsType[]}> = async() =>{
    
//     try {
//         const res = await fetch(`${URL}/api/blog/get`, {cache : "no-store"});
  
//         if(res.ok){
//           // console.log(res, "OK!");
//           return res.json();
//         }
//         return [];
  
//     } catch (error) {
//         const err = error as Error
//         console.log(err.message)
//     }
//   }

  const getBlog = async(id:string) =>{
    const blogs = await prisma.blog.findUnique({
        where : {
            id : id
        },
        include : {
            _count : true,
            stats : true,
            comments : true,
            user : true
        }
    });
  
    return blogs as unknown as BlogsType;
  }

const page = async ({params}: {params : {id : string}}) => {

    const session = await getServerSession(authOptions);
    const getMyOneBlog = await getBlog(params.id);
    const data = getMyOneBlog;
    const views = data?._count?.stats ?? 0
    const getTime= data && new Date(data.createdAt);
    setTimeout(async() =>{
        await countViews(params.id, session);
    }, 5000);

    

  return (
<main className="flex h-screen flex-col items-center w-screen justify-start p-0 overflow-hidden font-serif tracking-wider">
    
    <div className='flex items-center w-screen justify-center p-0 relative overflow-x-hidden flex-row flex-wrap gap-8 overflow-y-auto'>

        <BigScreenHeader/>
        <SmallScreenHeader/>

        <div className='flex flex-col w-2/5 sm:w-full md:w-full items-center p-2 justify-start gap-4 mt-16'>
            { typeof data?.image === "string" &&  <Image src={data.image} alt="" width={400} height={200} 
                className='w-full h-64 object-cover'/>}
            <div className='flex flex-row flex-wrap w-full items-center justify-start p-1 gap-1'>
                <div className='w-full h-10 flex flex-row items-center justify-start'>
                    <span className='opacity-75'>Author: </span>
                    <span className='font-bold p-2'>{data?.author}</span>
                </div>
                <div className='w-full h-10  flex flex-row items-center justify-start'> 
                    <span className='opacity-75' >views: </span> 
                    <span className='font-bold p-2' >{views}</span>
                </div>
                <p className='flex flex-row flex-wrap w-full items-center justify-start p-1'>{getTime?.toDateString()}</p>
            </div>
        </div>

        <div className='sm:w-full md:w-full w-1/2 flex flex-col items-center justify-start p-2 gap-8 text-white'>
            <h1 className='text-2xl font-extrabold w-full flex items-center 
                justify-start p-1'>{data?.title}</h1>
            <p className='text-xl opacity-95 w-full flex items-center 
                justify-start p-1'>{data?.content}</p>
        </div>

        <CommentaireSection blog={data}/>

    </div>
    
</main>
  )
}

export default page