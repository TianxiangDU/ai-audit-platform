import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Eye, Edit, 
  AlertTriangle, CheckCircle, FileText, Lightbulb, Target,
  Bot, Wand2, User, Link as LinkIcon, Download, ChevronDown,
  Building, Calendar, Users, FolderOpen
} from 'lucide-react';

export const ProjectWorkspace = () => {
  const { id } = useParams();
  const [selectedSubProject, setSelectedSubProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // 模拟项目数据
  const project = {
    id: parseInt(id) || 1,
    name: '建设工程项目A审计',
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    manager: '张三',
    team: ['张三', '李四', '王五'],
    description: '某市政基础设施建设工程全过程审计，包括预算审计、施工过程监督、竣工决算审计等多个阶段'
  };

  // 子项目数据
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
    }
  ];

  // 当前子项目的审计线索数据（属于子项目）
  const getSubProjectClues = (subProjectId) => {
    if (!subProjectId) return [];
    
    const cluesData = {
      1: [
        {
          id: 1,
          title: '材料价格超出市场指导价',
          description: '钢筋采购价格比市场指导价高出15%，涉及金额约50万元',
          source: 'AI分析',
          severity: '高',
          status: '已确认',
          createdAt: '2024-01-15 10:30'
        }
      ],
      2: [
        {
          id: 2,
          title: '施工质量监管不到位',
          description: '发现某些施工环节缺乏有效监管，存在质量隐患',
          source: '手动添加',
          severity: '中',
          status: '待确认',
          createdAt: '2024-01-14 15:20'
        },
        {
          id: 3,
          title: '材料验收程序不规范',
          description: '部分材料验收缺少必要的检验程序',
          source: 'AI分析',
          severity: '中',
          status: '已确认',
          createdAt: '2024-01-13 09:45'
        }
      ],
      3: []
    };
    
    return cluesData[subProjectId] || [];
  };

  // 项目级别的审计问题数据（属于整个项目）
  const auditIssues = [
    {
      id: 1,
      title: '招标程序违规',
      description: '招标过程中未按规定进行资格预审，存在程序违规风险',
      severity: '高',
      amount: 0,
      status: '待处理',
      createdAt: '2024-01-15 11:00',
      relatedSubProjects: [1, 2],
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
      relatedSubProjects: [1],
      workpaper: { id: 2, status: '草稿' },
      auditor: '李四'
    }
  ];

  // 项目级别的审计底稿数据
  const auditWorkpapers = [
    {
      id: 1,
      title: '招标程序违规问题底稿',
      issueId: 1,
      status: '已完成',
      createdAt: '2024-01-15 14:20',
      lastModified: '2024-01-15 16:45',
      auditor: '张三'
    },
    {
      id: 2,
      title: '预算编制问题底稿',
      issueId: 2,
      status: '草稿',
      createdAt: '2024-01-14 17:00',
      lastModified: '2024-01-15 09:30',
      auditor: '李四'
    }
  ];

  // 项目级别的审计报告数据
  const auditReports = [
    {
      id: 1,
      title: '建设工程项目A中期审计报告',
      type: '中期报告',
      status: '草稿',
      createdAt: '2024-01-15 10:00',
      lastModified: '2024-01-15 17:30',
      selectedIssues: [1, 2],
      auditor: '王五'
    }
  ];

  const tabs = [
    { id: 'overview', name: '项目概览', icon: Building },
    { id: 'clues', name: '审计线索', icon: Lightbulb, requireSubProject: true },
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
      case '进行中': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '待开始': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-600 to-green-700';
    if (progress >= 50) return 'from-blue-600 to-blue-700';
    if (progress >= 20) return 'from-amber-600 to-amber-700';
    return 'from-gray-500 to-gray-600';
  };

  // 导出审计问题表单
  const handleExportIssues = () => {
    // 这里可以实现真实的导出功能
    const csvContent = [
      ['问题编号', '问题标题', '问题描述', '严重程度', '涉及金额', '状态', '审计人', '创建时间'],
      ...auditIssues.map(issue => [
        issue.id,
        issue.title,
        issue.description,
        issue.severity,
        issue.amount,
        issue.status,
        issue.auditor,
        issue.createdAt
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${project.name}-审计问题表单.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* 项目信息卡片 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">项目信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">项目周期：</span>
                <span className="font-medium text-gray-900 ml-1">{project.startDate} ~ {project.endDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">项目经理：</span>
                <span className="font-medium text-gray-900 ml-1">{project.manager}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">团队成员：</span>
                <span className="font-medium text-gray-900 ml-1">{project.team.join('、')}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">审计成果统计</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-lg font-bold text-amber-700">{subProjects.reduce((sum, sp) => sum + sp.auditClues, 0)}</div>
                <div className="text-sm text-amber-800">审计线索</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="text-lg font-bold text-red-700">{auditIssues.length}</div>
                <div className="text-sm text-red-800">审计问题</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-lg font-bold text-blue-700">{auditWorkpapers.length}</div>
                <div className="text-sm text-blue-800">审计底稿</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-lg font-bold text-green-700">{auditReports.length}</div>
                <div className="text-sm text-green-800">审计报告</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 子项目管理 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">子项目管理</h3>
          <p className="text-gray-600 text-sm mt-1">管理和监控各个子项目的执行情况</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {subProjects.map((subProject) => (
              <div key={subProject.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-base font-semibold text-gray-900">{subProject.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(subProject.status)}`}>
                        {subProject.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{subProject.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        截止：{subProject.dueDate}
                      </span>
                      <span className="flex items-center">
                        <Lightbulb className="h-4 w-4 mr-1" />
                        审计线索：{subProject.auditClues}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
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
                  <div className="ml-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedSubProject(subProject);
                        setActiveTab('clues');
                      }}
                      className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200"
                    >
                      <Lightbulb className="h-4 w-4 mr-1" />
                      查看线索
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCluesTab = () => {
    if (!selectedSubProject) {
      return (
        <div className="text-center py-12">
          <Lightbulb className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">请先选择子项目</h3>
          <p className="text-gray-500 mb-6">审计线索属于具体的子项目，请先选择一个子项目来查看其审计线索</p>
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">选择子项目</label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedSubProject?.id || ''}
                onChange={(e) => {
                  const subProject = subProjects.find(sp => sp.id === parseInt(e.target.value));
                  setSelectedSubProject(subProject);
                }}
              >
                <option value="">请选择子项目</option>
                {subProjects.map((subProject) => (
                  <option key={subProject.id} value={subProject.id}>
                    {subProject.name} ({subProject.auditClues}个线索)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      );
    }

    const currentClues = getSubProjectClues(selectedSubProject.id);

    return (
      <div className="space-y-4">
        {/* 子项目信息栏 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">当前子项目：{selectedSubProject.name}</h3>
                <p className="text-blue-700 text-sm">{selectedSubProject.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedSubProject.status)}`}>
                {selectedSubProject.status}
              </span>
              <button
                onClick={() => setSelectedSubProject(null)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                切换子项目
              </button>
            </div>
          </div>
        </div>

        {/* 操作栏 */}
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
              <option value="">全部状态</option>
              <option value="已确认">已确认</option>
              <option value="待确认">待确认</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/projects/${id}/audit`}
              className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI生成线索
            </Link>
            <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Plus className="h-4 w-4 mr-2" />
              新建线索
            </button>
          </div>
        </div>

        {/* 线索列表 */}
        {currentClues.length === 0 ? (
          <div className="text-center py-8">
            <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-900 font-medium mb-1">暂无审计线索</h3>
            <p className="text-gray-500 text-sm">该子项目还没有审计线索，您可以通过AI审计生成或手动添加</p>
          </div>
        ) : (
          currentClues.map((clue) => (
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
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{clue.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>来源：{clue.source}</span>
                    <span>时间：{clue.createdAt}</span>
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
          ))
        )}
      </div>
    );
  };

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
        <div className="flex space-x-2">
          <button
            onClick={handleExportIssues}
            className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            导出表单
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Plus className="h-4 w-4 mr-2" />
            新建问题
          </button>
        </div>
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
                <span className="text-xs text-gray-500">相关子项目：</span>
                {issue.relatedSubProjects.map((subProjectId) => {
                  const subProject = subProjects.find(sp => sp.id === subProjectId);
                  return (
                    <span key={subProjectId} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      {subProject?.name}
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
      case 'overview': return renderOverviewTab();
      case 'clues': return renderCluesTab();
      case 'issues': return renderIssuesTab();
      case 'workpapers': return renderWorkpapersTab();
      case 'reports': return renderReportsTab();
      default: return renderOverviewTab();
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
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600 text-sm mt-1">项目工作空间 - 审计线索分析、问题确认、底稿编写和报告生成</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to={`/projects/${id}`}
                className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-200"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
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
                    {tab.requireSubProject && selectedSubProject && (
                      <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {selectedSubProject.name}
                      </span>
                    )}
                    {tab.count !== undefined && (
                      <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
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