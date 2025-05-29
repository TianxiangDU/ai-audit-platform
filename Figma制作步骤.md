# Figma制作步骤详细指南

## 🎯 第一步：创建项目和设置

### 1.1 创建新的Figma文件
1. 打开Figma，点击"Create new file"
2. 重命名文件为"AI智慧工程审计平台"
3. 创建以下页面（Pages）：
   - `🎨 Design System` - 设计系统
   - `🧩 Components` - 组件库
   - `📱 Desktop Pages` - 桌面端页面
   - `📱 Mobile Pages` - 移动端页面
   - `🔗 Prototype` - 原型演示

### 1.2 设置画板尺寸
```
桌面端画板: 1440 x 1024px
移动端画板: 375 x 812px
组件画板: 自适应尺寸
```

## 🎨 第二步：建立设计系统

### 2.1 创建颜色样式（Color Styles）

#### 操作步骤：
1. 在设计系统页面创建色彩展示区域
2. 对每个颜色创建样式：
   - 右键点击颜色填充 → Create style
   - 命名规范：`Primary/Main`、`Secondary/Main`等

#### 颜色列表：
```
🔵 Primary Colors:
- Primary/Main: #2563eb
- Primary/Hover: #1d4ed8
- Primary/Light: #3b82f6

🔘 Secondary Colors:
- Secondary/Main: #64748b
- Secondary/Dark: #475569

🟢 Status Colors:
- Success/Main: #10b981
- Warning/Main: #f59e0b
- Danger/Main: #ef4444

⚪ Neutral Colors:
- Background/Light: #f8fafc
- Background/Card: #ffffff
- Border/Main: #e2e8f0
- Text/Primary: #1e293b
- Text/Secondary: #64748b
```

### 2.2 创建文字样式（Text Styles）

#### 操作步骤：
1. 创建文本框，设置字体属性
2. 右键 → Create style
3. 按以下规范命名和设置：

```
📝 标题样式:
H1/Page Title: 
- Font: Inter/SF Pro Display
- Size: 32px
- Weight: 700 (Bold)
- Line height: 40px

H2/Card Title:
- Font: Inter/SF Pro Display  
- Size: 20px
- Weight: 600 (Semibold)
- Line height: 28px

H3/Tool Title:
- Font: Inter/SF Pro Display
- Size: 20px
- Weight: 600 (Semibold)
- Line height: 28px

📄 正文样式:
Body/Large:
- Font: Inter/SF Pro Display
- Size: 18px
- Weight: 400 (Regular)
- Line height: 28px

Body/Default:
- Font: Inter/SF Pro Display
- Size: 14px
- Weight: 400 (Regular)
- Line height: 22px

Body/Small:
- Font: Inter/SF Pro Display
- Size: 12px
- Weight: 400 (Regular)
- Line height: 18px

🔘 按钮样式:
Button/Default:
- Font: Inter/SF Pro Display
- Size: 14px
- Weight: 500 (Medium)
- Line height: 20px

Button/Small:
- Font: Inter/SF Pro Display
- Size: 13px
- Weight: 500 (Medium)
- Line height: 18px
```

### 2.3 创建效果样式（Effect Styles）

#### 阴影效果：
1. 创建矩形，添加阴影效果
2. 右键阴影效果 → Create style

```
🌑 阴影样式:
Shadow/Small:
- X: 0, Y: 1, Blur: 2, Spread: 0
- Color: #000000, Opacity: 5%

Shadow/Medium:
- X: 0, Y: 4, Blur: 6, Spread: -1
- Color: #000000, Opacity: 10%
- 额外阴影: X: 0, Y: 2, Blur: 4, Spread: -2, Opacity: 10%

Shadow/Large:
- X: 0, Y: 10, Blur: 15, Spread: -3
- Color: #000000, Opacity: 10%
- 额外阴影: X: 0, Y: 4, Blur: 6, Spread: -4, Opacity: 10%
```

## 🧩 第三步：创建基础组件

### 3.1 按钮组件（Button）

#### 制作步骤：
1. 创建矩形：
   - 宽度: 自适应内容
   - 高度: 40px
   - 圆角: 8px
   - 填充: Primary/Main

2. 添加文本：
   - 内容: "按钮文字"
   - 样式: Button/Default
   - 颜色: 白色
   - 对齐: 居中

3. 添加图标（可选）：
   - 从Font Awesome获取SVG图标
   - 尺寸: 16x16px
   - 颜色: 白色

4. 设置自动布局：
   - 选中按钮内容
   - 右键 → Add auto layout
   - 方向: 水平
   - 间距: 8px
   - 内边距: 8px 16px
   - 对齐: 居中

