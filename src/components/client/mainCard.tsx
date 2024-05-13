"use client";
import React, { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import Paste from "./tabs/pasteTab";
import DropTab from "./tabs/dropTab";
import HistoryTab from "./tabs/historyTab";

const MainCard = () => {
  const [data, setData] = useState({});
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setLoading(true);
      console.log(data);
    }
  }, [data]);
  return (
    <div className="flex justify-stretch place-items-center rounded-t-lg flex-col w-[80%]  md:w-[600px] md:h-[400px]">
      <div className="flex w-full h-12">
        <div
          className={`rounded-t-lg select-none border-[1px] border-[#E2E8F0] border-b-0 w-full h-full flex justify-center place-items-center font-semibold md:text-xl text-center cursor-pointer ${
            tab == 1 ? "bg-white text-[#544c42]" : "bg-[#EAD8C0] text-[#544c42]"
          }`}
          onClick={() => {
            setTab(1);
          }}
        >
          Get Words
        </div>
        <div
          className={`rounded-t-lg select-none border-[1px] border-[#E2E8F0] border-b-0 w-full h-full flex justify-center place-items-center font-semibold md:text-xl text-center cursor-pointer ${
            tab == 2 ? "bg-white text-[#544c42]" : "bg-[#EAD8C0] text-[#544c42]"
          }`}
          onClick={() => {
            setTab(2);
          }}
        >
          Paste Words
        </div>
        <div
          className={`rounded-t-lg border-[1px] border-[#E2E8F0] border-b-0 w-28 h-full flex justify-center place-items-center font-semibold md:text-xl text-center cursor-pointer ${
            tab == 3 ? "bg-white text-[#544c42]" : "bg-[#EAD8C0] text-[#544c42]"
          }`}
          onClick={() => {
            setTab(3);
          }}
        >
          <MdHistory size={27} />
        </div>
      </div>
      <DropTab
        className={`${
          tab == 1 ? "block" : "hidden"
        } w-full h-full bg-white rounded-t-none border-t-0 `}
        setData={setData}
        maxFileSize={20}
        maxFileSizeUnit="MB"
        maxTextChar={20971520}
        loading={loading}
      />
      <Paste
        className={`${
          tab == 2 ? "block" : "hidden"
        } w-full h-full bg-white rounded-t-none border-t-0 `}
      />
      <HistoryTab
        className={`${
          tab == 3 ? "block" : "hidden"
        } w-full h-full bg-white rounded-t-none border-t-0 `}
      />
    </div>
  );
};

export default MainCard;
