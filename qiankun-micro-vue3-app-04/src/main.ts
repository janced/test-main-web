import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { routes } from './config/router.config'
import { createRouter, createWebHistory } from 'vue-router';

let app: any;
let routerInstance: any;

function render(props: any) {
  const { container, routerBase } = props;
  
  // qiankun 环境下，路由 base 应该和 activeRule 一致
  const history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? routerBase : '/');
  
  routerInstance = createRouter({
    history,
    routes,
  });

  app = createApp(App);
  app.use(routerInstance);
  
  // 挂载到 qiankun 指定的容器，或者独立运行时挂载到 #app
  app.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时，也调用 render
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
} else {
  // 使用 vite-plugin-qiankun 提供的 renderWithQiankun 工具函数
  renderWithQiankun({
    mount(props) {
      console.log('Vue3 app mount');
      render(props);
    },
    bootstrap() {
      console.log('Vue3 app bootstrap');
    },
    unmount(props) {
      console.log('Vue3 app unmount', props);
      if (app) {
        app.unmount();
        app = null;
        routerInstance = null;
      }
    },
    update(props) {
      console.log('Vue3 app update', props);
    }
  });
}
