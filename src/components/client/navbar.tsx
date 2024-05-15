"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { handleSignOut } from "@/signout";

const ClientNavbar = ({ session, plan }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="select-none absolute left-0 top-0 right-0 h-16 p-5 bg-[#A79277] flex justify-between place-items-center ">
      <div className="justify-start place-items-center flex">
        <Link
          href="/"
          className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl"
        >
          PasteWords<span className="text-lg">.com</span>
        </Link>
      </div>
      <div className=" justify-end place-items-center hidden md:flex space-x-5">
        {!session?.user ? (
          <>
            <Link
              href="/about"
              className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
            >
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 rounded-sm font-semibold w-24 text-center text-lg text-nowrap"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <form action={handleSignOut}>
              <button
                type="submit"
                className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
              >
                Sign out
              </button>
            </form>
            <div className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 px-3 rounded-sm font-semibold text-center text-lg text-nowrap">
              My {plan ? plan : ""} Account
            </div>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleSidebar}>
          <FaBars className="text-[#F6F5F2] text-3xl" />
        </button>
      </div>
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-[#A79277] z-50 p-5 pt-[14px]">
          <div className="flex justify-between mb-5">
            <Link
              href="/"
              className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl"
            >
              PasteWords<span className="text-lg">.com</span>
            </Link>
            <button onClick={toggleSidebar} className="text-[#F6F5F2] text-3xl">
              &times;
            </button>
          </div>
          <nav className="flex flex-col space-y-5">
            {!session?.user ? (
              <>
                <Link
                  href="/about"
                  className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
                  onClick={toggleSidebar}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
                  onClick={toggleSidebar}
                >
                  Pricing
                </Link>
                <Link
                  href="/auth/login"
                  className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
                  onClick={toggleSidebar}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 rounded-sm font-semibold w-full text-center text-lg text-nowrap"
                  onClick={toggleSidebar}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <form action={handleSignOut}>
                  <button
                    type="submit"
                    className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
                    onClick={toggleSidebar}
                  >
                    Sign out
                  </button>
                </form>
                <div className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 px-3 rounded-sm font-semibold text-center text-lg text-nowrap">
                  My {plan ? plan : ""} Account
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default ClientNavbar;
