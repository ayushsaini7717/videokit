"use client";
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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); 

    useEffect(()=>{
        const fetcher=async ()=>{
            const res=await fetch("/api/auth/videos");
            const data=await res.json();

            Setvideos(data);
        }
        fetcher();
    },[])
    return <div className="p-1">
        {videos.map((item,i)=>{
            return <div key={i} className="border cursor-pointer w-[500px] border-black p-4 rounded" onMouseEnter={()=>setHoveredIndex(i)} onMouseLeave={()=>setHoveredIndex(-1)}>
                <div>
                    {hoveredIndex === i? <video src={`${item.videoUrl}`} height={400} width={400} autoPlay muted playsInline></video>
                    :
                    <img src={`${item.thumbnailUrl}`} height={400} width={400}></img>
                    }

                </div>
                <h1>{item.title}</h1>
                <h5>{item.description}</h5>
            </div>
        })}
    </div>
}

export default VideoRender;