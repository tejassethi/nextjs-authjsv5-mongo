"use client";

import { BsCloudMoon, BsCloudMoonFill } from "react-icons/bs";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div>
        <BsCloudMoon
          size={30}
          className="text-black cursor-pointer dark:text-gray-dark"
        />
      </div>
    );

  if (resolvedTheme === "dark") {
    return (
      <div className="cursor-pointer" onMouseDown={() => setTheme("light")}>
        <BsCloudMoon
          size={30}
          className="text-black cursor-pointer dark:text-gray-dark"
        />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="cursor-pointer" onMouseDown={() => setTheme("dark")}>
        <BsCloudMoonFill
          size={30}
          className="text-black cursor-pointer dark:text-gray-dark"
          onMouseDown={() => setTheme("dark")}
        />
      </div>
    );
  }
}
