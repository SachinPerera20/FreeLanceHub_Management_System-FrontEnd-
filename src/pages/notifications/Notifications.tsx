import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../state/notifications';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button } from '../../components/ui/FormControls';
import { Bell, Check, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export function Notifications() {
  const {
    notifications,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    isLoading
  } = useNotifications();
  const navigate = useNavigate();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  const handleNotificationClick = async (notification: any) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    // Navigate based on type
    switch (notification.type) {
      case 'proposal_submitted':
      case 'job_status_changed':
        navigate(`/jobs/${notification.relatedId}`);
        break;
      case 'proposal_accepted':
      case 'contract_created':
      case 'payment_paid':
      case 'payment_failed':
        navigate(`/contracts/${notification.relatedId}`);
        break;
      case 'message_received':
        navigate(`/chat/${notification.relatedId}`);
        break;
      default:
        break;
    }
  };
  return <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        {notifications.some((n) => !n.isRead) && <Button variant="secondary" size="sm" onClick={() => markAllAsRead()}>
            Mark all as read
          </Button>}
      </div>

      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div> : notifications.length > 0 ? <div className="space-y-4 max-w-3xl mx-auto">
          {notifications.map((notification) => <div key={notification.id} onClick={() => handleNotificationClick(notification)} className={`p-4 rounded-xl border cursor-pointer transition-all ${notification.isRead ? 'bg-[#111827]/30 border-gray-800 text-gray-400' : 'bg-[#1f2937]/50 border-teal-900/50 text-white shadow-lg'}`}>
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-full ${notification.isRead ? 'bg-gray-800' : 'bg-teal-900/30 text-teal-400'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm opacity-80 mb-2">
                    {notification.message}
                  </p>
                  <span className="text-xs opacity-50">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true
              })}
                  </span>
                </div>
                {!notification.isRead && <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>}
              </div>
            </div>)}
        </div> : <div className="text-center py-12 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-300">
            No notifications
          </h3>
          <p className="text-gray-500 mt-2">You're all caught up!</p>
        </div>}
    </Layout>;
}