# AI智慧审计平台

一个基于React的专业审计管理系统，集成AI技术辅助审计工作，提升审计效率和质量。

## 🌟 核心功能

- **🏠 智能仪表板** - 项目统计、审计动态、待办事项
- **📁 项目管理** - 全生命周期项目管理，支持子项目和团队协作
- **🤖 AI审计** - 智能文档分析，自动发现审计线索
- **📚 知识库** - 审计逻辑库、案例库、法规库一体化管理
- **🛠️ 审计工具** - 专业审计工具集，数据分析、风险检测
- **📊 成果管理** - 审计结果整理，多格式导出
- **⚙️ 系统管理** - 用户权限、使用记录、系统配置

## 🚀 快速开始

### 本地运行
```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问 http://localhost:3000
```

### 在线部署
支持多种部署方式：
- **Vercel** (推荐) - 免费，一键部署
- **Netlify** - 免费静态托管
- **Docker** - 容器化部署
- **云平台** - AWS、阿里云、腾讯云

详见 [部署指南.md](部署指南.md)

## 🎯 技术栈

- **前端框架**: React 18.2.0 + React Router 7.6.1
- **状态管理**: Context API + useReducer
- **UI框架**: Tailwind CSS 3.3.0
- **图标库**: Lucide React
- **构建工具**: Create React App

## 📋 项目结构

```
src/
├── components/          # 通用组件
│   ├── layout/         # 布局组件
│   └── ui/             # UI基础组件
├── pages/              # 页面组件
│   ├── audit/          # 审计相关页面
│   ├── knowledge/      # 知识库页面
│   ├── projects/       # 项目管理页面
│   ├── system/         # 系统管理页面
│   └── tools/          # 工具页面
├── contexts/           # 全局状态管理
├── services/           # API服务
├── hooks/              # 自定义Hook
└── utils/              # 工具函数
```

## 🔧 开发指南

### 添加新页面
1. 在`src/pages/`下创建新组件
2. 在`src/App.js`中添加路由
3. 在布局组件中添加导航

### 状态管理
使用`useApp()`钩子访问全局状态：
```javascript
import { useApp } from './contexts/AppContext';

const { user, settings, actions } = useApp();
```

### API调用
使用自定义Hook简化API调用：
```javascript
import { useProjects } from './hooks/useApi';

const { data, loading, error } = useProjects();
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

- 技术支持：[技术团队](mailto:tech@company.com)
- 文档问题：[文档团队](mailto:docs@company.com)

---

**版本**: V1.0  
**最后更新**: 2024年1月 