import React from 'react';
import { Result, Button, Card, Typography, Space } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const ServiceUnavailable = ({ appName, error }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getAppDisplayName = (name) => {
    const nameMap = {
      'vue3App': 'Vue3应用',
      'vue2App': 'Vue2应用', 
      'reactApp': 'React应用'
    };
    return nameMap[name] || name;
  };

  const handleRetry = async () => {
    // 重新检查微应用健康状态
    if (window.microAppStatus && appName) {
      window.microAppStatus[appName] = 'checking';
      
      // 触发重新检查
      const entry = getAppEntry(appName);
      if (entry) {
        try {
          const response = await fetch(entry, { 
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-cache'
          });
          window.microAppStatus[appName] = 'healthy';
          
          // 如果健康检查通过，重新注册微应用
          if (window.reregisterMicroApps) {
            await window.reregisterMicroApps();
          }
          
          // 刷新页面
          window.location.reload();
        } catch (error) {
          window.microAppStatus[appName] = 'unhealthy';
          console.log('重试检查失败:', error);
        }
      }
    }
  };

  const getAppEntry = (name) => {
    const entryMap = {
      'vue3App': '//localhost:8081',
      'vue2App': 'http://localhost:8082',
      'reactApp': '//localhost:4000'
    };
    return entryMap[name];
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh',
      padding: '20px'
    }}>
      <Card style={{ maxWidth: 600, width: '100%' }}>
        <Result
          icon={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
          title={
            <Title level={3} style={{ color: '#262626', marginBottom: 8 }}>
              系统暂未启动
            </Title>
          }
          subTitle={
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Text type="secondary" style={{ fontSize: '16px' }}>
                {getAppDisplayName(appName)} 微服务当前未运行
              </Text>
              <Text type="secondary">
                请稍后再试或联系系统管理员启动相关服务
              </Text>
              {error && (
                <Card size="small" style={{ backgroundColor: '#fafafa', marginTop: 16 }}>
                  <Text code style={{ fontSize: '12px' }}>
                    错误详情: {error.message || '连接被拒绝'}
                  </Text>
                </Card>
              )}
            </Space>
          }
          extra={
            <Space>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={handleRetry}
              >
                重新加载
              </Button>
              <Button 
                icon={<HomeOutlined />}
                onClick={handleGoHome}
              >
                返回首页
              </Button>
            </Space>
          }
        />
        
        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          backgroundColor: '#f6ffed', 
          border: '1px solid #b7eb8f',
          borderRadius: 6
        }}>
          <Title level={5} style={{ color: '#52c41a', marginBottom: 8 }}>
            💡 解决建议
          </Title>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#595959' }}>
            <li>检查微服务是否已启动</li>
            <li>确认服务端口配置是否正确</li>
            <li>检查网络连接是否正常</li>
            <li>联系系统管理员获取帮助</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ServiceUnavailable;

