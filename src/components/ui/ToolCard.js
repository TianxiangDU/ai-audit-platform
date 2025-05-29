import React from 'react';
import { Search, FileText, Scale, BarChart2, AlertTriangle, Shield } from 'lucide-react';

const iconMap = {
  search: Search,
  file: FileText,
  scale: Scale,
  chart: BarChart2,
  alert: AlertTriangle,
  shield: Shield,
};

export const ToolCard = ({ title, icon }) => {
  const Icon = iconMap[icon];

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}; 