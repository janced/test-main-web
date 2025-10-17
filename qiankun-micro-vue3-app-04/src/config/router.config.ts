export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeVue3.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutVue3.vue"),
  },
  // 添加微应用路由匹配
  // {
  //   path: "/app-vue3",
  //   redirect: "/"
  // },
  // {
  //   path: "/app-vue3/",
  //   redirect: "/"
  // },
  // {
  //   path: "/app-vue3/about",
  //   redirect: "/about"
  // }
];
