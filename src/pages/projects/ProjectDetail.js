import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, CheckCircle, AlertTriangle, Users, FolderOpen, Zap, Eye, Plus, Target, TrendingUp, BarChart3, Bot, List } from 'lucide-react';

export const ProjectDetail = () => {
  const { id } = useParams();

  // 模拟项目数据
  const project = {
    id: parseInt(id) || 1,
    name: '建设工程项目A审计',
    description: '某市政基础设施建设工程全过程审计，包括预算审计、施工过程监督、竣工决算审计等多个阶段',
    status: '进行中',
    progress: 65,
    startDate: '2023-12-01',
    endDate: '2024-01-15',
    manager: '张三',
    members: ['张三', '李四', '王五'],
    category: '工程审计',
    budget: '500万元',
    client: '某市建设局'
  };

  const subProjects = [
    { 
      id: 1, 
      name: '预算审计', 
      description: '审计工程预算的合理性和准确性',
      status: '已完成', 
      progress: 100, 
      dueDate: '2023-12-15',
      auditClues: 5
    },
    { 
      id: 2, 
      name: '施工过程监督', 
      description: '监督施工过程的质量和合规性',
      status: '进行中', 
      progress: 70, 
      dueDate: '2024-01-05',
      auditClues: 8
    },
    { 
      id: 3, 
      name: '竣工决算审计', 
      description: '审计竣工决算的真实性和完整性',
      status: '待开始', 
      progress: 0, 
      dueDate: '2024-01-15',
      auditClues: 0
    },
  ];

  // 审计成果数据
  const auditResults = {
    clues: subProjects.reduce((sum, sp) => sum + sp.auditClues, 0),
    cluesIncrease: 4,
    issues: 5,
    issuesIncrease: 1,
    workpapers: 8,
    workpapersIncrease: 3,
    reports: 2,
    reportsIncrease: 1
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '进行中': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '待开始': return 'bg-gray-50 text-gray-700 border-gray-200';
      case '已完成': return 'bg-green-50 text-green-700 border-green-200';
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
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-6">
        {/* 项目信息头部 - 简化设计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  返回项目列表
                </Link>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">开始时间：</span>
                  <span className="font-medium text-gray-900 ml-1">{project.startDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">结束时间：</span>
                  <span className="font-medium text-gray-900 ml-1">{project.endDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">项目经理：</span>
                  <span className="font-medium text-gray-900 ml-1">{project.manager}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Target className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">项目类型：</span>
                  <span className="font-medium text-gray-900 ml-1">{project.category}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link
                to={`/projects/${id}/audit`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                <Bot className="h-5 w-5 mr-2" />
                AI审计
              </Link>
              <Link
                to={`/projects/${id}/audit-tasks`}
                className="inline-flex items-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 shadow-sm"
              >
                <List className="h-5 w-5 mr-2" />
                任务管理
              </Link>
            </div>
          </div>
        </div>

        {/* 审计成果总览 - 简化设计 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">发现线索</p>
                <p className="text-2xl font-bold text-gray-900">{auditResults.clues}</p>
                <p className="text-sm text-green-600 font-medium">较上月 +{auditResults.cluesIncrease}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">确认问题</p>
                <p className="text-2xl font-bold text-gray-900">{auditResults.issues}</p>
                <p className="text-sm text-green-600 font-medium">较上月 +{auditResults.issuesIncrease}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">审计底稿</p>
                <p className="text-2xl font-bold text-gray-900">{auditResults.workpapers}</p>
                <p className="text-sm text-green-600 font-medium">较上月 +{auditResults.workpapersIncrease}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">审计报告</p>
                <p className="text-2xl font-bold text-gray-900">{auditResults.reports}</p>
                <p className="text-sm text-green-600 font-medium">较上月 +{auditResults.reportsIncrease}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 子项目管理 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">子项目管理</h3>
                  <p className="text-gray-600 mt-1">管理和监控各个子项目的执行情况</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium border border-gray-200">
                  <Plus className="h-4 w-4 mr-2" />
                  新增子项目
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {subProjects.map((subProject) => (
                <div key={subProject.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {subProject.name}
                        </h4>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subProject.status)}`}>
                          {subProject.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 leading-relaxed">{subProject.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          截止：{subProject.dueDate}
                        </span>
                        <span className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          审计线索：{subProject.auditClues}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>完成进度</span>
                          <span className="font-semibold">{subProject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${getProgressColor(subProject.progress)} h-2 rounded-full transition-all duration-500 ease-out`}
                            style={{ width: `${subProject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 flex space-x-2">
                      <Link
                        to={`/projects/${project.id}/results?subProject=${subProject.id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium border border-blue-200"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        查看线索
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 项目资料 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <FolderOpen className="h-5 w-5 mr-2" />
                  项目资料
                </h3>
                <Link
                  to={`/projects/${project.id}/documents`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors duration-200"
                >
                  管理文件
                </Link>
              </div>
            </div>
            <div className="p-6">
              {/* 项目资料总结 */}
              <div className="space-y-4">
                <div className="group relative overflow-hidden bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900">合同文件</h4>
                      <p className="text-xs text-blue-700 mt-1 leading-relaxed">包含项目合同、协议等法律文件，共2个文件</p>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden bg-green-50 p-4 rounded-lg border border-green-200 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-green-900">技术文档</h4>
                      <p className="text-xs text-green-700 mt-1 leading-relaxed">工程图纸、技术规范等技术类文档，共5个文件</p>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden bg-amber-50 p-4 rounded-lg border border-amber-200 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-900">财务资料</h4>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">预算清单、财务报表等财务相关文档，共3个文件</p>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-slate-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">审计资料</h4>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">已上传的审计相关文档和证据材料，共1个文件</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to={`/projects/${project.id}/documents`}
                  className="w-full block text-center py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  查看和管理所有文件
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};