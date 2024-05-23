"use client";

import { sendEmail } from "@/lib/sendEmail";
import Link from "next/link";
import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";

const EmailTab = ({ email, setEmail, setCode, setPage }: any) => {
  const [emailError, setEmailError] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (email === "") {
      setEmailError("Required");
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
      setLoading(false);
    }
  };
  return (
    <div className={`${loading && "pointer-events-none"}`}>
      <div className="pb-2 relative">
        {emailError && (
          <p className="text-sm text-red dark:text-red-light p-2 rounded-lg -top-1 right-1 absolute">
            {emailError}
          </p>
        )}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-green-dark dark:outline-yellow"
          placeholder="Email address"
        />
      </div>
      <div className="flex pb-6 w-full place-items-center justify-between">
        <div className="flex place-items-center">
          <div className="text-sm text-green cursor-pointer dark:text-yellow-dark hover:text-green-dark dark:hover:text-yellow hover:underline">
            Already a member? <Link href="/auth/login"> Log in</Link>
          </div>
        </div>
        <div className="text-sm">
          <Link
            href="/auth/forgot"
            className="text-green dark:text-yellow-dark hover:text-green-dark dark:hover:text-yellow hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="w-full h-12 text-lg flex justify-center place-items-center font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow focus:outline-none">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onClick={handleSendEmail}
            className="w-full h-12 text-lg font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow ocus:outline-none"
          >
            Continue with email
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailTab;
