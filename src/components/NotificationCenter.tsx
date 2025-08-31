import React, { useState } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

// NEW: Interface to define the shape of a notification
export interface INotification {
  id: string;
  type: 'critical' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationCenterProps {
  notifications: INotification[];
  onPanelOpen: () => void;
}

export function NotificationCenter({ notifications, onPanelOpen }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false); // State to control viewing all notifications

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const notificationsToDisplay = showAll ? notifications : notifications.slice(0, 5); // Show top 5 initially

  const getNotificationIcon = (type: string) => { /* ... unchanged ... */ switch (type) { case 'critical': return AlertTriangle; case 'success': return CheckCircle; case 'warning': return Clock; default: return Bell; } };
  const getNotificationColor = (type: string) => { /* ... unchanged ... */ switch (type) { case 'critical': return 'text-red-600'; case 'success': return 'text-green-600'; case 'warning': return 'text-yellow-600'; default: return 'text-blue-600'; } };

  const handleToggle = () => {
    if (!isOpen && unreadCount > 0) {
      onPanelOpen(); // Mark as read only when opening with unread items
    }
    setIsOpen(!isOpen);
    setShowAll(false); // Reset to summary view every time it's opened/closed
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount > 9 ? '9+' : unreadCount}</span>)}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={handleToggle} />
          <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200"><div className="flex items-center justify-between"><h3 className="font-semibold text-gray-900">Notifications</h3><button onClick={handleToggle} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button></div></div>
            <div className="max-h-96 overflow-y-auto">
              {notificationsToDisplay.length > 0 ? notificationsToDisplay.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div key={notification.id} className={`p-4 border-b border-gray-100 transition-colors ${!notification.isRead ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-start space-x-3"><Icon className={`w-5 h-5 mt-0.5 ${getNotificationColor(notification.type)}`} /><div className="flex-1"><h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4><p className="text-sm text-gray-600 mt-1">{notification.message}</p><p className="text-xs text-gray-500 mt-2">{notification.timestamp.toLocaleTimeString()}</p></div>
                    {!notification.isRead && (<div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />)}
                    </div>
                  </div>
                );
              }) : <p className="p-4 text-sm text-gray-500">No notifications.</p>}
            </div>
            <div className="p-4 border-t border-gray-200">
              {/* UPDATED: This button now toggles the 'showAll' state */}
              <button onClick={() => setShowAll(!showAll)} className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                {showAll ? 'Show Less' : `View All Notifications (${notifications.length})`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}