import { Notification, NotificationType } from '../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  generateId,
  nowISO } from
'../lib/storage';

export const notificationsService = {
  async listByUser(userId: string): Promise<Notification[]> {
    const all = readStore<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return all.
    filter((n) => n.userId === userId).
    sort(
      (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  async createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  relatedId: string)
  : Promise<Notification> {
    const notifications = readStore<Notification[]>(
      STORAGE_KEYS.NOTIFICATIONS,
      []
    );
    const notification: Notification = {
      id: generateId(),
      userId,
      type,
      title,
      message,
      relatedId,
      isRead: false,
      createdAt: nowISO()
    };
    notifications.push(notification);
    writeStore(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return notification;
  },
  async markRead(notificationId: string): Promise<void> {
    const notifications = readStore<Notification[]>(
      STORAGE_KEYS.NOTIFICATIONS,
      []
    );
    const idx = notifications.findIndex((n) => n.id === notificationId);
    if (idx !== -1) {
      notifications[idx].isRead = true;
      writeStore(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
  },
  async markAllRead(userId: string): Promise<void> {
    const notifications = readStore<Notification[]>(
      STORAGE_KEYS.NOTIFICATIONS,
      []
    );
    notifications.forEach((n) => {
      if (n.userId === userId) n.isRead = true;
    });
    writeStore(STORAGE_KEYS.NOTIFICATIONS, notifications);
  },
  async getUnreadCount(userId: string): Promise<number> {
    const all = readStore<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return all.filter((n) => n.userId === userId && !n.isRead).length;
  }
};