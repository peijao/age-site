import React from 'react';
import { motion } from 'framer-motion'; // ✅ добавлен импорт

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-100 py-1 text-center text-gray-600 text-xs"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.05 }}
    >
      © {new Date().getFullYear()} AGE Invest
    </motion.footer>
  );
};

export default Footer;
