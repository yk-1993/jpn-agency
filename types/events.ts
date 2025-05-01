import { Database } from './supabase';

export type Event = Database['public']['Tables']['events']['Row'] & {
  ticket_types: Database['public']['Tables']['ticket_types']['Row'][];
};

export type TicketType = Database['public']['Tables']['ticket_types']['Row']; 