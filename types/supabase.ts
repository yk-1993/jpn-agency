export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          created_at: string | null;
          id: string;
          is_admin: boolean;
          message: string;
          order_id: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_admin?: boolean;
          message: string;
          order_id: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_admin?: boolean;
          message?: string;
          order_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          created_at: string | null;
          date: string;
          description_ja: string | null;
          description_zh: string | null;
          id: string;
          image_url: string | null;
          location_ja: string | null;
          location_zh: string | null;
          name_ja: string | null;
          name_zh: string | null;
        };
        Insert: {
          created_at?: string | null;
          date: string;
          description_ja?: string | null;
          description_zh?: string | null;
          id?: string;
          image_url?: string | null;
          location_ja?: string | null;
          location_zh?: string | null;
          name_ja?: string | null;
          name_zh?: string | null;
        };
        Update: {
          created_at?: string | null;
          date?: string;
          description_ja?: string | null;
          description_zh?: string | null;
          id?: string;
          image_url?: string | null;
          location_ja?: string | null;
          location_zh?: string | null;
          name_ja?: string | null;
          name_zh?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string | null;
          id: string;
          order_id: string;
          quantity: number;
          ticket_type_id: string;
          unit_price: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          order_id: string;
          quantity: number;
          ticket_type_id: string;
          unit_price: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          order_id?: string;
          quantity?: number;
          ticket_type_id?: string;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_ticket_type_id_fkey";
            columns: ["ticket_type_id"];
            isOneToOne: false;
            referencedRelation: "ticket_types";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string | null;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          id: string;
          status: string;
          stripe_session_id: string | null;
          total_amount: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          id?: string;
          status?: string;
          stripe_session_id?: string | null;
          total_amount: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          customer_email?: string;
          customer_name?: string;
          customer_phone?: string;
          id?: string;
          status?: string;
          stripe_session_id?: string | null;
          total_amount?: number;
          user_id?: string | null;
        };
        Relationships: [];
      };
      ticket_types: {
        Row: {
          available_seats: number;
          created_at: string | null;
          description: string | null;
          event_id: string;
          id: string;
          name: string;
          price: number;
        };
        Insert: {
          available_seats: number;
          created_at?: string | null;
          description?: string | null;
          event_id: string;
          id?: string;
          name: string;
          price: number;
        };
        Update: {
          available_seats?: number;
          created_at?: string | null;
          description?: string | null;
          event_id?: string;
          id?: string;
          name?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
