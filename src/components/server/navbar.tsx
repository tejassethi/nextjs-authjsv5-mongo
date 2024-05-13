import { auth, signOut } from "@/auth";
import Link from "next/link";
import React from "react";

const Navbar = async ({ role }: any) => {
  const session = await auth();
  if (!session?.user?.email) {
    return (
      <div className="select-none absolute left-0 top-0 right-0 h-16 p-5 bg-[#A79277] flex justify-between place-items-center space-x-5">
        <div className="justify-start place-items-center flex">
          <Link
            href="/"
            className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl"
          >
            PasteWords<span className="text-lg">.com</span>
          </Link>
        </div>
        <div className="space-x-5 justify-end place-items-center hidden md:flex">
          <Link
            href="about"
            className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
          >
            About
          </Link>
          <Link
            href="pricing"
            className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
          >
            Pricing
          </Link>
          <Link
            href="auth/login"
            className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 rounded-sm font-semibold   w-24 text-center text-lg text-nowrap"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="select-none absolute left-0 top-0 right-0 h-16 p-5 bg-[#A79277] flex justify-between place-items-center space-x-5">
        <div className="justify-start place-items-center flex">
          <h2 className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl">
            PasteWords<span className="text-lg">.com</span>
          </h2>
        </div>
        <div className="space-x-5 justify-end place-items-center hidden md:flex">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
            >
              Sign out
            </button>
          </form>
          {role == "Free" ? (
            <div className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 px-3 rounded-sm font-semibold text-center text-lg text-nowrap">
              Upgrade
            </div>
          ) : (
            <div className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 px-3 rounded-sm font-semibold text-center text-lg text-nowrap">
              My Account
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Navbar;
