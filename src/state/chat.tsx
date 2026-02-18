import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext } from
'react';
import { ChatThread, Message } from '../types';
import { chatService } from '../services/chat.service';
import { notificationsService } from '../services/notifications.service';
import { useAuth } from './auth';
interface ChatState {
  threads: ChatThread[];
  currentThread: ChatThread | null;
  messages: Message[];
  globalUnread: number;
  totalUnreadCount: number;
  loading: boolean;
  isLoading: boolean;
  fetchThreads: () => Promise<void>;
  fetchMessages: (threadId: string) => Promise<void>;
  sendMessage: (
  threadId: string,
  text: string,
  receiverId?: string)
  => Promise<void>;
  markThreadRead: (threadId: string) => Promise<void>;
  getUnreadForThread: (threadId: string) => Promise<number>;
}
const ChatContext = createContext<ChatState | undefined>(undefined);
export function ChatProvider({ children }: {children: ReactNode;}) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [currentThread, setCurrentThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [globalUnread, setGlobalUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const fetchThreads = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setThreads(await chatService.listThreadsForUser(user.id));
    setGlobalUnread(await chatService.getUnreadCountForUser(user.id));
    setLoading(false);
  }, [user]);
  useEffect(() => {
    fetchThreads();
    const interval = setInterval(fetchThreads, 3000);
    return () => clearInterval(interval);
  }, [fetchThreads]);
  const fetchMessages = useCallback(
    async (threadId: string) => {
      setMessages(await chatService.listMessages(threadId));
      const thread = await chatService.getThread(threadId);
      setCurrentThread(thread || null);
      if (user) await chatService.markThreadRead(threadId, user.id);
    },
    [user]
  );
  const sendMessage = useCallback(
    async (threadId: string, text: string, receiverId?: string) => {
      if (!user) return;
      // Block contact information sharing
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
      const phoneRegex = /(\+?\d[\d\s\-()]{7,15})/;
      if (emailRegex.test(text) || phoneRegex.test(text)) {
        return; // silently block at service layer
      }
      let actualReceiverId = receiverId;
      if (!actualReceiverId) {
        const thread = threads.find((t) => t.id === threadId);
        if (thread)
        actualReceiverId =
        thread.clientId === user.id ? thread.freelancerId : thread.clientId;
      }
      const msg = await chatService.sendMessage(threadId, user.id, text);
      setMessages((prev) => [...prev, msg]);
      if (actualReceiverId)
      await notificationsService.createNotification(
        actualReceiverId,
        'message_received',
        'New Message',
        `${user.name} sent you a message`,
        threadId
      );
      await fetchThreads();
    },
    [user, fetchThreads, threads]
  );
  const markThreadRead = useCallback(
    async (threadId: string) => {
      if (!user) return;
      await chatService.markThreadRead(threadId, user.id);
      setGlobalUnread(await chatService.getUnreadCountForUser(user.id));
    },
    [user]
  );
  const getUnreadForThread = useCallback(
    async (threadId: string) => {
      if (!user) return 0;
      return chatService.getUnreadCountForThread(threadId, user.id);
    },
    [user]
  );
  return (
    <ChatContext.Provider
      value={{
        threads,
        currentThread,
        messages,
        globalUnread,
        totalUnreadCount: globalUnread,
        loading,
        isLoading: loading,
        fetchThreads,
        fetchMessages,
        sendMessage,
        markThreadRead,
        getUnreadForThread
      }}>

      {children}
    </ChatContext.Provider>);

}
export function useChat(): ChatState {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}