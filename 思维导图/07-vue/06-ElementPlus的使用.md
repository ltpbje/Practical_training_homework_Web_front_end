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

### 5.5 pinia实例中内置的方法

- 重置状态$reset()
- 使用选项式 API 时，你可以通过调用 store 的 $reset() 方法将 state 重置为初始值

- ```js
  store.$reset()
  ```

- > 注意:
  >
  > $reset只能在选项式API中直接调出 , 如果要在setup中调用需要自己去在状态管理对象中自己声明该方法才行
  >
  > ```js
  > export const useCounterStore = defineStore('counter', () => {
  >     const count = ref(0)
  >     function $reset() {
  >         count.value = 0
  >     }
  >     return { count, $reset }
  > })
  > ```

- 修改状态 $patch()

  - $patch()可以修改多个属性

  - $patch方法可以运行对state中的状态进行批量修改 , 之前我们可以直接从store.count ++ , 但是这些只能单个属性修改

  - 接受一个对象

    - ```js
      const changeState = () => {
          store.$patch({
              count: store.count + 1,
              age: 20
          });
      };
      ```

- 不过，用这种语法的话，有些变更真的很难实现或者很耗时：任何集合的修改（例如，向数组中添加、移除一个元素或是做 splice 操作）都需要你创建一个新的集合。因此， **$patch 方法也接受一个函数**来组合这种难以用补丁对象实现的变更。

- 接受一个函数

  - ```js
    store.$patch((state) => {
        state.items.push({ name: 'shoes', quantity: 1 });
        state.hasChanged = true;
    });
    ```

- 替换状态$state
  - 这里的替换不能理解成是把状态进行替换 , **而是可以在已经定义好的state的基础上进行新增和修改操作**

- ```js
  const changeState = () => {
      store.$state = { counter: 10, name: "zhangsan" };
  };
  ```

  - > 代码分析:
    >
    > 以上执行之后 , 会往store中的state新增两个状态
    > 


- 订阅$subscribe()

- 这里可以理解成pinia中提供的监听状态的方法于watch类似 , 当state发生变化的时候 , 触发该方法的执行 , 这个方法可以接收两个参数

  - 参数1: 回调函数 , 这个回调函数会被注入两个参数 mutation , state

  - 参数2: 配置对象 , 一般我们只会配置一个 {detached:true}

- ```js
  cartStore.$subscribe((mutation, state) => {
      //mutation的实参是一个对象,记录状态改变时的一些情况
      //其内部主要三个属性
      //1 mutation.events 里面主要记录了state改变前后的新值和老值
      //2 mutation.storeId 值为当前调用该方法的store实例的id
      //3 mutation.type 通过哪种方式修改的state 三个值 'direct' 'patch
      object' 'patch function'
      // 每当状态发生变化时，将整个 state 持久化到本地存储。
      localStorage.setItem('cart', JSON.stringify(state))
  })
  ```

  - >  注意:
    >
    > 通过$subscribe 监听的状态是直接绑定在调用该方法的组件上的 , 所以组件卸载的始画监听会自动删除 , 如果要在组件卸载的始画保留订阅 , 把第二个参数设置成 {detached:true}

- 订阅action

- 你可以通过 store.$onAction() 来监听 action 和它们的结果。传递给它的回调函数会在 action 本身之前执行。 after 表示在 promise 解决之后，允许你在 action解决后执行一个回调函数。同样地， onError 允许你在 action 抛出错误或 reject时执行一个回调函数。这些函数对于追踪运行时错误非常有用，类似于Vue docs 中的这个提示。

- 这里有一个例子，在运行 action 之前以及 action resolve/reject 之后打印日志记录。

- js

