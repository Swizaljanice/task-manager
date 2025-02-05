import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI, { dbName: "task-manager" });
}
