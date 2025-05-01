"use client";

import { LanguageToggle } from "@/components/Events/LanguageToggle";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { useAtom } from "jotai";
import Link from "next/link";
import { FC } from "react";

/**
 * メインナビゲーション
 */
export const MainNav: FC = () => {
  const [language] = useAtom(languageAtom);

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
        <LanguageToggle />
      </div>
    </div>
  );
};
