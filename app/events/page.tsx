'use client';

import { getEvents } from '@/lib/supabase';
import { EventCard } from '@/components/events/event-card';
import { useAtom } from 'jotai';
import { languageAtom } from '@/lib/store';
import { t } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { Database } from '@/types/supabase';

type Event = Database['public']['Tables']['events']['Row'] & {
  ticket_types: Database['public']['Tables']['ticket_types']['Row'][];
};

export const revalidate = 60; // Revalidate every minute

export default function EventsPage() {
  const [language] = useAtom(languageAtom);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-6">{t('events.allEvents', language)}</h1>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              {t('events.noEventsFound', language)}
            </p>
            <p>{t('events.checkBackSoon', language)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
