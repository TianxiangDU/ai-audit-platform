import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Download, Eye, Edit, Trash2,
  FileText, AlertTriangle, CheckCircle, Clock, User,
  Calendar, Tag, Building, Bot, Share2, Printer,
  TrendingUp, BarChart3, Target
} from 'lucide-react';

export const ResultsManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');

  // 审计成果统计数据
  const resultsStats = {
    totalProjects: 15,
    totalClues: 89,
    totalIssues: 34,
    totalWorkpapers: 127,
    totalReports: 23,
    highRiskIssues: 8,
    mediumRiskIssues: 15,
    lowRiskIssues: 11,
    completedProjects: 8,
    ongoingProjects: 7
  };

  // 最近的审计成果
  const recentResults = [
    {
      id: 1,
      type: 'clue',
      title: '投标报价异常偏低',
      projectName: '高速公路建设项目',
      severity: 'high',
      status: 'confirmed',
      source: 'ai',
      createDate: '2024-01-20',
      creator: 'AI审计系统'
    },
    {
      id: 2,
      type: 'issue',
      title: '采购程序不规范',
      projectName: '水利工程项目',
      severity: 'high',
      status: 'open',
      source: 'manual',
      createDate: '2024-01-19',
      creator: '审计员A'
    },
    {
      id: 3,
      type: 'workpaper',
      title: '投标文件一致性检查底稿',
      projectName: '市政建设项目',
      status: 'completed',
      source: 'manual',
      createDate: '2024-01-18',
      creator: '审计员B'
    },
    {
      id: 4,
      type: 'report',
      title: '阶段性审计报告',
      projectName: '基础设施项目',
      status: 'published',
      source: 'manual',
      createDate: '2024-01-17',
      creator: '审计组长'
    }
  ];

  // 项目列表（用于筛选）
  const projects = [
    { id: 1, name: '高速公路建设项目' },
    { id: 2, name: '水利工程项目' },
    { id: 3, name: '市政建设项目' },
    { id: 4, name: '基础设施项目' },
    { id: 5, name: '桥梁建设项目' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'clue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'issue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'workpaper':
        return <FileText className="h-4 w-4" />;
      case 'report':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'clue':
        return 'bg-amber-100 text-amber-800';
      case 'issue':
        return 'bg-red-100 text-red-800';
      case 'workpaper':
        return 'bg-blue-100 text-blue-800';
      case 'report':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'clue':
        return '审计线索';
      case 'issue':
        return '审计问题';
      case 'workpaper':
        return '审计底稿';
      case 'report':
        return '审计报告';
      default:
        return type;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'high':
        return '高风险';
      case 'medium':
        return '中风险';
      case 'low':
        return '低风险';
      default:
        return severity;
    }
  };

  const getStatusColor = (status, type = 'general') => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '待确认';
      case 'confirmed':
        return '已确认';
      case 'rejected':
        return '已拒绝';
      case 'open':
        return '未解决';
      case 'in_progress':
        return '处理中';
      case 'resolved':
        return '已解决';
      case 'completed':
        return '已完成';
      case 'draft':
        return '草稿';
      case 'published':
        return '已发布';
      default:
        return status;
    }
  };

  const handleExport = () => {
    // 导出功能逻辑
    console.log('导出审计成果');
  };

  const handleBatchExport = () => {
    // 批量导出功能逻辑
    console.log('批量导出');
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">审计成果管理</h1>
          <p className="mt-1 text-gray-500">
            统一管理所有项目的审计线索、问题、底稿和报告
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            导出成果
          </button>
          <Link
            to="/projects/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            新建项目
          </Link>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">审计项目</p>
              <p className="text-2xl font-semibold text-gray-900">{resultsStats.totalProjects}</p>
              <p className="text-sm text-gray-500">
                进行中 {resultsStats.ongoingProjects} | 已完成 {resultsStats.completedProjects}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">审计线索</p>
              <p className="text-2xl font-semibold text-gray-900">{resultsStats.totalClues}</p>
              <p className="text-sm text-gray-500">AI发现 65 | 人工录入 24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">审计问题</p>
              <p className="text-2xl font-semibold text-gray-900">{resultsStats.totalIssues}</p>
              <p className="text-sm text-gray-500">
                高风险 {resultsStats.highRiskIssues} | 中风险 {resultsStats.mediumRiskIssues}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">审计文档</p>
              <p className="text-2xl font-semibold text-gray-900">
                {resultsStats.totalWorkpapers + resultsStats.totalReports}
              </p>
              <p className="text-sm text-gray-500">
                底稿 {resultsStats.totalWorkpapers} | 报告 {resultsStats.totalReports}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="px-6 flex space-x-8">
            {[
              { key: 'overview', label: '概览', icon: BarChart3 },
              { key: 'clues', label: '审计线索', icon: AlertTriangle },
              { key: 'issues', label: '审计问题', icon: AlertTriangle },
              { key: 'workpapers', label: '审计底稿', icon: FileText },
              { key: 'reports', label: '审计报告', icon: CheckCircle }
            ].map(tab => {
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
                  placeholder="搜索标题、项目名称或创建人..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-40">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              >
                <option value="all">所有项目</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-32">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">所有状态</option>
                <option value="pending">待处理</option>
                <option value="in_progress">进行中</option>
                <option value="completed">已完成</option>
              </select>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="px-6 pb-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 最近的审计成果 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">最近的审计成果</h3>
                <div className="space-y-3">
                  {recentResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{result.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                              {getTypeText(result.type)}
                            </span>
                            {result.severity && (
                              <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(result.severity)}`}>
                                {getSeverityText(result.severity)}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            项目: {result.projectName} | 创建人: {result.creator} | {result.createDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                          {getStatusText(result.status)}
                        </span>
                        <div className="flex space-x-1">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 趋势分析 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">成果产出趋势</h4>
                  <div className="text-center text-gray-500">
                    <TrendingUp className="h-16 w-16 mx-auto mb-2 text-gray-300" />
                    <p>趋势图表将在此处显示</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">风险分布</h4>
                  <div className="text-center text-gray-500">
                    <Target className="h-16 w-16 mx-auto mb-2 text-gray-300" />
                    <p>风险分布图将在此处显示</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">开发中...</h3>
              <p>该模块功能正在完善中，请稍后查看</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 