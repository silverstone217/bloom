import BigScreenHeader from '@/components/header/BigScreenHeader'
import SmallScreenHeader from '@/components/header/SmallScreenHeader'
import { getServerSession } from 'next-auth';
import React from 'react'
import { redirect } from 'next/navigation';
import { BlogsType } from '@/types/BlogType';
import MyBlogList from '@/components/main/MyBlogList';
import { authOptions } from '@/lib/auth';


const getBlog:()=>Promise<{error: boolean, message? : string, data: BlogsType[]}> = async() =>{
    const URL = process.env.URL_PATH!
    try {
        const res = await fetch(`${URL}/api/blog/get`, {cache: "no-store"});
  
        if(res.ok){
          // console.log(res, "OK!");
          return res.json();
        }
        return [];
  
    } catch (error) {
        const err = error as Error
        console.log(err.message)
    }
  }

const page = async() => {
    
    const data = await getServerSession(authOptions);
    const myBlog = await getBlog();

    if(!data?.user){
      redirect('/');
    }

    
  return (
    <main className="flex h-screen flex-col items-center w-screen justify-start p-0 relative overflow-x-hidden">
       <div className=" w-full h-screen  overflow-x-hidden overflow-y-auto " >
          <BigScreenHeader/>
          <SmallScreenHeader/>
          <MyBlogList blogs={myBlog.data}/>
       </div>
    </main>
  )
}

export default page