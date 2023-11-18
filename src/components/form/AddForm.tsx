"use client";
import React, { useEffect, useState } from 'react';
import { SubmitHandler} from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { v4} from "uuid"
import { BlogType } from '@/types/BlogType';
import { useSession } from 'next-auth/react';
import Loading from '../Loading';
import { genreList } from '@/data';
import { errorNotif, succesNotif, warningNotif } from '@/lib/notifToast';


const genres = genreList.sort((a, b) =>{
    if(a.title > b.title) return 1;
    if(a.title < b.title) return -1;
    return 0;
})


const AddForm = () => {

    const {data: session } = useSession()

    const [image, setImage] = useState<File | null > (null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [genre, setGenre] = useState<string>(genres[0].value);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addNewBlog = async() => {
        if(!image) return;
        setIsLoading(true);
        const idImg = v4()
        try {
            const imgRef = ref(storage,   `files/${idImg}`)
           await uploadBytes(imgRef, image).then(async (snapchot)=>{
            await getDownloadURL(snapchot.ref).then(async (url) =>{
                console.log("Downloaded " + url);
                const data = {
                    title: title,
                    content: content,
                    image : url,
                    genre : genre,
                }
                await getAddBlog(data)
            })
           })
        } catch (error) {
            const err = error as Error
            if(err.message) console.error(err.message)
        }
    };

    const getAddBlog: SubmitHandler<BlogType> = async (data)=>{

        if(!session?.user) return;

        const response = await fetch('/api/blog/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title : data.title,
              content : data.content,
              userId : session.user.id,
              author : session.user.name,
              image : data.image,
              genre : data.genre
            }),
          });
    
          if(response.ok){
            succesNotif("Successfully added!")
          }
          else{
            errorNotif("Failed to add the blog!")
          }

          setTitle("");
          setContent("");
          setImage(null);
          setGenre(genres[0].value);
          setTimeout(()=>setIsLoading(false), 4000);
    }
    
  return (
   !isLoading ? <form className='w-full sm:h-full md:h-full bg-gradient-to-r from-black-rgb via-black-rgb2  to-black-rgba3 tracking-wider text-xl flex flex-col items-center sm:justify-start md:justify-start justify-center gap-4 pb-1'>
        <div className='sm:w-full md:w-full w-3/5 md:h-1/5 sm:h-1/6 h-44 flex flex-row items-center  justify-start gap-5 pt-1'>
            {
                image === null
                ?
                    <div className='sm:px-2 w-full h-full flex flex-col items-center justify-center gap-2'>
                        <label htmlFor="image">Select an Image</label>
                        <input type='file' accept='image/*' id='image' required onChange={(e) =>{
                            if(!e.target.files) return
                            setImage(e.target.files?.[0])
                        }}
                            className='sm:w-full block  text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4 file:rounded-md
                            file:border-0 file:text-sm file:font-semibold
                            file:bg-pink-50 file:text-pink-700
                            hover:file:bg-pink-100'
                        />
                    </div>
                :
                <picture className='w-full h-full flex flex-row items-center justify-start sm:justify-center sm:gap-3 gap-12 overflow-hidden'>
                    <img src={URL.createObjectURL(image)} alt={image.name} className='w-2/5 sm:w-3/5 md:w-1/2 h-full object-cover' />
                    <button onClick={()=>setImage(null)} className='bg-red-bg1 w-1/4 sm:h-16 sm:w-1/3 h-14 rounded-md hover:bg-transparent 
                        hover:border hover:border-red-bg1 hover:opacity-75 transition-all duration-300 ease-in delay-150' >Choose another</button>
                </picture>
            }
        </div>

        <div className='sm:w-full md:w-full w-3/5 sm:px-2 md:h-1/6 sm:h-1/6 h-32 flex flex-col gap-1 items-start justify-start bg-transparent'>
            <label htmlFor='title'>Title</label>
            <input type='text' placeholder='ex:Travel under sea.'
                className='w-full h-3/5 outline-none pl-2 rounded-md bg-black border border-black'
                id='title' required
                value={title} onChange={(e)=>setTitle(e.target.value)}
            />
        </div>
        <div className='sm:w-full md:w-full w-3/5 sm:px-2  flex flex-col gap-1 
            items-start justify-start bg-transparent'>
            <label htmlFor='content'>Content</label>
            <textarea placeholder='ex: An amazing view, a beautiful sky...'
                className='w-full rounded-md h-64  outline-none p-2 bg-black border border-black'
                id='content' required
                value={content} onChange={(e)=>setContent(e.target.value)}
                />
        </div>
        <div className='sm:w-full md:w-full w-3/5 sm:px-2  flex flex-col gap-1 
            items-start justify-start bg-transparent h-20'>
            <label htmlFor='genre'>Select genre</label>
            <select name="genre" id="genre"  value={genre} onChange={(e)=>setGenre(e.target.value)}
            className='w-full h-5/6 bg-black sm:px-0 px-2 outline-none 
                border-none rounded-md' >
                {
                    genres.map((genre)=>(
                        <option key={genre.id} value={genre.value}>{genre.title}</option>
                    ))
                }
            </select>
        </div>
        <div className='sm:w-full bg-transparent md:w-full w-3/5 h-fit flex flex-row gap-1 items-start justify-evenly'>
            <button type='reset' onClick={(e)=>{
                e.preventDefault();
                setImage(null);
                setContent("");
                setTitle("");
            }}
                className='w-1/5  sm:w-1/3 hover:shadow-4xl bg-transparent border border-red-bg3 h-12 rounded-md 
                transition-all duration-300 ease-in delay-150'>
                Reset
            </button>
            <button  onClick={(e)=>{
                e.preventDefault();
                if(!image || content.replace(/\s/g, '') === "" || title.replace(/\s/g, '') === ""){
                    warningNotif("cannot be empty"); 
                    return;
                }
                addNewBlog()
            }}
                className=' w-1/5 h-12 sm:w-1/3 from-pink-gb1 via-pink-gb2 to-pink-gb3 items-center 
                justify-center gap-3 rounded-md bg-gradient-to-r hover:bg-none hover:border hover:border-pink-gb1
                transition duration-300 ease-in delay-150 hover:shadow-3xl '>Save</button>
        </div>
    </form>
    :
    <Loading/>
  )
}

export default AddForm