# vue-router前端路由

- **前端路由就是再浏览器中控制页面的展示**
- 现在我们使用vue是一个单页面应用开发的框架，那么就会有一个问题，只有一个html文件，我们怎么跳转？
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    #login,
    #register {
        display: none;
        height: 3000px;
    }
    
    #login {
        background-color: lightgreen;
    }
    
    #register {
        background-color: lightcoral;
    }
    
    #login:target,
    #register:target {
        display: block;
    }
</style>

<body>

    <div id="login">
        <h2>我是一个登录页面</h2>
        <a href="#box">点我</a>
    </div>
    <div id="register">
        <h2>我是一个注册页面</h2>
    </div>
    <div id="box">
        我是box
    </div>



</body>

</html>
```

前端路由的本质其实就是改变地址栏中的hash值来告知系统“路径”变了

## 1、vue-router的创建

- - 当我们下载好vue-router的文件并引入之后，我们就可以开始创建前端路由，vue-router是vue全家桶下面的一个框架，它主要实现的就是前端路由
- 路由创建步骤：
  - 1、通过 VueRouter.createRouter()方法创建路由对象router
  - 2、在创建路由的时候进行配置，主要配置路由模式和路由单体对象
  - 3、在路由单体对象中配置路径，组件，路由名
  - 4、将创建好的路由对象router通过vue实例对象中的use方法加载到vue应用实例对象中
  - 注意：

  - 其中路由单体对象中，path代表路由跳转路径，component代表路由跳转所匹配的组件，name表示路由单体对象的名称【名称不能重复】

  - 如果我们希望由一个路由重定向到另外一个路由，可以使用redirect

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .login {
            background-color: lightgreen;
        }

        .register {
            background-color: lightcoral;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 这个组件可以理解成是一个动态组件  具体渲染哪个组件由路由对象来决定-->
        <router-view></router-view>
    </div>
    <template id="temp1">
        <h2 class="login">我是一个登录页面</h2>
    </template>
    <template id="temp2">
        <h2 class="register">我是一个注册页面</h2>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script src="./js/vue-router4.global.js"></script>
    <script>
        let Login = {
            template: '#temp1'
        };
        let Register = {
            template: '#temp2'
        };
        // 创建路由对象
        const router = VueRouter.createRouter({
            history: VueRouter.createWebHashHistory(),
            routes: [
                {
                    path: '/',
                    // 重定向
                    redirect: {
                        name: 'login'
                    }
                },
                {
                    path: '/login',
                    component: Login,
                    name: 'login'
                },
                {
                    path: '/register',
                    component: Register,
                    name: 'register'
                }
            ]
        });
        const app = Vue.createApp({
            components: {
                Login,
                Register
            }
        });
        //加载路由模块
        app.use(router);
        app.mount('#app');
    </script>

</body>

</html>
```

> 路由创建步骤：
>
> 1、通过 VueRouter.createRouter()方法创建路由对象router
>
> 2、在创建路由的时候进行配置，主要配置路由模式和路由单体对象
>
> 3、在路由单体对象中配置路径，组件，路由名
>
> 4、将创建好的路由对象router通过vue实例对象中的use方法加载到vue应用实例对象中
>
> 注意：
>
> 其中路由单体对象中，path代表路由跳转路径，component代表路由跳转所匹配的组件，name表示路由单体对象的名称【名称不能重复】
>
> 如果我们希望由一个路由重定向到另外一个路由，可以使用redirect
> 

## 2、router-link与router-view

- router-link跳转到对应路由
- router-view路由的出口展示的地方

当我们把路由地址配置之后，我们取访问路由的时候会发现没有效果的

如果希望在某一个地方根据前端路由取展示内容，则可以使用router-view 来完成，而组件的主要作用就是来根据路由对象绝对渲染的组件

```html
<div id="app">
    <!-- 这个组件可以理解成是一个动态组件，具体渲染哪个组件由路由对象来决定 --
    >
    <router-view></router-view>
</div>
```

在`vue-router`中还有另外一个内置组件叫做`router-link`，它决定你跳转到哪一个路由

```html
<template id="temp1">
    <h2 class="login">我是一个登录页面</h2>
    <router-link :to="{name:'register'}">跳转到注册</router-link>
</template>
<template id="temp2">
    <h2 class="register">我是一个注册页面</h2>
    <router-link :to="{name:'login'}">跳转到登录</router-link>
</template>
```

> 代码分析：
>
> router-link会默认帮我们生成一个a标签，然后里面会有以各to属性来决定条件到哪个路由
> 

## 3、api跳转

