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
    <div className="rounded">
         <div>
             <video ref={videoRef} src={`${videoUrl}`} height={400} width={400} controls loop muted playsInline onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}></video>
            
            

        </div>
        <div className="bg-white flex flex-col gap-1 w-[400px] pb-4 pl-2 pt-1">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-gray-500 text-sm">{desc}</div>
        </div>

    </div>
        {/* <video controls height={400} width={400} src={"https://ik.imagekit.io/tsy0ynecp/file_example_MP4_1280_10MG_-ZhN8yNmH.mp4"}></video> */}
    </>
}

export default Videocard;