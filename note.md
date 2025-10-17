# 工程搭建笔记

> qiankun官网：https://qiankun.umijs.org/zh/guide
> 
> 官方给的github项目地址：https://github.com/umijs/qiankun

对于任何微应用框架来说，都是由基座(即父应用)和子应用组合构成的，下面开始搭建基座。

## 1 创建基座
父应用可以采用不同的技术框架，比如react、vue2、vue3。

先确保开发环境安装好了Nodejs，然后执行以下命令。

如果要创建react父应用：
```bash
npx create-react-app qiankun-base
```
vue父应用：
```bash
npx @vue/cli create vue-qiankun-base
```
Umi父应用：
```bash
npx create-umi qiankun-base
```
这里用react举例，运行上面第一个指令，直到出现下面的成功提示：
![](/pics/001-创建baseWeb应用成功.png)

## 2 添加qiankun依赖

成功之后，在父工程里添加qiankun，用npm或yarn都行。
```bash
cd qiankun-base
npm i qiankun -S
(或者 yarn add qiankun)
```

## 3 在基座里注册子应用

注册子应用需要使用 qiankun 提供的方法 registerMicroApps ，注册之后还需要调用 start 方法进行启动。

**在 react 项目中使用 qiankun 只需将以下代码复制粘贴到 index.js 中即可。**

```js
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'vueApp',
    entry: '//localhost:8080',
    container: '#container',
    activeRule: '/app-vue',
  },
]);

// 启动 qiankun
start();
```
index.js完整代码如下：

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerMicroApps, start } from 'qiankun';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';

registerMicroApps([
  {
    name: 'vue3App',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/app-vue3',
  },
  {
    name: 'vue2App',
    entry: '//localhost:8082',
    container: '#container',
    activeRule: '/app-vue2',
  },
  {
    name: 'reactApp',
    entry: '//localhost:4000',
    container: '#container',
    activeRule: '/app-react',
  },
]);

// 启动 qiankun
start();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/*
注意：后面的步骤会安装依赖 react-router-dom ，这里import BrowserRouter在加上依赖后才会生效
*/
```

### **qiankun** 微前端框架中 registerMicroApps 配置的每个属性的意义与作用:

Read file: qiankun-base/src/index.js
现在我来详细解释 qiankun 微前端框架中 `registerMicroApps` 配置的每个属性的意义与作用：

### 3.1 `name: 'vueApp'`
**意义**: 微应用的唯一标识符
**作用**: 
- 用于区分不同的微应用
- 在 qiankun 内部作为微应用的唯一标识
- 在生命周期函数、事件通信等场景中用于识别微应用
- 建议使用有意义的名称，便于维护和调试

### 3.2 `entry: '//localhost:8080'`
**意义**: 微应用的入口地址
**作用**:
- 指定微应用的访问地址，qiankun 会从这个地址加载微应用
- 支持多种格式：
  - `//localhost:8080` - 自动适配当前页面的协议（http/https）
  - `http://localhost:8080` - 明确指定协议
  - `https://example.com` - 外部地址
- qiankun 会从这个地址获取微应用的 HTML 和 JavaScript 资源

### 3.3 `container: '#container'`
**意义**: 微应用的挂载容器
**作用**:
- 指定微应用渲染到主应用的哪个 DOM 元素中
- 可以是 CSS 选择器字符串（如 `#container`、`.app-container`）
- 也可以是 DOM 元素对象
- 微应用会被渲染到这个容器内部
- 主应用需要确保这个容器元素存在

### 3.4 `activeRule: '/app-vue'`
**意义**: 微应用的激活规则
**作用**:
- 定义何时加载和显示这个微应用
- 支持多种匹配方式：
  - 字符串：`'/app-vue'` - 当 URL 路径以 `/app-vue` 开头时激活
  - 函数：`(location) => location.pathname.startsWith('/app-vue')` - 自定义激活逻辑
  - 数组：`['/app-vue', '/vue']` - 多个路径规则
- 当用户访问匹配的路径时，qiankun 会自动加载并渲染对应的微应用

