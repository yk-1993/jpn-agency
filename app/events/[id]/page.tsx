import { LanguageToggle } from "@/components/events/LanguageToggle";
import { TicketSelection } from "@/components/events/TicketSelection";
import { getEvent } from "@/lib/supabase";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export const revalidate = 60; // Revalidate every minute

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.id);

  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = {
    en: format(eventDate, "EEEE, MMMM d, yyyy"),
    zh: format(eventDate, "yyyy年MM月dd日 EEEE", { locale: zhTW }),
  };

  const formattedTime = {
    en: format(eventDate, "h:mm a"),
    zh: format(eventDate, "HH:mm", { locale: zhTW }),
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <Image
                src={
                  event.image_url ||
                  "https://images.pexels.com/photos/3800541/pexels-photo-3800541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt={event.name}
                className="w-full h-full object-cover"
                width={1260}
                height={750}
                priority
              />
            </div>

            <div>
              <h1
                className="text-3xl font-bold mb-4"
                data-language-en={event.name}
                data-language-zh={event.name_zh || event.name}
              >
                {event.name}
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  <span data-language-en={formattedDate.en} data-language-zh={formattedDate.zh}>
                    {formattedDate.en}
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-2" />
                  <span data-language-en={formattedTime.en} data-language-zh={formattedTime.zh}>
                    {formattedTime.en}
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.venue}</span>
                </div>
              </div>

              <div
                className="prose max-w-none"
                data-language-en={event.description}
                data-language-zh={event.description_zh || event.description}
              >
                <p>{event.description}</p>
              </div>
            </div>
          </div>

          <div>
            <TicketSelection
              ticketTypes={event.ticket_types}
              onSelect={(ticketTypeId, quantity) => {
                console.log(`Selected ${quantity} tickets of type ${ticketTypeId}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
