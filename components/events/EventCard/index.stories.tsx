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
  name: 'サマーミュージックフェスティバル',
  name_zh: null,
  name_ja: 'サマーミュージックフェスティバル',
  description: '素晴らしい夏の音楽祭',
  description_zh: null,
  description_ja: '素晴らしい夏の音楽祭',
  date: new Date().toISOString(),
  venue: '東京ドーム',
  image_url: 'https://images.pexels.com/photos/3800541/pexels-photo-3800541.jpeg',
  created_at: new Date().toISOString(),
  ticket_types: [
    {
      id: '1',
      event_id: '1',
      name: '一般入場券',
      description: 'イベントの標準チケット',
      price: 5000,
      available_seats: 100,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      event_id: '1',
      name: 'VIPチケット',
      description: '特別特典付きVIPチケット',
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
