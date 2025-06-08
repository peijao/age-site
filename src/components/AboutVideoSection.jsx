import React from "react";
import { motion } from "framer-motion"; // ✅ импорт добавлен
import craneVideo from "../assets/videos/crane.mp4";

const AboutVideoSection = () => (
  <motion.section
    className="w-screen my-12"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.05 }}
  >
    <video
      className="w-full h-[30vh] md:h-[300px] object-cover"
      src={craneVideo}
      autoPlay
      loop
      muted
      playsInline
      title="AGE Invest"
    >
      Ваш браузер не поддерживает видео.
    </video>
  </motion.section>
);

export default AboutVideoSection;
