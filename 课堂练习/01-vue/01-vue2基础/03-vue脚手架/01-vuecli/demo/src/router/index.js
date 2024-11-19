import foodDetail from '@/views/foodDetail.vue';
import home from '@/views/home.vue';
import { createRouter, createWebHistory } from 'vue-router';
import chooseFood from '@/views/chooseFood.vue';
import order from '@/views/order.vue';
import category from '@/views/category.vue';
import my from '@/views/my.vue';
//所有负责跳转的路由都写在routes里面
const routes = [
  {
    path: '/',
    redirect: {
      name: 'chooseFood'
    }

  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: 'chooseFood',
        name: 'chooseFood',
        component: chooseFood
      },
      {
        path: 'order',
        name: 'order',
        component: order
      },
      {
        path: 'category',
        name: 'category',
        component: category
      },
      {
        path: 'my',
        name: 'my',
        component: my
      },
    ]
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
