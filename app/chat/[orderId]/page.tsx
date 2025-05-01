'use client';

import { ChatInterface } from '@/components/chat/chat-interface';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';
import { languageAtom } from '@/lib/store';
import { useAtom } from 'jotai';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [language] = useAtom(languageAtom);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <div className="mb-6">
          <Link href={`/orders/${orderId}`}>
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.backToOrder', language)}
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4">{t('common.customerSupportChat', language)}</h1>

        <p className="mb-6 text-muted-foreground">{t('common.chatWithSupport', language)}</p>

        <ChatInterface orderId={orderId} />
      </div>
    </div>
  );
}
