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

const ProjectsSection = ({ schemas, openModal, setDocOpen, isDocOpen }) => {
  const { t } = useTranslation();
  // Управление состоянием документа теперь из App.jsx
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
        <p className="text-xl mb-4 max-w-4xl mx-auto text-black dark:text-gray-300">
          {t("projectsAbout")}
        </p>
        <p className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {t("projectsSchemes")}
        </p>

  <p className="text-gray-900 dark:text-gray-100 text-base mb-1">
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

  <p className="text-gray-900 dark:text-gray-100 text-base mb-10 text-center">
          <motion.button
            onClick={() => setDocOpen(true)}
            className="font-bold border-b-2 border-black dark:border-white leading-none normal-case inline-flex items-center gap-2 cursor-pointer text-black dark:text-white text-sm"
            whileHover={hoverAnimation}
            aria-label={t("projectsDocument")}
            type="button"
          >
            {t("projectsDocument")}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </motion.button>
        </p>
        {/* Модальное окно документа вынесено из <p> */}
        {isDocOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setDocOpen(false)}>
            <div className="relative w-full max-w-6xl h-[92vh] bg-transparent" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setDocOpen(false)}
                className="absolute top-2 right-2 bg-gray-800 text-gray-200 hover:text-white rounded-full w-8 h-8 flex items-center justify-center z-10 text-lg"
                aria-label={t("closeModal")}
                type="button"
              >
                &times;
              </button>
              <iframe
                title={t("projectsDocument")}
                src="/documents/ՇԹ-341-12917-25.pdf"
                width="100%"
                height="100%"
                style={{ border: "none", background: "transparent" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {schemas.map((image, index) => (
           <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={image}
                  alt={image}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {image.title}
                </h3>
                <p className="text-gray-600">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isGeoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-2 sm:px-4" onClick={closeModal}>
          <div className="bg-gray-900 rounded-2xl w-full max-w-7xl max-h-[95vh] relative overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
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
