import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Calendar, Users, FileText, AlertTriangle, CheckCircle, BarChart3, Zap, Target, FolderOpen, Play, Clock } from 'lucide-react';

export const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: '建设工程项目A审计',
      description: '某市政基础设施建设工程全过程审计',
      status: '进行中',
      progress: 65,
      startDate: '2023-12-01',
      endDate: '2024-01-15',
      manager: '张三',
      team: ['张三', '李四', '王五'],
      subProjects: 3,
      category: '工程审计',
      auditResults: {
        clues: 13,
        issues: 5,
        workpapers: 8,
        reports: 2
      }
    },
    {
      id: 2,
      name: '政府采购项目B审计',
      description: '政府办公设备采购项目合规性审计',
      status: '待开始',
      progress: 0,
      startDate: '2024-01-10',
      endDate: '2024-01-20',
      manager: '李四',
      team: ['李四', '王五'],
      subProjects: 1,
      category: '采购审计',
      auditResults: {
        clues: 0,
        issues: 0,
        workpapers: 0,
        reports: 0
      }
    },
    {
      id: 3,
      name: '基础设施项目C审计',
      description: '城市轨道交通建设项目投资效益审计',
      status: '即将到期',
      progress: 85,
      startDate: '2023-11-15',
      endDate: '2024-01-10',
      manager: '王五',
      team: ['王五', '赵六', '孙七'],
      subProjects: 5,
      category: '投资审计',
      auditResults: {
        clues: 22,
        issues: 8,
        workpapers: 12,
        reports: 3
      }
    },
    {
      id: 4,
      name: '财政资金使用审计',
      description: '专项财政资金使用情况审计',
      status: '已完成',
      progress: 100,
      startDate: '2023-10-01',
      endDate: '2023-11-30',
      manager: '赵六',
      team: ['赵六', '孙七'],
      subProjects: 2,
      category: '财政审计',
      auditResults: {
        clues: 7,
        issues: 3,
        workpapers: 6,
        reports: 2
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case '进行中': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '待开始': return 'bg-gray-100 text-gray-800 border-gray-200';
      case '即将到期': return 'bg-red-100 text-red-800 border-red-200';
      case '已完成': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case '工程审计': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '采购审计': return 'bg-amber-100 text-amber-800 border-amber-200';
      case '投资审计': return 'bg-slate-100 text-slate-800 border-slate-200';
      case '财政审计': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-emerald-600 to-emerald-700';
    if (progress >= 50) return 'from-blue-600 to-blue-700';
    if (progress >= 20) return 'from-amber-600 to-amber-700';
    return 'from-gray-500 to-gray-600';
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 计算统计数据
  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === '进行中').length,
    pending: projects.filter(p => p.status === '待开始').length,
    completed: projects.filter(p => p.status === '已完成').length,
    overdue: projects.filter(p => p.status === '即将到期').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-6">
        {/* 页面标题 - 简化设计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">项目管理</h1>
              <p className="text-gray-600">管理和跟踪您的工程审计项目</p>
            </div>
            <Link
              to="/projects/new"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              新建项目
            </Link>
          </div>
        </div>

        {/* 统计概览 - 简化设计 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">总项目数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <FolderOpen className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">进行中</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">待开始</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">已完成</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">逾期项目</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 - 简化设计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">搜索和筛选</h3>
              <p className="text-gray-600 text-sm">快速找到您需要的项目</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索项目名称或描述..."
                  className="pl-12 w-full h-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-12 w-full h-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">所有状态</option>
                  <option value="进行中">进行中</option>
                  <option value="待开始">待开始</option>
                  <option value="即将到期">即将到期</option>
                  <option value="已完成">已完成</option>
                </select>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <span className="text-sm text-gray-600">
                  找到 <span className="font-semibold text-blue-600">{filteredProjects.length}</span> 个项目
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 项目列表 - 简化设计 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
              <div className="p-8">
                {/* 项目头部信息 */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                      >
                        {project.name}
                      </Link>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                      <span className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {project.manager} 等 {project.team.length} 人
                      </span>
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        {project.subProjects} 个子项目
                      </span>
                    </div>
                  </div>
                </div>

                {/* 项目进度条 */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">项目进度</span>
                    <span className="font-bold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(project.progress)} h-2 rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* 审计成果统计 */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-amber-700">{project.auditResults.clues}</div>
                    <div className="text-xs text-amber-800">线索</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertTriangle className="h-5 w-5 text-red-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-red-700">{project.auditResults.issues}</div>
                    <div className="text-xs text-red-800">问题</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <FileText className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-blue-700">{project.auditResults.workpapers}</div>
                    <div className="text-xs text-blue-800">底稿</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <BarChart3 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-green-700">{project.auditResults.reports}</div>
                    <div className="text-xs text-green-800">报告</div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium border border-blue-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    查看详情
                  </Link>
                  <Link
                    to={`/projects/${project.id}/audit`}
                    className="inline-flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 shadow-sm font-medium"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    AI审计
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-sm mx-auto">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? '没有找到符合条件的项目，请调整搜索条件'
                  : '还没有创建任何项目，点击按钮创建第一个项目'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  to="/projects/new"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-sm font-medium"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  创建第一个项目
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 