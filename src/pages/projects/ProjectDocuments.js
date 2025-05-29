import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Upload, FileText, ChevronDown, ChevronRight, 
  Download, Edit, Trash2, Search, Filter, Plus, Calendar, 
  User, Tag, DollarSign, Building, FileCheck, AlertTriangle
} from 'lucide-react';

export const ProjectDocuments = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedDocuments, setExpandedDocuments] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [editingKeyInfo, setEditingKeyInfo] = useState({});

  // 文件类别定义及其关键信息字段
  const documentCategories = {
    'bid': {
      name: '招标文件',
      icon: '📋',
      color: 'blue',
      fields: [
        { key: 'tenderer', label: '招标单位', type: 'text', icon: Building },
        { key: 'tenderAmount', label: '招标金额', type: 'currency', icon: DollarSign },
        { key: 'tenderCode', label: '招标编号', type: 'text', icon: Tag },
        { key: 'bidOpenDate', label: '开标时间', type: 'date', icon: Calendar },
        { key: 'bidDeadline', label: '投标截止时间', type: 'date', icon: Calendar },
        { key: 'qualification', label: '资质要求', type: 'text', icon: FileCheck },
        { key: 'evaluationMethod', label: '评标方法', type: 'text', icon: FileText },
        { key: 'projectLocation', label: '项目地点', type: 'text', icon: Building },
        { key: 'projectScale', label: '项目规模', type: 'text', icon: FileText },
        { key: 'constructionPeriod', label: '建设工期', type: 'text', icon: Calendar },
        { key: 'technicalRequirements', label: '技术要求', type: 'text', icon: FileCheck },
        { key: 'contactPerson', label: '联系人', type: 'text', icon: User }
      ]
    },
    'proposal': {
      name: '投标文件',
      icon: '📄',
      color: 'green',
      fields: [
        { key: 'bidder', label: '投标单位', type: 'text', icon: Building },
        { key: 'bidAmount', label: '投标报价', type: 'currency', icon: DollarSign },
        { key: 'submitDate', label: '递交时间', type: 'date', icon: Calendar },
        { key: 'validityPeriod', label: '有效期', type: 'text', icon: Calendar },
        { key: 'legalRepresentative', label: '法定代表人', type: 'text', icon: User },
        { key: 'businessLicense', label: '营业执照号', type: 'text', icon: FileCheck },
        { key: 'qualificationLevel', label: '资质等级', type: 'text', icon: FileCheck },
        { key: 'projectManager', label: '项目经理', type: 'text', icon: User },
        { key: 'technicalSolution', label: '技术方案', type: 'text', icon: FileText },
        { key: 'constructionPlan', label: '施工方案', type: 'text', icon: FileText },
        { key: 'qualityAssurance', label: '质量保证措施', type: 'text', icon: FileCheck },
        { key: 'safetyMeasures', label: '安全措施', type: 'text', icon: AlertTriangle }
      ]
    },
    'contract': {
      name: '合同文件',
      icon: '📝',
      color: 'purple',
      fields: [
        { key: 'contractNumber', label: '合同编号', type: 'text', icon: Tag },
        { key: 'contractAmount', label: '合同金额', type: 'currency', icon: DollarSign },
        { key: 'signDate', label: '签订日期', type: 'date', icon: Calendar },
        { key: 'startDate', label: '开工日期', type: 'date', icon: Calendar },
        { key: 'completionDate', label: '竣工日期', type: 'date', icon: Calendar },
        { key: 'contractor', label: '承包单位', type: 'text', icon: Building },
        { key: 'contractType', label: '合同类型', type: 'text', icon: FileText },
        { key: 'paymentMethod', label: '付款方式', type: 'text', icon: DollarSign },
        { key: 'warrantyPeriod', label: '保修期', type: 'text', icon: Calendar },
        { key: 'liquidatedDamages', label: '违约金', type: 'currency', icon: AlertTriangle },
        { key: 'qualityStandard', label: '质量标准', type: 'text', icon: FileCheck },
        { key: 'changeClause', label: '变更条款', type: 'text', icon: Edit }
      ]
    },
    'financial': {
      name: '财务文件',
      icon: '💰',
      color: 'yellow',
      fields: [
        { key: 'documentType', label: '文件类型', type: 'text', icon: FileText },
        { key: 'amount', label: '金额', type: 'currency', icon: DollarSign },
        { key: 'issueDate', label: '开具日期', type: 'date', icon: Calendar },
        { key: 'accountingPeriod', label: '会计期间', type: 'text', icon: Calendar },
        { key: 'payee', label: '收款方', type: 'text', icon: Building },
        { key: 'payer', label: '付款方', type: 'text', icon: Building },
        { key: 'paymentMethod', label: '付款方式', type: 'text', icon: DollarSign },
        { key: 'invoiceNumber', label: '发票号码', type: 'text', icon: Tag },
        { key: 'taxAmount', label: '税额', type: 'currency', icon: DollarSign },
        { key: 'approver', label: '审批人', type: 'text', icon: User }
      ]
    },
    'technical': {
      name: '技术文件',
      icon: '🔧',
      color: 'indigo',
      fields: [
        { key: 'documentTitle', label: '文件标题', type: 'text', icon: FileText },
        { key: 'technicalStandard', label: '技术标准', type: 'text', icon: FileCheck },
        { key: 'designUnit', label: '设计单位', type: 'text', icon: Building },
        { key: 'reviewUnit', label: '审查单位', type: 'text', icon: Building },
        { key: 'approvalDate', label: '批准日期', type: 'date', icon: Calendar },
        { key: 'versionNumber', label: '版本号', type: 'text', icon: Tag },
        { key: 'technicalParameters', label: '技术参数', type: 'text', icon: FileText },
        { key: 'qualityRequirement', label: '质量要求', type: 'text', icon: FileCheck },
        { key: 'testStandard', label: '检测标准', type: 'text', icon: FileCheck },
        { key: 'chiefEngineer', label: '总工程师', type: 'text', icon: User }
      ]
    },
    'other': {
      name: '其他文件',
      icon: '📁',
      color: 'gray',
      fields: [
        { key: 'documentType', label: '文件类型', type: 'text', icon: FileText },
        { key: 'issuer', label: '出具单位', type: 'text', icon: Building },
        { key: 'recipient', label: '接收单位', type: 'text', icon: Building },
        { key: 'issueDate', label: '出具日期', type: 'date', icon: Calendar },
        { key: 'validityPeriod', label: '有效期', type: 'text', icon: Calendar },
        { key: 'purpose', label: '用途', type: 'text', icon: FileText },
        { key: 'relatedProject', label: '关联项目', type: 'text', icon: Building },
        { key: 'responsiblePerson', label: '负责人', type: 'text', icon: User }
      ]
    }
  };

  // 模拟项目文档数据
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: '某市政工程招标文件.pdf',
      category: 'bid',
      size: 5242880,
      uploadDate: '2023-12-01',
      uploader: '张三',
      keyInfo: {
        tenderer: '某市建设局',
        tenderAmount: 5000000,
        tenderCode: 'SZ2023-001',
        bidOpenDate: '2023-12-15',
        bidDeadline: '2023-12-14 16:00',
        qualification: '建筑工程施工总承包二级及以上',
        evaluationMethod: '综合评分法',
        projectLocation: '某市中心区',
        projectScale: '道路长度3.5公里',
        constructionPeriod: '8个月',
        technicalRequirements: '按国家标准施工',
        contactPerson: '李工程师'
      }
    },
    {
      id: 2,
      name: 'ABC建设集团投标书.pdf',
      category: 'proposal',
      size: 8388608,
      uploadDate: '2023-12-02',
      uploader: '李四',
      keyInfo: {
        bidder: 'ABC建设集团有限公司',
        bidAmount: 4850000,
        submitDate: '2023-12-14',
        validityPeriod: '90天',
        legalRepresentative: '王某某',
        businessLicense: '91110000123456789X',
        qualificationLevel: '建筑工程施工总承包一级',
        projectManager: '张工程师',
        technicalSolution: '采用先进施工工艺',
        constructionPlan: '分段施工，确保交通',
        qualityAssurance: '三级质量检查制度',
        safetyMeasures: '专职安全员现场监督'
      }
    },
    {
      id: 3,
      name: '工程施工合同.doc',
      category: 'contract',
      size: 1048576,
      uploadDate: '2023-12-03',
      uploader: '王五',
      keyInfo: {
        contractNumber: 'HT2023-001',
        contractAmount: 4850000,
        signDate: '2023-12-20',
        startDate: '2024-01-01',
        completionDate: '2024-08-31',
        contractor: 'ABC建设集团有限公司',
        contractType: '施工总承包合同',
        paymentMethod: '按进度付款',
        warrantyPeriod: '2年',
        liquidatedDamages: 50000,
        qualityStandard: '合格',
        changeClause: '重大变更需双方协商'
      }
    },
    {
      id: 4,
      name: '工程预算清单.xlsx',
      category: 'financial',
      size: 2097152,
      uploadDate: '2023-12-04',
      uploader: '赵六',
      keyInfo: {
        documentType: '工程预算',
        amount: 4850000,
        issueDate: '2023-12-01',
        accountingPeriod: '2024年',
        payee: 'ABC建设集团有限公司',
        payer: '某市建设局',
        paymentMethod: '银行转账',
        invoiceNumber: '',
        taxAmount: 485000,
        approver: '财务经理'
      }
    }
  ]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         documentCategories[doc.category].name.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (docId) => {
    setExpandedDocuments(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  const formatValue = (value, type) => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'date':
        return value;
      default:
        return value;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[documentCategories[category].color] || colors.gray;
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setIsUploading(true);
    
    // 模拟上传过程
    setTimeout(() => {
      const newDocuments = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        category: 'other', // 默认分类，需要用户后续修改
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        uploader: '当前用户',
        keyInfo: {}
      }));
      
      setDocuments(prev => [...prev, ...newDocuments]);
      setIsUploading(false);
    }, 2000);
  };

  // 开始编辑文档关键信息
  const handleEditDocument = (doc) => {
    setEditingDocument(doc);
    setEditingKeyInfo({ ...doc.keyInfo });
  };

  // 保存编辑的关键信息
  const handleSaveKeyInfo = () => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === editingDocument.id 
          ? { ...doc, keyInfo: { ...editingKeyInfo } }
          : doc
      )
    );
    setEditingDocument(null);
    setEditingKeyInfo({});
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingDocument(null);
    setEditingKeyInfo({});
  };

  // 更新关键信息字段
  const handleKeyInfoChange = (fieldKey, value) => {
    setEditingKeyInfo(prev => ({
      ...prev,
      [fieldKey]: value
    }));
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
        <h1 className="text-2xl font-bold text-gray-900">项目资料管理</h1>
        <p className="mt-1 text-gray-500">管理项目相关的所有文档资料，查看文件详细信息</p>
      </div>

      {/* 文件上传区域 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            上传新文件
          </h3>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
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
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.dwg"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              支持 PDF、Word、Excel、图片、CAD 等格式，单个文件不超过100MB
            </p>
          </div>
          {isUploading && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-3"></div>
                <span className="text-sm text-blue-700">正在上传文件...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="搜索文件名或类别..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">所有类别</option>
                {Object.entries(documentCategories).map(([key, category]) => (
                  <option key={key} value={key}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 文档列表 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              文档列表 ({filteredDocuments.length})
            </h3>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-1" />
                高级筛选
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredDocuments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>暂无文档</p>
            </div>
          ) : (
            filteredDocuments.map((doc) => {
              const category = documentCategories[doc.category];
              const isExpanded = expandedDocuments[doc.id];
              
              return (
                <div key={doc.id} className="hover:bg-gray-50">
                  {/* 文档基本信息行 */}
                  <div 
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => toggleExpanded(doc.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                          <div className="ml-2 text-xl">{category.icon}</div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {doc.name}
                            </p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(doc.category)}`}>
                              {category.name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 mt-1 text-xs text-gray-500">
                            <span className="flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              {formatFileSize(doc.size)}
                            </span>
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {doc.uploader}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {doc.uploadDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            // 下载功能
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-yellow-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditDocument(doc);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            // 删除功能
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 展开的关键信息 */}
                  {isExpanded && (
                    <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50">
                      <div className="pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">关键信息</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.fields.map((field) => {
                            const value = doc.keyInfo[field.key];
                            if (!value) return null;
                            
                            const IconComponent = field.icon;
                            return (
                              <div key={field.key} className="flex items-start space-x-2">
                                <IconComponent className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <dt className="text-xs font-medium text-gray-500">
                                    {field.label}
                                  </dt>
                                  <dd className="text-sm text-gray-900 break-words">
                                    {formatValue(value, field.type)}
                                  </dd>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {Object.keys(doc.keyInfo).length === 0 && (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500">暂无关键信息</p>
                            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                              添加关键信息
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 编辑文档关键信息的全屏模态框 */}
      {editingDocument && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* 背景遮罩 */}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={handleCancelEdit}></div>
            
            {/* 模态框内容 */}
            <div className="relative w-full h-full">
              <div className="flex h-full">
                {/* 左侧：原文预览 */}
                <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
                  {/* 左侧头部 */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        原文预览
                      </h3>
                      <div className="text-sm text-gray-500">
                        {editingDocument.name}
                      </div>
                    </div>
                  </div>
                  
                  {/* 左侧内容区域 */}
                  <div className="flex-1 p-6 overflow-auto">
                    {/* 文件预览区域 - 这里可以根据文件类型显示不同的预览 */}
                    <div className="h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">文档预览</p>
                        <p className="text-gray-400 text-sm mt-2">{editingDocument.name}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          文件大小: {formatFileSize(editingDocument.size)}
                        </p>
                        <div className="mt-4 space-y-2 text-xs text-gray-500">
                          <p>📄 PDF 文档支持在线预览</p>
                          <p>📝 Word 文档显示文本内容</p>
                          <p>📊 Excel 表格显示数据摘要</p>
                          <p>🖼️ 图片文件直接显示</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧：关键信息编辑 */}
                <div className="w-1/2 bg-white flex flex-col">
                  {/* 右侧头部 */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Edit className="h-5 w-5 mr-2" />
                        编辑关键信息
                      </h3>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          取消
                        </button>
                        <button
                          onClick={handleSaveKeyInfo}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                        >
                          保存
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 右侧内容区域 */}
                  <div className="flex-1 p-6 overflow-auto">
                    <div className="space-y-4">
                      {/* 文档分类选择 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          文档分类
                        </label>
                        <select
                          value={editingDocument.category}
                          onChange={(e) => {
                            const newCategory = e.target.value;
                            setEditingDocument(prev => ({ ...prev, category: newCategory }));
                            // 切换分类时清空关键信息，因为字段会变化
                            setEditingKeyInfo({});
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {Object.entries(documentCategories).map(([key, category]) => (
                            <option key={key} value={key}>
                              {category.icon} {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 关键信息字段 */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">关键信息字段</h4>
                        <div className="space-y-4">
                          {documentCategories[editingDocument.category].fields.map((field) => {
                            const IconComponent = field.icon;
                            const value = editingKeyInfo[field.key] || '';
                            
                            return (
                              <div key={field.key}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  <IconComponent className="h-4 w-4 inline mr-1" />
                                  {field.label}
                                </label>
                                {field.type === 'date' ? (
                                  <input
                                    type="date"
                                    value={value}
                                    onChange={(e) => handleKeyInfoChange(field.key, e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                ) : field.type === 'currency' ? (
                                  <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleKeyInfoChange(field.key, parseFloat(e.target.value) || 0)}
                                    placeholder="请输入金额"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleKeyInfoChange(field.key, e.target.value)}
                                    placeholder={`请输入${field.label}`}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 操作提示 */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">编辑提示</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <ul className="list-disc list-inside space-y-1">
                                <li>左侧显示原文档内容供参考</li>
                                <li>右侧编辑对应的关键信息字段</li>
                                <li>更改分类会清空已填写的信息</li>
                                <li>保存后将更新文档的关键信息</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 分类统计 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">分类统计</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(documentCategories).map(([key, category]) => {
              const count = documents.filter(doc => doc.category === key).length;
              return (
                <div key={key} className="text-center">
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-lg font-semibold text-gray-900">{count}</div>
                  <div className="text-xs text-gray-500">{category.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}; 