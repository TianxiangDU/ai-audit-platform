import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Circle, Upload, FileText, 
  Play, Eye, Edit, Settings, Target, FileCheck, AlertTriangle,
  Building, Calendar, User, Tag, DollarSign, Clock, Check, X, Zap
} from 'lucide-react';

export const AuditProcess = () => {
  const { id } = useParams(); // 项目ID
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [auditTaskData, setAuditTaskData] = useState({
    subProjectId: null,
    selectedModules: [],
    selectedLogics: [],
    associatedFiles: [],
    uploadedFiles: [],
    auditResults: [],
    auditClues: [],
    auditIssues: [],
    auditWorkpapers: []
  });

  // 审计流程步骤定义 - 简化为4步
  const steps = [
    { id: 1, title: '选择审计范围', description: '选择子项目和审计板块', icon: Target },
    { id: 2, title: '关联审计资料', description: '上传或关联项目文件', icon: FileText },
    { id: 3, title: '执行AI审计', description: '运行审计逻辑分析', icon: Zap },
    { id: 4, title: '生成审计线索', description: 'AI生成线索供后续确认', icon: AlertTriangle }
  ];

  // 模拟项目数据 - 使用useMemo避免每次渲染重新创建
  const project = useMemo(() => ({
    id: parseInt(id),
    name: '建设工程项目A审计',
    subProjects: [
      { id: 1, name: '预算审计', status: '已完成' },
      { id: 2, name: '施工过程监督', status: '进行中' },
      { id: 3, name: '竣工决算审计', status: '待开始' }
    ]
  }), [id]);

  // 从URL参数中获取子项目ID
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const subProjectId = urlParams.get('subProject');
    
    if (subProjectId) {
      const subProjectIdInt = parseInt(subProjectId);
      const subProject = project.subProjects.find(sp => sp.id === subProjectIdInt);
      if (subProject) {
        setAuditTaskData(prev => ({
          ...prev,
          subProjectId: subProjectIdInt
        }));
      }
    }
  }, [location.search, project.subProjects]);

  // 审计板块和对应的审计逻辑
  const auditModules = {
    'budget': {
      name: '预算审计',
      icon: '💰',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      logics: [
        { id: 'budget_01', name: '预算编制合规性检查', description: '检查预算编制是否符合相关规定' },
        { id: 'budget_02', name: '工程量清单核查', description: '核实工程量清单的准确性' },
        { id: 'budget_03', name: '材料价格合理性分析', description: '分析材料价格是否合理' },
        { id: 'budget_04', name: '人工费标准核验', description: '验证人工费标准的适用性' }
      ]
    },
    'bidding': {
      name: '招投标审计',
      icon: '📋',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      logics: [
        { id: 'bid_01', name: '招标程序合规性检查', description: '检查招标程序是否合规' },
        { id: 'bid_02', name: '投标文件完整性核查', description: '核查投标文件的完整性' },
        { id: 'bid_03', name: '评标过程公正性审查', description: '审查评标过程的公正性' },
        { id: 'bid_04', name: '中标价格合理性分析', description: '分析中标价格的合理性' }
      ]
    },
    'contract': {
      name: '合同管理审计',
      icon: '📝',
      color: 'purple',
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      logics: [
        { id: 'contract_01', name: '合同条款完备性检查', description: '检查合同条款是否完备' },
        { id: 'contract_02', name: '合同履行情况核查', description: '核查合同履行情况' },
        { id: 'contract_03', name: '变更管理规范性审查', description: '审查变更管理的规范性' },
        { id: 'contract_04', name: '付款进度合规性检验', description: '检验付款进度的合规性' }
      ]
    },
    'quality': {
      name: '质量控制审计',
      icon: '🔧',
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600',
      bgGradient: 'from-indigo-50 to-blue-50',
      logics: [
        { id: 'quality_01', name: '质量管理体系检查', description: '检查质量管理体系建设' },
        { id: 'quality_02', name: '材料质量验收核查', description: '核查材料质量验收情况' },
        { id: 'quality_03', name: '施工工艺标准审查', description: '审查施工工艺是否符合标准' },
        { id: 'quality_04', name: '质量检测报告核验', description: '核验质量检测报告真实性' }
      ]
    },
    'financial': {
      name: '财务审计',
      icon: '💳',
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50',
      logics: [
        { id: 'finance_01', name: '资金使用合规性检查', description: '检查资金使用是否合规' },
        { id: 'finance_02', name: '财务核算准确性核查', description: '核查财务核算的准确性' },
        { id: 'finance_03', name: '成本控制有效性分析', description: '分析成本控制的有效性' },
        { id: 'finance_04', name: '票据真实性验证', description: '验证相关票据的真实性' }
      ]
    }
  };

  // 模拟项目文档数据
  const projectDocuments = [
    { id: 1, name: '某市政工程招标文件.pdf', category: 'bid', size: 5242880 },
    { id: 2, name: 'ABC建设集团投标书.pdf', category: 'proposal', size: 8388608 },
    { id: 3, name: '工程施工合同.doc', category: 'contract', size: 1048576 },
    { id: 4, name: '工程预算清单.xlsx', category: 'financial', size: 2097152 }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleModuleSelect = (moduleKey) => {
    const isSelected = auditTaskData.selectedModules.includes(moduleKey);
    if (isSelected) {
      setAuditTaskData(prev => ({
        ...prev,
        selectedModules: prev.selectedModules.filter(m => m !== moduleKey),
        selectedLogics: prev.selectedLogics.filter(l => !l.startsWith(moduleKey))
      }));
    } else {
      setAuditTaskData(prev => ({
        ...prev,
        selectedModules: [...prev.selectedModules, moduleKey]
      }));
    }
  };

  const handleLogicSelect = (logicId) => {
    const isSelected = auditTaskData.selectedLogics.includes(logicId);
    if (isSelected) {
      setAuditTaskData(prev => ({
        ...prev,
        selectedLogics: prev.selectedLogics.filter(l => l !== logicId)
      }));
    } else {
      setAuditTaskData(prev => ({
        ...prev,
        selectedLogics: [...prev.selectedLogics, logicId]
      }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1SelectScope />;
      case 2:
        return <Step2AssociateFiles />;
      case 3:
        return <Step3ExecuteAudit />;
      case 4:
        return <Step4ConfirmClues />;
      default:
        return null;
    }
  };

  // 步骤1：选择审计范围
  const Step1SelectScope = () => (
    <div className="space-y-6">
      {/* 选择子项目 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">选择子项目</h3>
          <p className="text-gray-600 text-sm mt-1">选择需要审计的子项目范围</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.subProjects.map((subProject) => (
              <div
                key={subProject.id}
                className={`cursor-pointer transition-all duration-200 ${
                  auditTaskData.subProjectId === subProject.id
                    ? 'transform scale-105'
                    : 'hover:scale-105'
                }`}
                onClick={() => setAuditTaskData(prev => ({ ...prev, subProjectId: subProject.id }))}
              >
                <div className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                  auditTaskData.subProjectId === subProject.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{subProject.name}</h4>
                    {auditTaskData.subProjectId === subProject.id && (
                      <div className="bg-blue-500 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">状态：{subProject.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 选择审计板块 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">选择审计板块</h3>
          <p className="text-gray-600 text-sm mt-1">选择要执行的审计板块和具体审计逻辑</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(auditModules).map(([moduleKey, module]) => {
              const isModuleSelected = auditTaskData.selectedModules.includes(moduleKey);
              return (
                <div key={moduleKey} className="border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200">
                  <div
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      isModuleSelected 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleModuleSelect(moduleKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`text-2xl p-2 rounded-lg ${isModuleSelected ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                          {module.icon}
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">{module.name}</h4>
                          <p className="text-gray-600 text-sm">
                            包含 {module.logics.length} 个审计逻辑
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isModuleSelected && (
                          <div className="bg-blue-500 rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {isModuleSelected && (
                    <div className="px-4 pb-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
                        {module.logics.map((logic) => {
                          const isLogicSelected = auditTaskData.selectedLogics.includes(logic.id);
                          return (
                            <div
                              key={logic.id}
                              className={`group p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                                isLogicSelected
                                  ? 'border-blue-300 bg-blue-50 shadow-sm'
                                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                              }`}
                              onClick={() => handleLogicSelect(logic.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 text-sm mb-1">
                                    {logic.name}
                                  </h5>
                                  <p className="text-xs text-gray-600 leading-relaxed">
                                    {logic.description}
                                  </p>
                                </div>
                                {isLogicSelected && (
                                  <div className="bg-blue-500 rounded-full p-1 ml-3 flex-shrink-0">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // 步骤2：关联审计资料
  const Step2AssociateFiles = () => (
    <div className="space-y-6">
      {/* 关联项目已有文件 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">关联项目资料</h3>
          <p className="text-gray-600 text-sm mt-1">选择项目中已有的相关文档</p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {projectDocuments.map((doc) => {
              const isSelected = auditTaskData.associatedFiles.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-300 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      setAuditTaskData(prev => ({
                        ...prev,
                        associatedFiles: prev.associatedFiles.filter(id => id !== doc.id)
                      }));
                    } else {
                      setAuditTaskData(prev => ({
                        ...prev,
                        associatedFiles: [...prev.associatedFiles, doc.id]
                      }));
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <FileText className={`h-6 w-6 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                        <p className="text-gray-600 text-sm">
                          大小：{formatFileSize(doc.size)}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="bg-blue-500 rounded-full p-1">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 上传新文件 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">上传新文件</h3>
          <p className="text-gray-600 text-sm mt-1">上传审计所需的其他文档资料</p>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
            <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <Upload className="h-10 w-10 text-blue-600 mx-auto" />
            </div>
            <div>
              <label htmlFor="audit-file-upload" className="cursor-pointer">
                <span className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  点击上传审计相关文件
                </span>
                <input
                  id="audit-file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                />
              </label>
            </div>
            <p className="text-gray-600 mt-2">
              支持 PDF、Word、Excel、图片等格式
            </p>
            <p className="text-sm text-gray-500 mt-1">
              或拖拽文件到此区域
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 步骤3：执行AI审计
  const Step3ExecuteAudit = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 左侧文档预览 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">文档预览</h3>
          <p className="text-gray-600 text-sm mt-1">AI正在分析的文档内容</p>
        </div>
        <div className="p-6">
          <div className="h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <p className="text-gray-600 font-medium mb-1">文档预览区域</p>
              <p className="text-gray-500 text-sm">选择文件进行预览</p>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧审计过程 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI审计执行</h3>
              <p className="text-gray-600 text-sm mt-1">智能分析审计逻辑</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Play className="h-4 w-4 mr-2" />
              开始审计
            </button>
          </div>
        </div>
        <div className="p-6 max-h-96 overflow-auto">
          <div className="space-y-4">
            {auditTaskData.selectedLogics.map((logicId, index) => {
              const logic = Object.values(auditModules)
                .flatMap(module => module.logics)
                .find(l => l.id === logicId);
              
              return (
                <div key={logicId} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{logic?.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 border border-blue-200 font-medium">
                        执行中
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{logic?.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700 text-sm font-medium">正在分析相关文档内容...</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // 步骤4：生成审计线索
  const Step4ConfirmClues = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI生成的审计线索</h3>
          <p className="text-gray-600 text-sm mt-1">请审核和确认AI发现的审计线索</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* 模拟生成的审计线索 */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        线索 {index}：预算编制存在超标情况
                      </h4>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm">
                      通过分析预算清单发现，部分材料单价超过市场指导价15%，建议进一步核实价格来源。
                    </p>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded border border-blue-200 font-medium">
                        相关文档：工程预算清单.xlsx
                      </span>
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded border border-green-200 font-medium">
                        置信度：85%
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button className="inline-flex items-center px-3 py-2 bg-green-50 border border-green-300 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                      <Check className="h-4 w-4 mr-1" />
                      确认
                    </button>
                    <button className="inline-flex items-center px-3 py-2 bg-red-50 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                      <X className="h-4 w-4 mr-1" />
                      拒绝
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/projects/${id}/workspace`)}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回工作空间
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI智能审计</h1>
                <p className="text-gray-600 text-sm mt-1">{project.name}</p>
              </div>
            </div>
            
            {/* 步骤进度指示器 */}
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`group flex items-center justify-center w-10 h-10 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      currentStep === step.id
                        ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                        : currentStep > step.id
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400 hover:border-gray-400 hover:text-gray-600'
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 当前步骤标题 */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {steps[currentStep - 1]?.title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep - 1]?.description}
          </p>
        </div>

        {/* 步骤内容 */}
        <div className="max-w-6xl mx-auto">
          {renderStepContent()}
        </div>

        {/* 步骤导航按钮 */}
        <div className="flex justify-between max-w-6xl mx-auto">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-700 hover:bg-gray-50 hover:border-gray-400 bg-white'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            上一步
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={currentStep === steps.length}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === steps.length
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
            }`}
          >
            下一步
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}; 