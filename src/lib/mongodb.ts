import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing in .env.local");

declare global {
  var mongooseConn: Promise<typeof mongoose> | undefined;
}

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  if (!global.mongooseConn) {
    global.mongooseConn = mongoose.connect(MONGODB_URI, {
      dbName: "task-manager",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  }

  await global.mongooseConn;
  console.log("✅ MongoDB Connected Successfully!");
}
