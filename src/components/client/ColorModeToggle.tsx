"use client";

import { BsCloudMoon, BsCloudMoonFill } from "react-icons/bs";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ColorModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div>
        <BsCloudMoon
          size={30}
          className="text-green cursor-pointer dark:text-yellow-dark"
        />
      </div>
    );

  if (resolvedTheme === "dark") {
    return (
      <div className="cursor-pointer" onMouseDown={() => setTheme("light")}>
        <BsCloudMoon
          size={30}
          className="text-green cursor-pointer dark:text-yellow-dark"
        />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="cursor-pointer" onMouseDown={() => setTheme("dark")}>
        <BsCloudMoonFill
          size={30}
          className="text-green cursor-pointer dark:text-yellow-dark"
          onMouseDown={() => setTheme("dark")}
        />
      </div>
    );
  }
}
