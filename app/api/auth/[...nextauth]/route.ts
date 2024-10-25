import NextAuth, { DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { Profile } from "next-auth";

// Extend the built-in session type

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // Request additional scopes to get the user's profile picture
      authorization: {
        params: {
          scope: "profile email", // Ensure 'profile' is included
        },
      },
    })
  ],
  callbacks: {
    async session({ session }): Promise<Session> {
      if (session.user?.email) {
        const sessionUser = await User.findOne({
          email: session.user.email
        });
        
        if (sessionUser) {
          return {
            ...session,
            user: {
              ...session.user,
              id: sessionUser._id.toString()
            }
          };
        }
      }
      return session as Session;
    },
    async signIn({ profile }: { profile?: Profile }) {
      try {
        // Log the entire profile object
    
        if (!profile?.email) {
          return false;
        }
    
        await connectToDB();
    
        // Check if user already exists
        const userExists = await User.findOne({
          email: profile.email
        });
    
        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(/\s+/g, "").toLowerCase() || "",
            image: (profile as any).picture || "" // Use type assertion to access profile.picture
          });
        }
    
        return true;
      } catch (error) {
        console.log("Error during sign in: ", error);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };