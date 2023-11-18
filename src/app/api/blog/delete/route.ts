import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){

    try {
        const body = await req.json();

        const { id, userId } = body;

        if(!id || !userId) return NextResponse.json({error : false, message: "No blog found"}, {status: 400});

        const userExists = await prisma.user.findMany({
            where : {id : userId}
        });

        if(!userExists) return NextResponse.json({error : false, message: "Not authirized"}, {status: 401});

        const isBlogExists = await prisma.blog.findMany({
            where: {id : id, userId: userId}
        });

        if(!isBlogExists) return NextResponse.json({error : false, message: "Not allowed"}, {status: 403});

        const blogs = await prisma.blog.delete({
            where: {id : id, userId: userId}
        })

        if(!blogs){
            return NextResponse.json({error : false, message: "No blog found"}, {status: 200})
        }

        return NextResponse.json({error : false, message: "Blog deleted successfuly"}, {status: 200});
        
    } catch (error) {
        return NextResponse.json({error : false, message: "Internal Error"}, {status: 500})
    }

}
