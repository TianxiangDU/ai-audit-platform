// 模拟API延迟
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟API错误
const mockError = (errorRate = 0.1) => {
  if (Math.random() < errorRate) {
    throw new Error('网络请求失败，请稍后重试');
  }
};

// 基础API配置
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// 通用请求方法
const request = async (url, options = {}) => {
  try {
    // 模拟网络延迟
    await mockDelay(Math.random() * 500 + 200);
    
    // 模拟随机错误
    mockError(0.05);
    
    const config = {
      ...API_CONFIG,
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      }
    };
    
    // 在实际项目中，这里会使用 fetch 或 axios
    console.log(`API Request: ${options.method || 'GET'} ${url}`, options.body);
    
    // 返回模拟响应
    return {
      success: true,
      data: options.mockData || {},
      message: '操作成功'
    };
  } catch (error) {
    console.error('API Error:', error);
    throw {
      success: false,
      message: error.message || '请求失败',
      error
    };
  }
};

// 项目管理API
export const projectAPI = {
  // 获取项目列表
  getProjects: async (params = {}) => {
    const mockProjects = [
      {
        id: 1,
        name: '政府采购审计项目',
        description: '某市政府采购项目专项审计',
        status: 'active',
        progress: 75,
        startDate: '2023-11-01',
        endDate: '2023-12-31',
        budget: 5000000,
        actualAmount: 3750000,
        auditType: 'procurement',
        riskLevel: 'medium',
        teamMembers: ['张三', '李四', '王五'],
        subProjects: [
          { id: 1, name: '预算审计', status: 'completed', progress: 100 },
          { id: 2, name: '施工过程监督', status: 'active', progress: 60 }
        ]
      },
      {
        id: 2,
        name: '基础设施建设审计',
        description: '城市基础设施建设项目审计',
        status: 'planning',
        progress: 25,
        startDate: '2023-12-01',
        endDate: '2024-02-29',
        budget: 8000000,
        actualAmount: 2000000,
        auditType: 'infrastructure',
        riskLevel: 'high',
        teamMembers: ['赵六', '钱七'],
        subProjects: []
      }
    ];
    
    return request('/projects', {
      method: 'GET',
      mockData: {
        projects: mockProjects.filter(p => 
          !params.status || p.status === params.status
        ),
        total: mockProjects.length,
        page: params.page || 1,
        pageSize: params.pageSize || 10
      }
    });
  },
  
  // 获取项目详情
  getProject: async (id) => {
    const mockProject = {
      id: parseInt(id),
      name: '政府采购审计项目',
      description: '某市政府采购项目专项审计，重点关注采购流程合规性、价格合理性等',
      status: 'active',
      progress: 75,
      startDate: '2023-11-01',
      endDate: '2023-12-31',
      budget: 5000000,
      actualAmount: 3750000,
      auditType: 'procurement',
      riskLevel: 'medium',
      teamMembers: [
        { id: 1, name: '张三', role: '项目负责人', avatar: null },
        { id: 2, name: '李四', role: '审计员', avatar: null },
        { id: 3, name: '王五', role: '助理审计员', avatar: null }
      ],
      subProjects: [
        { 
          id: 1, 
          name: '预算审计', 
          status: 'completed', 
          progress: 100,
          description: '预算编制及执行情况审计',
          assignee: '张三',
          startDate: '2023-11-01',
          endDate: '2023-11-30'
        },
        { 
          id: 2, 
          name: '施工过程监督', 
          status: 'active', 
          progress: 60,
          description: '施工过程质量及进度监督',
          assignee: '李四',
          startDate: '2023-11-15',
          endDate: '2023-12-15'
        }
      ],
      documents: [
        { id: 1, name: '项目立项书.pdf', size: '2.3MB', uploadDate: '2023-11-01' },
        { id: 2, name: '预算清单.xlsx', size: '1.8MB', uploadDate: '2023-11-02' }
      ],
      timeline: [
        { date: '2023-11-01', event: '项目启动', type: 'start' },
        { date: '2023-11-15', event: '完成预算审计', type: 'milestone' },
        { date: '2023-12-01', event: '开始施工监督', type: 'progress' }
      ]
    };
    
    return request(`/projects/${id}`, {
      method: 'GET',
      mockData: mockProject
    });
  },
  
  // 创建项目
  createProject: async (projectData) => {
    return request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
      mockData: {
        id: Date.now(),
        ...projectData,
        status: 'planning',
        progress: 0,
        createdAt: new Date().toISOString()
      }
    });
  },
  
  // 更新项目
  updateProject: async (id, projectData) => {
    return request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
      mockData: {
        id: parseInt(id),
        ...projectData,
        updatedAt: new Date().toISOString()
      }
    });
  },
  
  // 删除项目
  deleteProject: async (id) => {
    return request(`/projects/${id}`, {
      method: 'DELETE',
      mockData: { success: true }
    });
  }
};

