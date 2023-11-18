import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request, res: Response){

    try {

        const session = await getServerSession(authOptions);

        // console.log("session", session?.user.id);

        if(!session?.user.id) {
            
            return NextResponse.json({error : true, message : "Not allowed"}, {status : 403});
        }

        const userExists = await prisma.user.findUnique({
            where :{id : session.user.id}
        })

        if(!userExists) {
            return NextResponse.json({error : true, message : "Not authorized"}, {status : 401});
        }

        const blogs = await prisma.blog.findMany({
            
            where : {userId : userExists.id},

            include :{
                stats : true,
            }
        });

        if(!blogs)
        {
            return NextResponse.json({error : false, message: "No blog found", data : blogs}, {status: 200})
        }
        return NextResponse.json({error : false, message: "Blogs found", data : blogs }, {status: 200})
    } 
    catch (error) 
    {
        return NextResponse.json({error : false, message: "No blog found"}, {status: 500})
    }

}