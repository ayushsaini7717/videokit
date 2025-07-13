"use client";
import React, { useEffect, useState } from 'react';

interface viewmorescheme{
    description: string
}

const Viewmore = ({description}: viewmorescheme) => {
  const [viewmore,SetViewmore]=useState(true);
  const [lessContent,SetLessContent]=useState("");

  useEffect(()=>{
    const length=description.length;
    let lastIndex=length/2;
    const content=description.slice(0,lastIndex);
    SetLessContent(content);

    return ()=>{
        console.log("Effect cleanup");
    }
  },[description])

  return (
    <div className='max-w-[60vw]'>{viewmore ? lessContent: description} <button className='text-blue-500 cursor-pointer' onClick={()=>{
      SetViewmore(!viewmore);
    }}>{viewmore? "View more...": "View less..."}</button></div>
  )
}

export default Viewmore;