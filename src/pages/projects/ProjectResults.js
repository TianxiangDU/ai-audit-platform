import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ChevronDown, ChevronRight, Plus, 
  AlertTriangle, CheckCircle, FileText, Download, 
  Eye, Edit, Trash2, Search, Filter, Calendar, 
  User, Tag, Building, Bot, UserCheck, Clock,
  FileSpreadsheet, FileImage, Share2, Printer
} from 'lucide-react';

export const ProjectResults = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const subProjectId = searchParams.get('subProject');
  
  const [activeTab, setActiveTab] = useState('clues');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});
  const [showExportMenu, setShowExportMenu] = useState(false);

  // 导出选项配置
  const exportOptions = [
    {
      id: 'pdf',
      name: 'PDF报告',
      description: '生成完整的审计成果PDF报告',
      icon: FileText,
      color: 'red'
    },
    {
      id: 'excel',
      name: 'Excel表格',
      description: '导出详细数据到Excel文件',
      icon: FileSpreadsheet,
      color: 'green'
    },
    {
      id: 'word',
      name: 'Word文档',
      description: '导出可编辑的Word文档',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'summary',
      name: '汇总报告',
      description: '生成简要汇总报告',
      icon: FileImage,
      color: 'purple'
    }
  ];

  // 导出处理函数
  const handleExport = (exportType) => {
    setShowExportMenu(false);
    
    // 获取当前数据
    const currentData = getCurrentData();
    
    switch (exportType) {
      case 'pdf':
        exportToPDF(currentData);
        break;
      case 'excel':
        exportToExcel(currentData);
        break;
      case 'word':
        exportToWord(currentData);
        break;
      case 'summary':
        exportSummary(currentData);
        break;
      default:
        console.log('未知的导出类型:', exportType);
    }
  };

  const exportToPDF = (data) => {
    // 模拟PDF导出
    console.log('导出PDF报告...', data);
    alert('PDF报告正在生成，请稍后下载');
    
    // 实际实现中，这里会调用PDF生成库
    // 例如：jsPDF, react-pdf 等
  };

  const exportToExcel = (data) => {
    // 模拟Excel导出
    console.log('导出Excel表格...', data);
    alert('Excel文件正在生成，请稍后下载');
    
    // 实际实现中，这里会调用Excel生成库
    // 例如：xlsx, exceljs 等
  };

  const exportToWord = (data) => {
    // 模拟Word导出
    console.log('导出Word文档...', data);
    alert('Word文档正在生成，请稍后下载');
    
    // 实际实现中，这里会调用Word生成库
    // 例如：docx, officegen 等
  };

  const exportSummary = (data) => {
    // 模拟汇总报告导出
    console.log('导出汇总报告...', data);
    alert('汇总报告正在生成，请稍后下载');
  };

  // 批量操作函数
  const handleBatchExport = () => {
    const currentData = getCurrentData();
    console.log('批量导出所有格式...', currentData);
    alert('正在生成所有格式的文件，请稍后下载');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '审计成果报告',
        text: '请查看审计成果详情',
        url: window.location.href
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  // 审计线索数据（属于子项目）
  const [auditClues, setAuditClues] = useState([
    {
      id: 1,
      title: '投标报价异常偏低',
      description: 'ABC建设集团投标价格比预算低15%，存在潜在风险',
      severity: 'high',
      status: 'pending',
      source: 'ai',
      createDate: '2023-12-10',
      creator: 'AI审计系统',
      confirmer: null,
      confirmDate: null,
      subProjectId: 1,
      subProjectName: '预算审计',
      details: {
        riskLevel: '高风险',
        affectedAmount: 485000,
        evidence: ['投标文件.pdf', '预算清单.xlsx'],
        recommendation: '建议重新核实投标报价的合理性，检查是否存在恶意低价竞标'
      }
    },
    {
      id: 2,
      title: '资质证书有效期临近',
      description: '承包商建筑资质证书将在项目期间到期',
      severity: 'medium',
      status: 'confirmed',
      source: 'manual',
      createDate: '2023-12-08',
      creator: '张三',
      confirmer: '李四',
      confirmDate: '2023-12-09',
      subProjectId: 1,
      subProjectName: '预算审计',
      details: {
        riskLevel: '中风险',
        affectedAmount: 0,
        evidence: ['资质证书.pdf'],
        recommendation: '要求承包商在证书到期前及时续期'
      }
    },
    {
      id: 3,
      title: '施工方案技术参数不符',
      description: 'AI检测到施工方案中部分技术参数与招标要求不一致',
      severity: 'high',
      status: 'rejected',
      source: 'ai',
      createDate: '2023-12-12',
      creator: 'AI审计系统',
      confirmer: '王五',
      confirmDate: '2023-12-13',
      subProjectId: 2,
      subProjectName: '施工过程监督',
      details: {
        riskLevel: '高风险',
        affectedAmount: 200000,
        evidence: ['施工方案.doc', '技术规范.pdf'],
        recommendation: '要求承包商修正技术参数，确保符合招标要求'
      }
    }
  ]);

  // 审计问题数据（属于主项目）
  const [auditIssues, setAuditIssues] = useState([
    {
      id: 1,
      title: '采购程序不规范',
      description: '部分材料采购未按规定程序执行，存在合规性风险',
      severity: 'high',
      status: 'open',
      source: 'manual',
      createDate: '2023-12-11',
      creator: '审计员A',
      assignee: '项目经理',
      dueDate: '2023-12-20',
      details: {
        category: '合规性问题',
        affectedAmount: 150000,
        evidence: ['采购合同.pdf', '付款凭证.jpg'],
        actionPlan: '完善采购制度，规范采购流程'
      }
    },
    {
      id: 2,
      title: '工程变更审批程序缺失',
      description: '发现多项工程变更未经过规定的审批程序',
      severity: 'medium',
      status: 'in_progress',
      source: 'ai',
      createDate: '2023-12-09',
      creator: 'AI审计系统',
      assignee: '设计负责人',
      dueDate: '2023-12-18',
      details: {
        category: '流程问题',
        affectedAmount: 85000,
        evidence: ['变更通知单.doc'],
        actionPlan: '补充变更审批手续，建立完整的变更管理体系'
      }
    }
  ]);

  // 审计底稿数据（属于主项目）
  const [workpapers, setWorkpapers] = useState([
    {
      id: 1,
      title: '投标文件一致性检查底稿',
      type: 'checklist',
      status: 'completed',
      createDate: '2023-12-10',
      creator: '审计员A',
      reviewer: '审计主管',
      reviewDate: '2023-12-11',
      details: {
        scope: '检查投标文件与招标文件的一致性',
        methods: ['文档比对', 'AI智能分析'],
        findings: '发现3处不一致问题',
        conclusion: '投标文件总体符合要求，需关注标识的问题点'
      }
    },
    {
      id: 2,
      title: '财务数据分析底稿',
      type: 'analysis',
      status: 'draft',
      createDate: '2023-12-12',
      creator: '审计员B',
      reviewer: null,
      reviewDate: null,
      details: {
        scope: '分析项目财务数据的真实性和完整性',
        methods: ['数据分析', '趋势分析'],
        findings: '发现部分费用科目异常',
        conclusion: '需进一步核实相关财务记录'
      }
    }
  ]);

  // 审计报告数据（属于主项目）
  const [reports, setReports] = useState([
    {
      id: 1,
      title: '阶段性审计报告',
      type: 'interim',
      status: 'published',
      createDate: '2023-12-05',
      creator: '审计组长',
      approver: '审计部门负责人',
      approveDate: '2023-12-07',
      details: {
        period: '2023年11月-12月',
        scope: '预算执行情况专项审计',
        keyFindings: ['预算执行率偏低', '部分支出缺乏依据'],
        recommendations: ['加强预算管理', '完善支出审批流程']
      }
    }
  ]);

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const confirmClue = (clueId, action) => {
    setAuditClues(prev => prev.map(clue => 
      clue.id === clueId 
        ? { 
            ...clue, 
            status: action,
            confirmer: '当前用户',
            confirmDate: new Date().toISOString().split('T')[0]
          }
        : clue
    ));
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'high': return '高风险';
      case 'medium': return '中风险';
      case 'low': return '低风险';
      default: return severity;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status, type = 'clue') => {
    if (type === 'clue') {
      switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'confirmed': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    } else {
      switch (status) {
        case 'open': return 'bg-red-100 text-red-800';
        case 'in_progress': return 'bg-yellow-100 text-yellow-800';
        case 'resolved': return 'bg-green-100 text-green-800';
        case 'completed': return 'bg-green-100 text-green-800';
        case 'draft': return 'bg-gray-100 text-gray-800';
        case 'published': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getStatusText = (status, type = 'clue') => {
    if (type === 'clue') {
      switch (status) {
        case 'pending': return '待确认';
        case 'confirmed': return '已确认';
        case 'rejected': return '已拒绝';
        default: return status;
      }
    } else {
      switch (status) {
        case 'open': return '未解决';
        case 'in_progress': return '处理中';
        case 'resolved': return '已解决';
        case 'completed': return '已完成';
        case 'draft': return '草稿';
        case 'published': return '已发布';
        default: return status;
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  // 根据当前标签页获取对应数据
  const getCurrentData = () => {
    switch (activeTab) {
      case 'clues':
        return subProjectId 
          ? auditClues.filter(clue => clue.subProjectId == subProjectId)
          : auditClues;
      case 'issues':
        return auditIssues;
      case 'workpapers':
        return workpapers;
      case 'reports':
        return reports;
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderClueItem = (clue) => {
    const isExpanded = expandedItems[clue.id];
    
    return (
      <div key={clue.id} className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="px-6 py-4 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleExpanded(clue.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
                <div className="ml-2">
                  {clue.source === 'ai' ? (
                    <Bot className="h-5 w-5 text-blue-500" />
                  ) : (
                    <User className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {clue.title}
                  </h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(clue.severity)}`}>
                    {getSeverityText(clue.severity)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(clue.status)}`}>
                    {getStatusText(clue.status)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{clue.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {clue.createDate}
                  </span>
                  <span className="flex items-center">
                    {clue.source === 'ai' ? <Bot className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                    {clue.creator}
                  </span>
                  {clue.subProjectName && (
                    <span className="flex items-center">
                      <Building className="h-3 w-3 mr-1" />
                      {clue.subProjectName}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {clue.status === 'pending' && (
              <div className="flex items-center space-x-2 ml-4">
                <button 
                  className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmClue(clue.id, 'confirmed');
                  }}
                >
                  确认
                </button>
                <button 
                  className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmClue(clue.id, 'rejected');
                  }}
                >
                  拒绝
                </button>
              </div>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50">
            <div className="pt-4">
              <h5 className="text-sm font-medium text-gray-900 mb-3">详细信息</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-medium text-gray-500">风险等级</dt>
                  <dd className="text-sm text-gray-900">{clue.details.riskLevel}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">涉及金额</dt>
                  <dd className="text-sm text-gray-900">
                    {clue.details.affectedAmount > 0 ? formatCurrency(clue.details.affectedAmount) : '无'}
                  </dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-xs font-medium text-gray-500">相关证据</dt>
                  <dd className="text-sm text-gray-900">
                    {clue.details.evidence.join('、')}
                  </dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-xs font-medium text-gray-500">处理建议</dt>
                  <dd className="text-sm text-gray-900">{clue.details.recommendation}</dd>
                </div>
              </div>
              
              {clue.confirmer && (
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <UserCheck className="h-4 w-4" />
                    <span>由 {clue.confirmer} 于 {clue.confirmDate} {getStatusText(clue.status)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderGenericItem = (item, type) => {
    const isExpanded = expandedItems[item.id];
    
    return (
      <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="px-6 py-4 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleExpanded(item.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
                <div className="ml-2">
                  {type === 'issues' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {type === 'workpapers' && <FileText className="h-5 w-5 text-blue-500" />}
                  {type === 'reports' && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status, type)}`}>
                    {getStatusText(item.status, type)}
                  </span>
                  {item.source && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.source === 'ai' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {item.source === 'ai' ? 'AI生成' : '人工创建'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">{item.description || `${type === 'workpapers' ? '底稿' : '报告'}创建于 ${item.createDate}`}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.createDate}
                  </span>
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {item.creator}
                  </span>
                  {item.assignee && (
                    <span className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      负责人：{item.assignee}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button className="p-1 text-gray-400 hover:text-blue-600">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-yellow-600">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50">
            <div className="pt-4">
              <h5 className="text-sm font-medium text-gray-900 mb-3">详细信息</h5>
              {/* 根据不同类型显示不同的详细信息 */}
              {type === 'issues' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs font-medium text-gray-500">问题类别</dt>
                    <dd className="text-sm text-gray-900">{item.details?.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">涉及金额</dt>
                    <dd className="text-sm text-gray-900">
                      {item.details?.affectedAmount ? formatCurrency(item.details.affectedAmount) : '无'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">截止日期</dt>
                    <dd className="text-sm text-gray-900">{item.dueDate}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">负责人</dt>
                    <dd className="text-sm text-gray-900">{item.assignee}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500">处理方案</dt>
                    <dd className="text-sm text-gray-900">{item.details?.actionPlan}</dd>
                  </div>
                </div>
              )}
              
              {type === 'workpapers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs font-medium text-gray-500">审计范围</dt>
                    <dd className="text-sm text-gray-900">{item.details?.scope}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">审计方法</dt>
                    <dd className="text-sm text-gray-900">{item.details?.methods?.join('、')}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">复核人</dt>
                    <dd className="text-sm text-gray-900">{item.reviewer || '待分配'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">复核日期</dt>
                    <dd className="text-sm text-gray-900">{item.reviewDate || '未复核'}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500">主要发现</dt>
                    <dd className="text-sm text-gray-900">{item.details?.findings}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500">审计结论</dt>
                    <dd className="text-sm text-gray-900">{item.details?.conclusion}</dd>
                  </div>
                </div>
              )}
              
              {type === 'reports' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs font-medium text-gray-500">报告期间</dt>
                    <dd className="text-sm text-gray-900">{item.details?.period}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">审计范围</dt>
                    <dd className="text-sm text-gray-900">{item.details?.scope}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">审批人</dt>
                    <dd className="text-sm text-gray-900">{item.approver || '待审批'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500">审批日期</dt>
                    <dd className="text-sm text-gray-900">{item.approveDate || '未审批'}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500">主要发现</dt>
                    <dd className="text-sm text-gray-900">{item.details?.keyFindings?.join('；')}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500">审计建议</dt>
                    <dd className="text-sm text-gray-900">{item.details?.recommendations?.join('；')}</dd>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getNewButtonText = (activeTab) => {
    switch (activeTab) {
      case 'clues': return '线索';
      case 'issues': return '问题';
      case 'workpapers': return '底稿';
      case 'reports': return '报告';
      default: return '项目';
    }
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
        <h1 className="text-2xl font-bold text-gray-900">
          {subProjectId ? `子项目审计成果` : '项目审计成果'}
        </h1>
        <p className="mt-1 text-gray-500">
          {subProjectId 
            ? '查看和管理子项目的审计线索及相关成果' 
            : '查看和管理项目的所有审计成果，包括问题、底稿和报告'
          }
        </p>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="px-6 flex space-x-8">
            {[
              { key: 'clues', label: '审计线索', icon: AlertTriangle, count: auditClues.length },
              { key: 'issues', label: '审计问题', icon: AlertTriangle, count: auditIssues.length },
              { key: 'workpapers', label: '审计底稿', icon: FileText, count: workpapers.length },
              { key: 'reports', label: '审计报告', icon: CheckCircle, count: reports.length }
            ].map(tab => {
              // 如果是查看子项目，只显示审计线索
              if (subProjectId && tab.key !== 'clues') return null;
              
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 搜索和筛选 */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="搜索标题或描述..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">所有状态</option>
                {activeTab === 'clues' && (
                  <>
                    <option value="pending">待确认</option>
                    <option value="confirmed">已确认</option>
                    <option value="rejected">已拒绝</option>
                  </>
                )}
                {activeTab === 'issues' && (
                  <>
                    <option value="open">未解决</option>
                    <option value="in_progress">处理中</option>
                    <option value="resolved">已解决</option>
                  </>
                )}
                {(activeTab === 'workpapers' || activeTab === 'reports') && (
                  <>
                    <option value="draft">草稿</option>
                    <option value="completed">已完成</option>
                    <option value="published">已发布</option>
                  </>
                )}
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              新建{getNewButtonText(activeTab)}
            </button>
          </div>
        </div>
      </div>

      {/* 内容列表 */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>暂无数据</p>
          </div>
        ) : (
          filteredData.map((item) => {
            if (activeTab === 'clues') {
              return renderClueItem(item);
            } else {
              return renderGenericItem(item, activeTab);
            }
          })
        )}
      </div>
    </div>
  );
}; 