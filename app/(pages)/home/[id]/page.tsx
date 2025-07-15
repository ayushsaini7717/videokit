import React from 'react'
import Viewmore from '@/app/components/Viewmore';
import LikeIcon from '@/app/components/LikeIcon';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id=(await params).id;
  const session=await getServerSession(authOptions);

  const [res1,res2]=await Promise.all([
    fetch(`${process.env.HOST}/api/auth/singlevideo?id=${id}`),
    fetch(`${process.env.HOST}/api/auth/likeFetcher?userMail=${session.user.email}&mediaId=${id}`)
  ])
  // const res=await fetch(`${process.env.HOST}/api/auth/singlevideo?id=${id}`);
  const [data1,data2]=[await res1.json(),await res2.json()];

  return (<>
    <div className='h-[91vh] relative'>
      <div className='absolute left-4 top-6'>
        <video className='border border-red-500 w-[60vw]' src={data1.videoData.videoUrl} controls autoPlay muted></video>  
        <div className='text-black pt-1 text-2xl font-bold'>{data1.videoData.title}</div>  
        <LikeIcon isLiked={data2.isLiked ? true : false} count={data2.AllLiked.length} mediaId={id} userMail={session.user.email}/>
        <Viewmore description={data1.videoData.description}/>
      </div>
    </div>
  </>
  )
}

export default page