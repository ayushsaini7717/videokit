import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";

export async function POST(req: NextRequest){
    try{
        const {email,password}=await req.json();

        if(!email || !password){
            return NextResponse.json({
                error: "Email and password required!"
            },{status: 400})
        }

        await connectToDatabase();

        const existingUser=await User.findOne({email});

        if(existingUser){
            return NextResponse.json({
                error: "User already exists!"
            },{status: 400})
        }

        await User.create({email,password});

        return NextResponse.json({
            msg: "User registered successfully!"
        },{status: 200});
    }catch(err){
        console.log("Failed to register user ",err);
        return NextResponse.json({
            msg: "Failed to register successfully!"
        },{status: 400})
    }
}