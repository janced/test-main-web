<template>
  <div class="home">
    <div class="welcome-container">
      <div class="header">
        <h1 class="title">🎉 欢迎来到 Vue 2 微前端子系统</h1>
        <p class="subtitle">基于 Vue 2.6.14 + Vue Router 3.x 构建</p>
      </div>
      
      <div class="content">
        <div class="info-card">
          <h3>📋 系统信息</h3>
          <ul class="info-list">
            <li><strong>框架版本：</strong>Vue 2.6.14</li>
            <li><strong>路由版本：</strong>Vue Router 3.6.5</li>
            <li><strong>构建工具：</strong>Vue CLI 5.0</li>
            <li><strong>微前端框架：</strong>qiankun</li>
            <li><strong>运行端口：</strong>8082</li>
          </ul>
        </div>
        
        <div class="feature-card">
          <h3>✨ 功能特性</h3>
          <div class="features">
            <div class="feature-item">
              <span class="icon">🚀</span>
              <span>独立运行</span>
            </div>
            <div class="feature-item">
              <span class="icon">🔗</span>
              <span>微前端集成</span>
            </div>
            <div class="feature-item">
              <span class="icon">📱</span>
              <span>响应式设计</span>
            </div>
            <div class="feature-item">
              <span class="icon">⚡</span>
              <span>快速加载</span>
            </div>
          </div>
        </div>
        
        <div class="status-card">
          <h3>📊 运行状态</h3>
          <div class="status-indicators">
            <div class="status-item success">
              <span class="status-dot"></span>
              <span>系统运行正常</span>
            </div>
            <div class="status-item success">
              <span class="status-dot"></span>
              <span>微前端连接成功</span>
            </div>
            <div class="status-item success">
              <span class="status-dot"></span>
              <span>路由配置完成</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p class="footer-text">
          🎯 这是一个基于 qiankun 微前端架构的 Vue 2 子系统
        </p>
        <p class="version">版本: 0.1.0</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      currentTime: new Date().toLocaleString()
    }
  },
  mounted() {
    console.log('Vue 2 微前端子系统已加载')
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #66eae8 0%, #4b82a2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.welcome-container {
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.info-card, .feature-card, .status-card {
  background: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8f4f8;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover, .feature-card:hover, .status-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.info-card h3, .feature-card h3, .status-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  padding: 8px 0;
  color: #555;
  border-bottom: 1px solid #f0f0f0;
}

.info-list li:last-child {
  border-bottom: none;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.feature-item:hover {
  background: #e9ecef;
}

.feature-item .icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.feature-item span:last-child {
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
}

.status-indicators {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: #f8f9fa;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 12px;
  background: #28a745;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.footer {
  text-align: center;
  padding-top: 30px;
  border-top: 2px solid #ecf0f1;
}

.footer-text {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.version {
  color: #95a5a6;
  font-size: 0.9rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-container {
    padding: 20px;
    margin: 10px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
