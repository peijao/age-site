import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations";

i18n.use(initReactI18next).init({
  resources: {
    hy: { translation: translations.hy },
    ru: { translation: translations.ru },
    en: { translation: translations.en },
  },
  lng: "hy", // current language
  fallbackLng: "hy",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
