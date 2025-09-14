import React from "react";
import { motion } from "framer-motion";
import craneVideoMp4 from "../assets/videos/crane.mp4";
import craneVideoWebm from "../assets/videos/crane.webm";
import posterCrane from "../assets/img/poster_crane.png";

const AboutVideoSection = () => (
  <motion.section
    className="w-screen my-6 bg-white dark:bg-gray-900"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.05 }}
    aria-label="AGE Invest video section"
  >
    <video
      className="w-full h-[30vh] md:h-[300px] object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster={posterCrane}
    >
      <source src={craneVideoWebm} type="video/webm" />
      <source src={craneVideoMp4} type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  </motion.section>
);

export default AboutVideoSection;
