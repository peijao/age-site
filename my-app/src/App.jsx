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
  const [isDocOpen, setDocOpen] = useState(false);
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

  const [theme, setTheme] = useState("dark");
  const [animationAllowed, setAnimationAllowed] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const savedLang = localStorage.getItem("language") || "hy";
    setTheme(savedTheme);
    changeLanguage(savedLang);
    
    const timer = setTimeout(() => setAnimationAllowed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.style.transition = animationAllowed ? "" : "none";

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

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    localStorage.setItem('language', language);
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans transition-colors duration-0 overflow-hidden">
      {/* Водяной знак */}
      {modalIndex === null && !isDocOpen && (
        <div className="absolute inset-0 z-1 pointer-events-none">
          <Watermark logo={logo} />
        </div>
      )}

      <div className="relative z-10">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: theme === "dark" ? "#1f2937" : "#f9fafb",
              color: theme === "dark" ? "#f9fafb" : "#1f2937",
              border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: theme === "dark" ? "#064e3b" : "#d1fae5",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: theme === "dark" ? "#7f1d1d" : "#fee2e2",
              },
            },
          }}
        />

        <Header
          t={t}
          logo={logo}
          setLang={handleLanguageChange}
          lang={lang}
          theme={theme}
          toggleTheme={toggleTheme}
          onSelectSection={(section) => {
            const element = document.getElementById(section);
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <HeroSection id="hero" background={background} t={t} />
        <AboutSection id="about" t={t} />
        <AboutVideoSection id="about-video" />
  <ProjectsSection id="projects" schemas={schemas} openModal={openModal} lang={lang} setDocOpen={setDocOpen} isDocOpen={isDocOpen} />
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