- ```js
  const unsubscribe = someStore.$onAction(
    ({
      name, // action 名称
      store, // store 实例，类似 `someStore`
      args, // 传递给 action 的参数数组
      after, // 在 action 返回或解决后的钩子
      onError, // action 抛出或拒绝的钩子
    }) => {
      // 为这个特定的 action 调用提供一个共享变量
      const startTime = Date.now()
      // 这将在执行 "store "的 action 之前触发。
      console.log(`Start "${name}" with params [${args.join(', ')}].`)
  
      // 这将在 action 成功并完全运行后触发。
      // 它等待着任何返回的 promise
      after((result) => {
        console.log(
          `Finished "${name}" after ${
            Date.now() - startTime
          }ms.\nResult: ${result}.`
        )
      })
  
      // 如果 action 抛出或返回一个拒绝的 promise，这将触发
      onError((error) => {
        console.warn(
          `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
        )
      })
    }
  )
  
  // 手动删除监听器
  unsubscribe()
  ```


- 默认情况下，*action 订阅器*会被绑定到添加它们的组件上(如果 store 在组件的 `setup()` 内)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 `true` 作为第二个参数传递给 *action 订阅器*，以便将其从当前组件中分离：

## 6 、loading动画与消息弹窗

- elementPlus提供了一套feeback反馈组件,我们使用其中的loading加载和message消息提示来完成制作

### 6.1 loading加载

- Element Plus 提供了两种调用 Loading 的方法：指令和服务。

- 对于自定义指令 v-loading ，只需要绑定 boolean 值即可。

- ```js
  const loading = ref(false)
  ```

- ```html
  <el-button type="primary"@click="submitForm(ruleFormRef)" v-loading="loading">登录</el-button>
  ```

  

- 然后我们通过给v-loading赋值准备好的Boolean值 , 通过事件触发修改 loading 值来完成loading动画的显示隐藏

- 但是这些指令方式 , 没有办法实现很多的自定义操作

- 服务方式

  - ```js
    import { ElLoading } from 'element-plus';
    const submitForm = (formEl) => {
        if (!formEl) return;
        formEl.validate(async (isValid, invalidFields) => {
            if (isValid) {
                const loading = ElLoading.service({
                    lock: true,
                    text: '加载中......',
                    background: 'rgba(0,0,0,0.7)'
                });
                let results = await
                    Api.adminInfo.checkLogin(formData);
                //将登录成功之后返回的登录信息和token保存到store当中
                store.userInfo = results.data.loginUserInfo;
                store.token = results.data.token;
                loading.close();
            } else {
                console.log(invalidFields);
                return false;
            }
        });
    };
    ```

### 6.2 message消息

- 单独引入

- ```js
  import { ElMessage } from 'element-plus'
  ```

  

- ElMessage提供了4种状态来显示 成功 失败 消息 错误的操作反馈 , 两种方式调用不同的状态

- 通过配置项来决定类型

  - ```js
    ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
    })
    ```

  - 通过方法来决定类型

  - ```js
    ElMessage.error('Oops, this is a error message.')
    ```

  - 具体到应用上面显示登录失败和成功的消息

  - ```js
    const submitForm = (formEl) => {
        if (!formEl) return;
        formEl.validate(async (isValid, invalidFields) => {
            if (isValid) {
                const loading = ElLoading.service({
                    lock: true,
                    text: '加载中......',
                    background: 'rgba(0,0,0,0.7)'
                });
                let results = await
                    Api.adminInfo.checkLogin(formData);
                loading.close();
                //将登录成功之后返回的登录信息和token保存到store当中
                if (results.status == "success") {
                    ElMessage.success(results.msg);
                    store.userInfo = results.data.loginUserInfo;
                    store.token = results.data.token;
                } else if (results.status == "fail") {
                    ElMessage({
                        message: results.msg,
                        type: "error"
                    });
                } else {
                    ElMessage.error('响应超时');
                }
            } else {
                console.log(invalidFields);
                return false;
            }
        });
    };
    ```

## 7、路由守卫限制跳转权限

- 制作一个全局前置守卫，在main.js中调用router

- ```js
  //.......
  import { userLoginInfo } from './store/login';
  const store = userLoginInfo();
  router.beforeEach((to, from, next) => {
      if (to.name == 'login') {
          next();
      } else {
          if (store.userToken) {
              next();
          } else {
              next({ name: 'login' });
          }
      }
  });
  ```

- 同时在登录组件中的submitForm方法添加到登录成功之后实现编程式导航的跳转

- ```js
  import { useRouter } from 'vue-router';
  const store = userLoginInfo();
  const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate(async (isValid, invalidFields) => {
          if (isValid) {
              const loading = ElLoading.service({
                  lock: true,
                  text: '加载中......',
                  background: 'rgba(0,0,0,0.7)'
              });
              let results = await
                  Api.adminInfo.checkLogin(formData);
              loading.close();
              //将登录成功之后返回的登录信息和token保存到store当中
              if (results.status == "success") {
                  ElMessage.success(results.msg);
                  store.userInfo = results.data.loginUserInfo;
                  store.userToken = results.data.token;
                  router.push({ name: 'home' }); //添加push方法实现跳转
              } else if (results.status == "fail") {
                  ElMessage({
                      message: results.msg,
                      type: "error"
                  });
              } else {
                  ElMessage.error('响应超时');
              }
          } else {
              console.log(invalidFields);
              return false;
          }
      });
  };
  ```

## 8、制作home页面布局



### 8.1、Container布局容器组件

- 开始制作之前我们先认识一些与布局相关的组件，与布局相关的组件主要分为两个部分，layout布局组件和contianer布局容器组件，这两类都属于basic基础组件
- 用于布局的容器组件，方便快速搭建页面的基本结构：
- <el-container> ：外层容器。 当子元素中包含 <el-header> 或 <el-footer>时，全部子元素会垂直上下排列， 否则会水平左右排列。
- <el-header> ：顶栏容器。

- <el-aside> ：侧边栏容器。

- <el-main> ：主要区域容器。

- <el-footer> ：底栏容器。

- > 注意：
  >
  > 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， <el-container> 的直接子元素必须是后四个组件中的一个或多个。 后四个组件的父元素必须是一个 <el-container>



### 8.2、layout布局组件

- 当我们通过上面的布局容器组件完成了对证额页面的基础结构划分之后，我们就可以通过layout布局组件来对每个结构块内部进行更加精细化的局部，我们也可以直接把#app挂载区域作为一个巨大的容器直接开始通过layout组件进行布局的精细化处理
- layout采用的是栅格布局，通过基础的 24 分栏，迅速简便地创建布局，主要通过以下两个组件来实现
  - el-row 行组件
  - el-col 列组件
  - 具体设置可以查看官网文档

### 8.3、制作左侧导航

- ```vue
  <template>
      <div class="common-layout">
          <el-container>
              <el-header>Header</el-header>
              <el-container>
                  <el-aside width="200px">Aside</el-aside>
                  <el-main>Main</el-main>
              </el-container>
          </el-container>
      </div>
  </template>
  ```

- 通过上面的布局实现了将home分成了三个大组件，首先我们先将左边的容器制作成一个单独的导航组件

- 在views下面新建一个home目录用来管理home.vue页面组件下面使用的子结构组件，在home目录下创建LeftMenu.vue

- 左侧导航我们采用Menu组件制作，简单认识下Menu组件

- <el-menu></el-menu> 菜单组组件，一个完整的菜单导航由它开始

- <el-sub-menu></el-sub-menu> 二级菜单组件

- <el-menu-item></el-menu-item> 菜单项组件，包裹在上面两个组件内部使用

- <el-menu-item-group></el-menu-item-group> 菜单项编组组件，可以嵌套在menu-item的外层将菜单项打包成一个组

- ```vue
  <script setup>
  import { reactive } from 'vue';
  const menuList = reactive([
      {
          title: "首页",
          url: "/index"
      },
      {
          title: "列表管理",
          url: "/list"
      },
      {
          title: "数据管理",
          url: "/data"
      }
  ]);
  </script>
  
  <template>
      <el-aside width="200px">
          <el-menu default-active="1" router>
              <el-menu-item v-for="item in menuList" :key="item.url" :index="item.url">{{ item.title }}</el-menu-item>
          </el-menu>
      </el-aside>
  </template>
  <style scoped></style>
  ```

  

- > 代码分析：
  >
  > 在上面的代码里面，我们使用了一些组件中的属性来完成一些设置，这些的属性的作用：
  >
  > 在el-menu：
  >
  > - default-active 表当当前列中默认的高亮项，取的值是el-menu-item中的index属性值
  >
  > - router是否启用vue-router模式，启用后，el-menu-item中的index属性会作为跳转路径来使用
  >
  > 在el-menu-item：
  >
  > index 作为当前菜单项的唯一标识使用，当el-menu开启了vue-router模式，该属性的值就是你点击当前菜单项之后跳转的路径

### 8.4、elementplus图标使用

- 在调用Menu的时候，官网的Demo实例我们可以看到图标使用，element-plus有自己的图标库，我们可以进行调用

- 安装图标依赖

  - ```cmd
    npm install @element-plus/icons-vue
    ```

    

- 安装自动按需 导入的插件

  - ```cmd
    npm i unplugin-icons -D
    ```

- vite.config.js配置

  - ```js
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import AutoImport from 'unplugin-auto-import/vite';
    import Components from 'unplugin-vue-components/vite';
    import { ElementPlusResolver } from 'unplugin-vuecomponents/resolvers';
    import Icons from 'unplugin-icons/vite';
    import IconsResolver from 'unplugin-icons/resolver';
    import Inspect from 'vite-plugin-inspect';
    // https://vite.dev/config/
    export default defineConfig({
        plugins: [
            vue(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(),
                    // Auto import icon components
                    // 自动导入图标组件
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
            Components({
                resolvers: [
                    // Auto register icon components
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                    // Auto register Element Plus components
                    // 自动导入 Element Plus 组件
                    ElementPlusResolver(),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
            Inspect()
        ],
    });
    ```

- 手动按需导入

  - 在需要使用图标的组件中我们通过安装的@element-plus/icons-vue图标中import导入即可

  - ```cmd
    import { Location,Menu as IconMenu } from '@element-plus/icons-vue';
    ```


- 调用

  - ```vue
    <el-icon><IconMenu /></el-icon>
    ```

  ### 8.5、制作左侧导航路由

- 现在我们使用刚才的模拟数据，实现左侧导航的点击跳转

- 制作home页面下的子路由，新建三个与侧边导航项对应的三个子页面组件

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
          component: () => import('../views/home.vue'), //异步加载
          children: [
              {
                  path: '/index',
                  name: 'index',
                  component: () =>
                      import('../views/home/HomeIndex.vue')
              },
              {
                  path: '/list',
                  name: 'list',
                  component: () =>
                      import('../views/home/HomeList.vue')
              },
              {
                  path: '/data',
                  name: 'data',
                  component: () =>
                      import('../views/home/HomeData.vue')
              }
          ]
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

  - > 注意：
    >
    > 在menuList组件的Menu组件记得开启router模式，这样menu-item组件可以使用使用index属性作为跳转路径使用

- 现在切换显示的二级路由都在home路由的下面，所以我们在home.vue中插入router-view，来显示路由跳转切换的组件

  - ```vue
    <script setup>
    import LeftMenu from './home/leftMenu.vue';
    </script>
    <template>
        <div class="common-layout">
            <el-container>
                <LeftMenu />
                <el-container>
                    <el-header>Header</el-header>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </template>
    ```

### 8.6、左侧导航图标动态渲染

- 现在的情况，我们的左侧导航是根据数据渲染出来的，而并非是写死的，而我们的图标调用是通过组件的虚拟标签来调用的，那么意味着，我们需要把图标组件写入到模板中取，但是一旦这么写了就相当把图标写死了，渲染出来的菜单项的前置图标都会是一样的，所以我们需要对图标进行动态渲染，也就是说我们需要把图标组件作为一个动态组件进行渲染

- vue提供了一个内置组件 专门用来实现动态组件的渲染，这个组件本身相当于一个占位符，需要使用is属性来指定绑定的组件

- 现在我们先手动导入menuList中需要使用的图标

- > 注意：
  >
  > 我们这里不推荐使用自动导入，因为我们现在需要将图标作为动态组件进行渲染，这种情况下自动导入的图标组件在进行渲染的时候会出现安装不上情况，所以如果我们需要将图标组件作为动态组件渲染，最好采用手动导入

- ```vue
  <script setup>
  import { reactive } from 'vue';
  import { Location, Notification, Setting } from '@elementplus/icons-vue';
  const menuList = reactive([
      {
          title: "首页",
          url: "/index",
          icon: Location
      },
      {
          title: "列表管理",
          url: "/list",
          icon: Notification
      },
      {
          title: "数据管理",
          url: "/data",
          icon: Setting
      }
  ]);
  </script>
  
  <template>
      <el-aside width="200px">
          <el-menu class="el-menu-vertical-demo" default-active="1" router>
              <el-menu-item v-for="item in menuList" :key="item.url" :index="item.url">
                  <el-icon>
                      <component :is="item.icon"></component>
                  </el-icon>
                  {{ item.title }}
              </el-menu-item>
          </el-menu>
      </el-aside>
  </template>
  ```

### 8.7、制作左侧导航激活项保持

- 现在我们可以通过路由实现左侧导航的切换跳转，但是，当我们刷新页面的时候，因为路径没有变化所有右侧的内容不会变化，但是，左侧对应的激活菜单项的高亮样式不见了
- 我们的el-menu中有一个属性default-active可以通过设置于menu-item的index属性一样的值来确定当前menu组件的默认激活项 ，但是，现在因为我们在el-menu组件上面开启了vue-router模式，所以，我们所有的el-menu-item中的index属性都被拿来当做跳转路径了，所以，如果我们想设置默认激活就需要把el-menu的default-active属性的值设置成对应路径即可
- 在leftMenu.vue中需要使用路由对象中的path
- ```vue
  <script setup>
  import { reactive, shallowReactive } from 'vue';
  import { Location, Notification, Setting } from '@element-plus/icons-vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const menuList = shallowReactive([
      {
          title: "首页",
          url: "/index",
          icon: Location
      },
      {
          title: "列表管理",
          url: "/list",
          icon: Notification
      },
      {
          title: "数据管理",
          url: "/data",
          icon: Setting
      }
  ]);
  </script>
  <template>
      <el-aside width="200px">
          <!-- route表示，当点击哪个导航项就把哪个路由单体对象的path作为
  default-active的值来保持激活项 -->
          <el-menu class="el-menu-vertical-demo" :default-active="route.path" router>
              <el-menu-item v-for="item in menuList" :key="item.url" :index="item.url">
                  <el-icon>
                      <component :is="item.icon"></component>
                  </el-icon>
                  {{ item.title }}
              </el-menu-item>
          </el-menu>
      </el-aside>
  </template>
  ```

### 8.8、制作二级导航菜单（制作递归组件）  

- 我们的侧边导航是通过数据渲染出来的动态导航，那么，如果现在要制作二级导航，也需要对应的数据，我们先准备一些模拟数据

- 在原有一级导航数据下面添加一个children把其作为管理二级导航的数组

- ```js
  const menuList = shallowReactive([
      {
          title: "首页",
          url: "/index",
          icon: Location
      },
      {
          title: "列表管理",
          url: "/list",
          icon: Notification,
          children: [
              {
                  title: "列表信息",
                  url: "/list/info",
                  icon: Location
              },
              {
                  title: "管理信息",
                  url: "/list/manage",
                  icon: Location
              },
          ]
      },
      {
          title: "数据管理",
          url: "/data",
          icon: Setting
      }
  ]);
  ```

  - 现在将菜单项组组件做一个二次封装，做成一个导航项组件做递归使用
  - 新建NavItem.vue
    - 在组件内部我们将使用el-menu-item和el-sub-menu这两套组件通过v-if和v-else的搭配判断导航数据中是否children来决定渲染哪套

```vue
<script setup>
const props = defineProps({
    item: {
        type: Object
    }
});
</script>
<template>
    <el-menu-item v-if="!item.children" :index="props.item.url">
        <el-icon>
            <component :is="props.item.icon"></component>
        </el-icon>
        {{ props.item.title }}
    </el-menu-item>
    <el-sub-menu v-else>
        <template #title>
            <el-icon>
                <component :is="props.item.icon">
                </component>
            </el-icon>
            <span>{{ props.item.title }}</span>
        </template>
        <!-- 这里是关键，在自己组件内部调用自己，形成递归 -->
        <nav-item v-for="sub in props.item.children" :key="sub.url" :item="sub"></nav-item>
    </el-sub-menu>
</template>
<style scoped></style>
```

- > 代码分析：
  >
  > 上面的模板中同时写入el-menu-item和el-sub-menu，然后通过父组件传入的菜单项数据判断是否有children，如果有就代表有二级导航现需要渲染，所以v-if + v-else的组合会把el-menu-item给注释掉，渲染带有开关效果的el-sub-menu做二级导航组件，同理，当我们没有children的似乎和就把el-sub-menu注释掉，只渲染el-menu-item

- 修改LeftMenu.vue

  ```vue
  <script setup>
  import { reactive, shallowReactive } from 'vue';
  import { Location, Notification, Setting } from '@element￾plus/icons-vue';
  import { useRoute } from 'vue-router';
  import NavItem from '../../components/NavItem.vue';
  const route = useRoute();
  const menuList = shallowReactive([
      {
          title: "首页",
          url: "/index",
          icon: Location
      },
      {
          title: "列表管理",
          url: "/list",
          icon: Notification,
          children: [
              {
                  title: "列表信息",
                  url: "/list/info",
                  icon: Location,
              },
              {
                  title: "管理信息",
                  url: "/list/manage",
                  icon: Location
              },
          ]
      },
      {
          title: "数据管理",
          url: "/data",
          icon: Setting
      }
  ]);
  </script>
  <template>
      <el-aside width="200px">
          <el-menu class="el-menu-vertical-demo" :default-active="route.path" router>
              <NavItem v-for="item in menuList" :key="item.url" :item="item" />
          </el-menu>
      </el-aside>
  </template>
  <style scoped></style>
  ```

### 8.9、制作二级子路由的页面跳转

```js
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
        component: () => import('../views/home.vue'), //异步加载
        children: [
            {
                path: '/index',
                name: 'index',
                component: () =>
                    import('../views/home/HomeIndex.vue')
            },
            {
                path: '/list',
                name: 'list',
                component: () =>
                    import('../views/home/HomeList.vue'),
                children: [
                    {
                        path: '/list/info',
                        name: 'info',
                        component: () =>
                            import('../views/home/HomeList/HomeListInfo.vue')
                    },
                    {
                        path: '/list/manage',
                        name: 'manage',
                        component: () =>
                            import('../views/home/HomeList/HomeListManage.vue')
                    }
                ]
            },
            {
                path: '/data',
                name: 'data',
                component: () =>
                    import('../views/home/HomeData.vue')
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../views/login.vue')
    }
];
```

- 然后再homeList.vue中添加router-view实现页面切换即可

## 9、制作右侧header

- 右侧的header部分，我们主要制作两个东西，分别是面包屑导航和退出登录按钮

### 9.1、面包屑导航

- 简单认识以下面包屑导航，其实面包屑导航类似于一个有序列表

  - `<el-breadCrumb></el-breadCrumb>` 面包屑导航组件
  - `<el-breadCrumb-item></el-breadCrumb-item>` 面包屑导航项组件

- **在el-breadCrumb上有两个属性**

  - separator ：可以定义面包屑导航项之间的分隔符，值是一个字符串

  - separator-icon ： 可以指定面包屑导航项之间的分隔符为一个图标

- **在el-breadCrumb-item上有一个属性**
  - `:to="{ path: '/' }"` 可以设置导航项点击之后跳转的路由

- **创建BreadCrumb.vue组件**

  - ```vue
    <script setup>
    </script>
    <template>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        </el-breadcrumb>
    </template>
    <style scoped></style>
    ```

- 然后把该组件导入到home.vue中在header中调用

- 接下来的问题就是面包屑导航中渲染的数据从何而来？

  - 在面包屑导航内渲染的数据应该是与左侧导航当前选中的菜单项的内容保持一致的，我们当前跳转到哪个菜单项对应的页面，面包屑导航的内容就是哪个，也就是面包屑导航渲染出来的内容完全由路由跳转来决定，那么，谁决定我们就找谁要数据
  - 在路由单体当中还可以设置一个meta的属性，这个属性包含的对象信息是可以由我们来自定义的，我们就用这个来定义数据
  - 在每个路由上面添加一个meta

```js
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
        meta: { title: "首页" },
        component: () => import('../views/home.vue'), //异步加载
        children: [
            {
                path: '/index',
                name: 'index',
                meta: { title: "首页" },
                component: () =>
                    import('../views/home/HomeIndex.vue')
            },
            {
                path: '/list',
                name: 'list',
                meta: { title: "列表管理" },
                component: () =>
                    import('../views/home/HomeList.vue'),
                children: [
                    {
                        path: '/list/info',
                        name: 'info',
                        meta: { title: "列表信息" },
                        component: () =>
                            import('../views/home/HomeList/HomeListInfo.vue')
                    },
                    {
                        path: '/list/manage',
                        name: 'manage',
                        meta: { title: "信息管理" },
                        component: () =>
                            import('../views/home/HomeList/HomeListManage.vue')
                    }
                ]
            },
            {
                path: '/data',
                name: 'data',
                meta: { title: "数据管理" },
                component: () =>
                    import('../views/home/HomeData.vue')
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../views/login.vue')
    }
];
```

- 在breadCrumb.vue中调用路由对象中的title值

- ```vue
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  const route = useRoute();
  const list = ref([]);
  onMounted(() => {
      list.value = route.matched;
      console.log(route.matched);
  });
  </script>
  <template>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in list" :key="index" :to="{ path: '/' }">{{ item.meta.title
              }}</el-breadcrumb-item>
      </el-breadcrumb>
  </template>
  ```

- > 代码分析：
  >
  > 上面我们使用route.matched属性，这个属性会获取当前跳转路径下每一级对应的路由单体对象，把每一级的路由单体对象作为数组保存下来，我们通过遍历这个数组来或取每一级子路由对象中的meta
  >
  > 以上我们搞定之后，虽然渲染出来了，但是切换页面的时候，面包屑导航依然还是第一次开打的内容，不会实时改变
  >
  > 原因：
  >
  > 我们点击左侧导航项切换页面的时候，实际上切换的是home.vue中的main的部分，而我们现在是spa单页面应用，实现的是局部跟新，也就是我们在切换页面的时候并不会整个页面刷新，而面包屑导航组件在home.vue的header里面，并不在更新范围内，所以导致breadCrumb组件的生命周期不跟新

- 通过监听解决面包屑导航内容更新

```vue
<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
const route = useRoute();
const list = ref([]);
watch(route, (newVal) => {
    list.value = newVal.matched;
});
onMounted(() => {
    list.value = route.matched;
});
</script>
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in list" :key="index" :to="{ path: '/' }">{{ item.meta.title
            }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
