import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

// Общие параметры анимации для элементов при наведении
const hoverAnimation = {
  scale: 1.1,
  textDecoration: "underline",
  transition: { type: "spring", stiffness: 300 },
};

const Header = ({ t, logo, lang, setLang }) => {
  const handleLangChange = (e) => setLang(e.target.value);

  const navItems = ["about", "projects", "contact"];
  const companyName = "AGE Invest";

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      {/* Логотип абсолютом слева по центру */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 px-4">
        <img src={logo} alt="AGE Invest Logo" className="h-8 w-auto sm:h-12" />
      </div>

      {/* Основной контейнер с отступом слева под логотип */}
      <div className="max-w-7xl mx-auto px-4 py-0.1 flex items-center justify-between pl-[60px]">
        {/* Название компании */}
        <h1 className="text-xl font-bold text-black flex-grow text-center sm:flex-grow-0 sm:text-left">
          <span className="block sm:hidden">{companyName}</span>
          <span className="hidden sm:block">{companyName}</span>
        </h1>

        {/* Навигация — скрываем на мобильных, показываем на sm+ */}
        <nav className="hidden sm:flex flex-wrap gap-x-10 text-sm font-semibold justify-start">
          {navItems.map((section) => (
            <motion.div
              key={section}
              whileHover={hoverAnimation}
              className="cursor-pointer"
            >
              <Link
                to={section}
                smooth
                duration={600}
                offset={-80}
                className="font-extrabold underline decoration-black decoration-2"
              >
                {t(`nav${section[0].toUpperCase()}${section.slice(1)}`)}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Выбор языка с флагами — сдвигаем правее */}
        <motion.select
          value={lang}
          onChange={handleLangChange}
          className="ml-10 p-1 border rounded text-sm font-semibold focus:outline-none cursor-pointer"
          whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <option value="hy">🇦🇲 Հայերեն</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="en">🇬🇧 English</option>
        </motion.select>
      </div>
    </header>
  );
};

export default Header;
