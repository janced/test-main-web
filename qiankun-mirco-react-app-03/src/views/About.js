import React, { useEffect, useState } from 'react';
import './About.css';

function About() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    console.log('About 页面已加载');
  }, []);

  return (
    <div className="about">
      <div className="about-container">
        <div className="hero-section">
          <h1 className="hero-title">关于 React 微前端子系统</h1>
          <p className="hero-subtitle">基于 React 19 + React Router 7 的现代化微服务架构</p>
        </div>
        
        <div className="content-section">
          <div className="tech-stack">
            <h2>🛠️ 技术栈</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <div className="tech-icon">⚛️</div>
                <h3>React 19.1.1</h3>
                <p>用于构建用户界面的 JavaScript 库</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🛣️</div>
                <h3>React Router 7.9.1</h3>
                <p>React 官方路由库</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🔧</div>
                <h3>Create React App</h3>
                <p>官方脚手架工具</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🏗️</div>
                <h3>qiankun</h3>
                <p>微前端框架</p>
              </div>
            </div>
          </div>
          
          <div className="architecture">
            <h2>🏗️ 架构设计</h2>
            <div className="arch-diagram">
              <div className="arch-level">
                <div className="arch-item main-app">
                  <h4>基座应用</h4>
                  <p>React + qiankun</p>
                  <span className="port">:3000</span>
                </div>
              </div>
              <div className="arch-arrow">↓</div>
              <div className="arch-level">
                <div className="arch-item sub-app">
                  <h4>React 子应用</h4>
                  <p>React 19 + Router 7</p>
                  <span className="port">:4000</span>
                </div>
                <div className="arch-item sub-app">
                  <h4>Vue 2 子应用</h4>
                  <p>Vue 2 + Vue CLI</p>
                  <span className="port">:8082</span>
                </div>
                <div className="arch-item sub-app">
                  <h4>Vue 3 子应用</h4>
                  <p>Vue 3 + Vite + TS</p>
                  <span className="port">:8081</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="features">
            <h2>✨ 核心特性</h2>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-content">
                  <h3>独立部署</h3>
                  <p>每个子应用都可以独立开发、测试和部署，互不影响</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔗</div>
                <div className="feature-content">
                  <h3>技术栈无关</h3>
                  <p>支持不同技术栈的子应用，Vue、React 等可以共存</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h3>按需加载</h3>
                  <p>子应用按需加载，提升首屏加载速度</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-content">
                  <h3>样式隔离</h3>
                  <p>子应用间样式完全隔离，避免样式冲突</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔄</div>
                <div className="feature-content">
                  <h3>状态共享</h3>
                  <p>基座与子应用间可以安全地共享状态</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <div className="feature-content">
                  <h3>响应式设计</h3>
                  <p>完美适配各种设备尺寸，提供一致的用户体验</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="implementation">
            <h2>🔧 实现细节</h2>
            <div className="impl-sections">
              <div className="impl-section">
                <h3>微前端配置</h3>
                <div className="code-block">
                  <pre><code>{`// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.library = \`\${name}-[name]\`;
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.output.chunkLoadingGlobal = \`webpackJsonp_\${name}\`;
      return webpackConfig;
    }
  }
};`}</code></pre>
                </div>
              </div>
              
              <div className="impl-section">
                <h3>路由配置</h3>
                <div className="code-block">
                  <pre><code>{`// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`}</code></pre>
                </div>
              </div>
              
              <div className="impl-section">
                <h3>生命周期</h3>
                <div className="lifecycle">
                  <div className="lifecycle-step">
                    <span className="step-number">1</span>
                    <span className="step-text">应用启动</span>
                  </div>
                  <div className="lifecycle-step">
                    <span className="step-number">2</span>
                    <span className="step-text">路由注册</span>
                  </div>
                  <div className="lifecycle-step">
                    <span className="step-number">3</span>
                    <span className="step-text">组件渲染</span>
                  </div>
                  <div className="lifecycle-step">
                    <span className="step-number">4</span>
                    <span className="step-text">状态管理</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact">
            <h2>📞 联系我们</h2>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>Email: microfrontend@example.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <span>Website: https://microfrontend.example.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span>Phone: +86 138-0000-0000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
