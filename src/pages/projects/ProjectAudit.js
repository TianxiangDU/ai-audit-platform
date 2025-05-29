import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, CheckCircle, Loader, Play } from 'lucide-react';

export const ProjectAudit = () => {
  const { id } = useParams();
  const [selectedModule, setSelectedModule] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const auditModules = [
    {
      id: 'financial',
      name: '财务审计',
      description: '审计财务报表、账务处理、资金流向等',
      supportedFiles: ['PDF', 'Excel', 'Word'],
      icon: '💰'
    },
    {
      id: 'procurement',
      name: '采购审计',
      description: '审计采购流程、供应商选择、合同执行等',
      supportedFiles: ['PDF', 'Excel', 'Word'],
      icon: '🛒'
    },
    {
      id: 'engineering',
      name: '工程审计',
      description: '审计工程预算、施工质量、变更管理等',
      supportedFiles: ['PDF', 'Excel', 'CAD', 'Word'],
      icon: '🏗️'
    },
    {
      id: 'compliance',
      name: '合规性审计',
      description: '审计法规遵循、政策执行、风险控制等',
      supportedFiles: ['PDF', 'Word'],
      icon: '📋'
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploaded',
      category: 'other', // 默认分类
      uploadDate: new Date().toISOString().split('T')[0]
    }))]);
  };

  const updateFileCategory = (fileId, category) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, category } : file
    ));
  };

  const documentCategories = {
    'bid': { name: '招标文件', icon: '📋', color: 'blue' },
    'proposal': { name: '投标文件', icon: '📄', color: 'green' },
    'contract': { name: '合同文件', icon: '📝', color: 'purple' },
    'financial': { name: '财务文件', icon: '💰', color: 'yellow' },
    'technical': { name: '技术文件', icon: '🔧', color: 'indigo' },
    'other': { name: '其他文件', icon: '📁', color: 'gray' }
  };

  const getCategoryColor = (category) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800', 
      purple: 'bg-purple-100 text-purple-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    return colors[documentCategories[category]?.color] || colors.gray;
  };

  const startAnalysis = () => {
    if (!selectedModule || uploadedFiles.length === 0) {
      alert('请先选择审计模块并上传文件');
      return;
    }
    
    setIsAnalyzing(true);
    // 模拟AI分析过程
    setTimeout(() => {
      setIsAnalyzing(false);
      // 跳转到结果页面
      window.location.href = `/projects/${id}/results`;
    }, 5000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center space-x-4">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回项目详情
        </Link>
      </div>

      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI审计工具</h1>
        <p className="mt-1 text-gray-500">为项目 {id} 选择审计模块，上传相关文件，让AI帮您发现问题</p>
      </div>

      {/* 审计模块选择 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            选择审计模块
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {auditModules.map((module) => (
              <div
                key={module.id}
                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedModule === module.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedModule(module.id)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{module.icon}</div>
                  <h4 className="text-sm font-medium text-gray-900">{module.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{module.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-400">
                      支持: {module.supportedFiles.join(', ')}
                    </span>
                  </div>
                </div>
                {selectedModule === module.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 文件上传 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            上传审计文件
          </h3>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-base font-medium text-blue-600 hover:text-blue-500">
                  点击上传文件
                </span>
                <span className="text-gray-500"> 或拖拽文件到此处</span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              支持 PDF、Word、Excel、CAD 等格式，单个文件不超过100MB
            </p>
          </div>

          {/* 已上传文件列表 */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-900">已上传文件</h4>
                <Link
                  to={`/projects/${id}/documents`}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  查看所有项目文件
                </Link>
              </div>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center flex-1">
                      <div className="text-lg mr-3">{documentCategories[file.category]?.icon || '📁'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(file.category)}`}>
                            {documentCategories[file.category]?.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.uploadDate}</span>
                        </div>
                        <select
                          value={file.category}
                          onChange={(e) => updateFileCategory(file.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {Object.entries(documentCategories).map(([key, category]) => (
                            <option key={key} value={key}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <button
                        className="text-red-600 hover:text-red-800 text-sm"
                        onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 开始分析 */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">开始AI分析</h3>
              <p className="text-sm text-gray-500 mt-1">
                AI将分析上传的文件，识别潜在问题和风险点
              </p>
            </div>
            <button
              onClick={startAnalysis}
              disabled={!selectedModule || uploadedFiles.length === 0 || isAnalyzing}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  分析中...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  开始分析
                </>
              )}
            </button>
          </div>

          {isAnalyzing && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Loader className="animate-spin h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-900">AI正在分析您的文件...</p>
                  <p className="text-xs text-blue-700 mt-1">这可能需要几分钟时间，请耐心等待</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 