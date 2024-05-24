"use client";

import { sendEmailReset } from "@/lib/sendEmail";
import * as EmailValidator from "email-validator";
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
      setEmailError("Please enter an email address.");
      return;
    }
    if (!EmailValidator.validate(email)) {
      setEmailError("Please enter a valid email address.");
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
      <div className="pb-4 relative">
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-green-dark dark:outline-yellow ${
            emailError != "" && "border-t-2 border-red dark:border-red-light"
          }`}
          placeholder="Email address"
        />
      </div>
      <div>
        {loading ? (
          <div className="w-full h-12 text-lg flex justify-center place-items-center font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow focus:outline-none">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onMouseDown={handleSendEmailReset}
            className="w-full h-12 text-lg font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow ocus:outline-none"
          >
            Continue with email
          </button>
        )}
      </div>
      {emailError && (
        <p className="text-sm text-red dark:text-red-light p-2 text-center">
          {emailError}
        </p>
      )}
    </div>
  );
};

export default EmailTab;
