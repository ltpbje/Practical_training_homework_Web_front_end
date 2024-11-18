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

  

# compositionAPI

- 该语法是在vue3中被提出，现在作为vue体系来两种语法风格的其中一种

  - 1、optionsAPI，这种语法它将数据定义在data选项中，方法定义在methods选项中，计算属性定义在computed选项中，监听属性定义在watch选项当中
    - 这种写法优势很明显，对于初学者来讲，很清晰很直观，可以快速上手，但是缺点也很明显，因为数据和方法在不同的选项里面，对于代码少的页面没什么问题，但是对于代码较多的页面，很容易让开发者在阅读代码的时候有很强烈的撕裂感

  - 2、compositionAPI，这种语法，vue不再强调之前的选项，比如，
    - data/methods/computed/watch/生命周期函数，现在的话可以将代码任意组合，同时多出一个函数setup

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
          <h2>{{msg}}</h2>
          <button @click="sayHello">按钮</button>
      </div>
      <template id="temp1">
          <h2>我是a组件---{{$store.state.nickName}}</h2>
          <h2>我是money --{{money}}</h2>
          <button @click="changeNickName">修改状态</button>
      </template>
      <template id="temp2">
          <h2>我是b组件---{{$store.state.nickName}}</h2>
      </template>
      <script src="./js/vue3.global.js"></script>
      <!-- 定义一个模块 -->
      <script type="module">
          const app = Vue.createApp({
              setup(props) {
                  const msg = 'hello';
                  const sayHello = () => {
                      alert('hello');
                  };
                  return {
                      msg,
                      sayHello
                  };
              }
          });
          app.mount('#app');
      </script>
  
  </body>
  
  </html>
  ```

## 1、数据的定义  

- 之前我们的选项式API当中，我们使用data来定义数据，但是新语法里面可以直接定义

- ```js
  const app = Vue.createApp({
      setup(){
          const msg = "hello";
          return {
              msg
          }
      }
  })
  ```

  

	> - 代码分析：
	>
	>   再上面的代码中，我们点击按钮之后，我们发现页面上的数据没有发生变化，这是因为vue3的setup当中所有的数据默认都不会与页面形成相应

### 1.1、通过ref定义响应式数据

- 在vue3种提供了一些特殊函数来完成响应式数据的定义，其中ref可以实现

> - ref实现的是堆与栈的同时相应，也称为全盘响应

- ```js
  const msg = ref('hello');
  const changeMsg = () => {
      msg.value = 'hahahahh';
  };
  ```

  

- 上面我们通过ref定义了基础数据类型，现在通过ref定义一个对象

  - ```js
    // userInfo
    const userInfo = ref({
        userName: '张三',
        age: 18
    });
    const changeUserInfo = () => {
        console.log(userInfo);
    
        userInfo.value = {
            userName: '李四',
            age: 20
        };
    };
    ```

- 总结：

  - 1、ref可以实现全局响应，无论是栈里面的还是堆里面的数据

  - 2、ref定义的数据如果要在setup里面使用，要通过value来调用，如果在页面种使用则不需要value

### 1.2、通过reactive实现堆响应数据

> - reactive只能定义对象，不能定义原始数据类型
> - reactive只能响应堆，不能响应栈

- ```js
  // reactive响应
  const foodList = reactive([
      { foodName: "白菜炒豆腐", price: 5, count: 1 },
      { foodName: "番茄炒蛋", price: 4, count: 1 },
      { foodName: "青椒肉丝", price: 8, count: 1 },
  ]);
  const changePrice = () => {
      foodList[0].price = 6;
  };
  ```

  > - 代码分析：
  >
  >   通过reactive制作的响应式数据不需要通过value来调用
  

##   2、关于方法

- 在vue中的optionsAPI中如果要定义方法，我们需要定义methods，但是在compositionAPI里面，直接在setup函数中定义即可【最好定义成箭头函数】

> - 在上面的例子上我们已经声明过，这里就不专门举例了
>
>   注意：
>
>   函数的用法和之前基本一样，知识定义方式发生变化，该有的参数都有，该有的修饰符也都有，在方法中调用数据或其他方法可以不用this
>   

## 3、计算属性

- 在组合式API中，计算属性作为一个方法使用

  - ```js
    // reactive响应
    const foodList = reactive([
        { foodName: "白菜炒豆腐", price: 5, count: 1 },
        { foodName: "番茄炒蛋", price: 4, count: 1 },
        { foodName: "青椒肉丝", price: 8, count: 1 },
    ]);
    const changePrice = () => {
        foodList[0].price = 6;
    };
    // 计算属性
    const totalMoney = computed(() => {
        let sum = 0;
        foodList.forEach(item => {
            sum += item.price * item.count;
        });
        return sum;
    });
    return {
        foodList,
        changePrice,
        totalMoney
    };
    ```

## 4、监听器

- 现在组合式API中的watch作为一个方法使用

### 4.1、原始数据类型的监听

- ```js
  setup(props) {
      const userName = ref('张三');
      // 普通监听
      // 参数1：需要监听的数据;
      // 参数2：监听到变化之后需要执行的回调函数，该函数可以接收修改之后和修改之前的数据值;
      watch(userName, (newValue, oldValue) => {
          console.log(newValue, oldValue);
  
      });
  
      return {
          userName
      };
  }
  ```

  

- > 代码分析：
  >
  > - watch方法在监听原始数据类型的时候，接收两个参数
  >
  >   - 参数1：需要监听的数据
  >
  >   - 参数2：监听到变化之后需要执行的回调函数，该函数可以接收修改之后和修改之前的数据值

### 4.2、引用数据类型监听（深度监听）

- ```js
  // 深度监听
  // 组合式API会自动根据你监听的数据类型来决定是否进行深度监听 仅能获取到新值
  watch(userInfo, (newValue) => {
      console.log(newValue);
  });
  ```


### 4.3、监听对象下的某个属性

- 组合式API可以监听某一个对象下面的某一个属性

- ```js
  
  // 如果想只监听对象中的某一个属性，需要把这个属性作为第一个参数传入
  // 如果想只监听对象中的某一个属性，需要把这个属性作为第一个参数传入，这个属性需要做成返回值return
  watch(() => userInfo.userName, (newValue, oldValue) => {
      console.log(newValue, oldValue);
  });
  
  return {
      userInfo
  };
  ```

### 4.4、监听多个属性

- ```js
  watch([() => userInfo.age, hobby], () => {
      console.log('我变了');
  });
  return {
      userInfo,
      hobby
  
  };
  ```

  - > 代码分析：
    >
    > 当我们有多个数据需要监听，并且这些数据发生变化之后执行的后续操作都是一致的，这个属性我们可以把多个需要监听的数据作为一个数组，作为watch的第一个参数传入，来实现多个数据的同时监听
    >
    > 而如果多个属性监听的时候，每个数据变化之后要执行的后续操作不一样的，那么就可以同watch的多次调用来实现
    > 

## 5、DOM的选取操作

- 在之前的optionsAPI，我们要操作一个DOM元素需要使用ref，在组合式API当中也是要使用ref，但是操作方式变了

- ```js
  setup() {
      const tit = ref(null);
      const abc = () => {
          tit.value.innerText = 'hahahahahhahh';
          console.dir(tit.value);
      };
      return {
          abc,
          tit
      };
  }
  ```

## 6、生命周期

- 生命周期的触发时机与之前的optionsAPI没有什么区别，主要就是现在多了一个setup函数，这个函数是在创建阶段开始执行的，等于说setup和理解成替换了create阶段

- 同时，生命周期钩子函数都需要使用回调来设置后续操作，函数名前面多了一个on

- ```js
  setup() {
      onBeforeMount(() => {
          console.log('挂载之前');
  
      });
      onMounted(() => {
          console.log('挂载之后');
  
      });
      return {
  
      };
  }
  ```

- | 名称             | optionsAPI    | compositionAPI  |
  | ---------------- | ------------- | --------------- |
  | 创建前           | beforeCreate  | setup           |
  | 创建后           | created       | setup           |
  | 挂载前           | beforeMount   | onBeforeMount   |
  | 挂载后           | mounted       | onMounted       |
  | 更新前           | beforeUpdate  | onBeforeUpdate  |
  | 更新             | updated       | onUpdated       |
  | 卸载前【销毁前】 | beforeUnmount | onBeforeUnmount |
  | 卸载后【销毁后】 | unmounted     | onUnmount       |