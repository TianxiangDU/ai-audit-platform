import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNotification } from '../components/ui/Notification';
import API from '../services/api';

// 通用API调用钩子
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { showError } = useNotification();
  const { 
    immediate = true, 
    showErrorNotification = true,
    onSuccess,
    onError 
  } = options;

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFunction(...args);
      
      if (response.success) {
        setData(response.data);
        onSuccess?.(response.data);
        return response.data;
      } else {
        throw new Error(response.message || '请求失败');
      }
    } catch (err) {
      const errorMessage = err.message || '网络请求失败';
      setError(errorMessage);
      
      if (showErrorNotification) {
        showError(errorMessage);
      }
      
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, showError, showErrorNotification, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    execute,
    retry
  };
};

// 项目相关钩子
export const useProjects = (params = {}) => {
  return useApi(
    () => API.project.getProjects(params),
    [JSON.stringify(params)]
  );
};

export const useProject = (id) => {
  return useApi(
    () => API.project.getProject(id),
    [id],
    { immediate: !!id }
  );
};

export const useCreateProject = () => {
  const { showSuccess } = useNotification();
  const { actions } = useApp();
  
  return useApi(
    API.project.createProject,
    [],
    {
      immediate: false,
      onSuccess: (data) => {
        showSuccess('项目创建成功');
        actions.refreshCache();
      }
    }
  );
};

export const useUpdateProject = () => {
  const { showSuccess } = useNotification();
  const { actions } = useApp();
  
  return useApi(
    API.project.updateProject,
    [],
    {
      immediate: false,
      onSuccess: (data) => {
        showSuccess('项目更新成功');
        actions.refreshCache();
      }
    }
  );
};

// 审计相关钩子
export const useStartAudit = () => {
  const { showSuccess } = useNotification();
  
  return useApi(
    API.audit.startAIAudit,
    [],
    {
      immediate: false,
      onSuccess: (data) => {
        showSuccess('AI审计已启动，请稍后查看结果');
      }
    }
  );
};

export const useAuditResults = (projectId, auditId) => {
  return useApi(
    () => API.audit.getAuditResults(projectId, auditId),
    [projectId, auditId],
    { immediate: !!(projectId && auditId) }
  );
};

// 知识库相关钩子
export const useKnowledgeBase = (type = 'logics', params = {}) => {
  const apiFunction = {
    logics: API.knowledge.getAuditLogics,
    cases: API.knowledge.getAuditCases,
    regulations: API.knowledge.getRegulations
  }[type];

  return useApi(
    () => apiFunction(params),
    [type, JSON.stringify(params)]
  );
};

// 工具相关钩子
export const useTools = (category = 'all') => {
  return useApi(
    () => API.tools.getTools(category),
    [category]
  );
};

export const useToolExecution = () => {
  const { showSuccess, showInfo } = useNotification();
  
  return useApi(
    API.tools.useTool,
    [],
    {
      immediate: false,
      onSuccess: (data) => {
        showInfo('工具已启动，预计用时5分钟');
      }
    }
  );
};

// 系统管理相关钩子
export const useSystemData = (type, params = {}) => {
  const apiFunction = {
    users: API.system.getUsers,
    permissions: API.system.getPermissions,
    logs: API.system.getUsageLogs
  }[type];

  return useApi(
    () => apiFunction(params),
    [type, JSON.stringify(params)]
  );
};

// 文件上传钩子
export const useFileUpload = () => {
  const { showSuccess } = useNotification();
  
  return useApi(
    API.file.uploadFile,
    [],
    {
      immediate: false,
      onSuccess: (data) => {
        showSuccess('文件上传成功');
      }
    }
  );
};

// 缓存钩子
export const useCache = () => {
  const { cache, actions } = useApp();
  
  const getCachedData = useCallback((key) => {
    return cache[key];
  }, [cache]);
  
  const setCachedData = useCallback((key, data) => {
    actions[`update${key.charAt(0).toUpperCase() + key.slice(1)}`]?.(data);
  }, [actions]);
  
  const clearCache = useCallback(() => {
    actions.refreshCache();
  }, [actions]);
  
  return {
    cache,
    getCachedData,
    setCachedData,
    clearCache,
    lastUpdated: cache.lastUpdated
  };
}; 