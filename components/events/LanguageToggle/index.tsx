"use client";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { useAtom } from "jotai";
import Image from "next/image";
import jpFlag from "../../../public/flags/jp.png";
import twFlag from "../../../public/flags/tw.png";
import { FC } from "react";

/**
 * 言語切り替えコンポーネント
 * 日本語と中国語（繁体字）を切り替え
 * 日本と台湾の丸い国旗アイコンを表示
 */
export const LanguageToggle: FC = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  /**
   * 言語切り替え: 日本語 <-> 繁體中文
   */
  const toggleLanguage = (): void => {
    setLanguage(language === "zh" ? "ja" : "zh");
  };

  // 表示ラベル
  const label = language === "zh" ? "日本語" : "繁體中文";
  // import した画像を src にセット
  const flagSrc = language === "zh" ? jpFlag : twFlag;

  return (
    <Button
      variant="ghost"
      size="default"
      onClick={toggleLanguage}
      title={t(language === "zh" ? "common.switchToJapanese" : "common.switchToChinese", language)}
      className="inline-flex items-center gap-2"
    >
      <Image
        src={flagSrc}
        alt={label}
        width={30}
        height={30}
        className="object-cover border border-slate-200"
      />
      <span>{label}</span>
    </Button>
  );
};
