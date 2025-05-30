import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Calendar, Users, FileText, AlertTriangle, CheckCircle, 
  FolderOpen, Play, Clock, Layers, Edit, Building
} from 'lucide-react';

export const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  // 处理编辑项目
  const handleEditProject = (project) => {
    setEditingProject({...project});
    setShowEditModal(true);
  };

  // 保存编辑
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // 这里应该调用API保存项目信息
    console.log('保存项目:', editingProject);
    alert('项目信息已更新！');
    setShowEditModal(false);
    setEditingProject(null);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group">
              <div className="p-4 sm:p-5">
                {/* 项目头部 */}
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Link
                      to={`/projects/${project.id}/workspace`}
                      className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 flex-1 mr-2"
                    >
                      {project.name}
                    </Link>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2">{project.description}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>

                {/* 项目信息 */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span>负责人：{project.manager}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span>创建：{project.createdAt}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span>子项目：{project.subProjects}</span>
                  </div>
                </div>

                {/* 进度条 */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>完成进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(project.progress)} h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/projects/${project.id}/workspace`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
                  >
                    <Layers className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    进入工作空间
                  </Link>
                  <button 
                    onClick={() => handleEditProject(project)}
                    className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm font-medium"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    编辑
                  </button>
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

      {/* 编辑项目模态框 */}
      {showEditModal && editingProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Edit className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      编辑项目信息
                    </h3>
                    <form onSubmit={handleSaveEdit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            项目名称
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={editingProject.name}
                            onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            项目状态
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={editingProject.status}
                            onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                          >
                            <option value="待开始">待开始</option>
                            <option value="进行中">进行中</option>
                            <option value="即将到期">即将到期</option>
                            <option value="已完成">已完成</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          项目描述
                        </label>
                        <textarea
                          rows={3}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            开始日期
                          </label>
                          <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={editingProject.startDate}
                            onChange={(e) => setEditingProject({...editingProject, startDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            结束日期
                          </label>
                          <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={editingProject.endDate}
                            onChange={(e) => setEditingProject({...editingProject, endDate: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            项目经理
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={editingProject.manager}
                            onChange={(e) => setEditingProject({...editingProject, manager: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            项目类别
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                          >
                            <option value="工程审计">工程审计</option>
                            <option value="采购审计">采购审计</option>
                            <option value="投资审计">投资审计</option>
                            <option value="财政审计">财政审计</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          项目进度 (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                          value={editingProject.progress}
                          onChange={(e) => setEditingProject({...editingProject, progress: parseInt(e.target.value)})}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  保存更改
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProject(null);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 