### 3.5 其他常用属性（虽然当前配置中没有使用）：

#### `props` (可选)
**意义**: 传递给微应用的数据
**作用**:
- 主应用向微应用传递数据、方法等
- 微应用可以通过 `props` 接收这些数据

#### `loader` (可选)
**意义**: 自定义加载状态
**作用**:
- 在微应用加载过程中显示自定义的加载提示
- 提升用户体验

#### `sandbox` (可选)
**意义**: 沙箱配置
**作用**:
- 控制微应用的运行环境隔离
- 可以配置 `strictStyleIsolation`、`experimentalStyleIsolation` 等

这个配置的核心思想是：当用户访问 `/app-vue` 路径时，qiankun 会从 `localhost:8080` 加载一个 Vue 微应用，并将其渲染到主应用中 id 为 `container` 的元素内。

## 4 引入样式框架
为了更接近在实际中后台项目中的使用情况，我在此处引入 antDesign 使用它的 layout 组件搭建一个中后台的基本样子。老规矩我们先安装一下 antDesign。
```bash
npm install antd
```
然后在 index.js 中导入 antDesign 的样式即可。
```js
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less' 这是Ant Design 4.x的样式
import 'antd/dist/reset.css'; // 这是Ant Design 5.x的样式
```
接下来我们需要改造一下 App.js，此处我直接贴一下代码，因为只需要将 antDesign 文档的内容复制过来加以改动即可。

```js
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
// import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/app-vue2">Vue2应用</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/app-vue3">Vue3应用</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <Link to="/app-react">React应用</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <div id="container" className="site-layout-background" style={{ minHeight: 360 }}></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>This Project ©2025 Created by Jance.D</Footer>
      </Layout>
    </Layout>
  );
}

export default App;

// 别忘了在index.css或app.css中添加如下样式

#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

```
如果顺利，可以使用命令npm start来启动（默认命令，如果改了可以使用自己的命令），启动成功后可以看见下面的界面：
![](/pics/002-baseWeb启动成功.png)

## 5 引入router

因为 qiankun 是通过路由的变化来匹配微应用的，所以在基座中我们还应该加上路由，在 react 中，即 react-router-dom 。
```bash
npm install react-router-dom
```

安装完成之后，只需要在 App.js 中引入 Link 组件，然后将侧边栏的文字替换成 Link 即可。
```js
import { Link } from 'react-router-dom'
```
```js
<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
  <Menu.Item key="1" icon={<PieChartOutlined />}>
    <Link to="/app-vue">Vue应用</Link>
  </Menu.Item>
  <Menu.Item key="2" icon={<DesktopOutlined />}>
    <Link to="/app-react">React应用</Link>
  </Menu.Item>
</Menu>
```

## 6 创建子应用

