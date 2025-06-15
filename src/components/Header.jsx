import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import logoLight from "../assets/img/logo.png";
import logoDark from "../assets/img/logo-white.png";

const hoverAnimation = {
  scale: 1.1,
  textDecoration: "underline",
  transition: { type: "spring", stiffness: 300 },
};

const Header = ({ t, lang, setLang, onSelectSection }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      html.classList.add("dark");
      setIsDark(true);
    } else {
      html.classList.remove("dark");
      setIsDark(false);
    }

    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      html.classList.add("light");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  const handleLangChange = (e) => setLang(e.target.value);

  const navItems = ["about", "projects", "contact"];
  const companyName = "AGE Invest";

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 px-4">
        <img
          src={isDark ? logoDark : logoLight}
          alt="AGE Invest Logo"
          className="h-8 w-auto sm:h-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-0.1 flex items-center justify-between pl-[60px]">
        <h1 className="text-xl font-bold text-black dark:text-white flex-grow text-center sm:flex-grow-0 sm:text-left">
          <span className="block sm:hidden">{companyName}</span>
          <span className="hidden sm:block">{companyName}</span>
        </h1>

        <nav className="hidden sm:flex flex-wrap gap-x-10 text-sm font-semibold justify-start">
          {navItems.map((section) => (
            <motion.div
              key={section}
              whileHover={hoverAnimation}
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onSelectSection(section);
              }}
            >
              <span className="font-extrabold underline decoration-black dark:decoration-white decoration-2 text-black dark:text-white">
                {t(`nav${section[0].toUpperCase()}${section.slice(1)}`)}
              </span>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center ml-0">
          <motion.select
            value={lang}
            onChange={handleLangChange}
            className="p-1 border rounded text-sm font-semibold focus:outline-none cursor-pointer dark:bg-gray-800 dark:text-white dark:border-gray-600"
            whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <option value="hy">🇦🇲 Հայերեն</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="en">🇬🇧 English</option>
          </motion.select>

          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Theme"
            className="p-0.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center ml-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: 26, height: 26 }}
          >
            {isDark ? (
              <SunIcon className="text-yellow-400" style={{ width: 18, height: 18 }} />
            ) : (
              <MoonIcon className="text-gray-900" style={{ width: 18, height: 18 }} />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
