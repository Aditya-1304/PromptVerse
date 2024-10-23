import { sign } from "crypto";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers : [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID || "",
      clientSecret:process.env.GOOGLE_CLIENT_ID || "",
    })
  ],
  callbacks : {
    async session({ session }) {
      return session;
    },
    async signIn({profile}) {
      // Implement your sign-in logic here
      try {

      }catch (e){
        
      }
      return true; // or return a string
    }
  }
  
})

export {handler as GET,handler as POST}