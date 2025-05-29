import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Settings, Bot } from 'lucide-react';
import { AIProcessDrawer } from '../ui/AIProcessDrawer';

export const Header = () => {
  const location = useLocation();
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);

  const tabs = [
    { path: '/', label: '工作台' },
    { path: '/projects', label: '项目管理' },
    { path: '/knowledge', label: '审计知识库' },
    { path: '/tools', label: '审计工具' },
    { path: '/system', label: '系统管理' },
  ];

  const isActiveTab = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">AI智慧工程审计平台</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsAIDrawerOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative"
                title="AI进程监控"
              >
                <Bot className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* 选项卡导航 */}
          <div className="border-t border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    isActiveTab(tab.path)
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* AI进程抽屉 */}
      <AIProcessDrawer 
        isOpen={isAIDrawerOpen} 
        onClose={() => setIsAIDrawerOpen(false)} 
      />
    </>
  );
}; 