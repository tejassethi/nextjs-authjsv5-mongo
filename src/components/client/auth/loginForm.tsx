"use client";

import React, { useState } from "react";
import { loginHandler } from "@/lib/login";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [emailError, setEmailError] = useState<any>("");
  const [passwordError, setPasswordError] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (email === "") {
      setEmailError("Required");
      return;
    }
    if (password === "") {
      setPasswordError("Required");
      return;
    }
    setEmailError("");
    setPasswordError("");
    setLoading(true);
    const response = await loginHandler(email, password);
    console.log("response", response.message);
    if (response.success) {
      console.log("Login successful");
      router.push("/");
    } else {
      setError(response.message);
      setLoading(false);
    }
  };

  return (
    <>
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
      <div className="pb-2 relative">
        {passwordError && (
          <p className="text-sm text-red dark:text-red-light p-2 rounded-lg -top-1 right-1 absolute">
            {passwordError}
          </p>
        )}
        <input
          name="password"
          type="password"
          autoCapitalize="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 w-full text-md px-4 py-3.5  bg-[#FFFFFF] dark:bg-gray  rounded-md outline-green-dark dark:outline-yellow"
          placeholder="Password"
        />
      </div>
      <div className="flex pb-6 w-full place-items-center justify-between">
        <div className="flex place-items-center">
          <div className="text-sm text-green cursor-pointer dark:text-yellow-dark hover:text-green-dark dark:hover:text-yellow hover:underline">
            Not a member? <Link href="/auth/signup"> Sign up</Link>
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
      <div className="">
        {loading ? (
          <div className="w-full h-12 text-lg flex justify-center font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow focus:outline-none">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full h-12 text-lg font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow ocus:outline-none"
          >
            Log in
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red dark:text-red-light p-2 rounded-lg text-center">
          {error}
        </p>
      )}
    </>
  );
};

export default LoginForm;
