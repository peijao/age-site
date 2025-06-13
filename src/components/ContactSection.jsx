import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/img/logo.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaViber,
  FaTelegramPlane,
} from "react-icons/fa";

const iconStyle = {
  width: "1rem",
  height: "1rem",
  minWidth: "1rem",
  minHeight: "1rem",
};

const hoverAnimation = {
  scale: 1.1,
  transition: { type: "spring", stiffness: 300 },
};

const contactItems = [
  {
    Icon: MapPinIcon,
    contentKey: "contactAddress",
    isLink: false,
  },
  {
    Icon: PhoneIcon,
    contentKey: "contactPhone",
    isLink: true,
    hrefPrefix: "tel:",
    hrefValue: "+37444304206",
  },
  {
    Icon: EnvelopeIcon,
    contentKey: "contactEmail",
    isLink: true,
    hrefPrefix: "mailto:",
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/YOUR_FACEBOOK",
    color: "#1877F2",
    Icon: FaFacebookF,
  },
  {
    href: "https://www.linkedin.com/company/ageinvest",
    color: "#0A66C2",
    Icon: FaLinkedinIn,
  },
  {
    href: "viber://chat?number=%2B37444304206",
    color: "#59267C",
    Icon: FaViber,
  },
  {
    href: "tg://resolve?domain=NAME TELEGRAM",
    color: "#0088CC",
    Icon: FaTelegramPlane,
  },
];

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="contact"
      className="pt-0 -mt-12 pb-4 px-4 bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Логотип и контакты */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm gap-y-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <img
            src={logo}
            alt="AGE Invest Logo"
            style={{ height: "110px", width: "auto" }}
          />
        </div>

        <div className="text-center md:text-left text-gray-700 space-y-2 order-last md:order-none">
          {contactItems.map(({ Icon, contentKey, isLink, hrefPrefix, hrefValue }) => (
            <p
              key={contentKey}
              className="flex items-center gap-2 justify-center md:justify-start"
            >
              <Icon style={iconStyle} className="text-black shrink-0" />
              {isLink ? (
                <motion.a
                  href={`${hrefPrefix}${hrefValue ?? t(contentKey)}`}
                  className="flex items-center gap-2 text-sm text-black font-black underline decoration-black decoration-2 cursor-pointer"
                  whileHover={hoverAnimation}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(contentKey)}
                </motion.a>
              ) : (
                <span className="text-sm font-bold">{t(contentKey)}</span>
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Иконки соцсетей с вызовами */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex gap-8 md:gap-16 -mt-[3rem] mt-8 md:mt-0">
          {socialLinks.map(({ href, color, Icon }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black opacity-70 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
              style={{
                color,
                filter: `drop-shadow(0 0 5px ${color})`,
              }}
              whileHover={{ scale: 1.1, opacity: 1, transition: { type: "spring", stiffness: 300 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Contacts;
