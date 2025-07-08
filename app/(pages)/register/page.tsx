"use client";
import TypingText from "@/app/components/animatedText";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./register.module.css";

const Register=()=>{
    const [email,SetEmail]=useState("");
    const [password,SetPassword]=useState("");
    const [confirmpassword,SetConfirmpassword]=useState("");
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    const handler=async (e: React.FormEvent<HTMLFormElement>)=>{
        setLoading(true);
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
            setLoading(false);
            router.push("/login");

        }catch(err){
            console.log(err);
            throw new Error("something went wrong!");
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
            <TypingText text={'Create Account'} />
          </div>
          <p className="text-gray-500 text-sm text-center mb-4">Join VideoKit to start sharing your videos</p>
            <form className="w-full flex flex-col gap-2 mb-4" onSubmit={handler}>
            <label className="text-sm font-medium">Email</label>
            <input
              onChange={(e) => SetEmail(e.target.value)}
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


            <label className="text-sm font-medium">Confirm Password</label>
            <input
              onChange={(e) => SetConfirmpassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            />
      
            <button
              type="submit"
              className="mt-3 cursor-pointer py-2 px-4 bg-black text-white font-medium rounded hover:bg-black/90 transition text-sm"
            >
                {loading? <span className={styles.loader}></span>:<span>Create Account</span>}
            </button>
          </form>
      
          <div className="text-sm">
                Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-purple-500 cursor-pointer"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    // return <div>
    //     <div className="flex flex-col justify-center items-center h-[100vh]">
    //         <form className="flex flex-col" onSubmit={handler}>
    //             <label>Email</label>
    //             <input onChange={(e)=>SetEmail(e.target.value)} type="email" placeholder="Enter your email" required></input>
    //             <label>Password</label>
    //             <input onChange={(e)=>SetPassword(e.target.value)} type="password" placeholder="Enter your password" required/>
    //             <label>Confirm Password</label>
    //             <input onChange={(e)=>SetConfirmpassword(e.target.value)} type="password" placeholder="re-enter your password" required></input>
    //             <button type="submit">Register</button>
    //         </form>
    //         <div>already have an account? <span className="text-blue-500" onClick={()=>router.push('/login')}>Login</span></div>
    //     </div>
    // </div>
}

export default Register;