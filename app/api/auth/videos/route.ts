import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import VedioModel, { ivedio } from "@/models/vedio";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(){
    try{
        await connectToDatabase();
        const videos=await VedioModel.find({}).sort({createdAt: -1}).lean();

        if(!videos || videos.length === 0){
            return NextResponse.json({videos: []},{status: 200});
        }

        return NextResponse.json(videos);
    }catch(err){
        return NextResponse.json({
            error: "Failed to fetch videos"
        })
    }
}

export async function POST(req: NextRequest){
    try{
        const session=await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                error: "Unauthorized"
            },{status: 401})
        }

        await connectToDatabase();

        const body:ivedio=await req.json();

        if(!body.title || !body.description || !body.thumbnailUrl || !body.videoUrl || !body.authorEmail){
            return NextResponse.json({error : "Missing required Fields!"},{status: 400})
        }
        const videoData={
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body?.transformation?.quality ?? 100
            }
        }
        const newVideo=await VedioModel.create(videoData);
        return NextResponse.json(newVideo);
    }catch(err){
        return NextResponse.json({error: "Failed to upload video!"},{status: 500});
    }
}