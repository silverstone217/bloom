import AddForm from '@/components/form/AddForm'
import BigScreenHeader from '@/components/header/BigScreenHeader'
import SmallScreenHeader from '@/components/header/SmallScreenHeader'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'


const page = async () => {
 
  const data = await getServerSession(authOptions);

  if(!data?.user){
    redirect('/');
  }
  
  return (
    <main className="flex  flex-col items-center w-screen justify-start p-0  tracking-wider"> 
        <div className=" w-full h-screen  overflow-x-hidden overflow-y-auto relative ">
            <BigScreenHeader/>
            <SmallScreenHeader/>
            <h1 className='w-full text-3xl h-16 flex items-center justify-center sm:mt-14 md:mt-14 text-center'>Create your own View</h1>
            <AddForm/>
        </div>
    </main>
  )
}

export default page