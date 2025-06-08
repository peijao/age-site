import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactModal from "./ContactModal";
import { motion } from "framer-motion"; // ✅ добавлен импорт

const PricingSection = () => {
  const { t } = useTranslation();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const pricePerSqm = 300000;
  const minArea = 48;

  return (
    <motion.section
      className="py-16 text-center max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.05 }}
    >
      <p className="text-4xl font-bold mb-6">{t("priceInfoLine1")}</p>

      <p className="text-xl text-gray-700 mb-4">{t("priceInfoLine2")}</p>

      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-64">
          <h4 className="text-lg font-semibold mb-2">{t("priceLabel")}</h4>
          <p className="text-2xl font-bold">
            {pricePerSqm.toLocaleString()} {t("currency")}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-64">
          <h4 className="text-lg font-semibold mb-2">{t("areaLabel")}</h4>
          <p className="text-2xl font-bold">{minArea} м²</p>
        </div>
      </div>

      <p className="text-base text-gray-600 mb-6 font-bold">{t("priceInfoLine3")}</p>

      <button
        onClick={() => setContactModalOpen(true)}
        className="bg-black text-white py-2 px-6 rounded transform transition-transform duration-200 hover:scale-105 hover:bg-gray-800"
      >
        {t("contactUs")}
      </button>

      {contactModalOpen && (
        <ContactModal onClose={() => setContactModalOpen(false)} />
      )}
    </motion.section>
  );
};

export default PricingSection;
