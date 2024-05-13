"use client";

import React, { useState } from "react";
import { loginHandler } from "@/actions/login";
import { redirect } from "next/navigation";
import { PropagateLoader } from "react-spinners";

const LoginForm = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [emailError, setEmailError] = useState<any>("");
  const [passwordError, setPasswordError] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (email === "") {
      setEmailError("Please input your email");
      return;
    }
    if (password === "") {
      setPasswordError("Please input your password");
      return;
    }
    setEmailError("");
    setPasswordError("");
    setLoading(true);
    const response = await loginHandler(email, password);

    if (response.success) {
      console.log("Login successful");
      redirect("/member");
    } else {
      setEmailError(response.message);
      console.log(response.message);
      setLoading(false);
    }
  };

  return (
    <div className={`${loading && "pointer-events-none"}`}>
      <div className="relative pb-4">
        <label
          htmlFor="email"
          className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3 z-20"
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 rounded-lg p-2"
        />
      </div>
      <div className="relative">
        <label
          htmlFor="password"
          className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3 z-20"
        >
          Password
        </label>
        {passwordError && (
          <p className="text-sm text-red-400 text-center absolute z-40 -top-2 left-[50%] -translate-x-[50%] bg-white px-1 rounded-lg">
            {passwordError}
          </p>
        )}
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 rounded-lg p-2"
        />
      </div>
      <div className="w-full flex flex-col pt-4">
        {loading ? (
          <div className="w-full h-10 bg-[#776B5D] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full h-10 bg-[#776B5D] hover:bg-[#544c42] rounded-lg text-[#F6F5F3] text-lg font-bold"
          >
            Continue with Email
          </button>
        )}
      </div>
      <div className="text-[#776B5D] font-bold text-sm flex w-full justify-center pt-2">
        or
      </div>
    </div>
  );
};

export default LoginForm;
