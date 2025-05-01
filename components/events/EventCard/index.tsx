"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { Database } from "@/types/supabase";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { useAtom } from "jotai";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Event = Database["public"]["Tables"]["events"]["Row"] & {
  ticket_types: Database["public"]["Tables"]["ticket_types"]["Row"][];
};

interface EventCardProps {
  event: Event;
}

/**
 * イベントカードコンポーネント
 * @param props - イベント情報を含むプロパティ
 * @returns イベントカードのJSX要素
 */
export const EventCard: FC<EventCardProps> = ({ event }) => {
  const [language] = useAtom(languageAtom);

  /**
   * 最低価格のチケットを取得
   * @param tickets - チケットタイプの配列
   * @returns 最低価格
   */
  const getLowestPrice = (tickets: Event["ticket_types"]): number => {
    return tickets.reduce(
      (min, ticket) => (ticket.price < min ? ticket.price : min),
      tickets[0]?.price || 0,
    );
  };

  /**
   * 利用可能な総座席数を取得
   * @param tickets - チケットタイプの配列
   * @returns 総座席数
   */
  const getTotalSeats = (tickets: Event["ticket_types"]): number => {
    return tickets.reduce((sum, ticket) => sum + ticket.available_seats, 0);
  };

  /**
   * 日付を相対時間形式にフォーマット
   * @param date - フォーマット対象の日付
   * @returns フォーマットされた日付文字列
   */
  const formatRelativeDate = (date: Date): string => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: language === "ja" ? ja : undefined,
    });
  };

  const lowestPrice = getLowestPrice(event.ticket_types);
  const totalSeats = getTotalSeats(event.ticket_types);
  const formattedDate = formatRelativeDate(new Date(event.date));
  const eventName = language === "zh" ? event.name : event.name_ja || event.name;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={
            event.image_url ||
            "https://images.pexels.com/photos/3800541/pexels-photo-3800541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt={eventName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          width={1260}
          height={750}
          priority
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1 line-clamp-2">{eventName}</h3>
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.venue}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">
              {t("common.from", language)} ${(lowestPrice / 100).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              {`${totalSeats} ${t("common.seatsAvailable", language)}`}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button className="w-full">{t("common.viewDetails", language)}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
