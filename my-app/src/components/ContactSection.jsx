import React, { useEffect, useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import logoDark from "../assets/img/logo.png";
import logoLight from "../assets/img/logo-white.png";
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
    isGeoLink: true,
  },
  {
    Icon: PhoneIcon,
    contentKey: "contactPhone",
    isLink: true,
    hrefPrefix: "tel:",
    hrefValue: "+37455401501",
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
    href: "viber://chat?number=%2B37455401501",
    color: "#59267C",
    Icon: FaViber,
  },
  {
    href: "https://t.me/+37455401501",
    color: "#0088CC",
    Icon: FaTelegramPlane,
  },
];

const Contacts = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [isGeoOpen, setGeoOpen] = useState(false);

  // Coordinates for Armavir, Armenia: 40°09'17.0"N 44°02'18.8"E
  const coordinatesForMaps = "40.154722,44.038555";

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(() => checkDark());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isGeoOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGeoOpen]);

  return (
    <>
      <motion.section
        id="contact"
        className="pt-0 -mt-12 pb-4 px-4 bg-white dark:bg-gray-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm gap-y-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src={isDark ? logoLight : logoDark}
              alt="AGE Invest Logo"
              style={{ height: "140px", width: "auto" }}
            />
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="mb-2">
              <motion.button
                onClick={() => setGeoOpen(true)}
                className="flex items-center gap-2 text-base font-semibold underline decoration-black dark:decoration-white text-black dark:text-white cursor-pointer justify-center"
                style={{ marginLeft: '-1mm' }}
                whileHover={hoverAnimation}
                whileTap={{ scale: 0.95 }}
              >
                <MapPinIcon style={iconStyle} className="text-black dark:text-white shrink-0" />
                <span style={{ whiteSpace: 'pre-line' }}>{t("contactAddress")}</span>
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <motion.a
              href={`tel:+37455401501`}
              className="flex items-center gap-2 text-sm font-black underline decoration-black dark:decoration-white text-black dark:text-white cursor-pointer"
              whileHover={hoverAnimation}
              whileTap={{ scale: 0.95 }}
            >
              <PhoneIcon style={iconStyle} className="text-black dark:text-white shrink-0" />
              {t("contactPhone")}
            </motion.a>
            <motion.a
              href={`mailto:${t("contactEmail")}`}
              className="flex items-center gap-2 text-sm font-black underline decoration-black dark:decoration-white text-black dark:text-white cursor-pointer"
              whileHover={hoverAnimation}
              whileTap={{ scale: 0.95 }}
            >
              <EnvelopeIcon style={iconStyle} className="text-black dark:text-white shrink-0" />
              {t("contactEmail")}
            </motion.a>
          </div>
        </div>

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
                whileHover={{
                  scale: 1.1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Geo Modal */}
      {isGeoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-2 sm:px-4" onClick={() => setGeoOpen(false)}>
          <div className="bg-gray-900 rounded-2xl w-full max-w-7xl max-h-[95vh] relative overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setGeoOpen(false)}
              className="absolute top-4 right-4 bg-gray-800 text-gray-200 hover:text-white rounded-full shadow-md w-10 h-10 flex items-center justify-center z-10"
              aria-label="Close modal"
              type="button"
            >
              &times;
            </button>
            <div className="w-full h-[80vh]">
              <iframe
                title="AGE Invest Contact Location"
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
    </>
  );
};

export default Contacts;
