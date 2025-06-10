import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import type { Notification } from "@/types";

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPopup = ({ isOpen, onClose }: NotificationPopupProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Новое обращение",
      message: "Получено обращение №1234 от пользователя",
      type: "info",
      createdAt: new Date(Date.now() - 300000), // 5 минут назад
      isRead: false,
    },
    {
      id: "2",
      title: "Обращение закрыто",
      message: "Обращение №1230 успешно решено",
      type: "success",
      createdAt: new Date(Date.now() - 3600000), // 1 час назад
      isRead: false,
    },
    {
      id: "3",
      title: "Требуется внимание",
      message: "Обращение №1228 ожидает назначения",
      type: "warning",
      createdAt: new Date(Date.now() - 7200000), // 2 часа назад
      isRead: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}ч назад`;
    if (minutes > 0) return `${minutes}м назад`;
    return "только что";
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "CheckCircle";
      case "error":
        return "XCircle";
      case "warning":
        return "AlertTriangle";
      case "info":
      default:
        return "Info";
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "info":
      default:
        return "text-blue-600";
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end pt-20 pr-4">
      <Card className="w-96 max-h-[80vh] animate-slide-in-right">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" size={20} />
              Уведомления
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={16} />
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs self-start p-0 h-auto"
            >
              Отметить все как прочитанные
            </Button>
          )}
        </CardHeader>

        <CardContent className="max-h-96 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
              <p>Нет уведомлений</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  notification.isRead
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-blue-200 shadow-sm"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name={getNotificationIcon(notification.type) as any}
                    size={16}
                    className={getNotificationColor(notification.type)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-sm font-medium ${
                          notification.isRead
                            ? "text-gray-600"
                            : "text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        notification.isRead ? "text-gray-500" : "text-gray-700"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {getTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPopup;