```

- 实现点击面包屑导航进行跳转

- ```vue
  <template>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in list" :key="index" :to="item.path">{{ item.meta.title
              }}</el-breadcrumb-item>
      </el-breadcrumb>
  </template>
  ```

  

- 现在再来切换到首页可以看到，面包屑导航会显示两个首页，解决如下

- ```vue
  import { useRoute } from 'vue-router';
  import { ref, onMounted, watch } from 'vue';
  const route = useRoute();
  const list = ref([]);
  const getBreadCrumb = (matched) => {
      if (matched.length && matched[1].name == "index") {
          list.value = matched.slice(0, 1);
      } else {
          list.value = matched.slice(1, matched.length);
      }
  };
  watch(route, (newVal) => {
      getBreadCrumb(newVal.matched);
  });
  onMounted(() => {
      list.value = route.matched;
  });
  ```

### 9.2、退出登录

-  退出登录的功能其实就是清除掉全局状态中记录的用户信息和缓存

  ```vue
  <script setup>
  import LeftMenu from './home/LeftMenu.vue';
  import BreadCrumb from '../components/BreadCrumb.vue';
  import { ref } from "vue";
  import { userLoginInfo } from '../store/login';
  import { useRouter } from 'vue-router';
  const dialogVisible = ref(false);
  const store = userLoginInfo();
  const router = useRouter();
  const goBack = () => {
      dialogVisible.value = false;
      store.$patch((state) => {
          state.userInfo = null;
          state.userToken = null;
      });
      localStorage.clear();
      router.push({ name: 'login' });
  };
  </script>
  <template>
      <div class="common-layout">
          <el-container>
              <LeftMenu />
              <el-container>
                  <el-header class="flex-row a-c j-s-b">
                      <BreadCrumb />
                      <el-button type="primary" @click="dialogVisible =
                          true">
                          退出登录
                      </el-button>
                      <el-dialog v-model="dialogVisible" width="500" :before-close="handleClose">
                          <span>是否确定退出登录？</span>
                          <template #footer>
                              <div class="dialog-footer">
                                  <el-button @click="dialogVisible = false">取消
                                  </el-button>
                                  <el-button type="primary" @click="goBack">
                                      确认
                                  </el-button>
                              </div>
                          </template>
                      </el-dialog>
                  </el-header>
                  <el-main>
                      <router-view></router-view>
                  </el-main>
              </el-container>
          </el-container>
      </div>
  </template>
  ```

## 10、Echart数据可视化

- 安装数据可视化包

- ```cmd
  npm i echart --save
  ```

- 新建图表组件chart.vue ，导入echart

- ```vue
  <template>
  
  </template>
  <script setup>
      import * as echarts from 'echarts';
  </script>
  ```

- 图表数据作为我们首页展示内容，将chart.vue组件导入到homeIndex当中

### 10.1、制作图表数据

- 其实制作过程可以分为三步
  - 1、定义容器
  - 2、进行配置
  - 3、数据渲染

- 现在我们以一个折线图来制作一下
- **定义容器**

```vue
<template>
    <div ref="chart" style="width:100%;height:300px;"></div>
