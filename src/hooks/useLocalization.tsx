import { useTranslation } from "react-i18next";

export function useLocalization() {
  const { t, i18n } = useTranslation();

  const isLanguageIsArabic = i18n.language === "ar";
  const isLanguageIsEnglish = i18n.language === "en";

  const selectedLanguage = i18n.language;

  const toggleLanguage = () => {
    const next = selectedLanguage === "en" ? "ar" : "en";
    void i18n.changeLanguage(next);

    // update <html> attributes so layout flips properly
    document.documentElement.lang = next;
    document.documentElement.dir = i18n.dir(next); // "ltr" or "rtl"
  };

  return {
    t,
    i18n,
    isLanguageIsArabic,
    isLanguageIsEnglish,
    selectedLanguage,
    toggleLanguage,
  };
}
