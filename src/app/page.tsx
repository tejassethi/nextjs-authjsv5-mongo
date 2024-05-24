"use client";
import Navbar from "@/components/client/navbar";
import Link from "next/link";
import Heading from "@/components/client/heading";
import { currentUser } from "@/hooks/current-user";
import { FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center font-OpenSans dark:text-white pb-10 md:pb-0 select-none relative">
        <div className="w-full sm:px-10 px-5 xl:px-0">
          <div className="md:pt-20">
            <Heading />
          </div>
          <div className="flex md:space-x-8 space-x-2 md:pt-14 pt-10 w-full  justify-center place-items-center">
            <Link
              href="/"
              className="bg-green dark:bg-yellow-dark dark:text-black font-medium w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-white cursor-pointer whitespace-nowrap"
            >
              Paste Words
            </Link>
            <Link
              href="/get"
              className="bg-white dark:bg-gray dark:text-white w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-black cursor-pointer whitespace-nowrap"
            >
              Get Words
            </Link>
            <Link
              href="/my"
              className="bg-white dark:bg-gray  dark:text-white w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-black cursor-pointer whitespace-nowrap"
            >
              My Words
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
