"use client";

import { Button } from "@/components/ui/button";
import { languageAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { Languages } from "lucide-react";
import { FC, useEffect } from "react";

/**
 * 言語切り替えコンポーネント
 * @returns 言語切り替えボタンのJSX要素
 */
export const LanguageToggle: FC = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  /**
   * 言語を切り替える
   */
  const toggleLanguage = (): void => {
    setLanguage(language === "zh" ? "ja" : "zh");
  };

  /**
   * 言語変更時にdata-language属性を持つ要素を更新
   */
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
};
