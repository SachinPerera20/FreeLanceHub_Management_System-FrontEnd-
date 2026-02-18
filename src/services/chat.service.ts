import { ChatThread, Message } from '../types';
import { api } from '../lib/axios';

export const chatService = {
  async listThreadsForUser(userId: string): Promise<ChatThread[]> {
    const res = await api.get('/chat/threads');
    return res.data as ChatThread[];
  },

  async getThread(threadId: string): Promise<ChatThread | undefined> {
    try {
      const res = await api.get(`/chat/threads/${threadId}`);
      return res.data as ChatThread;
    } catch {
      return undefined;
    }
  },

  async createThread(jobId: string, clientId: string, freelancerId: string): Promise<ChatThread> {
    const res = await api.post('/chat/threads', { jobId, clientId, freelancerId });
    return res.data as ChatThread;
  },

  async listMessages(threadId: string): Promise<Message[]> {
    const res = await api.get(`/chat/threads/${threadId}/messages`);
    return res.data as Message[];
  },

  async sendMessage(threadId: string, senderId: string, text: string): Promise<Message> {
    const res = await api.post(`/chat/threads/${threadId}/messages`, { text });
    return res.data as Message;
  },

  async markThreadRead(threadId: string, userId: string): Promise<void> {
    await api.post(`/chat/threads/${threadId}/read`);
  },

  async getUnreadCountForUser(userId: string): Promise<number> {
    const res = await api.get('/chat/unread-count');
    return (res.data as { count: number }).count;
  },

  async getUnreadCountForThread(threadId: string, userId: string): Promise<number> {
    try {
      const res = await api.get(`/chat/threads/${threadId}/messages`);
      const messages = res.data as Message[];
      return messages.filter(
          (m) => m.senderId !== userId && !m.readBy.includes(userId)
      ).length;
    } catch {
      return 0;
    }
  },
};