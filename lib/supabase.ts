import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to fetch events
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  // Get ticket types for each event
  const eventsWithTickets = await Promise.all(
    data.map(async (event) => {
      const { data: ticketTypes } = await supabase
        .from('ticket_types')
        .select('*')
        .eq('event_id', event.id);

      return {
        ...event,
        ticket_types: ticketTypes || []
      };
    })
  );

  return eventsWithTickets;
}

// Helper function to fetch a single event
export async function getEvent(id: string) {
  const { data, error } = await supabase.from('events').select(`
    *,
    ticket_types (*)
  `).eq('id', id).single();

  if (error) {
    console.error('Error fetching event:', error);
    throw error;
  }

  return data;
}

// Helper function to create an order
export async function createOrder(orderData: any) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }

  return data;
}

// Helper function to create order items
export async function createOrderItems(orderItems: any[]) {
  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select();

  if (error) {
    console.error('Error creating order items:', error);
    throw error;
  }

  return data;
}

// Helper function to get an order by ID
export async function getOrder(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        ticket_type: ticket_types (*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    throw error;
  }

  return data;
}

// Helper function to get chat messages for an order
export async function getChatMessages(orderId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }

  return data;
}

// Helper function to send a chat message
export async function sendChatMessage(message: any) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([message])
    .select()
    .single();

  if (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }

  return data;
}

// Helper function to update order status
export async function updateOrderStatus(orderId: string, status: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }

  return data;
}