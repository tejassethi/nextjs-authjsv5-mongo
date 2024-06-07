import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-nowrap w-full border-b-2 border-[#404040] z-50 h-14 top-0 right-0 left-0 px-5 fixed justify-between flex place-items-center">
      <Link href="/" className="font-GMSans cursor-pointer hover:underline">
        PasteWords.com
      </Link>
      <div className="flex text-sm place-items-center justify-end">
        <Link
          href="/plan"
          className="cursor-pointer p-2 py-[6px] rounded-lg hover:bg-[#303030] duration-100 transition"
        >
          Pricing
        </Link>
        <Link
          href="/login"
          className="cursor-pointer p-2 py-[6px] mr-2 rounded-lg  hover:bg-[#303030] duration-100 transition"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="cursor-pointer p-2 py-[6px] rounded-lg bg-[#9C75FF] hover:bg-[#8463d8] duration-100 transition"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
