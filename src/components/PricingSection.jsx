import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactModal from "./ContactModal";
import { motion } from "framer-motion";

const PricingSection = () => {
  const { t } = useTranslation();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const pricePerSqm = 300000;
  const minArea = 48;

  const hoverAnimation = {
    scale: 1.1,
    boxShadow: "0 0 12px rgba(255, 255, 255, 0.3)",
    transition: { type: "spring", stiffness: 300 },
  };

  const priceInfo = [
    { label: t("priceLabel"), value: `${pricePerSqm.toLocaleString()} ${t("currency")}` },
    { label: t("areaLabel"), value: `${minArea} м²` },
  ];

  return (
    <motion.section
      className="py-12 mb-12 text-center max-w-4xl mx-auto px-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.05 }}
    >
      <p className="text-4xl font-bold mb-4">{t("priceInfoLine1")}</p>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-3">{t("priceInfoLine2")}</p>

      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
        {priceInfo.map(({ label, value }) => (
          <div key={label} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-64">
            <h4 className="text-lg font-semibold mb-2">{label}</h4>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-lg text-gray-500 dark:text-gray-400 mb-4 font-bold">{t("priceInfoLine3")}</p>

      <motion.button
        onClick={() => setContactModalOpen(true)}
        className="bg-black dark:bg-white text-white dark:text-black py-2 px-5 rounded cursor-pointer font-semibold"
        whileHover={hoverAnimation}
        type="button"
      >
        {t("contactUs")}
      </motion.button>

      {contactModalOpen && <ContactModal onClose={() => setContactModalOpen(false)} />}
    </motion.section>
  );
};

export default PricingSection;
