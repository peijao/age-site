import { useState, useEffect } from "react";

const useLanguage = (i18n) => {
  const [lang, setLang] = useState(i18n.language || "hy");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, changeLanguage };
};

export default useLanguage;
