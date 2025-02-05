import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env.local");
}

declare global {
  var mongooseConn: Promise<typeof mongoose> | undefined;
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Already connected to MongoDB.");
      return;
    }

    if (!global.mongooseConn) {
      global.mongooseConn = mongoose.connect(MONGODB_URI, {
        dbName: "task-manager",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
    }

    await global.mongooseConn;
    console.log("🚀 MongoDB Connected Successfully!");

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB.");
  }
};

export default connectDB;
