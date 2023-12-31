"use server"

import { prisma } from "@/lib/prisma"
import { Session } from "next-auth"

export const sendComment = async (id:string, session: Session | null, text:string) =>{

    try {
        if(!session?.user.id) return;

         const sendCom = await prisma.comment.create({
            data : {
                text : text,
                userId : session.user.id,
                blogId : id,
                image : session.user.image!,
                name : session.user.name!
            }
         });

        console.log(" Comment sent")

    } catch (error) {
        const err = error as Error;
        console.log(err.message);
    }

}