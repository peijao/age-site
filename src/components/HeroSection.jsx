import React, { useState, useEffect } from "react";
import background from "../assets/img/background.jpg";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) setIsExpanded((prev) => !prev);
  };

  const phrases = {
    hy: ["Մենք պարզապես կառուցում ենք վայրը,", "որը կկոչեք տուն"],
    ru: ["Мы просто строим место, которое", "вы назовёте домом"],
    en: ["We’re simply building the place", "you’ll call home"],
  };

  const [firstLine, secondLine] = phrases[lang] || phrases.en;

  const isCompactLang = lang === "ru" || lang === "hy";
  const isRussianMobile = isMobile && lang === "ru";

  const baseClasses =
    "relative transition-all duration-500 flex items-center justify-center text-white text-center px-8 overflow-hidden";

  const heightClass = isMobile
    ? isExpanded
      ? "h-[90vh]"
      : "h-[300px]"
    : "h-[300px] hover:h-[90vh] group";

  const overlayClass = isMobile
    ? isExpanded
      ? "bg-opacity-0"
      : "bg-opacity-60"
    : "bg-opacity-60 group-hover:bg-opacity-0";

  const contentTransform = isMobile
    ? isExpanded
      ? "-translate-y-20 brightness-125 opacity-60"
      : "opacity-100"
    : "group-hover:-translate-y-20 group-hover:brightness-125 group-hover:opacity-60";

  const titleClass = `text-4xl md:text-6xl font-bold drop-shadow-lg ${
    isRussianMobile
      ? "leading-[1.1] tracking-tight"
      : isCompactLang
      ? "leading-tight tracking-tight"
      : "leading-snug"
  }`;

  return (
    <section
      id="hero"
      className={`${baseClasses} ${heightClass} group`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none z-0 ${overlayClass}`}
      ></div>

      <div
        className={`relative z-10 transition-all duration-500 transform ${contentTransform}`}
      >
        <h1 className={titleClass}>
          <span>{firstLine}</span>
          <br />
          <span>{secondLine}</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow-md max-w-3xl mx-auto">
          {t("mainDesc")}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
