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
      <div className="space-y-6 p-6">
        {/* 顶部控制区域 - 合并设计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* 标题和新建按钮 */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">项目管理</h1>
              <p className="text-gray-600 text-sm">管理和跟踪您的工程审计项目</p>
            </div>
            <Link
              to="/projects/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              新建项目
            </Link>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <FolderOpen className="h-4 w-4 text-slate-600 mx-auto mb-1" />
              <div className="text-base font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-gray-600">总项目</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <Play className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <div className="text-base font-bold text-gray-900">{stats.inProgress}</div>
              <div className="text-xs text-gray-600">进行中</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 text-gray-600 mx-auto mb-1" />
              <div className="text-base font-bold text-gray-900">{stats.pending}</div>
              <div className="text-xs text-gray-600">待开始</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <div className="text-base font-bold text-gray-900">{stats.completed}</div>
              <div className="text-xs text-gray-600">已完成</div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600 mx-auto mb-1" />
              <div className="text-base font-bold text-gray-900">{stats.overdue}</div>
              <div className="text-xs text-gray-600">逾期</div>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索项目名称或描述..."
                className="pl-10 w-full h-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                className="pl-10 pr-8 h-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white text-sm min-w-[120px]"
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
            <div className="text-sm text-gray-600">
              找到 <span className="font-medium text-blue-600">{filteredProjects.length}</span> 个项目
            </div>
          </div>
        </div>

        {/* 项目卡片网格 - 一行4个 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group">
              <div className="p-5">
                {/* 项目头部 */}
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 flex-1 mr-2"
                    >
                      {project.name}
                    </Link>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{project.description}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>

                {/* 项目信息 */}
                <div className="space-y-2 mb-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{project.startDate} - {project.endDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{project.manager} 等 {project.team.length} 人</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>{project.subProjects} 个子项目</span>
                  </div>
                </div>

                {/* 进度条 */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>进度</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(project.progress)} h-1.5 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* 审计成果统计 */}
                <div className="grid grid-cols-4 gap-1 mb-4">
                  <div className="text-center p-2 bg-amber-50 rounded border border-amber-200">
                    <div className="text-sm font-bold text-amber-700">{project.auditResults.clues}</div>
                    <div className="text-xs text-amber-800">线索</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                    <div className="text-sm font-bold text-red-700">{project.auditResults.issues}</div>
                    <div className="text-xs text-red-800">问题</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                    <div className="text-sm font-bold text-blue-700">{project.auditResults.workpapers}</div>
                    <div className="text-xs text-blue-800">底稿</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                    <div className="text-sm font-bold text-green-700">{project.auditResults.reports}</div>
                    <div className="text-xs text-green-800">报告</div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-xs font-medium border border-blue-200"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    查看
                  </Link>
                  <Link
                    to={`/projects/${project.id}/audit`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 text-xs font-medium"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    审计
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
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm font-medium"
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