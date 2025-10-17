import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    console.log('React 微前端子系统已加载');
  }, []);

  return (
    <div className="home">
      <div className="welcome-container">
        <div className="header">
          <h1 className="title">🎉 欢迎来到 React 微前端子系统</h1>
          <p className="subtitle">基于 React 19 + React Router 7 构建</p>
        </div>
        
        <div className="content">
          <div className="info-card">
            <h3>📋 系统信息</h3>
            <ul className="info-list">
              <li><strong>框架版本：</strong>React 19.1.1</li>
              <li><strong>路由版本：</strong>React Router 7.9.1</li>
              <li><strong>构建工具：</strong>Create React App + CRACO</li>
              <li><strong>微前端框架：</strong>qiankun</li>
              <li><strong>运行端口：</strong>4000</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <h3>✨ 功能特性</h3>
            <div className="features">
              <div className="feature-item">
                <span className="icon">🚀</span>
                <span>独立运行</span>
              </div>
              <div className="feature-item">
                <span className="icon">🔗</span>
                <span>微前端集成</span>
              </div>
              <div className="feature-item">
                <span className="icon">📱</span>
                <span>响应式设计</span>
              </div>
              <div className="feature-item">
                <span className="icon">⚡</span>
                <span>快速加载</span>
              </div>
            </div>
          </div>
          
          <div className="status-card">
            <h3>📊 运行状态</h3>
            <div className="status-indicators">
              <div className="status-item success">
                <span className="status-dot"></span>
                <span>系统运行正常</span>
              </div>
              <div className="status-item success">
                <span className="status-dot"></span>
                <span>微前端连接成功</span>
              </div>
              <div className="status-item success">
                <span className="status-dot"></span>
                <span>路由配置完成</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer">
          <p className="footer-text">
            🎯 这是一个基于 qiankun 微前端架构的 React 子系统
          </p>
          <p className="version">版本: 0.1.0</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
