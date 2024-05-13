import { type ClassValue, clsx } from "clsx";
import mongoose, { mongo } from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectDatabase = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;

    const { connection } = await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "pastewords",
    });

    console.log("connect to db", connection.host);
  } catch (error) {
    throw new Error("Error connecting to db");
  }
};
