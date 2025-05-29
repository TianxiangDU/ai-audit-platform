import React from 'react';
import { ArrowUp } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ icon: Icon, value, label, change, changeType }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={24} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className={`stat-change ${changeType}`}>
        <ArrowUp size={12} />
        <span>{change}</span>
      </div>
    </div>
  );
};

export default StatCard; 