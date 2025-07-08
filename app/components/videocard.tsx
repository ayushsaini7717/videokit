type videoschema={
    title: string,
    desc: string,
    videoUrl: string,
    thumbnailUrl: string,
}
import { useRef } from "react";
const Videocard=({videoUrl,thumbnailUrl,title,desc} : videoschema)=>{
    const videoRef=useRef<HTMLVideoElement>(null);
    const handleMouseEnter = () => {
        videoRef.current?.play();
      };
    
      const handleMouseLeave = () => {
        videoRef.current?.pause();
        
      };
    return <>
    <div className="rounded flex flex-col h-full border border-gray-200 shadow bg-white">
        <div className="aspect-video w-full">
            <video
            ref={videoRef}
            src={`${videoUrl}`}
            className="w-full h-full object-cover"
            controls
            loop
            muted
            playsInline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            />
        </div>

        <div className="flex flex-col gap-1 px-4 py-3 flex-1">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-gray-500 text-sm">{desc}</div>
        </div>
    </div>

        {/* <video controls height={400} width={400} src={"https://ik.imagekit.io/tsy0ynecp/file_example_MP4_1280_10MG_-ZhN8yNmH.mp4"}></video> */}
    </>
}

export default Videocard;