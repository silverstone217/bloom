import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const { title, content, author, userId, image, genre } = body;

        console.log("body", body);

        const isUserExist = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })

        if(!isUserExist) return NextResponse.json({ error : false, message : "Not allowed"}, {status: 401})

        if(!title  || !content  || !image || !genre ) return NextResponse.json({ error : false, message : "Cannot be empty"}, {status: 400})

        const addNewBlog = await prisma.blog.create({
            data: {
                title: title,
                content: content,
                author: author,
                userId: userId,
                image: image,
                genre : genre,
            }
        });
        return NextResponse.json({ success: true, error : false, data:addNewBlog }, {status: 201})
        
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error : false, message : err.message}, {status: 500})
    }
}