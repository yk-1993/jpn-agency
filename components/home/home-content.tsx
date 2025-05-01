"use client";

import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n.config";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { Database } from "@/types/supabase";
import { useAtom } from "jotai";
import Link from "next/link";

type Event = Database["public"]["Tables"]["events"]["Row"] & {
  ticket_types: Database["public"]["Tables"]["ticket_types"]["Row"][];
};

interface HomeContentProps {
  events: Event[];
}

export function HomeContent({ events }: HomeContentProps) {
  const [language] = useAtom<Locale>(languageAtom);
  const upcomingEvents = events.filter((event) => new Date(event.date) > new Date()).slice(0, 4);

  return (
    <div className="space-y-12 py-8">
      {/* Hero section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" />
        <div className="container mx-auto text-center px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t("home.title", language)}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            {t("home.description", language)}
          </p>
          <Link href="/events">
            <Button size="lg" className="rounded-full py-6 px-8 text-lg animate-pulse">
              {t("home.browseEvents", language)}
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured events */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">{t("home.featuredEvents", language)}</h2>
            <Link href="/events">
              <Button variant="outline">{t("home.viewAll", language)}</Button>
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">{t("home.noEvents", language)}</p>
              <p className="mb-8">{t("home.checkBack", language)}</p>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            {t("home.howItWorks", language)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.steps.browse.title", language)}
              </h3>
              <p className="text-muted-foreground">
                {t("home.steps.browse.description", language)}
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.steps.select.title", language)}
              </h3>
              <p className="text-muted-foreground">
                {t("home.steps.select.description", language)}
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.steps.checkout.title", language)}
              </h3>
              <p className="text-muted-foreground">
                {t("home.steps.checkout.description", language)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
