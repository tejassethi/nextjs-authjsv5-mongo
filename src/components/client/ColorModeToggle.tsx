"use client";

import { useEffect, useState } from "react";
import { BsCloudMoon, BsCloudMoonFill } from "react-icons/bs";
import cookies from "js-cookie";

//Toggle logic
export default function ColorModeToggle() {
  const [checked, setChecked] = useState(false);

  const toggleDarkMode = () => {
    if (checked) {
      setChecked(false);
      document.documentElement.classList.remove("dark");
      cookies.set("DarkMode", "false");
    } else {
      setChecked(true);
      document.documentElement.classList.add("dark");
      cookies.set("DarkMode", "true");
    }
  };

  useEffect(() => {
    if (cookies.get("DarkMode") === "true") {
      setChecked(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div onClick={toggleDarkMode} className="cursor-pointer">
      {checked ? (
        <BsCloudMoon size={30} className="text-green dark:text-yellow-dark" />
      ) : (
        <BsCloudMoonFill
          size={30}
          className="text-green dark:text-yellow-dark"
        />
      )}
    </div>
  );
}
