"use server";

import { auth, signIn } from "@/auth";
import ForgotForm from "@/components/client/auth/forgotForm";
import Navbar from "@/components/client/navbar";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="bg-one relative h-full min-h-screen pb-6 md:pb-0 pt-6 md:pt-0">
        <div className="flex flex-col md:h-screen md:justify-center place-items-center pt-28 md:pt-0">
          <h1 className="font-bold text-5xl text-center text-two pb-6">
            Reset Password
          </h1>
          <div className="flex justify-stretch place-items-center rounded-lg flex-col w-[80%] pt-6 md:w-[500px]">
            <div className="flex h-full flex-col w-full">
              <ForgotForm />
              <div className="text-two select-none text-sm flex flex-col sm:flex-row w-full justify-between place-items-center pt-2 cursor-pointer">
                <div className="flex justify-center place-items-center">
                  {"Don't have an account?"}
                  <Link href="/auth/signup" className="underline pl-1">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
