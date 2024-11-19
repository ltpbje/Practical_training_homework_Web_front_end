# vue脚手架


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

## 4、公共样式的封装

- 在assets目录下新建一个scss目录，新建一个comm.scss 写入公共样式

- ```scss
  //封装弹性盒子样式
  
  .flex-row{
      display: flex;
      flex-direction: row;
  }
  
  
  .flex-column{
       display: flex;
      flex-direction: column;
  }
  
  .j-c{
      justify-content: center;
  }
  
  .a-c{
      align-items: center;
  }
  
  .j-s-a{
      justify-content: space-around;
  }
  .j-s-b{
      justify-content: space-between;
  }
  .j-s-e{
      justify-content: space-evenly;
  }
  .flex-1{
      flex: 1;
      overflow: auto;
  }
  
  $primaryColor:#008de1 !default;
  $secondColor:#ff4500 !default;
  $colorMap:(primary:$primaryColor,second:$secondColor);
  
  @each $key,$value in $colorMap {
      .bg-#{$key}{
          background-color: $value;
      }
      .text-#{$key}{
          color: $value;
      }
  }
  ```

- 把公共样式导入到入口文件`main.js`当中，让其可以被项目启用

- ```js
  import "./assets/scss/comm.scss"
  ```

- 然后我们把需要使用的其他静态资源也一并放入到assets目录中并在入口文件中引入，比如项目中会被经常用到的字体图标

- ```js
  import "./assets/icon/iconfont.scss"
  ```

  

- 还有，如果我们制作的是移动端项目，那么还需要写入用于移动端适配的样式

- ```scss
  
  :root {
    font-size: calc(100vw / 375 *100);
  }
  
  body {
    font-size: 16px;
  }
  
  @media only screen and (min-width:769px) {
    :root {
      font-size: calc(768px / 375 *100);
    }
  
    #app {
      width: 768px;
      margin: 0 auto;
    }
  }
  ```

  

- > 注意：
  >
  > 以上的移动端适配的样式，我们需要把这些样式写入到`app.vue`根组件中，而并不是作为公共样式直接导入到入口文件中
  >
  > - 原因：
  >
  >   - 主要原因在于脚手架在打包运行程序的时候的执行顺序，先启动运行环境 --->执行入口文件 ---> 渲染根组件
  >
  >   - 而公共样式是导入到入口文件中，根组件在入口文件之后执行，有可能会把入口文件中的样式覆盖掉，因为两者都是#app这个选择器
  >   

## 5、home.vue页面布局

- ```vue
  <template>
      <page-view class="flex-column">
          <div class="content-box flex-1">
              <router-view></router-view>
          </div>
          <ul class="tab-bar flex-row j-s-a a-c">
              <router-link custom :to="{ name: 'chooseFood' }" v-slot="{ navigate, isActive }">
                  <li @click="navigate" :class="{ 'text-primary': isActive }">
                      <span class="iconfont icon-canju"></span>点餐
                  </li>
              </router-link>
              <router-link custom :to="{ name: 'order' }" v-slot="{ navigate, isActive }">
                  <li @click="navigate" :class="{ 'text-primary': isActive }">
                      <span class="iconfont icon-dingdan"></span>订单
                  </li>
              </router-link>
              <router-link custom :to="{ name: 'category' }" v-slot="{ navigate, isActive }">
                  <li @click="navigate" :class="{ 'text-primary': isActive }">
                      <span class="iconfont icon-fenlei"></span>分类
                  </li>
              </router-link>
              <router-link custom :to="{ name: 'my' }" v-slot="{ navigate, isActive }">
                  <li @click="navigate" :class="{ 'text-primary': isActive }">
                      <span class="iconfont icon-my"></span>我的
                  </li>
              </router-link>
  
          </ul>
      </page-view>
  </template>
  
  <script>
  import { RouterLink } from "vue-router";
  export default {
      name: 'home',
  
  };
  </script>
  
  <style lang="scss" scoped>
  .tab-bar {
      height: 0.55rem;
      background-color: #ececec;
      border-top: 1px solid lightgray;
  
      li {
          font-size: .14rem;
          display: flex;
          flex-direction: column;
          align-items: center;
  
          .iconfont {
              margin-bottom: .03rem;
              font-size: .2rem;
          }
      }
  }
  </style>
  ```


## 6、二级路由设置

- 当我们把home.vue当中的额tab-bar制作完成之后，上面的content-box里面就需要根据tab-bar的点击来切换渲染在content-box中的虚拟页面（二级页面），所以，**我们在要content-box里面添加一个router-view**

- 然后在views目录中当中可以新建4个在home中显示的子页面组件，然后分别把内部的基础结构写好，然后开始写二级路由

