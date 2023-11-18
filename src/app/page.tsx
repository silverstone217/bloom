import Image from 'next/image';
import logo from '../../public/images/cherry-blossom.svg';
import SectionHome from '@/components/SectionHome';
import Login from '@/components/Login';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';


export default async function Home() {

  const data = await getServerSession(authOptions);

  // console.log(data?.user, "Welcome");

  if(data?.user){
    redirect('/home');
  }
  
  

  return (
    <main className="flex h-screen flex-row items-center w-screen justify-start p-0 relative ">

      <section className='relative md:w-full sm:w-full flex flex-col h-full w-1/3 bg-black-rgb sm:p-0 p-4  items-center 
        justify-start transition-all duration-300 ease-in delay-200'>
        <div className='flex flex-row sm:w-full h-16 bg-transparent items-center justify-start gap-2 p-2 group sm:self-center
         self-start hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br from-pink-gb1 via-pink-gb2 to-pink-gb3
         transition-all duration-300 ease-in delay-200'>
          
          <div className='w-10 h-auto'>
            <Image src={logo} alt='cherry blossom' className='w-full h-full object-cover group-hover:animate-spin'/>
          </div>
          <h2 className='text-xl font-semibold tracking-widest font-serif'>BLOOM</h2>
        </div>

        <h1 className='text-4xl mt-24 sm:w-5/6 w-3/4 h-16 tracking-wider'>Welcome back</h1>

        <Login/>

        <p className='w-3/4 sm:w-5/6 h-16 mt-16 opacity-60 tracking-wider'>Access to your account, and see multiple posts avaiable.</p>
        
        <div className='tracking-wider  absolute bottom-3 md:bottom-1/4 sm:bottom-1/4 opacity-50 text-sm flex flex-row gap-1 items-center justify-center'>
          <span>Read our terms, conditions and policies</span>
          <button className=' text-pink-gb3'>here.</button>
        </div>
      </section>

      <SectionHome/>
    </main>
  )
}


