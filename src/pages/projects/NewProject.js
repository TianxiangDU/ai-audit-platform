import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Upload, X, Calendar, Users, FileText } from 'lucide-react';

export const NewProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    client: '',
    budget: '',
    startDate: '',
    endDate: '',
    manager: '',
    members: [],
    subProjects: [],
    documents: []
  });

  const [newMember, setNewMember] = useState('');
  const [newSubProject, setNewSubProject] = useState({ name: '', description: '' });

  const projectTypes = [
    '工程审计',
    '财务审计',
    '采购审计',
    '投资审计',
    '财政审计',
    '绩效审计',
    '合规审计'
  ];

  const teamMembers = [
    '张三',
    '李四',
    '王五',
    '赵六',
    '孙七',
    '周八'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMember = (member) => {
    if (member && !formData.members.includes(member)) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, member]
      }));
    }
  };

  const removeMember = (member) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m !== member)
    }));
  };

  const addSubProject = () => {
    if (newSubProject.name && newSubProject.description) {
      setFormData(prev => ({
        ...prev,
        subProjects: [...prev.subProjects, { 
          id: Date.now(),
          ...newSubProject,
          status: '待开始',
          progress: 0
        }]
      }));
      setNewSubProject({ name: '', description: '' });
    }
  };

  const removeSubProject = (id) => {
    setFormData(prev => ({
      ...prev,
      subProjects: prev.subProjects.filter(sp => sp.id !== id)
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocuments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString().split('T')[0],
      category: 'other', // 默认分类，用户可以修改
      uploader: '当前用户'
    }));
    
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const updateDocumentCategory = (docId, category) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map(doc => 
        doc.id === docId ? { ...doc, category } : doc
      )
    }));
  };

  const documentCategories = {
    'bid': { name: '招标文件', icon: '📋', color: 'blue' },
    'proposal': { name: '投标文件', icon: '📄', color: 'green' },
    'contract': { name: '合同文件', icon: '📝', color: 'purple' },
    'financial': { name: '财务文件', icon: '💰', color: 'yellow' },
    'technical': { name: '技术文件', icon: '🔧', color: 'indigo' },
    'other': { name: '其他文件', icon: '📁', color: 'gray' }
  };

  const getCategoryColor = (category) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    return colors[documentCategories[category]?.color] || colors.gray;
  };

  const removeDocument = (id) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== id)
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 验证必填字段
    if (!formData.name || !formData.type || !formData.manager) {
      alert('请填写必填字段：项目名称、项目类型、项目经理');
      return;
    }

    // 如果没有子项目，创建默认子项目
    let finalSubProjects = formData.subProjects;
    if (finalSubProjects.length === 0) {
      finalSubProjects = [{
        id: 1,
        name: '默认审计项目',
        description: '主要审计内容',
        status: '待开始',
        progress: 0
      }];
    }

    const newProject = {
      ...formData,
      id: Date.now(),
      subProjects: finalSubProjects,
      status: '待开始',
      progress: 0,
      createDate: new Date().toISOString().split('T')[0]
    };

    console.log('创建新项目:', newProject);
    
    // 这里应该调用API保存项目
    // 暂时直接跳转到项目详情页
    navigate(`/projects/${newProject.id}`);
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center space-x-4">
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回项目列表
        </Link>
      </div>

      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">新建审计项目</h1>
        <p className="mt-1 text-gray-500">创建新的审计项目，设置项目信息、团队成员和子项目</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              项目基本信息
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  项目名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="请输入项目名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  项目类型 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="">请选择项目类型</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">委托单位</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  placeholder="请输入委托单位"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">项目预算</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="请输入项目预算"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  开始日期
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  结束日期
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">项目描述</label>
              <textarea
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="请输入项目描述"
              />
            </div>
          </div>
        </div>

        {/* 项目团队 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              项目团队
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                项目经理 <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.manager}
                onChange={(e) => handleInputChange('manager', e.target.value)}
              >
                <option value="">请选择项目经理</option>
                {teamMembers.map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">项目成员</label>
              <div className="flex space-x-2 mb-3">
                <select
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                >
                  <option value="">请选择团队成员</option>
                  {teamMembers.filter(member => !formData.members.includes(member) && member !== formData.manager).map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    addMember(newMember);
                    setNewMember('');
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {formData.members.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.members.map(member => (
                    <span
                      key={member}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() => removeMember(member)}
                        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 子项目设置 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">子项目设置</h3>
            <p className="mt-1 text-sm text-gray-500">如不添加子项目，系统将自动创建默认子项目</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">子项目名称</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={newSubProject.name}
                  onChange={(e) => setNewSubProject(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="请输入子项目名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">子项目描述</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={newSubProject.description}
                  onChange={(e) => setNewSubProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="请输入子项目描述"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addSubProject}
              disabled={!newSubProject.name || !newSubProject.description}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加子项目
            </button>

            {formData.subProjects.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">已添加的子项目：</h4>
                {formData.subProjects.map(subProject => (
                  <div key={subProject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{subProject.name}</p>
                      <p className="text-xs text-gray-500">{subProject.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSubProject(subProject.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 项目资料 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              项目资料
            </h3>
            <p className="mt-1 text-sm text-gray-500">上传项目相关的资料文档，可设置文件分类</p>
          </div>
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-base font-medium text-blue-600 hover:text-blue-500">
                    点击上传文件
                  </span>
                  <span className="text-gray-500"> 或拖拽文件到此处</span>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                支持 PDF、Word、Excel、图片等格式
              </p>
            </div>

            {formData.documents.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">已上传文件</h4>
                <div className="space-y-3">
                  {formData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center flex-1">
                        <div className="text-lg mr-3">{documentCategories[doc.category]?.icon || '📁'}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                              {documentCategories[doc.category]?.name || '其他文件'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{formatFileSize(doc.size)}</span>
                            <span>{doc.uploadDate}</span>
                          </div>
                          <div className="mt-2">
                            <select
                              value={doc.category}
                              onChange={(e) => updateDocumentCategory(doc.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {Object.entries(documentCategories).map(([key, category]) => (
                                <option key={key} value={key}>{category.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            取消
          </Link>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            创建项目
          </button>
        </div>
      </form>
    </div>
  );
}; 