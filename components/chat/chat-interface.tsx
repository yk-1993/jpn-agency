'use client';

import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { languageAtom } from '@/lib/store';
import { getChatMessages, sendChatMessage, supabase } from '@/lib/supabase';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { Database } from '@/types/supabase';

type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];

interface ChatInterfaceProps {
  orderId: string;
}

export function ChatInterface({ orderId }: ChatInterfaceProps) {
  const [language] = useAtom(languageAtom);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial messages
  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await getChatMessages(orderId);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [orderId]);

  // Subscribe to new messages
  useEffect(() => {
    const channel = supabase
      .channel(`chat:${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `order_id=eq.${orderId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      await sendChatMessage({
        order_id: orderId,
        message: newMessage,
        is_admin: false, // For customer messages
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="border-b bg-muted/50 py-3">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Customer Support' : '客戶支援'}
        </h3>
      </CardHeader>

      <CardContent className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              {language === 'en'
                ? 'No messages yet. Start a conversation!'
                : '還沒有訊息。開始對話吧！'}
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-lg px-4 py-2
                    ${
                      msg.is_admin
                        ? 'bg-muted text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }
                  `}
                >
                  <p className="break-words">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {format(new Date(msg.created_at), language === 'en' ? 'h:mm a' : 'HH:mm', {
                      locale: language === 'zh' ? zhTW : undefined,
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={language === 'en' ? 'Type a message...' : '輸入訊息...'}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
