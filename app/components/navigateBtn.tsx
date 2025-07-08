"use client";

import { useRouter } from "next/navigation";

type schema={
    path: string,
    text: string,
    bgcolor: string
}
const NavigateBtn=({path,text,bgcolor}:schema)=>{
    const router=useRouter();
    return <>
        <button onClick={()=>{
            router.push(path);
        }} className={`py-2 px-6 bg-${bgcolor} ${bgcolor==="black" ? "text-white" : "text-black"} font-medium cursor-pointer rounded  ${bgcolor === "black" ? "hover:bg-black/90" : "hover:bg-white/90"} transition duration-100 ease-linear text-sm`}>{text}</button>
    </>
}

export default NavigateBtn;