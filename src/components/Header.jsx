import React from 'react';
import { Bot, Home, Wrench, FolderOpen, BarChart3, Bell, User } from 'lucide-react';
import './Header.css';

const Header = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: '工作台', icon: Home },
    { id: 'tools', label: '审计工具', icon: Wrench },
    { id: 'projects', label: '项目管理', icon: FolderOpen },
    { id: 'analysis', label: '数据分析', icon: BarChart3 },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <Bot size={24} />
          </div>
          <div className="logo-text">
            <div className="logo-title">AI智慧工程审计平台</div>
            <div className="logo-subtitle">青矩未来</div>
          </div>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="user-menu">
          <button className="user-btn">
            <Bell size={18} />
          </button>
          <div className="user-avatar">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 