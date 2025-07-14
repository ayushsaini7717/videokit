import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body=await req.json();

    if(!body.userId || !body.mediaId){
        return NextResponse.json({error: 'Missing userId or mediaId' },{status: 400});
    }
    try{
        const payload=JSON.stringify({
            userId: body.userId,
            emailId: body.emailId
        })
        await redis.lPush("likeQueue",payload);
        return NextResponse.json({msg: "Successfully Queued!"});
    }catch(err){
        console.error('Redis lPush error:', err);
        return NextResponse.json({ error: 'Failed to queue like' },{status: 500});
    }
}