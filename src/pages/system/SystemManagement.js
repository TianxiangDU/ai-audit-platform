import React, { useState } from 'react';
import { 
  Users, Shield, Eye, Settings, Clock, BarChart3, 
  Search, Plus, Edit, Trash2, Key, Database, Activity,
  User, Calendar, FileText, AlertTriangle, CheckCircle,
  Filter, Download, UserCheck, Lock, Unlock
} from 'lucide-react';

export const SystemManagement = () => {
  const [activeTab, setActiveTab] = useState('permissions');

  const tabs = [
    { id: 'permissions', name: '功能权限', icon: Shield },
    { id: 'data-access', name: '数据权限', icon: Database },
    { id: 'usage-logs', name: '使用记录', icon: Activity },
    { id: 'user-management', name: '用户管理', icon: Users },
    { id: 'system-settings', name: '系统设置', icon: Settings }
  ];

  // 功能权限数据
  const functionPermissions = [
    {
      id: 1,
      moduleName: '项目管理',
      permissions: [
        { name: '查看项目', key: 'project.view', enabled: true },
        { name: '创建项目', key: 'project.create', enabled: true },
        { name: '编辑项目', key: 'project.edit', enabled: true },
        { name: '删除项目', key: 'project.delete', enabled: false }
      ],
      roles: ['审计员', '审计组长', '审计经理']
    },
    {
      id: 2,
      moduleName: 'AI审计',
      permissions: [
        { name: '使用AI审计', key: 'ai.audit', enabled: true },
        { name: '查看AI结果', key: 'ai.results', enabled: true },
        { name: '配置AI参数', key: 'ai.config', enabled: false },
        { name: '训练AI模型', key: 'ai.train', enabled: false }
      ],
      roles: ['审计员', '审计组长']
    },
    {
      id: 3,
      moduleName: '知识库管理',
      permissions: [
        { name: '查看知识库', key: 'knowledge.view', enabled: true },
        { name: '新增内容', key: 'knowledge.create', enabled: true },
        { name: '编辑内容', key: 'knowledge.edit', enabled: false },
        { name: '删除内容', key: 'knowledge.delete', enabled: false }
      ],
      roles: ['审计组长', '审计经理']
    }
  ];

  // 数据权限数据
  const dataPermissions = [
    {
      id: 1,
      userName: '张三',
      role: '审计员',
      department: '第一审计组',
      dataScope: '本组数据',
      projects: ['项目A', '项目B'],
      lastUpdate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      userName: '李四',
      role: '审计组长',
      department: '第一审计组',
      dataScope: '本组及下级',
      projects: ['项目A', '项目B', '项目C'],
      lastUpdate: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      userName: '王五',
      role: '审计经理',
      department: '审计部',
      dataScope: '全部数据',
      projects: ['全部项目'],
      lastUpdate: '2024-01-13',
      status: 'active'
    }
  ];

  // 使用记录数据
  const usageLogs = [
    {
      id: 1,
      userName: '张三',
      action: '创建审计项目',
      module: '项目管理',
      target: '建设工程项目A',
      ip: '192.168.1.100',
      time: '2024-01-15 14:30:25',
      status: 'success',
      details: '成功创建新项目'
    },
    {
      id: 2,
      userName: '李四',
      action: '使用AI审计',
      module: 'AI审计',
      target: '财务数据分析',
      ip: '192.168.1.101',
      time: '2024-01-15 14:25:12',
      status: 'success',
      details: 'AI审计完成，发现3个问题'
    },
    {
      id: 3,
      userName: '王五',
      action: '查看审计报告',
      module: '项目管理',
      target: '项目A审计报告',
      ip: '192.168.1.102',
      time: '2024-01-15 14:20:45',
      status: 'success',
      details: '下载PDF报告'
    },
    {
      id: 4,
      userName: '赵六',
      action: '登录失败',
      module: '系统登录',
      target: '用户认证',
      ip: '192.168.1.103',
      time: '2024-01-15 14:15:30',
      status: 'failed',
      details: '密码错误，已锁定账户'
    }
  ];

  // 用户管理数据
  const users = [
    {
      id: 1,
      name: '张三',
      username: 'zhangsan',
      email: 'zhangsan@company.com',
      role: '审计员',
      department: '第一审计组',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      createdAt: '2023-06-01'
    },
    {
      id: 2,
      name: '李四',
      username: 'lisi',
      email: 'lisi@company.com',
      role: '审计组长',
      department: '第一审计组',
      status: 'active',
      lastLogin: '2024-01-15 14:25',
      createdAt: '2023-05-15'
    },
    {
      id: 3,
      name: '王五',
      username: 'wangwu',
      email: 'wangwu@company.com',
      role: '审计经理',
      department: '审计部',
      status: 'active',
      lastLogin: '2024-01-15 14:20',
      createdAt: '2023-01-01'
    },
    {
      id: 4,
      name: '赵六',
      username: 'zhaoliu',
      email: 'zhaoliu@company.com',
      role: '审计员',
      department: '第二审计组',
      status: 'locked',
      lastLogin: '2024-01-10 09:15',
      createdAt: '2023-08-20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'locked': return 'bg-red-50 text-red-700 border-red-200';
      case 'inactive': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'success': return 'bg-green-50 text-green-700 border-green-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case '审计经理': return 'bg-purple-50 text-purple-700 border-purple-200';
      case '审计组长': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '审计员': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'permissions':
        return (
          <div className="space-y-6">
            {functionPermissions.map((module) => (
              <div key={module.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{module.moduleName}</h3>
                  <div className="flex space-x-2">
                    {module.roles.map((role, index) => (
                      <span key={index} className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getRoleColor(role)}`}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {module.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {permission.enabled ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400 mr-2" />
                        )}
                        <span className={`text-sm font-medium ${permission.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                          {permission.name}
                        </span>
                      </div>
                      <button className={`w-12 h-6 rounded-full transition-colors ${permission.enabled ? 'bg-green-600' : 'bg-gray-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${permission.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'data-access':
        return (
          <div className="space-y-6">
            {dataPermissions.map((user) => (
              <div key={user.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{user.userName}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? '正常' : '禁用'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <span className="text-sm text-gray-500">所属部门：</span>
                        <span className="text-sm font-medium text-gray-900 ml-1">{user.department}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">数据范围：</span>
                        <span className="text-sm font-medium text-gray-900 ml-1">{user.dataScope}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">最后更新：</span>
                        <span className="text-sm font-medium text-gray-900 ml-1">{user.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-gray-500">可访问项目：</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {user.projects.map((project, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                            <Database className="h-3 w-3 mr-1" />
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200">
                      <Edit className="h-4 w-4 mr-1" />
                      编辑权限
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'usage-logs':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">系统使用记录</h3>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200">
                      <Download className="h-4 w-4 mr-1" />
                      导出日志
                    </button>
                    <div className="relative">
                      <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <option value="">全部模块</option>
                        <option value="project">项目管理</option>
                        <option value="ai">AI审计</option>
                        <option value="knowledge">知识库</option>
                        <option value="tools">审计工具</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">模块</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">对象</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {usageLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{log.userName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                            {log.module}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.target}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ip}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}>
                            {log.status === 'success' ? '成功' : '失败'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'user-management':
        return (
          <div className="space-y-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <span className="text-sm text-gray-500">@{user.username}</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? '正常' : user.status === 'locked' ? '锁定' : '禁用'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                      <div>
                        <span className="text-gray-500">邮箱：</span>
                        <span className="font-medium text-gray-900 ml-1">{user.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">部门：</span>
                        <span className="font-medium text-gray-900 ml-1">{user.department}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">最后登录：</span>
                        <span className="font-medium text-gray-900 ml-1">{user.lastLogin}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">创建时间：</span>
                        <span className="font-medium text-gray-900 ml-1">{user.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200">
                      <Edit className="h-4 w-4 mr-1" />
                      编辑
                    </button>
                    {user.status === 'active' ? (
                      <button className="inline-flex items-center px-3 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium border border-amber-200">
                        <Lock className="h-4 w-4 mr-1" />
                        锁定
                      </button>
                    ) : (
                      <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200">
                        <Unlock className="h-4 w-4 mr-1" />
                        解锁
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'system-settings':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">系统配置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">自动备份</h4>
                    <p className="text-sm text-gray-500">每日自动备份系统数据</p>
                  </div>
                  <button className="w-12 h-6 bg-green-600 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">审计日志</h4>
                    <p className="text-sm text-gray-500">记录所有用户操作日志</p>
                  </div>
                  <button className="w-12 h-6 bg-green-600 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">邮件通知</h4>
                    <p className="text-sm text-gray-500">重要事件邮件提醒</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        {/* 页面标题 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">系统管理</h1>
              <p className="text-gray-600 text-sm">管理系统用户、权限和配置</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm">
              <Plus className="h-4 w-4 mr-2" />
              新增用户
            </button>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">活跃用户</p>
                <p className="text-lg font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-xs text-green-600 font-medium">在线用户</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">权限组</p>
                <p className="text-lg font-bold text-gray-900">5</p>
                <p className="text-xs text-blue-600 font-medium">已配置</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">今日操作</p>
                <p className="text-lg font-bold text-gray-900">156</p>
                <p className="text-xs text-amber-600 font-medium">系统访问</p>
              </div>
              <div className="bg-amber-50 p-2 rounded-lg">
                <Activity className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">系统状态</p>
                <p className="text-lg font-bold text-gray-900">正常</p>
                <p className="text-xs text-green-600 font-medium">运行中</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* 选项卡 */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.name}
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