import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){

    try {
        const body = await req.json();

        const { blogId, userId, author } = body;
        const count = 1;

       

        return NextResponse.json({error : false, message: "Blog deleted successfuly"}, {status: 200});
        
    } catch (error) {
        return NextResponse.json({error : false, message: "Internal Error"}, {status: 500})
    }

}
