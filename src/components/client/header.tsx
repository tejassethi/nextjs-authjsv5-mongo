"use client";
import React from "react";
import { ReactTyped } from "react-typed";

const Header = () => {
  return (
    <>
      <div className="text-center flex justify-center pb-2 h-14 min-h-14 select-none">
        <b className="text-5xl text-center text-[#776B5D]">
          <ReactTyped
            strings={["Paste Words"]}
            typeSpeed={50}
            showCursor={false}
          />
        </b>
      </div>
      <div className="text-xl text-[#A79277] pb-5 select-none">
        Replace anything for <span className=" font-bold"> words.</span>
      </div>
    </>
  );
};

export default Header;
