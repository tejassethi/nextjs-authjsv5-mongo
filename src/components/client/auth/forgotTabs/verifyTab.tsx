"use client";

import { sendEmail } from "@/lib/sendEmail";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const VerifyTab = ({
  code,
  inputCode,
  setInputCode,
  setPage,
  email,
  setCode,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendText, setResendText] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);

  const handleCodeCheck = async () => {
    setLoading(true);
    if (parseInt(code) === parseInt(inputCode)) {
      console.log("verification successfull");
      setPage("create");
    } else {
      console.log("verification failed");
      setError("Wrong Verification Code. Please try again");
      setLoading(false);
      setShowResendButton(true);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setLoading(false);
      setShowResendButton(true);
    }
  }, [countdown]);

  const resendCode = async () => {
    setResendLoading(true);
    const codeReturned = await sendEmail(email);
    if (codeReturned.success) {
      setCode(codeReturned.code);
      setPage("verify");
      setResendLoading(false);
      setResendText("Resent");
    } else {
      setError(codeReturned.message);
    }
  };

  return (
    <div
      className={`relative ${
        resendLoading || (loading && "pointer-events-none")
      }`}
    >
      <div className="flex flex-col justify-center place-items-center">
        <h1 className="pb-4 text-center text-two">
          Your verification code has been sent to your email. <br /> Please
          check your inbox to continue.
        </h1>
        <input
          type="number"
          className=""
          maxLength={6}
          value={inputCode}
          onChange={(value: any) => setInputCode(value)}
        ></input>
      </div>
      <div className="w-full flex flex-col pt-4">
        {loading ? (
          <div className="w-full h-10 bg-two rounded-lg text-nine text-lg font-bold flex justify-center place-items-center">
            <PropagateLoader color="white" size={15} className="mb-4" />
          </div>
        ) : (
          <>
            <button
              disabled={resendLoading}
              onClick={handleCodeCheck}
              className="w-full select-none h-10 bg-two hover:bg-four rounded-lg text-nine text-lg font-bold flex justify-center place-items-center cursor-pointer"
            >
              Verify
            </button>
            {showResendButton ? (
              resendText === "" ? (
                <button
                  onClick={resendCode}
                  className="w-full select-none h-10 text-two hover:text-four text-lg underline flex justify-center place-items-center cursor-pointer"
                >
                  Resend Verification Code
                </button>
              ) : (
                <p className="w-full select-none h-10 text-two text-lg flex justify-center place-items-center cursor-pointer">
                  {resendText}
                </p>
              )
            ) : (
              <p className="w-full select-none h-10 text-two text-lg flex justify-center place-items-center">
                Resend in {countdown} seconds
              </p>
            )}
          </>
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

export default VerifyTab;
