import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response){
    
    try {
        const blogs = await prisma.blog.findMany({
            include :{
                stats : true,
                comments: true,
                _count : true,
            }
        });
        if(!blogs){
            return NextResponse.json({error : false, message: "No blog found", data : blogs}, {status: 200})
        }
        // console.log("wiews", blogs[0]._count)
        return NextResponse.json({error : false, message: "Blogs found", data : blogs }, {status: 200})
    } catch (error) {
        return NextResponse.json({error : false, message: "Internal Error"}, {status: 500})
    }

}
