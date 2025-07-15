import { NextRequest, NextResponse } from "next/server";
import Comments from "@/models/comments";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest){
    const body=await req.json();
    const userName=body.userName;
    const mediaId=body.mediaId;
    const text=body.text;

    if(!userName || !mediaId || !text){
        return NextResponse.json({error:"Missing required fields!"},{status: 400});
    }

    try{
        await connectToDatabase();
        await Comments.create({userName,mediaId,text});
        return NextResponse.json({msg: "Comment successfully published!"})
    }catch(err){
        console.log("Error is: ",err);
        return NextResponse.json({msg: "Something went wrong!"},{status: 500});
    }
}