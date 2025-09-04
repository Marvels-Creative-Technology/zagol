"use client";

import { Switch } from "@/components/ui/switch";
import { Globe } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export function LanguageToggle() {
  const { locale, changeLocale, isAmharic } = useTranslations();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "am" : "en";
    changeLocale(newLocale);
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {isAmharic ? "አማ" : "EN"}
      </span>
      <Switch
        checked={isAmharic}
        onCheckedChange={toggleLanguage}
        className="data-[state=checked]:bg-purple-600"
      />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {isAmharic ? "EN" : "አማ"}
      </span>
    </div>
  );
}
