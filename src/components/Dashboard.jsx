import React, { useState } from 'react';
import { FileText, Search, ListChecks, DollarSign, Upload, Plus, ArrowUp } from 'lucide-react';
import StatCard from './StatCard';
import UploadArea from './UploadArea';
import ProcessFlow from './ProcessFlow';
import AIAnalysisModal from './AIAnalysisModal';
import NewProjectModal from './NewProjectModal';
import './Dashboard.css';

const Dashboard = () => {
  const [showAIModal, setShowAIModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const statsData = [
    {
      icon: FileText,
      value: '1,248',
      label: 'AI已读取文件',
      change: '+156',
      changeType: 'positive'
    },
    {
      icon: Search,
      value: '86',
      label: '发现审计线索',
      change: '+23',
      changeType: 'positive'
    },
    {
      icon: ListChecks,
      value: '42',
      label: '确认问题',
      change: '+12',
      changeType: 'positive'
    },
    {
      icon: DollarSign,
      value: '¥3.2M',
      label: '风险金额',
      change: '本月识别',
      changeType: 'positive'
    }
  ];

  const handleFileUpload = (files) => {
    console.log('上传文件:', files);
    setShowAIModal(true);
  };

  return (
    <div className="dashboard fade-in">
      <div className="page-header">
        <h1 className="page-title">AI智慧审计工作台</h1>
        <p className="page-subtitle">利用人工智能技术，提升工程审计效率和准确性</p>
      </div>

      {/* 统计数据 */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 快速开始 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">快速开始新的审计项目</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowProjectModal(true)}
          >
            <Plus size={16} />
            新建项目
          </button>
        </div>
        
        <UploadArea onFileUpload={handleFileUpload} />
      </div>

      {/* 审计流程 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">AI智慧审计流程</h2>
        </div>
        
        <ProcessFlow />
      </div>

      {/* 模态框 */}
      {showAIModal && (
        <AIAnalysisModal onClose={() => setShowAIModal(false)} />
      )}
      
      {showProjectModal && (
        <NewProjectModal onClose={() => setShowProjectModal(false)} />
      )}
    </div>
  );
};

export default Dashboard; 