import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Eye, 
  FileText, Lightbulb, Target,
  Bot, User, Download,
  Building, Calendar, Users, Play, BarChart3,
  Upload, Camera, Image, Trash2
} from 'lucide-react';
import { ProjectResults } from './ProjectResults';
import { ProjectDocuments } from './ProjectDocuments';

export const ProjectWorkspace = () => {
  const { id } = useParams();
  const location = useLocation();
  const [selectedSubProject, setSelectedSubProject] = useState(null);
  const [activeTab, setActiveTab] = useState('start-audit'); // 默认打开"开始审计"

  // 模拟项目数据
  const project = {
    id: parseInt(id) || 1,
    name: '建设工程项目A审计',
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    manager: '张三',
    team: ['张三', '李四', '王五'],
    description: '某市政基础设施建设工程全过程审计，包括预算审计、施工过程监督、竣工决算审计等多个阶段',
    budget: 5000000,
    location: '某市中心区'
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

  // 从URL参数中获取子项目ID
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const subProjectId = urlParams.get('subProject');
    
    if (subProjectId) {
      // 根据subProjectId找到对应的子项目
      const subProject = subProjects.find(sp => sp.id === parseInt(subProjectId));
      if (subProject) {
        setSelectedSubProject(subProject);
      }
    }
  }, [location.search, subProjects]);

  // 审计线索数据（属于子项目）
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

  // 审计证据数据
  const [auditEvidence, setAuditEvidence] = useState([
    {
      id: 1,
      name: '施工现场违规操作照片',
      type: 'image',
      size: '2.3MB',
      uploadDate: '2024-01-15 14:30',
      uploader: '张三',
      location: '施工现场东侧',
      description: '发现工人未佩戴安全帽进行高空作业',
      relatedClueId: 2,
      tags: ['安全违规', '高空作业', '现场拍摄']
    },
    {
      id: 2,
      name: '材料采购发票扫描件',
      type: 'document',
      size: '1.8MB',
      uploadDate: '2024-01-14 16:20',
      uploader: '李四',
      location: '财务办公室',
      description: '钢筋采购发票，价格明显高于市场价',
      relatedClueId: 1,
      tags: ['财务证据', '采购发票', '价格异常']
    },
    {
      id: 3,
      name: '质量检测报告',
      type: 'document',
      size: '3.5MB',
      uploadDate: '2024-01-13 11:45',
      uploader: '王五',
      location: '质检实验室',
      description: '混凝土强度检测不合格报告',
      relatedClueId: 3,
      tags: ['质量问题', '检测报告', '不合格']
    }
  ]);

  // 统计数据
  const statistics = {
    totalClues: subProjects.reduce((sum, sp) => sum + sp.auditClues, 0),
    totalIssues: 12,
    totalWorkpapers: 8,
    totalReports: 3,
    totalEvidence: auditEvidence.length
  };

  // 标签页配置
  const tabs = [
    { id: 'start-audit', name: '开始审计', icon: Play },
    { id: 'audit-evidence', name: '审计证据', icon: Camera },
    { id: 'audit-results', name: '审计成果', icon: BarChart3 },
    { id: 'project-documents', name: '项目资料', icon: FileText }
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

  const getEvidenceTypeIcon = (type) => {
    switch (type) {
      case 'image': return Image;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getEvidenceTypeColor = (type) => {
    switch (type) {
      case 'image': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'document': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // 开始审计页面（主要页面）
  const renderStartAuditTab = () => (
    <div className="space-y-6">
      {/* 子项目选择区域 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">选择审计子项目</h3>
        <p className="text-gray-600 text-sm mb-4">审计线索属于具体的子项目，请先选择要审计的子项目</p>
        
        {selectedSubProject ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">当前选择：{selectedSubProject.name}</h4>
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
                  重新选择
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subProjects.map((subProject) => (
              <div
                key={subProject.id}
                onClick={() => setSelectedSubProject(subProject)}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-gray-100 rounded-full p-2">
                    <Building className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{subProject.name}</h4>
                    <p className="text-gray-600 text-sm">{subProject.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">线索数：{subProject.auditClues}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(subProject.status)}`}>
                    {subProject.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 审计方式选择 */}
      {selectedSubProject && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">开始审计</h3>
            <p className="text-gray-600 text-sm mt-1">选择审计方式开始对 "{selectedSubProject.name}" 的审计工作</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* AI智能审计 */}
              <Link
                to={`/projects/${id}/audit?subProject=${selectedSubProject.id}`}
                className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Bot className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI智能审计</h3>
                  <p className="text-sm sm:text-base text-green-100 mb-4 sm:mb-6 leading-relaxed">
                    使用人工智能技术自动分析项目文档，智能识别审计线索，生成审计发现，提高审计效率和质量。
                  </p>
                  
                  <div className="flex items-center text-sm sm:text-base font-medium">
                    <span>开始AI审计</span>
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* 手动添加线索 */}
              <Link
                to={`/projects/${id}/manual-clue`}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <User className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">手动添加线索</h3>
                  <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6 leading-relaxed">
                    基于经验手工录入审计线索，支持文档预览和内容圈选，灵活处理特殊情况和复杂业务场景。
                  </p>
                  
                  <div className="flex items-center text-sm sm:text-base font-medium">
                    <span>手动录入</span>
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 当前子项目的审计线索 */}
      {selectedSubProject && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedSubProject.name} - 审计线索
                </h3>
                <p className="text-gray-600 text-sm mt-1">当前子项目的所有审计线索</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  共 {getSubProjectClues(selectedSubProject.id).length} 条线索
                </span>
                <button className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <Target className="h-4 w-4 mr-1" />
                  批量生成问题
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            {getSubProjectClues(selectedSubProject.id).length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-gray-900 font-medium mb-1">暂无审计线索</h4>
                <p className="text-gray-500 text-sm">该子项目还没有审计线索，请使用上方的AI审计或人工审计功能生成线索</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getSubProjectClues(selectedSubProject.id).map((clue) => (
                  <div key={clue.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
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
                        <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                          <Target className="h-4 w-4 mr-1" />
                          生成问题
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // 审计证据页面
  const renderAuditEvidenceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">审计证据</h3>
              <p className="text-gray-600 text-sm mt-1">收集和管理审计过程中的各类证据材料</p>
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                <Camera className="h-4 w-4 mr-2" />
                拍照取证
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <Upload className="h-4 w-4 mr-2" />
                上传文件
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {auditEvidence.map((evidence) => {
              const IconComponent = getEvidenceTypeIcon(evidence.type);
              return (
                <div key={evidence.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-lg p-3 ${getEvidenceTypeColor(evidence.type)}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 mb-1">{evidence.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{evidence.description}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                            <Eye className="h-4 w-4 mr-1" />
                            查看
                          </button>
                          <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                            <Download className="h-4 w-4 mr-1" />
                            下载
                          </button>
                          <button className="inline-flex items-center px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            删除
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <span>大小：{evidence.size}</span>
                        <span>上传时间：{evidence.uploadDate}</span>
                        <span>上传人：{evidence.uploader}</span>
                        <span>位置：{evidence.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">标签：</span>
                        {evidence.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 border border-gray-200">
                            {tag}
                          </span>
                        ))}
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
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'start-audit': return renderStartAuditTab();
      case 'audit-evidence': return renderAuditEvidenceTab();
      case 'audit-results': return <ProjectResults />;
      case 'project-documents': return <ProjectDocuments />;
      default: return renderStartAuditTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        {/* 页面头部 - 整合项目信息 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
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
                <p className="text-gray-600 text-sm mt-1">项目工作空间 - 审计流程的核心工作界面</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>

          {/* 项目基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">项目信息</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">周期：</span>
                  <span className="font-medium text-gray-900 ml-1">{project.startDate} ~ {project.endDate}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">经理：</span>
                  <span className="font-medium text-gray-900 ml-1">{project.manager}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">团队：</span>
                  <span className="font-medium text-gray-900 ml-1">{project.team.length}人</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">审计统计</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-amber-50 rounded border border-amber-200">
                  <div className="text-sm font-bold text-amber-700">{statistics.totalClues}</div>
                  <div className="text-xs text-amber-800">线索</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                  <div className="text-sm font-bold text-red-700">{statistics.totalIssues}</div>
                  <div className="text-xs text-red-800">问题</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">成果统计</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                  <div className="text-sm font-bold text-blue-700">{statistics.totalWorkpapers}</div>
                  <div className="text-xs text-blue-800">底稿</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                  <div className="text-sm font-bold text-green-700">{statistics.totalReports}</div>
                  <div className="text-xs text-green-800">报告</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">证据统计</h3>
              <div className="text-center p-2 bg-purple-50 rounded border border-purple-200">
                <div className="text-sm font-bold text-purple-700">{statistics.totalEvidence}</div>
                <div className="text-xs text-purple-800">证据</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">子项目进度</h3>
              <div className="space-y-2">
                {subProjects.map((subProject) => (
                  <div key={subProject.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 truncate flex-1 mr-2">{subProject.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`bg-gradient-to-r ${getProgressColor(subProject.progress)} h-1.5 rounded-full`}
                          style={{ width: `${subProject.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-500 w-8">{subProject.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
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
                    <tab.icon className={`h-4 w-4 mr-2 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    {tab.name}
                    {tab.id === 'start-audit' && selectedSubProject && (
                      <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {selectedSubProject.name}
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