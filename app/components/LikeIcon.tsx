"use client";
import React, { useState } from 'react'

interface LikeScheme{
    count: number,
    userMail: string,
    mediaId: string,
    isLiked: Boolean
}

const LikeIcon = ({count,userMail,mediaId,isLiked}: LikeScheme) => {
  const [liked,setLiked]=useState(isLiked);
  const [likeCount, setLikeCount] = useState(count);
  
  const handler=async ()=>{
    await fetch("/api/auth/likequeue",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userMail,mediaId
        })
    })
  }
  return (
    <>
        {liked ? <div className='flex gap-2'>
            <svg className='cursor-pointer' onClick={()=>{
                setLiked(!liked);
                handler();
                setLikeCount(prev => prev + (liked ? -1 : 1));
            }
            } xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                    C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div>{likeCount}</div>
        </div> : <div className='flex gap-2'>
            <svg className='cursor-pointer' onClick={()=>{
                setLiked(!liked);
                handler();
                setLikeCount(prev => prev + (liked ? -1 : 1));
            }} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="red" strokeWidth="2"
            viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                    C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div>{likeCount}</div>
            </div>}
    </>
  )
}

export default LikeIcon