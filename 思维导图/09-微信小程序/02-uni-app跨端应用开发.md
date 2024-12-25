# uni-app跨端应用开发

- > uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发
  >
  > 布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/
  >
  > 飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。

## 1、跨端开发的背景

- > 现在的前端开发并不像以前所说的是单村的再浏览器中运行的web前端，在当下的
  >
  > 情况下，各种层出不穷的平台都又自己的一套开发规范与API，甚至还有自己独立的
  >
  > 开发与语言

- > 比如：
  >
  > IOS原生开发：Swift，Objective-C，C ......
  >
  > Android原生开发：kotlin，rust，java ......
  >
  > 各种小程序：虽然基本都是以JavaScript作为基础，但是各家小程序都又自
  >
  > 己的私有化配置

- > 这个时候我们开发的应用为了更多更好的覆盖更多的用户，就需要针对不同的平台
  >
  > 编写专门的版本，这样极大的增加了开发成本

- > 而uni-app则是一个可以事先跨端开发的前端框架，通过一套代码，就可以是短线不
  >
  > 同平台的发布

## 2、uni-app项目创建

- > uni-app的项目创建十分简单，由于uni-app与Hbuilder同属Dcloude团队开发，所
  >
  > 以i我们可以直接使用Hbuilder创建一个uni-app项目，当然也可以使用其它编译器
  >
  > 通过脚手架命令创建也可以

- 创建好之后，我们简单认识一下工程目录
- pages：页面组件存放的目录
- static：存放本地静态资源的目录
- App.vue：应用组件，用来配置项目的全局样式及监听，应用生命周期
- pages.json：配置页面路由，导航条，选项卡等页面类信息
- manifest.json：配置应用名称，AppId，logo，版本信息等打包信息uni.scss 内置的常用样式变量

- > uni.promisify.adaptor.js ：将微信小程序的异步API转换为Promise对象的形式的辅
  >
  > 助工具

- > uni-app中使用Promise来处理异步请求，但是微信小程序的API并不支持
  >
  > Promise，所以需要将其转换成Promise的形式，通过该文件，可以在uni-app
  >
  > 中更加方便的使用Promise和 async/await 等异步编程

## 3、配置小程序模拟器

- > 当项目创建好之后，如果你是第一次在Hbuilder上进行小程序开发，可以配置小程
  >
  > 序模拟器，其实，所以的小程序模拟器就是通过Hbuilder将uni-app中编写的代码转
  >
  > 义到对应的小程序开发工具中运行

- 配置流程：
- 1、点击Hbuilder菜单栏中的运行选项
- 2、在下拉从菜单中选择运行到小程序模拟器
- 3、在弹出的窗口中设置对应小程序开发工具的安装启动路径即可

- > 提示：
  >
  > 如果配置好之后启动小程序模拟器失败，在开发工具的安全设置里面把服
  >
  > 务端口开启
  >
  > 第一次开启还需要你手动确认信任该项目

## 4、uni-app新建页面

- > 当完成以上配置之后，我们可以同Hbuilder直接新建一个由Hbuilder配置好的带有
  >
  > 基础结构的页面组件

- > 新建页面的时候，Hbuilder为我们提供了很多常用的欧美版，我们可以根据自己需
  >
  > 求选择，但是提供的模板中都是optionAPI的语法风格

- 现在我们可以创建自定义模板，从而在后期创建页面的时候直接选择使用

- 在窗口下方法点击自定义模板，然后将模板文件直接拷贝到弹出的文件目录中即可

## 5、uni-app常用组件

- 在uni-app中组件分为以下几种：

  - **内置组件**：uni-app框架中自带的组件

  - > **扩展组件（uni-ui）**：uni-ui是DCloud提供的一个跨端UI库，它是基于vue的组
    >
    > 件，flex布局，使用时需要安装，也可以在创建项目的时候选择一个基于uni-ui
    >
    > 的模板

  - > **小程序自定义组件**：每家小程序都由自己的组件规范，可以基于某家小程序自
    >
    > 己的规范来创建组件，但是无法全端兼容

- > 以上三种组件，除了小程序自定义组件之外，内置组件和扩展组件都是基于vue
  >
  > 实现的组件
  >
  > **注意：**
  >
  > 由于uni-app是跨端框架，如果我们基于uni-app开发的程序需要兼容小程序
  >
  > 端，就不能使用html提供的原生标签，因为小程序中html原生标签不起作用
  >
  > **而当前阶段，我们会使用uni-app进行开发主要还是为了跨端适配各家的小程序**

### 5.1、view组件

- > view组件类似于div标签的组件，主要用于页面结构，而作为组件自然可以方便快捷
  >
  > 实现比原生div更加丰富的功能

