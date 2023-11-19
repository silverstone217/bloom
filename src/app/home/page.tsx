import BigScreenHeader from '@/components/header/BigScreenHeader';
import SmallScreenHeader from '@/components/header/SmallScreenHeader';
import { getServerSession } from 'next-auth';
import React from 'react';
import ArticleMain from '@/components/main/ArticleMain';
import PopularSectionBlog from '@/components/main/PopularSectionBlog';
import { BlogsType } from '@/types/BlogType';
import LatestSectionBlog from '@/components/main/LatestSectionBlog';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';


const getBlog = async() =>{
  const blogs = await prisma.blog.findMany({
      include : {
          _count : true,
          stats : true,
          comments : true
      }
  });

  return blogs as unknown as BlogsType[];
}

const page = async () => {
  const data = await getServerSession(authOptions);
  const blogs = await getBlog();


  return (
    <main className="flex flex-col items-center w-screen justify-start p-0 overflow-hidden">
       <div className=" w-full h-screen relative  overflow-x-hidden overflow-y-auto p-0 " >
          <BigScreenHeader/>
          <SmallScreenHeader/>
          <ArticleMain/>
          <PopularSectionBlog blogs={blogs} />
          <LatestSectionBlog blogs={blogs} />
       </div>
    </main>
  )
}

export default page