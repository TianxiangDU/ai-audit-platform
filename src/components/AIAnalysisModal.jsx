import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import './AIAnalysisModal.css';

const AIAnalysisModal = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const analysisSteps = [
    '正在解析文档结构...',
    '识别文档类型和格式...',
    '提取关键文本信息...',
    '分析合同条款...',
    '检查数据一致性...',
    '生成审计线索...',
    '完成分析!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / analysisSteps.length);
        if (newProgress >= 100) {
          setIsCompleted(true);
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });

      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    if (isCompleted) {
      alert('AI分析完成！\n\n发现了以下问题：\n1. 投标文件中发现不一致信息\n2. 合同条款存在潜在风险\n3. 报价数据异常\n\n详细结果已保存到项目中。');
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">AI正在分析您的文件</h3>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="ai-analysis">
          <div className={`ai-animation ${!isCompleted ? 'pulse' : ''}`}>
            {isCompleted ? '✅' : '🤖'}
          </div>
          <div className="ai-status">
            {isCompleted ? (
              <div className="completion-message">
                <CheckCircle size={20} color="var(--success-color)" />
                <span>分析完成！发现了 3 个潜在问题</span>
              </div>
            ) : (
              analysisSteps[currentStep]
            )}
          </div>
          <div className="ai-progress-text">
            {isCompleted ? '点击任意位置查看详细结果' : `预计还需要 ${Math.max(1, Math.ceil((analysisSteps.length - currentStep - 1) * 0.5))} 分钟`}
          </div>
        </div>
        
        <div className="progress-section">
          <div className="progress-label">
            <strong>分析进度：</strong>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {Math.round(progress)}% 完成
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisModal; 