import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage('en')} className="text-sm underline">EN</button>
      <button onClick={() => changeLanguage('ru')} className="text-sm underline">RU</button>
      <button onClick={() => changeLanguage('hy')} className="text-sm underline">AM</button> {/* <-- здесь исправление */}
    </div>
  );
};

export default LanguageSelector;
