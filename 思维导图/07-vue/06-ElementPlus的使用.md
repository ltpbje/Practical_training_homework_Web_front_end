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

## 4、element-plus制作login页面

- 在开始制作登录表单之前，我们先认识一些常见的表单组件
- `<el-form></el-form>` 表单域组件
- `<el-form-item></el-form-item>` 表单内容项组件（有点类似与label标签，但是功能比label要丰富非常多）
- `<el-input /> `文本框组件，可以通过`type="password" `改成密码输入框，或者`type="textarea" `多行文本输入框
- `<el-select></el-select> `下拉菜单组件

- `<el-option></el-option>` 下拉菜单项组件
- `<el-date-picker />` 日期窗口组件
- `<el-time-picker /> `时间窗口组件
- `<el-switch /> `滑动开关
- `<el-checkbox-group></el-checkbox-group>` 多选框组组件
- `<el-checkbox /> `多选框组件，配合上面的el-checkbox-group形成一个多选组
- `<el-radio-group></el-radio-group> `单选框组 组件
- `<el-radio /> `单选框组件，配合上面的el-radio-group组成单选组
- `<el-button><el-button>` 按钮组件
### 4.1、开始搭建登录表单

- login.vue

  - ```vue
    <script setup>
    import PageView from './PageView.vue';
    import { reactive, ref } from 'vue';
    const formData = reactive({
        zh: "",
        password: ""
    });
    const rules = reactive({
        zh: [
            {
                required: true,
                message: "必须输入用户名",
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true,
                message: "必须输入密码",
                trigger: 'blur'
            }
        ]
    });
    //获取整个form作为DOM对象，需要作为实参传入给发送按钮的点击方法
    
    const ruleFormRef = ref(null);
    //发送表单信息的方法
    const submitForm = (formEl) => {
        //验证是否由form表单传入，如果没有直接return打断函数的后续执行
        if (!formEl) return;
        //form表单域中有一个validate方法用来验证整个表单中的数据是否通过校验，并
        且传入一个回调;
        //其中回调接收的第一个参数传入当前表单域中的所有表单数据是否通过校验，第二
        个参数传入的是没有通过验证的表单项数据;
        formEl.validate((isValid, invalidFields) => {
            if (isValid) {
                console.log("登录成功");
            } else {
                console.log(invalidFields);
                return false;
            }
        });
    };
    </script>
    <template>
        <page-view class="flex-row j-c a-c">
            <div class="login">
                <el-form label-width="70px" :model="formData" :rules="rules" status-icon ref="ruleFormRef">
                    <el-form-item label="用户名" prop="zh">
                        <el-input v-model="formData.zh" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" vmodel="formData.password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width:200px" @click="submitForm(ruleFormRef)">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </page-view>
    </template>
    <style scoped>
    .login {
        width: 350px
    }
    </style>
    ```

  - > #### 代码分析：（script部分）
    >
    > `formData`：用于双向绑定登录表单中的账号密码数据
    >
    > `rules`：设置验证规则
    >
    > `formEl.validate()` ：el-form内置的是一个用验证内部数据是否全部戙验证的方法
    >
    > #### 代码分析：（template部分）
    >
    > `label-width `设置当前表单域中表单项的前缀文字容器的宽度（类似于设置label标签的宽度）
    >
    > `:model` 向当前表单域当中传入数据
    >
    > `:rules` 向当前表单域传入约定的验证规则，可以在当前域内的el-form-item上的prop属性来设置要验证的字段
    >
    > `status-icon` 给表单添加状态图标
    >
    > `label` 在el-form-item 给表单项设置前缀文字
    >
    > `prop` 在el-form-item 上面设置当前表单项中需要验证的字段
    >
    > **注意：**
    >
    > rules中设置的属性需要域formData当中的属性是一致，因为哪条验证规则对应哪个字段是通过属性名来做一致性判断的
    > 

### 4.2、自定义验证规则

- 声明一个方法，该方法固定接收三个参数，rule，value，callback，在方法体内可以使用value的实参进行各种校验

- ```js
  const chackName = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('必须输入用户名'));
      } else if (value.length <= 6) {
          return callback(new Error('账号太短'));
      } else {
          //最后一定要在else里面执行一个callback，不然会卡验证状态
          callback();
      }
  };
  const rules = reactive({
      zh: [
          {
              validator: chackName,
              trigger: 'blur'
          }
      ],
      //......
  });
  ```

- > 代码分析：
  >
  > checkName方法作为用来制作自定义规则大的方法使用，其中有三个参数分别代表
  >
  > rule：传入当前验证字段的相关信息
  >
  > value：需要验证的数据值
  >
  > callback：可以根据当前校验的结果做后续执行
  >
  > **注意：**
  >
  > **自定义的校验方法需要卸载rules校验规则的前面**

### 4.3、制作登录请求

- 安装axios实现请求和响应的拦截，并且建立一个专门管理请求方法的文件

- 安装依赖包

- ```cmd
  npm i axios --save
  ```

- 新建一个utils目录，内部新建一个axiosInstance.js 制作拦截

