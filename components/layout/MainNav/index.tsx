"use client";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { Globe } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

/**
 * メインナビゲーションコンポーネント
 * ヘッダーナビゲーションとして使用され、言語切り替え機能を含みます
 */
export const MainNav: FC = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  /**
   * 言語を切り替えます
   * 日本語と中国語を切り替えます
   */
  const toggleLanguage = (): void => {
    setLanguage(language === "zh" ? "ja" : "zh");
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">{t("common.eventTicketing", language)}</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
            {t("common.events", language)}
          </Link>
          <Link href="/orders" className="text-sm font-medium transition-colors hover:text-primary">
            {t("common.myOrders", language)}
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          title={t("common.switchToJapanese", language)}
        >
          <Globe className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
