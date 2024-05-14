"use server";

import { revalidatePath } from "next/cache";
import { User } from "@/lib/models/userModel";
import { connectToDatabase } from "../database/db";
import { compare, hash } from "bcryptjs";

export async function createUserWithGoogle(
  name: any,
  email: any,
  googleID: any
) {
  try {
    await connectToDatabase();
    const newUser = await User.create({
      name: name,
      email: email,
      googleID: googleID,
    });
    return { success: true, message: JSON.parse(JSON.stringify(newUser)) };
  } catch (error) {
    return { success: false, message: "An error occured. Please try again" };
  }
}

export async function createUserWithCredentail(
  name: any,
  email: any,
  password: any
) {
  try {
    await connectToDatabase();
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return { success: true, message: JSON.parse(JSON.stringify(newUser)) };
  } catch (error) {
    return { success: false, message: "An error occured. Please try again" };
  }
}

export async function authorizeUser(email: any, password: any) {
  try {
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { email: email },
      { last_login: Date.now() },
      { new: true }
    )
      .select("+password")
      .populate("plan");

    if (!user) throw new Error("Invalid credentials");
    if (!user.password) throw new Error("Please sign in with your provider");
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect Password");
    const userObject = user.toObject();
    const { password: userPassword, ...userSafe } = userObject;
    console.log("User logged in:", userSafe);
    console.log("done");
    return { success: true, data: userSafe };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occured. Please try again",
    };
  }
}

export async function getUser(email: any) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email: email }).populate("plan");

    if (!user) throw new Error("Invalid credentials");

    console.log("GET USER: ", user);

    return { success: true, data: user.toObject() };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error)?.message || "An error occured. Please try again",
    };
  }
}