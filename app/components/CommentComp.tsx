"use client";
import React, { useState } from 'react'

interface CommentScheme{
    userName: string,
    mediaId: string
}

const CommentComp = ({userName,mediaId}: CommentScheme) => {
  const [text,SetText]=useState("");
  const [loading,setLoading]=useState(false);
  
  const handler=async ()=>{
    setLoading(true);
    await fetch("/api/auth/commentAdd",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName,
            mediaId,
            text
        })
    })
    SetText("");
    setLoading(false);
  }
  return (
    <div className='flex gap-2'>
        <textarea className='border border-gray-300 rounded px-2 w-[30vw]'  value={text} placeholder='Add a comment' onChange={(e)=>SetText(e.target.value)}></textarea>
        <button className='bg-black rounded text-white text-sm px-4 cursor-pointer hover:bg-black/80' onClick={handler}>{loading ? <svg
        className="animate-spin h-8 w-8 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        ></circle>
        <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
    </svg>: "Post"}</button>
    </div>
  )
}

export default CommentComp