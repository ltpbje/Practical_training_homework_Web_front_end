# vite生产环境


vite作为脚手架工具搭建一套本地服务器运行的开发环境，那么其生产环境的配置如何，我们现在主要学习了两个脚手架工具一个vue/cli一个vite，在vue/cli中其内置的打工工具是webpack，vite采用的是rollup，所以现在我们先简单认识一下rollup

## 1、webpack与rollup

- 我们快速了解一下两者的特性

  - rollup是一个JavaScript模块打包器，而webpack是一个静态资源模块打包器，这就意味着webpack可以支持打包更多类型的文件，比如，图片、字体等等更多的加载器（loader）

  - rollup具有更快的打包速度，因为它只专注打包JavaScript模块，webpack打包速度比较慢，因为它可能需要处理更多类型的文件

  - rollup使用树摇晃（tree shaking）机制来删除多余或者未使用的代码，webpack也支持树摇晃，但是需要使用插件UgifyJS

  - rollup具备更少的配置，因为它更容易使用，webpack具备更多的配置选项，但是也提供更多的灵活性

- rollup如果需要单独使用可以参考官方文档，这里我们不过去赘述，因为内置在vite中的rollup基本已经配置好了

## 2、开始直接打包

- ```cmd
  npm run build
  ```

- 直接打包完成之后，我们可以可以看到我们打包的SPA页面，但是还出现一个警告

- > (!) Some chunks are larger than 500 kB after minification. Consider:
  >
  > - Using dynamic import() to code-split the application
  >   - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
  >   - Adjust chunk size limit for this warning via
  >   - build.chunkSizeWarningLimit.

- 这里主要是提示我们其中 dist/assets/HomeIndex--x0fzGfR.js 打包的体积过大，超过了最大500kb的限制，这里的主要原因还是在echart上面，我们是直接完整导入的，导致在这个homeIndex这个组件中引入的Echart组件体积过大

## 3、提高最大静态资源警告门槛

- 我们可以通过修改rollup的打包文件大小的上限来解决
- 我们在vite.config.js中添加配置项

- ```js
  build:{
      chunkSizeWarningLimit:4096
  },
  ```

- 再执行 npm run build就已经不再报警了，但是超大文件依然还是存在的，这样其实就是掩耳盗铃，所以我们会采用另外一种方式

## 4、超大静态资源拆分

```js
build: {
    chunkSizeWarningLimit: 4096,
        rollupOptions: {
        output: {
            manualChunks(id){
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules')
                    [1].split('/')[0].toString();
                }
            }
        }
    }
},
```

- >  注意：
  >
  > 这里我们直接定义底层的rollup报，这里可以做的配置与rollup工具本身的配置文件中的选项是相同

- 但是从新拆分之后的结果中依然还是有很大的文件，所以，按需导入的重要性就不言而喻了
- 那么，我们如果想进一步压缩打包文件的大小，怎么办？

## 5、gzip静态资源压缩

- 我们使用vite的插件来完成，安装插件

- ```cmd
  npm i vite-plugin-compression -D
  ```

- 在vite.config.js中引入插件并完成配置

- ```js
  plugins: [
      //.......
      viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz'
      })
  ],;
  ```

- 在打包结果当中看到我们实际针对大文件的压缩结果，会小非常多，但是，依然不要忘记前期制作时按需导入

## 6、清除console和debugger

- 安装模块

- ```cmd
  npm i terser --save
  ```

- 在build中配置

- ```js
  minify: 'terser',
      terserOptions: {
      compress: {
          drop_console: true,
              drop_debugger: true;
      }
  },
  ```

  ## 7、分类存放打包文件

- 经过上面的操作，被打包的文件的种类会非常多，但是这些文件会全部都放在assets这个目录里面，我们希望将同类文件存放在一起，进行一个文件分类管理
- 我们在build中添加配置

```js
rollupOptions: {
    output: {
        //......
        chunkFileNames: (chunkInfo) => {
            const facadeModuled = chunkInfo.facadeModuleId ?
                chunkInfo.facadeModuleId.split("/") : [];
            const fileName = facadeModuled[facadeModuled.length - 2] ||
                '[name]';
            return `js/${fileName}/[name].[hash].js`;
        };
    }
}
```

## 8、配置环境变量

- 我们现在打包好文件，然后执行npm run preview 进入预览模式查看打包好的结果应该是没有问题的，但是现在有一个问题，如果我们直接把打包的项目本地打开会发现页面一篇空白，打开控制台发现很多的404，其实原因就是在打包文件的引入路径上面
- 打开dist / index.html

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
    <script type="module" crossorigin src="/assets/index-oMc5CSQi.js"></script>
    <link rel="modulepreload" crossorigin href="/js/index/index.C9X6LXw-.js">
    <link rel="stylesheet" crossorigin href="/assets/index-BpoDzaNh.css">
    <!doctype html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Vue</title>
        <script type="module" crossorigin src="/assets/index-oMc5CSQi.js"></script>
        <link rel="modulepreload" crossorigin href="/js/index/index.C9X6LXw-.js">
        <link rel="stylesheet" crossorigin href="/assets/index-BpoDzaNh.css">
        <link rel="stylesheet" crossorigin href="/assets/index-Ce7f2yQ1.css">
</head>

<body>
    <div id="app"></div>
</body>

