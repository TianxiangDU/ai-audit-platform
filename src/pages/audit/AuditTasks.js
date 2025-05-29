import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Filter, Play, Pause, RotateCcw, Copy, Eye, 
  Edit, Trash2, Calendar, Clock, User, Target, AlertTriangle, CheckCircle,
  FileText, Zap, TrendingUp, BarChart3, Settings
} from 'lucide-react';

export const AuditTasks = () => {
  const { id } = useParams(); // 项目ID
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟审计任务数据
  const auditTasks = [
    {
      id: 1,
      name: '预算审计-合规性检查',
      description: '对预算编制的合规性进行全面审计',
      status: '执行中',
      progress: 75,
      startTime: '2024-01-10 09:00',
      estimatedCompletion: '2024-01-10 15:30',
      subProject: '预算审计',
      selectedModules: ['budget'],
      selectedLogics: ['budget_01', 'budget_02'],
      creator: '张三',
      createdAt: '2024-01-10 08:45',
      results: {
        clues: 5,
        issues: 2,
        workpapers: 1
      }
    },
    {
      id: 2,
      name: '招投标流程审计',
      description: '审查招投标流程的合规性和公正性',
      status: '已完成',
      progress: 100,
      startTime: '2024-01-09 14:00',
      completedAt: '2024-01-09 18:20',
      subProject: '招投标审计',
      selectedModules: ['bidding'],
      selectedLogics: ['bid_01', 'bid_02', 'bid_03'],
      creator: '李四',
      createdAt: '2024-01-09 13:30',
      results: {
        clues: 8,
        issues: 3,
        workpapers: 2
      }
    },
    {
      id: 3,
      name: '合同管理审计',
      description: '对项目合同管理进行全面审计',
      status: '暂停',
      progress: 30,
      startTime: '2024-01-08 10:00',
      pausedAt: '2024-01-08 16:00',
      subProject: '合同管理',
      selectedModules: ['contract'],
      selectedLogics: ['contract_01', 'contract_02'],
      creator: '王五',
      createdAt: '2024-01-08 09:45',
      results: {
        clues: 2,
        issues: 0,
        workpapers: 0
      }
    },
    {
      id: 4,
      name: '财务审计-资金使用',
      description: '审计项目资金使用的合规性',
      status: '待执行',
      progress: 0,
      subProject: '财务审计',
      selectedModules: ['financial'],
      selectedLogics: ['finance_01', 'finance_02'],
      creator: '赵六',
      createdAt: '2024-01-11 10:00',
      results: {
        clues: 0,
        issues: 0,
        workpapers: 0
      }
    }
  ];

  const project = {
    id: parseInt(id),
    name: '建设工程项目A审计'
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case '执行中':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Play,
          gradient: 'from-blue-600 to-blue-700',
          bgGradient: 'from-blue-50 to-blue-100'
        };
      case '已完成':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          gradient: 'from-green-600 to-green-700',
          bgGradient: 'from-green-50 to-green-100'
        };
      case '暂停':
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: Pause,
          gradient: 'from-amber-600 to-amber-700',
          bgGradient: 'from-amber-50 to-amber-100'
        };
      case '待执行':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-100'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-100'
        };
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-600 to-green-700';
    if (progress >= 50) return 'from-blue-600 to-blue-700';
    if (progress >= 20) return 'from-amber-600 to-amber-700';
    return 'from-gray-500 to-gray-600';
  };

  const filteredTasks = auditTasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 计算统计数据
  const stats = {
    total: auditTasks.length,
    running: auditTasks.filter(t => t.status === '执行中').length,
    completed: auditTasks.filter(t => t.status === '已完成').length,
    paused: auditTasks.filter(t => t.status === '暂停').length,
    pending: auditTasks.filter(t => t.status === '待执行').length
  };

  const handleTaskAction = (taskId, action) => {
    console.log(`执行任务 ${taskId} 的 ${action} 操作`);
    // 这里可以添加具体的任务操作逻辑
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-6">
        {/* 页面头部 - 简化设计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link
                to={`/projects/${id}`}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回项目详情
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">审计任务管理</h1>
                <p className="text-gray-600">{project.name}</p>
              </div>
            </div>
            <Link
              to={`/projects/${id}/audit`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              新建审计任务
            </Link>
          </div>
        </div>

        {/* 统计概览 - 简化设计 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">总任务数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <Target className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">执行中</p>
                <p className="text-2xl font-bold text-gray-900">{stats.running}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Play className="h-6 w-6 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600 mb-1">暂停</p>
                <p className="text-2xl font-bold text-gray-900">{stats.paused}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <Pause className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">待执行</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 - 简化设计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">搜索和筛选</h3>
              <p className="text-gray-600 text-sm">快速找到您需要的审计任务</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索任务名称或描述..."
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
                  <option value="执行中">执行中</option>
                  <option value="已完成">已完成</option>
                  <option value="暂停">暂停</option>
                  <option value="待执行">待执行</option>
                </select>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <span className="text-sm text-gray-600">
                  找到 <span className="font-semibold text-blue-600">{filteredTasks.length}</span> 个任务
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 任务列表 - 简化设计 */}
        <div className="space-y-6">
          {filteredTasks.map((task) => {
            const statusConfig = getStatusConfig(task.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div key={task.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <div className="p-8">
                  {/* 任务头部信息 */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{task.name}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                          <StatusIcon className="h-4 w-4 mr-1" />
                          {task.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {task.subProject}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          创建者：{task.creator}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          创建时间：{task.createdAt}
                        </span>
                      </div>

                      {/* 任务时间信息 */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                        {task.startTime && (
                          <span className="flex items-center">
                            <Play className="h-4 w-4 mr-1" />
                            开始：{task.startTime}
                          </span>
                        )}
                        {task.completedAt && (
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            完成：{task.completedAt}
                          </span>
                        )}
                        {task.pausedAt && (
                          <span className="flex items-center">
                            <Pause className="h-4 w-4 mr-1" />
                            暂停：{task.pausedAt}
                          </span>
                        )}
                        {task.estimatedCompletion && (
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            预计完成：{task.estimatedCompletion}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 任务进度 */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium">任务进度</span>
                      <span className="font-bold">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${getProgressColor(task.progress)} h-2 rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 审计成果统计 */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertTriangle className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-amber-700">{task.results.clues}</div>
                      <div className="text-sm text-amber-800">线索</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-red-700">{task.results.issues}</div>
                      <div className="text-sm text-red-800">问题</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-700">{task.results.workpapers}</div>
                      <div className="text-sm text-blue-800">底稿</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleTaskAction(task.id, 'view')}
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium border border-blue-200"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        查看详情
                      </button>
                      
                      {task.status === '执行中' && (
                        <button
                          onClick={() => handleTaskAction(task.id, 'pause')}
                          className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors duration-200 font-medium border border-amber-200"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          暂停
                        </button>
                      )}
                      
                      {task.status === '暂停' && (
                        <button
                          onClick={() => handleTaskAction(task.id, 'resume')}
                          className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium border border-green-200"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          继续
                        </button>
                      )}
                      
                      {task.status === '待执行' && (
                        <button
                          onClick={() => handleTaskAction(task.id, 'start')}
                          className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium border border-green-200"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          开始
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleTaskAction(task.id, 'copy')}
                        className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium border border-gray-200"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        复制
                      </button>
                      
                      <button
                        onClick={() => handleTaskAction(task.id, 'edit')}
                        className="inline-flex items-center px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors duration-200 font-medium border border-slate-200"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        设置
                      </button>
                      
                      <button
                        onClick={() => handleTaskAction(task.id, 'delete')}
                        className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium border border-red-200"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 空状态 - 简化设计 */}
        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-sm mx-auto">
              <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无审计任务</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? '没有找到符合条件的审计任务，请调整搜索条件'
                  : '还没有创建任何审计任务，点击按钮创建第一个任务'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  to={`/projects/${id}/audit`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm font-medium"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  创建第一个审计任务
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 