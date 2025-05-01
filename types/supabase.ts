export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          name: string;
          name_zh: string | null;
          name_ja: string | null;
          description: string | null;
          description_zh: string | null;
          description_ja: string | null;
          date: string;
          venue: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_zh?: string | null;
          name_ja?: string | null;
          description?: string | null;
          description_zh?: string | null;
          description_ja?: string | null;
          date: string;
          venue: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_zh?: string | null;
          name_ja?: string | null;
          description?: string | null;
          description_zh?: string | null;
          description_ja?: string | null;
          date?: string;
          venue?: string;
          image_url?: string | null;
          created_at?: string;
        };
      };
      ticket_types: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          description: string | null;
          price: number;
          available_seats: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          name: string;
          description?: string | null;
          price: number;
          available_seats: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          available_seats?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          status: string;
          total_amount: number;
          stripe_session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          status?: string;
          total_amount: number;
          stripe_session_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          status?: string;
          total_amount?: number;
          stripe_session_id?: string | null;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          ticket_type_id: string;
          quantity: number;
          unit_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          ticket_type_id: string;
          quantity: number;
          unit_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          ticket_type_id?: string;
          quantity?: number;
          unit_price?: number;
          created_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          order_id: string;
          user_id: string | null;
          is_admin: boolean;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          user_id?: string | null;
          is_admin?: boolean;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          user_id?: string | null;
          is_admin?: boolean;
          message?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
