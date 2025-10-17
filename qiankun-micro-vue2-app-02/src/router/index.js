import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "../config/router.config";

Vue.use(VueRouter);

const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/app-vue2/" : "/",
    mode: "history",
    routes,
});
  
export default router;