# elementPlus搭建后台管理系统demo

- 技术栈：
  - vue3.5+elementPlus+pinia+Echart+vite

## 1、通过vite创建vue工程模板

- ```cmd
  npm create vite@letest
  ```

- vite中不包含sass，vue-router，pinia，需要自己安装

- ```cmd
  npm i sass --save-dev
  
  npm i vue-router --save
  
  npm i pinia --sav
  ```

- 安装好之后我们测试下router，在当前目录下创建一个router目录，再创建一个index.js

  - ```js
    import { createRouter, createWebHistory } from 'vue-router';
    const routes = [
        //....
    ];
    const router = createRouter({
        history: createWebHistory(),
        routes
    });
    export default router;	
    ```

- 在main.js中把router加载到vue应用实例中

  - ```js
    import { createApp } from 'vue'
    import './style.css'
    import App from './App.vue'
    import router from './router.js'
    createApp(App).use(router).mount('#app')
    ```

## 2、测试路由是否可用

- 创建两个页面组件home.vue和login.vue随便写点东西

- 创建路由对象

  - ```js
    import { createRouter, createWebHistory } from 'vue-router';
    const routes = [
        {
            path: "/",
            redirect: {
                name: "login"
            }
        },
        {
            path: "/home",
            name: "home",
            component: () => import('../views/home.vue') //异步加载
        },
        {
            path: "/login",
            name: "login",
            component: () => import('../views/login.vue')
        }
    ];
    const router = createRouter({
        history: createWebHistory(),
        routes
    });
    export default router;
    ```

- 清理app.vue，添加router-view组件

  - ```vue
    <script setup>
    
    </script>
    <template>
        <RouterView />
    </template>
    <style scoped></style
    ```

- 运行项目在浏览器中手动输入地址看是否可以正常跳转

## 3、导入element-plus

- element-plus作为一款ui框架是目前比较流行的一个用于快速搭建网页的组件库，它的前身叫做element-ui，由饿了么开发的一款ui框架，其提供了很多的已经封装好的现成组件，我们只需要调用这些组件就可以快速的搭建一个页面模板出来

- 安装

  - ```cmd
    npm i element-plus -S
    ```

- 导入方式在官方文档中分了两个方式
- 完整导入和按需导入
- 推荐使用按需导入，导入方式查看elementPlus官方文档