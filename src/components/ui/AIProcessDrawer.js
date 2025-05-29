import React, { useState, useEffect } from 'react';
import { X, Bot, Clock, CheckCircle, AlertTriangle, FileText, Search, Target, Zap } from 'lucide-react';

export const AIProcessDrawer = ({ isOpen, onClose }) => {
  const [processes, setProcesses] = useState([]);
  const [activeProcess, setActiveProcess] = useState(null);

  // 模拟AI进程数据
  const aiProcesses = [
    {
      id: 1,
      name: '文档智能分析',
      status: 'running',
      progress: 75,
      startTime: '2024-01-20 14:30:25',
      steps: [
        { id: 1, name: '文档上传处理', status: 'completed', time: '14:30:25', details: '已上传45个文件，总大小156MB' },
        { id: 2, name: 'OCR文字识别', status: 'completed', time: '14:31:12', details: '识别文档内容，准确率98.5%' },
        { id: 3, name: '关键信息提取', status: 'running', time: '14:32:08', details: '正在提取合同条款、价格信息...' },
        { id: 4, name: '交叉验证分析', status: 'pending', time: '', details: '待执行' },
        { id: 5, name: '风险识别评估', status: 'pending', time: '', details: '待执行' }
      ]
    },
    {
      id: 2,
      name: '价格合理性审计',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-20 13:15:42',
      endTime: '2024-01-20 13:28:15',
      steps: [
        { id: 1, name: '价格数据收集', status: 'completed', time: '13:15:42', details: '收集到358条价格记录' },
        { id: 2, name: '市场价格对比', status: 'completed', time: '13:18:23', details: '与同期市场价格进行对比分析' },
        { id: 3, name: '异常价格标识', status: 'completed', time: '13:22:15', details: '发现12处价格异常点' },
        { id: 4, name: '风险评估报告', status: 'completed', time: '13:28:15', details: '生成风险评估报告，发现3个高风险项' }
      ]
    },
    {
      id: 3,
      name: '合规性检查',
      status: 'pending',
      progress: 0,
      startTime: '',
      steps: [
        { id: 1, name: '资质文件验证', status: 'pending', time: '', details: '待执行' },
        { id: 2, name: '程序合规检查', status: 'pending', time: '', details: '待执行' },
        { id: 3, name: '法规匹配分析', status: 'pending', time: '', details: '待执行' }
      ]
    }
  ];

  useEffect(() => {
    setProcesses(aiProcesses);
    // 设置第一个正在运行的进程为活跃进程
    const runningProcess = aiProcesses.find(p => p.status === 'running');
    if (runningProcess) {
      setActiveProcess(runningProcess.id);
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'completed':
        return '已完成';
      case 'error':
        return '错误';
      case 'pending':
        return '等待中';
      default:
        return '未知';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'from-green-400 to-green-600';
    if (progress >= 50) return 'from-blue-400 to-blue-600';
    return 'from-yellow-400 to-yellow-600';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* 抽屉内容 */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-hidden flex flex-col">
        {/* 抽屉头部 */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">AI进程监控</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* 抽屉内容区域 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {processes.map((process) => (
              <div key={process.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(process.status)}
                    <h3 className="font-medium text-gray-900">{process.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                    {getStatusText(process.status)}
                  </span>
                </div>

                {/* 进度条 */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>进度</span>
                    <span>{process.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(process.progress)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${process.progress}%` }}
                    />
                  </div>
                </div>

                {/* 时间信息 */}
                <div className="text-sm text-gray-500 mb-3">
                  <div>开始时间: {process.startTime || '未开始'}</div>
                  {process.endTime && (
                    <div>结束时间: {process.endTime}</div>
                  )}
                </div>

                {/* 步骤详情 */}
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveProcess(activeProcess === process.id ? null : process.id)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {activeProcess === process.id ? '收起详情' : '查看详情'}
                  </button>
                  
                  {activeProcess === process.id && (
                    <div className="space-y-2 mt-2">
                      {process.steps.map((step) => (
                        <div key={step.id} className="flex items-start space-x-2 p-2 bg-white rounded border">
                          <div className="mt-1">
                            {getStatusIcon(step.status)}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{step.name}</div>
                            <div className="text-xs text-gray-500">{step.details}</div>
                            {step.time && (
                              <div className="text-xs text-gray-400 mt-1">{step.time}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 抽屉底部 */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              总计: {processes.length} 个进程
            </div>
            <div className="flex space-x-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                运行中: {processes.filter(p => p.status === 'running').length}
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                已完成: {processes.filter(p => p.status === 'completed').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 