// 审计API
export const auditAPI = {
  // 启动AI审计
  startAIAudit: async (projectId, auditConfig) => {
    return request(`/projects/${projectId}/audit/start`, {
      method: 'POST',
      body: JSON.stringify(auditConfig),
      mockData: {
        auditId: Date.now(),
        status: 'running',
        estimatedDuration: 300, // 5分钟
        startTime: new Date().toISOString()
      }
    });
  },
  
  // 获取审计结果
  getAuditResults: async (projectId, auditId) => {
    const mockResults = {
      auditId: parseInt(auditId),
      projectId: parseInt(projectId),
      status: 'completed',
      completedAt: new Date().toISOString(),
      summary: {
        totalIssues: 12,
        highRisk: 3,
        mediumRisk: 5,
        lowRisk: 4,
        filesAnalyzed: 45,
        processTime: 280
      },
      issues: [
        {
          id: 1,
          title: '投标报价异常偏低',
          severity: 'high',
          category: '价格风险',
          description: 'ABC建设集团投标价格比预算低15%，存在潜在风险',
          recommendation: '建议重新核实投标报价的合理性',
          evidence: ['投标文件.pdf', '预算清单.xlsx']
        },
        {
          id: 2,
          title: '资质证书有效期临近',
          severity: 'medium',
          category: '合规风险',
          description: '承包商建筑资质证书将在项目期间到期',
          recommendation: '要求承包商在证书到期前及时续期',
          evidence: ['资质证书.pdf']
        }
      ]
    };
    
    return request(`/projects/${projectId}/audit/${auditId}/results`, {
      method: 'GET',
      mockData: mockResults
    });
  },
  
  // 确认审计线索
  confirmAuditClue: async (projectId, clueId, action) => {
    return request(`/projects/${projectId}/clues/${clueId}/confirm`, {
      method: 'POST',
      body: JSON.stringify({ action }),
      mockData: {
        clueId: parseInt(clueId),
        status: action,
        confirmedAt: new Date().toISOString()
      }
    });
  }
};

// 知识库API
export const knowledgeAPI = {
  // 获取审计逻辑
  getAuditLogics: async (params = {}) => {
    const mockLogics = [
      {
        id: 1,
        name: '采购流程合规性检查',
        category: '采购审计',
        description: '验证政府采购流程是否符合法定程序',
        fileCategories: ['招标文件', '投标文件', '评标报告'],
        keyFields: {
          '招标文件': ['招标公告时间', '招标方式', '资格要求'],
          '投标文件': ['投标价格', '技术方案', '资质证明'],
          '评标报告': ['评分标准', '得分情况', '中标理由']
        },
        comparisonLogic: '比较招标公告时间与法定公示期限，验证投标价格合理性',
        source: '政府采购法第三十五条',
        status: '已发布',
        useCount: 28
      }
    ];
    
    return request('/knowledge/logics', {
      method: 'GET',
      mockData: {
        logics: mockLogics,
        total: mockLogics.length
      }
    });
  },
  
  // 获取审计案例
  getAuditCases: async (params = {}) => {
    const mockCases = [
      {
        id: 1,
        name: '某市政道路工程超预算30%案例',
        type: '超预算案例',
        severity: '重大',
        category: '工程审计',
        description: '通过对比分析发现该项目超出批准预算30%',
        problemDescription: '项目实际投资5200万元，超出批准预算4000万元的30%',
        auditMethod: '预算执行跟踪审计，设计变更合规性检查',
        evidence: ['预算批复文件', '设计变更单', '材料采购合同'],
        conclusion: '设计变更程序不规范，材料采购未按规定进行价格审核',
        suggestion: '完善设计变更管理制度，建立材料价格动态调整机制',
        viewCount: 234,
        isPreset: true
      }
    ];
    
    return request('/knowledge/cases', {
      method: 'GET',
      mockData: {
        cases: mockCases,
        total: mockCases.length
      }
    });
  },
  
  // 获取法规库
  getRegulations: async (params = {}) => {
    const mockRegulations = [
      {
        id: 1,
        name: '中华人民共和国政府采购法',
        category: '采购管理',
        level: '法律',
        status: '现行有效',
        updateDate: '2024-01-01',
        summary: '规范政府采购行为，提高政府采购资金的使用效益',
        keyContent: ['采购方式', '采购程序', '供应商资格'],
        fullTextUrl: 'http://www.npc.gov.cn/...',
        relatedCases: [2]
      }
    ];
    
    return request('/knowledge/regulations', {
      method: 'GET',
      mockData: {
        regulations: mockRegulations,
        total: mockRegulations.length
      }
    });
  },
  
  // 搜索知识库
  searchKnowledge: async (keyword, type = 'all') => {
    return request('/knowledge/search', {
      method: 'GET',
      mockData: {
        results: [],
        total: 0,
        keyword,
        type
      }
    });
  }
};

