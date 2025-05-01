"use client";

import { Button } from "@/components/ui/button";
import { languageAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { Languages } from "lucide-react";
import { useEffect } from "react";

export function LanguageToggle() {
  const [language, setLanguage] = useAtom(languageAtom);

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "ja" : "zh");
  };

  // Update all elements with data-language attributes when language changes
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-language-en]"));
    for (const element of elements) {
      if (element instanceof HTMLElement) {
        element.innerText = element.dataset[`language${language.toUpperCase()}`] || "";
      }
    }
  }, [language]);

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="w-[80px] gap-2">
      <Languages className="h-4 w-4" />
      {language === "zh" ? "日本語" : "中文"}
    </Button>
  );
}