5. 创建组件：
   - 选中整个按钮
   - 快捷键: Ctrl/Cmd + Alt + K
   - 命名: "Button"

6. 添加变体：
   - 选中组件 → 右键 → Add variant
   - 创建属性：
     ```
     Type: Primary, Secondary, Success, Outline
     Size: Large, Default, Small  
     State: Default, Hover, Disabled
     ```

#### 变体设置：
```
Primary变体:
- 背景: Primary/Main
- 文字: 白色
- Hover: 背景变为Primary/Hover，Y轴-1px

Secondary变体:
- 背景: Secondary/Main
- 文字: 白色

Outline变体:
- 背景: 透明
- 边框: 2px Primary/Main
- 文字: Primary/Main

尺寸变体:
- Large: 12px 24px padding, 16px字体
- Default: 8px 16px padding, 14px字体
- Small: 6px 12px padding, 13px字体
```

### 3.2 输入框组件（Input）

#### 制作步骤：
1. 创建容器：
   - 宽度: 320px（默认）
   - 高度: 自适应

2. 添加标签：
   - 文本: "标签文字"
   - 样式: Body/Default
   - 颜色: Text/Primary
   - 边距底部: 8px

3. 创建输入框：
   - 矩形: 宽度100%, 高度48px
   - 圆角: 8px
   - 边框: 2px solid Border/Main
   - 背景: Background/Card

4. 添加占位符文本：
   - 文本: "请输入..."
   - 样式: Body/Default
   - 颜色: Text/Secondary
   - 左边距: 12px

5. 设置自动布局：
   - 垂直方向
   - 间距: 8px
   - 内边距: 0

6. 创建状态变体：
   ```
   Default状态:
   - 边框: Border/Main
   
   Focus状态:
   - 边框: Primary/Main
   - 阴影: 0 0 0 3px Primary/Main (10% opacity)
   
   Error状态:
   - 边框: Danger/Main
   - 阴影: 0 0 0 3px Danger/Main (10% opacity)
   ```

### 3.3 卡片组件（Card）

#### 制作步骤：
1. 创建基础容器：
   - 宽度: 自适应内容
   - 高度: 自适应内容
   - 圆角: 12px
   - 背景: Background/Card
   - 边框: 1px solid Border/Main
   - 阴影: Shadow/Small

2. 设置自动布局：
   - 垂直方向
   - 内边距: 24px
   - 间距: 16px

3. 添加内容区域：
   - 创建占位符文本
   - 可以是标题+内容的组合

4. 创建组件并添加Hover状态：
   ```
   Default状态:
   - 阴影: Shadow/Small
   
   Hover状态:
   - 阴影: Shadow/Medium
   - Y轴偏移: -2px
   ```

## 🏗️ 第四步：创建复合组件

### 4.1 统计卡片（Stat Card）

#### 制作步骤：
1. 创建卡片基础：
   - 使用基础Card组件
   - 尺寸: 280x200px

2. 添加顶部装饰条：
   - 矩形: 宽度100%, 高度4px
   - 位置: 顶部
   - 填充: AI渐变色
   - 圆角: 仅顶部圆角

3. 添加图标区域：
   - 圆角矩形: 60x60px
   - 圆角: 16px
   - 背景: AI渐变色
   - 图标: 24px, 白色

4. 添加数据区域：
   - 数值: 样式H1, 颜色Text/Primary
   - 标签: 样式Body/Default, 颜色Text/Secondary
   - 变化指标: 样式Body/Small, 带图标

5. 设置自动布局：
   - 垂直方向
   - 居中对齐
   - 间距: 16px

6. 添加交互状态：
   ```
   Hover效果:
   - Y轴向上: -4px
   - 阴影: Shadow/Large
   - 过渡: 0.3s ease
   ```

### 4.2 工具卡片（Tool Card）

#### 制作步骤：
1. 创建基础结构：
   - 卡片容器: 280x240px
   - 圆角: 16px
   - 内边距: 32px

2. 添加图标：
   - 容器: 80x80px圆角矩形
   - 圆角: 20px
   - 背景: AI渐变色
   - 图标: 32px白色图标

3. 添加文本内容：
   - 标题: 样式H3
   - 描述: 样式Body/Default, 行高1.5

4. 设置自动布局：
   - 垂直方向
   - 居中对齐
   - 间距: 24px

5. 创建悬停效果：
   ```
   Hover状态:
   - Y轴向上: -8px
   - 边框: 2px Primary/Main
   - 阴影: Shadow/Large
   - 添加光泽效果（可选）
   ```

