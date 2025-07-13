import React from 'react'
import Viewmore from '@/app/components/Viewmore';

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id=(await params).id
  const res=await fetch(`${process.env.HOST}/api/auth/singlevideo?id=${id}`);
  const data=await res.json();

  return (<>
    <div className='h-[91vh] relative'>
      <div className='absolute left-4 top-6'>
        <video className='border border-red-500 w-[60vw]' src={data.videoData.videoUrl} controls autoPlay muted></video>  
        <div className='text-black pt-1 text-2xl font-bold'>{data.videoData.title}</div>  
        <Viewmore description={data.videoData.description}/>
      </div>
    </div>
  </>
  )
}

export default page