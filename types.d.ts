// import { Connection } from "mongoose";

// declare global{
//     var mongoose: {
//         conn: Connection | null;
//         promise: Promise<Connection> | null;
//     }
// }

// export {};

import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
  }
}

export {};
