"use server";

import { signIn } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";

const loginHandler = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    const err = error as CredentialsSignin;
    console.log("Error:", err.cause);
    return { success: false, message: err.cause };
  }
};

export { loginHandler };
