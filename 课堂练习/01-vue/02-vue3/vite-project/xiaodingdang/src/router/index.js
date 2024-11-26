import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    redirect: {
      name: "index"
    }
  },
  {
    path: '/home',
    name: "home",
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        path: '/home/index',
        name: "index",
        component: () => import('@/views/home/HomeIndex.vue')
      },
      {
        path: '/home/search',
        name: "search",
        component: () => import('@/views/home/HomeSearch.vue')
      },
      {
        path: '/home/news',
        name: "news",
        component: () => import('@/views/home/HomeNews.vue')
      },
    ]
  },
  {
    path: '/my',
    name: "my",
    component: () => import('@/views/my/My.vue')
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
