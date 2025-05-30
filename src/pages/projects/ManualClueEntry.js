import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Plus, FileText, Eye, Download, X, Maximize2, Minimize2,
  Save, AlertTriangle, Target, Upload, Image as ImageIcon, Film,
  MousePointer, Square, Type, Highlighter
} from 'lucide-react';

export const ManualClueEntry = () => {
  const { id } = useParams();
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentsExpanded, setDocumentsExpanded] = useState(true);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedContent, setSelectedContent] = useState([]);

  // 表单状态
  const [clueForm, setClueForm] = useState({
    title: '',
    description: '',
    severity: 'medium',
    category: '',
    relatedDocument: '',
    location: '',
    amount: '',
    evidence: '',
    notes: ''
  });

  // 模拟项目文档数据
  const projectDocuments = [
    {
      id: 1,
      name: '施工合同.pdf',
      type: 'pdf',
      size: '2.1MB',
      lastModified: '2024-01-15',
      content: '甲方：某市建设局\n乙方：某建筑公司\n合同金额：500万元\n施工期限：2023年12月1日至2024年3月31日\n\n第一条 工程概况\n工程名称：某市政基础设施建设工程\n工程地点：某市中心区\n建设规模：道路长度2.5公里，包含排水设施\n\n第二条 合同价款\n本合同总价为人民币500万元整（￥5,000,000.00）\n其中：\n- 土建工程：400万元\n- 附属设施：100万元\n\n第三条 质量标准\n本工程质量标准应符合国家现行相关标准...'
    },
    {
      id: 2,
      name: '材料采购清单.xlsx',
      type: 'excel',
      size: '1.8MB',
      lastModified: '2024-01-14',
      content: '材料采购清单\n\n序号 | 材料名称 | 规格型号 | 单位 | 数量 | 单价(元) | 金额(元)\n1 | 钢筋 | HRB400 | 吨 | 120 | 4200 | 504,000\n2 | 水泥 | P.O42.5 | 吨 | 200 | 380 | 76,000\n3 | 混凝土 | C30 | 立方米 | 500 | 280 | 140,000\n4 | 砂石料 | 级配碎石 | 立方米 | 300 | 85 | 25,500\n\n总计：745,500元\n\n注：以上价格为含税价，已包含运输费用'
    },
    {
      id: 3,
      name: '工程变更通知单.doc',
      type: 'word',
      size: '0.9MB',
      lastModified: '2024-01-13',
      content: '工程变更通知单\n\n变更编号：BG-2024-001\n变更日期：2024年1月10日\n\n变更内容：\n1. 原设计道路宽度12米，现变更为15米\n2. 增加路灯设施50盏\n3. 增设雨水收集井6个\n\n变更原因：\n根据市政府最新规划要求，需要提升道路标准\n\n费用影响：\n增加费用约80万元\n\n审批情况：\n设计单位：已确认\n监理单位：已审核\n建设单位：已批准'
    },
    {
      id: 4,
      name: '质量检测报告.pdf',
      type: 'pdf',
      size: '3.2MB',
      lastModified: '2024-01-12',
      content: '工程质量检测报告\n\n检测单位：某市质量检测中心\n检测日期：2024年1月10日\n委托单位：某建筑公司\n\n检测结果：\n\n1. 混凝土强度检测\n   - 设计强度：C30\n   - 实测强度：C28\n   - 检测结论：不合格\n\n2. 钢筋保护层厚度\n   - 设计厚度：25mm\n   - 实测厚度：20-22mm\n   - 检测结论：部分不符合要求\n\n3. 焊接质量检测\n   - 检测数量：50个焊点\n   - 合格数量：45个\n   - 不合格率：10%\n\n总体结论：\n本次检测发现质量问题，建议整改后重新检测。'
    }
  ];

  const handleDocumentSelect = (doc) => {
    if (selectedDocuments.length >= 2) {
      alert('最多只能选择2个文档进行预览');
      return;
    }
    if (!selectedDocuments.find(d => d.id === doc.id)) {
      setSelectedDocuments([...selectedDocuments, doc]);
    }
  };

  const handleDocumentRemove = (docId) => {
    setSelectedDocuments(selectedDocuments.filter(d => d.id !== docId));
  };

  const handleContentSelection = (docId, content, startPos, endPos) => {
    const selection = {
      id: Date.now(),
      docId,
      content: content.substring(startPos, endPos),
      startPos,
      endPos,
      timestamp: new Date().toLocaleString()
    };
    setSelectedContent([...selectedContent, selection]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 处理表单提交
    console.log('提交线索:', { clueForm, selectedContent });
    alert('线索添加成功！');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'excel': return FileText;
      case 'word': return FileText;
      case 'image': return ImageIcon;
      case 'video': return Film;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Link
                to={`/projects/${id}/workspace`}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">返回工作空间</span>
                <span className="sm:hidden">返回</span>
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">手动添加审计线索</h1>
                <p className="text-gray-600 text-xs sm:text-sm mt-1 hidden sm:block">通过表单手动录入审计线索信息</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 左侧：线索录入表单 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">线索信息</h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">请填写详细的审计线索信息</p>
              </div>
              <div className="p-4 sm:p-6">
                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        线索标题 *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="请输入线索标题"
                        value={clueForm.title}
                        onChange={(e) => setClueForm({...clueForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        严重程度 *
                      </label>
                      <select
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        value={clueForm.severity}
                        onChange={(e) => setClueForm({...clueForm, severity: e.target.value})}
                      >
                        <option value="high">高风险</option>
                        <option value="medium">中风险</option>
                        <option value="low">低风险</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      线索描述 *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请详细描述发现的问题或线索..."
                      value={clueForm.description}
                      onChange={(e) => setClueForm({...clueForm, description: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        问题类别
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        value={clueForm.category}
                        onChange={(e) => setClueForm({...clueForm, category: e.target.value})}
                      >
                        <option value="">请选择类别</option>
                        <option value="质量问题">质量问题</option>
                        <option value="价格异常">价格异常</option>
                        <option value="合规问题">合规问题</option>
                        <option value="程序违规">程序违规</option>
                        <option value="财务问题">财务问题</option>
                        <option value="其他">其他</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        涉及金额
                      </label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="请输入涉及金额（元）"
                        value={clueForm.amount}
                        onChange={(e) => setClueForm({...clueForm, amount: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      发现位置
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="如：施工现场、财务办公室、第3页等"
                      value={clueForm.location}
                      onChange={(e) => setClueForm({...clueForm, location: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      相关证据
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请描述相关的证据材料..."
                      value={clueForm.evidence}
                      onChange={(e) => setClueForm({...clueForm, evidence: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      备注信息
                    </label>
                    <textarea
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="其他需要说明的信息..."
                      value={clueForm.notes}
                      onChange={(e) => setClueForm({...clueForm, notes: e.target.value})}
                    />
                  </div>

                  {/* 已选择的文档内容 */}
                  {selectedContent.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        已圈选的证据内容
                      </label>
                      <div className="space-y-2">
                        {selectedContent.map((selection, index) => (
                          <div key={selection.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-sm font-medium text-yellow-800">
                                证据片段 #{index + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedContent(selectedContent.filter(s => s.id !== selection.id))}
                                className="text-yellow-600 hover:text-yellow-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-700 bg-white p-2 rounded border">
                              "{selection.content}"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              选择时间：{selection.timestamp}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 提交按钮 */}
                  <div className="flex space-x-4 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      保存线索
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Target className="h-5 w-5 mr-2" />
                      保存并生成问题
                    </button>
                    <Link
                      to={`/projects/${id}/workspace`}
                      className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      取消
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* 右侧：文档预览 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">项目文档</h3>
                  <button
                    onClick={() => setDocumentsExpanded(!documentsExpanded)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {documentsExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-1">可选择最多2个文档进行预览</p>
              </div>
              
              {documentsExpanded && (
                <div className="p-6">
                  {/* 文档列表 */}
                  <div className="space-y-3 mb-6">
                    {projectDocuments.map((doc) => {
                      const IconComponent = getDocumentIcon(doc.type);
                      const isSelected = selectedDocuments.find(d => d.id === doc.id);
                      
                      return (
                        <div
                          key={doc.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-blue-300 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleDocumentSelect(doc)}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-gray-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.size} • {doc.lastModified}</p>
                            </div>
                            {isSelected && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDocumentRemove(doc.id);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 文档预览区域 */}
                  {selectedDocuments.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">文档预览</h4>
                        <button
                          onClick={() => setIsSelectionMode(!isSelectionMode)}
                          className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium transition-colors ${
                            isSelectionMode 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Highlighter className="h-3 w-3 mr-1" />
                          {isSelectionMode ? '退出圈选' : '开始圈选'}
                        </button>
                      </div>
                      
                      {selectedDocuments.map((doc) => (
                        <div key={doc.id} className="border border-gray-200 rounded-lg">
                          <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          </div>
                          <div 
                            className={`p-3 max-h-60 overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap ${
                              isSelectionMode ? 'cursor-crosshair' : ''
                            }`}
                            onMouseUp={(e) => {
                              if (isSelectionMode) {
                                const selection = window.getSelection();
                                if (selection.toString().length > 0) {
                                  handleContentSelection(
                                    doc.id, 
                                    doc.content, 
                                    doc.content.indexOf(selection.toString()),
                                    doc.content.indexOf(selection.toString()) + selection.toString().length
                                  );
                                  selection.removeAllRanges();
                                }
                              }
                            }}
                          >
                            {doc.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 