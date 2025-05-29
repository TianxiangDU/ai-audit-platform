import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 初始状态
const initialState = {
  // 用户信息
  user: {
    id: 1,
    name: '审计员张三',
    role: '审计组长',
    department: '第一审计组',
    permissions: ['project.view', 'project.create', 'ai.audit', 'knowledge.view']
  },
  
  // 全局设置
  settings: {
    theme: 'light',
    language: 'zh-CN',
    autoSave: true,
    notifications: true
  },
  
  // 应用状态
  app: {
    loading: false,
    error: null,
    currentProject: null,
    sidebarCollapsed: false
  },
  
  // 审计数据缓存
  cache: {
    projects: [],
    auditResults: {},
    knowledgeBase: {
      logics: [],
      cases: [],
      regulations: []
    },
    tools: [],
    lastUpdated: null
  }
};

// Action类型
export const ACTION_TYPES = {
  // 用户相关
  SET_USER: 'SET_USER',
  UPDATE_USER_PERMISSIONS: 'UPDATE_USER_PERMISSIONS',
  
  // 应用状态
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  
  // 设置
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  
  // 数据管理
  UPDATE_PROJECTS: 'UPDATE_PROJECTS',
  UPDATE_AUDIT_RESULTS: 'UPDATE_AUDIT_RESULTS',
  UPDATE_KNOWLEDGE_BASE: 'UPDATE_KNOWLEDGE_BASE',
  UPDATE_TOOLS: 'UPDATE_TOOLS',
  REFRESH_CACHE: 'REFRESH_CACHE'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
      
    case ACTION_TYPES.UPDATE_USER_PERMISSIONS:
      return {
        ...state,
        user: {
          ...state.user,
          permissions: action.payload
        }
      };
      
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        app: { ...state.app, loading: action.payload }
      };
      
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        app: { ...state.app, error: action.payload }
      };
      
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        app: { ...state.app, error: null }
      };
      
    case ACTION_TYPES.SET_CURRENT_PROJECT:
      return {
        ...state,
        app: { ...state.app, currentProject: action.payload }
      };
      
    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        app: { ...state.app, sidebarCollapsed: !state.app.sidebarCollapsed }
      };
      
    case ACTION_TYPES.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
      
    case ACTION_TYPES.UPDATE_PROJECTS:
      return {
        ...state,
        cache: {
          ...state.cache,
          projects: action.payload,
          lastUpdated: new Date().toISOString()
        }
      };
      
    case ACTION_TYPES.UPDATE_AUDIT_RESULTS:
      return {
        ...state,
        cache: {
          ...state.cache,
          auditResults: { ...state.cache.auditResults, ...action.payload },
          lastUpdated: new Date().toISOString()
        }
      };
      
    case ACTION_TYPES.UPDATE_KNOWLEDGE_BASE:
      return {
        ...state,
        cache: {
          ...state.cache,
          knowledgeBase: { ...state.cache.knowledgeBase, ...action.payload },
          lastUpdated: new Date().toISOString()
        }
      };
      
    case ACTION_TYPES.UPDATE_TOOLS:
      return {
        ...state,
        cache: {
          ...state.cache,
          tools: action.payload,
          lastUpdated: new Date().toISOString()
        }
      };
      
    case ACTION_TYPES.REFRESH_CACHE:
      return {
        ...state,
        cache: {
          ...state.cache,
          lastUpdated: new Date().toISOString()
        }
      };
      
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider组件
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // 持久化状态到localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('auditAppState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: ACTION_TYPES.UPDATE_SETTINGS, payload: parsed.settings });
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);
  
  // 保存状态到localStorage
  useEffect(() => {
    const stateToSave = {
      settings: state.settings,
      user: state.user
    };
    localStorage.setItem('auditAppState', JSON.stringify(stateToSave));
  }, [state.settings, state.user]);
  
  // Action creators
  const actions = {
    setUser: (userData) => dispatch({ type: ACTION_TYPES.SET_USER, payload: userData }),
    updateUserPermissions: (permissions) => dispatch({ type: ACTION_TYPES.UPDATE_USER_PERMISSIONS, payload: permissions }),
    setLoading: (loading) => dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: ACTION_TYPES.CLEAR_ERROR }),
    setCurrentProject: (project) => dispatch({ type: ACTION_TYPES.SET_CURRENT_PROJECT, payload: project }),
    toggleSidebar: () => dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR }),
    updateSettings: (settings) => dispatch({ type: ACTION_TYPES.UPDATE_SETTINGS, payload: settings }),
    updateProjects: (projects) => dispatch({ type: ACTION_TYPES.UPDATE_PROJECTS, payload: projects }),
    updateAuditResults: (results) => dispatch({ type: ACTION_TYPES.UPDATE_AUDIT_RESULTS, payload: results }),
    updateKnowledgeBase: (data) => dispatch({ type: ACTION_TYPES.UPDATE_KNOWLEDGE_BASE, payload: data }),
    updateTools: (tools) => dispatch({ type: ACTION_TYPES.UPDATE_TOOLS, payload: tools }),
    refreshCache: () => dispatch({ type: ACTION_TYPES.REFRESH_CACHE })
  };
  
  const value = {
    state,
    actions,
    // 便捷访问器
    user: state.user,
    settings: state.settings,
    app: state.app,
    cache: state.cache
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// 权限检查Hook
export const usePermission = () => {
  const { user } = useApp();
  
  const hasPermission = (permission) => {
    return user.permissions.includes(permission);
  };
  
  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => user.permissions.includes(permission));
  };
  
  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => user.permissions.includes(permission));
  };
  
  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
};

export default AppContext; 