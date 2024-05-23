"use client";

import { loginHandler } from "@/lib/login";
import { createUserWithCredentail } from "@/lib/actions/user.actions";
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
    if (name === "") {
      setNameError("Input Name");
      return;
    }
    setNameError("");

    if (password === "") {
      setPasswordError("Input password");
      return;
    }
    if (password.length < 8) {
      setPasswordError("At least 8 characters");
      return;
    }
    setPasswordError("");

    if (confirmPassword === "") {
      setConfirmPasswordError("Input password again");
      return;
    }
    setConfirmPasswordError("");

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setConfirmPasswordError("");

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
          className="bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-green-dark dark:outline-yellow"
          placeholder="Email address"
        />
      </div>
      <div className="relative">
        {nameError && (
          <p className="text-sm text-red dark:text-red-light p-2 rounded-lg -top-1 right-1 absolute">
            {nameError}
          </p>
        )}
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="bg-gray-100 w-full text-md px-4 py-3.5 bg-[#FFFFFF] dark:bg-gray rounded-md outline-green-dark dark:outline-yellow"
        ></input>
      </div>
      <div className="relative">
        {passwordError && (
          <p className="text-sm text-red dark:text-red-light p-2 rounded-lg -top-1 right-1 absolute">
            {passwordError}
          </p>
        )}
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
        {confirmPasswordError && (
          <p className="text-sm text-red dark:text-red-light p-2 rounded-lg -top-1 right-1 absolute">
            {confirmPasswordError}
          </p>
        )}
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
          <div className="w-full h-12 text-lg flex justify-center font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow focus:outline-none">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onClick={handleCreateUser}
            className="w-full h-12 text-lg font-semibold  rounded-lg text-white bg-green hover:bg-green-dark dark:text-black dark:bg-yellow-dark dark:hover:bg-yellow ocus:outline-none"
          >
            Create Account
          </button>
        )}
        {error && (
          <p className="text-sm text-red-400 text-center bg-white rounded-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateTab;
