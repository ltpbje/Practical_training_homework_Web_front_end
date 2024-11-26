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