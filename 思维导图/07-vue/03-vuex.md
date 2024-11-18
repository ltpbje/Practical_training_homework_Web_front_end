# vuex全局状态管理

## 1、什么是全局状态

- 在说这个问题 之前，我们先弄清楚一个点，为什么需要全局状态？

- 之前学习vue的适合，我们知道如果想实现组件之间的传值，我们有以下几种

  - 1、props父组件向子组件传递

  - 2、emit自定义事件，可以子向父传递

  - 3、provide / inject 实现跨组件传值，这种传值也只能基于父子关系【vue3版本支持，这种发方案要遵循数据流的单向性，所以子组件不能向父组件注入数据】

- 上面三种数据传递方式，各有各的特点，props使用简单的父子组件传值，emit只是适用于父子关系，provide / inject虽然可以实现跨级的传递，但是并不能实现兄弟之间的传递

- 对于这种复杂的数据共享问题，vue的内部提供了全局状态管理作为解决方案

## 2、vue的全局状态管理工具

- 根据上面的需求，我们现在需要一个全局的区域取储存我们的数据，这个区域怎么建立，怎么操作？在vue全家桶下，要实现这个方案有很多种办法，目前比较主流的就2个

1、vuex

2、pinia

## 3、创建store

- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**

- ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  
  <body>
      <div id="app">
       
      </div>
      
      <script src="./js/vue3.global.js"></script>
      <script src="./js/vuex.global.js"></script>
      <!-- <script src="./js/vue-router4.global.js"></script> -->
      <script>
         const store = Vuex.createStore({
          
         })
         const app = Vue.createApp({
             
         })
         app.use(store);
         app.mount("#app")
      </script>
  
  </body>
  

## 4、vuex的内部原理
### 4.1、state状态

- 我们可以把state就认为成vue里面的data，用于储存全局的状态（数据），也就是相当于一个全局变量，但是于全局变量不同的是全局状态的数据都是响应式的
- ```js
    state:{
        nickName:"zhangsan"
    }
	```

- 当我们在state里面定义了一个变量之后，这样在所有的组件种就可以通过`this.$store.state.nickName `调用nickName的值

- > 注意：
  >
  > 使用state调用全局状态的时候不能赋值，如果要修改需要遵循vuex的内部逻辑

### 4.2、mutations转换

- 这里的选项内写的就是改变state里面的数据的方法

```js
//所有状态都需要通过mutations进行修改
mutations:{
    setNickName(state,nickName){
        state.nickName = nickName;
    }
}
```

> - 说明：
>
>   - 在mutations当中的方法都可以接收到至少两个参数
>
>     -  参数1：全局状态state
>
>     -  参数2：actions中传递过来的参数

### 4.3、actions行动

- Action 类似于 mutation，不同在于：

  - Action 提交的是 mutation，而不是直接变更状态。

  - Action 可以包含任意异步操作。

- 乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 **mutation 必须同步执行**这个限制么？Action 就不受约束！我们可以在 action 内部执行**异步**操作：

```js
//acitons里面也都是方法，这些方法用于提交修改任务
//acitons会其内部的方法的第一个参数注入一个context，我们可以从里面解构出来一
个commit用来提交任务
actions:{
    setNickName({commit},nickName){
        commit("setNickName",nickName)
    }
}
```

> - 说明：
>
>  - 这里actions中的方法主要用来提交修改任务，
>
>  - 其中第一个参数接收一个context，在context当中有一个commit用来执行提交任务，所以我们一般直接解构取出来直接使用，
>
>   - 第二个参数，是当组件中调用actions中的方法时传递给acitons用来修改的数据值

- 当我们完成上面的操作之后，我们就可以在组件中通过dispatch方法来完成全局状态的改变

- ```js
  this.$store.dispatch("setNickName","lisi")
  ```


## 5、vuex总结

 - ```html
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <script>
              const store = Vuex.createStore({
                  // 全局状态
                  state: {
                      nickName: 'zhangsan'
                  },
                  // 所有状态都需要通过mutations进行修改
                  mutations: {
                      setNickName(state, nickName) {
                          state.nickName = nickName;
                      }
                  },
                  // acitons里面也都是方法，这些方法可以用于提交修改任务
                  //acitons会其内部的方法的第一个参数注入一个context
                  // 我们可以从里面解构出来一个commit用来提交任务
                  actions: {
                      setNickName({ commit }, nickName) {
                          commit('setNickName', nickName);
                      }
                  },
                  //getters类似于vue中的computed计算属性
                  getters: {
                      money() {
                          return Math.random() * 1000;
                      }
                  }
              });
              const app = Vue.createApp({
                  data() {
                      return {
      
                      };
                  },
                  methods: {
      
                  },
              });
              app.component('aaa', {
                  template: '#temp1',
                  data() {
                      return {
                          nickName: this.$store.state.nickName
                      };
                  },
                  methods: {
                      changeNickName() {
                          this.$store.commit('setNickName', 'lisi');
                          // this.nickName = this.$store.state.nickName;
                      }
                  },
              });
      
              app.use(store);
              app.mount('#app');
          </script>
      
      </body>
      
      </html>
      ```

> - 总结：
>- 关于vuex中的配置项的理解
> 
>  - state用于存放全局状态（全局变量）
> - mutations用于存放全局方法，里面的方法可以调用全局状态
>  - actions用于存放可以调用mutations方法的方法，其中的方法可以在组件中被调用，同时也可以传入组件中的数据
> -  getters 类似于optionsAPI当中的computed作用
>
> - 整体业务逻辑可以理解成，在组件中调用actions的方法同时也可以把组件中的内部数据作为actions方法的参数传入，actions的方法调用mutations的方法，同时可以把组件传入的数据再传递给mutations的方法中，最后mutations的方法可以调用state中的数据进行操作

## 6、vuex快速操作

- 在vuex里面，如果要获取一个状态的数据需要通过 `$store.state.变量名` ，如果要操作一个方法，需要使用 `$store.dispatch方法`，不管哪一种用起来比较麻烦

- vuex提供了快速操作方法

### 6.1、mapState

- 用于将state的值快速的绑定到computed

- **对象语法**

    - ```js
        computed:{
            ...Vuex.mapState({
                nickName:state => state.nickName
            })
        }
        ```

- **数组语法**

  - ```js
    computed:{
        ...Vuex.mapState(["nickName"])
    }
    ```

### 6.2、mapGetters

- 作用在于快速的把getters里面的值绑定到computed

- ```js
  computed:{
      ...Vuex.mapGetters(["money"])
  }
  ```

    > - mapGetters这个地方使用的是数组语法，对象语法貌似不能用

### 6.3、mapActions

- 作用在于把vuex中的actions映射到methods当中直接使用

- ```js
  methods: {
      ...Vuex.mapActions(["setNickName"]),
      changeNickName(){
          this.setNickName("李四");
      }
  }
  ```

  