- ```js
  import axios from 'axios';
  
  const axiosInstance = axios.create({
      baseURL: 'http://www.softeem.xin:9544',
      timeout: 2000
  });
  
  
  // 请求拦截
  axiosInstance.interceptors.request.use(config => {
      // ....
      return config;
  });
  
  
  // 响应拦截
  axiosInstance.interceptors.response.use(resp => {
      return resp.data;
  }, error => {
      return error;
  }
  );
  
  
  export default axiosInstance;
  ```

  - 新建一个api目录 , 内部新建adminInfo.js 制作登录请求的方法

  - ```js
    import axiosInstance from "../utils/axiosInstance";
    
    
    const adminInfo = {
        checkLogin({ zh, password }) {
            return axiosInstance.post("/userInfo/checkLogin", {
                zh, password
            });
        }
    };
    
    export default adminInfo;
    ```

  - 在api目录下新建index.js, 统一管理所有的数据模块的请求对象

  - ```js
    import adminInfo from "./adminInfo";
    const Api = {
        adminInfo
    };
    
    export default Api;
    
    ```

  - 在login.vue中调用登录请求的方法

  - ```js
    const submitForm = (formEl) => {
        if (!formEl) return;
        formEl.validate((isValid, invalidFields) => {
            if (isValid) {
                Api.adminInfo.checkLogin(formData);
            } else {
                console.log(invalidFields);
                return false;
            }
        });
    };
    ```

## 5 、pinia全局状态管理    

- Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。如果你熟悉组合式 API 的话，你可能会认为可以通过一行简单的 export const state =reactive({}) 来共享一个全局状态。对于单页应用来说确实可以，但如果应用在服务器端渲染，这可能会使你的应用暴露出一些安全漏洞。 而如果使用 Pinia，即使在小型单页应用中，你也可以获得如下功能：

- 测试工具集
- 插件：可通过插件扩展 Pinia 功能
- 为 JS 开发者提供适当的 TypeScript 支持以及**自动补全**功能。
- 支持服务端渲染
- Devtools 支持
  - 追踪 actions、mutations 的时间线
  - 在组件中展示它们所用到的 Store
  - 让调试更容易的 Time travel
- 热更新
  - 不必重载页面即可修改 Store
  - 开发时可保持当前的 State

### 5.1 vuex与pinia的区别

- pinia中只有state , getters , actions , 抛弃了vuex中的mutation
- pinia中acition支持同步和异步 , 但是vuex是不支持
- 良好的ts的支持
- pinia中每一个store实例都可以是用独立文件 , 相互之间不影响
- 体积非常小 , 只有1kb左右
- pinia 支持插件扩展自身功能( pinia的插件全部是函数 )
- pinia 支持服务器渲染

### 5.2 安装配置pinia

- ```cmd
  npm i pinia --save
  ```

- 在入口文件main.js中

- ```js
  import {createPinia} from 'pinia'
  createApp(App).use(router).use(createPinia()).mount('#app')
  ```

- 如果你使用的是 Vue 2，你还需要安装一个插件，并在应用的根部注入创建的pinia

- ```js
  import { createPinia, PiniaVuePlugin } from 'pinia';
  Vue.use(PiniaVuePlugin);
  const pinia = createPinia();
  new Vue({
      el: '#app',
      // 其他配置...
      // ...
      // 请注意，同一个`pinia'实例
      // 可以在同一个页面的多个 Vue 应用中使用。
      pinia,
  });
  ```

### 5.3 定义一个pinia实例store

- pinia创建的全局状态管理实例中就3个选项
- state 状态(数据)
- actions 方法(支持异步方法 , 也就是可以做请求)
- getters 计算属性

- 根据pinia的特性,每一个store实例都是可以保持独立的,不需要像vuex那样把各个组件中的数据都存在一个store实例下的state中 , 所以我们这里针对login.vue这个组件中响应的登录数据制作一个专门大的store实例来进行全局状态管理

- ```js
  import { defineStore } from "pinia";
  export const userLoginInfo = defineStore("loginInfo", {
      state: () => {
          return {
              userInfo: null,
              userToken: null
          };
      }
  });
  ```

  - > 代码分析:
    >
    > 我们可以把多个状态管理实例 , 分文件保存 , 也可以都保存在一个文件里面 , 因为pinia是支持创建多个专题管理实例的 , 所以我们如果要包装在一个文件里面 ,我们就需要使用export具名导出 , 而具名导出不同于默认导出export default只能导出一个对象 , 具名导出可以导出一个方法 , 对象 , 变量 , 同时一个文件可以多次导出 ,
    >
    > 具体采用分文件管理不同的store实例 , 还是一个文件管理多个store实例看你自己的实际情况

- 然后再login.vue中将登录信息和token储存下来

- ```js
  //......
  import { userLoginInfo } from '../store/login.js';
  const store = userLoginInfo();
  //......
  const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate(async (isValid, invalidFields) => {
          if (isValid) {
              let results = await
                  Api.adminInfo.checkLogin(formData);
              //将登录成功之后返回的登录信息和token保存到store当中
              store.userInfo = results.data.loginUserInfo;
              store.token = results.data.token;
              console.log(store.userInfo, store.token);
          } else {
              console.log(invalidFields);
              return false;
          }
      });
  };
  ```

  - 然后,我们需要在接下来的请求中都携带token作为请求头,所以需要将store中登录信息数据做一个数据持久化的操作

### 5.4 pinia数据持久化

- 安装插件

  - ```cmd
    npm i pinia-plugin-persist -S
    ```

- 配置插件

- pinia没有像vuex的plugins选项来配置插件,依实例化的store中的use方法将插件挂载

- main.js

- ```js
  import {createPinia} from 'pinia'
  import piniaPluginPersist from '../node_modules/pinia-pluginpersist'
  createApp(App).use(router).use(createPinia().use(piniaPluginPersist)).mount('#app')
  ```

- 在需要做数据持久化的store实例中插入配置

  - ```js
    import { defineStore } from "pinia";
    export const userLoginInfo = defineStore("loginInfo", {
        state: () => {
            return {
                userInfo: null,
                userToken: null
            };
        },
        persist: {
            enabled: true,
            strategies: [
                {
                    key: "userToken",
                    storage: localStorage,
                    paths: ['userToken']
                }
            ]
        },
    });
    ```

    