</html>
```

- > 分析：
  >
  > 我们可以看到上面的所有的外部文件的引入都是绝对路径，而现在的问题是从服务器的根路径下面找到不到对应的静态资源文件，因为现在的本地服务器的根目录是当前工程项目文件夹，而不是dist目录下，所以，绝对路径的根路径
  >
  > 就是你工程项目的目录，那么，自然是无法直接从根目录下找到assets，js这些目录的
  >
  > 如果把本地服务器的根目录改成dist目录也可以，但是这样做治标不治本

- 目前我们学习过的两种脚手架在生产环境下打包的时候都会出现上面所说的路径问题，vue/cli内置的是webpack打包，而webpack的配置当中可以通过publicPath的设置来解决这个问题，在vite中也有类似的操作，但是我们还要考虑一个问题，一旦修改了公共路径，那么在开发环境下路径指向又会出问题，**所以我们这里需要通过得知当前的运行环境来决定公共路径的配置**
- **现在我们需要获取当前运行环境就需要使用到环境变量**

### 8.1、什么是环境变量

- 根据我们当前的代码环境变化的变量我们就叫**环境变量**

- 正在当前的运行环境下，环境变量是可以全局访问的，比如之前我们讲过的webpack，我们可以通过环境变量来决定一个配置的结果

- ```js
  const config = {
      mode: process.env.NODE_ENV === "production" ? 'production' :
          'development'
  };
  ```

  

- process.env.NODE_ENV 就是一个环境变量，按照上面的写法，我们其实就可以把原来我们在webpack内容中讲过的两套配置合二为一

- > process.env 是nodeJS提供一个API，返回一个对象，这个对象里面包含了所有的环境变量，比如process.env.HOME 返回用户的主目录，而webpack是运行在node环境下的打包工具，所以可以直接调用 process.env

### 8.2、在vite中做同样的配置

- 在vite的配置文件中添加配置项base用于设置打包之后的公共路径

- ```js
  //base用于设置打包之后的公共路径
  base:process.env.NODE_ENV == "production" ? './' : '/',
  ```



# 仿饿了么（小叮当）简易外卖程序

- 通过vite脚手架新建vue工程目录

- ```cmd
  npm i create@latest
  ```

  - > 自己安装好sass，vue-router，pinia
    >
    > 扩展：
    >
    > 安装sass之后可能会出现以下提示：
    >
    > Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
    >
    > 这个提示是因为sass某些api将在2.0.0版本后弃用，在vite中配置如下即可取消
    >
    > 警告

- ```js
  export default defineConfig({
      css: {
          preprocessorOptions: {
              scss: {
                  api: "modern-compiler"
              }
          }
      },
      //.......
  });
  ```



## 1、重置工程目录

- 创建好工程目录之后，四件事：

  - 1、把默认自带的功能组件和页面组件都删除掉

  - 2、根组件app.vue的样式模板清空

  - 3、换上我们自己的全局样式

  - 4、清默认路由与全局状态

- 在assets目录下新建scss目录，创建common.scss做全局样式

```scss
*{
    padding: 0;
    margin: 0;
}

ul,ol{
    list-style: none;
}


#app{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

:root{
    font-size:  calc(100vw / 375 * 100);
}


body{
    font-size: 16px;
}
@media only screen and (min-width:769px)  {
    :root{
        font-size:  calc(768px / 375 * 100);
    }
    #app{
        width: 768px;
        margin: 0 auto;
    }
}


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
}

$primaryColor:#0079FC !default;
$colorMap:(primary:$primaryColor);

@each $key,$value in $colorMap{
    .bg-#{$key}{
        background-color: $value;
    }
    .text-#{$key}{
        color: $value;
    }
}
```

- 导入到入口文件中，作为全局样式使用
- 创建“全屏”盒子组件 PageView.vue

```vue
<template>
    <div class="page-view-box">
        <slot></slot>
    </div>
</template>
<script setup>
</script>

