import React, { useCallback, useEffect, useState, createContext, useContext } from 'react';
import { Notification } from '../types';
import { notificationsService } from '../services/notifications.service';
import { useAuth } from './auth';
interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  markAllAsRead: () => Promise<void>;
}
const NotificationsContext = createContext<NotificationsState | undefined>(undefined);
export function NotificationsProvider({
  children


}: {children: ReactNode;}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    user
  } = useAuth();
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setNotifications(await notificationsService.listByUser(user.id));
    setUnreadCount(await notificationsService.getUnreadCount(user.id));
    setLoading(false);
  }, [user]);
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 3000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);
  const markRead = useCallback(async (id: string) => {
    await notificationsService.markRead(id);
    setNotifications((prev) => prev.map((n) => n.id === id ? {
      ...n,
      isRead: true
    } : n));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);
  const markAllRead = useCallback(async () => {
    if (!user) return;
    await notificationsService.markAllRead(user.id);
    setNotifications((prev) => prev.map((n) => ({
      ...n,
      isRead: true
    })));
    setUnreadCount(0);
  }, [user]);
  return <NotificationsContext.Provider value={{
    notifications,
    unreadCount,
    loading,
    isLoading: loading,
    fetchNotifications,
    markRead,
    markAsRead: markRead,
    markAllRead,
    markAllAsRead: markAllRead
  }}>
      {children}
    </NotificationsContext.Provider>;
}
export function useNotifications(): NotificationsState {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}