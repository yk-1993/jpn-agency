import { createOrder, createOrderItems } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { NextResponse } from 'next/server';

type OrderItem = Database['public']['Tables']['order_items']['Insert'];

export async function POST(request: Request) {
  try {
    const { orderData, orderItems } = await request.json();

    // Create the order
    const order = await createOrder(orderData);

    // Create order items
    const items = await createOrderItems(
      orderItems.map((item: OrderItem) => ({
        ...item,
        order_id: order.id,
      }))
    );

    // In a real application, you would create a Stripe session here
    // This is where you'd integrate with Stripe
    const stripeSessionId = 'mock_stripe_session_' + Math.random().toString(36).substring(2);

    // Update the order with the Stripe session ID
    // In a real app, you would use updateOrder helper function

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        stripe_session_id: stripeSessionId,
        items,
      },
    });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