<style scoped lang="scss">
.page-view-box {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
```

- 在main.js入口文件中把全屏黑注册成全局组件

- ```js
  import PageView from './components/PageView.vue'
  app.component("PageView",PageView)
  ```

## 2、制作tab-bar

- 创建home.vue，分成上中下三栏布局

- ```vue
  <template>
      <page-view class="flex-column">
          <div class="title-bar"></div>
          <div class="content-box flex-1"></div>
          <ul class="tab-bar"></ul>
      </page-view>
  </template>
  <script setup>
  </script>
  <style scoped lang="scss"></style>
  ```

  

- 先制作路由部分，在views目录下面分别创建HomeIndex，HomeSearch，HomeNews，My页面组件，然后再路由中分别设置好这些页面对应的路由对象

```js
const routes = [
    {
        path: '/',
        redirect: {
            name: 'index'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        children: [
            {
                path: '/home/index',
                name: 'index',
                component: () => import('@/views/home/HomeIndex.vue')
            },
            {
                path: '/home/search',
                name: 'search',
                component: () => import('@/views/home/HomeSearch.vue')
            },
            {
                path: '/home/news',
                name: 'news',
                component: () => import('@/views/home/HomeNews.vue')
            }
        ]
    },
    {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/My.vue')
    },
];
```

- > 分析：
  >
  > 这里我们根据跳转效果，把home和my设置成一级页面跳转，index，search，news作为home下的二级页面再home页面中作为局部的组件切换跳转
  >
  > 然后把home下的index作为项目首页设置成项目根路径下的重定向跳转
  >
  > **注意：**
  >
  > 现在我们确定了页面组件的层级关系之后就需要开始设置对应的router-view其中一级页面现在又home和my，而一级页面必须要再app.vue根组件中进行渲染，所以我们需要在app.vue中添加router-view负责home与my之间的跳转
  >
  > app.vue
  >
  > ```vue
  > <template>
  >     <router-view></router-view>
  > </template>
  > ```
  >
  > 然后index，search，news作为home下的二级页面，所以，我们你子啊home.vue的content-box部分插入router-view负责index，search，news三个页面在home.vue中的跳转
  >
  > home.vue
  >
  > ```vue
  > <template>
  >     <page-view class="flex-cloumn">
  >         <div class="title-bar"></div>
  >         <div class="content-box flex-1">
  >             <router-view></router-view>
  >         </div>
  >         <ul class="tab-bar"></ul>
  >     </page-view>
  > </template>
  > ```
  >
  > 

- 回到home.vue开始制作tab-bar分布的结构布局与跳转

```vue
<template>


    <ul class="tab-bar flex-row j-s-a">
        <router-link :to="{ name: 'index' }" custom #default="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'text-primary': isActive }">
                <img src="../../assets/icon/home.png" v-show="!isActive" />
                <img src="../../assets/icon/home_action.png" v-show="isActive" />
                <span>外卖</span>
            </li>
        </router-link>
        <router-link :to="{ name: 'search' }" custom #default="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'text-primary': isActive }">
                <img src="../../assets/icon/search.png" v-show="!isActive" />
                <img src="../../assets/icon/search_action.png" v-show="isActive" />
                <span>搜索</span>
            </li>
        </router-link>
        <router-link :to="{ name: 'news' }" custom #default="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'text-primary': isActive }">
                <img src="../../assets/icon/list.png" v-show="!isActive" />
                <img src="../../assets/icon/list_action.png" v-show="isActive" />
                <span>新闻</span>
            </li>
        </router-link>
        <router-link :to="{ name: 'my' }" custom #default="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'text-primary': isActive }">
                <img src="../../assets/icon/user.png" v-show="!isActive" />
                <img src="../../assets/icon/user_action.png" v-show="isActive" />
                <span>我的</span>
            </li>
        </router-link>
    </ul>
</template>
```

- 样式部分

- ```vue
  <style scoped lang="scss">
  .tab-bar {
      border-top: solid 1px #ccc;
      height: .55rem;
      color: #666;
  
      li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: .12rem;
  
          img {
              margin-bottom: .05rem;
              width: .24rem;
          }
      }
  }
  </style>
  ```

- > 分析：
  >
  > 因为这里的图标是png格式，不是字体图标，所以不能直接由color样式来控制高亮效果，所以，这里利用了两张图标通过v-show来显示隐藏替换的方式完成高亮效果的切换

- 至此，目前所有的一级，二级页面的跳转就算完成了

## 3、制作title-bar

- 由于title-bar再home中渲染的时候，每个页面的内容都是不一样的，所以我们可以把title-bar单独做成一个组件进行复用

- 在components目录中创建TitleBar.vue

  ```vue
  <template>
      <div class="title-bar">
          <div class="left-icon"></div>
          <div class="center-title">
              <slot></slot>
          </div>
          <div class="right-icon"></div>
      </div>
  </template>
  ```

- > 分析：
  >
  > 中间的div根据调用页面的不同渲染的文本内容也会不同，所以我们要先预设好插槽，方便后期调用

- 在title-bar的左右两边分别有图标需要渲染，这里我们直接使用elementPlus提供的图标库，elementPlus的图标库是可以独立在elementplus的组件库之外使用的

- 所以我们直接安装图标库

- ```cmd
  npm install @element-plus/icons-vue --save
  ```

- 然后我们通过手动按需导入的方式，导入我们需要使用的图标

- ```vue
   <template>
      <div class="title-bar bg-primary">
          <div class="left-icon">
              <Search style="width:.18rem;margin-top:.11rem" />
          </div>
          <div class="center-title">
              <slot></slot>
          </div>
          <div class="right-icon">
              <User style="width:.18rem;margin-top:.11rem" />
          </div>
      </div>
  </template>
  <script setup>
      import { Search, User } from '@element-plus/icons-vue'
  </script>
  ```

- > 注意：
  >
  > 这里我们在调用elmentplus的图标的时候，不使用el-icon来调用，而是直接使用svg方式调用，因为el-icon是elementplus组件库提供的组件，但是我们这里并没有安装组件库，只安装图标库

- 图标成功引入之后，先完成title-bar的样式布局

```vue

<style lang="scss" scoped>
    .title-bar {
        height: .4rem;
        text-align: center;
        color: #fff;
        line-height: .4rem;

        .left-icon {
            position: absolute;
            left: .1rem;
            top: 0;
        }

        .right-icon {
            position: absolute;
            right: .1rem;
            top: 0;
        }
    }
</style>
```

- 样式完成之后开始制作props用来接收外部传入的数据，用来决定图标的显示隐藏

```vue
<template>
    <div class="title-bar bg-primary">
        <div class="left-icon" v-show="props.showIcon">
            <Search style="width:.18rem;margin-top:.11rem" />
        </div>
        <div class="center-title">
            <slot></slot>
        </div>
        <div class="right-icon" v-show="props.showIcon">
            <User style="width:.18rem;margin-top:.11rem" />
        </div>
    </div>
</template>
<script setup>
    import { Search, User } from '@element-plus/icons-vue';
    const props = defineProps({
        showIcon: {
            type: Boolean,
            default: () => true
        }
    })
</script>

```

- 由于title-bar是一个独立在home中的一个区域，所以是不能同home.vue的routerview中的二级页面切换
- 所以我们直接在home.vue中直接通过v-if配合v-else-if来进行重复调用完成在不同页面中的渲染效果

- home.vue

```vue
<template>
    <page-view class="flex-column">
        <title-bar v-if="route.name == 'index'">外卖</title-bar>
        <title-bar :show-icon="false" v-else-if="route.name ==
'search'">搜索</title-bar>
        <title-bar :show-icon="false" v-else-if="route.name ==
'news'">新闻</title-bar>
        <div class="content-box flex-1">
            <router-view></router-view>
        </div>
        .......
    </page-view>
</template>
<script setup>
    import TitleBar from '@/components/TitleBar.vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
</script>

```

- > 分析：
  >
  > 这里我们使用的判断条件是根据路由来决定的，根据当前跳转的路由来决定渲染哪一个title-bar

## 4、外卖页面制作（index）

- 在HomeIndex.vue中的内容主要有两个部分组成

  - 1、轮播图

  - 2、商家列表

### 4.1、轮播图制作

- 轮播图的实现方式有很多，我们之前使用过的swiper来实现，在很多的ui组件库里面也自带的有轮播组件可以直接调用，也可以自己手写一个

- 这里我们介绍一个叫做vant的ui组件库，与elemntplus不太一样的地方，elementplus主要还是针对PC端开发做后台管理系统的，而vant是专门针对移动端界面开发的ui组件库

- 安装vant

  - ```cmd
    npm i vant --save
    ```

- 然后可以进入官方文档查看做自动导入的配置

- 安装自动导入的配置插件

  - ```cmd
    npm i @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import -D
    ```

- vite.config.js

- ```js
  import vue from '@vitejs/plugin-vue';
  import AutoImport from 'unplugin-auto-import/vite';
  import Components from 'unplugin-vue-components/vite';
  import { VantResolver } from '@vant/auto-import-resolver';
  export default {
      plugins: [
          vue(),
          AutoImport({
              resolvers: [VantResolver()],
          }),
          Components({
              resolvers: [VantResolver()],
          }),
      ],
  };
  ```

- 接下来就可以直接找到swipe组件，导入到HomeIndex组件中使用

```vue

<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
    </van-swipe>
</template>
<script setup>
</script>
<style scoped lang="scss">
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>
```

- 效果正常就说明自导配置成功，接下来根据项目本身的需求，在轮播图中实际轮播的是分类信息，所以我们这里要开始制作请求

### 4.2、axios应用

- 安装axios

- ```cmd
  npm i axios -S
  ```

- 然后我们创建一个uitls目录，在其目录内创建axios拦截设置

- axiosInstance.js

- ```js
  import axios from "axios";
  //创建一个axios拦截器进行配置
  const axiosInstance = axios.create({
      timeout: 5000, //响应时长
      baseURL: "http://127.0.0.1:8900/" //配置服务器地址
  });
  axiosInstance.interceptors.response.use(
      resp => {
          //通过响应拦截其把响应对象中的data作为实际响应结果返回，数据都在
          resp.data中;
          return resp.data;
      },
      error => {
          console.log("请求失败", error);
      }
  );
  export default axiosInstance;
  ```

- 然后我们就可以通过以下方式来发送请求

- ```js
  axiosInstance.get("请求路径")
  axiosInstance.post("请求路径")
  ```

- 接下来在utils目录中创建一个api目录，在该目录下创建一个index.js文件用于统一管理所有的请求

- > 注意：
  >
  > 因为我们现在的项目中使用到的请求接口数据较少，所以我们就直接把所有的请求接口统一到index.js文件中管理，不再继续分类管理

- ```js
  import axiosInstance from "../axiosInstance.js";
  export const getSwiperData = () => axiosInstance.get('/category')
  //getSwiperData 用于请求轮播图中的分类数据
  ```

  

- 然后我们在index.vue中导入该方法测试是否可行

- ```vue
  
  <script setup>
      import { getSwiperData } from '@/utils/api';
      import { onMounted } from 'vue';
      onMounted(async () => {
          console.log(await getSwiperData());
      })
  </script>
  ```

- 能够在控制台正常打印出来数据就表示请求成功了，接下来就是做数据渲染

- > 渲染效果分析：
  >
  > 这里我们看效果可以得到一个结论，每一个轮播项里面会渲染8个分类，也就说，每8个分类就会多一个轮播项
  >
  > 那么，我们可以把响应返回的数据做成一个二维数组，一维中的每个元素表示轮播项，二维中的每个元素表示每个轮播项中的分类信息
  >
  > 所以我们需要把返回的数据做二次处理变成一个二维数组再进行渲染

- 现在我们再HomeIndex中制作一个用于接收数据的响应式数组，并且再挂载之后把数据做成二维数组

- ```vue
  
  <script setup>
      import { getSwiperData } from '@/utils/api';
      import { onMounted, reactive } from 'vue';
      const swiperData = reactive([]);
      onMounted(async () => {
          let results = (await getSwiperData()).list;
          //思考如何实现把results中的数组变成一个二维数组
      })
  </script>
  
  ```

  

### 4.3、商家列表

- 商家列表中的每一项结构布局都是一致的，对于这种情况，我们一般就直接把列表项单独做成一个组件，然后通过列表渲染的方式进行复用
- 所以，新建一个ShopItem.vue制作商家项组件
- html结构

```vue

<template>
    <div class="shop-item flex-row a-c">
        <div class="shop-left">
            <img src="" alt="">
        </div>
        <div class="shop-center flex-1 flex-column">
            <div class="shop-title flex-row a-c">
                <span>品牌</span>
                <h3>每时每刻</h3>
            </div>
            <div class="shop-rate flex-row a-c">
                <div class="rate">
                    <van-rate v-model="value" readonly allow-half size="14px" color="orange" />
                </div>
                <div class="rate-score">{{ value }}</div>
                <div class="sale-count">
                    月销：100单
                </div>
            </div>
            <div class="shop-costs">
                <span>￥18元起送 / 配送费约5元</span>
            </div>
        </div>
        <div class="shop-right flex-column">
            <div class="shop-support">
                <span>包</span>
                <span>包</span>
                <span>包</span>
            </div>
            <div class="shop-server">
                <span>叮当配送</span>
            </div>
        </div>
    </div>
</template>

```

- 样式部分

  ```vue
  \.""
  <style lang="scss" scoped>
      .shop-item {
          height: .8rem;
          padding: .1rem .15rem;
          border-bottom: solid 1px #ccc;
  
          .shop-left {
              width: .8rem;
  
              img {
                  width: 80%;
                  height: 80%;
                  border: solid 1px #000;
              }
          }
  
          .shop-center {
              .shop-title {
                  span {
                      background: yellow;
                      font-weight: bold;
                      padding: 0 .05rem;
                      font-size: .14rem;
                  }
  
                  h3 {
                      font-size: .15rem;
                      margin-left: .05rem;
                  }
              }
  
              .shop-rate {
                  padding: .03rem 0 .12rem 0;
  
                  .sale-count {
                      font-size: .12rem;
                      color: #666;
                      padding-left: .05rem;
                  }
              }
  
              .rate-score {
                  color: #f00;
                  font-size: .14rem;
              }
  
              .shop-costs {
                  font-size: .12rem;
                  color: #666;
              }
          }
  
          .shop-right {
              width: .8rem;
              font-size: .12rem;
              align-items: end;
  
              .shop-support {
                  span {
                      border: solid 1px #666;
                      color: #666;
                      margin-left: .03rem;
                      padding: .01rem;
                  }
              }
  
              .shop-server {
                  margin: .03rem 0 0 .03rem;
  
                  span {
                      border: solid 1px #00A16A;
                      color: #00A16A;
                      padding: .01rem;
                  }
              }
          }
      }
  </style>
  
  ```

  - js部分，由于使用vant的rating  组件，所以需要准备一些基础数据

- ```vue
  <script setup>
      import {ref} from 'vue';
      const value = ref(3.3);
  </script>
  ```


## 5、pinia全局状态管理应用

- 以上我们完成了外卖页面的基本制作，接下来我们做一些优化，首先，我们在渲染图片的时候会手动拼接上本地服务器的地址，后期一旦上线以后，我们需要把所有的拼接过服务器地址的地方全部进行替换

- 我们为了方便后期替换，我们可以把服务器地址做成一个全局状态，后期，我们只需要替换掉全局状态中的值就可以完成对所有调用该服务器地址状态值的替换

- ```js
  import { defineStore } from 'pinia';
  export const serverAddress = defineStore('serverAddress', {
      state: () => {
          return {
              baseURL: "http://127.0.0.1:8900/"
          };
      }
  })
  ```

- > 注意：
  >
  > 部分数据中的路径地址，有的是绝对，有的是相对，我们需要统一，不然做地址拼接的时候会多或少一个 / 导致路径错误

- 然后我们在HomeIndex和ShopItem两个组件中导入全局状态实例，把原来手动拼接的地址替换成baseURL

## 6、loading动画

- 在每次发送请求到返回响应的中间时间段，由于组件没有数据可供渲染会导致页面空白，为了提高用户体验，一般我们会在此期间提供一个反馈信息
- 我们可以直接使用vant提供的loading组件，也可以自己封装一个loading组件
- 这里采用一个混合的写法，对vant的Loading组件做二次封装编辑成自己的组件
- 在components目录下新建一个Loading组件

- > 由于vant自带的loading组件没有全屏遮罩层，所以我们自己对vant的loading组件做二次封装，添加一个全屏遮罩层

- ```vue
  <template>
      <div class="loading flex-row a-c j-c">
          <van-loading size="40px" vertical color="deepskyblue">加载
              中...</van-loading>
      </div>
  </template>
  <script setup>
  </script>
  <style scoped lang="scss">
      .loading {
          background: rgba(255, 255, 255, 0.9);
          position: fixed;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
      }
  </style>
  ```

  

- 然后把该组件注册成全局组件

- main.js

- ```js
  import Loading from './components/Loading.vue';
  const app = createApp(App);
  app.component("Loading", Loading)
  ```

  

- 在HomeIndex组件中调用，并设置一个布尔值配合v-show来控制Loading的显示隐藏

- ```vue
  <template>
      ......
      <Loading v-show="showLoading" />
  </template>
  <script setup>
  ......
      const showLoading = ref(false);
  </script>
  
  ```

  - 接下来，我们需要把HomeIndex中使用到的所有的请求方法整合一下，进行统一执行，从而方便设置Loading动画的显示隐藏

  - ```js
    const indexInit = () => {
        renderSwiperData();
        getShopList();
    };
    const showLoading = ref(false);
    onMounted(() => {
        showLoading.value = true;
        indexInit();
        showLoading.value = false;
    })
    ```

    

- > 分析：
  >
  > 这里我们把商家列表和分类信息的请求方法打包到了一个indexInit方法中执行，当该方法开始执行显示Loading，当该方法结束隐藏Loading
  >
  > 由于这里是本地请求，不太可能看到Loading的效果，所以我们可以通过定时器人为执行要给请求时长，如下
  >
  > ```js
  > onMounted(() => {
  >     showLoading.value = true;
  >     setTimeout(() => {
  >         indexInit();
  >         showLoading.value = false;
  >     }, 3000);
  > })
  > ```
  >
  > 

# 仿饿了么（小叮当）简易外卖程序 -- 登录

- 这里的登录页面分成两种登录方式，分别是短信登录和密码登录，然后通过选项卡切换的方式让用户自由选择登录方式

- 所以，先完成登录方式的切换

## 1、制作登录方式的切换

- 在vue中实现选项卡切换时非常方便简单的，基本思路就是通过一个响应式数据的值的修改配合v-if或者v-show来实现显示隐藏的切换

  - > 同时，在My.vue中还有一个返回上一个页面的按钮
    >
    > 我们先把这个按钮做了
    >
    > My.vue
    >
    > ```vue
    > 
    > <template>
    >     <page-view>
    >         <div class="go-back flex-row a-c">
    >             <van-icon name="arrow-left" size=".25rem" color="#666" @click="router.back()" />
    >         </div>
    >     </page-view>
    > </template>
    > <script setup>
    >     import { useRouter } from 'vue-router';
    >     const router = useRouter();
    > </script>
    > <style scoped lang="scss">
    >     .go-back {
    >         height: .7rem;
    >         padding-left: .2rem;
    >     }
    > </style>
    > ```
    >
    > 

- 然后，开始正式制作tab切换部分

- 先准备一个响应式数据用于切换显示隐藏

- ```vue
  <script setup>
      import { ref } from 'vue';
      const tabChange = ref(1);
  </script>
  ```

  - 这里准备一个数字1，然后我们通过点击事件给这个tabChange重新赋值，让其在1与2之间来回切换来实现两种登录方式的切换

  - ```vue
    <template>
        <page-view class="flex-column">
            <div class="go-back flex-row a-c">
                <van-icon name="arrow-left" size=".25rem" color="#666" @click="router.back()" />
            </div>
            <div class="login-form flex-1 flex-column a-c">
                <h2>小叮当外卖</h2>
                <ul class="login-tab flex-row">
                    <li @click="tabChange = 1">短信登录</li>
                    <li @click="tabChange = 2">密码登录</li>
                </ul>
                <div class="message-login" v-show="tabChange ==
    1">1</div>
                <div class="password-login" v-show="tabChange ==
    2">2</div>
            </div>
        </page-view>
    </template>
    ```

  - 样式部分

  - ```vue
    
    <style scoped lang="scss">
        .go-back {
            height: .7rem;
            padding-left: .2rem;
        }
    
        .login-form {
            h2 {
                font-size: .38rem;
                color: #4EB2FF;
                padding: .4rem 0 .5rem 0;
            }
    
            .login-tab {
                width: 60%;
    
                li {
                    flex: 1;
                    text-align: center;
                }
            }
        }
    </style>
    
    ```

    

## 2、短信登录

- 当切换效果完成之后，我们就先开始短信登录部分的制作，先把布局结构制作完毕
- html部分

```vue
<template>
    <page-view class="flex-column">
        ......
        <div class="login-form flex-1 flex-column a-c">
            <h2>小叮当外卖</h2>
            <ul class="login-tab flex-row">
                <li @click="tabChange = 1"><span :class="
{'active':tabChange == '1'}">短信登录</span></li>
                <li @click="tabChange = 2"><span :class="
{'active':tabChange == '2'}">密码登录</span></li>
            </ul>
            <div class="message-login" v-show="tabChange == 1">
                <input type="text" class="login-user" placeholder="手机号">
                <input type="text" class="login-pass" placeholder="验证码">
                <p>温馨提示：未注册小叮当外卖的手机号，登录时将自动注册，且
                    代表已经同意</p>
                <button type="button">登录</button>
                <div class="yzm flex-row a-c">获取验证码</div>
            </div>
            <div class="password-login" v-show="tabChange ==
2">2</div>
        </div>
    </page-view>
</template>
```

- 样式部分

```vue

<style scoped lang="scss">
    ...... .login-form {
        h2 {
            font-size: .38rem;
            color: #4EB2FF;
            padding: .4rem 0 .5rem 0;
        }

        .login-tab {
            width: 60%;

            li {
                flex: 1;
                text-align: center;
            }
        }

        .message-login {
            padding-top: .15rem;
            position: relative;

            input {
                box-sizing: border-box;
                width: 80%;
                margin: .1rem 10%;
                height: .44rem;
                border-radius: 5px;
                border: solid 1px #ccc;
                padding: 0 50% 0 5%;
            }

            p {
                font-size: .14rem;
                line-height: .22rem;
                color: #999;
                padding: 0 10%;
                margin-bottom: .3rem;
            }

            button {
                background: #4CD96F;
                border: none;
                width: 80%;
                margin: 0 10%;
                height: .4rem;
                border-radius: 6px;
                color: #fff;
            }

            .yzm {
                position: absolute;
                top: .25rem;
                height: .44rem;
                right: 15%;
                font-size: .14rem;
                color: #4EB2FF;
            }
        }
    }
</style>
```

- 完成之后我们可以开始制作表单数据校验

- 这里我们先制作一个用于双向绑定到input表单的响应式对象来实时获取用户在表单中输入的内容

- ```js
  const loginInfo = reactive({
      teil:"",
      mark1:""
  })
  ```

- 然后我们通过v-model实现双向绑定

- ```vue
  <input type="text" class="login-user" placeholder="手机号" v-model="loginInfo.teil">
  <input type="text" class="login-pass" placeholder="验证码" v-model="loginInfo.mark1">
  ```

- > 注意：
  >
  > 这里的响应式对象中的属性名是与后端接收的属性名一致的，方便结构取值

- 然后我们开始制作验证手机号的方法，并且在验证通过是发送获取短信验证码的请求

- 先在utils的api目录的index.js中编写用于请求验证码的方法

- ```js
  export const yzm = () => axiosInstance.get('/get_tell_mark')
  ```

- 然后导入到my组件中，根据验证手机号的结构来判断是否发送该请求

- ```js
  const regPhone = async () => {
      if (loginInfo.teil[0] == 1 && loginInfo.teil.length == 11 && String(Number(loginInfo.
  teil)) != "NaN") {
          loginInfo.mark1 = (await yzm()).code;
      }
  }
  ```

  

- 然后把该方法通过点击事件绑定到获取验证码的按钮上

- ```vue
  <div class="yzm flex-row a-c" @click="regPhone">获取验证码</div>
  ```

- 当手机号验证不通过的时候，不发送验证码请求，同时反馈错误信息

- 所以我们在regPhone的方法中加入else的部分

- 这里的错误信息我们使用vant组件库提供的消息提示来完成

- > vant中提供的消息提示的调用方式有两种
  >
  > 1. 直接通过辅助函数的方式调用，需要导入vant的样式文件
  > 2. 通过消息组件调用，根据true / false来处理消息的显示隐藏
  >
  > 这里我们使用第二种，也可以使用第一种，但是注意要导入样式

```js
const show = ref(false);
const regPhone = async () => {
    if (loginInfo.teil[0] == 1 && loginInfo.teil.length == 11 &&
        String(Number(loginInfo.teil)) != "NaN") {
        loginInfo.mark1 = (await yzm()).code;
    } else {
        show.value = true;
        setTimeout(() => {
            show.value = false;
        }, 2000);
    }
}
```

- 然后在template中插入消息提示组件

- ```vue
  <van-notify v-model:show="show" type="danger">
      <span>手机格式不正确</span>
  </van-notify>
  ```


- > 分析：
  >
  > 这里我们直接把响应的验证码作为验证码输入框的value值进行输出，实现了一个类似于自动填充验证码的效果

- 现在，当我们通过手机号获取验证码之后在30秒内无法再继续发送获取验证码的请求，并执行一个30秒的倒数

- > 这里我们把yzm的标签改成button，通过button的disabled属性来实现倒数期间的按钮禁用，从而不会出现倒数期间点击之后再次触发获取验证码的情况
  >
  > 注意：
  >
  > 因为把yzm改成了button标签，之前的样式中登录按钮直接使用的button标签名作为选择器，为了避免样式冲突，给登录按钮加一个类名 .login-btn作为区分

- ```js
  const flag = ref(false); //用来控制disabled属性启停按钮禁用
  const countNum = ref(31); //倒计时用的响应式数值
  const countDown = () => {
      countNum.value--;
      if (countNum.value >= 0) {
          setTimeout(countDown, 1000);
      } else {
          countNum.value = 31;
          flag.value = false;
      }
  }
  ```

- > 分析：这里我们使用递归配合定时实现了间隔1秒执行一次的递减运算，每次递减运算的响应式结果会实时渲染到页面中，对应的获取验证码部分的标签结构也做如下修改

- ```vue
  <button class="yzm flex-row a-c" @click="regPhone" :disabled="flag">
      <span v-if="countNum == 31">获取验证码</span>
      <span v-else>{{ countNum }}秒</span>
  </button>
  ```

  

- > 分析：
  >
  > 这里根据countNum做一个判断，决定渲染在按钮当中的内容

- 接下来就可以制作短信登录的请求

- 在api目录中制作发送短信请求的方法

- ```js
  export const messageLogin = ({ tell, mark1 }) =>
  axiosInstance.post('/login_tell', {
      tell,
      mark1
  })
  ```

- 然后导入到My.vue开始制作登录请求的方法

- ```js
  import { yzm, messageLogin } from '@/utils/api';
  //......
  const messageLoginCheck = (loginInfo) => {
      messageLogin(loginInfo);
  }
  ```

在登录按钮上绑定该方法

```vue
<!-- 把表单中输入的信息loginInfo作为实参传入到登录请求中 -->
<button type="button" class="login-btn" @click="messageLoginCheck(loginInfo)">登录</button>
```

- 这样其实可以直接登录成功的

- 但是，这里我们多做一些考虑，比如：
  - 情况1：当用户正常获取到验证码之后，不小心输出错误，我们需要提示用户验证码错误
  - 情况2：真实场景下，当验证码过期了，我们也需要提示用户，让其重新获取验证码
- 基于以上的情况，我们可以做如下处理：
  - 先直接声明一个变量不需要做成响应式，单纯就是为记录，当下次成功获取验证的手机号与正码本身的，如果验证码在有效期内，只要手机号与对应的验证码没有问题就可以正常登录

```js
//声明一个checkLoginInfo用于记录当此验证码有效期内的验证码和手机号，不需要做成响应式;
let checkLoginInfo = {
    teil: "",
    mark1: ""
};
//在获取验证码的方法中，添加一句话，将当此获取的验证码与手机号记录到
checkLoginInfo当中;
const regPhone = async () => {
    if (loginInfo.teil[0] == 1 && loginInfo.teil.length == 11 &&
        String(Number(loginInfo.teil)) != "NaN") {
        flag.value = true;
        loginInfo.mark1 = (await yzm()).code;
        checkLoginInfo = { ...loginInfo }; //新增这句用来记录当此获取的手
        机号与验证码;
        countDown();
    } else {
        showNotify({ type: 'danger', message: '手机格式不正确' });
    }
};
//在获取验证码之后的倒计时方法中，当倒计时完毕时把checkLoginInfo中的mark1赋值为0，表示验证码过期;
const countDown = () => {
    countNum.value--;
    if (countNum.value >= 0) {
        setTimeout(countDown, 1000);
    } else {
        countNum.value = 31;
        flag.value = false;
        checkLoginInfo.mark1 = 0;
    }
};
//在发送登录请求的方法中添加一个判断，这个判断有三个可执行方向
//1、在验证码有效期内，判断表单中输入的手机号与验证码是否与checkLoginInfo中的记录一致，如果一致直接发送登录请求;
//2、判断checkLoginInfo中的mark1的值是否为0，如果为0就表示验证码已经过期需要重新获取;
//3、表单中的手机号与验证码与checkLoginInfo中记录的不一致，提示用户验证码或手机号错误;
const messageLoginCheck = async (loginInfo) => {
    if (checkLoginInfo.teil == loginInfo.teil &&
        checkLoginInfo.mark1 == loginInfo.mark1) {
        await messageLogin(loginInfo);
    } else if (checkLoginInfo.mark1 == 0) {
        showNotify({
            type: 'warning', message: '验证码已经过期，请重新获取'
        });
    } else {
        showNotify({ type: 'danger', message: '手机号或正码错误' });
    }
}

```

- 最后，当登录成功之后我们需要将登录成功之后返回的用户信息和token作为全局状态保存，从而将登录状态保持住，并且在后续的请求中可以携带token作为请求头，让需要登录权限才能发送的请求可以成功发送，让需要登录之后才能跳转的页面可以跳转

- > 扩展：
  >
  > 1、我们可以在登录请求发送的过程中，将登录按钮做成禁用状态，避免用户手贱疯狂按登录按钮
  >
  > 2、由于是唯一账户，所以返回的只有token，所以全局状态中只需要记录token

- 在pinia实例中添加一个userToken状态

- ```js
  import { defineStore } from 'pinia';
  export const serverAddress = defineStore('serverAddress', {
      state: () => {
          return {
              baseURL: "http://127.0.0.1:8900/",
              userToken: null
          };
      }
  })
  ```

- 在my.vue组件中导入，并在登录方法添加对应的token赋值操作

- ```js
   const messageLoginCheck = async (loginInfo) => {
          if (checkLoginInfo.teil == loginInfo.teil && checkLoginInfo.mark1 == loginInfo.mark1) {
              store.userToken = (await messageLogin(loginInfo)).token;
          } else if (checkLoginInfo.mark1 == 0) {
              showNotify({
                  type: 'warning', message: '验证码已经过期，请重新获取'
              });
          } else {
              showNotify({ type: 'danger', message: '手机号或正码错误' });
          }
      }
  ```

- 在my组件中订阅全局状态，实现token的本地缓存

- ```js
  store.$subscribe((mutations,state) => {
      localStorage.setItem('userToken',state.userToken);
  })
  ```

- 最后，登录成功之后跳转到个人中心页面

- 在home目录下新建HomeProfile.vue ，制作路由当登录成功之后跳转到该页面

- > 注意：
  >
  > 在home的tab-bar中，我的选项本来应该是跳转到HomeProfile上，也就是说HomeProfile本来应该是home下的二级页面
  >
  > 但是因为Profile中渲染的数据属于个人数据，需要登录权限，所以，正常的逻辑应该是我们点击我的选项之后，我们需要设置一个路由前置守卫，判断如果跳转的是Profile页面，先判断是否登录，如果已经登录正常跳转，如果没有登录直接重定向到登录页面

- 在入口文件main.js中制作路由守卫

- > 在开始编写路由守卫之前，我们对文件命名做一些调整，这样可以更好的表意
  >
  > 1、把my组件更名为login，表示登录页面，在views目录下新建一个login目录用于存放login组件，而原本的my应该是个人中心也弥漫，只因为没有登录所以会被重定向到登录而页面
  >
  > 2、在home目录下新建HomeProfile组件作为个人中心页面使用，之前的my目录就可以删除掉
  >
  > 3、当以上两项修改完毕之后，记得要修改路由，还有home中detab-bar部分我的选项的跳转路径

- 基于重新修改的结果

- ```js
  router.beforeEach((to,from) => {
      if(!localStorage.userToken && to.name !== 'login'){
          return {name:'login'}
      }
  })
  ```

- > 分析：
  >
  > 基于上面的全局前置守卫，当本地缓存中没有token同时跳转的页面也不是login页面的时候，就表示在接下来你要跳转的非login页面，是在没有登录情况下不能进入的页面，所以会重定向到login页面

- 但是，以上的设置可以应该在一些后台管理系统当中，但是现在我们开发的并不是专门面向管理员的后台系统，而是一个面向一般大众用户开发的程序，所以，像上面的这种导航守卫的设置就会有问题，因为部分页面我们是可以允许用户在不登录的情况下也是可以跳转浏览的

- 这个时候，我们就需要做一个区分，哪些页面是需要登录之后才能跳转，哪些不是不需要的，这个时候，我们可以在路由上面设置个meta属性用于区别

- 打开router目录中的index.js给路由对象配置meta

```js


        const routes = [{
            path: '/',
            redirect: {
                name: 'index'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/Home.vue'),
            children: [
                {
                    path: '/home/index',
                    name: 'index',
                    component: () => import('@/views/home/HomeIndex.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: '/home/search',
                    name: 'search',
                    component: () => import('@/views/home/HomeSearch.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: '/home/news',
                    name: 'news',
                    component: () => import('@/views/home/HomeNews.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: '/home/profile',
                    name: 'profile',
                    component: () => import('@/views/home/HomeProfile.vue'),
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/Login.vue'),
            meta: {
                requiresAuth: false
            }
        },
        ]
```

- > 分析：
  >
  > 这里我们给路由添加一个meta路由元信息，其中设置了一个叫做requiresAuth的属性，meta中的路由元信息是可以用户自定义的，也就是说，这个我们自定定义的requiresAuth属性，根据它的值来区分哪些是需要登录跳转，哪些不需要

- 基于上面的配置，我们对路由前置守卫进行修改

- ```js
  router.beforeEach((to, from) => {
      if (!localStorage.userToken && to.name !== 'login' && to.meta.requiresAuth) {
          return { name: 'login' };
      }
  })
  ```

  

## 3、密码登录

- 密码登录与短信登录其实差别不大，这里，我们对比之前制作的短信登录最大的区别在于，密码登录里面我们设置了一个图形验证码

- 制作模板：

- ```html
  ......
  <div class="password-login" v-show="tabChange == 2">
      <input type="text" placeholder="账号">
      <input type="password" placeholder="密码">
      <input type="text" placeholder="验证码">
      <button type="button" class="login-btn">登录</button>
  </div>
  ......
  ```

- 样式部分：

  - 这里我们直接利用之前短信登录中写好的input和button样式

  - 直接在之前写好的scss嵌套结构上使用分组选择器把password-login类名与之前的message-login分为一组即可

  - ```scss
    .message-login,.password-login{
        .......
    }
    ```

- 图形验证码我们使用一个插件GVeirfy.js

- 该插件原本的作用是在前端使用canvas绘制一个图形验证码，其功能内部自带了可以随机生成4未验证码的操作，这里，我们对其做了一些修改，让其生成的图形验证码的内容是根据后端返回的数据来决定的

- 作为第三方工具类型存放在utils目录下，然后导入到login.vue中

- ```js
  import { GVerify } from '@/utils/GVeirfy';
  ```

- 其导入的是一个构造函数，通过实例化一个图形验证码对象来生成一个canvas绘制验证码

- 在实例化过程中可以传入一个配置对象来调整配置验证码的相关参数

- login.vue

- ```js
  const GVoption = {
      id: 'v-container',
      canvasId: 'verifyCanvas',
      width: '100',
      height: '48',
      code: ''
  };
  onMounted(() => {
      let yzmObj = new GVerify(GVoption);
      yzmObj.refresh();
  })
  ```

- 样式部分：

  ```scss
  .message-login,
  .password-login {
      padding-top: .15rem;
      position: relative;
  
      .pic-yzm {
          position: absolute;
          right: 10%;
          top: 1.52rem;
      }
  
      .......
  }
  ```

  - 制作获取图形验证码的请求，在api目录下的index.js

  - ```js
    export const yzmCode = () => axiosInstance.get('/get_code')
    ```

  - 导入到login.vue中制作请求方法

  - ```js
    let yzmObj = null;
    const getCode = async () => {
        const GVoption = {
            id: 'v-container',
            canvasId: 'verifyCanvas',
            width: '100',
            height: '48',
            code: ''
        };
        yzmObj = new GVerify(GVoption, async () => {
            return await yzmCode();
        });
        await yzmObj.refresh();
    };
    onMounted(() => {
        getCode();
    })
    ```

  - > 分析：
    >
    > 这里我们需要把创建验证码对象的过程放到发送验证码方法的体内，在获取到验证码之后才可以开始绘制，从而让验证码对象每次创建的时候可以正确获取到验证码

- 验证码搞定之后，我们就可以开始在api目录中制作密码登录请求

- ```js
  export const pwdLogin = ({ username, password, mark2 }) =>
      axiosInstance.post('/login_pwd', {
          username,
          password,
          mark2
      })
  ```

- 然后导入到login组件中制作登录方法与相关配套设置

```js
let yzmObj = null; //声明yzmObj用来接收new出来的验证码对象
let picYzm = ''; //声明picYzm用于获取在getCode方法体内获取的后端响应
的验证码;
const getCode = async () => {
    //......
    //将getCode方法体内获取的验证码赋值给picYzm，方便跨域调用
    picYzm = await yzmObj.refresh();
};
//由于getCode方法只会在组件挂载的时候执行一次，然后刷新的验证码无法二次赋值给 picYzm用于登录验证，所以专门再新建一个resetCode方法用于刷新验证码的时同将刷新后的验证码赋值给picYzm;
const resetCode = async () => {
    picYzm = await yzmObj.refresh();
};
//声明一个响应式对象pwdLoginInfo，通过v-model绑定到表单中用于实时获取再登录
表单中输入的数据;
const pwdLoginInfo = reactive({
    username: '',
    password: '',
    mark2: ''
});
//声明pwdLoginCheck方法，用于发送密码登录请求
const pwdLoginCheck = async (pwdLoginInfo) => {
    //因为账号密码是固定的，所以这里只校验了验证码
    if (picYzm == pwdLoginInfo.mark2) {
        store.userToken = (await pwdLogin(pwdLoginInfo)).token;
    } else {
        showNotify({ type: 'danger', message: '验证码不正确' });
    }
};
onMounted(() => {
    getCode();
})
```

- 在pwdLoginInfo与pwdLoginCheck 绑定到对应的标签上

- ```html
  <input type="text" placeholder="账号" v-model="pwdLoginInfo.username">
  <input type="password" placeholder="密码" v-model="pwdLoginInfo.password">
  <input type="text" placeholder="验证码" v-model="pwdLoginInfo.mark2">
  <button type="button" class="login-btn" @touchstart="pwdLoginCheck(pwdLoginInfo)">登录</button>
  <div id="v-container" class="pic-yzm" @touchstart="resetCode"></div>
  ```

  

- 以上两种登录方式就基本制作完毕了，最后在两种登录方法上添加一句编程式导航，实现登录成功后自动跳转即可

- 一般来说，从哪个页面跳转到登录页面，当成功成功之后就再返回哪个页面，所以我们可以再pwdLoginCheck和messageLoginCheck方法的if判断中添加路由管理对象的back方法即可

- ```js
  router.back();
  ```

  