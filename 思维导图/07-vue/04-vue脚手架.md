- # vue脚手架


- 什么是脚手架？

- 简单来说，就是用于创建一个前端工程模板的工具，这里就会涉及到一个前端工程化的概念，所谓前端工程化其实可以认为是模块化开发的一个扩展，因为在实际开发中会使用到很多的一个第三方插件或者库文件

- 这个时候话，如果有一个工具能够起到一个一键安装的功能，那么就会非常方便，而这个工具就是脚手架，同时，因为我们会使用到很多的第三方工具，这个时候为了减少项目体积，同时提高开发效率，所以还会引入包打工具的使用

- 经过以上的情况之后，最终形成了一个在node环境下创建的前端工程项目，而脚手架现在的作用就是可以直接帮助我们创建一个工程项目模板

## 1、vue/cli

- 安装

- ```cmd
  npm i @vue/cli -g
  ```

- 安装好之后，两条路径可以帮助我们通过脚手架来搭建一个vue开发环境

- 1、通过图形界面（不推荐）

- ```cmd
  vue ui
  ```

- 2、通过命令行创建

- ```cmd
  vue create 项目名
  ```

  

### 1.1、工程项目目录

- package.json中有的script部分

- ```json
  "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build"
  }
  ```

  - serve：启动开发环境，脚手架已经帮我们配置好了项目热启动

  - build：生产环境运行，它会把做好的项目打包成一个单页面

### 1.2、src目录

- 该目录中就是我们页面开发的源文件目录

  - assets 静态资源目录，存放比如图片，字体文件等等

  - components 组件目录，内容组件，功能组件都可以放在这里面

  - router 路由管理目录，脚手架会默认帮助我们创建好路由管理对象

  - store 全局状态管理vuex的目录

  - views 页面组件目录，一般路由跳转的组件都放在这里面

  - app.vue 整个项目的根组件，整个项目的显示从这里个组件开始

  - main.js 整个项目的入口文件，也是webpack的打包入口

## 2、vite

- Vite 是一个超快速的前端构建工具，推动着下一代网络应用的发展
- vite作为脚手架工具并不是专门只针对vue使用的，所以目前前端的流行框架它都支持创建对应的工程模板

### 2.1、通过vite创建vue工程项目

- ```cmd
  npm create vite@latest
  ```

- 使用以上命令需要自己选择基于哪个框架来创建工程项目   
- 或者可以在创建的时候直接使用模板创建

- ```cmd
  npm create vite@latest my-vue-app -- --template vue
  ```

- 其中me-vue-app的部分可以替换成你的项目名称

  创建好之后vite默认是不包含vue-router和sass所以需要自己安装

- ```cmd
  npm i sass --save-dev
  npm i vue-router --save
  ```

### 2.2、src目录  

- vite创建的工程目录非常简洁，内部就5个目录文件

  - assets 静态资源目录

  - components 组件目录

  - app.vue 根组件

  - main.js 入口文件

  - style.css 全局样式

- 因为不自带全局状态管理，路由这些，所以，这些东西需要自己手动创建

# yarn的使用

- 这是一个补充知识点，我们可以通过yarn来管理包

- yarn也是一个包管理器，目前来讲包管理器有很多，但是我们大多数情况下使用的是npm，同时我们还对npm设置了国内镜像，这样下载速度会跟快一些

- npm有一个非常大的问题，每次都要从服务器上面下载包，这样很浪费流量，并且多人下载会很卡

- yarn实现了一个功能，把下载的包进行缓存，如果下次要用这个包，我们可以先从自己的电脑缓存去找，如果缓存没有才去服务器下载

  - > 注意：
    >
    > 能够被缓存的是通过yarn下载的包，如果依然使用的是npm下载的话，是不会缓存的

    

- 安装：

  - ```cmd
    npm i yarn -g
    ```

- yarn包指令

  - | 说明                   |                       |
    | ---------------------- | :-------------------- |
    | 安装包                 | yarn add 包名称       |
    | 安装开发环境包         | yarn add 包名成 --dev |
    | 删除包                 | yarn remove 包名称    |
    | 根据package.json安装包 | yarn                  |

- 安装好之后，如果报错window系统禁用脚本

  解决方案：

  找到Windows Powershell管理员运行，在命令窗口下执行以下命令

- ```cmd
  set-ExecutionPolicy RemoteSigned
  ```

  

  - 然后选择y即可

# 基于vue/cli脚手架创建的模板项目演示demo

## 1、清空自带的内容

- 打开app.vue把里面的内容清空写上样式重置和router-view

- ```vue
  <template>
    <page-view>
      <router-view>
  
      </router-view>
    </page-view>
  </template>
  
  <style lang="scss">
  * {
    padding: 0;
    margin: 0;
  }
  
  ul,
  ol {
    list-style: none;
  }
  
  #app {
    width: 100vw;
    height: 100vh;
  }
  </style>
  
  ```

  - 所有的页面都是通过路由来控制的，所以我们进入router目录把里面的index.js直接清空，由我们自己来写

- ```js
  import foodDetail from '@/views/foodDetail.vue';
  import home from '@/views/home.vue';
  import { createRouter, createWebHistory } from 'vue-router';
  //所有负责跳转的路由都写在routes里面
  const routes = [
    
  ];
  //创建路由管理对象
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),//使用history模式
    routes//把routes载入到router对象中
  });
  
  export default router;
  
  ```


- 然后我们把脚手架创建的组件文件都删掉，因为没有用，然后创建我们自己的组件文件

- ```vue
  <template>
      <h2>我是Home---{{ userName }}</h2>
      <button @click="changeName">按钮</button>
  </template>
  
  <script>
  import { ref } from "vue";
  export default {
      name: 'home',
      data() {
          return {
              userName: '张三'
          };
      },
      methods: {
          changeName() {
              this.userName = 'lisi';
          }
      },
  };
  </script>
  
  <style lang="scss" scoped></style>
  ```


## 2、进行一个简单测试


- 分别在home和foodDetail里面的template当中随便写点东西，然后设置好组件名，开始写各自的路由单体对象

- ```js
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
    history: createWebHistory(process.env.BASE_URL),//使用history模式
    routes//把routes载入到router对象中
  });
  
  export default router;
  
  ```

  - 代码分析：

    现在我们可以在地址栏中手动输入路径来实现页面组件的跳转

## 3、全屏盒子组件

- 现在我们可以手动切换页面，但是切换的时候我们要注意特且是移动端界面需要盛满全屏，所以我们需要制作一个全屏盒子组件，找到components目录，把自带文件删除掉，创建一个page-view.vue制作全屏盒子组件

- ```vue
  <template>
      <div class="page-view-box">
          <slot></slot>
      </div>
  </template>
  
  <script>
  export default {
      name: 'page-view'
  };
  </script>
  
  <style lang="scss" scoped>
  .page-view-box {
      width: 100%;
      height: 100%;
      overflow: auto;
      box-sizing: border-box;
  }
  </style>
  ```

  

- 在main.js中把全屏盒子注册成全局组件

  - ```js
    import { createApp } from 'vue';
    import App from './App.vue';
    import router from './router';
    import store from './store';
    import pageView from './components/page-view.vue';
    const app = createApp(App);
    app.component('pageView', pageView);
    app.use(store).use(router).mount('#app');
    ```

    

- 然后在app.vue中插入全屏盒子

  - ```vue
    <template>
      <page-view>
        <router-view>
    
        </router-view>
      </page-view>
    </template>
    ```

    