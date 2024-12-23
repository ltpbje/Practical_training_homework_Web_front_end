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