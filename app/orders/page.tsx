'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { languageAtom } from '@/lib/store';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhTW, ja } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';
import { t } from '@/lib/i18n';

export default function OrdersPage() {
  const [language] = useAtom(languageAtom);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In a real app, we'd fetch orders from the API
    // For this demo, we're just simulating loading
    const timer = setTimeout(() => {
      setLoading(false);
      setOrders([]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-6">{t('orders.title', language)}</h1>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t('orders.orderId', language)}
                      </p>
                      <p className="font-mono text-sm">{order.id}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t('orders.date', language)}
                      </p>
                      <p>
                        {format(
                          new Date(order.created_at),
                          language === 'zn' ? 'yyyy年MM月dd日' : 'yyyy/MM/dd',
                          { locale: language === 'zn' ? zhTW : ja }
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t('orders.status', language)}
                      </p>
                      <div
                        className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${getStatusColor(order.status)}
                      `}
                      >
                        {t(`orders.statuses.${order.status}`, language)}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t('orders.total', language)}
                      </p>
                      <p className="font-medium">${(order.total_amount / 100).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/10 px-6 py-3 flex justify-end">
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      {t('orders.viewDetails', language)}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-lg font-medium mb-2">{t('orders.noOrders', language)}</h3>
            <p className="text-muted-foreground mb-6">
              {t('orders.noOrdersDescription', language)}
            </p>
            <Link href="/events">
              <Button>{t('orders.browseEvents', language)}</Button>
            </Link>
          </div>
        )}
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
