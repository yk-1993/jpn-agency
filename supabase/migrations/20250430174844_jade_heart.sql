/*
  # Create events schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `name_zh` (text) - Traditional Chinese localization
      - `description` (text)
      - `description_zh` (text) - Traditional Chinese localization
      - `date` (timestamptz)
      - `venue` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
    - `ticket_types`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `price` (integer) - in cents
      - `available_seats` (integer)
      - `created_at` (timestamptz)
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `status` (text) - 'pending', 'paid', 'processing', 'completed'
      - `total_amount` (integer) - in cents
      - `created_at` (timestamptz)
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `ticket_type_id` (uuid, foreign key)
      - `quantity` (integer)
      - `unit_price` (integer) - in cents
      - `created_at` (timestamptz)
    - `chat_messages`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `is_admin` (boolean)
      - `message` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and write their own data
*/

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_zh text,
  description text,
  description_zh text,
  date timestamptz NOT NULL,
  venue text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Ticket types table
CREATE TABLE IF NOT EXISTS ticket_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price integer NOT NULL, -- in cents
  available_seats integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid, -- can be null for guest checkouts
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'processing', 'completed'
  total_amount integer NOT NULL, -- in cents
  stripe_session_id text,
  created_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  ticket_type_id uuid NOT NULL REFERENCES ticket_types(id),
  quantity integer NOT NULL,
  unit_price integer NOT NULL, -- in cents
  created_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  user_id uuid,
  is_admin boolean NOT NULL DEFAULT false,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for events table
CREATE POLICY "Anyone can read events" 
  ON events FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert events" 
  ON events FOR INSERT 
  TO authenticated
  WITH CHECK (auth.jwt() ? 'admin_role');

CREATE POLICY "Only admins can update events" 
  ON events FOR UPDATE 
  TO authenticated
  USING (auth.jwt() ? 'admin_role');

-- Create policies for ticket_types table
CREATE POLICY "Anyone can read ticket types" 
  ON ticket_types FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert ticket types" 
  ON ticket_types FOR INSERT 
  TO authenticated
  WITH CHECK (auth.jwt() ? 'admin_role');

CREATE POLICY "Only admins can update ticket types" 
  ON ticket_types FOR UPDATE 
  TO authenticated
  USING (auth.jwt() ? 'admin_role');

-- Create policies for orders table
CREATE POLICY "Users can read their own orders" 
  ON orders FOR SELECT 
  USING (auth.uid() = user_id OR auth.jwt() ? 'admin_role');

CREATE POLICY "Users can insert their own orders" 
  ON orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own orders" 
  ON orders FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can update any order" 
  ON orders FOR UPDATE 
  TO authenticated
  USING (auth.jwt() ? 'admin_role');

-- Create policies for order_items table
CREATE POLICY "Users can read their own order items" 
  ON order_items FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR auth.jwt() ? 'admin_role')
  ));

CREATE POLICY "Users can insert their own order items" 
  ON order_items FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
  ));

-- Create policies for chat_messages table
CREATE POLICY "Users can read their own chat messages" 
  ON chat_messages FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = chat_messages.order_id 
    AND (orders.user_id = auth.uid() OR auth.jwt() ? 'admin_role')
  ));

CREATE POLICY "Users can insert their own chat messages" 
  ON chat_messages FOR INSERT 
  WITH CHECK (
    (user_id = auth.uid() AND EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = chat_messages.order_id 
      AND orders.user_id = auth.uid()
    ))
    OR 
    (is_admin = true AND auth.jwt() ? 'admin_role')
  );