import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // ✅ Добавлен импорт

const iconStyle = {
  width: "1rem",
  height: "1rem",
  minWidth: "1rem",
  minHeight: "1rem",
};

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="contact"
      className="py-4 px-4 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm gap-y-4">
        <img
          src={logo}
          alt="AGE Invest Logo"
          style={{ height: "110px", width: "auto" }}
        />

        <div className="text-center md:text-left text-gray-700 space-y-2">
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <MapPinIcon style={iconStyle} className="text-black- shrink-0" />
            <span className="text-sm font-bold">{t("contactAddress")}</span>
          </p>

          <p className="flex items-center gap-2 justify-center md:justify-start">
            <PhoneIcon style={iconStyle} className="text-black shrink-0" />
            <a
              href="tel:+37444304206"
              className="flex items-center gap-2 text-sm text-black font-black underline decoration-black decoration-2 transition-transform duration-200 hover:scale-110"
            >
              {t("contactPhone")}
            </a>
          </p>

          <p className="flex items-center gap-2 justify-center md:justify-start">
            <EnvelopeIcon style={iconStyle} className="text-black shrink-0" />
            <a
              href={`mailto:${t("contactEmail")}`}
              className="flex items-center gap-2 text-sm text-black font-black underline decoration-black decoration-2 transition-transform duration-200 hover:scale-110"
            >
              {t("contactEmail")}
            </a>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Contacts;
