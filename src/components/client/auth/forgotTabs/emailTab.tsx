"use client";

import { sendEmailReset } from "@/lib/sendEmail";
import Link from "next/link";
import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";

const EmailTab = ({
  email,
  setEmail,
  setCode,
  setPage,
  setOldPassword,
}: any) => {
  const [emailError, setEmailError] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const handleSendEmailReset = async () => {
    if (email === "") {
      setEmailError("Please input your email");
      return;
    }
    setLoading(true);
    const response = await sendEmailReset(email);
    setLoading(false);

    if (response.success) {
      setOldPassword(response.password);
      setCode(response.code);
      setPage("verify");
    } else {
      setEmailError(response.message);
      setLoading(false);
    }
  };
  return (
    <div className={`${loading && "pointer-events-none"}`}>
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
            onClick={handleSendEmailReset}
            className="w-full select-none h-10 bg-[#776B5D] hover:bg-[#544c42] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center cursor-pointer"
          >
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailTab;
