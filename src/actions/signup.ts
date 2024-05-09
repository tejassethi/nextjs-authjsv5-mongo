"use server";

import { connectDatabase } from "@/lib/utils";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";

const signupHandler = async (name: string, email: string, password: string) => {
  await connectDatabase();

  try {
    const user = await User.findOne({ email });

    if (user) throw new Error("Email already exists.");

    const hashedPassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return error;
  }
};

export { signupHandler };