- > 举例：
  >
  > 由于uni-app的跨端适配主要是针对的移动端，而在移动端中式没有鼠标hover事
  >
  > 件，取而代之的式一个按下时的状态，所以我们可以在view上面使用hover-class属
  >
  > 性来完成

- ```vue
  <template>
      <view class="content">
          <view class="box" hover-class="box-hover" hover-start-time="0" hover-stay-time="0"></view>
      </view>
  </template>
  <script>
  </script>
  <style scoped>
  .box {
      width: 200rpx;
      height: 200rpx;
      background: #ccc;
  }
  
  .box-hover {
      background: #f00;
  }
  </style>
  ```

- > 分析：
  >
  > hover-class：按下后的样式
  >
  > hover-start-time：按下后延迟多久才会显示按下后的样式，单位毫秒
  >
  > hover-stay-time：手松开后延迟多久才取消按下后的样式，单位毫秒

### 5.2、text组件

- > 文本组件，主要用于包裹内容，我们在实际使用中，可以把它当成式span标签来使
  >
  > 用，起本身由一个特点，如果我们想让文本内容可以被选中，必须使用text组件包裹

- ```vue
  <template>
      <view class="content">
          <view class="box" hover-class="box-hover" hover-start-time="0" hover-stay-time="0">我是内容1</view>
          <text selectable="true">我是内容2</text>
      </view>
  </template>
  ```

- > 分析：
  >
  > selectable属性可以让其内部内容被选中，其它可以配置的属性于平台兼容可以
  >
  > 查看官方文档

### 5.3、scroll-view组件

- 可滚动视图区域。用于区域滚动

- ```vue
  <template>
      <view class="content">
          <scroll-view scroll-y="true" class="scroll-box">
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
              <view class="box">1</view>
          </scroll-view>
      </view>
  </template>
  <script>
  </script>
  <style lang="scss" scoped>
  .scroll-box {
      width: 100vw;
      height: 100vh;
  
      .box {
          height: 100px;
          background: #f00;
          margin: 10px;
      }
  }
  </style>
  ```

  

- 改成横向滚动

  ```vue
  <template>
      <view class="content">
          <scroll-view scroll-x="true" class="scroll-box">
              <view class="flex">
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
                  <view class="box">1</view>
              </view>
          </scroll-view>
  
      </view>
  </template>
  <script>
  </script>
  <style lang="scss" scoped>
  .scroll-box {
      width: 100vw;
      height: 100vh;
  
      .flex {
          display: flex;
          width: 800px;
  
          .box {
              height: 100px;
              background: #f00;
              margin: 10px;
              flex: 1;
          }
      }
  }
  </style>
  ```

  

### 5.4、swiper组件

- 滑块视图容器。

- 一般用于左右滑动或上下滑动，比如banner轮播图。

- ```vue
  <swiper :indicator-dots="true" autoplay :interval="3000" circular :duration="1000">
      <swiper-item>1111</swiper-item>
      <swiper-item>2222</swiper-item>
      <swiper-item>3333</swiper-item>
  </swiper>
  ```

  

### 5.5、image组件

- > image组件作为媒体组件可以引入一个图片在组件中渲染

- ```vue
  <image src="../static/logo.png" mode="aspectFit"></image>
  ```

### 5.6、navigator组件

- navigator组件于a标签作用一致，可以实现页面跳转

- > 注意：
  >
  > 只能跳转本地页面，目标页面必须要在pages.json中注册

- ```vue
  <navigator url="/pages/demo/demo" open-type="reLaunch">跳转</navigator>
  ```

- > 分析：
  >
  > url：跳转地址，不要带.vue扩展名
  >
  > open-type：跳转方式设置，具体可以看官方文档

### 5.8、关于表单组件

- > uni-app框架中内置表单组件使用起来跟elementPlus和vant基本差不多，这里不专
  >
  > 门做说明，但是又一个情况需要注意，一个表单组件在编译v成不同端上渲染的时候
  >
  > 样式效果会不统一

- > 举例：button组件
  >
  > 比如当button组件的type为primary的时候，在H5中按钮为蓝色，但是在微信里面
  >
  > 是绿色，会出现效果不统一的情况，这里我们可以使用uni-app第三方UI库来结局

## 6、uni-app中的生命周期

- > 我们知道uni-app是一个基于vue开发的跨端框架，其内部创建的组件其实就是一个
  >
  > vue组件，所以，正常来讲我们之前在vue中学习生命周期在uni-app中都是可用的
  >
  > 
  >
  > 但是，如果要 考虑跨端适配的问题，vue中的部分生命周期在uni-app中对于小程序
  >
  > 来讲就不适配兼容了，在官网文档中是有说明的

- > 在小程序中不支持的vue生命周期
  >
  > onBeforeUpdate，onUpdated，onActivated，onDectivated

