import React from 'react';
import { ArrowUp } from 'lucide-react';

export const StatCard = ({ title, value, change }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {value}
            </dd>
          </div>
          {change && (
            <div className="flex items-center text-green-600">
              <ArrowUp className="h-5 w-5" />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 