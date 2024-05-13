"use server";

import { auth, signIn } from "@/auth";
import EmailForm from "@/components/client/auth/signupForm";
import SignUpForm from "@/components/client/auth/signupForm";
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
          Sign Up
        </h1>
        <Card className="flex justify-stretch place-items-center rounded-lg flex-col w-[80%] pt-6 md:w-[500px]">
          <CardContent className="flex h-full flex-col w-full">
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default page;
