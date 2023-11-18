import BigScreenHeader from '@/components/header/BigScreenHeader'
import SmallScreenHeader from '@/components/header/SmallScreenHeader'
import BlogMain from '@/components/main/BlogMain'
import { prisma } from '@/lib/prisma'
import { BlogType, BlogsType } from '@/types/BlogType'
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
    <main className="flex h-screen flex-col items-center w-screen justify-start p-0 relative overflow-x-hidden font-serif tracking-wider">
         <div className=" w-full h-screen  overflow-x-hidden overflow-y-auto sm:mt-14 md:mt-14 " >
            <BigScreenHeader/>
            <SmallScreenHeader/>
            <BlogMain blogs={blogs}/>
        </div>
    </main>
  )
}

export default page