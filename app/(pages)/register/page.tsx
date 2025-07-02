"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register=()=>{
    const [email,SetEmail]=useState("");
    const [password,SetPassword]=useState("");
    const [confirmpassword,SetConfirmpassword]=useState("");
    const router=useRouter();

    const handler=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!password || !confirmpassword){
            return;
        }
        if(password !== confirmpassword){
            alert("password not matched!");
            return;
        }
        try{
            const res=await fetch("/api/auth/register",{
                method: "POST",
                body: JSON.stringify({
                    email,password,confirmpassword
                })
            })
            if(!res.ok){
                throw new Error("Failed to register user.");
            }

        }catch(err){
            console.log(err);
            throw new Error("something went wrong!");
        }
    }
    return <div>
        <div className="flex flex-col justify-center items-center h-[100vh]">
            <form className="flex flex-col" onSubmit={handler}>
                <label>Email</label>
                <input onChange={(e)=>SetEmail(e.target.value)} type="email" placeholder="Enter your email" required></input>
                <label>Password</label>
                <input onChange={(e)=>SetPassword(e.target.value)} type="password" placeholder="Enter your password" required/>
                <label>Confirm Password</label>
                <input onChange={(e)=>SetConfirmpassword(e.target.value)} type="password" placeholder="re-enter your password" required></input>
                <button type="submit">Register</button>
            </form>
            <div>already have an account? <span className="text-blue-500" onClick={()=>router.push('/login')}>Login</span></div>
        </div>
    </div>
}

export default Register;