- 在uni-app中生命周期被分为个部分：
- **应用生命周期：**只能在app.vue中作用
- https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle
- **页面生命周期：**对应在pages目录中创建的页面组件使用
- https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle
- **组件生命周期：**对应在components目录中创建的自定义组件作用
- https://uniapp.dcloud.net.cn/tutorial/page.html#componentlifecycle
- 三种生命周期函数，最好不要混用，因为可能无法触发
- 举例：

```vue
<template>
    <view>
        content-box
    </view>
</template>
<script>
export default {
    name: "content-box",
    data() {
        return {
        };
    },
    mounted() {
        console.log("mounted");
    },
    created() {
        console.log("created");
    },
    onReady() {
        console.log("onReady");
    },
    onInit() {
        console.log("onInit");
    },
    onLoad() {
        console.log("onLoad");
    },
    onShow() {
        console.log("onShow");
    }
};
</script>
```

- > 执行之后，我们会发现，上面的生命周期钩子函数只有created和mounted触发
  >
  > 了，因为除开这两个其它都是页面和应用生命周期函数
  >
  > 这里我们专门介绍几个生命周期函数

### 6.1、onLoad

- > onLoad的作用我们可以通过uni-app官方文档中提供的生命周期流程图中看到，其
  >
  > 作用于created一样，而我们之前学习中就知道created中我们是已经可以开始操作
  >
  > 数据了，但是，onLoad有一个特别的操作，就是可以在回调函数中调出地址栏传递
  >
  > 的参数

- 举例：

- index.vue

- ```vue
  <template>
      <view class="content">
          <view>{{ userName }}</view>
          <button @click="goTo">按钮</button>
      </view>
  </template>
  <script setup>
  import { ref } from 'vue';
  const userName = ref("张三");
  const goTo = () => {
      uni.navigateTo({
          url: "/pages/demo/demo?userName=" + userName.value
      });
  };
  </script>
  ```

  - demo.vue

  - ```vue
    <template>
        <view>
            name:{{ userName }}
        </view>
    </template>
    <script setup>
    import { onLoad } from "@dcloudio/uni-app";
    import { ref } from "vue";
    const userName = ref("");
    onLoad((e) => {
        userName.value = e.userName;
    });
    </script>
    ```

    

- 分析：
- 在onLoad回调的参数中可以接收到前一个页面通过url传递的参数

- > 但是url传参有一个问题，由于url传参是通过地址栏实现，而地址栏有输入长度的限
  >
  > 制，无法传递过长的数据，所以我们还可以改用以下方式

- index.vue

- ```vue
  <template>
      <view class="content">
          <view>{{ userName }}</view>
          <button @click="goTo">按钮</button>
      </view>
  </template>
  <script setup>
  import { ref } from 'vue';
  const userName = ref("张三");
  const goTo = () => {
      uni.navigateTo({
          url: "/pages/demo1/demo1",
          success: res => {
              res.eventChannel.emit("fromIndex", {
                  userName: userName.value
              });
          }
      });
  };
  </script>
  ```

  

- > 分析：
  >
  > navigator实现的API跳转中可以传入一个配置项success表示跳转成功时执行的
  >
  > 回调函数，在该回调中可以通过eventChannel向被打开的页面传递数据
  >
  > 这里的eventChannel的作用就时页面间事件通信通道
  >
  > 这里我们向被打开的demo页面触发了一个自定义fromIndex事件，并传递了事
  >
  > 件参数，在demo页面中我们就可以接收该接收传递的事件参数

- demo1.vue

- ```vue
  <template>
      <view>
          name:{{ userName }}
      </view>
  </template>
  <script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { getCurrentInstance, ref } from "vue";
  const userName = ref("");
  onLoad(() => {
      const instance = getCurrentInstance().proxy;
      const eventChannel = instance.getOpenerEventChannel();
      eventChannel.on("fromIndex", data => {
          userName.value = data.userName;
      });
  });
  </script>
  ```

  

- > 分析：
  >
  > 这里我们通过onLoad执行，获取到打开也买你中的事件通信通道，通过该通道
  >
  > 可以在demo组件中监听到index中的自定义事件fromIndex的触发，从而获取
  >
  > 到该事件触发时传递的事件参数
  >
  > 这里的实现其实于我们之前vue学习中的自定义事件破坏数据流单向性从而实现
  >
  > 子组件向父组件传递数据的方式非常类似，所以我们这里也可以通过
  >
  > eventChannel实现demo向index的数据传递



### 6.2、onShow和onHide

