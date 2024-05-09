import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI as string,
      { dbName: "pastewords" }
    );
    console.log("Connected to database: " + connection.host);
  } catch (error) {
    console.log("Error db");
    throw new Error("Error connecting to database");
  }
};
