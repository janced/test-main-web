<template>
  <div class="about">
    <div class="about-container">
      <div class="hero-section">
        <h1 class="hero-title">关于 Vue 2 微前端子系统</h1>
        <p class="hero-subtitle">深入了解我们的技术架构和实现方案</p>
      </div>
      
      <div class="content-section">
        <div class="tech-stack">
          <h2>🛠️ 技术栈</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <div class="tech-icon">⚛️</div>
              <h3>Vue 2.6.14</h3>
              <p>渐进式 JavaScript 框架</p>
            </div>
            <div class="tech-item">
              <div class="tech-icon">🛣️</div>
              <h3>Vue Router 3.6.5</h3>
              <p>官方路由管理器</p>
            </div>
            <div class="tech-item">
              <div class="tech-icon">🔧</div>
              <h3>Vue CLI 5.0</h3>
              <p>标准构建工具</p>
            </div>
            <div class="tech-item">
              <div class="tech-icon">🏗️</div>
              <h3>qiankun</h3>
              <p>微前端框架</p>
            </div>
          </div>
        </div>
        
        <div class="architecture">
          <h2>🏗️ 架构设计</h2>
          <div class="arch-diagram">
            <div class="arch-level">
              <div class="arch-item main-app">
                <h4>基座应用</h4>
                <p>React + qiankun</p>
                <span class="port">:3000</span>
              </div>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-level">
              <div class="arch-item sub-app">
                <h4>Vue 2 子应用</h4>
                <p>Vue 2.6 + Router 3</p>
                <span class="port">:8082</span>
              </div>
              <div class="arch-item sub-app">
                <h4>Vue 3 子应用</h4>
                <p>Vue 3 + Vite</p>
                <span class="port">:8081</span>
              </div>
              <div class="arch-item sub-app">
                <h4>React 子应用</h4>
                <p>React + CRA</p>
                <span class="port">:4000</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="features">
          <h2>✨ 核心特性</h2>
          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">🚀</div>
              <div class="feature-content">
                <h3>独立部署</h3>
                <p>每个子应用都可以独立开发、测试和部署，互不影响</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🔗</div>
              <div class="feature-content">
                <h3>技术栈无关</h3>
                <p>支持不同技术栈的子应用，Vue、React 等可以共存</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <div class="feature-content">
                <h3>按需加载</h3>
                <p>子应用按需加载，提升首屏加载速度</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🛡️</div>
              <div class="feature-content">
                <h3>样式隔离</h3>
                <p>子应用间样式完全隔离，避免样式冲突</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🔄</div>
              <div class="feature-content">
                <h3>状态共享</h3>
                <p>基座与子应用间可以安全地共享状态</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📱</div>
              <div class="feature-content">
                <h3>响应式设计</h3>
                <p>完美适配各种设备尺寸，提供一致的用户体验</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="implementation">
          <h2>🔧 实现细节</h2>
          <div class="impl-sections">
            <div class="impl-section">
              <h3>微前端配置</h3>
              <div class="code-block">
                <pre><code>// vue.config.js
module.exports = {
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${name}`
    }
  }
}</code></pre>
              </div>
            </div>
            
            <div class="impl-section">
              <h3>路由配置</h3>
              <div class="code-block">
                <pre><code>// router/index.js
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]</code></pre>
              </div>
            </div>
            
            <div class="impl-section">
              <h3>生命周期</h3>
              <div class="lifecycle">
                <div class="lifecycle-step">
                  <span class="step-number">1</span>
                  <span class="step-text">应用启动</span>
                </div>
                <div class="lifecycle-step">
                  <span class="step-number">2</span>
                  <span class="step-text">路由注册</span>
                </div>
                <div class="lifecycle-step">
                  <span class="step-number">3</span>
                  <span class="step-text">组件渲染</span>
                </div>
                <div class="lifecycle-step">
                  <span class="step-number">4</span>
                  <span class="step-text">状态管理</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact">
          <h2>📞 联系我们</h2>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span>Email: microfrontend@example.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🌐</span>
              <span>Website: https://microfrontend.example.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📱</span>
              <span>Phone: +86 138-0000-0000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      currentTime: new Date().toLocaleString()
    }
  },
  mounted() {
    console.log('About 页面已加载')
  }
}
</script>

<style scoped>
.about {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.about-container {
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 50px;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #7f8c8d;
  margin: 0;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.tech-stack, .architecture, .features, .implementation, .contact {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.tech-stack h2, .architecture h2, .features h2, .implementation h2, .contact h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2rem;
  border-bottom: 3px solid #3498db;
  padding-bottom: 15px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.tech-item {
  text-align: center;
  padding: 30px 20px;
  background: #f8f9fa;
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.tech-item h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.tech-item p {
  color: #7f8c8d;
  margin: 0;
}

.arch-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.arch-level {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.arch-item {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  min-width: 150px;
}

.main-app {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.sub-app {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.arch-item h4 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.arch-item p {
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.port {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.arch-arrow {
  font-size: 2rem;
  color: #3498db;
  font-weight: bold;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.feature-content h3 {
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.feature-content p {
  color: #7f8c8d;
  margin: 0;
  line-height: 1.6;
}

.impl-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.impl-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.lifecycle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.lifecycle-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  min-width: 100px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.step-text {
  color: #2c3e50;
  font-size: 0.9rem;
  font-weight: 500;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-item span:last-child {
  color: #2c3e50;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .arch-level {
    flex-direction: column;
    align-items: center;
  }
  
  .feature-list {
    grid-template-columns: 1fr;
  }
  
  .impl-sections {
    grid-template-columns: 1fr;
  }
  
  .lifecycle {
    flex-direction: column;
  }
}
</style>