- > 这两个作为应用生命周期，一般都时搭配在一起使用的，同时也可以在页面组件中
  >
  > 使用，现在先来看onShow，这个可以先简单理解成当前页面在窗口中显示时触发，
  >
  > 在第一次进入页面的时候它的触发作为和onReady很相似，这个onReady的作用呢
  >
  > 和onMounted基本一致

- index.vue

- ```vue
  <script setup>
  import {onLoad,onReady,onShow} from '@dcloudio/uni-app';
  onLoad(() => {
  console.log("onLoad")
  })
  onReady(() => {
  console.log("onReady")
  })
  onShow(() => {
  console.log("onShow")
  })
  </script>
  ```

  - > 查看控制台打印顺序为onLoad，onShow，onReady，同时通过官方给的生命周期
    >
    > 流程图可以看到onShow是在页面beforeMounteed之前执行，所以自然会在
    >
    > onReady前面执行，因为onReady等同于mounted

  - > 现在我们通过一个跳转到demo页面，然后再通过左上的返回按钮返回到之前的页
    >
    > 面，这个时候可以看到只有onShow被触发

  - ```vue
    <template>
        <view class="content">
            <navigator url="/pages/demo1/demo1">跳转demo</navigator>
        </view>
    </template>
    ```

  - > 但是，如果你再demo1中单独创建一个navigator跳转回index，回发现三个生命周
    >
    > 期全部都回触发

  - > 分析：
    >
    > 通过返回按钮返回之前页面的时候，onLoad和onReady都没有触发，就说明了
    >
    > 之前的页面再跳转走之后并没有被销毁（卸载），结合之前我们学习的vue中内
    >
    > 置组件keep-alive的作用，并且在uni-app的官方文档中也明确说明了不支持
    >
    > keep-alive
    >
    > 所以，我们可以认为，当前页面在跳转走之后，被自动keep-alive了下来，没
    >
    > 有被卸载，所以当我们通过返回按钮返回的时候，onLoad和o'nReady并没有
    >
    > 触发，因为当前页面还依然活着，所以不会被重新创建一遍，相当于就是把当
    >
    > 前也买你从程序的后台调往了前台显示出来，所以只会触发onShow

  - > 那么，与onShow经常配对出现的onHide的触发其实就很明显，当页面被跳转走的
    >
    > 似乎和会触发

  - > 一般来说onHide的实际应用常见比如我们将页面切换到后台，就暂停播放页面中的
    >
    > 视频或者游戏。切回来的时候继续播放



### 6.3、onUnload

- > 通过上面的onShow和onHide的使用，我们会发现一个情况，页面会被自动缓存下
  >
  > 来，让其不会被卸载，那么，如果我们需要让页面被卸载触发onUnload怎么办？
  >
  > 
  >
  > 这个时候我们在做跳转的时候做一些修改

- > **如果使用的API跳转**，我们需要使用uni.relaunch方法来跳转，该方法实现的跳转会
  >
  > 销毁之前的页面栈，在跳转之后无法使用uni.navigatorBack返回，跳转之后的页面
  >
  > 也的title-bar上面也不回有返回按钮

- > **如果是navigator组件跳转**，可以设置open-type的属性值

- ```html
  <navigator open-type="reLaunch" url="/pages/demo1/demo1">跳转demo</navigator>
  ```

- index.vue

```vue
<template>
    <view class="content">
        <navigator open-type="reLaunch" url="/pages/demo1/demo1">
            跳转demo</navigator>
    </view>
</template>
<script setup>
import { onLoad, onReady, onShow, onHide, onUnload } from
    '@dcloudio/uni-app';
onLoad(() => {
    console.log("onLoad");
});
onReady(() => {
    console.log("onReady");
});
onShow(() => {
    console.log("onShow");
});
onHide(() => {
    console.log("onHide");
});
onUnload(() => {
    console.log("onUnload");
});
</script>
```

- > 关于卸载的用作：
  >
  > 其实页面卸载的时候，可以实现一些非常重要的功能，我们在执行程序的时候
  >
  > 会制作大量的缓存用于维持程序的运行和体验
  >
  > 但是这些缓存也增加了程序的运行负担，所以，我们可以在页面卸载的时候做
  >
  > 相应的缓存清理工作从而释放程序的运行空间

# uni-app跨端应用开发 -- 全局配置

- > 这里我们主要对uni-app项目会经常使用到的以下配置文件进行讲解
  >
  > pages.json
  >
  > manifest.json
  >
  > vite.config.js

## 1、pages.json

- > 当我们创建好uni-app项目之后，在项目内默认会创建一个pages.json文件，里面默
  >
  > 认写好三个大的配置项

- pages：路由管理配置项，与vue中的路由管理对象是同样性质的一个配置

- globalStyle：全局样式配置项，用于设置应用的状态栏，导航条，标题，窗口背景颜色等
- uniIdRouter：页面访问权限的配置项，可以自动处理需要登录才能跳转的页

