import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: '/',
        redirect: {
            name: 'login'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue'),
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('../views/home/HomeIndex.vue')
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('../views/home/HomeList.vue'),
                children: [
                    {
                        path: '/list/info',
                        name: 'info',
                        component: () => import('../views/HomeList/HomeListInfo.vue')
                    },
                    {
                        path: '/list/manage',
                        name: 'manage',
                        component: () => import('../views/HomeList/HomeListManage.vue')
                    }
                ]
            },
            {
                path: '/data',
                name: 'data',
                component: () => import('../views/home/HomeData.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
