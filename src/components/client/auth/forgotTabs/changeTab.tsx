"use client";

import { loginHandler } from "@/lib/login";
import { resetPassword } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import { compare } from "bcryptjs";

const ChangeTab = ({
  oldPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  email,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleCreateUser = async () => {
    let valid = true;

    if (password === "") {
      setPasswordError("Please enter a password.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Please enter a password with at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword === "") {
      setConfirmPasswordError("Please re-enter your password.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Your entered passwords do not match.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!valid) return;

    setLoading(true);

    const signupResult = await resetPassword(email, password);
    if (!signupResult.success) {
      setLoading(false);
      setError(signupResult.message || "An error occured");
    }
    const loginResult = await loginHandler(email, password);
    if (!loginResult.success) {
      setLoading(false);
      setError((loginResult.message as any) || "An error occured");
    }
    router.push("/");
  };

  return (
    <div
      className={`flex flex-col space-y-4 ${loading && "pointer-events-none"}`}
    >
      <div className="relative">
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          disabled
          placeholder="Email"
          className="bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-green-dark dark:outline-yellow"
        ></input>
      </div>
      <div className="relative">
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-green-dark dark:outline-yellow"
        ></input>
      </div>
      <div className="relative">
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-green-dark dark:outline-yellow"
        ></input>
      </div>
      <div className="w-full flex flex-col">
        {loading ? (
          <div className="w-full h-12 text-lg flex justify-center place font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow focus:outline-none">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onMouseDown={handleCreateUser}
            className="w-full h-12 text-lg font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow ocus:outline-none"
          >
            Change Password
          </button>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        {passwordError && (
          <p className="text-sm text-red dark:text-red-light text-center">
            {passwordError}
          </p>
        )}
        {confirmPasswordError && (
          <p className="text-sm text-red dark:text-red-light text-center">
            {confirmPasswordError}
          </p>
        )}
        {error && (
          <p className="text-sm text-red dark:text-red-light text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangeTab;