- > 注意：
  >
  > uniIdRouter的使用一般是对应的云开发会使用到的配置，我们这里不使用云开
  >
  > 发，所以这个配置我们直接抛弃

### 1.1、globalStyle

- ```json
  {
      //.....
      "globalStyle": {
      "navigationBarTextStyle": "black", //设置导航栏字体颜色，只有黑白两种颜色
      "navigationBarTitleText": "今天天气不错", //设置导航栏文字
      "navigationBarBackgroundColor": "#f8f8f8", //设置导航栏背景颜色
      "navigationStyle": "default" ,//设置导航栏，两个值，default使用默认的原生导航栏，这个时候基于不同的平台会生成一个默认的导航栏布局
      "enablePullDownRefresh": true, //全局开启下拉刷新
      "backgroundColor": "#f00", //设置下拉刷新时的背景颜色
      "onReachBottomDistance": 100 //全局页面下拉触底设置，值为框口底部与页面底部的距离
      },
      //.....
  }
  ```

- > 注意：
  >
  > 当我们设置了下拉刷新会开启一个下拉刷新的生命周期的钩子函数触发，同时
  >
  > 配置下拉触底 的生命周期钩子函数，就可以实现我们在开发中经常会使用到的
  >
  > 下拉刷新页面和上拉加载

- 举例：

- ```vue
  <template>
      <view class="content">
          <view v-for="item in 100">{{ item }}</view>
      </view>
  </template>
  <script setup>
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
  onPullDownRefresh(() => {
      console.log("上拉刷新");
      //要实现刷新，我们这里一般会重新请求一遍首页数据
      uni.stopPullDownRefresh();
  });
  onReachBottom(() => {
      console.log("下拉加载");
      //这里要实现下一页数据加载，需要发送对应页码请求
      //这里还可以手动设置一个loading动画
  });
  
  </script>
  ```

  

- > 代码分析：
  >
  > onPullDownRefresh生命周期函数：当上拉刷新时触发，还有两个API可以对
  >
  > 该生命周期进行设置
  >
  > **1、uni.startPullDownRefresh(object)**
  >
  > 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致，可
  >
  > 以传入一个配置对象，有三个选项：
  >
  > success：成功回调，该回调还可以return一个可以自定义的成功信息
  >
  > fail：失败回调
  >
  > complete：无论成功失败都会执行的回调
  >
  > **2、uni.stopPullDownRefresh()**
  >
  > 停止当前页面下拉刷新，由于下拉刷新触发后无法自动停止，因为我们不知道
  >
  > 下拉刷新的请求执行需要耗时多久，所以，需要我们在请求成功或失败后自己
  >
  > 来手动停下来刷新的动作
  >
  > 可以设置在complete的回调中执行，也可以设置在请求的Promise对象中执行

### 1.2、pages

- > pages的部分是一个数组，每一个数组对应一个页面的配置，用于设置整个项目路，
  >
  > 可以配置的如下：

- > path：配置页面的跳转路径
  >
  > style：这里所有配置的东西与上面的globalStyle基本一模一样的，是针对每一
  >
  > 个页面的导航进行配置
  >
  > needLogin：该页面是否需要登录后才能访问

- > 在pages数组中设置的第一个页面就是项目默认开打的首页

### 1.3、tabBar

- tabBar作为pages.json中的一个配置大项，可以快速的在项目中生成一个选项卡栏

```json
"tabBar": {
    "color":"#ccc", //tabbar文字颜色
    "selectedColor": "#1296db", //tabbar文字被选中的颜色
    "backgroundColor": "#fff", //tabbar的背景颜色
    "borderStyle": "black", //tabbar的上边框颜色
    "list":[ //配置选项卡栏目的选项
        {
        "text":"首页", //选项文字内容
        "pagePath": "pages/index/index", //选项跳转路径
        "iconPath": "static/icon/index-h.png", //选项图标
        "selectedIconPath": "static/icon/index.png" //被选中的选项图标
        },
        {
        "text":"我的", //选项文字内容
        "pagePath": "pages/demo1/demo1",
        "iconPath": "static/icon/my-h.png",
        "selectedIconPath": "static/icon/my.png"
        }
    ]
},
```

- > **关于tabBar配置的相关事项：**
  >
  > 小程序是不支持tabber使用字体图标，所以，我们为了考虑兼容小程序，我们
  >
  > 这里只能使用图片，如果不考虑兼容小程序可以在list中使用iconfont配置项来
  >
  > 配置字体图标，同时还需要再tabBar的iconfontSrc配置上指定字体文件路径

### 1.4、easycom

- easycom是对uni-app中的自定义组件和第三方组件库的组件进行自动导入注册的一个配置，该配置并没有相关的代码需要编写

