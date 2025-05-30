import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Filter, Eye, Edit, Trash2, 
  AlertTriangle, CheckCircle, FileText, Lightbulb, Target,
  Bot, Wand2, Clock, User, Link as LinkIcon, Download
} from 'lucide-react';

export const ProjectWorkspace = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('clues');

  // 模拟项目数据
  const project = {
    id: parseInt(id) || 1,
    name: '建设工程项目A审计',
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2024-03-31'
  };

  // 审计线索数据
  const auditClues = [
    {
      id: 1,
      title: '材料价格超出市场指导价',
      description: '钢筋采购价格比市场指导价高出15%，涉及金额约50万元',
      source: 'AI分析',
      category: '预算审计',
      severity: '高',
      status: '待确认',
      createdAt: '2024-01-15 10:30',
      relatedFiles: ['材料采购合同.pdf', '市场价格对比表.xlsx'],
      linkedIssues: []
    },
    {
      id: 2,
      title: '招标程序不完整',
      description: '缺少资格预审环节，直接进入投标阶段',
      source: '手动添加',
      category: '招投标审计',
      severity: '中',
      status: '已确认',
      createdAt: '2024-01-14 15:20',
      relatedFiles: ['招标公告.doc'],
      linkedIssues: [1]
    },
    {
      id: 3,
      title: '工程量计算存在偏差',
      description: '土方开挖工程量比设计图纸多计算了约200立方米',
      source: 'AI分析',
      category: '预算审计',
      severity: '中',
      status: '待确认',
      createdAt: '2024-01-13 09:45',
      relatedFiles: ['工程量清单.xlsx', '设计图纸.dwg'],
      linkedIssues: []
    }
  ];

  // 审计问题数据
  const auditIssues = [
    {
      id: 1,
      title: '招标程序违规',
      description: '招标过程中未按规定进行资格预审，存在程序违规风险',
      severity: '高',
      amount: 0,
      status: '待处理',
      createdAt: '2024-01-15 11:00',
      linkedClues: [2],
      workpaper: { id: 1, status: '已生成' },
      auditor: '张三'
    },
    {
      id: 2,
      title: '预算编制不规范',
      description: '材料价格和工程量计算存在问题，需要重新核算',
      severity: '中',
      amount: 500000,
      status: '处理中',
      createdAt: '2024-01-14 16:30',
      linkedClues: [1, 3],
      workpaper: { id: 2, status: '草稿' },
      auditor: '李四'
    }
  ];

  // 审计底稿数据
  const auditWorkpapers = [
    {
      id: 1,
      title: '招标程序违规问题底稿',
      issueId: 1,
      status: '已完成',
      createdAt: '2024-01-15 14:20',
      lastModified: '2024-01-15 16:45',
      auditor: '张三',
      content: '发现招标程序存在违规行为...'
    },
    {
      id: 2,
      title: '预算编制问题底稿',
      issueId: 2,
      status: '草稿',
      createdAt: '2024-01-14 17:00',
      lastModified: '2024-01-15 09:30',
      auditor: '李四',
      content: '预算编制过程中发现的问题...'
    }
  ];

  // 审计报告数据
  const auditReports = [
    {
      id: 1,
      title: '建设工程项目A中期审计报告',
      type: '中期报告',
      status: '草稿',
      createdAt: '2024-01-15 10:00',
      lastModified: '2024-01-15 17:30',
      selectedIssues: [1, 2],
      auditor: '王五',
      content: '根据审计发现的问题...'
    }
  ];

  const tabs = [
    { id: 'clues', name: '审计线索', icon: Lightbulb, count: auditClues.length },
    { id: 'issues', name: '审计问题', icon: AlertTriangle, count: auditIssues.length },
    { id: 'workpapers', name: '审计底稿', icon: FileText, count: auditWorkpapers.length },
    { id: 'reports', name: '审计报告', icon: CheckCircle, count: auditReports.length }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case '高': return 'bg-red-50 text-red-700 border-red-200';
      case '中': return 'bg-amber-50 text-amber-700 border-amber-200';
      case '低': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '已完成': case '已确认': return 'bg-green-50 text-green-700 border-green-200';
      case '处理中': case '草稿': return 'bg-amber-50 text-amber-700 border-amber-200';
      case '待处理': case '待确认': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const renderCluesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索审计线索..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">全部类别</option>
            <option value="预算审计">预算审计</option>
            <option value="招投标审计">招投标审计</option>
            <option value="合同管理">合同管理</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Bot className="h-4 w-4 mr-2" />
            AI生成线索
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Plus className="h-4 w-4 mr-2" />
            新建线索
          </button>
        </div>
      </div>

      {auditClues.map((clue) => (
        <div key={clue.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="text-base font-semibold text-gray-900">{clue.title}</h4>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(clue.severity)}`}>
                  {clue.severity}风险
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(clue.status)}`}>
                  {clue.status}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                  {clue.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{clue.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>来源：{clue.source}</span>
                <span>时间：{clue.createdAt}</span>
                <span>相关文件：{clue.relatedFiles.length}</span>
                {clue.linkedIssues.length > 0 && (
                  <span className="text-blue-600">已关联 {clue.linkedIssues.length} 个问题</span>
                )}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                <Eye className="h-4 w-4 mr-1" />
                查看
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                <Edit className="h-4 w-4 mr-1" />
                编辑
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                <Target className="h-4 w-4 mr-1" />
                生成问题
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderIssuesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索审计问题..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">全部状态</option>
            <option value="待处理">待处理</option>
            <option value="处理中">处理中</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          <Plus className="h-4 w-4 mr-2" />
          新建问题
        </button>
      </div>

      {auditIssues.map((issue) => (
        <div key={issue.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="text-base font-semibold text-gray-900">{issue.title}</h4>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                  {issue.severity}风险
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                <span>审计人：{issue.auditor}</span>
                <span>时间：{issue.createdAt}</span>
                {issue.amount > 0 && <span className="text-red-600">涉及金额：¥{issue.amount.toLocaleString()}</span>}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">关联线索：</span>
                {issue.linkedClues.map((clueId) => {
                  const clue = auditClues.find(c => c.id === clueId);
                  return (
                    <span key={clueId} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      {clue?.title.substring(0, 10)}...
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                <Eye className="h-4 w-4 mr-1" />
                查看
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                <Edit className="h-4 w-4 mr-1" />
                编辑
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
                <Wand2 className="h-4 w-4 mr-1" />
                AI润色
              </button>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>底稿状态：{issue.workpaper.status}</span>
              <Link 
                to={`/projects/${id}/workpapers/${issue.workpaper.id}`}
                className="text-blue-600 hover:text-blue-700"
              >
                查看底稿 →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorkpapersTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索审计底稿..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <div className="text-sm text-gray-600">
          底稿根据审计问题自动生成
        </div>
      </div>

      {auditWorkpapers.map((workpaper) => {
        const relatedIssue = auditIssues.find(issue => issue.id === workpaper.issueId);
        return (
          <div key={workpaper.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-base font-semibold text-gray-900">{workpaper.title}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(workpaper.status)}`}>
                    {workpaper.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">关联问题：{relatedIssue?.title}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>审计人：{workpaper.auditor}</span>
                  <span>创建：{workpaper.createdAt}</span>
                  <span>更新：{workpaper.lastModified}</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                  <Eye className="h-4 w-4 mr-1" />
                  查看
                </button>
                <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  <Edit className="h-4 w-4 mr-1" />
                  编辑
                </button>
                <button className="inline-flex items-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
                  <Wand2 className="h-4 w-4 mr-1" />
                  AI润色
                </button>
                <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                  <Download className="h-4 w-4 mr-1" />
                  导出
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索审计报告..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          <Plus className="h-4 w-4 mr-2" />
          新建报告
        </button>
      </div>

      {auditReports.map((report) => (
        <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="text-base font-semibold text-gray-900">{report.title}</h4>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-50 text-purple-700 border border-purple-200">
                  {report.type}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                <span>编写人：{report.auditor}</span>
                <span>创建：{report.createdAt}</span>
                <span>更新：{report.lastModified}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">包含问题：</span>
                {report.selectedIssues.map((issueId) => {
                  const issue = auditIssues.find(i => i.id === issueId);
                  return (
                    <span key={issueId} className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-50 text-red-700 border border-red-200">
                      {issue?.title.substring(0, 10)}...
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                <Eye className="h-4 w-4 mr-1" />
                查看
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                <Edit className="h-4 w-4 mr-1" />
                编辑
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
                <Wand2 className="h-4 w-4 mr-1" />
                AI润色
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                <Download className="h-4 w-4 mr-1" />
                导出
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'clues': return renderCluesTab();
      case 'issues': return renderIssuesTab();
      case 'workpapers': return renderWorkpapersTab();
      case 'reports': return renderReportsTab();
      default: return renderCluesTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/projects"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回项目列表
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name} - 工作空间</h1>
                <p className="text-gray-600 text-sm mt-1">审计线索分析、问题确认、底稿编写和报告生成</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to={`/projects/${id}`}
                className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                项目详情
              </Link>
              <Link
                to={`/projects/${id}/audit`}
                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI审计
              </Link>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="text-sm text-gray-500">
                {project.startDate} ~ {project.endDate}
              </span>
            </div>
          </div>
        </div>

        {/* 工作空间标签页 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* 标签导航 */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.name}
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* 内容区域 */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}; 