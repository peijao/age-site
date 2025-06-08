import React from "react";
import { Link } from "react-scroll"; // ✅ добавлен импорт

const Header = ({ t, logo, lang, setLang }) => {
  const handleLangChange = (e) => setLang(e.target.value);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      {/* Логотип абсолютом слева по центру */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 px-4">
        <img src={logo} alt="AGE Invest Logo" className="h-8 w-auto sm:h-12" />
      </div>

      {/* Основной контейнер с отступом слева под логотип */}
      <div className="max-w-7xl mx-auto px-4 py-0.1 flex items-center justify-between pl-[60px]">
        {/* Название компании — показываем на мобильных по центру, скрываем на sm+ */}
        <h1 className="text-xl font-bold text-black block sm:hidden flex-grow text-center">
          AGE Invest
        </h1>

        {/* Название компании — скрываем на мобильных, показываем на sm+ */}
        <h1 className="text-xl font-bold text-black hidden sm:block">
          AGE Invest
        </h1>

        {/* Навигация — скрываем на мобильных, показываем на sm+ */}
        <nav className="hidden sm:flex flex-wrap gap-x-10 text-sm font-semibold justify-start">
          <Link
            to="about"
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer hover:underline hover:scale-110 transition-transform"
          >
            <span className="font-black underline decoration-black decoration-2">
              {t("navAbout")}
            </span>
          </Link>

          <Link
            to="projects"
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer hover:underline hover:scale-110 transition-transform"
          >
            <span className="font-black underline decoration-black decoration-2">
              {t("navProjects")}
            </span>
          </Link>

          <Link
            to="contact"
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer hover:underline hover:scale-110 transition-transform"
          >
            <span className="font-black underline decoration-black decoration-2">
              {t("navContact")}
            </span>
          </Link>
        </nav>

        {/* Выбор языка с флагами — сдвигаем правее */}
        <select
          value={lang}
          onChange={handleLangChange}
          className="ml-10 p-1 border rounded text-sm font-semibold focus:outline-none"
        >
          <option value="hy">🇦🇲 Հայերեն</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