- > easycom提供了一套组件存放的目录结构规范，按照规范创建目录并存放组件文件
  >
  > 即可实现自动导入注册使用，规范如下：

- > 1. 安装在项目根目录的components目录下，并符合 components/组件名称/组件名
  >
  > 称.vue
  >
  > 2. 安装在uni_modules下，路径为 uni_modules/插件ID/components/组件名称/组
  >
  > 件名称.vue

## 2、自动导入配置

- > 在uni-app的开发中，我们经常会需要在组件中手动导入vue的方法和uni-app的
  >
  > API，生命周期

- > 现在可以通过安装自动导入插件进行相应的配置就可以不需要做导入操作直接在组
  >
  > 件中调用

- 安装自动导入的插件包

- ```cmd
  npm i unplugin-auto-import -D
  ```

- 在项目目录下创建vite.config.js

```js
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
    plugins: [
        uni(),
        AutoImport({
            imports: ["vue", "uni-app"]
        })
    ]
});
```

- > 如果你创建的uni-app项目，使用的是vue2的版本，那么项目搭建的时候使用的是
  >
  > CLI脚手架，而该脚手架内置的打包环境是webpack实现的，对应的配置就不太一样
  >
  > 
  >
  > 如果是vue2的项，新建一个vue.config.js，这个文件是CLI脚手架的配置文件名

- > 其实这个就是一个webpack.config.js，也就是一个webpack的配置文件

```js

module.exports = {
    plugins: [
        require("unplugin-auto-import/webpack").default({
            AutoImport({
                imports: ["vue", "uni-app"]
})
        })
    ]
}
```

# uni-app跨端应用开发 -- 常用API

- > 在之前的学习，我们已经使用了一些API，这里我们来继续对一些常用API进行讲
  >
  > 解，我们主要结合官方文档来看

## 1、交互反馈

- > 我们一直在说对于用户的操作我们需要给予反馈，而其中一种重要的反馈手段就时
  >
  > 消息提示窗

### 1.1、uni.showToast与uni.hideToast

- uni.showToast可以在页面中显示一个半透明的消息窗口

- ```js
  uni.showToast({
      title: "成功",
      icon: "success",
      mask: true,
      duration: 3000
  });
  ```

  

- > 在不做任何配置的情况下，默认在窗口中显示一个勾的图标，通过icon选项的配置
  >
  > 可以显示不同的图标，比较常用的就时success（默认值），fail，然后loading，如
  >
  > 果要使用其它图标，可以通过image选中设置本地路径的图标图片

- 如果觉得弹窗的存在时间太长，我们可以在中途直接通过uni.hideToast直接隐藏

- > **文本长度的跨端适配问题：**
  >
  > 在title中可以设置文本信息，但是文本长度微信小程序只支持最多7个字符，多
  >
  > 余的部分是不显示的，而H5是可以完整显示的
  >
  > 这种情况下，我们可以通过设置 icon:"none" 取消图标的方式来解决小程序文
  >
  > 本长度限制的问题

### 1.2、uni.showLoading与uni.hideLoading

- > 显示loading提示框，需要主动调用uni.hideLoading才能关闭提示框，可以设置的
  >
  > 配置与上面的showToast是一样，只不过不能设置duration显示时长和窗口图标

- ```vue
  <template>
      <view class="content">
          <button @click="getData">发送请求</button>
      </view>
  </template>
  <script setup>
  const getData = () => {
      uni.showLoading({
          title: "加载中...",
          success: res => {
              console.log(res);
          }
      });
      //模拟请求时长
      setTimeout(() => {
          uni.hideLoading();
      }, 3000);
  };
  </script>
  ```

  

### 1.3、uni.showModel

- > 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一
  >
  > 个API整合了 html 中：alert、confirm。

- ```js
  const getData = () => {
      uni.showModal({
          title: "标题",
          content: "你确定么？",
          success: res => {
              console.log(res);
          },
          fail: res => {
              console.log(res);
          }
      });
  };
  ```

- > 说明：
  >
  > 除了以上配置，还可以隐藏取消按钮，只显示一个确认按钮，设置确认和取消
  >
  > 按钮的样式
  >
  > 在确定和取消的回到中可以接收一个参数，里面包含三个属性
  >
  > ```js
  > {
  >     cancel: false, //布尔结果表示是否点击取消按钮
  >     confirm: true, //布尔结果表示是否点击确认按钮
  >     errMsg: "showModel:ok"; //只要弹窗正常显示就为showModel:ok，前面几种弹窗的回调也可以接收该值;
  > }
  > ```

- 还可以通过设置 editable:true 在弹窗中显示输入框

