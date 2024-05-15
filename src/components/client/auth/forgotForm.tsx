"use client";

import { useState } from "react";
import EmailTab from "./forgotTabs/emailTab";
import VerifyTab from "./forgotTabs/verifyTab";
import ChangeTab from "./forgotTabs/changeTab";
const ForgotForm = () => {
  const [email, setEmail] = useState<any>("");
  const [code, setCode] = useState<any>("");
  const [inputCode, setInputCode] = useState<any>("");
  const [oldPassword, setOldPassword] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [page, setPage] = useState<any>("email");

  return (
    <div>
      {page == "email" && (
        <EmailTab
          email={email}
          setEmail={setEmail}
          setCode={setCode}
          setPage={setPage}
          setOldPassword={setOldPassword}
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
        <ChangeTab
          email={email}
          password={password}
          oldPassword={oldPassword}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
    </div>
  );
};

export default ForgotForm;
