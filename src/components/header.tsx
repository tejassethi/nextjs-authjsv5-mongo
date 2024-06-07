"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Paste from "./client/main/mainTabs/paste";
import Get from "./client/main/mainTabs/get";
import My from "./client/main/mainTabs/my";

const tabs = [
  { id: "Retrieve Anything With Words", label: "Get Words" },
  { id: "Share Anything With Words", label: "Paste Words" },
  { id: "All My Generated Words", label: "My Words" },
];

const Header = () => {
  const [activeTab, setActiveTab] = useState(tabs[1].id);

  const handleClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="w-full flex justify-center place-items-center">
        <div className="flex flex-col space-y-5">
          <div className=" flex flex-col justify-center place-items-center">
            <div className="font-bold text-xl lg:text-4xl text-center w-full">
              {activeTab}
            </div>
            <p className="text-center text-sm text-[#AFAFAF]">
              Upload files, text, or links and get unique words for instant and
              convenient access on any device
            </p>
          </div>
          <div className="flex text-nowrap place-items-end justify-center text-xl space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleClick(tab.id)}
                className={clsx(
                  "relative rounded-full px-3 text-lg font-medium text-white transition focus-visible:outline-2",
                  activeTab === tab.id ? "" : "hover:text-white/60"
                )}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-white mix-blend-difference"
                    style={{ borderRadius: 8 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {activeTab == "Share Anything With Words" ? (
        <Paste />
      ) : activeTab == "Retrieve Anything With Words" ? (
        <Get />
      ) : activeTab == "All My Generated Words" ? (
        <My />
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
