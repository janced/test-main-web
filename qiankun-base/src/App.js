import { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Tooltip } from 'antd';
import { DesktopOutlined, PieChartOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ServiceUnavailable from './components/ServiceUnavailable';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [microAppErrors, setMicroAppErrors] = useState({});
  const [microAppStatus, setMicroAppStatus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  // 监听微应用状态变化
  useEffect(() => {
    const checkMicroAppStatus = () => {
      if (window.microAppStatus) {
        const errors = {};
        const status = {};
        
        Object.keys(window.microAppStatus).forEach(appName => {
          const appStatus = window.microAppStatus[appName];
          status[appName] = appStatus;
          
          if (appStatus === 'error' || appStatus === 'unhealthy') {
            errors[appName] = { 
              message: appStatus === 'unhealthy' ? '服务未启动' : '服务连接失败' 
            };
          }
        });
        
        setMicroAppErrors(errors);
        setMicroAppStatus(status);
      }
    };

    // 初始检查
    checkMicroAppStatus();

    // 定期检查状态
    const interval = setInterval(checkMicroAppStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  // 路由守卫 - 防止访问未启动的微应用
  useEffect(() => {
    if (window.checkMicroAppAccess && !window.checkMicroAppAccess(location.pathname)) {
      // 如果当前路由对应的微应用不可用，显示错误页面
      const currentAppName = getCurrentAppName();
      if (currentAppName && microAppStatus[currentAppName] === 'unhealthy') {
        // 已经在错误页面，不需要重定向
        return;
      }
    }
  }, [location.pathname, microAppStatus]);

  // 根据当前路由判断是否显示错误页面
  const getCurrentAppName = () => {
    const path = location.pathname;
    if (path.startsWith('/app-vue2')) return 'vue2App';
    if (path.startsWith('/app-vue3')) return 'vue3App';
    if (path.startsWith('/app-react')) return 'reactApp';
    return null;
  };

  const currentAppName = getCurrentAppName();
  const hasError = currentAppName && microAppErrors[currentAppName];

  // 获取菜单项状态图标
  const getMenuIcon = (appName) => {
    const status = microAppStatus[appName];
    switch (status) {
      case 'healthy':
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'unhealthy':
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <PieChartOutlined />;
    }
  };

  // 处理菜单点击
  const handleMenuClick = (path, appName) => {
    if (microAppStatus[appName] === 'unhealthy') {
      // 如果微应用不健康，直接导航到该路径显示错误页面
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item 
            key="1" 
            icon={getMenuIcon('vue2App')}
            onClick={() => handleMenuClick('/app-vue2', 'vue2App')}
          >
            <Tooltip 
              title={microAppStatus.vue2App === 'unhealthy' ? 'Vue2应用服务未启动' : 'Vue2应用'}
              placement="right"
            >
              <span>Vue2应用</span>
            </Tooltip>
          </Menu.Item>
          <Menu.Item 
            key="2" 
            icon={getMenuIcon('vue3App')}
            onClick={() => handleMenuClick('/app-vue3', 'vue3App')}
          >
            <Tooltip 
              title={microAppStatus.vue3App === 'unhealthy' ? 'Vue3应用服务未启动' : 'Vue3应用'}
              placement="right"
            >
              <span>Vue3应用</span>
            </Tooltip>
          </Menu.Item>
          <Menu.Item 
            key="3" 
            icon={getMenuIcon('reactApp')}
            onClick={() => handleMenuClick('/app-react', 'reactApp')}
          >
            <Tooltip 
              title={microAppStatus.reactApp === 'unhealthy' ? 'React应用服务未启动' : 'React应用'}
              placement="right"
            >
              <span>React应用</span>
            </Tooltip>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
            微前端管理系统
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: '12px' }}>服务状态:</span>
            <Badge 
              status={microAppStatus.vue2App === 'healthy' ? 'success' : 'error'} 
              text={<span style={{ color: '#fff', fontSize: '12px' }}>Vue2</span>} 
            />
            <Badge 
              status={microAppStatus.vue3App === 'healthy' ? 'success' : 'error'} 
              text={<span style={{ color: '#fff', fontSize: '12px' }}>Vue3</span>} 
            />
            <Badge 
              status={microAppStatus.reactApp === 'healthy' ? 'success' : 'error'} 
              text={<span style={{ color: '#fff', fontSize: '12px' }}>React</span>} 
            />
          </div>
        </Header> */}
        <Content style={{ margin: '16px' }}>
          {hasError ? (
            <ServiceUnavailable 
              appName={currentAppName} 
              error={microAppErrors[currentAppName]} 
            />
          ) : (
            <div id="container" className="site-layout-background" style={{ minHeight: 360 }}></div>
          )}
        </Content>
        <Footer style={{ textAlign: 'center' }}>This Project ©2025 Created by Jance.D</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
