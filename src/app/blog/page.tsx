import BigScreenHeader from '@/components/header/BigScreenHeader'
import SmallScreenHeader from '@/components/header/SmallScreenHeader'
import BlogMain from '@/components/main/BlogMain'
import { prisma } from '@/lib/prisma'
import { BlogsType } from '@/types/BlogType'
import React from 'react'

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

const page = async() => {

    const blogs = await getBlog() as BlogsType[]

  return (
    <main className="flex flex-col items-center w-screen justify-start p-0  overflow-x-hidden font-serif tracking-wider">
         <div className=" w-full h-screen relative overflow-x-hidden overflow-y-auto " >
            <BigScreenHeader/>
            <SmallScreenHeader/>
            <BlogMain blogs={blogs}/>
        </div>
    </main>
  )
}

export default page