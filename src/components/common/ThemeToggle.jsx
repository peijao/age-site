import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    () =>
      localStorage.getItem("theme") === "dark" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !localStorage.getItem("theme"))
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
      aria-label="Toggle Theme"
    >
      {isDark ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;
