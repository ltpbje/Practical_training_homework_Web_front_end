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
        meta: { title: '首页' },

        component: () => import('../views/home.vue'),
        children: [
            {
                path: '/index',
                name: 'index',
                meta: { title: '首页' },

                component: () => import('../views/home/HomeIndex.vue')
            },
            {
                path: '/list',
                name: 'list',
                meta: { title: '列表管理' },

                component: () => import('../views/home/HomeList.vue'),
                children: [
                    {
                        path: '/list/info',
                        name: 'info',
                        meta: { title: '信息列表' },

                        component: () => import('../views/HomeList/HomeListInfo.vue')
                    },
                    {
                        path: '/list/manage',
                        name: 'manage',
                        meta: { title: '管理信息' },

                        component: () => import('../views/HomeList/HomeListManage.vue')
                    }
                ]
            },
            {
                path: '/data',
                name: 'data',
                meta: { title: '数据管理' },

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