### 4.3 文件上传区域（Upload Area）

#### 制作步骤：
1. 创建容器：
   - 宽度: 100%
   - 高度: 200px
   - 边框: 2px dashed Border/Main
   - 圆角: 16px
   - 背景: 渐变（Card到Light Background）

2. 添加内容：
   - 图标: 80x80px容器，云上传图标
   - 主文字: "拖拽文件到此处或点击上传"
   - 提示文字: "支持PDF、Word、Excel等格式"

3. 设置布局：
   - 垂直居中
   - 间距: 16px

4. 创建状态变体：
   ```
   Default: 灰色虚线边框
   Hover: Primary边框，背景色变化
   Dragover: Primary边框，背景更深，放大102%
   ```

## 📱 第五步：创建页面布局

### 5.1 头部导航（Header）

#### 制作步骤：
1. 创建容器：
   - 宽度: 1440px
   - 高度: 自适应
   - 背景: AI渐变色

2. 添加内容容器：
   - 最大宽度: 1400px
   - 居中对齐
   - 内边距: 16px 32px

3. 创建Logo区域：
   - 图标 + 文字组合
   - 水平布局，间距12px

4. 创建导航菜单：
   - 水平布局的导航项
   - 间距: 32px
   - 每项包含图标+文字

5. 创建用户菜单：
   - 通知按钮 + 头像
   - 水平布局，间距16px

6. 设置整体自动布局：
   - 水平方向
   - 两端对齐（space-between）

### 5.2 工作台页面（Dashboard）

#### 制作步骤：
1. 创建页面容器：
   - 使用Header组件
   - 主内容区域: 最大宽度1400px

2. 添加页面标题区域：
   - 标题: "AI智慧审计工作台"
   - 副标题: 说明文字
   - 垂直布局，间距8px

3. 创建统计面板：
   - 4个统计卡片
   - Grid布局: 4列
   - 间距: 24px

4. 添加快速开始卡片：
   - 使用Card组件
   - 标题栏: 左对齐标题，右对齐按钮
   - 内容: 上传区域组件

5. 添加审计流程卡片：
   - 标题: "AI智慧审计流程"
   - 5个流程步骤，水平排列
   - 连接线: 渐变色横线

#### 流程步骤制作：
1. 创建步骤组件：
   - 步骤数字: 50x50px圆形，渐变背景
   - 标题: 样式Body/Default，粗体
   - 描述: 样式Body/Small

2. 设置布局：
   - 垂直对齐
   - 居中对齐
   - 间距: 12px

3. 添加连接线：
   - 水平线，渐变色
   - 位置在步骤数字中央
   - Z-index较低

### 5.3 工具页面（Tools）

#### 制作步骤：
1. 复用Header组件

2. 创建页面标题区域：
   - 标题: "AI审计工具箱"
   - 副标题说明

3. 创建工具网格：
   - 6个工具卡片
   - Grid布局: auto-fill, 最小280px
   - 间距: 24px

4. 工具内容：
   ```
   1. 智能审前调查 - fa-search
   2. 文档智能分析 - fa-file-alt  
   3. 投标一致性检查 - fa-balance-scale
   4. 报价合理性分析 - fa-chart-pie
   5. 风险智能评估 - fa-exclamation-triangle
   6. 合规性检查 - fa-gavel
   ```

## 🔗 第六步：创建模态框

### 6.1 AI分析模态框

#### 制作步骤：
1. 创建背景遮罩：
   - 全屏尺寸
   - 背景: 黑色50%透明度
   - 模糊效果（可选）

2. 创建模态框容器：
   - 宽度: 600px
   - 背景: 白色
   - 圆角: 16px
   - 阴影: Shadow/Large
   - 居中对齐

3. 添加头部：
   - 标题: "AI正在分析您的文件"
   - 关闭按钮: X图标，右上角

4. 添加分析动画区域：
   - AI图标: 100x100px圆形，渐变背景
   - 机器人emoji: 48px
   - 状态文字: 动态显示分析步骤
   - 时间估计: 次要文字

5. 添加进度区域：
   - 进度标签: "分析进度："
   - 进度条容器: 100%宽度，8px高度，圆角
   - 进度条: 渐变色填充，动态宽度
   - 百分比文字: "0% 完成"

#### 脉冲动画效果：
```
创建AI图标的脉冲效果:
1. 复制图标创建阴影层
2. 设置关键帧:
   - 0%: scale(1), 阴影透明度70%
   - 70%: scale(1.05), 阴影扩散20px，透明度0%
   - 100%: scale(1), 阴影透明度0%
3. 动画时长: 2s，无限循环
```

