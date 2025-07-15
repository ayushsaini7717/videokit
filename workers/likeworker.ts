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
  console.log("Starting worker...");
  await connectToDatabase();

  while (true) {
    try {
      const payload = await redis.rPop("likeQueue");

      if (!payload) {
        await new Promise(res => setTimeout(res, 1000));
        continue;
      }

      const { userMail, mediaId } = JSON.parse(payload);
      console.log(`Processing like toggle for ${userMail}, ${mediaId}`);

      const existingLike = await Likes.findOne({ userMail, mediaId });

      if (existingLike) {
        await Likes.deleteOne({ _id: existingLike._id });
        console.log(`Removed like for ${userMail}, ${mediaId}`);
      } else {
        await Likes.create({ userMail, mediaId });
        console.log(`Added like for ${userMail}, ${mediaId}`);
      }

    } catch (err) {
      console.error("Error processing like:", err);
    }
  }
}

runWorker();