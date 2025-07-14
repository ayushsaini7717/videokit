// import redis from "../lib/redis";
// // import Likes from "../models/likes";
// // import { connectToDatabase } from "../lib/db";

// const runworker=async ()=>{
//     // try{
//     //     await connectToDatabase();
//     //     console.log("Connected to DB");
//     //     while(true){
//     //         const payload=await redis.rPop("likeQueue");

//     //         if(!payload){
//     //             await new Promise((res)=>setTimeout(res,1000));
//     //             continue;
//     //         }
            
//     //         const { userId, mediaId } = JSON.parse(payload);
//     //         console.log(`Creating like for user: ${userId}, media: ${mediaId}`);
//     //         await Likes.create({userId,mediaId});
//     //     }
//     // }catch(err){
//     //     console.error("Worker error:", err);
//     // }
//     console.log("running");
// }

// runworker();

import redis from "@/lib/redis"; 
import Likes from "@/models/likes";
import { connectToDatabase } from "@/lib/db";

async function runWorker() {
  try {
    console.log("Starting worker...");
    await connectToDatabase();
    
    while(true) {
      const payload = await redis.rPop("likeQueue");
      
      if(!payload) {
        await new Promise(res => setTimeout(res, 1000));
        continue;
      }
      
      const { userId, mediaId } = JSON.parse(payload);
      console.log(`Processing like for ${userId}, ${mediaId}`);
      await Likes.create({ userId, mediaId });
    }
  } catch (err) {
    console.error("Worker failed:", err);
    process.exit(1);
  }
}

runWorker();