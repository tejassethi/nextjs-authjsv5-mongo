"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const loginHandler = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
    return { success: true };
  } catch (error) {
    const err = error as CredentialsSignin;
    return { success: false, message: err.cause || "An error occurred" };
  }
};

export { loginHandler };
