"use client";

import initials from "initials";
import React, { useEffect, useRef, useState } from "react";
import ColorModeToggle from "./ColorModeToggle";
import { CgMenu } from "react-icons/cg";
import Link from "next/link";
import { currentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";
import { PiSignOutBold, PiNutBold, PiMoney } from "react-icons/pi";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState<any>(false);
  const [menuOpen, setMenuOpen] = useState<any>(false);
  const [menuPhoneOpen, setMenuPhoneOpen] = useState<any>(false);
  const ref = useRef<any>(null);
  const refphone = useRef<any>(null);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!refphone.current?.contains(event.target)) {
        console.log(false);
        setMenuPhoneOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [refphone]);

  const user = currentUser();

  return (
    <>
      <div
        className={`absolute top-20 h-max pb-5 right-0 left-0 bg-yellow text-black dark:text-white dark:bg-gray-dark w-full z-50 border-b-2 border-green dark:border-yellow-dark md:hidden animate-fade-down animate-duration-200
 ${navOpen ? "" : "hidden"}  ${!user ? "" : "hidden"}`}
      >
        <div className="flex flex-col space-y-3 justify-center place-items-center w-full">
          <>
            <Link
              href="/pricing"
              className="text-xl cursor-pointer text-center dark:text-white hover:dark:text-yellownh-10 w-[90%] flex justify-center place-items-center  text-black hover:text-green-dark"
            >
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="text-xl cursor-pointer  text-center dark:text-white hover:dark:text-yellow h-10 w-[90%] flex justify-center place-items-center  text-black hover:text-green-dark"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-green text-white  dark:text-black dark:bg-yellow-dark h-10 w-[90%] flex justify-center place-items-center  rounded-lg text-lg text-center cursor-pointer"
            >
              Get Started
            </Link>
          </>
        </div>
      </div>
      <div className="w-full flex justify-center px-5 text-black dark:text-white h-[62px]">
        <div className="flex flex-row justify-between place-items-center pt-5 sm:pt-10 font-medium w-full xl:w-[80%] 2xl:w-[60%]">
          <Link
            href="/"
            className=" text-xl sm:text-2xl cursor-pointer dark:text-white hover:dark:text-yellow text-black hover:text-green-dark"
          >
            PasteWords.com
          </Link>
          <div className="md:hidden flex text-4xl space-x-2">
            {!user ? (
              <>
                <ColorModeToggle />
                <CgMenu
                  className=" text-green dark:text-yellow-dark"
                  onMouseDown={() => setNavOpen(!navOpen)}
                />
              </>
            ) : (
              <div className="flex space-x-3">
                <ColorModeToggle />
                <div className="relative flex justify-start" ref={refphone}>
                  <button onMouseDown={() => setMenuPhoneOpen(!menuPhoneOpen)}>
                    <div className="bg-green text-white hover:bg-green-dark dark:text-black dark:bg-yellow-dark h-8 w-max px-3  flex justify-center place-items-center rounded-lg text-lg  cursor-pointer">
                      <div className="pr-2">
                        <FaUser size={18} />
                      </div>
                      {initials(user.name) || "My Account"}
                    </div>
                  </button>
                  <div
                    className={`absolute top-10 right-0 w-56 origin-top-right divide-y divide-gray rounded-lg z-50 dark:bg-gray dark:text-white bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      menuPhoneOpen ? "" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col pt-2">
                      <div className="text-black dark:text-white  px-4 text-lg">
                        {user.name}
                      </div>
                      <div className="text-green dark:text-yellow-dark pb-2  px-4 text-sm">
                        {user.email}
                      </div>
                      <div className="flex flex-col pb-2">
                        <div className="flex text-black dark:bg-gray py-2 dark:text-white justify-start place-items-center px-4 hover:bg-green hover:text-white dark:hover:bg-yellow-dark dark:hover:text-black cursor-pointer">
                          <PiNutBold size={20} />
                          <div className=" pl-2 text-base">My Plan</div>
                        </div>
                      </div>
                    </div>

                    <div
                      onMouseDown={() => signOut()}
                      className="flex text-black  dark:bg-gray dark:text-white justify-start place-items-center py-1 px-4 hover:bg-green hover:text-white dark:hover:bg-yellow-dark dark:hover:text-black cursor-pointer rounded-b-xl"
                    >
                      <PiSignOutBold size={20} />
                      <div className=" pl-2 py-2 text-base">Sign Out</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className=" justify-end place-items-center space-x-5 hidden md:flex">
            {!user ? (
              <>
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
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green text-white hover:bg-green-dark dark:hover:bg-yellow  dark:text-black dark:bg-yellow-dark h-10 w-36 flex justify-center place-items-center rounded-lg text-xl  cursor-pointer"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative" ref={ref}>
                <button onMouseDown={() => setMenuOpen(!menuOpen)}>
                  <div className="bg-green select-none text-white hover:bg-green-dark  dark:text-black dark:bg-yellow-dark h-10 w-max px-5 flex justify-center place-items-center rounded-lg text-xl  cursor-pointer">
                    <div className="pr-2">
                      <FaUser size={18} />
                    </div>
                    {initials(user.name) || "My Account"}
                  </div>
                </button>
                <div
                  className={`absolute top-12 right-0 w-56 origin-top-right divide-y divide-gray rounded-lg z-50 dark:bg-gray dark:text-white bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    menuOpen ? "" : "hidden"
                  }`}
                >
                  <div className="flex flex-col space-y-1 pt-2">
                    <div className="text-black dark:text-white  px-4 text-lg">
                      {user.name}
                    </div>
                    <div className="text-green  dark:text-yellow-dark  px-4 text-sm">
                      {user.email}
                    </div>
                    <div className="flex text-black dark:bg-gray dark:text-white p-1 justify-start place-items-center px-4 hover:bg-green hover:text-white dark:hover:bg-yellow-dark dark:hover:text-black cursor-pointer">
                      <PiNutBold size={20} />
                      <div className=" pl-2 py-2 text-base">My Plan</div>
                    </div>
                  </div>

                  <div
                    onMouseDown={() => signOut()}
                    className="flex text-black  dark:bg-gray dark:text-white justify-start place-items-center py-1 px-4 hover:bg-green hover:text-white dark:hover:bg-yellow-dark dark:hover:text-black cursor-pointer rounded-b-xl"
                  >
                    <PiSignOutBold size={20} />
                    <div className=" pl-2 py-2 text-base">Sign Out</div>
                  </div>
                </div>
              </div>
            )}
            <ColorModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
