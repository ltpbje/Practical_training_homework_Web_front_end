import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    redirect: {
      name: "index"
    },
    // 任何人都可以
    meta: { requiresAuth: false },
  },
  {
    path: '/home',
    name: "home",
    component: () => import('@/views/home/Home.vue'),
    // 任何人都可以
    meta: { requiresAuth: false },
    children: [
      {
        path: '/home/index',
        name: "index",
        component: () => import('@/views/home/HomeIndex.vue'),
        // 任何人都可以
        meta: { requiresAuth: false },
      },
      {
        path: '/home/search',
        name: "search",
        component: () => import('@/views/home/HomeSearch.vue'),
        // 任何人都可以
        meta: { requiresAuth: false },
      },
      {
        path: '/home/news',
        name: "news",
        component: () => import('@/views/home/HomeNews.vue'),
        // 任何人都可以
        meta: { requiresAuth: false },
      },
      {
        path: '/home/profile',
        name: "profile",
        component: () => import('@/views/home/HomeProfile.vue'),
        // 只有经过身份验证的用户才能
        meta: { requiresAuth: true },
      },

    ]
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/Login.vue'),
    // 任何人都可以
    meta: { requiresAuth: false },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
