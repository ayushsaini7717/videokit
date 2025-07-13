import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import VedioModel from "@/models/vedio";

export async function GET(req: NextRequest){
    try{
        const {searchParams}=new URL(req.url);
        const id=searchParams.get("id");
        await connectToDatabase();

        const videoData=await VedioModel.findOne({_id: id})
        return NextResponse.json({videoData});
    }catch(err){
        console.log("error is ",err);
        throw new Error("Failed to fetch data of video!");
    }
}