### 6.2 新建项目模态框

#### 制作步骤：
1. 复用模态框基础结构

2. 创建表单内容：
   - 项目名称输入框（必填）
   - 审计类型下拉选择
   - 项目描述文本域

3. 添加按钮组：
   - 主按钮: "创建项目"
   - 次要按钮: "取消"
   - 水平布局，间距16px

4. 设置表单验证状态：
   - 必填字段红色星号
   - 错误状态显示
   - 成功状态反馈

## 📱 第七步：创建响应式版本

### 7.1 移动端适配原则

#### 布局调整：
1. 头部导航：
   - 垂直堆叠Logo和菜单
   - 汉堡菜单（可选）

2. 统计面板：
   - 改为2列或单列布局
   - 卡片最小宽度200px

3. 工具网格：
   - 单列布局
   - 卡片间距减少为16px

4. 审计流程：
   - 垂直堆叠步骤
   - 隐藏连接线
   - 增加步骤间距

#### 制作步骤：
1. 创建移动端画板: 375x812px

2. 复用桌面端组件

3. 调整布局：
   - 使用约束设置
   - 调整自动布局方向
   - 修改间距和内边距

4. 创建移动端特有组件：
   - 折叠导航菜单
   - 底部操作栏（可选）

## 🎭 第八步：添加交互原型

### 8.1 页面导航交互

#### 设置步骤：
1. 进入原型模式（Prototype tab）

2. 创建导航交互：
   - 选择导航按钮
   - 连接到目标页面
   - 动画: Slide In/Out
   - 方向: 从右侧滑入
   - 时长: 0.3s
   - 缓动: Ease In Out

3. 设置页面切换：
   ```
   工作台 → 工具: Slide Left
   工具 → 项目管理: Slide Left  
   项目管理 → 数据分析: Slide Left
   返回导航: Slide Right
   ```

### 8.2 模态框交互

#### 设置步骤：
1. 按钮触发模态框：
   - 选择"新建项目"按钮
   - 连接到模态框页面
   - 动画: Fade In + Scale
   - 起始缩放: 95%
   - 结束缩放: 100%
   - 时长: 0.2s

2. 关闭模态框：
   - 关闭按钮和背景都连接到原页面
   - 动画: Fade Out + Scale
   - 结束缩放: 95%

### 8.3 悬停效果

#### 设置步骤：
1. 卡片悬停：
   - 选择卡片组件
   - 创建Hover变体
   - 设置While Hovering触发器
   - 动画: Instant或0.2s ease

2. 按钮悬停：
   - 背景色变化
   - Y轴偏移-1px
   - 阴影变化

## 📋 第九步：最终整理和交付

### 9.1 组件库整理

#### 整理步骤：
1. 检查组件命名规范
2. 确保所有变体完整
3. 删除未使用的组件
4. 组织组件分类

#### 命名规范：
```
基础组件: Button, Input, Card
复合组件: StatCard, ToolCard, UploadArea  
布局组件: Header, Container, Modal
页面组件: DashboardPage, ToolsPage
```

### 9.2 样式库检查

#### 检查清单：
- [ ] 所有颜色都已创建样式
- [ ] 所有文字样式已定义
- [ ] 阴影效果样式完整
- [ ] 样式命名一致

### 9.3 导出设置

#### 导出资源：
1. 图标导出：
   - 格式: SVG
   - 尺寸: 多倍率(@1x, @2x, @3x)

2. 图片导出：
   - 格式: PNG/WebP
   - 品质: 最高

3. 切图标注：
   - 自动生成CSS代码
   - 标注尺寸、颜色、字体

### 9.4 文档说明

#### 创建说明页面：
1. 设计规范说明
2. 组件使用指南  
3. 交互规范说明
4. 开发对接说明

## 🎯 制作技巧和最佳实践

### 技巧总结：
1. **使用约束**: 确保响应式行为正确
2. **善用自动布局**: 提高组件灵活性
3. **创建完整变体**: 覆盖所有使用场景
4. **保持命名一致**: 便于团队协作
5. **合理使用组件**: 提高设计效率
6. **定期整理**: 保持文件结构清晰

### 质量检查：
- [ ] 所有页面在不同设备上显示正常
- [ ] 交互原型流畅自然
- [ ] 组件库完整可用
- [ ] 设计与开发规范一致
- [ ] 所有资源可正常导出

通过以上详细步骤，您可以在Figma中完整重现AI智慧审计工具的设计，并创建一个专业的设计系统供团队使用。 