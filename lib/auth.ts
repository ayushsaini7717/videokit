import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            if(!credentials?.email || !credentials?.password){
                throw new Error("email and password are required!");
            }

            try{
                await connectToDatabase();
                const user=await User.findOne({email: credentials.email});

                if(!user){
                    throw new Error("User not exists!");
                }

                const isValid=await bcrypt.compare(credentials.password,user.password);
                if(!isValid){
                    throw new Error("Incorrect password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email
                }
            }catch(err){
                throw new Error("Something went wrong! "+err);
            }
        }
      })
  ],callbacks: {
    async jwt({token,user}:any){
      if(user){
        token.id=user.id
      }
      return token;
    },
    async session({session,user,token}:any){
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    }
  }
}

export default NextAuth(authOptions)