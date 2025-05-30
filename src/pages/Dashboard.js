import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, AlertTriangle, CheckCircle, FileText, Users, Calendar, TrendingUp, Zap, Bot, BarChart3, Target } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { 
      title: 'AI已读取文件', 
      value: '1,248', 
      change: '+156', 
      icon: FileText, 
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50'
    },
    { 
      title: '发现审计线索', 
      value: '86', 
      change: '+23', 
      icon: AlertTriangle, 
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50'
    },
    { 
      title: '确认问题', 
      value: '42', 
      change: '+12', 
      icon: CheckCircle, 
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50'
    },
    { 
      title: '风险金额', 
      value: '¥3.2M', 
      change: '+0.8M', 
      icon: TrendingUp, 
      iconColor: 'text-slate-600',
      iconBg: 'bg-slate-50'
    },
  ];

  const recentProjects = [
    { 
      id: 1, 
      name: '建设工程项目A审计', 
      status: '进行中', 
      progress: 65, 
      dueDate: '2024-01-15',
      clues: 15,
      issues: 3,
      workpapers: 2 
    },
    { 
      id: 2, 
      name: '政府采购项目B审计', 
      status: '待开始', 
      progress: 0, 
      dueDate: '2024-01-20',
      clues: 0,
      issues: 0,
      workpapers: 0 
    },
    { 
      id: 3, 
      name: '基础设施项目C审计', 
      status: '即将到期', 
      progress: 85, 
      dueDate: '2024-01-10',
      clues: 8,
      issues: 5,
      workpapers: 3 
    },
  ];

  const pendingTasks = [
    { id: 1, title: '完成项目A的财务审计', project: '建设工程项目A', priority: 'high', dueDate: '今天', type: 'audit' },
    { id: 2, title: '上传项目B的招标文件', project: '政府采购项目B', priority: 'medium', dueDate: '明天', type: 'upload' },
    { id: 3, title: '生成项目C的审计报告', project: '基础设施项目C', priority: 'high', dueDate: '2天后', type: 'report' },
    { id: 4, title: 'AI线索确认和问题生成', project: '建设工程项目A', priority: 'medium', dueDate: '3天后', type: 'ai' },
  ];

  const quickActions = [
    {
      title: '新建审计项目',
      description: '创建新的工程审计项目',
      icon: Plus,
      link: '/projects/new',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50'
    },
    {
      title: 'AI智能审计',
      description: '使用AI工具进行智能审计',
      icon: Bot,
      link: '/projects',
      iconColor: 'text-slate-600',
      iconBg: 'bg-slate-50'
    },
    {
      title: '数据分析',
      description: '查看审计数据和统计报告',
      icon: BarChart3,
      link: '/knowledge',
      iconColor: 'text-gray-600',
      iconBg: 'bg-gray-50'
    },
    {
      title: '任务管理',
      description: '管理审计任务和进度跟踪',
      icon: Target,
      link: '/tools',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case '进行中': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '待开始': return 'bg-gray-50 text-gray-700 border-gray-200';
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

  const getTaskIcon = (type) => {
    switch (type) {
      case 'audit': return Bot;
      case 'upload': return FileText;
      case 'report': return BarChart3;
      case 'ai': return Zap;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-6">
        {/* 页面标题 - 去掉大块背景渐变 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">工作台</h1>
              <p className="text-gray-600 text-sm">利用人工智能技术，提升工程审计效率和准确性</p>
            </div>
            <Link
              to="/projects/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              新建项目
            </Link>
          </div>
        </div>

        {/* 统计卡片 - 简化设计 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-900 mb-1">{stat.value}</p>
                  <div className="flex items-center text-xs">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">{stat.change}</span>
                    <span className="text-gray-500 ml-1">本月</span>
                  </div>
                </div>
                <div className={`${stat.iconBg} p-2 rounded-lg`}>
                  <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 快速操作区域 - 简化按钮设计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">快速开始</h3>
            <p className="text-gray-600 mt-1 text-sm">选择操作快速开始您的审计工作</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  <div className={`inline-flex p-2 ${action.iconBg} rounded-lg mb-3`}>
                    <action.icon className={`h-4 w-4 ${action.iconColor}`} />
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{action.title}</h4>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 最近项目 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">最近项目</h3>
                <Link
                  to="/projects"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                >
                  查看全部
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentProjects.map((project) => (
                <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link
                        to={`/projects/${project.id}`}
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
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 审计成果 */}
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 text-amber-600" />
                      <span className="text-gray-600">线索：</span>
                      <span className="font-semibold text-amber-700">{project.clues}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      <span className="text-gray-600">问题：</span>
                      <span className="font-semibold text-red-700">{project.issues}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3 text-blue-600" />
                      <span className="text-gray-600">底稿：</span>
                      <span className="font-semibold text-blue-700">{project.workpapers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 待办任务 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">待办任务</h3>
              <p className="text-gray-600 mt-1 text-sm">需要您关注的重要任务</p>
            </div>
            <div className="divide-y divide-gray-100">
              {pendingTasks.map((task) => {
                const TaskIcon = getTaskIcon(task.type);
                return (
                  <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="p-1.5 rounded-lg bg-gray-100">
                          <TaskIcon className="h-4 w-4 text-gray-600" />
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 