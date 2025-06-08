import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const ProjectsSection = ({ schemas, openModal }) => {
  const { t, i18n } = useTranslation();

  const addressLabelRaw = t("projectsAddress");

  // Для английского языка капитализируем каждое слово (если нужно)
  const addressLabel = i18n.language === "en" 
    ? capitalizeWords(addressLabelRaw) 
    : addressLabelRaw;

  const coordinatesForMaps = "40.167028,44.031500";

  const [isGeoOpen, setGeoOpen] = useState(false);

  // Блокировка прокрутки body при открытии модалки
  useEffect(() => {
    if (isGeoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGeoOpen]);

  return (
    <section id="projects" className="py-16 bg-gray-50 text-center px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold mb-6 text-gray-900">
          {t("projectsTitle")}
        </h3>
        <p className="text-base mb-4">
          <button
            onClick={() => setGeoOpen(true)}
            className="text-black font-normal border-b-2 border-black hover:opacity-80 transition-opacity leading-none normal-case"
          >
            {addressLabel}
          </button>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {schemas.map((src, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openModal(index)}
            >
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src={src}
                  alt={`Схема ${index + 1}`}
                  className="object-contain max-h-44 w-auto transition-transform hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модалка с картой */}
      {isGeoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-4">
          <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] relative overflow-hidden">
            <button
              onClick={() => setGeoOpen(false)}
              className="absolute top-4 right-4 bg-white text-gray-800 hover:text-black rounded-full shadow-md w-10 h-10 flex items-center justify-center z-10"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="w-full h-[80vh]">
              <iframe
                title="AGE Invest Location"
                src={`https://maps.google.com/maps?q=${coordinatesForMaps}&z=15&output=embed&gestureHandling=greedy`}
                width="100%"
                height="100%"
                className="w-full h-full rounded-2xl"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
