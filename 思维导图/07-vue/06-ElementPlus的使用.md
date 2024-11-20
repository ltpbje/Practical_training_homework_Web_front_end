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