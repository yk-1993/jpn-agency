'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import {
  ticketSelectionAtom,
  orderFormAtom,
  currentEventAtom,
  loadingAtom,
  errorAtom,
  languageAtom,
} from '@/lib/store';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';

export default function CheckoutPage() {
  const router = useRouter();
  const [selection] = useAtom(ticketSelectionAtom);
  const [orderForm, setOrderForm] = useAtom(orderFormAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [language] = useAtom(languageAtom);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!orderForm.customer_name || !orderForm.customer_email || !orderForm.customer_phone) {
        throw new Error('Please fill in all required fields');
      }

      // Create order (this would typically call your API endpoint)
      // For demo purposes, we're just showing success and redirecting
      toast({
        title: t('common.success', language),
        description: t('checkout.orderCreated', language),
      });

      // Reset selection
      // Redirect to a success page
      router.push('/events');
    } catch (err: unknown) {
      toast({
        title: t('common.error', language),
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back', language)}
        </Button>

        <h1 className="text-3xl font-bold mb-6">{t('checkout.title', language)}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="border-b bg-muted/50">
                <h2 className="text-xl font-semibold">{t('checkout.customerInfo', language)}</h2>
              </CardHeader>
              <CardContent className="p-6">
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">{t('checkout.fullName', language)} *</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={orderForm.customer_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_email">{t('checkout.email', language)} *</Label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      value={orderForm.customer_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_phone">{t('checkout.phone', language)} *</Label>
                    <Input
                      id="customer_phone"
                      name="customer_phone"
                      value={orderForm.customer_phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="border-b bg-muted/50">
                <h2 className="text-xl font-semibold">{t('orders.summary', language)}</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(selection).map(([ticketTypeId, quantity]) => {
                    if (quantity > 0) {
                      return (
                        <div key={ticketTypeId} className="flex justify-between">
                          <span>
                            {t('orders.ticket', language)} x{quantity}
                          </span>
                          <span>${(quantity * 100).toFixed(2)}</span>
                        </div>
                      );
                    }
                    return null;
                  })}

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>{t('orders.total', language)}</span>
                    <span>$100.00</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full"
                  size="lg"
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('orders.completeOrder', language)}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