</template>
<script setup>
import * as echarts from '../../node_modules/echarts';
import { ref } from 'vue';
const chart = ref(null);
const init = () => {
    const myChart = echarts.init(chart.value);
};
</script>
```

- **进行配置**
- 在初始化方法里面声明一个对象作为配置对象

```vue
<script setup>
import * as echarts from '../../node_modules/echarts';
import { ref, onMounted } from 'vue';
const chart = ref(null);
const init = () => {
    const myChart = echarts.init(chart.value);
    let option = {
        xAxis: {
            type: 'category',
            data: ['衣服', '裤子', '帽子']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 500],
                type: "line"
            }
        ]
    };
    myChart.setOption(option);
};
onMounted(() => {
    init();
});
</script>
```

> 代码分析：
>
> 在option对象内的几个配置项分别定义了图表的基础参数：
>
> - xAxis：对图表横向坐标进行配置
>   - type 设置横向坐标的类型，category表示为类目型
>   - data 设置每个分类的名称
>
> - yAxis：对图表纵向坐标进行配置
>
>   - type 设置纵向坐标的类型，value表示为值类型
>
> - series：在图表中展示的数据，这是一个数组，一个数组元素代表一条在图表中展示的数据
>
>   - data 具体的数据值
>
>   - type 图表数据的表现形式，这里使用的line 表示折线图
>
> 最后记得执行`myChart.setOption(option)`将配置传入到容器中

- **数据渲染**

- ```js
  onMounted(() => {
      init()
  })
  ```

- 这样，一个基础的图表就完成了，但是我们发现使用elementPlus制作是弹性布局，但是我们的图表不会自适应

### 10.2、响应式图表制作

- 我们图表提供了一个resize方法，可以把图表变成响应式

- 在我们的ini方法里面添加一个window的监听即可

- ```js
  window.addEventListener('resize',() => {
      myChart.resize();
  })
  ```


### 10.3、图表组件复用

- 我们在实际应用中，可能会使用到多张图表，如果我们每一张图表都创建一个组件浪费且麻烦

- 我们知道常规的图表主要的用处就是展示数据，那么，我们可以组件传值的方式，在不同地方调用同一个组件传入不同的数据，从而展示不同的数据图表
- 在chart.vue中制作接收数据的接口

```js
const props = defineProps({
    chartData: {
        type: Array,
        default: () => [10, 20, 30, 40, 50]
    },
    chartType: {
        type: String,
        default: () => 'line'
    },
    categoryType: {
        type: Array,
        default: () => ['a', 'b', 'c']
    }
});
const init = () => {
    const myChart = echarts.init(chart.value);
    let option = {
        xAxis: {
            type: 'category',
            data: props.categoryType
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: props.chartData,
                type: props.chartType
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
```

- 在homeIndex.vue 中重复调用chart.vue传入不同的数据

- ```vue
  <template>
      <h2>index</h2>
      <Chart chartType="line" :chartData="[20, 50, 30, 50]" :categoryType="['1', '2', '3', '4']" />
      <Chart chartType="bar" :chart-data="[300, 230, 500, 400]" :category-type="['a', 'b', 'c', 'd']" />
      <Chart chart-type="pie" :chart-data="[50, 60, 20]" :category-type="['e', 'd', 'f']" />
  </template>
  ```

### 10.4、map地址图表制作

- 新建map.vue内部的图表制作方式与chart.vue里面一样的，把数据接收的接口删除掉
- 下载地图数据

- [DataV.GeoAtlas地理小工具系](https://datav.aliyun.com/portal/school/atlas/area_selector)

```vue
<template>
    <div ref="chart" style="width:100%;height:700px;"></div>
</template>
<script setup>
import * as echarts from '../../node_modules/echarts';
import chinaMap from '../utils/chinaMap.json';
import { ref, onMounted } from 'vue';
const chart = ref(null);
const init = () => {
    const myChart = echarts.init(chart.value);
    echarts.registerMap('china', chinaMap);
    let option = {
        title: {
            text: "中国地图"
        },
        series: [
            {
                type: 'map',
                map: 'china'
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    });
};
onMounted(() => {
    init();
});
</script>
```

- 修改地图样式
- 通过label和 itemStyle设置样式

```js
let option = {
    title: {
        text: "中国地图"
    },
    series: [
        {
            type: 'map',
            map: 'china',
            label: {
                //对地图文字设置
                show: true, //是否显示地图文字
                color: '#f00', //字体颜色
                fontSize: 14
            },
            zoom: 1.2,
            itemStyle: {
                borderColor: '#0f0',
                borderWidth: 2,
                areaColor: '#00f'
            }
        }
    ]
};
```

- **根据数据制作热力图**\
  - 地图图表的作用大部分情况下应用的都是热力图，根据数据来决定地图中不同区域的热点显示，通过series数组内的元素对象中的添加的data属性设置

```js
series: [
    {
        type: 'map', map: 'china',
        data: [
            { name: "湖南省", value: '20000' },
            { name: "西藏自治区", value: '10000' }
        ],
        label: {
            //对地图文字设置
            show: true, //是否显示地图文字
            color: '#f00', //字体颜色
            fontSize: 14
        },
        zoom: 1.2,
        itemStyle: {
            borderColor: '#0f0',
            borderWidth: 2,
            areaColor: '#00f'
        }
    }
];
```

- 制作热力分段表

```js
let option = {
    title: {
        text: "中国地图"
    },
    series: [
        {
            type: 'map',
            map: 'china',
            data: [
                { name: "河南省", value: '30000' },
                { name: "西藏自治区", value: '10000' }
            ],
            label: {
                //对地图文字设置
                show: true, //是否显示地图文字
                color: '#f00', //字体颜色
                fontSize: 14
            },
            zoom: 1.2,
            itemStyle: {
                borderColor: '#0f0',
                borderWidth: 2,
                areaColor: '#00f'
            }
        }
    ],
    visualMap: { //虚拟地图热力分段设置
        min: 800,
        max: 30000,
        text: ['high', 'low'],
        realTime: false,
        inRange: {
            color: ['lightskyblue', 'yellow', 'red']
        }
    }
};
```

- 现在我们就可以看到地图中会根据data中的数据显示对应的热力分段颜色，即使应用用我们需要请求热力数据传给data