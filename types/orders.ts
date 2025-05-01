import { Database } from './supabase';

export type Order = Omit<Database['public']['Tables']['orders']['Row'], 'user_id' | 'stripe_session_id'> & {
  user_id?: string | null;
  stripe_session_id?: string | null;
  order_items: OrderItem[];
};

export type OrderItem = {
  id: string;
  ticket_type: {
    id: string;
    name: string;
    name_ja: string;
    name_zh: string;
    price: number;
    event_id: string;
  };
  quantity: number;
  unit_price: number;
}; 