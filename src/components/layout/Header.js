import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Settings, Bot, Menu, X } from 'lucide-react';
import { AIProcessDrawer } from '../ui/AIProcessDrawer';
import logo from '../../assets/logo.svg';

export const Header = () => {
  const location = useLocation();
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { path: '/', label: '首页' },
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
            {/* 左侧Logo和公司信息 */}
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="青矩未来Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">青矩未来</h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">AI智慧工程审计平台</p>
              </div>
            </div>
            
            {/* 桌面端操作按钮 */}
            <div className="hidden md:flex items-center space-x-4">
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

            {/* 移动端汉堡菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          
          {/* 桌面端选项卡导航 */}
          <div className="hidden md:block border-t border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
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

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveTab(tab.path)
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
            
            {/* 移动端操作按钮 */}
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="flex items-center justify-around">
                <button 
                  onClick={() => {
                    setIsAIDrawerOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center p-2 text-gray-500 hover:text-gray-700 relative"
                >
                  <Bot className="h-6 w-6" />
                  <span className="text-xs mt-1">AI监控</span>
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full animate-pulse"></span>
                </button>
                <button className="flex flex-col items-center p-2 text-gray-500 hover:text-gray-700">
                  <Bell className="h-6 w-6" />
                  <span className="text-xs mt-1">通知</span>
                </button>
                <button className="flex flex-col items-center p-2 text-gray-500 hover:text-gray-700">
                  <Settings className="h-6 w-6" />
                  <span className="text-xs mt-1">设置</span>
                </button>
                <button className="flex flex-col items-center p-2 text-gray-500 hover:text-gray-700">
                  <User className="h-6 w-6" />
                  <span className="text-xs mt-1">个人</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* AI进程抽屉 */}
      <AIProcessDrawer 
        isOpen={isAIDrawerOpen} 
        onClose={() => setIsAIDrawerOpen(false)} 
      />
    </>
  );
}; 