import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    className="bg-gray-100 py-1 text-center text-gray-600 text-xs"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.05 }}
  >
    © {new Date().getFullYear()} AGE Invest
  </motion.footer>
);

export default Footer;
