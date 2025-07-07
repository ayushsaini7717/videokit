"use client"
import { useState } from "react";
import FileUpload from "../components/fileupload";



export default function UploadFile() {
  const [title,SetTitle]=useState("");
  const [desc,Setdesc]=useState("");
  const [uploadPercent,SetUploadPercent]=useState(0);
  const [loading,setloading]=useState(false);

  const handleSuccess = async (response: any) => {
    try{
      await fetch("/api/auth/videos",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          description: desc,
          thumbnailUrl: response.thumbnailUrl,
          videoUrl: response.url
        })
      })
      SetTitle("");
      Setdesc("");
    }catch(err){
      throw new Error("Failed to video data into db!");
    }
  };

  const handleProgress = (percent: number,uploading: boolean) => {
    setloading(uploading);
    SetUploadPercent(percent);
  };
  return (
    <div>
      <h1>Upload a File</h1>
      <input value={title} placeholder="Enter title" onChange={(e)=>SetTitle(e.target.value)}></input>
      <input value={desc} placeholder="Enter description" onChange={(e)=>Setdesc(e.target.value)}></input>
      <FileUpload
        onSuccess={handleSuccess}
        onProgress={handleProgress}
        fileType="video" // or "video"
      />
      
      {loading? <div>uploading {uploadPercent}%</div> : null}
    </div>
    
  );
}
