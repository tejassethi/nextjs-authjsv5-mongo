"use server";

import { connectDatabase } from "@/lib/utils";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";

const signupHandler = async (name: string, email: string, password: string) => {
  await connectDatabase();
  try {
    const hashedPassword = await hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: "An error occured. Please try again" };
  }
};

export { signupHandler };
