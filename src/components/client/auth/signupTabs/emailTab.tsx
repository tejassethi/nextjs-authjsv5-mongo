"use client";

import { sendEmail } from "@/actions/sendEmail";
import Link from "next/link";
import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";

const EmailTab = ({ email, setEmail, setCode, setPage }: any) => {
  const [emailError, setEmailError] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (email === "") {
      setEmailError("Please input your email");
      return;
    }
    setLoading(true);
    const response = await sendEmail(email);
    setLoading(false);

    if (response.success) {
      setCode(response.code);
      setPage("verify");
    } else {
      setEmailError(response.message);
    }
  };
  return (
    <div>
      <div className="relative">
        <label
          htmlFor="email"
          className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20"
        >
          Email
        </label>
        {emailError && (
          <p className="text-sm text-red-400 text-center absolute z-40 -top-2 left-[50%] -translate-x-[50%] bg-white px-1 rounded-lg">
            {emailError}
          </p>
        )}
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`w-full active:outline-none hover:outline-none outline-none border-2 rounded-lg p-2 relative ${
            false ? "border-red-300" : "border-[#EAD8C0]"
          }`}
        ></input>
      </div>
      <div className="w-full flex flex-col pt-4">
        {loading ? (
          <div className="w-full h-10 bg-[#776B5D] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onClick={handleSendEmail}
            className="w-full select-none h-10 bg-[#776B5D] hover:bg-[#544c42] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center cursor-pointer"
          >
            Continue with Email
          </button>
        )}
      </div>
      <div className="text-[#776B5D] select-none text-sm flex w-full justify-end place-items-center pt-2 cursor-pointer">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline pl-1">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default EmailTab;
