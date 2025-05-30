import React from 'react';
import { Home, Wrench, FileText, BarChart2 } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: '首页', active: true },
    { icon: Wrench, label: '审计工具' },
    { icon: FileText, label: '项目管理' },
    { icon: BarChart2, label: '数据分析' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm h-screen">
      <nav className="mt-5 px-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              item.active
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}; 