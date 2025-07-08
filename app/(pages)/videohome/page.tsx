"use client";
import Videocard from "@/app/components/videocard";
import { useEffect, useState } from "react";

interface videoSchema{
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    transformation: {
        height: number;
        width: number
    }
}

const VideoRender=()=>{
    const [videos,Setvideos]=useState<videoSchema[]>([]);

    useEffect(()=>{
        const fetcher=async ()=>{
            const res=await fetch("/api/auth/videos");
            const data=await res.json();

            Setvideos(data);
        }
        fetcher();
    },[])
    return  <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 py-6">
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl sm:text-4xl mb-2">Latest Videos</h1>
      <p className="text-gray-600 text-sm sm:text-base mb-6">
        Discover amazing content from our community
      </p>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((item, i) => (
          <div key={i} className="w-full">
            <Videocard
              title={item.title}
              desc={item.description}
              videoUrl={item.videoUrl}
              thumbnailUrl={item.thumbnailUrl}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  
}

export default VideoRender;