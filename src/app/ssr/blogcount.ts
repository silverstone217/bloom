"use server"

import { prisma } from "@/lib/prisma"
import { Session } from "next-auth"

export const countViews = async (id:string, session: Session | null) =>{

    try {
            if(!session?.user.id) return;

            const isAuthor = await prisma.blog.findUnique({
                where  : {
                    id : id,
                }
            });

            if(isAuthor?.userId === session.user.id) return;

            const isRead = await prisma.blogStats.findMany({
                where : {
                   blogId : id,
                   userId : session.user.id
                }
            });

            if(isRead[0]) return;

            const getViews = await prisma.blogStats.findMany({
                where : {
                    blogId : id,
                    userId : session.user.id
                }
            });
            let nbr = getViews[0]?.views ?? 0;

            const countBlog = await prisma.blogStats.create({
                data : {
                    blogId: id,
                    userId : session.user.id,
                    views : nbr  + 1
                }
            });

        
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
    }

}