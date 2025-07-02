"use client"

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
    return <div>
        <div className="flex flex-col h-[100vh] items-center justify-center">
            <form className="flex flex-col" onSubmit={handler}>
                <label>Email</label>
                <input onChange={(e)=>Setemail(e.target.value)} required type="email" placeholder="Enter your email"/>
                <label>Password</label>
                <input onChange={(e)=>SetPassword(e.target.value)} required type="password" placeholder="Enter your password"></input>
                <button type="submit">Login</button>
            </form>
            <div>Don't have an account? <span onClick={()=>router.push("/register")} className="text-blue-500">Register</span></div>
        </div>
    </div>
}

export default Login;