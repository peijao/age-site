import React from "react";
import { motion } from "framer-motion";

const AboutSection = ({ t }) => (
  <motion.section
    id="about"
    className="py-16 px-4 text-center bg-white dark:bg-gray-900"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-4xl font-bold mb-6 text-black dark:text-white">
        {t("aboutTitle")}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-lg">
        {t("aboutText")}
      </p>
    </div>
  </motion.section>
);

export default AboutSection;
