"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { t } from "@/lib/i18n";
import { languageAtom } from "@/lib/store";
import { getChatMessages, sendChatMessage, supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { useAtom } from "jotai";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FC } from "react";

type ChatMessage = Database["public"]["Tables"]["chat_messages"]["Row"];

interface ChatInterfaceProps {
  orderId: string;
}

/**
 * チャットインターフェースコンポーネント
 * 注文IDに関連するメッセージの送受信を管理します
 */
export const ChatInterface: FC<ChatInterfaceProps> = ({ orderId }) => {
  const [language] = useAtom(languageAtom);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * メッセージを取得します
   */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChatMessages(orderId);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_messages",
          filter: `order_id=eq.${orderId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMessages((prev) => [...prev, payload.new as ChatMessage]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  /**
   * メッセージが変更されたときに最下部にスクロールします
   */
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]); // Added messages as dependency to scroll when new messages arrive

  /**
   * メッセージを送信します
   */
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const messageData = {
        order_id: orderId,
        message: newMessage.trim(),
        is_admin: false,
      };
      
      await sendChatMessage(messageData);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  /**
   * Enterキーでメッセージを送信します
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h3 className="text-lg font-semibold">{t("chat.title", language)}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 h-[400px] overflow-y-auto mb-4">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <p className="text-sm text-muted-foreground">
                {format(
                  new Date(message.created_at || ''),
                  language === "ja" ? "yyyy年MM月dd日 HH:mm" : "yyyy-MM-dd HH:mm",
                  {
                    locale: language === "ja" ? undefined : zhTW,
                  },
                )}
              </p>
              <p className="text-sm">{message.message}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("chat.inputPlaceholder", language)}
            disabled={sending}
          />
          <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};