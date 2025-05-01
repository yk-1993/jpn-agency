"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { Database } from "@/types/supabase";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import { Minus, Plus } from "lucide-react";

type TicketType = Database["public"]["Tables"]["ticket_types"]["Row"];

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  onSelect: (ticketTypeId: string, quantity: number) => void;
}

/**
 * チケット選択コンポーネント
 * チケットタイプと数量の選択を提供します
 */
export const TicketSelection: FC<TicketSelectionProps> = ({ ticketTypes, onSelect }) => {
  const [language] = useAtom(languageAtom);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  /** 数量を更新します */
  const updateQuantity = (ticketTypeId: string, quantity: number): void => {
    const maxSeats = ticketTypes.find((t) => t.id === ticketTypeId)?.available_seats || 0;
    setSelectedQuantities((prev) => ({
      ...prev,
      [ticketTypeId]: Math.max(0, Math.min(quantity, maxSeats)),
    }));
  };

  /** カートに追加 */
  const handleAddToCart = (): void => {
    Object.entries(selectedQuantities).forEach(([id, qty]) => {
      if (qty > 0) onSelect(id, qty);
    });
    setSelectedQuantities({});
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4">
        <h3 className="text-lg font-bold">{t("events.selectTickets", language)}</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        {ticketTypes.map((ticket) => (
          <div key={ticket.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{ticket.name}</p>
              <p className="text-sm text-muted-foreground">
                {t("events.price", language)}: ¥{ticket.price.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("events.availableSeats", language)}: {ticket.available_seats}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(ticket.id, (selectedQuantities[ticket.id] || 0) - 1)}
                disabled={!selectedQuantities[ticket.id]}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min={0}
                max={ticket.available_seats}
                value={selectedQuantities[ticket.id] || 0}
                onChange={(e) => updateQuantity(ticket.id, parseInt(e.target.value) || 0)}
                className="w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(ticket.id, (selectedQuantities[ticket.id] || 0) + 1)}
                disabled={selectedQuantities[ticket.id] === ticket.available_seats}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={Object.values(selectedQuantities).every((qty) => qty === 0)}
        >
          {t("events.addToCart", language)}
        </Button>
      </CardFooter>
    </Card>
  );
};
