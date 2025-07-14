// import mongoose from "mongoose";

// const dbUri=process.env.DATABASE_URI!;

// if(!dbUri){
//     throw new Error("No database connection string is passed!");
// }

// let cached=global.mongoose;

// if(!cached){
//     cached=global.mongoose={conn: null,promise: null};
// }

// export async function connectToDatabase(){
//     if(cached.conn){
//         return cached.conn;
//     }
//     if(!cached.promise){
//         cached.promise=mongoose.connect(dbUri).then(()=>mongoose.connection);
//     }

//     try{
//         cached.conn=await cached.promise;
//     }catch(err){
//         cached.promise=null;
//         throw new Error("Failed to connect to db!");
//     }

//     return cached.conn;
// }

import mongoose from "mongoose";

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
};

const dbUri = "mongodb+srv://ayush:mahi7717@cluster0.vrya5kg.mongodb.net/";

if (!dbUri) {
  throw new Error("No database connection string is passed!");
}

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

let cached = globalWithMongoose.mongoose;

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(dbUri!).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw new Error("Failed to connect to db!");
  }

  return cached.conn;
}
