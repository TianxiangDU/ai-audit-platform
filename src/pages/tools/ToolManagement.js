import React, { useState } from 'react';
import { 
  Calculator, BarChart3, FileSearch, Database, AlertTriangle, 
  TrendingUp, Zap, Target, Download, Settings, ArrowRight,
  FileText, PieChart, Search, Filter, Eye, Play, Clock, Users
} from 'lucide-react';

export const ToolManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toolCategories = [
    { id: 'all', name: '全部工具', icon: Target },
    { id: 'analysis', name: '数据分析', icon: BarChart3 },
    { id: 'calculation', name: '计算工具', icon: Calculator },
    { id: 'detection', name: '风险检测', icon: AlertTriangle },
    { id: 'report', name: '报告生成', icon: FileText }
  ];

  const auditTools = [
    {
      id: 1,
      name: '财务数据分析工具',
      category: 'analysis',
      description: '通过对财务数据的多维度分析，快速识别异常交易和潜在风险点',
      features: ['数据导入', '异常检测', '趋势分析', '可视化图表'],
      icon: BarChart3,
      iconColor: 'blue',
      usage: 'high',
      lastUsed: '2024-01-15',
      status: 'active',
      difficulty: '简单',
      estimatedTime: '10-30分钟'
    },
    {
      id: 2,
      name: '合同金额计算器',
      category: 'calculation',
      description: '自动计算工程变更、价格调整等复杂合同金额，支持多种计价方式',
      features: ['价格计算', '变更统计', '汇率转换', '税费计算'],
      icon: Calculator,
      iconColor: 'green',
      usage: 'medium',
      lastUsed: '2024-01-14',
      status: 'active',
      difficulty: '简单',
      estimatedTime: '5-15分钟'
    },
    {
      id: 3,
      name: '关联企业识别工具',
      category: 'detection',
      description: '通过企业工商信息、人员关系等数据，自动识别潜在的关联企业关系',
      features: ['企业查询', '关系图谱', '风险评估', '报告导出'],
      icon: Database,
      iconColor: 'amber',
      usage: 'high',
      lastUsed: '2024-01-13',
      status: 'active',
      difficulty: '中等',
      estimatedTime: '20-60分钟'
    },
    {
      id: 4,
      name: '采购价格对比分析',
      category: 'analysis',
      description: '对比历史采购价格、市场价格，识别采购价格异常和潜在问题',
      features: ['价格对比', '市场分析', '异常标记', '趋势预测'],
      icon: TrendingUp,
      iconColor: 'purple',
      usage: 'medium',
      lastUsed: '2024-01-12',
      status: 'active',
      difficulty: '中等',
      estimatedTime: '15-45分钟'
    },
    {
      id: 5,
      name: '风险评估模型',
      category: 'detection',
      description: '基于历史审计数据和风险指标，对项目进行综合风险评估',
      features: ['风险建模', '指标评估', '等级划分', '预警提醒'],
      icon: AlertTriangle,
      iconColor: 'red',
      usage: 'low',
      lastUsed: '2024-01-10',
      status: 'active',
      difficulty: '复杂',
      estimatedTime: '30-90分钟'
    },
    {
      id: 6,
      name: '审计报告生成器',
      category: 'report',
      description: '根据审计发现和模板，自动生成标准化的审计报告',
      features: ['模板选择', '自动填充', '格式调整', '批量生成'],
      icon: FileText,
      iconColor: 'slate',
      usage: 'high',
      lastUsed: '2024-01-11',
      status: 'active',
      difficulty: '简单',
      estimatedTime: '10-30分钟'
    },
    {
      id: 7,
      name: '数据可视化工具',
      category: 'analysis',
      description: '将审计数据转换为直观的图表和仪表板，支持多种图表类型',
      features: ['图表制作', '仪表板', '交互分析', '在线分享'],
      icon: PieChart,
      iconColor: 'indigo',
      usage: 'medium',
      lastUsed: '2024-01-09',
      status: 'beta',
      difficulty: '中等',
      estimatedTime: '20-60分钟'
    },
    {
      id: 8,
      name: 'AI智能检索工具',
      category: 'detection',
      description: '利用人工智能技术，在大量文档中快速检索关键信息和异常内容',
      features: ['智能搜索', '内容提取', '异常标记', '相似度分析'],
      icon: Zap,
      iconColor: 'yellow',
      usage: 'high',
      lastUsed: '2024-01-08',
      status: 'new',
      difficulty: '简单',
      estimatedTime: '5-20分钟'
    }
  ];

  const getIconColorClass = (color) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      amber: 'text-amber-600 bg-amber-50',
      purple: 'text-purple-600 bg-purple-50',
      red: 'text-red-600 bg-red-50',
      slate: 'text-slate-600 bg-slate-50',
      indigo: 'text-indigo-600 bg-indigo-50',
      yellow: 'text-yellow-600 bg-yellow-50'
    };
    return colorMap[color] || 'text-gray-600 bg-gray-50';
  };

  const getUsageBadge = (usage) => {
    switch (usage) {
      case 'high': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'beta': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'new': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case '简单': return 'text-green-700';
      case '中等': return 'text-amber-700';
      case '复杂': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  const filteredTools = selectedCategory === 'all' 
    ? auditTools 
    : auditTools.filter(tool => tool.category === selectedCategory);

  const handleToolUse = (toolId) => {
    console.log(`启动工具: ${toolId}`);
    // 这里可以添加具体的工具启动逻辑
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-6">
        {/* 页面标题 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">审计工具箱</h1>
              <p className="text-gray-600">使用专业的审计工具提升工作效率和质量</p>
            </div>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              <Settings className="h-5 w-5 mr-2" />
              工具设置
            </button>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">可用工具</p>
                <p className="text-2xl font-bold text-gray-900">{auditTools.length}</p>
                <p className="text-sm text-green-600 font-medium">+2 新增</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">高频使用</p>
                <p className="text-2xl font-bold text-gray-900">{auditTools.filter(t => t.usage === 'high').length}</p>
                <p className="text-sm text-blue-600 font-medium">热门工具</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">最近使用</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-amber-600 font-medium">今日使用</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">协作工具</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-purple-600 font-medium">支持团队</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 工具分类和搜索 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              {/* 分类筛选 */}
              <div className="flex flex-wrap gap-2">
                {toolCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索工具..."
                  className="pl-10 w-full h-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* 工具卡片网格 */}
          <div className="p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <div key={tool.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 group">
                    <div className="p-6">
                      {/* 工具头部 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${getIconColorClass(tool.iconColor)}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusBadge(tool.status)}`}>
                            {tool.status === 'active' ? '可用' : tool.status === 'beta' ? 'Beta' : '新增'}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getUsageBadge(tool.usage)}`}>
                            {tool.usage === 'high' ? '高频' : tool.usage === 'medium' ? '中频' : '低频'}
                          </span>
                        </div>
                      </div>

                      {/* 工具信息 */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* 工具特性 */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">主要功能：</h4>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.map((feature, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-50 text-gray-700 border border-gray-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 工具详情 */}
                      <div className="space-y-2 mb-4 text-sm text-gray-500">
                        <div className="flex justify-between">
                          <span>难度等级：</span>
                          <span className={`font-medium ${getDifficultyColor(tool.difficulty)}`}>
                            {tool.difficulty}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>预估时间：</span>
                          <span className="font-medium text-gray-700">{tool.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>最后使用：</span>
                          <span className="font-medium text-gray-700">{tool.lastUsed}</span>
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToolUse(tool.id)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          使用工具
                        </button>
                        <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 空状态 */}
            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无相关工具</h3>
                <p className="text-gray-500">请尝试其他分类或搜索关键词</p>
              </div>
            )}
          </div>

          {/* 快速访问工具栏 */}
          <div className="px-8 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">快速访问</h4>
              <div className="flex space-x-2">
                {auditTools.filter(t => t.usage === 'high').slice(0, 4).map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolUse(tool.id)}
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${getIconColorClass(tool.iconColor)} hover:opacity-80`}
                      title={tool.name}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {tool.name.split('工具')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 