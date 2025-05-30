import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Play, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Calendar } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showQuickStartModal, setShowQuickStartModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedSubProject, setSelectedSubProject] = useState('');

  // 模拟项目数据
  const projects = [
    {
      id: 1,
      name: '建设工程项目A审计',
      subProjects: [
        { id: 1, name: '预算审计', status: '已完成' },
        { id: 2, name: '施工过程监督', status: '进行中' },
        { id: 3, name: '竣工决算审计', status: '待开始' }
      ]
    },
    {
      id: 2,
      name: '财务审计项目B',
      subProjects: [
        { id: 4, name: '内控审计', status: '进行中' },
        { id: 5, name: '合规性审计', status: '待开始' }
      ]
    },
    {
      id: 3,
      name: '采购审计项目C',
      subProjects: [
        { id: 6, name: '供应商审计', status: '待开始' }
      ]
    }
  ];

  // 正在进行的项目
  const ongoingProjects = [
    {
      id: 1,
      name: '建设工程项目A审计',
      progress: 65,
      dueDate: '2024-01-15',
      manager: '张三',
      subProjects: 3,
      status: '进行中'
    },
    {
      id: 2,
      name: '基础设施项目C审计',
      progress: 85,
      dueDate: '2024-01-10',
      manager: '王五',
      subProjects: 5,
      status: '即将到期'
    },
    {
      id: 3,
      name: '财务审计项目B',
      progress: 30,
      dueDate: '2024-01-20',
      manager: '李四',
      subProjects: 2,
      status: '进行中'
    }
  ];

  // 待办任务
  const pendingTasks = [
    {
      id: 1,
      title: '完成项目A的财务审计',
      project: '建设工程项目A',
      priority: 'high',
      dueDate: '今天'
    },
    {
      id: 2,
      title: '上传项目B的招标文件',
      project: '政府采购项目B',
      priority: 'medium',
      dueDate: '明天'
    },
    {
      id: 3,
      title: '生成项目C的审计报告',
      project: '基础设施项目C',
      priority: 'high',
      dueDate: '2天后'
    },
    {
      id: 4,
      title: 'AI线索确认和问题生成',
      project: '建设工程项目A',
      priority: 'medium',
      dueDate: '3天后'
    }
  ];

  // 统计数据
  const stats = [
    {
      title: '进行中项目',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: '待处理问题',
      value: '8',
      change: '-3',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      title: '完成审计',
      value: '45',
      change: '+5',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: '本月任务',
      value: '23',
      change: '+8',
      changeType: 'increase',
      icon: Clock,
      color: 'purple'
    }
  ];

  const getStatIcon = (IconComponent, color) => {
    const colorClasses = {
      blue: 'text-blue-600 bg-blue-100',
      amber: 'text-amber-600 bg-amber-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    
    return (
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
        <IconComponent className="h-6 w-6" />
      </div>
    );
  };

  const handleQuickStartAudit = () => {
    if (selectedProject && selectedSubProject) {
      // 修正跳转逻辑，确保能正确跳转到工作空间并选中子项目
      const targetUrl = `/projects/${selectedProject}/workspace?subProject=${selectedSubProject}`;
      navigate(targetUrl);
      setShowQuickStartModal(false);
    }
  };

  const getProjectSubProjects = () => {
    const project = projects.find(p => p.id === parseInt(selectedProject));
    return project ? project.subProjects : [];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '进行中': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '即将到期': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-600 to-green-700';
    if (progress >= 50) return 'from-blue-600 to-blue-700';
    if (progress >= 20) return 'from-amber-600 to-amber-700';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* 欢迎区域和快速操作 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">基于人工智能的智能化审计解决方案</h1>
          </div>
        </div>
        
        {/* 快速开始 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">快速开始</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/projects/new"
              className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2 group-hover:bg-blue-200 transition-colors flex-shrink-0">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">新建审计项目</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">创建新的审计项目</p>
                </div>
              </div>
            </Link>
            
            <button
              onClick={() => setShowQuickStartModal(true)}
              className="group p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-lg p-2 group-hover:bg-green-200 transition-colors flex-shrink-0">
                  <Play className="h-5 w-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">快速开始审计</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">选择项目直接开始</p>
                </div>
              </div>
            </button>
            
            <Link
              to="/projects"
              className="group p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 rounded-lg p-2 group-hover:bg-purple-200 transition-colors flex-shrink-0">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">项目管理</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">查看所有审计项目</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/knowledge"
              className="group p-4 border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 rounded-lg p-2 group-hover:bg-amber-200 transition-colors flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">知识库</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">审计知识与经验</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              {getStatIcon(stat.icon, stat.color)}
            </div>
          </div>
        ))}
      </div>

      {/* 两栏布局：正在进行的项目 & 待办任务 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 正在进行的项目 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">正在进行的项目</h3>
              <Link
                to="/projects"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
              >
                查看全部
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {ongoingProjects.map((project) => (
              <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Link
                      to={`/projects/${project.id}/workspace`}
                      className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                      {project.name}
                    </Link>
                    <div className="mt-2 flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 项目进度条 */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>项目进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(project.progress)} h-1.5 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* 项目信息 */}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>负责人：{project.manager}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>子项目：{project.subProjects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 待办任务 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">待办任务</h3>
            <p className="text-gray-600 mt-1 text-sm">需要您关注的重要任务</p>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="p-1.5 rounded-lg bg-gray-100">
                      <Clock className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{task.project}</p>
                    <div className="mt-2 flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 快速开始审计模态框 */}
      {showQuickStartModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mx-4">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Play className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                      快速开始审计
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          选择项目
                        </label>
                        <select
                          value={selectedProject}
                          onChange={(e) => {
                            setSelectedProject(e.target.value);
                            setSelectedSubProject('');
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">请选择项目</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      {selectedProject && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            选择子项目
                          </label>
                          <select
                            value={selectedSubProject}
                            onChange={(e) => setSelectedSubProject(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">请选择子项目</option>
                            {getProjectSubProjects().map(subProject => (
                              <option key={subProject.id} value={subProject.id}>
                                {subProject.name} ({subProject.status})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse space-y-2 sm:space-y-0">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleQuickStartAudit}
                  disabled={!selectedProject || !selectedSubProject}
                >
                  开始审计
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowQuickStartModal(false)}
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