- > 用户在输入框中输入的内容，会在回调函数中的参数里面多一个content属性中存
  >
  > 放，点击取消按钮的话，取消回调的参数中是没有输入框内容的

- > 注意：
  >
  > 开启输入框之后，content设置的弹窗内容会作为输入框的value默认值显示，
  >
  > 可以通过placeholderText设置提示信息，但是如果placeholderText和content
  >
  > 同时设置，默认显示content内容

## 2、导航栏、tabBar与背景的动态设置

- > 这三项的设置其实我们在pages.json的globalStyle、pages和tabBar这三个配置项
  >
  > 中都进行过设置，但是在pages.json中的设置我们可以理解成是静态设置是写死的
  >
  > 配置

- > 而这些设置还可以通过调用API的方式来进行修改，这些API没有什么特别之处可以
  >
  > 直接看官方文档学习

- https://zh.uniapp.dcloud.io/api/ui/navigationbar.html

## 3、跳转API

- > 之前的学习中我们接触过用于路由跳转的API，但是我们只是使用了
  >
  > uni.navigatorTo，除了这个之外，还有一些其它的跳转API

- uni.redirectTo
- uni.relaunch
- uni.switchTab
- uni.navigateBack

- > 以上的这些跳转方法都有自己的一些情况，需要根据自身项目的实际情况来调
  >
  > 整使用的跳转API
  >
  > 注意：
  >
  > navigateTo , redirectTo 只能打开非 tabBar 页面。
  >
  > switchTab 只能打开 tabBar 页面。
  >
  > reLaunch 可以打开任意页面。
  >
  > 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部
  >
  > 都有 tabBar 。
  >
  > 不能在首页 onReady 之前进行页面跳转。
  >
  > H5端页面刷新之后页面栈会消失，此时 navigateBack 不能返回，如果一
  >
  > 定要返回可以使用 history.back() 导航到浏览器的其他历史记录

### 3.1、getCurrentPages获取页面栈实例

- > 通过上面的API实现页面跳转之后，每次跳转的页面都会被记录到页面栈中（类似于
  >
  > 历史记录），而我们可以通过getCurrentPages可以把每次跳转的页面信息获取做成
  >
  > 一个数组返回

- > 举例：
  >
  > 创建index、demo、home三个页面，index可以跳转到home、home可以跳转到
  >
  > demo、在三个页面都执行getCurrentPages看打印结果

- index.vue

- ```vue
  <template>
      <view class="content">
          <button @click="goHome">跳转home</button>
      </view>
  </template>
  <script setup>
  const goHome = () => {
      uni.navigateTo({
          url: "/pages/home/home"
      });
  };
  console.log(getCurrentPages());
  </script>
  ```

  

- home.vue

- ```vue
  <template>
      <view>
          <view>home</view>
          <button @click="goDemo1">跳转demo1</button>
      </view>
  </template>
  <script setup>
  const goDemo1 = () => {
      uni.switchTab({
          url: "/pages/demo1/demo1"
      });
  };
  console.log(getCurrentPages());
  </script>
  
  ```

  - demo1.vue

  - ```vue
    <template>
    
    </template>
    <script setup>
        console.log(getCurrentPages())
    </script>
    ```

  - > 注意：
    >
    > 这里我们跳转的过程中，跳转到demo1中的时候，因为demo1是选项卡页面，
    >
    > 所以跳转之后，之前的非tabBar页面会被清理出页面栈数组

- 在页面栈的实例中，不同的平台不太一样，这里我们以H5端和微信小程序为例：
- H5端：

- > 每一个实例都是一个代理对象，代理的目标对象是包含了vue实例和路由新的对象，
  >
  > 即然包含了vue实例那么就可以直接调出该vue实例下的数据和方法，但是只支持选
  >
  > 项式API

- 改造一下home.vue换成选项式API

- ```vue
  
  export default {
      name: "home",
      data: () => {
          return {
              str: "hahahaha"
          };
      }, methods: {
          handleClick() {
              console.log(this.str);
          }
      },
      mounted() {
          console.log(getCurrentPages());
      }
  };
  ```

- > 小程序端：
  >
  > 小程序端的每一个实例，就是一个小程序页面栈实例，里面可以调用小程序页面生
  >
  > 命周期，在$vm中可以看到小程序的组件实例，可以调出该实例中的数据和方法

### 3.2、页面通讯

- > 在之前介绍onLoad的时候，我们就介绍过相关的跳转API，并通过eventChannel在
  >
  > 页面跳转的时候实现了数据方法的传递，但是eventChannel实现的是页面间通讯，
  >
  > 而uni-app作为一个跨端框架，那么就需要考虑不同平台的跨端组件通讯，而在页面
  >
  > 通讯中所介绍的所有API都是 App 全局级别的，跨任意组件，页面，nvue，vue 等

