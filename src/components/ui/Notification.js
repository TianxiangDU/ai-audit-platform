import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

// 通知Context
const NotificationContext = createContext();

// 通知类型配置
const notificationConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600'
  },
  error: {
    icon: AlertTriangle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-600'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    iconColor: 'text-amber-600'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600'
  }
};

// 单个通知组件
const NotificationItem = ({ notification, onClose }) => {
  const { type, title, message, duration = 5000 } = notification;
  const config = notificationConfig[type] || notificationConfig.info;
  const IconComponent = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, notification.id, onClose]);

  return (
    <div className={`mb-4 p-4 rounded-lg border ${config.bgColor} ${config.borderColor} shadow-sm`}>
      <div className="flex items-start">
        <IconComponent className={`h-5 w-5 ${config.iconColor} mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-medium ${config.textColor} mb-1`}>
              {title}
            </h4>
          )}
          <p className={`text-sm ${config.textColor}`}>
            {message}
          </p>
        </div>
        <button
          onClick={() => onClose(notification.id)}
          className={`ml-3 ${config.textColor} hover:opacity-75 transition-opacity`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// 通知容器组件
const NotificationContainer = ({ notifications, onClose }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

// 通知Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = { id, ...notification };
    
    setNotifications(prev => [...prev, newNotification]);
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // 便捷方法
  const showSuccess = (message, title = '成功') => {
    return addNotification({ type: 'success', title, message });
  };

  const showError = (message, title = '错误') => {
    return addNotification({ type: 'error', title, message, duration: 0 });
  };

  const showWarning = (message, title = '警告') => {
    return addNotification({ type: 'warning', title, message });
  };

  const showInfo = (message, title = '提示') => {
    return addNotification({ type: 'info', title, message });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onClose={removeNotification} 
      />
    </NotificationContext.Provider>
  );
};

// Hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationProvider; 