'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { languageAtom } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const [language] = useAtom(languageAtom);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // In a real app, we would fetch the order details from the API
    // For this demo, we're simulating loading and creating a mock order
    const timer = setTimeout(() => {
      setLoading(false);
      setOrder({
        id: orderId,
        status: 'paid',
        total_amount: 10000, // $100.00
        created_at: new Date().toISOString(),
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        customer_phone: '+123456789',
        order_items: [
          {
            id: '1',
            quantity: 2,
            unit_price: 5000, // $50.00
            ticket_type: {
              name: 'General Admission',
              event_id: 'event-123',
            },
          },
        ],
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderId]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back' : '返回'}
          </Button>

          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Order Not Found' : '找不到訂單'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === 'en'
                ? 'The order you are looking for does not exist or you do not have permission to view it.'
                : '您要查找的訂單不存在或您無權查看。'}
            </p>
            <Link href="/orders">
              <Button>{language === 'en' ? 'View All Orders' : '查看所有訂單'}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Back' : '返回'}
        </Button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{language === 'en' ? 'Order Details' : '訂單詳情'}</h1>

          <Link href={`/chat/${order.id}`}>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Support Chat' : '支援對話'}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="border-b bg-muted/50">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {language === 'en' ? 'Order Summary' : '訂單摘要'}
                  </h2>
                  <div
                    className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${getStatusColor(order.status)}
                  `}
                  >
                    {getStatusText(order.status, language)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'Order ID' : '訂單編號'}
                      </p>
                      <p className="font-mono text-sm">{order.id}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'Date' : '日期'}
                      </p>
                      <p>
                        {format(
                          new Date(order.created_at),
                          language === 'en' ? 'MMMM d, yyyy' : 'yyyy年MM月dd日',
                          { locale: language === 'zh' ? zhTW : undefined }
                        )}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <h3 className="font-medium">{language === 'en' ? 'Tickets' : '票券'}</h3>

                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.ticket_type.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Quantity' : '數量'}: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${((item.unit_price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>{language === 'en' ? 'Total' : '總計'}</span>
                    <span>${(order.total_amount / 100).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="border-b bg-muted/50">
                <h2 className="text-xl font-semibold">
                  {language === 'en' ? 'Customer Information' : '顧客資料'}
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Name' : '姓名'}
                    </p>
                    <p>{order.customer_name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Email' : '電子郵件'}
                    </p>
                    <p>{order.customer_email}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Phone' : '電話'}
                    </p>
                    <p>{order.customer_phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader className="border-b bg-muted/50">
                  <h2 className="text-xl font-semibold">
                    {language === 'en' ? 'Need Help?' : '需要幫助？'}
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'en' ? 'Have a question about your order?' : '對您的訂單有疑問？'}
                  </p>
                  <Link href={`/chat/${order.id}`}>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Contact Support' : '聯繫支援'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'paid':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-purple-100 text-purple-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusText(status: string, language: 'en' | 'zh') {
  if (language === 'en') {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'paid':
        return 'Paid';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  } else {
    switch (status) {
      case 'pending':
        return '待處理';
      case 'paid':
        return '已付款';
      case 'processing':
        return '處理中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  }
}
