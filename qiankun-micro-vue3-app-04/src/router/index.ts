import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "../config/router.config";

// 根据是否在qiankun环境中设置不同的base路径
const base = (window as any).__POWERED_BY_QIANKUN__ ? "/app-vue3" : "/";

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

// 在qiankun环境中添加路由守卫
if ((window as any).__POWERED_BY_QIANKUN__) {
  router.beforeEach((to, from, next) => {
    console.log('[Vue3 Router] Navigating to:', to.path);
    next();
  });
}
  
export default router;