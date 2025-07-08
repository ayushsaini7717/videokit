"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number,loading: boolean) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileref=useRef<HTMLInputElement | null>(null);

  

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/image-kit");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.authenticationParameters.signature,
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        onProgress: (event) => {
          if(event.lengthComputable && onProgress){
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent),true);
          }
        },
        
      });
      const filePath = res.filePath;

      const thumbnailUrl = `${process.env.NEXT_PUBLIC_URL_ENDPOINT}${filePath}/ik-thumbnail.jpg`;

      
      onSuccess({...res,thumbnailUrl})
      fileref.current!.value="";
      
    } catch (error) {
        console.error("Upload failed", error)
    } finally {
        onProgress?.(Math.round(100), false);
        setUploading(false)
    }
  };

  return (
    <>
      {/* <input
        type="file"
        ref={fileref}
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      /> */}
      <label htmlFor="fileInput" className="block w-full">
        <div
          className="flex flex-col border-2 border-dotted border-gray-500 justify-center items-center p-6 rounded-md hover:bg-gray-50 transition cursor-pointer w-full text-center"
        >
          <div className="font-semibold text-sm sm:text-base">Click to select video file</div>
          <div className="text-xs sm:text-sm text-gray-500">or drag and drop your video here</div>
        </div>

        <input
          id="fileInput"
          type="file"
          ref={fileref}
          accept={fileType === "video" ? "video/*" : "image/*"}
          className="hidden"
          onChange={handleFileChange}
        />

        <p className="text-xs text-gray-400 mt-1">Max size: 100MB</p>
      </label>

    </>
  );
};

export default FileUpload;