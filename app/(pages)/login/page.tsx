"use client"

import TypingText from "@/app/components/animatedText";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login=()=>{
    const [email,Setemail]=useState("");
    const [password,SetPassword]=useState("");
    const router=useRouter();

    const handler=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const res=await signIn("credentials",{email,password,redirect: false});
        if(res?.error){
            throw new Error("Wrong email or password!");
        }else{
            router.push('/')
        }
    }
    return <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #f3f0ff, #ffffff)' }}>
    <div className="w-[90%] max-w-md sm:w-[80%] md:w-[60%] lg:w-[35vw] bg-white border border-gray-300 rounded p-6 flex flex-col items-center shadow-sm">
      
      <div className="mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-purple-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      </div>
        <div className="font-bold text-2xl text-center min-h-[32px] mb-1">
        <TypingText text={'Welcome Back'} />
      </div>
      <p className="text-gray-500 text-sm text-center mb-4">Sign in to your VideoKit account</p>
        <form className="w-full flex flex-col gap-2 mb-4" onSubmit={handler}>
        <label className="text-sm font-medium">Email</label>
        <input
          onChange={(e) => Setemail(e.target.value)}
          required
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        />
  
        <label className="text-sm font-medium">Password</label>
        <input
          onChange={(e) => SetPassword(e.target.value)}
          required
          type="password"
          placeholder="Enter your password"
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        />
  
        <button
          type="submit"
          className="mt-3 py-2 px-4 bg-black text-white font-medium rounded hover:bg-black/90 transition text-sm"
        >
          Login
        </button>
      </form>
  
      <div
        className="flex items-center gap-2 cursor-pointer mb-3 text-sm"
        onClick={() => signIn("github")}
      >
        <span>OR sign in with</span>
        <img src="/githubicon.jpg" alt="GitHub" className="w-6 h-6" />
      </div>
  
      <div className="text-sm">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-purple-500 cursor-pointer"
        >
          Register
        </span>
      </div>
    </div>
  </div>
  
}

export default Login;