在上面的代码中，我们已经可以使用router-link来完成页面的跳转，但是，routerlink会帮我们生成一个a标签，如果我们不希望通过a标签跳转，而是想通过JS代码取实现跳转，怎么办?

### **push跳转**

```js
this.$router.push({
    name:"register"
})
```

> 注意：push跳转会形成历史记录，所以可以在浏览器当中后退
> 

### **通过back() 退回到之前页面**

```js
this.$router.back()
```

### 通过replace() 跳转页面

```JS
this.$router.replace({
    name:"register"
})
```

这种跳转页会跳转到新的页面，但是它不会把新跳转的路径添加到历史记录中，所以无法用back返回之前的页面

## 4、路由传值

- ####    路由决定页面上面显示什么组件，那么同时要使用组件实现单页面应用开发，从而实现虚拟页面，即然是页面就一定会存在跨页面传值的情况


### 4.1、通过query进行传值

```js
methods: {
    goTo() {
        this.$router.push({
            name: 'register',
            query: {
                userName: this.userName,
                age: 18
            }
        });
    }
},
```

可以看到地址栏会多出search参数

```cmd
http://127.0.0.1:5501/05-query%E4%BC%A0%E5%80%BC.html#/register?userName=%E5%BC%A0%E4%B8%89&age=18
```

当跳转到虚拟页面（组件），我们就可以通过 this.$route的路由单体对象取完成取值

```js
created() {
    console.log(this.$route.query.userName);
    this.userName = this.$route.query.userName;
},
```

> 代码分析：
>
> 在路由里面传值，第一个页面传，第二个页面接收
>
> 如果之前页面是通过query传递过来的，那么我们在目标页面就通过query来接收

### 4.2、params传值

- 这种方式我们叫做强制性传值，也叫做路径传值，它比query传值更加严谨一些

- ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          .login {
              background-color: lightgreen;
          }
  
          .register {
              background-color: lightcoral;
          }
      </style>
  </head>
  
  <body>
      <div id="app">
          <!-- 这个组件可以理解成是一个动态组件  具体渲染哪个组件由路由对象来决定-->
          <router-view></router-view>
      </div>
      <template id="temp1">
          <input type="text" v-model="userName">
          <h2 class="login">我是一个登录页面</h2>
          <button @click="goTo">跳转注册</button>
      </template>
      <template id="temp2">
          <h2 class="register">我是一个注册页面--{{userName}}</h2>
          <button @click="backTo">返回</button>
      </template>
      <script src="./js/vue3.global.js"></script>
      <script src="./js/vue-router4.global.js"></script>
      <script>
          let Login = {
              template: '#temp1',
              data() {
                  return {
                      userName: ''
                  };
              },
              methods: {
                  goTo() {
                      // 使用this.$router.push()方法跳转到register路由，并传递参数userName为'张三'
                      this.$router.push({
                          name: 'register',
                          params: {
                              userName: '张三'
                          }
                      });
                  }
              },
          };
          let Register = {
              template: '#temp2',
              data() {
                  return {
                      userName: ''
                  };
              },
              methods: {
                  backTo() {
                      this.$router.back();
                  }
              },
              created() {
                  console.log(this.$route.params.userName);
                  this.userName = this.$route.params.userName;
              },
          };
          // 创建路由对象
          const router = VueRouter.createRouter({
              history: VueRouter.createWebHashHistory(),
              routes: [
                  {
                      path: '/',
                      // 重定向
                      redirect: {
                          name: 'login'
                      }
                  },
                  {
                      path: '/login',
                      component: Login,
                      name: 'login'
                  },
                  {
                      path: '/register/:userName',
                      component: Register,
                      name: 'register'
                  }
              ]
          });
          const app = Vue.createApp({
              components: {
                  Login,
                  Register
              },
              methods: {
  
              },
          });
          //加载路由模块
          app.use(router);
          app.mount('#app');
      </script>
  
  </body>
  
  </html>
  ```

  > - 代码分析：
  >
  > - params传值也可以使用push中的配置对象传递
  >
  > - ```js
  >   this.$router.push({
  >   	name:"register",
  >       params:{
  >           userName:"zhangsan"
  >       }
  >   })
  >   ```
  >
  > - 同时，需要在目标页面的路由单体对象中的path上设置接收参数
  >
  > - ```js
  >   {
  >       path:"/register/:userName",
  >       component:Register,
  >       name:"register"
  >   }
  >   ```
  >
  > - 然后就可以在目标页面的$route中调出
  >
  > - ```js
  >   this.$route.params.userName
  >   ```