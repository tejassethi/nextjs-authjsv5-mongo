"use client";

import React, { useState } from "react";
import Paste from "./mainTabs/paste";
import Get from "./mainTabs/get";
import My from "./mainTabs/my";

const MainForm = () => {
  const [tab, setTab] = useState("paste");

  const active =
    "bg-green dark:bg-yellow-dark dark:text-black font-medium w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-white cursor-pointer whitespace-nowrap";
  const inactive =
    "bg-white dark:bg-gray dark:text-white w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-black cursor-pointer whitespace-nowrap";

  return (
    <>
      <div className="flex md:space-x-8 space-x-2 w-full justify-center place-items-center">
        <div
          onMouseDown={() => setTab("paste")}
          className={tab == "paste" ? active : inactive}
        >
          Paste Words
        </div>
        <div
          onMouseDown={() => setTab("get")}
          className={tab == "get" ? active : inactive}
        >
          Get Words
        </div>
        <div
          onMouseDown={() => setTab("my")}
          className={tab == "my" ? active : inactive}
        >
          My Words
        </div>
      </div>
      {tab == "paste" ? (
        <Paste />
      ) : tab == "get" ? (
        <Get />
      ) : tab == "my" ? (
        <My />
      ) : (
        <></>
      )}
    </>
  );
};

export default MainForm;
