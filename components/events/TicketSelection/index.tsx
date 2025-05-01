"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { t } from "@/lib/i18n";
import { languageAtom, ticketSelectionAtom } from "@/lib/store";
import { Database } from "@/types/supabase";
import { useAtom } from "jotai";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type TicketType = Database["public"]["Tables"]["ticket_types"]["Row"];

interface TicketSelectionProps {
  ticketTypes: TicketType[];
}

export function TicketSelection({ ticketTypes }: TicketSelectionProps) {
  const router = useRouter();
  const [language] = useAtom(languageAtom);
  const [selection, setSelection] = useAtom(ticketSelectionAtom);

  const handleQuantityChange = (ticketTypeId: string, quantity: number) => {
    // Ensure quantity is within valid range
    const newQuantity = Math.max(0, Math.min(10, quantity));

    setSelection((prev) => ({
      ...prev,
      [ticketTypeId]: newQuantity,
    }));
  };

  const incrementQuantity = (ticketTypeId: string) => {
    const currentQuantity = selection[ticketTypeId] || 0;
    handleQuantityChange(ticketTypeId, currentQuantity + 1);
  };

  const decrementQuantity = (ticketTypeId: string) => {
    const currentQuantity = selection[ticketTypeId] || 0;
    handleQuantityChange(ticketTypeId, currentQuantity - 1);
  };

  const getTotalPrice = () => {
    return ticketTypes.reduce((total, ticket) => {
      const quantity = selection[ticket.id] || 0;
      return total + ticket.price * quantity;
    }, 0);
  };

  const getTotalQuantity = () => {
    return Object.values(selection).reduce((sum, qty) => sum + qty, 0);
  };

  const handleProceedToCheckout = () => {
    // Store the ticket selection and proceed to checkout
    if (getTotalQuantity() > 0) {
      router.push("/events/checkout");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{t("common.selectTickets", language)}</h3>

      <div className="space-y-4">
        {ticketTypes.map((ticket) => (
          <Card key={ticket.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{ticket.name}</CardTitle>
              <CardDescription>{ticket.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">¥{ticket.price.toLocaleString()}</span>
                <Badge variant="secondary">{ticket.available_seats} seats available</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => decrementQuantity(ticket.id)}
                  disabled={!selection[ticket.id]}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{selection[ticket.id] || 0}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => incrementQuantity(ticket.id)}
                  disabled={selection[ticket.id] === 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="font-medium">
                ¥{((selection[ticket.id] || 0) * ticket.price).toLocaleString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      {getTotalQuantity() > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">{t("common.total", language)}:</span>
              <span className="font-bold text-lg">¥{getTotalPrice().toLocaleString()}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" size="lg" onClick={handleProceedToCheckout}>
              {t("common.proceedToCheckout", language)}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
