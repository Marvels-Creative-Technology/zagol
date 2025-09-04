"use client";

import { useState, useEffect, useCallback } from "react";
import { translations } from "@/lib/translations";

type Locale = "en" | "am";
type TranslationKey = keyof typeof translations.en;

// Global state for locale
let globalLocale: Locale = "en";
const localeListeners = new Set<(locale: Locale) => void>();

export function useTranslations() {
  const [locale, setLocale] = useState<Locale>(globalLocale);

  useEffect(() => {
    // Get locale from localStorage or default to 'en'
    const savedLocale = localStorage.getItem("preferred-locale") as Locale;
    if (savedLocale && (savedLocale === "en" || savedLocale === "am")) {
      globalLocale = savedLocale;
      setLocale(savedLocale);
    }

    // Subscribe to locale changes
    const updateLocale = (newLocale: Locale) => {
      setLocale(newLocale);
    };
    localeListeners.add(updateLocale);

    return () => {
      localeListeners.delete(updateLocale);
    };
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] || key;
    },
    [locale]
  );

  const changeLocale = useCallback((newLocale: Locale) => {
    globalLocale = newLocale;
    localStorage.setItem("preferred-locale", newLocale);

    // Notify all components using this hook
    localeListeners.forEach((listener) => listener(newLocale));
  }, []);

  return {
    t,
    locale,
    changeLocale,
    isAmharic: locale === "am",
    isEnglish: locale === "en",
  };
}
