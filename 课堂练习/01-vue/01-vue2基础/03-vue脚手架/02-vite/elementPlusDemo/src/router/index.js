import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: '/',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../view/home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../view/login.vue')
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
