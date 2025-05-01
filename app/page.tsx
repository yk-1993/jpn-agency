import { HomeContent } from '@/components/home/home-content';
import { getEvents } from '@/lib/supabase';
import { Suspense } from 'react';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const events = await getEvents();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent events={events} />
    </Suspense>
  );
}
