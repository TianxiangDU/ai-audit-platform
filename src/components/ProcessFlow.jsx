import React from 'react';
import { Upload, Brain, AlertTriangle, Search, FileText } from 'lucide-react';
import './ProcessFlow.css';

const ProcessFlow = () => {
  const steps = [
    {
      number: 1,
      title: '文件上传',
      description: '上传审计资料',
      icon: Upload
    },
    {
      number: 2,
      title: 'AI解析',
      description: '智能识别关键信息',
      icon: Brain
    },
    {
      number: 3,
      title: '风险识别',
      description: '自动发现潜在问题',
      icon: AlertTriangle
    },
    {
      number: 4,
      title: '线索管理',
      description: '整理审计线索',
      icon: Search
    },
    {
      number: 5,
      title: '报告生成',
      description: '自动生成审计报告',
      icon: FileText
    }
  ];

  return (
    <div className="process-flow">
      <div className="process-line"></div>
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        return (
          <div key={step.number} className="process-step">
            <div className="step-number">
              {step.number}
            </div>
            <div className="step-icon">
              <IconComponent size={20} />
            </div>
            <div className="step-title">{step.title}</div>
            <div className="step-description">{step.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessFlow; 