"use client";

import React, { useState } from "react";
import ColorModeToggle from "./ColorModeToggle";
import { CgMenu } from "react-icons/cg";
import Link from "next/link";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState<any>(false);

  return (
    <>
      <div
        className={`absolute top-20 h-40 right-0 left-0 bg-yellow text-black dark:text-white dark:bg-gray-dark w-full z-50 border-b-2 border-green dark:border-yellow-dark md:hidden animate-fade-down animate-duration-200
 ${navOpen ? "" : "hidden"}`}
      >
        <div className="flex flex-col space-y-5 justify-center place-items-center w-full">
          <Link
            href="/pricing"
            className="text-xl cursor-pointer text-center dark:text-white hover:dark:text-yellow text-black hover:text-green-dark"
          >
            Pricing
          </Link>
          <Link
            href="/auth/login"
            className="text-xl cursor-pointer text-center dark:text-white hover:dark:text-yellow text-black hover:text-green-dark"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="bg-green text-white dark:text-black dark:bg-yellow-dark py-1 px-10 rounded-lg text-lg text-center cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-center px-5 text-black dark:text-white">
        <div className="flex flex-row justify-between place-items-center pt-5 sm:pt-10 font-medium w-full xl:w-[80%] 2xl:w-[60%]">
          <Link
            href="/"
            className=" text-xl sm:text-2xl cursor-pointer dark:text-white hover:dark:text-yellow text-black hover:text-green-dark"
          >
            PasteWords.com
          </Link>
          <div className="md:hidden flex text-4xl space-x-2">
            <ColorModeToggle />
            <CgMenu
              className=" text-green dark:text-yellow-dark"
              onClick={() => setNavOpen(!navOpen)}
            />
          </div>
          <div className=" justify-end place-items-center space-x-5 hidden md:flex">
            <Link
              href="/pricing"
              className="text-xl cursor-pointer dark:text-white hover:dark:text-yellow text-black hover:text-green-dark"
            >
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="text-xl cursor-pointer dark:text-white hover:dark:text-yellow text-black hover:text-green-dark"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-green text-white hover:bg-green-dark dark:hover:bg-yellow  dark:text-black dark:bg-yellow-dark px-5 py-2 rounded-lg text-xl  cursor-pointer"
            >
              Get Started
            </Link>
            <ColorModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