// 工具API
export const toolsAPI = {
  // 获取工具列表
  getTools: async (category = 'all') => {
    const mockTools = [
      {
        id: 1,
        name: '财务数据分析工具',
        category: 'analysis',
        description: '通过对财务数据的多维度分析，快速识别异常交易和潜在风险点',
        features: ['数据导入', '异常检测', '趋势分析', '可视化图表'],
        icon: 'BarChart3',
        iconColor: 'blue',
        usage: 'high',
        status: 'active',
        difficulty: '简单',
        estimatedTime: '10-30分钟'
      }
    ];
    
    return request('/tools', {
      method: 'GET',
      mockData: {
        tools: category === 'all' ? mockTools : mockTools.filter(t => t.category === category),
        total: mockTools.length
      }
    });
  },
  
  // 使用工具
  useTool: async (toolId, params = {}) => {
    return request(`/tools/${toolId}/use`, {
      method: 'POST',
      body: JSON.stringify(params),
      mockData: {
        taskId: Date.now(),
        status: 'running',
        estimatedTime: 300
      }
    });
  }
};

// 系统管理API
export const systemAPI = {
  // 获取用户列表
  getUsers: async (params = {}) => {
    const mockUsers = [
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
      }
    ];
    
    return request('/system/users', {
      method: 'GET',
      mockData: {
        users: mockUsers,
        total: mockUsers.length
      }
    });
  },
  
  // 获取权限配置
  getPermissions: async () => {
    const mockPermissions = [
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
      }
    ];
    
    return request('/system/permissions', {
      method: 'GET',
      mockData: {
        permissions: mockPermissions,
        total: mockPermissions.length
      }
    });
  },
  
  // 获取使用记录
  getUsageLogs: async (params = {}) => {
    const mockLogs = [
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
      }
    ];
    
    return request('/system/logs', {
      method: 'GET',
      mockData: {
        logs: mockLogs,
        total: mockLogs.length
      }
    });
  }
};

// 文件上传API
export const fileAPI = {
  // 上传文件
  uploadFile: async (file, type = 'document') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    // 模拟文件上传进度
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          clearInterval(interval);
          resolve({
            success: true,
            data: {
              fileId: Date.now(),
              filename: file.name,
              size: file.size,
              url: `/files/${Date.now()}_${file.name}`,
              uploadedAt: new Date().toISOString()
            },
            message: '文件上传成功'
          });
        }
      }, 200);
    });
  },
  
  // 删除文件
  deleteFile: async (fileId) => {
    return request(`/files/${fileId}`, {
      method: 'DELETE',
      mockData: { success: true }
    });
  }
};

// 导出统一的API对象
const API = {
  project: projectAPI,
  audit: auditAPI,
  knowledge: knowledgeAPI,
  tools: toolsAPI,
  system: systemAPI,
  file: fileAPI
};

export default API; 