- 在router目录中打开index.js文件

  - ```js
    import foodDetail from '@/views/foodDetail.vue';
    import home from '@/views/home.vue';
    import { createRouter, createWebHistory } from 'vue-router';
    import chooseFood from '@/views/chooseFood.vue';
    import order from '@/views/order.vue';
    import category from '@/views/category.vue';
    import my from '@/views/my.vue';
    //所有负责跳转的路由都写在routes里面
    const routes = [
    //路由重定向
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
    
    ```

## 7、二级路由的tab-bar设置

- 我们完成了二级页面的手动跳转，但是实际上跳转是依靠tab-bar的4个图片来实现的，所以我们需要给tab-bar绑定跳转

- 现在我们可以把li替换成router-link，添加跳转，设置tag属性指定router-link生成li标签 `vue-router4.x 中tag不可用`，:to设置跳转目标

- ```vue
  <router-link custom :to="{ name: 'chooseFood' }" v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="{ 'text-primary': isActive }">
          <span class="iconfont icon-canju"></span>点餐
      </li>
  </router-link>
  <router-link custom :to="{ name: 'order' }" v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="{ 'text-primary': isActive }">
          <span class="iconfont icon-dingdan"></span>订单
      </li>
  </router-link>
  <router-link custom :to="{ name: 'category' }" v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="{ 'text-primary': isActive }">
          <span class="iconfont icon-fenlei"></span>分类
      </li>
  </router-link>
  <router-link custom :to="{ name: 'my' }" v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="{ 'text-primary': isActive }">
          <span class="iconfont icon-my"></span>我的
      </li>
  </router-link>
  ```

- 然后我们就可以实现点击tab-bar来跳转二级页面

## 8、title-bar组件封装

- 大部分页面的标题栏的结构和外观都是一样的，所以我们可以把标题栏封装成一个全局组件，在需要的页面中调用

- 在components目录中新建一个title-bar.vue

  - ```vue
    <template>
        <div class="title-bar bg-primary flex-row a-c j-c">
            <div class="left-back" v-show="showBack">
                <span class="iconfont icon-prev">
                </span>
            </div>
            <slot></slot>
            <div class="right-menu">
                <slot name="right-menu"></slot>
    
            </div>
        </div>
    </template>
    
    <script>
    export default {
        name: 'title-bar',
        props: {
        //返回默认是不显示，所以我们需要通过动态的改变一个布尔值来决定其显示隐藏
            showBack: {
                type: Boolean,
                default: () => false
            }
        }
    };
    </script>
    
    <style lang="scss" scoped>
    .title-bar {
        height: .45rem;
        font-size: .18rem;
        color: #fff;
    
        .left-back {
            position: absolute;
            left: .1rem;
            display: flex;
            align-items: center;
            font-size: .20rem;
        }
    
        .right-menu {
            position: absolute;
            right: .1rem;
        }
    }
    </style>
    ```

    - >  代码分析：
      >
      > 因为在不同的页面中调用的时候，标题栏显示的标题内容不一样，所以我们可以设置一个插槽，在不同页面调用的时候，插入不同的标题内容

- 然后我们把该组件导入到入口文件中进行全局注册

- 然后title-bar在某些页中左边会显示一个返回图标，现在开始制作

- 返回默认是不显示，所以我们需要通过动态的改变一个布尔值来决定其显示隐藏
     - ```js
      export default {
        name: 'title-bar',
        props: {
        //返回默认是不显示，所以我们需要通过动态的改变一个布尔值来决定其显示隐藏
            showBack: {
                type: Boolean,
                default: () => false
            }
        }
      };
    
  - 举例：在category当中调用title-bar并通过show-back属性传入true
  
  - ```vue
    <template>
        <title-bar :show-back="true">分类</title-bar>
    </template>
    ```
  

- 现在进入到分类，我们可以看到分类中返回是显示，但是其他页面依然是不显示的在title-bar的右边，会显示一个用户图标，这个可以用具名插槽来制作

  - ```vue
    <template>
        <div class="title-bar bg-primary flex-row a-c j-c">
            <div class="left-back" v-show="showBack">
                <span class="iconfont iconfanhui"></span>
            </div>
            <slot></slot>
            <div class="right-menu">
                <slot name="right-menu"></slot>
            </div>
        </div>
    </template>
    ```

- 然后在调用title-bar的组件内部插入

- ```vue
  <template>
      <title-bar :show-back="true">
          分类
          <template #right-menu>
              <span class="iconfont iconyonghuming right-menu">
              </span>
          </template>
      </title-bar>
  </template>
  ```

- 没有问题最后把样式搞定即可