// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ✅ import your Strapi JSON/TS data
import { strapiEnData, strapiArData } from "./src/redux/strapiDataV2";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: strapiEnData, // load directly from local Strapi file
    },
    ar: {
      translation: strapiArData,
    },
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback if key not found
  debug: false,
  interpolation: {
    escapeValue: false, // React already escapes
  },
  preload: ["en", "ar"], // preload both
});

export default i18n;