- **uni.$emit(eventName,OBJECT)** 触发全局自定义事件

- > 这个API的使用于之前vue中学习的自定义事件的用法基本一样，只不过这里的自定
  >
  > 义事件是可以全局监听的

- 在index.vue中触发自定义事件，传递obj对象给home页面

- ```vue
  <template>
      <view class="content">
          <button @click="fromIndex">跳转home</button>
      </view>
  </template>
  <script setup>
  import { reactive } from "vue";
  const obj = reactive({
      userName: "zhangsan",
      age: 18
  });
  const fromIndex = () => {
      uni.navigateTo({
          url: "/pages/home/home",
          success: () => {
              uni.$emit("fromIndex", obj);
          }
      });
  };
  </script>
  ```

- 监听全局的自定义事件需要使用 uni.$on(eventName,callback)

- > 在home页面中监听自定义事件，接收自定义事件触发传递的参数并且在home中渲
  >
  > 染

- ```vue
  <template>
      <view>
          <view>姓名：{{ indexData.userName }}</view>
          <view>年龄：{{ indexData.age }}</view>
      </view>
  </template>
  <script setup>
  const indexData = ref({});
  onReady(() => {
      uni.$on("fromIndex", data => {
          indexData.value = data;
      });
  });
  </script>
  ```

  - 注意：完成以上操作之后，会出现几个问题

- > **问题1：** 无论是H5端还是小程序端，第一次跳转进入后是无法监听到自定义事件触
  >
  > 发，只有当返回第二次再跳转才可以监听到自定义事件

- > **原因：**官方文档再页面通讯栏目最后的注意事项进行了说明，uni.$on 定义完成后才
  >
  > 能接收到 uni.$emit 传递的数据，也就是说，必须要先执行uni.$on开启监听，才能
  >
  > 监听自定义事件的触发，但是我们的uni.$on在home页面中，需要跳转过去才能执
  >
  > 行，不可能在index中的uni.$emit之前执行

- 这里，我们采用嵌套的方式来决定

- index.vue

- ```vue
  <template>
      <view class="content">
          <button @click="fromIndex">跳转home</button>
      </view>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  const obj = reactive({
      userName: "zhangsan",
      age: 18
  });
  const fromIndex = () => {
      uni.navigateTo({
          url: "/pages/home/home",
          success: () => {
              uni.$on("fromHome", () => {
                  uni.$emit("fromIndex", obj);
              });
          }
      });
  };
  </script>
  ```

  - home.vue

```vue
<template>
    <view>
        <view>姓名：{{ indexData.userName }}</view>
        <view>年龄：{{ indexData.age }}</view>
    </view>
</template>
<script setup>
const indexData = ref({});
onReady(() => {
    uni.$on("fromIndex", data => {
        indexData.value = data;
    });
    uni.$emit("fromHome");
});
</script>
```

- > 代码分析：
  >
  > 这里我们在index的跳转成功的回调中先开启一个监听fromHome自定义事件的
  >
  > 监听器，当监听到fromHome的触发时，再执行uni.$emit去触发一个
  >
  > fromIndex自定义事件
  >
  > 当条件到home页面的时候，开启监听fromIndex的监听器，并触发
  >
  > fromHome自定义事件，这样就形成了一个如下的逻辑：
  >
  > 当我们首先进入index页面的时候会先开启一个监听fromHome的监听器，这个
  >
  > 时候跳转成功进入home页面触发home页面的onReady生命周期函数从而执行
  >
  > 开启一个监听fromIndex的监听器，同时触发fromHome事件，这个时候监听
  >
  > fromHome的监听器已经在之前的index页面中已经开启，当监听到home页面
  >
  > 中触发的fromHome事件，执行fromHome监听的回调，从而触发fromIndex
  >
  > 事件并传递事件参数，而这个时候针对fromIndex的监听已经在之前跳转到
  >
  > home页面的时候就已经开启，所以也可以顺利监听到fromIndex的触发并接收
  >
  > 事件参数

- > **问题2：**当上面的问题解决之后，我们会发现，如果我们返回之后再次条件，在
  > home中的监听器里面的打印会打印多次

- > **原因：**其实官方文档也体行了我们要及时销毁事件监听，从打印的结果我们可以看
  > 到，其实每次跳转进入创建的监听一直都在，它会像我们之前在vue中讲过的可以挂
  > 到组件的生命周期上面随着组件的卸载而移除，所以，我们这里需要手动移除

- **使用uni.$off(eventName, callback)移除事件监听**

- 在index页面使用

- >注意：这里我们把原本在navigateTo的成功回调中执行的自定义事件相关代
  >
  >码，移出来，不然H5兼容会有问题
