import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Circle, Upload, FileText, 
  Play, Eye, Edit, Settings, Target, FileCheck, AlertTriangle,
  Building, Calendar, User, Tag, DollarSign, Clock, Check, X, Zap
} from 'lucide-react';

export const AuditProcess = () => {
  const { id } = useParams(); // 项目ID
  const navigate = useNavigate();
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

  // 审计流程步骤定义
  const steps = [
    { id: 1, title: '选择审计范围', description: '选择子项目和审计板块', icon: Target },
    { id: 2, title: '关联审计资料', description: '上传或关联项目文件', icon: FileText },
    { id: 3, title: '执行AI审计', description: '运行审计逻辑分析', icon: Zap },
    { id: 4, title: '确认审计线索', description: '审核AI生成的线索', icon: AlertTriangle },
    { id: 5, title: '生成审计问题', description: '编辑和确认问题', icon: Edit },
    { id: 6, title: '生成审计底稿', description: '完成审计文档', icon: FileCheck }
  ];

  // 模拟项目数据
  const project = {
    id: parseInt(id),
    name: '建设工程项目A审计',
    subProjects: [
      { id: 1, name: '预算审计', status: '已完成' },
      { id: 2, name: '施工过程监督', status: '进行中' },
      { id: 3, name: '竣工决算审计', status: '待开始' }
    ]
  };

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
      case 5:
        return <Step5GenerateIssues />;
      case 6:
        return <Step6GenerateWorkpapers />;
      default:
        return null;
    }
  };

  // 步骤1：选择审计范围
  const Step1SelectScope = () => (
    <div className="space-y-8">
      {/* 选择子项目 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">选择子项目</h3>
          <p className="text-gray-600 mt-1">选择需要审计的子项目范围</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.subProjects.map((subProject) => (
              <div
                key={subProject.id}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  auditTaskData.subProjectId === subProject.id
                    ? 'transform -translate-y-2'
                    : 'hover:-translate-y-1'
                }`}
                onClick={() => setAuditTaskData(prev => ({ ...prev, subProjectId: subProject.id }))}
              >
                <div className={`border-2 rounded-2xl p-6 transition-all duration-300 ${
                  auditTaskData.subProjectId === subProject.id
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-lg">{subProject.name}</h4>
                    {auditTaskData.subProjectId === subProject.id && (
                      <div className="bg-blue-500 rounded-full p-1">
                        <CheckCircle className="h-5 w-5 text-white" />
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
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">选择审计板块</h3>
          <p className="text-gray-600 mt-1">选择要执行的审计板块和具体审计逻辑</p>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            {Object.entries(auditModules).map(([moduleKey, module]) => {
              const isModuleSelected = auditTaskData.selectedModules.includes(moduleKey);
              return (
                <div key={moduleKey} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      isModuleSelected 
                        ? `bg-gradient-to-r ${module.bgGradient} border-l-4 border-l-blue-500` 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleModuleSelect(moduleKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`text-4xl p-3 rounded-2xl ${isModuleSelected ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                          {module.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{module.name}</h4>
                          <p className="text-gray-600 mt-1">
                            包含 {module.logics.length} 个审计逻辑
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isModuleSelected && (
                          <div className="bg-blue-500 rounded-full p-2">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <Circle className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  {isModuleSelected && (
                    <div className="px-6 pb-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                        {module.logics.map((logic) => {
                          const isLogicSelected = auditTaskData.selectedLogics.includes(logic.id);
                          return (
                            <div
                              key={logic.id}
                              className={`group p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                                isLogicSelected
                                  ? `border-blue-300 bg-gradient-to-br ${module.bgGradient} shadow-md transform -translate-y-1`
                                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5'
                              }`}
                              onClick={() => handleLogicSelect(logic.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-900 mb-2">
                                    {logic.name}
                                  </h5>
                                  <p className="text-sm text-gray-600 leading-relaxed">
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
    <div className="space-y-8">
      {/* 关联项目已有文件 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-teal-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">关联项目资料</h3>
          <p className="text-gray-600 mt-1">选择项目中已有的相关文档</p>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {projectDocuments.map((doc) => {
              const isSelected = auditTaskData.associatedFiles.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className={`group border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md transform -translate-y-1' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5'
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
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <FileText className={`h-8 w-8 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{doc.name}</h4>
                        <p className="text-gray-600 mt-1">
                          大小：{formatFileSize(doc.size)}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="bg-blue-500 rounded-full p-2">
                        <CheckCircle className="h-6 w-6 text-white" />
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
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">上传新文件</h3>
          <p className="text-gray-600 mt-1">上传审计所需的其他文档资料</p>
        </div>
        <div className="p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group">
            <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
              <Upload className="h-12 w-12 text-blue-600 mx-auto" />
            </div>
            <div>
              <label htmlFor="audit-file-upload" className="cursor-pointer">
                <span className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200">
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
            <p className="text-gray-600 mt-3 text-lg">
              支持 PDF、Word、Excel、图片等格式
            </p>
            <p className="text-sm text-gray-500 mt-2">
              或拖拽文件到此区域
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 步骤3：执行AI审计
  const Step3ExecuteAudit = () => (
    <div className="h-full flex bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* 左侧文档预览 */}
      <div className="w-1/2 border-r border-gray-200 flex flex-col">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">文档预览</h3>
          <p className="text-gray-600 mt-1">AI正在分析的文档内容</p>
        </div>
        <div className="flex-1 p-8">
          <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                <FileText className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <p className="text-gray-600 text-xl font-semibold mb-2">文档预览区域</p>
              <p className="text-gray-500">选择文件进行预览</p>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧审计过程 */}
      <div className="w-1/2 flex flex-col">
        <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI审计执行</h3>
              <p className="text-gray-600 mt-1">智能分析审计逻辑</p>
            </div>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold">
              <Play className="h-5 w-5 mr-2" />
              开始审计
            </button>
          </div>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          <div className="space-y-6">
            {auditTaskData.selectedLogics.map((logicId, index) => {
              const logic = Object.values(auditModules)
                .flatMap(module => module.logics)
                .find(l => l.id === logicId);
              
              return (
                <div key={logicId} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 text-lg">{logic?.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200 font-medium">
                        执行中
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{logic?.description}</p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700 font-medium">正在分析相关文档内容...</span>
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

  // 步骤4：确认审计线索
  const Step4ConfirmClues = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">AI生成的审计线索</h3>
          <p className="text-gray-600 mt-1">请审核和确认AI发现的审计线索</p>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            {/* 模拟生成的审计线索 */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        线索 {index}：预算编制存在超标情况
                      </h4>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      通过分析预算清单发现，部分材料单价超过市场指导价15%，建议进一步核实价格来源。
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full border border-blue-200 font-medium">
                        相关文档：工程预算清单.xlsx
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-200 font-medium">
                        置信度：85%
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3 ml-6">
                    <button className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-300 text-green-700 rounded-xl hover:bg-green-100 transition-colors duration-200 font-medium">
                      <Check className="h-4 w-4 mr-2" />
                      确认
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-300 text-red-700 rounded-xl hover:bg-red-100 transition-colors duration-200 font-medium">
                      <X className="h-4 w-4 mr-2" />
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

  // 步骤5：生成审计问题
  const Step5GenerateIssues = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">生成审计问题</h3>
          <p className="text-gray-600 mt-1">基于确认的线索编辑和完善审计问题</p>
        </div>
        <div className="p-8">
          <div className="space-y-8">
            {[1, 2].map((index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      问题标题
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      defaultValue={`审计问题 ${index}：预算编制不规范`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      问题描述
                    </label>
                    <textarea
                      rows="4"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      defaultValue="发现部分材料价格超出市场指导价，存在预算编制不规范的问题..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        风险等级
                      </label>
                      <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <option>高风险</option>
                        <option>中风险</option>
                        <option>低风险</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        涉及金额
                      </label>
                      <input
                        type="number"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 步骤6：生成审计底稿
  const Step6GenerateWorkpapers = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-teal-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">生成审计底稿</h3>
          <p className="text-gray-600 mt-1">完成审计任务，生成最终审计底稿</p>
        </div>
        <div className="p-8">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                底稿标题
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                defaultValue="建设工程项目A预算审计底稿"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                审计概况
              </label>
              <textarea
                rows="4"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                defaultValue="本次审计针对建设工程项目A的预算编制进行全面审查，重点关注预算的合规性、准确性和完整性..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                审计发现（基于已确认的问题自动生成）
              </label>
              <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-red-200">
                    <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">问题1：预算编制不规范</h5>
                      <p className="text-gray-600 leading-relaxed">
                        发现部分材料价格超出市场指导价，涉及金额约50万元...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-orange-200">
                    <AlertTriangle className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">问题2：工程量计算偏差</h5>
                      <p className="text-gray-600 leading-relaxed">
                        部分分项工程量计算存在偏差，建议重新核算...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                审计建议
              </label>
              <textarea
                rows="6"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                defaultValue="1. 建议重新核实材料价格，确保符合市场指导价标准；&#10;2. 完善预算编制程序，加强内部审核机制；&#10;3. 建立价格信息收集和更新机制..."
              />
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-semibold">
                保存草稿
              </button>
              <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold">
                完成审计任务
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 页面头部 */}
      <div className="relative overflow-hidden bg-white shadow-xl border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-90"></div>
        <div className="relative px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate(`/projects/${id}`)}
                className="inline-flex items-center text-blue-100 hover:text-white transition-colors duration-200 font-medium"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回项目详情
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">AI智能审计工具</h1>
                <p className="text-blue-100 text-lg">{project.name}</p>
              </div>
            </div>
            
            {/* 步骤进度指示器 */}
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`group flex items-center justify-center w-12 h-12 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      currentStep === step.id
                        ? 'border-white bg-white text-blue-600 shadow-lg transform scale-110'
                        : currentStep > step.id
                        ? 'border-green-400 bg-green-400 text-white shadow-md'
                        : 'border-blue-200 bg-blue-100 bg-opacity-20 text-blue-100 hover:border-white hover:bg-white hover:bg-opacity-10'
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-green-400' : 'bg-blue-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 当前步骤内容 */}
      <div className="p-8">
        <div className="mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {currentStep === 3 ? (
            <div className="min-h-96">
              {renderStepContent()}
            </div>
          ) : (
            <div className="min-h-96">
              {renderStepContent()}
            </div>
          )}
        </div>

        {/* 步骤导航按钮 */}
        <div className="flex justify-between mt-12 max-w-6xl mx-auto">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold transition-all duration-200 ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50 hover:border-gray-400 transform hover:-translate-y-1'
            }`}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            上一步
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={currentStep === steps.length}
            className={`inline-flex items-center px-8 py-4 border-2 border-transparent rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-1 ${
              currentStep === steps.length
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            }`}
          >
            下一步
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}; 