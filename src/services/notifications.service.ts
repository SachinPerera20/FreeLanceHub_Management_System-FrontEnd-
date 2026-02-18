import { Notification, NotificationType } from '../types';
import { api } from '../lib/axios';

export const notificationsService = {
  async listByUser(userId: string): Promise<Notification[]> {
    const res = await api.get('/notifications');
    return res.data as Notification[];
  },

  // The state files still call this directly in several places.
  // It's a no-op now because the backend creates notifications as
  // side effects — but returning a dummy keeps TypeScript happy.
  async createNotification(
      userId: string,
      type: NotificationType,
      title: string,
      message: string,
      relatedId: string
  ): Promise<Notification> {
    return {
      id: '',
      userId,
      type,
      title,
      message,
      relatedId,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
  },

  async markRead(notificationId: string): Promise<void> {
    await api.patch(`/notifications/${notificationId}/read`);
  },

  async markAllRead(userId: string): Promise<void> {
    await api.post('/notifications/read-all');
  },

  async getUnreadCount(userId: string): Promise<number> {
    const res = await api.get('/notifications');
    const notifications = res.data as Notification[];
    return notifications.filter((n) => !n.isRead).length;
  },
};