import { ChatThread, Message } from '../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  generateId,
  nowISO } from
'../lib/storage';

export const chatService = {
  async listThreadsForUser(userId: string): Promise<ChatThread[]> {
    const all = readStore<ChatThread[]>(STORAGE_KEYS.CHAT_THREADS, []);
    return all.
    filter((t) => t.clientId === userId || t.freelancerId === userId).
    sort(
      (a, b) =>
      new Date(b.lastMessageAt).getTime() -
      new Date(a.lastMessageAt).getTime()
    );
  },
  async getThread(threadId: string): Promise<ChatThread | undefined> {
    const all = readStore<ChatThread[]>(STORAGE_KEYS.CHAT_THREADS, []);
    return all.find((t) => t.id === threadId);
  },
  async createThread(
  jobId: string,
  clientId: string,
  freelancerId: string)
  : Promise<ChatThread> {
    const threads = readStore<ChatThread[]>(STORAGE_KEYS.CHAT_THREADS, []);
    const existing = threads.find(
      (t) =>
      t.jobId === jobId &&
      t.clientId === clientId &&
      t.freelancerId === freelancerId
    );
    if (existing) return existing;
    const now = nowISO();
    const thread: ChatThread = {
      id: generateId(),
      jobId,
      clientId,
      freelancerId,
      createdAt: now,
      lastMessageAt: now
    };
    threads.push(thread);
    writeStore(STORAGE_KEYS.CHAT_THREADS, threads);
    return thread;
  },
  async listMessages(threadId: string): Promise<Message[]> {
    const all = readStore<Message[]>(STORAGE_KEYS.MESSAGES, []);
    return all.
    filter((m) => m.threadId === threadId).
    sort(
      (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  },
  async sendMessage(
  threadId: string,
  senderId: string,
  text: string)
  : Promise<Message> {
    const messages = readStore<Message[]>(STORAGE_KEYS.MESSAGES, []);
    const now = nowISO();
    const message: Message = {
      id: generateId(),
      threadId,
      senderId,
      text,
      createdAt: now,
      readBy: [senderId]
    };
    messages.push(message);
    writeStore(STORAGE_KEYS.MESSAGES, messages);
    const threads = readStore<ChatThread[]>(STORAGE_KEYS.CHAT_THREADS, []);
    const tIdx = threads.findIndex((t) => t.id === threadId);
    if (tIdx !== -1) {
      threads[tIdx].lastMessageAt = now;
      writeStore(STORAGE_KEYS.CHAT_THREADS, threads);
    }
    return message;
  },
  async markThreadRead(threadId: string, userId: string): Promise<void> {
    const messages = readStore<Message[]>(STORAGE_KEYS.MESSAGES, []);
    let changed = false;
    messages.forEach((m) => {
      if (m.threadId === threadId && !m.readBy.includes(userId)) {
        m.readBy.push(userId);
        changed = true;
      }
    });
    if (changed) writeStore(STORAGE_KEYS.MESSAGES, messages);
  },
  async getUnreadCountForUser(userId: string): Promise<number> {
    const threads = readStore<ChatThread[]>(STORAGE_KEYS.CHAT_THREADS, []);
    const userThreadIds = threads.
    filter((t) => t.clientId === userId || t.freelancerId === userId).
    map((t) => t.id);
    const messages = readStore<Message[]>(STORAGE_KEYS.MESSAGES, []);
    return messages.filter(
      (m) =>
      userThreadIds.includes(m.threadId) &&
      m.senderId !== userId &&
      !m.readBy.includes(userId)
    ).length;
  },
  async getUnreadCountForThread(
  threadId: string,
  userId: string)
  : Promise<number> {
    const messages = readStore<Message[]>(STORAGE_KEYS.MESSAGES, []);
    return messages.filter(
      (m) =>
      m.threadId === threadId &&
      m.senderId !== userId &&
      !m.readBy.includes(userId)
    ).length;
  }
};