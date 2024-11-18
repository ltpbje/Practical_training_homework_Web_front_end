import foodDetail from '@/views/foodDetail.vue';
import home from '@/views/home.vue';
import { createRouter, createWebHistory } from 'vue-router';
//所有负责跳转的路由都写在routes里面
const routes = [
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/foodDetail',
    name: 'foodDetail',
    component: foodDetail
  }
];
//创建路由管理对象
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
