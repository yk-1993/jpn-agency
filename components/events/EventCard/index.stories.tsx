import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from './index';
import { Database } from '@/types/supabase';

const meta: Meta<typeof EventCard> = {
  title: 'Events/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventCard>;

const mockEvent: Database['public']['Tables']['events']['Row'] & {
  ticket_types: Database['public']['Tables']['ticket_types']['Row'][];
} = {
  id: '1',
  name: 'Summer Music Festival',
  name_zh: null,
  name_ja: 'サマーミュージックフェスティバル',
  description: 'A great summer music festival',
  description_zh: null,
  description_ja: '素晴らしい夏の音楽祭',
  date: new Date().toISOString(),
  venue: 'Tokyo Dome',
  image_url: 'https://images.pexels.com/photos/3800541/pexels-photo-3800541.jpeg',
  created_at: new Date().toISOString(),
  ticket_types: [
    {
      id: '1',
      event_id: '1',
      name: 'General Admission',
      description: 'Standard ticket for the event',
      price: 5000,
      available_seats: 100,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      event_id: '1',
      name: 'VIP',
      description: 'VIP ticket with special benefits',
      price: 10000,
      available_seats: 50,
      created_at: new Date().toISOString(),
    },
  ],
};

export const Default: Story = {
  args: {
    event: mockEvent,
  },
};
