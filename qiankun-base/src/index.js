import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';

// 微应用状态管理
window.microAppStatus = {
  vue3App: 'unknown',
  vue2App: 'unknown', 
  reactApp: 'unknown'
};

// 路由守卫 - 检查微应用是否可用
window.checkMicroAppAccess = (pathname) => {
  let appName = null;
  if (pathname.startsWith('/app-vue2')) appName = 'vue2App';
  if (pathname.startsWith('/app-vue3')) appName = 'vue3App';
  if (pathname.startsWith('/app-react')) appName = 'reactApp';
  
  if (appName && window.microAppStatus[appName] === 'unhealthy') {
    return false; // 阻止访问
  }
  return true; // 允许访问
};

// 动态重新注册微应用
window.reregisterMicroApps = async () => {
  console.log('重新检查微应用状态并注册...');
  
  // 重新检查健康状态
  await preCheckMicroApps();
  
  // 重新注册健康的微应用
  registerHealthyMicroApps();
  
  // 重新启动qiankun
  start({
    prefetch: false,
    sandbox: {
      experimentalStyleIsolation: true, // 使用新的样式隔离配置
    },
  });
};

// 微应用健康检查
const checkMicroAppHealth = async (entry) => {
  try {
    // 使用GET请求检查，因为HEAD请求可能被CORS阻止
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时
    
    const response = await fetch(entry, { 
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.log(`健康检查失败 ${entry}:`, error.message);
    return false;
  }
};

// 预检查微应用状态
const preCheckMicroApps = async () => {
  const apps = [
    { name: 'vue3App', entry: '//localhost:8081' },
    { name: 'vue2App', entry: 'http://localhost:8082' },
    { name: 'reactApp', entry: '//localhost:4000' }
  ];

  console.log('开始预检查微应用状态...');
  
  // 并行检查所有微应用
  const healthChecks = apps.map(async (app) => {
    const isHealthy = await checkMicroAppHealth(app.entry);
    window.microAppStatus[app.name] = isHealthy ? 'healthy' : 'unhealthy';
    console.log(`微应用 ${app.name} 状态: ${isHealthy ? '健康' : '不健康'}`);
    return { name: app.name, healthy: isHealthy };
  });

  await Promise.all(healthChecks);
  console.log('微应用状态检查完成:', window.microAppStatus);
};

// 错误处理函数
const handleMicroAppError = (error, app) => {
  console.warn(`微应用 ${app.name} 加载失败:`, error);
  window.microAppStatus[app.name] = 'error';
  
  // 如果容器存在，显示错误提示
  const container = document.querySelector(app.container);
  if (container) {
    container.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 20px;
        text-align: center;
        background: #f5f5f5;
        border-radius: 8px;
      ">
        <div style="
          font-size: 48px;
          color: #ff4d4f;
          margin-bottom: 16px;
        ">⚠️</div>
        <h2 style="color: #262626; margin-bottom: 8px;">系统暂未启动</h2>
        <p style="color: #8c8c8c; margin-bottom: 16px;">
          ${app.name} 微服务当前未运行，请稍后再试或联系管理员
        </p>
        <div style="
          background: #fff;
          padding: 16px;
          border-radius: 6px;
          border: 1px solid #d9d9d9;
          font-family: monospace;
          font-size: 12px;
          color: #666;
        ">
          错误信息: ${error.message || '连接被拒绝'}
        </div>
      </div>
    `;
  }
};

// 微应用加载成功处理
const handleMicroAppMount = (app) => {
  console.log(`微应用 ${app.name} 加载成功`);
  window.microAppStatus[app.name] = 'success';
};

// 动态注册微应用 - 只注册健康的微应用
const registerHealthyMicroApps = () => {
  const apps = [
    {
      name: 'vue3App',
      entry: 'http://localhost:8081',
      container: '#container',
      activeRule: '/app-vue3',
      props: {
        routerBase: '/app-vue3',
      }
    },
    {
      name: 'vue2App',
      entry: 'http://localhost:8082',
      container: '#container',
      activeRule: '/app-vue2',
    },
    {
      name: 'reactApp',
      entry: '//localhost:4000',
      container: '#container',
      activeRule: '/app-react',
    },
  ];

  // 只注册健康的微应用
  const healthyApps = apps.filter(app => {
    const isHealthy = window.microAppStatus[app.name] === 'healthy';
    if (!isHealthy) {
      console.log(`跳过注册不健康的微应用: ${app.name}`);
    }
    return isHealthy;
  });

  if (healthyApps.length > 0) {
    const microApps = healthyApps.map(app => ({
      ...app,
      loader: (loading) => {
        console.log(`${app.name} loading:`, loading);
      },
      beforeLoad: (app) => {
        console.log(`${app.name} beforeLoad:`, app);
        // 再次检查健康状态
        if (window.microAppStatus[app.name] !== 'healthy') {
          throw new Error(`微应用 ${app.name} 不健康，停止加载`);
        }
      },
      beforeMount: (app) => {
        console.log(`${app.name} beforeMount:`, app);
      },
      afterMount: (app) => {
        handleMicroAppMount(app);
      },
      beforeUnmount: (app) => {
        console.log(`${app.name} beforeUnmount:`, app);
      },
      afterUnmount: (app) => {
        console.log(`${app.name} afterUnmount:`, app);
      },
    }));

    registerMicroApps(microApps, {
      // 全局错误处理
      onError: (error, app) => {
        console.warn(`微应用 ${app.name} 发生错误:`, error);
        // 不显示错误页面，直接标记为不健康
        window.microAppStatus[app.name] = 'error';
      }
    });
  } else {
    console.log('没有健康的微应用可以注册');
  }
};

// 启动应用
const initializeApp = async () => {
  // 预检查微应用状态
  await preCheckMicroApps();
  
  // 只注册健康的微应用
  registerHealthyMicroApps();
  
  // 启动 qiankun，禁用预加载
  start({
    prefetch: false, // 禁用预加载，避免未启动的服务报错
    sandbox: {
      experimentalStyleIsolation: true, // 使用新的样式隔离配置
    },
  });
};

// 全局错误处理 - 阻止qiankun错误页面显示
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && event.error.message.includes('Failed to fetch')) {
    console.warn('捕获到微应用加载错误，已阻止显示错误页面:', event.error.message);
    event.preventDefault();
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('Failed to fetch')) {
    console.warn('捕获到微应用加载Promise错误，已阻止显示错误页面:', event.reason.message);
    event.preventDefault();
    return false;
  }
});

// 初始化应用
initializeApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

