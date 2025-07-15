import { NextRequest, NextResponse } from "next/server";
import Likes from "@/models/likes";

export async function GET(req: NextRequest){
    const {searchParams}=new URL(req.url);
    const userMail=searchParams.get("userMail");
    const mediaId=searchParams.get("mediaId");

    try{
        const isLiked=await Likes.findOne({userMail});
        const AllLiked=await Likes.find({mediaId});

        return NextResponse.json({isLiked,AllLiked})
    }catch(err){
        throw new Error("Failed to fetch Like details!");
    }
}