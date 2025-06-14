import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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

  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-sans">
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
          onSelectSection={(section) => {
            const element = document.getElementById(section);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* Рендерим все секции с id для скролла */}
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
