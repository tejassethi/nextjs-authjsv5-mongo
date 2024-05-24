"use server";

import { auth, signIn } from "@/auth";
import ForgotForm from "@/components/client/auth/forgotForm";
import Heading from "@/components/client/heading";
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
      <div className="min-h-screen flex justify-center font-OpenSans dark:text-white pb-10 md:pb-0 select-none relative">
        <div className="w-full sm:px-10 px-5 xl:px-0">
          <div className="md:pt-20">
            <Heading />
          </div>
          <div className="w-full flex justify-center place-items-center">
            <div className=" max-w-md w-full pt-16">
              <h3 className=" text-3xl font-bold text-center text-green dark:text-yellow-dark">
                Change Password
              </h3>
              <ForgotForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
