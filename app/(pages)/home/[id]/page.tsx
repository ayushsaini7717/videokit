import React from 'react'
import Viewmore from '@/app/components/Viewmore';
import LikeIcon from '@/app/components/LikeIcon';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import CommentComp from '@/app/components/CommentComp';

interface scheme{
    id: string,
    userName: string,
    mediaId: string,
    text: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id=(await params).id;
  const session=await getServerSession(authOptions);

  const [res1,res2,res3]=await Promise.all([
    fetch(`${process.env.HOST}/api/auth/singlevideo?id=${id}`),
    fetch(`${process.env.HOST}/api/auth/likeFetcher?userMail=${session.user.email}&mediaId=${id}`),
    fetch(`${process.env.HOST}/api/auth/commentFetcher?mediaId=${id}`)
  ])
  // const res=await fetch(`${process.env.HOST}/api/auth/singlevideo?id=${id}`);
  const [data1,data2,data3]=[await res1.json(),await res2.json(),await res3.json()];

  return (<>
    <div className='h-[91vh] relative'>
      <div className='absolute left-4 top-6'>
        {/* <video className='border border-red-500 w-[60vw]' src={data1.videoData.videoUrl} controls autoPlay muted></video>   */}
        <div className='text-black pt-1 text-2xl font-bold'>{data1.videoData.title}</div>  
        <div className='flex gap-10 items-center'>
          <LikeIcon isLiked={data2.isLiked ? true : false} count={data2.AllLiked.length} mediaId={id} userMail={session.user.email}/>
          <CommentComp userName={session.user.name} mediaId={id}/>
        </div>
        <Viewmore description={data1.videoData.description}/>
        <div>
          <div className='font-bold text-lg mt-2'>Comments</div>
          {data3.map((item:scheme,i:number)=>{
            return <div className='flex items-center gap-2' key={i}>
              <div className='rounded-full font-bold bg-black text-white h-7 w-7 flex justify-center items-center'>{item.userName[0]}</div>
              <div className='flex flex-col'>
                <div className='font-bold text-sm'>
                  {item.userName}
                </div>
                <div className='text-sm'>
                  {item.text}
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  </>
  )
}

export default page