"use client";

import { loginHandler } from "../../../../../lib/login";
import { createUserWithCredentail } from "../../../../../lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";

const CreateTab = ({
  name,
  setName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  email,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleCreateUser = async () => {
    let valid = true;

    if (name === "") {
      setNameError("Please enter your full name.");
      valid = false;
    } else {
      setNameError("");
    }

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

    const signupResult = await createUserWithCredentail(name, email, password);
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
          className="bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-black-dark dark:outline-gray"
          placeholder="Email address"
        />
      </div>
      <div className="relative">
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className={`bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-black-dark dark:outline-gray ${
            nameError && "border-t-2 border-red dark:border-red-light"
          }`}
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
          className={`bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-black-dark dark:outline-gray ${
            passwordError && "border-t-2 border-red dark:border-red-light"
          }`}
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
          className={`bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-black-dark dark:outline-gray ${
            confirmPasswordError &&
            "border-t-2 border-red dark:border-red-light"
          }`}
        ></input>
      </div>
      <div className="w-full flex flex-col">
        {loading ? (
          <div className="w-full h-12 text-lg flex justify-center place-items-center font-semibold  rounded-lg text-white bg-black hover:bg-black-dark dark:text-black dark:bg-gray-dark dark:hover:bg-gray focus:outline-none">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onMouseDown={handleCreateUser}
            className="w-full h-12 text-lg font-semibold  rounded-lg text-white bg-black hover:bg-black-dark dark:text-black dark:bg-gray-dark dark:hover:bg-gray ocus:outline-none"
          >
            Create Account
          </button>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        {nameError && (
          <p className="text-sm text-red dark:text-red-light text-center">
            {nameError}
          </p>
        )}
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

export default CreateTab;
