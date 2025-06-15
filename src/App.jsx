import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import background from "./assets/img/background.jpg";
import logo from "./assets/img/logo.png";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import AboutVideoSection from "./components/AboutVideoSection";
import ProjectsSection from "./components/ProjectsSection";
import PricingSection from "./components/PricingSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ModalGallery from "./components/ModalGallery";
import Watermark from "./components/Watermark";

import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { schemas } from "./constants";
import useLanguage from "./hooks/useLanguage";
import useModalGallery from "./hooks/useModalGallery";

import { Toaster } from "react-hot-toast";

const App = () => {
  const { t, i18n } = useTranslation();
  const { lang, changeLanguage } = useLanguage(i18n);
  const {
    modalIndex,
    zoomed,
    imageRef,
    openModal,
    closeModal,
    navigateModal,
    toggleZoom,
  } = useModalGallery(schemas);

  // Тема: по умолчанию dark, с отключенной анимацией на старте
  const [theme, setTheme] = useState("dark");
  const [animationAllowed, setAnimationAllowed] = useState(false);

  // При монтировании подхватываем тему из localStorage или ставим dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }

    // Через 100 мс включаем анимацию
    const timer = setTimeout(() => {
      setAnimationAllowed(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Обновляем класс и стиль на html
  useEffect(() => {
    const html = document.documentElement;

    if (animationAllowed) {
      html.style.transition = "";
    } else {
      html.style.transition = "none";
    }

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, animationAllowed]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans transition-colors duration-0">
      {/* Водяной знак по центру и под контентом */}
      <div className="absolute inset-0 z-100 pointer-events-none">
        <Watermark logo={logo} />
      </div>

      {/* Контент поверх водяного знака */}
      <div className="relative z-10">
        <Toaster position="top-right" reverseOrder={false} />
        <Header
          t={t}
          logo={logo}
          setLang={changeLanguage}
          lang={lang}
          theme={theme}
          toggleTheme={toggleTheme}
          onSelectSection={(section) => {
            const element = document.getElementById(section);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* Секции */}
        <HeroSection id="hero" background={background} t={t} />
        <AboutSection id="about" t={t} />
        <AboutVideoSection id="about-video" />
        <ProjectsSection id="projects" schemas={schemas} openModal={openModal} lang={lang} />
        <PricingSection id="pricing" t={t} />
        <ContactSection
          id="contact"
          t={t}
          logo={logo}
          icons={{ MapPinIcon, PhoneIcon, EnvelopeIcon }}
        />
        <Footer id="footer" />

        {modalIndex !== null && (
          <ModalGallery
            modalIndex={modalIndex}
            closeModal={closeModal}
            navigateModal={navigateModal}
            zoomed={zoomed}
            toggleZoom={toggleZoom}
            schemas={schemas}
            imageRef={imageRef}
          />
        )}
      </div>
    </div>
  );
};

export default App;
