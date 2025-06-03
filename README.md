# AI智慧工程审计平台

一个基于React的专业审计管理系统，集成AI技术辅助审计工作，提升审计效率和质量。由**青矩未来**开发。

🌐 **在线访问**: https://tianxiangdu.github.io/ai-audit-platform/#/

## 🌟 核心功能

### 🏠 智能仪表板
- **项目统计看板** - 实时显示项目总数、进行中项目、AI审计统计
- **快速开始审计** - 一键选择项目和子项目，直接进入审计流程
- **审计动态** - 最近审计活动时间线和状态更新
- **待办任务** - 待确认审计线索和优先级管理

### 📁 项目管理
- **全生命周期管理** - 项目创建、编辑、状态跟踪
- **子项目支持** - 多层级项目结构，独立管理
- **团队协作** - 项目成员分配和权限管理
- **工作空间** - 项目资料、审计证据、成果管理一体化

### 🤖 AI智能审计
- **文档上传处理** - 支持PDF、Word、Excel、图片等多种格式
- **智能分析** - 文档内容交叉验证、数据一致性检查
- **审计配置** - 自定义审计重点、风险阈值、审计深度
- **结果管理** - 自动生成审计报告、问题发现汇总、风险分级

### 📊 跟踪报告
- **多周期报告** - 支持日报、周报、月报生成
- **数据可视化** - 图表展示审计进度和发现问题
- **模板管理** - 预置报告模板和自定义模板
- **导出功能** - 多格式导出，支持PDF、Excel

### 🎤 审计访谈
- **实时录音** - 支持开始、暂停、停止录音操作
- **文件上传** - 支持MP3、WAV、M4A等音频格式
- **智能转录** - 模拟ASR语音识别，多语言支持
- **说话人识别** - 角色识别和说话人分离
- **访谈管理** - 访谈元数据管理和检索

### 📚 审计知识库
- **逻辑库管理** - 预置和自定义审计逻辑
- **案例库** - 典型审计案例和最佳实践
- **法规库** - 相关法律法规查询和更新

### 🛠️ 审计工具
- **数据分析工具** - 财务数据分析、价格对比分析
- **计算工具** - 合同金额计算器、税费计算
- **风险检测工具** - 关联企业识别、异常模式检测

### ⚙️ 系统管理
- **用户权限管理** - 多级用户角色和权限控制
- **使用记录** - 详细的操作日志和审计轨迹
- **系统配置** - 个性化配置和系统参数设置

## 🚀 快速开始

### 在线访问
直接访问：https://tianxiangdu.github.io/ai-audit-platform/#/

### 本地开发
```bash
# 克隆项目
git clone https://github.com/TianxiangDU/ai-audit-platform.git
cd ai-audit-platform

# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问 http://localhost:3000
```

### 构建部署
```bash
# 构建生产版本
npm run build

# 部署到GitHub Pages
npm run deploy
```

## 🎯 技术栈

- **前端框架**: React 18.2.0
- **路由管理**: React Router 7.6.1 (HashRouter)
- **状态管理**: Context API + useReducer
- **UI框架**: Tailwind CSS 3.3.0
- **图标库**: Lucide React
- **构建工具**: Create React App
- **部署平台**: GitHub Pages

## 📱 设备支持

### 🖥️ 桌面端
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

### 📱 移动端
- **iOS Safari**: 12.0+
- **Chrome Mobile**: 80+
- **Samsung Internet**: 12.0+
- **Android WebView**: 80+

## 📋 项目结构

```
src/
├── components/          # 通用组件
│   ├── layout/         # 布局组件 (Header, Layout)
│   └── ui/             # UI基础组件 (AIProcessDrawer)
├── pages/              # 页面组件
│   ├── audit/          # 审计相关页面
│   │   ├── AuditProcess.js      # AI审计流程
│   │   └── AuditTasks.js        # 审计任务管理
│   ├── knowledge/      # 知识库页面
│   │   └── KnowledgeBase.js     # 知识库管理
│   ├── projects/       # 项目管理页面
│   │   ├── ProjectDetail.js     # 项目详情
│   │   ├── ProjectWorkspace.js  # 项目工作空间
│   │   ├── ProjectDocuments.js  # 项目资料
│   │   ├── ProjectTrackReports.js # 跟踪报告
│   │   ├── ProjectInterviews.js   # 审计访谈
│   │   ├── ProjectResults.js      # 审计成果
│   │   └── ManualClueEntry.js    # 手动添加线索
│   ├── system/         # 系统管理页面
│   │   └── SystemManagement.js
│   └── tools/          # 工具页面
│       └── ToolManagement.js
├── contexts/           # 全局状态管理
│   └── AppContext.js   # 应用上下文
├── assets/             # 静态资源
│   └── new-logo.svg    # 公司Logo
└── App.js              # 应用主组件
```

## 🔧 开发指南

### 添加新页面
1. 在`src/pages/`下创建新组件
2. 在`src/App.js`中添加路由配置
3. 在`src/components/layout/Header.js`中添加导航项

### 状态管理
使用`useApp()`钩子访问全局状态：
```javascript
import { useApp } from './contexts/AppContext';

const { user, settings, actions } = useApp();
```

### 响应式设计
使用Tailwind CSS的响应式断点：
```css
/* 移动端优先 */
text-sm sm:text-base lg:text-lg
p-4 sm:p-6 lg:p-8
```

### 组件开发规范
- 使用函数式组件和Hooks
- 遵循单一职责原则
- 添加PropTypes类型检查
- 编写JSDoc注释

## 🏢 关于青矩未来

青矩未来致力于为政府机构和大型企业提供专业的AI智慧审计解决方案。

**企业愿景**: 让审计更智能、更高效、更精准

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

- **GitHub**: https://github.com/TianxiangDU/ai-audit-platform
- **在线演示**: https://tianxiangdu.github.io/ai-audit-platform/#/

---

**版本**: V2.0  
**最后更新**: 2025年6月  
**开发团队**: 青矩未来技术团队 