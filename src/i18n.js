import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import gu from "./locales/gu.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";

const SUPPORTED_LANGS = ['en', 'hi', 'mr', 'gu', 'ta', 'te'];
const savedLang = localStorage.getItem('lang');
const validLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      mr: { translation: mr },
      gu: { translation: gu },
      ta: { translation: ta },
      te: { translation: te }
    },
    lng: validLang,
    fallbackLng: 'en',
    returnObjects: true,
    debug: false,
    interpolation: {
      escapeValue: false
    },
    parseMissingKeyHandler: (key) => {
      console.warn(`[i18n] Missing key: ${key}`);
      return key.split('.').pop(); // Show last part of key instead of full path
    }
  });

export default i18n;