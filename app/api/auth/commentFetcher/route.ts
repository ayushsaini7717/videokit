import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Comments from "@/models/comments";

export async function GET(req: NextRequest){
    const {searchParams}=new URL(req.url);
    const mediaId=searchParams.get("mediaId");

    try{
        await connectToDatabase();
        const res=await Comments.find({mediaId});
        return NextResponse.json(res);
    }catch(err){
        return NextResponse.json({msg:"Failed to fetch data!"},{status: 500});
    }
}