import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProjectList } from './pages/projects/ProjectList';
import { NewProject } from './pages/projects/NewProject';
import { ProjectDetail } from './pages/projects/ProjectDetail';
import { ProjectResults } from './pages/projects/ProjectResults';
import { ProjectDocuments } from './pages/projects/ProjectDocuments';
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
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/projects/:id/audit" element={<AuditProcess />} />
                <Route path="/projects/:id/audit-tasks" element={<AuditTasks />} />
                <Route path="/projects/:id/results" element={<ProjectResults />} />
                <Route path="/projects/:id/documents" element={<ProjectDocuments />} />
                <Route path="/knowledge" element={<KnowledgeBase />} />
                <Route path="/tools" element={<ToolManagement />} />
                <Route path="/system" element={<SystemManagement />} />
              </Routes>
            </Layout>
          </Router>
        </NotificationProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App; 