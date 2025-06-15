import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const hoverAnimation = {
  scale: 1.1,
  transition: { type: "spring", stiffness: 300 },
};

const imageHoverAnimation = {
  scale: 1.05,
  boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
  transition: { type: "spring", stiffness: 300 },
};

const coordinatesForMaps = "40.167766,44.032346";

const ProjectsSection = ({ schemas, openModal }) => {
  const { t } = useTranslation();
  const addressLabel = t("projectsAddress").toUpperCase();

  const [isGeoOpen, setGeoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isGeoOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGeoOpen]);

  const closeModal = useCallback(() => setGeoOpen(false), []);
  const openGeo = useCallback(() => setGeoOpen(true), []);

  return (
    <motion.section
      id="projects"
      className="py-16 bg-white dark:bg-gray-900 text-center px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {t("projectsTitle")}
        </h3>
        <p className="text-lg mb-4 max-w-4xl mx-auto text-gray-600 dark:text-gray-300">
          {t("projectsAbout")}
        </p>
        <p className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {t("projectsSchemes")}
        </p>

        <p className="text-gray-900 dark:text-gray-100 text-base mb-10">
          <motion.button
            onClick={openGeo}
            className="font-bold border-b-2 border-black dark:border-white leading-none normal-case flex items-center justify-center gap-2 mx-auto cursor-pointer text-black dark:text-white"
            whileHover={hoverAnimation}
            aria-label={addressLabel}
            type="button"
          >
            {addressLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
              />
            </svg>
          </motion.button>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {schemas.map((src, index) => (
            <button
              key={src ?? index}
              className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 cursor-pointer transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              onClick={() => openModal(index)}
              aria-label={`${t("projectScheme")} ${index + 1}`}
              type="button"
            >
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <motion.img
                  src={src}
                  alt={`${t("projectScheme")} ${index + 1}`}
                  className="object-contain max-h-44 w-auto"
                  loading="lazy"
                  decoding="async"
                  whileHover={imageHoverAnimation}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {isGeoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-2 sm:px-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-7xl max-h-[95vh] relative overflow-hidden shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-800 text-gray-200 hover:text-white rounded-full shadow-md w-10 h-10 flex items-center justify-center z-10"
              aria-label={t("closeModal")}
              type="button"
            >
              &times;
            </button>
            <div className="w-full h-[80vh]">
              <iframe
                title={t("mapTitle")}
                src={`https://maps.google.com/maps?q=${coordinatesForMaps}&z=15&output=embed&gestureHandling=greedy`}
                width="100%"
                height="100%"
                className="w-full h-full rounded-2xl"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default ProjectsSection;
