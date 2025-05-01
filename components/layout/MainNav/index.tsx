"use client";

import { LanguageToggle } from "@/components/events/LanguageToggle";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { Calendar, ShoppingBag, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

/**
 * メインナビゲーション
 */
export const MainNav: FC = () => {
  const [language] = useAtom(languageAtom);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/events",
      label: t("common.events", language),
      icon: Ticket,
    },
    {
      href: "/orders",
      label: t("common.myOrders", language),
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">{t("common.eventTicketing", language)}</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <LanguageToggle />
      </div>
    </div>
  );
};
