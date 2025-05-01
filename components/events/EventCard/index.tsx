"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Locale } from "@/i18n.config";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { Database } from "@/types/supabase";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { CalendarDays, MapPin } from "lucide-react";

type Event = Database["public"]["Tables"]["events"]["Row"] & {
  ticket_types: Database["public"]["Tables"]["ticket_types"]["Row"][];
};

interface EventCardProps {
  event: Event;
}

/**
 * イベントカードコンポーネント
 * イベントの詳細を表示し、詳細ページへのリンクを提供
 */
export const EventCard: FC<EventCardProps> = ({ event }) => {
  const [language] = useAtom<Locale>(languageAtom);

  /**
   * 最安値のチケット価格を取得
   */
  const getLowestPrice = (): number => {
    if (!event.ticket_types.length) return 0;
    return Math.min(...event.ticket_types.map((ticket) => ticket.price));
  };

  /**
   * 総座席数を取得
   */
  const getTotalSeats = (): number => {
    return event.ticket_types.reduce((total, ticket) => total + ticket.available_seats, 0);
  };

  /**
   * 日付をローカライズしてフォーマット
   */
  const formatRelativeDate = (dateStr: string): string => {
    const eventDate = new Date(dateStr);
    return format(eventDate, "PPP", {
      locale: language === "zh" ? zhTW : undefined,
    });
  };

  const eventName = language === "zh" ? event.name_zh : event.name_ja;
  const eventDescription = language === "zh" ? event.description_zh : event.description_ja;
  const eventLocation = language === "zh" ? event.location_zh : event.location_ja;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* イベント画像 */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={event.image_url || ""}
          alt={eventName || ""}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>

      <CardContent className="p-4">
        {/* イベントタイトル */}
        <h3 className="text-lg font-bold mb-1 line-clamp-2">{eventName}</h3>
        {/* イベント説明 */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{eventDescription}</p>
        {/* Divider */}
        <div className="my-2 h-[0.5px] bg-border" />

        {/* 日付 */}
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{formatRelativeDate(event.date)}</span>
        </div>

        {/* 会場 */}
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{eventLocation}</span>
        </div>

        {/* 価格と残席数 */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">
              {t("events.startingFrom", language)} ¥{getLowestPrice().toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {`${getTotalSeats()} ${t("events.availableSeats", language)}`}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button className="w-full">{t("events.viewDetails", language)}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
