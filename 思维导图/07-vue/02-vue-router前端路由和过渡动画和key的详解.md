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
  >   

## 5、路由案例

- ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
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
              overflow: auto;
              display: flex;
              flex-direction: column;
          }
  
          .tab-bar {
              height: 60px;
              display: flex;
              justify-content: space-around;
              align-items: center;
              background-color: #f5f5f5;
              border-top: 1px solid #ccc;
          }
  
          .selected {
              color: red;
              font-weight: bold;
          }
  
          .content-box {
              flex: 1;
          }
  
          .page-box {
              height: 100%;
          }
      </style>
  </head>
  
  <body>
      <div id="app">
          <div class="content-box">
              <router-view></router-view>
          </div>
          <ul class="tab-bar">
              <router-link custom :to="{name:'ChooseFood'}" #default="{navigate,isActive}">
                  <li @click="navigate" :class="{selected:isActive}">点餐</li>
              </router-link>
              <router-link custom :to="{name:'Order'}" #default="{navigate,isActive}">
                  <li @click="navigate" :class="{selected:isActive}">订单</li>
              </router-link>
  
              <router-link custom :to="{name:'CateGory'}" #default="{navigate,isActive}">
                  <li @click="navigate" :class="{selected:isActive}">分类</li>
              </router-link>
              <router-link custom :to="{name:'My'}" #default="{navigate,isActive}">
                  <li @click="navigate" :class="{selected:isActive}">我的</li>
  
              </router-link>
          </ul>
      </div>
      <template id="temp1">
          <div class="page-box" style="background-color: green;">
              <h2>这是订餐页面</h2>
          </div>
      </template>
      <template id="temp2">
          <div class="page-box" style="background-color: lightblue;">
              <h2>这是订单页面</h2>
          </div>
      </template>
      <template id="temp3">
          <div class="page-box" style="background-color: gold;">
              <h2>这是分类页面</h2>
          </div>
      </template>
      <template id="temp4">
          <div class="page-box" style="background-color: orangered;">
              <h2>这是我的页面</h2>
          </div>
      </template>
  
      <script src="./js/vue3.global.js"></script>
      <script src="./js/vue-router4.global.js"></script>
      <script>
          // 定义一个名为ChooseFood的对象
          let ChooseFood = {
              // 模板使用id为temp1的模板
              template: '#temp1',
          };
          let Order = {
              template: '#temp2',
  
          };
          let CateGory = {
              template: '#temp3',
  
          };
          let My = {
              template: '#temp4',
  
          };
          // 创建路由对象
          const router = VueRouter.createRouter({
              history: VueRouter.createWebHashHistory(),
              routes: [
                  {
                      path: '/',
                      redirect: {
                          name: 'ChooseFood'
                      }
                  },
                  {
                      path: '/chooseFood',
                      component: ChooseFood,
                      name: 'ChooseFood'
                  },
                  {
                      path: '/order',
                      component: Order,
                      name: 'Order'
                  },
                  {
                      path: '/category',
                      component: CateGory,
                      name: 'CateGory'
                  },
                  {
                      path: '/my',
                      component: My,
                      name: 'My'
                  },
              ]
          });
          const app = Vue.createApp({
              components: {
                  ChooseFood,
                  Order,
                  CateGory,
                  My
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

  - > 代码分析：
    >
    > 在创建路由的时候，我们一般可以归纳成以下几个步骤来看
    >
    > 1、引入vue-router文件，注意，引入的时候一定要在vue框架文件下面引入
    >
    > 2、创建router对象（路由管理对象），通过从VueRouter中调出的静态方法createRouter来创建路由管理对象
    >
    > 3、在创建路由管理对象的是会传入一个匿名配置对象作为createRouter方法的实参，在该配置对象中，我们会主要配置两个选项
    >
    > - history：路由模式，在设置路由模式时使用两个方法来完成
    >
    >   - 第一个：createWebHashHistory() 采用地址栏hash值进行切换
    >
    >   - 第二个：createMemoryHistory() 采用历史记录方式切换
    >
    > - routes：数组，用于设置并储存路由单体对象（路由）
    >
    >   - 每一个路由单体对象都需要设置以下几个配置
    >
    >   - 1、path 跳转路径
    >
    >   - 2、component 跳转路径所指向的组件
    >
    >   - 3、name 路由名称
    >
    > 4、现在我们就可以使用router-link或者方法来实现条件
    >
    > 5、每次跳转显示区域使用router-view组件来设置

# vue过渡动画的使用

## 1、transition

- ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          .box {
              width: 300px;
              height: 300px;
              background-color: red;
          }
      </style>
  </head>
  
  <body>
      <div id="app">
          <button class="button" @click="flag=!flag">切换</button>
          <transition name="fade">
              <div class="box" v-show="flag"></div>
          </transition>
      </div>
  
  
      <script src="./js/vue3.global.js"></script>
      <script src="./js/vue-router4.global.js"></script>
      <script>
  
          const app = Vue.createApp({
              data() {
                  return {
                      flag: true
                  };
              },
          });
          app.mount('#app');
      </script>
  
  </body>
  
  </html>
  ```

  - 在上面的代码中，我们可以看到，当我们取改变flag的时候，box在显示隐藏，那么，我们能不能让这个盒子在显示隐藏的时候执行一个过渡的动画效果

  - 在vue的内部自带动画管理机制，在vue的内部可以直接使用过渡效果，它内部分装了一个transition组件，可以让元素在 进入/离开的时候执行特点的效果

  - ```html
    <transition name="fade">
    	<div class="box" v-show="flag"></div>
    </transition>
    ```

    在上面的代码中，我们将box使用transition包裹，box就可以执行动画，但是现在直接执行是没有效果的，因为要对过渡的过程做相关设置

    以box为例，这里我想实现显示隐藏，所以我们可以把这里分成两个阶段，每个阶段分别还有对应的过程

1. 隐藏之前

2. 隐藏之后

3. 显示之前

4. 显示之后

- ```html
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>
           .box {
               width: 300px;
               height: 300px;
               background-color: red;
           }
   
           /* 现在我们希望盒子实现淡入淡出的效果* */
           /* 进入之前 */
           .fade-enter-from {
               opacity: 0;
           }
   
           /* 进入之后*/
           .fade-enter-to {
               opacity: 1;
           }
   
           /* 离开之前 */
           .fade-leave-from {
               opacity: 1;
           }
   
           /* 离开之后*/
           .fade-leave-to {
               opacity: 0;
           }
   
           /* 进入的过程 */
           .fade-enter-active {
               transition: all 1s linear;
           }
   
           /* 离开的过程 */
           .fade-leave-active {
               transition: all 1s linear;
           }
       </style>
   </head>
   
   <body>
       <div id="app">
           <button class="button" @click="flag=!flag">切换</button>
           <transition name="fade">
               <div class="box" v-show="flag"></div>
           </transition>
       </div>
   
   
       <script src="./js/vue3.global.js"></script>
       <script src="./js/vue-router4.global.js"></script>
       <script>
   
           const app = Vue.createApp({
               data() {
                   return {
                       flag: true
                   };
               },
           });
           app.mount('#app');
       </script>
   
   </body>
   
   </html>
   ```
- 把上面的css代码做些简化：
	- ```css
   /*进入之前与离开之后*/
    .fade-enter-from,.fade-leave-to{
       opacity: 0;
    }
    /*进入之后与离开之前*/
    .fade-enter-to,.fade-leave-from{
       opacity: 1;
    }
    /* 进入的过程与离开的过程 */
    .fade-enter-active,.fade-leave-active{
       transition: all 1s linear;
    }
  
  同时，在transition上面的name属性可以为这个过渡动画起名，然后css选择器的名字就要与name属性的值对应
  

## 2、transition-group

- 当我们需要有多个元素执行过渡效果，则需要使用到transition-group

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* 现在我们希望盒子实现淡入淡出的效果* */
        /* 进入之前 */
        .fade-enter-from {
            opacity: 0;
        }

        /* 进入之后*/
        .fade-enter-to {
            opacity: 1;
        }

        /* 离开之前 */
        .fade-leave-from {
            opacity: 1;
        }

        /* 离开之后*/
        .fade-leave-to {
            opacity: 0;
        }

        /* 进入的过程 */
        .fade-enter-active {
            transition: all 1s linear;
        }

        /* 离开的过程 */
        .fade-leave-active {
            transition: all 1s linear;
        }

        img {
            width: 300px;
            height: 200px;
            position: absolute;
            top: 40px;
        }
    </style>
</head>

<body>
    <div id="app">
        <transition-group name="fade">
            <img v-for="(item,index) in imgList" :src="item" v-show="currentIndex==index" :key="index"></img>
        </transition-group>
        <button @click="currentIndex--">前</button>
        <button @click="currentIndex++">后</button>
    </div>


    <script src="./js/vue3.global.js"></script>
    <script src="./js/vue-router4.global.js"></script>
    <script>

        const app = Vue.createApp({
            data() {
                return {
                    currentIndex: 0,
                    imgList: [
                        "./img/item1.jpg",
                        "./img/item2.jpg",
                        "./img/item3.jpg",
                    ]
                };
            },
            watch: {
                currentIndex(newValue, oldValue) {
                    if (newValue > 2) {
                        this.currentIndex = 0;
                    } else if (newValue < 0) {
                        this.currentIndex = 2;
                    }
                }
            }
        });
        app.mount('#app');
    </script>

</body>

</html>
```

# vue框架中的key详解

- 在列表渲染中，我们都是需要携带一个key属性进行设置的，key属性的值我们需要使用一个不重复的数据作为值来使用
- 因为key这个属性的主要作用就是用来记录列表渲染中每一个列表项的渲染状态，一般来说我们可以最直接直观在列表渲染中接触到的唯一值就是索引，所以很多时候我们会直接使用索引作为key的值来使用
- 但是这是有前提的，就是当列表渲染所使用的数据没有出现增减的情况下，一旦出现增减就有可能出问题

## 1、不推荐使用index作为key值

> - 如果执行的是静态渲染，使用index作为key值无可厚非，如果执行的是动态渲染，则index千万不要作为key的值，否则vue内部的渲染机制会出现错误

- ```html
  <ul>
      <li v-for="(item,index) in stuList" :key="index">学
      号：{{item.sid}} -- 姓名：{{item.sname}}</li>
  </ul>
  ```

  这就是一个静态渲染，因为数组stuList中的数据后面不会发生变化存在的问题

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            width: 300px;
            height: 300px;
            background-color: red;
        }

        /* 现在我们希望盒子实现淡入淡出的效果* */
        /* 进入之前 */
        .fade-enter-from {
            opacity: 0;
        }

        /* 进入之后*/
        .fade-enter-to {
            opacity: 1;
        }

        /* 离开之前 */
        .fade-leave-from {
            opacity: 1;
        }

        /* 离开之后*/
        .fade-leave-to {
            opacity: 0;
        }

        /* 进入的过程 */
        .fade-enter-active {
            transition: all 1s linear;
        }

        /* 离开的过程 */
        .fade-leave-active {
            transition: all 1s linear;
        }
    </style>
</head>

<body>
    <div id="app">
        学号: <input type="text" v-model="sid">
        姓名: <input type="text" v-model="sname">
        <button @click="addData">添加</button>
        <ul>
            <li v-for="(item,index) in stuList" :key="item.sid">
                <input type="checkbox">
                {{item.sname}}----{{item.sid}}
            </li>
        </ul>
    </div>


    <script src="./js/vue3.global.js"></script>
    <!-- <script src="./js/vue-router4.global.js"></script> -->
    <script>

        const app = Vue.createApp({
            data() {
                return {
                    stuList: [
                        { sid: 's001', sname: '张三' },
                        { sid: 's002', sname: '李四' },
                        { sid: 's003', sname: '王五' },
                    ],
                    sod: '',
                    sname: ''
                };
            },
            methods: {
                addData() {
                    this.stuList.unshift({ sid: this.sid, sname: this.sname });
                    this.sid = '';
                    this.sname = '';
                }
            },
        });
        app.mount('#app');
    </script>

</body>

</html>
```

> - 代码分析：
> - 当我们随便勾选一个选项之后，再添加新数据，这个时候会发现，勾选错位了，因为，这里我们再记录渲染状态的时候使用的index，而索引这个东西，它是不跟数据的，当我们再数组的前面添加新元素的之后，之前的老元素的所有索引都会向后移动，与之对应的索引也会发生改变，从而导致了状态记录错误的情况

解决方案：

- 一般来说列表渲染中的数据都是数据库相应回的数据，**而在数据库中我们一般都创建一个id自增列，并且进行唯一和非空的约束，那么这个id值就非常适合用来做key的值，因为它不错位**

- 如果碰到没有id字段的数据，也可以在响应的数据找一些唯一的数据，作为key值也是可以的，只要保证这个值唯一且不是索引

## 2、案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            width: 300px;
            height: 300px;
            background-color: red;
        }

        /* 现在我们希望盒子实现淡入淡出的效果* */
        /* 进入之前 */
        .aaa-enter-from {
            transform: translateY(-150%);
            opacity: 0;
        }

        /* 进入之后*/
        .aaa-enter-to {
            transform: translateY(0);
            opacity: 1;
        }

        /* 离开之前 */
        .aaa-leave-from {
            transform: translateY(0);
            opacity: 1;
        }

        /* 离开之后*/
        .aaa-leave-to {
            transform: translateY(150%);
            opacity: 0;
        }

        /* 进入的过程 */
        .aaa-enter-active {
            transition: all .5s linear;
        }

        /* 离开的过程 */
        .aaa-leave-active {
            transition: all .5s linear;
        }

        .list-box {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
        }

        .list-box>li {
            width: 40px;
            height: 40px;
            background-color: lightblue;
            margin: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>

<body>
    <div id="app">
        <button @click="add">+</button>
        <button @click="sub">-</button>
        <hr>
        <transition-group tag="ul" class="list-box" name="aaa">
            <li v-for="(item,index) in numList" :key="item">{{item}}</li>
        </transition-group>
    </div>


    <script src="./js/vue3.global.js"></script>
    <!-- <script src="./js/vue-router4.global.js"></script> -->
    <script>

        const app = Vue.createApp({
            data() {
                return {
                    numList: [
                        0, 1, 2, 3
                    ],
                    sod: '',
                    sname: ''
                };
            },
            methods: {
                add() {
                    this.numList.push(this.numList.length);
                },
                sub() {
                    let index = parseInt(Math.random() * this.numList.length);
                    this.numList.splice(index, 1);
                    console.log(index);

                },
            },
        });
        app.mount('#app');
    </script>

</body>

</html>
```

