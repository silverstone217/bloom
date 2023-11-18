import BigScreenHeader from '@/components/header/BigScreenHeader';
import SmallScreenHeader from '@/components/header/SmallScreenHeader';
import { getServerSession } from 'next-auth';
import React from 'react';
import ArticleMain from '@/components/main/ArticleMain';
import PopularSectionBlog from '@/components/main/PopularSectionBlog';
import { BlogsType } from '@/types/BlogType';
import LatestSectionBlog from '@/components/main/LatestSectionBlog';
import { authOptions } from '@/lib/auth';


const getBlog:()=>Promise<{error: boolean, message? : string, data: BlogsType[]}> = async() =>{
  const URL = process.env.URL_PATH!
  try {
      const res = await fetch(`${URL}/api/blog/get`);

      if(res.ok){
        return res.json();
      }
      return [];

  } catch (error) {
      const err = error as Error
      console.log(err.message)
  }
}

const page = async () => {
  const data = await getServerSession(authOptions);
  const blogs = await getBlog();


  return (
    <main className="flex h-screen flex-col items-center w-screen justify-start p-0 relative overflow-x-hidden">
       <div className=" w-full h-screen  overflow-x-hidden overflow-y-auto " >
          <BigScreenHeader/>
          <SmallScreenHeader/>
          <ArticleMain/>
          <PopularSectionBlog blogs={blogs.data} />
          <LatestSectionBlog blogs={blogs.data} />
       </div>
    </main>
  )
}

export default page