本文将分别使用两个主流的前端框架 react 和 vue 来创建子应用，在子应用中要做的事情其实很简单，只需要导出子应用的生命周期即可，注意此处的生命周期并非指的是框架的生命周期。而是由 qiankun 规定的三种生命周期，分别是：bootstrap、mount、 unmount。以下引用文档的描述：
```js
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {

}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {

}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {

}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {

}

```
qiankun 基于 single-spa，所以你可以在 [这里](https://single-spa.js.org/docs/building-applications.html#registered-application-lifecycle) 找到更多关于微应用生命周期相关的文档说明。

### 6.1 Vue2子应用

#### 6.1.1 创建子应用
首先使用脚手架创建一个 vue2.x 的项目，不再赘述详细内容
```bash
npm install -g @vue/cli (如果已安装可忽略)
vue create qiankun-mirco-vue (选择2.x版本)
cd qiankun-mirco-vue (进入微前端项目目录)
npm install vue-router@3 (安装vue router)
```
注意：，直接安装 vue-router 会默认安装最新版本（vue-router 4.x），而 vue-router 4.x 只支持 Vue 3。
对于 Vue 2 项目，您需要安装 vue-router 3.x 版本。

#### 6.1.2 修改 main.js
然后修改 main.js，导出三个生命周期，并修改运行时 publicPath，什么是运行时的 publicPath ？ 简单的理解就是，这个变量可以指定微应用资源加载的基础路径。整体代码如下：
```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let instance = null;
function render(props = {}) {
  const { container } = props;
  // 文档中使用store，此处没有便删除了。
  // 文档中的router对象是在此处创建的，但是在router文件夹的index.js中已经创建好了，所以稍加改造直接导入就好，下方贴了代码
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时 直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}

```
因为ESLint限制，全局变量__webpack_public_path__会不被认可，需要在ESLint配置中声明一下，在package.json中ESLint配置如下：
```js
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true,
      "browser": true // 加这行，表示启用浏览器环境的全局变量（如window、document等），避免ESLint将这些变量报错为未定义
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser"
    },
    "globals": { // 加这个参数，声明为全局变量
      "__webpack_public_path__": "writable" // 声明为全局可写
    },
    "rules": {}
  },
```
#### 6.1.3 router配置
为什么这要加一个 router 配置，上面的代码注释中有过解释，没有看到的小伙伴可以去瞄一眼。可以和文档进行一个对比
```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? "/app-vue/" : "/",
  mode: "history",
  routes,
});

export default router;

```
#### 6.1.4 webpack配置
然后还要修改 webpack 的配置，添加 vue.config.js 文件，添加以下内容即可。主要做了两件事，一是运行跨域，二是将微应用打包成一个 library
```js
const { name } = require("./package");

module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}` // 定义全局变量名，用于加载异步 chunk。此配置是webpack5的配置，webpack4的配置是jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};

```
完成以上两步之后，vue 子应用基本搭建完成。

### 6.2 Vue3子应用(Vue3+vite)
> 参考：https://blog.csdn.net/jyl919221lc/article/details/130110455

创建vue3子应用：
创建时会询问定义项目名,framework选择vue，variant选择TypeScript，Use rolldown-vite选择No，因为该技术尚未成熟。
```bash
npm create vite@latest
```
安装vite-plugin-qiankun依赖包，因为qiankun本身不支持vite，需要额外安装这个依赖。
```bash
cd (子项目名)
npm i vite-plugin-qiankun
```
修改vite.config.js
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vite.dev/config/
export default defineConfig({
  base:'/app-vue3', // 和基座中配置的activeRule一致
  server:{
    port: 8081, // 和子应用中配置的port一致
    cors: true, // 允许跨域
    origin: 'http://localhost:3000',
  },
  plugins: [
    vue(), 
    qiankun('vue3App', { // 和基座中配置的name一致
      useDevMode: true // 开启dev模式
    })
  ],
})
```
修改main.ts
```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import router from './router'

let app: any;

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    createApp(App).use(router).mount('#app')
} else {
  renderWithQiankun({
    mount(props) {
      app = createApp(App)
      app.use(router)
      app.mount(props.container ? props.container.querySelector('#app') : '#app')
    },
    bootstrap() {
      console.log('[vue] vue app bootstraped')
    },
    update(props) {
      console.log('[vue] vue app updated', props)
    },
    unmount() {
      app?.unmount()
    }
  })
}
```
### 6.3 react子应用
对于 react 创建子应用，文档描述的很详细，但是还是有一点点小坑，具体内容如下，可以和文档进行对比：

#### 6.3.1 创建子应用
创建一个 react 子应用，并安装 react-router-dom
```bash
npx create-react-app qiankun-mirco-react
cd qiankun-mirco-react
npm install react-router-dom
```
#### 6.3.2 修改index.js
然后修改 index.js，此处文档有坑，即在使用 react-router-dom 的时候应该将 BrowserRouter 包在 App 组件的外层。具体代码如下
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let root = null;

function render(props) {
  const { container } = props;
  const targetElement = container ? container.querySelector('#root') : document.querySelector('#root');
  
  // 如果已经存在 root，先卸载
  if (root) {
    root.unmount();
  }
  
  // 创建新的 root
  root = ReactDOM.createRoot(targetElement);
  root.render(
    <React.StrictMode>
      <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
        <App />
      </Router>
    </React.StrictMode>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  if (root) {
    root.unmount();
    root = null;
  }
}

```
#### 6.3.3 修改webpack
然后便是修改 webpack 的配置啦，如何修改，此处只需要完全按照 [文档](https://qiankun.umijs.org/zh/guide/tutorial#react-%E5%BE%AE%E5%BA%94%E7%94%A8) 的描述来即可。

安装插件 @rescripts/cli，当然也可以选择其他的插件，例如 react-app-rewired。
```bash
npm i -D @rescripts/cli
```
注意，@rescripts/cli只支持 react-scripts 2.x 到 4.x 版本，不兼容 react-scripts 5.x。如果使用5.x，有以下解决方案:
> 方案1：使用 CRACO（推荐）
> 
> @craco/craco 是 @rescripts/cli 的现代替代品，支持 react-scripts 5.x：
> ```bash
> npm install @craco/craco --save-dev
> ```

> 方案2：使用 react-app-rewired
>
> 另一个流行的替代方案：
> ```bash
> npm install react-app-rewired --save-dev
> ```

> 方案3：使用 --legacy-peer-deps（不推荐）
>
> 如果必须使用 @rescripts/cli：
> ```js
> npm install @rescripts/cli --legacy-peer-deps
> ```
> 但这种方式可能导致运行时问题。

> 对比@craco/craco、@rescripts/cli、react-app-rewired：
>
> 1. 三者均用于覆盖或扩展 create-react-app（CRA）的默认配置，避免直接执行不可逆的 eject 操作。
> 2. 支持通过自定义配置文件修改 Webpack、Babel、Jest 等构建工具配置。
> 3. ‌@craco/craco：
>> - 提供模块化配置，通过 craco.config.js 文件支持多环境配置（如开发/生产环境）；  
>> - 内置对 Webpack、Babel、Jest 等工具的全面覆盖能力，支持直接修改 paths.appBuild 等底层配置；  
>> - 与 Ant Design 等生态深度集成，推荐用于企业级项目。  
>> - 支持多配置文件（如 craco.config.ts 和 craco.config.js），优先级明确；
>> - 内置 CDN 配置、Gzip 压缩等生产环境优化功能。
> 4. react-app-rewired：
>> - 需配合 customize-cra 实现复杂功能（如修改 Webpack 输出路径、代理配置）；
>> - 配置方式为单一函数导出（override），灵活性高但需手动合并配置对象。
>> - 社区生态成熟，适合深度定制 Webpack（如接入微前端框架 qiankun）
> 5. @rescripts/cli：
>> - 采用插件化架构，通过 .rescriptsrc.js 文件以数组形式组合多个插件（如 ['@rescripts/rescript-env']）MCP_3 
>> - 更适合轻量级定制，但对复杂需求可能需要自行开发插件MCP_3
>> - 更新频率较低，部分插件可能滞后于 CRA 更新，需测试兼容性MCP_3


##### 6.3.3.1 @rescripts/cli的使用方法：
根目录新增 .rescriptsrc.js：
```js
const { name } = require('./package');

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    config.output.jsonpFunction = `webpackJsonp_${name}`; 
    config.output.globalObject = 'window';

    return config;
  },

  devServer: (_) => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};
