"use client";

import { loginHandler } from "@/actions/login";
import { signupHandler } from "@/actions/signup";
import { redirect } from "next/navigation";
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

    const signupResult = await signupHandler(name, email, password);
    if (!signupResult.success) {
      setLoading(false);
      setError(signupResult.message || "An error occured");
    }
    const loginResult = await loginHandler(email, password);
    if (!loginResult.success) {
      setLoading(false);
      setError((loginResult.message as any) || "An error occured");
    }
    router.push("/member");
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <label
          htmlFor="email"
          className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          disabled
          placeholder="Email"
          className={`w-full active:outline-none hover:outline-none outline-none border-2 rounded-lg p-2 relative ${
            false ? "border-red-300" : "border-[#EAD8C0]"
          }`}
        ></input>
      </div>
      <div className="relative">
        <label
          htmlFor="name"
          className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20"
        >
          Name
        </label>
        {nameError && (
          <p className="text-sm text-red-400 text-center absolute z-40 -top-2 left-[50%] -translate-x-[50%] bg-white px-1 rounded-lg">
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
          className={`w-full active:outline-none hover:outline-none outline-none border-2 rounded-lg p-2 relative ${
            false ? "border-red-300" : "border-[#EAD8C0]"
          }`}
        ></input>
      </div>
      <div className="relative">
        <label
          htmlFor="password"
          className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`w-full active:outline-none hover:outline-none outline-none border-2 rounded-lg p-2 relative ${
            false ? "border-red-300" : "border-[#EAD8C0]"
          }`}
        ></input>
      </div>
      <div className="relative">
        <label
          htmlFor="confirmPassword"
          className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20"
        >
          Confirm Password
        </label>
        {confirmPasswordError && (
          <p className="text-sm text-red-400 text-center absolute z-40 -top-2 left-[50%] -translate-x-[50%] bg-white px-1 rounded-lg">
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
          className={`w-full active:outline-none hover:outline-none outline-none border-2 rounded-lg p-2 relative ${
            false ? "border-red-300" : "border-[#EAD8C0]"
          }`}
        ></input>
      </div>
      <div className="w-full flex flex-col">
        {loading ? (
          <div className="w-full h-10 bg-[#776B5D] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <button
            onClick={handleCreateUser}
            className="w-full select-none h-10 bg-[#776B5D] hover:bg-[#544c42] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center cursor-pointer"
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
