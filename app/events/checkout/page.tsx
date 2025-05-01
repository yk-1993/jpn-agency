"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { 
  ticketSelectionAtom, 
  orderFormAtom,
  currentEventAtom,
  loadingAtom,
  errorAtom,
  languageAtom
} from '@/lib/store';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selection] = useAtom(ticketSelectionAtom);
  const [orderForm, setOrderForm] = useAtom(orderFormAtom);
  const [currentEvent] = useAtom(currentEventAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [language] = useAtom(languageAtom);
  
  // Check if we have ticket selections, if not redirect back to events
  useEffect(() => {
    const totalQuantity = Object.values(selection).reduce((sum, qty) => sum + qty, 0);
    if (totalQuantity === 0) {
      router.push('/events');
    }
  }, [selection, router]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate form
      if (!orderForm.customer_name || !orderForm.customer_email || !orderForm.customer_phone) {
        throw new Error('Please fill in all required fields');
      }
      
      // Create order (this would typically call your API endpoint)
      // For demo purposes, we're just showing success and redirecting
      toast({
        title: language === 'en' ? 'Order Created' : '訂單已建立',
        description: language === 'en' 
          ? 'Your order has been created successfully!' 
          : '您的訂單已成功建立！',
      });
      
      // Reset selection
      // Redirect to a success page
      router.push('/events');
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: 'destructive',
        title: language === 'en' ? 'Error' : '錯誤',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Back' : '返回'}
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Checkout' : '結帳'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="border-b bg-muted/50">
                <h2 className="text-xl font-semibold">
                  {language === 'en' ? 'Customer Information' : '顧客資料'}
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">
                      {language === 'en' ? 'Full Name' : '全名'} *
                    </Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={orderForm.customer_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customer_email">
                      {language === 'en' ? 'Email' : '電子郵件'} *
                    </Label>
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
                    <Label htmlFor="customer_phone">
                      {language === 'en' ? 'Phone Number' : '電話號碼'} *
                    </Label>
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
                <h2 className="text-xl font-semibold">
                  {language === 'en' ? 'Order Summary' : '訂單摘要'}
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(selection).map(([ticketTypeId, quantity]) => {
                    if (quantity > 0) {
                      // In a real app, we would look up the ticket details
                      return (
                        <div key={ticketTypeId} className="flex justify-between">
                          <span>
                            {language === 'en' ? 'Ticket' : '票'} x{quantity}
                          </span>
                          <span>${(quantity * 100).toFixed(2)}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>{language === 'en' ? 'Total' : '總計'}</span>
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
                  {language === 'en' ? 'Complete Order' : '完成訂單'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}