```
修改 package.json：
```js
-   "start": "react-scripts start",
+   "start": "rescripts start",
-   "build": "react-scripts build",
+   "build": "rescripts build",
-   "test": "react-scripts test",
+   "test": "rescripts test",
-   "eject": "react-scripts eject"
```

##### 6.3.3.2 @craco/craco的使用方法
安装@craco/craco：
```bash
npm install @craco/craco --save-dev
```
子系统根目录下创建craco.config.js：
```js
// craco.config.js (Final Recommended Version)

const { name } = require('./package.json');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 修改输出配置
      webpackConfig.output = {
        ...webpackConfig.output,
        library: 'reactApp', // 库名，与主应用注册的 name 一致
        libraryTarget: 'umd', // 输出为 UMD 格式
        uniqueName: name, // Webpack 5+，设置唯一的运行时名称，防止冲突
        globalObject: 'window', // 定义全局对象
      };

      return webpackConfig;
    },
  },

  devServer: (devServerConfig, { env, proxy, allowedHost }) => {
    // 设置 headers 允许跨域
    devServerConfig.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    
    // 确保路由能正确处理
    devServerConfig.historyApiFallback = true;

    // 关闭子应用自身的热更新和实时重新加载，交给 qiankun 处理，避免冲突
    devServerConfig.hot = false;
    devServerConfig.liveReload = false;

    // 兼容不同版本的 webpack-dev-server
    if (devServerConfig.static) {
      // 在较新版本的 webpack-dev-server 中，`watch` 选项在 `static` 内部
      devServerConfig.static.watch = false;
    } else {
      // 兼容旧版本
      devServerConfig.watchFiles = false;
    }

    return devServerConfig;
  },
};
```
修改package.json：
```js
// 将start/build/test三个命令修改为craco方式
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
  "eject": "react-scripts eject"
}
```
#### 6.3.4 修改子应用端口号
细心的你可能发现了，此时 react 子应用的端口号和 react 基座的端口号是一样的？此时会出现问题，那么需要我们改一个子应用的端口号了。方法如下：
1. 如果你的脚手架很新，在 node_modules 下找到 react-scripts 目录修改 scripts 目录下的 start.js 的64行将3000，改为4000即可(端口随便，但是要和注册的时候保持一致)
```js
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000 改 4000;
```
2. 如果你的脚手架很老，老脚手架创建的项目 scripts 目录是直接暴露出来的，所以直接找到文件修改即可
3. BST:不推荐修改node_modules下的任何文件，可以在根目录创建.env文件，添加：
```text
PORT=9000
```
   
至此react子应用也已经搭建成功！！！

## 7 其他

### 7.1 健康检查以及路由守卫

如果基座里注册了多个子应用，其中部分子应用没有启动或宕机，会造成页面报错，所以要在基座里增加健康检查，如果子应用不健康，就不再加载该应用，而是跳转到一个报错页面。

### 7.2 子应用css样式与作用域

当 qiankun 加载子应用时，它会获取子应用的 index.html 的` <body> `标签内的所有内容（包括应用的` <div id="app"></div>`），然后将这些内容插入到基座的` <div id="container"></div>` 中。

同时，子应用的 CSS（也就是这个 style.css）会被加载到主文档的` <head> `中（即使在 Shadow DOM 模式下，某些全局选择器也可能逃逸或产生非预期的影响）

在用vite初始化新项目时，注意.css文件中，有可能有影响全局的样式，这种需要删除，或者改成指定子应用作用域内生效。

以下样式可能影响整体布局：
```css
/* 1. 子应用里仅用标签控制，且不加任何作用域，可能会影响基座的样式，尤其里面不能有布局样式（如 display: flex, position, width, height 等） */
body {
  ...
}
div {
  ...
}
/* 2. :root选择器在 HTML 中等同于 html 标签，里面的样式会修改整个页面。*/
:root {
  ...
}
```
**子应用样式规范：**
* 子应用的职责是渲染其业务内容，而不是定义整个页面的布局和外观。
* 所有影响布局的样式（如 display: flex, position, width, height 等）都应该在组件内部使用 ```<style scoped> ```来定义。
* 如果确实需要一些全局样式（比如按钮、卡片的统一样式），最好的办法是使用 CSS 预处理器（如 Sass/Less）和作用域前缀，或者确保这些样式只使用**类选择器**（如 .btn, .card），而不是标签选择器（body, h1）或 ID 选择器 (#app)。
  
**总结：**

当修改一个独立前端应用时，应注意：
* 用作用域 ```<style scoped>``` 来定义样式
* 作用域以外的只使用类选择器，不使用标签选择器和ID选择器，类选择器的类名尽量加上子应用名作为前缀，以防影响主应用以及其他子应用（多个子应用同页面的情况）。