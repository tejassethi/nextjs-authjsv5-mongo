"use client";

import Link from "next/link";
import { useState } from "react";
import EmailTab from "./signupTabs/emailTab";
import VerifyTab from "./signupTabs/verifyTab";
import CreateTab from "./signupTabs/createTab";
const EmailForm = () => {
  const [email, setEmail] = useState<any>("");
  const [code, setCode] = useState<any>("");
  const [inputCode, setInputCode] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [page, setPage] = useState<any>("email");

  return (
    <div className="pt-8">
      {page == "email" && (
        <EmailTab
          email={email}
          setEmail={setEmail}
          setCode={setCode}
          setPage={setPage}
        />
      )}
      {page == "verify" && (
        <VerifyTab
          code={code}
          setCode={setCode}
          inputCode={inputCode}
          setInputCode={setInputCode}
          setPage={setPage}
          email={email}
        />
      )}
      {page == "create" && (
        <CreateTab
          email={email}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
    </div>
  );
};

export default EmailForm;
