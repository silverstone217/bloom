import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import  GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const Google_Client_Id = process.env.GOOGLE_CLIENT_ID!
const Google_Client_Secret = process.env.GOOGLE_CLIENT_SECRET!


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt"
    },
    providers: [
        GoogleProvider({
          clientId: Google_Client_Id,
          clientSecret: Google_Client_Secret,
        })
      ],
      secret: process.env.SECRET_KEY,
      debug: process.env.NODE_ENV !== "production",

      callbacks : {
        async jwt({ token, user, }) {
          if(user){
            return {
              ...token, id: user.id
            }
          }
          return token
        },
  
        async session({ session, user, token }) {
          return{
            ...session,
            user : {
              ...session.user,
              id : token.id
            } 
          }
        },
        
      }

} 