import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProjectList } from './pages/projects/ProjectList';
import { NewProject } from './pages/projects/NewProject';
import { ProjectWorkspace } from './pages/projects/ProjectWorkspace';
import { ManualClueEntry } from './pages/projects/ManualClueEntry';
import { ProjectResults } from './pages/projects/ProjectResults';
import { ProjectDocuments } from './pages/projects/ProjectDocuments';
import { ShareUpload } from './pages/ShareUpload';
import { AuditProcess } from './pages/audit/AuditProcess';
import { AuditTasks } from './pages/audit/AuditTasks';
import { KnowledgeBase } from './pages/knowledge/KnowledgeBase';
import { ToolManagement } from './pages/tools/ToolManagement';
import { SystemManagement } from './pages/system/SystemManagement';

// 全局状态管理
import { AppProvider } from './contexts/AppContext';

// 通用组件
import ErrorBoundary from './components/ui/ErrorBoundary';
import { NotificationProvider } from './components/ui/Notification';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* 分享上传页面 - 不使用Layout */}
              <Route path="/share/upload/:shareId" element={<ShareUpload />} />
              
              {/* 主应用页面 - 使用Layout */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/projects/new" element={<NewProject />} />
                    <Route path="/projects/:id/workspace" element={<ProjectWorkspace />} />
                    <Route path="/projects/:id/audit" element={<AuditProcess />} />
                    <Route path="/projects/:id/audit-tasks" element={<AuditTasks />} />
                    <Route path="/projects/:id/results" element={<ProjectResults />} />
                    <Route path="/projects/:id/documents" element={<ProjectDocuments />} />
                    <Route path="/projects/:id/manual-clue" element={<ManualClueEntry />} />
                    <Route path="/knowledge" element={<KnowledgeBase />} />
                    <Route path="/tools" element={<ToolManagement />} />
                    <Route path="/system" element={<SystemManagement />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Router>
        </NotificationProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App; 