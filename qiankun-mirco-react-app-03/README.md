# React 微前端子系统

这是一个基于 React 19 + React Router 7 构建的微前端子系统，作为 qiankun 微前端架构的一部分。

## 🚀 技术栈

- **React 19.1.1** - 用于构建用户界面的 JavaScript 库
- **React Router 7.9.1** - React 官方路由库
- **Create React App** - 官方脚手架工具
- **CRACO** - Create React App Configuration Override
- **qiankun** - 微前端框架

## 📁 项目结构

```
src/
├── views/
│   ├── Home.js          # 首页组件
│   ├── Home.css         # 首页样式
│   ├── About.js         # 关于页面组件
│   └── About.css        # 关于页面样式
├── App.js               # 主应用组件（包含路由配置）
├── App.css              # 主应用样式
└── index.js             # 应用入口
```

## 🛠️ 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 运行测试
npm test
```

## 🌐 页面路由

- `/` - 首页，展示系统信息和功能特性
- `/about` - 关于页面，详细介绍技术架构和实现方案

## 🎨 页面特性

### 首页 (Home)
- 系统信息展示
- 功能特性介绍
- 运行状态监控
- 响应式设计

### 关于页面 (About)
- 技术栈介绍
- 架构设计图
- 核心特性说明
- 实现细节展示
- 联系方式

## 🔧 微前端配置

该应用已配置为 qiankun 微前端子应用，支持：

- 独立运行和部署
- 与基座应用集成
- 样式隔离
- 状态共享

## 📱 响应式设计

所有页面都采用响应式设计，完美适配：
- 桌面端 (1200px+)
- 平板端 (768px - 1199px)
- 移动端 (< 768px)

## 🚀 启动说明

1. 确保已安装 Node.js (推荐 16+ 版本)
2. 在项目根目录运行 `npm install`
3. 运行 `npm start` 启动开发服务器
4. 访问 http://localhost:4000 查看应用

## 📄 许可证

MIT License