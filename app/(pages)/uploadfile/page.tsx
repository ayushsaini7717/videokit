"use client"
import { useEffect, useState } from "react";
import FileUpload from "../../components/fileupload";
import { useSession } from "next-auth/react"


export default function UploadFile() {
  const [title,SetTitle]=useState("");
  const [desc,Setdesc]=useState("");
  const [uploadPercent,SetUploadPercent]=useState(0);
  const [loading,setloading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [uploadedData,setUploadedData]=useState<any | null>(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const { data: session, status } = useSession()


  const handleSuccess = async (response: any) => {
      setSuccess(true);
      setUploadedData(response);
  };

  const handleSubmit=async ()=>{
    if (!isUploadComplete || !uploadedData) {
      alert("Please wait until the video is fully uploaded.");
      return;
    }
  
    try {
      await fetch("/api/auth/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description: desc,
          thumbnailUrl: uploadedData.thumbnailUrl,
          videoUrl: uploadedData.url,
          authorEmail: session?.user.email
        })
      });
  
      SetTitle("");
      Setdesc("");
      setUploadedData(null);
      setSuccess(false);
      SetUploadPercent(0);
      setIsUploadComplete(false);
      alert("Successfully uploaded!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }


  const handleProgress = (percent: number,uploading: boolean) => {
    setloading(uploading);
    SetUploadPercent(percent);

    if (percent === 100 && !uploading) {
      setIsUploadComplete(true);
    }
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4 sm:px-6 lg:px-8 py-6">
  <div className="w-full max-w-2xl">
    <h1 className="font-bold text-4xl sm:text-3xl text-center mb-2">Upload Your Video</h1>
    <p className="text-gray-600 text-sm sm:text-md text-center mb-6">
      Share your content with the VideoKit community
    </p>

    <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-upload h-6 w-6 text-purple-500"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" x2="12" y1="3" y2="15"></line>
        </svg>
        <h3 className="font-bold text-xl">Video Details</h3>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        Fill in the details below to upload your video. Make sure your content follows our community guidelines.
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="font-bold text-sm block mb-1">Video Title *</label>
          <input
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
            value={title}
            placeholder="Enter an engaging title for your video"
            onChange={(e) => SetTitle(e.target.value)}
          />
          <p className="text-gray-500 text-xs mt-1">
            Choose a clear, descriptive title that represents your content
          </p>
        </div>

        <div>
          <label className="font-bold text-sm block mb-1">Description *</label>
          <textarea
            value={desc}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            rows={4}
            placeholder="Tell viewers what your video is about"
            onChange={(e)=>Setdesc(e.target.value)}
          />
          <p className="text-gray-500 text-xs mt-1">
            Add a detailed description to help viewers understand your content
          </p>
        </div>

        <FileUpload
          onSuccess={handleSuccess}
          onProgress={handleProgress}
          fileType="video"
        />
        {loading && (
        <div className="mt-2 text-sm text-blue-600 font-medium animate-pulse">
            Uploading {uploadPercent} %
        </div>
      )}
        <button
          onClick={handleSubmit}
          disabled={!isUploadComplete || !success || loading || title.length === 0 || desc.length === 0}
          className="py-2 px-4 bg-black text-white font-medium rounded hover:bg-black/90 text-sm text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</div>

    // <div>
    //   <h1>Upload a File</h1>
    //   <input value={title} placeholder="Enter title" onChange={(e)=>SetTitle(e.target.value)}></input>
    //   <input value={desc} placeholder="Enter description" onChange={(e)=>Setdesc(e.target.value)}></input>
    //   <FileUpload
    //     onSuccess={handleSuccess}
    //     onProgress={handleProgress}
    //     fileType="video" // or "video"
    //   />
      
    //   {loading? <div>uploading {uploadPercent}%</div> : null}
    // </div>
    
  );
}
