import React, { useState, useEffect } from "react";
import background from "../assets/img/background.jpg";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMobileClick = () => {
    if (isMobile) setIsExpanded((prev) => !prev);
  };

  let firstLine = "";
  let secondLine = "";

  if (lang === "hy") {
    firstLine = "Մենք պարզապես կառուցում ենք վայրը,";
    secondLine = "որը կկոչեք տուն";
  } else if (lang === "ru") {
    firstLine = "Мы просто строим место, которое";
    secondLine = "вы назовёте домом";
  } else {
    firstLine = "We’re simply building the place";
    secondLine = "you’ll call home";
  }

  const heightClass = isMobile
    ? isExpanded
      ? "h-[90vh]"
      : "h-[300px]"
    : "h-[300px] hover:h-[90vh]";

  const overlayClass = isMobile
    ? isExpanded
      ? "bg-opacity-0"
      : "bg-opacity-60"
    : "group-hover:bg-opacity-0 bg-opacity-60";

  const contentClass = isMobile
    ? isExpanded
      ? "transform -translate-y-20 brightness-125"
      : ""
    : "group-hover:-translate-y-20 group-hover:brightness-125 transform";

  return (
    <section
      id="hero"
      onClick={handleMobileClick}
      className={`relative ${heightClass} transition-all duration-500 flex items-center justify-center text-white text-center px-8 group overflow-hidden`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`absolute inset-0 bg-black ${overlayClass} transition-opacity duration-500 pointer-events-none z-0`}
      ></div>

      <div className={`relative z-10 transition-transform duration-500 ${contentClass}`}>
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg leading-snug">
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
