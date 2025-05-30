import React, { useState } from 'react';
import { 
  Search, Plus, Eye, Edit, Trash2, BookOpen, FileText, Scale, 
  Filter, Tag, Globe, Link as LinkIcon, Download, Copy, 
  Settings, ExternalLink, AlertTriangle, CheckCircle,
  FolderOpen, Clock, User, Database, Target, Zap
} from 'lucide-react';

export const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState('logic');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlineSearch, setOnlineSearch] = useState('');

  const tabs = [
    { id: 'logic', name: '审计逻辑库', icon: BookOpen, color: 'blue' },
    { id: 'cases', name: '审计案例库', icon: FileText, color: 'amber' },
    { id: 'regulations', name: '法规库', icon: Scale, color: 'slate' },
  ];

  // 审计逻辑库数据
  const logicItems = [
    { 
      id: 1, 
      name: '采购流程合规性检查', 
      category: '采购审计', 
      description: '验证政府采购流程是否符合法定程序，检查招标公告、投标文件、评标过程等关键环节',
      fileCategories: ['招标文件', '投标文件', '评标报告'],
      keyFields: {
        '招标文件': ['招标公告时间', '招标方式', '资格要求'],
        '投标文件': ['投标价格', '技术方案', '资质证明'],
        '评标报告': ['评分标准', '得分情况', '中标理由']
      },
      comparisonLogic: '比较招标公告时间与法定公示期限，验证投标价格合理性，检查评标过程公正性',
      source: '政府采购法第三十五条',
      sourceLink: '/regulations/1',
      status: '已发布', 
      updateDate: '2024-01-15',
      creator: '张三',
      useCount: 28
    },
    { 
      id: 2, 
      name: '工程变更必要性审计', 
      category: '工程审计', 
      description: '审查工程变更是否确有必要，变更程序是否合规，变更价格是否合理',
      fileCategories: ['原设计文件', '变更申请', '现场签证', '变更结算'],
      keyFields: {
        '原设计文件': ['设计标准', '工程量清单', '技术要求'],
        '变更申请': ['变更原因', '变更内容', '变更理由'],
        '现场签证': ['签证时间', '签证事项', '签证人员'],
        '变更结算': ['变更价格', '计价依据', '审核意见']
      },
      comparisonLogic: '对比原设计与变更内容，分析变更必要性，验证变更程序合规性，核实变更价格合理性',
      source: '建设工程质量管理条例第二十七条',
      sourceLink: '/regulations/2',
      status: '已发布', 
      updateDate: '2024-01-14',
      creator: '李四',
      useCount: 15
    },
    { 
      id: 3, 
      name: '财务报表真实性验证', 
      category: '财务审计', 
      description: '通过交叉验证多个财务数据源，识别财务报表中的异常和错误',
      fileCategories: ['财务报表', '会计凭证', '银行对账单'],
      keyFields: {
        '财务报表': ['资产总额', '负债总额', '收入金额', '支出金额'],
        '会计凭证': ['借方金额', '贷方金额', '科目代码', '凭证日期'],
        '银行对账单': ['账户余额', '交易金额', '交易日期', '对方账户']
      },
      comparisonLogic: '核对财务报表数据与会计凭证、银行对账单的一致性，分析异常波动和逻辑关系',
      source: '会计法第十三条',
      sourceLink: '/regulations/3',
      status: '草稿', 
      updateDate: '2024-01-13',
      creator: '王五',
      useCount: 7
    }
  ];

  // 审计案例库数据
  const caseItems = [
    { 
      id: 1, 
      name: '某市政道路工程超预算30%案例', 
      type: '超预算案例', 
      severity: '重大', 
      category: '工程审计',
      description: '通过对比分析发现该项目超出批准预算30%，主要原因为设计变更频繁、材料价格上涨未及时调整预算',
      problemDescription: '项目实际投资5200万元，超出批准预算4000万元的30%',
      auditMethod: '预算执行跟踪审计，设计变更合规性检查，材料价格对比分析',
      evidence: ['预算批复文件', '设计变更单', '材料采购合同', '工程结算书'],
      conclusion: '设计变更程序不规范，材料采购未按规定进行价格审核',
      suggestion: '完善设计变更管理制度，建立材料价格动态调整机制',
      viewCount: 234, 
      date: '2024-01-15',
      auditor: '张三',
      isPreset: true
    },
    { 
      id: 2, 
      name: '政府采购围标串标案例', 
      type: '违规案例', 
      severity: '严重', 
      category: '采购审计',
      description: '通过数据分析发现多家投标企业存在关联关系，投标价格异常相近，涉嫌围标串标',
      problemDescription: '5家投标企业中有3家存在人员交叉、地址相同等关联关系',
      auditMethod: '企业关联关系分析，投标价格统计分析，投标文件比对分析',
      evidence: ['企业工商信息', '投标文件', '价格分析表', '人员信息比对表'],
      conclusion: '存在围标串标行为，违反政府采购法相关规定',
      suggestion: '加强投标企业资格审查，建立黑名单制度，完善评标专家管理',
      viewCount: 187, 
      date: '2024-01-14',
      auditor: '李四',
      isPreset: true
    },
    { 
      id: 3, 
      name: '专项资金挪用审计案例', 
      type: '违法案例', 
      severity: '重大', 
      category: '财政审计',
      description: '通过资金流向分析发现专项资金被挪用于其他项目，违反专款专用原则',
      problemDescription: '教育专项资金500万元中有200万元被挪用于办公楼装修',
      auditMethod: '资金流向追踪审计，支出凭证审查，项目实地核查',
      evidence: ['资金拨付凭证', '支出明细账', '项目实施情况', '现场照片'],
      conclusion: '违反专项资金管理规定，存在挪用专项资金行为',
      suggestion: '严格专项资金管理，建立资金使用监督机制，追回被挪用资金',
      viewCount: 156, 
      date: '2024-01-13',
      auditor: '王五',
      isPreset: false
    }
  ];

  // 法规库数据
  const regulationItems = [
    { 
      id: 1, 
      name: '中华人民共和国政府采购法', 
      category: '采购管理', 
      level: '法律', 
      status: '现行有效', 
      updateDate: '2024-01-01',
      summary: '规范政府采购行为，提高政府采购资金的使用效益，维护国家利益和社会公共利益',
      keyContent: ['采购方式', '采购程序', '供应商资格', '采购合同', '监督管理'],
      fullTextUrl: 'http://www.npc.gov.cn/...',
      relatedCases: [2]
    },
    { 
      id: 2, 
      name: '建设工程质量管理条例', 
      category: '工程管理', 
      level: '行政法规', 
      status: '现行有效', 
      updateDate: '2023-12-15',
      summary: '加强对建设工程质量的管理，保证建设工程质量，保护人民生命和财产安全',
      keyContent: ['工程质量责任', '勘察设计质量', '施工质量', '监理质量', '验收'],
      fullTextUrl: 'http://www.gov.cn/...',
      relatedCases: [1]
    },
    { 
      id: 3, 
      name: '中华人民共和国会计法', 
      category: '财务管理', 
      level: '法律', 
      status: '现行有效', 
      updateDate: '2023-11-20',
      summary: '规范会计行为，保证会计资料真实、完整，加强经济管理和财务管理',
      keyContent: ['会计核算', '会计监督', '会计机构和人员', '法律责任'],
      fullTextUrl: 'http://www.npc.gov.cn/...',
      relatedCases: [3]
    },
    { 
      id: 4, 
      name: '审计署关于内部审计工作的规定', 
      category: '审计规范', 
      level: '部门规章', 
      status: '现行有效', 
      updateDate: '2023-10-10',
      summary: '规范内部审计工作，建立健全内部审计制度，充分发挥内部审计作用',
      keyContent: ['内部审计职责', '审计程序', '审计报告', '整改要求'],
      fullTextUrl: 'http://www.audit.gov.cn/...',
      relatedCases: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case '已发布': case '现行有效': return 'bg-green-50 text-green-700 border-green-200';
      case '草稿': return 'bg-gray-50 text-gray-700 border-gray-200';
      case '已失效': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case '重大': return 'bg-red-50 text-red-700 border-red-200';
      case '严重': return 'bg-amber-50 text-amber-700 border-amber-200';
      case '一般': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case '法律': return 'bg-red-50 text-red-700 border-red-200';
      case '行政法规': return 'bg-amber-50 text-amber-700 border-amber-200';
      case '部门规章': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '规范性文件': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleOnlineSearch = () => {
    if (onlineSearch.trim()) {
      // 这里可以集成实际的法规搜索API
      window.open(`https://www.pkulaw.com/search?keyword=${encodeURIComponent(onlineSearch)}`, '_blank');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'logic':
        return (
          <div className="space-y-6">
            {logicItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {item.category}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                    
                    {/* 文件类别和关键字段 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">涉及文件类别和关键信息：</h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {item.fileCategories.map((category, index) => (
                          <div key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="flex items-center mb-2">
                              <FolderOpen className="h-4 w-4 text-slate-600 mr-2" />
                              <span className="text-sm font-medium text-slate-900">{category}</span>
                            </div>
                            <div className="space-y-1">
                              {item.keyFields[category]?.map((field, fieldIndex) => (
                                <span key={fieldIndex} className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 mr-1 mb-1">
                                  <Target className="h-3 w-3 mr-1" />
                                  {field}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 比较逻辑 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">审计逻辑：</h4>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 flex items-start">
                          <Zap className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          {item.comparisonLogic}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        创建者：{item.creator}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        更新：{item.updateDate}
                      </span>
                      <span className="flex items-center">
                        <Database className="h-4 w-4 mr-1" />
                        使用次数：{item.useCount}
                      </span>
                      {item.source && (
                        <span className="flex items-center">
                          <LinkIcon className="h-4 w-4 mr-1" />
                          来源：
                          <a href={item.sourceLink} className="text-blue-600 hover:text-blue-700 ml-1 hover:underline">
                            {item.source}
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200">
                      <Eye className="h-4 w-4 mr-1" />
                      查看详情
                    </button>
                    <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200">
                      <Edit className="h-4 w-4 mr-1" />
                      编辑
                    </button>
                    <button className="inline-flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium border border-slate-200">
                      <Copy className="h-4 w-4 mr-1" />
                      复制
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'cases':
        return (
          <div className="space-y-6">
            {caseItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        {item.type}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                        {item.severity}
                      </span>
                      {item.isPreset && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200">
                          预置案例
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                    
                    {/* 问题描述 */}
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">问题描述：</h4>
                      <p className="text-sm text-red-700 bg-red-50 p-2 rounded border border-red-200">{item.problemDescription}</p>
                    </div>

                    {/* 审计方法 */}
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">审计方法：</h4>
                      <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded border border-blue-200">{item.auditMethod}</p>
                    </div>

                    {/* 证据材料 */}
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">证据材料：</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.evidence.map((evidence, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-50 text-green-700 border border-green-200">
                            <FileText className="h-3 w-3 mr-1" />
                            {evidence}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        审计人：{item.auditor}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        日期：{item.date}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        查看：{item.viewCount}次
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200">
                      <Eye className="h-4 w-4 mr-1" />
                      查看详情
                    </button>
                    <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200">
                      <Edit className="h-4 w-4 mr-1" />
                      编辑
                    </button>
                    <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200">
                      <Download className="h-4 w-4 mr-1" />
                      导出
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'regulations':
        return (
          <div className="space-y-6">
            {/* 外网搜索功能 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                在线法规搜索
              </h4>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  placeholder="输入关键词搜索最新法律法规..."
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={onlineSearch}
                  onChange={(e) => setOnlineSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleOnlineSearch()}
                />
                <button
                  onClick={handleOnlineSearch}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  外网搜索
                </button>
              </div>
              
              {/* 国家法律法规数据库快速访问 */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <Scale className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">国家法律法规数据库</h5>
                    <p className="text-xs text-gray-600">全国人大常委会官方法规数据库</p>
                  </div>
                </div>
                <a
                  href="https://flk.npc.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  进入官网
                </a>
              </div>
            </div>

            {regulationItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(item.level)}`}>
                        {item.level}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500">更新时间：{item.updateDate}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 leading-relaxed">{item.summary}</p>
                    
                    {/* 主要内容 */}
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">主要内容：</h4>
                      <div className="flex flex-wrap gap-1">
                        {item.keyContent.map((content, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                            <Tag className="h-3 w-3 mr-1" />
                            {content}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 相关案例 */}
                    {item.relatedCases.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">相关案例：</h4>
                        <div className="flex space-x-2">
                          {item.relatedCases.map((caseId) => {
                            const relatedCase = caseItems.find(c => c.id === caseId);
                            return relatedCase ? (
                              <span key={caseId} className="inline-flex items-center px-2 py-1 rounded text-xs bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 cursor-pointer">
                                <LinkIcon className="h-3 w-3 mr-1" />
                                {relatedCase.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <a
                      href={item.fullTextUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      查看全文
                    </a>
                    <button className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200">
                      <Edit className="h-4 w-4 mr-1" />
                      编辑
                    </button>
                    <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200">
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
              <h1 className="text-2xl font-bold text-gray-900 mb-1">知识库</h1>
              <p className="text-gray-600 text-sm">审计逻辑、案例库和法规资源管理</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm">
              <Plus className="h-4 w-4 mr-2" />
              新增内容
            </button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">审计逻辑</p>
                <p className="text-lg font-bold text-gray-900">{logicItems.length}</p>
                <p className="text-xs text-green-600 font-medium">+2 本月新增</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">审计案例</p>
                <p className="text-lg font-bold text-gray-900">{caseItems.length}</p>
                <p className="text-xs text-green-600 font-medium">+1 本月新增</p>
              </div>
              <div className="bg-amber-50 p-2 rounded-lg">
                <FileText className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">法规条目</p>
                <p className="text-lg font-bold text-gray-900">{regulationItems.length}</p>
                <p className="text-xs text-green-600 font-medium">实时更新</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <Scale className="h-4 w-4 text-slate-600" />
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

          {/* 搜索和筛选 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索知识库内容..."
                  className="pl-10 w-full h-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select className="pl-10 h-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white text-sm min-w-[120px]">
                  <option value="">所有分类</option>
                  <option value="financial">财务审计</option>
                  <option value="procurement">采购审计</option>
                  <option value="engineering">工程审计</option>
                  <option value="compliance">合规审计</option>
                </select>
              </div>
            </div>
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