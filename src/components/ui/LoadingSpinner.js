import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ 
  size = 'default', 
  text = '加载中...', 
  className = '',
  showText = true 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
      {showText && <span className="text-gray-600">{text}</span>}
    </div>
  );
};

export const PageLoading = ({ text = '页面加载中...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" text={text} />
        <p className="mt-4 text-gray-500">请稍候...</p>
      </div>
    </div>
  );
};

export const CardLoading = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}; 