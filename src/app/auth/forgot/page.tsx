"use server";

import { auth, signIn } from "@/auth";
import ForgotForm from "@/components/client/auth/forgotForm";
import Navbar from "@/components/server/navbar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/member");
  }
  return (
    <main className="bg-[#FFF2E1] relative h-full min-h-screen pb-6 md:pb-0 pt-6 md:pt-0">
      <Navbar />
      <div className="flex flex-col md:h-screen md:justify-center place-items-center pt-28 md:pt-0">
        <h1 className="font-bold text-5xl text-center text-[#776B5D] pb-6">
          Reset Password
        </h1>
        <Card className="flex justify-stretch place-items-center rounded-lg flex-col w-[80%] pt-6 md:w-[500px]">
          <CardContent className="flex h-full flex-col w-full">
            <ForgotForm />
            <div className="text-[#776B5D] select-none text-sm flex flex-col sm:flex-row w-full justify-between place-items-center pt-2 cursor-pointer">
              <div className="flex justify-center place-items-center">
                {"Don't have an account?"}
                <Link href="/auth/signup" className="underline pl-1">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default page;
