# vue基础

## 1、MVVM开发概念与SPA概念

### 1.1、MVVM

我们在学习vue之前我们需要先了解一个概念叫做MVVM（model view and view model），其核心理念就是数据驱动页面，同时与之相对应的有一套叫做MVC的开发理念

> MVC解释:
>
> 以前的话很多后端开发的框架里面都会提到MVC概念（model view controller）这个MVC概念是一个前后端结合的一种开发方式（现在已经基本被替代了），现在的主流开发方式是前端后分离开发（前后端在开发的时候在两个不同的项目里面，真正开发完了以后还可以再次结合到一次）

在目前的前端里面，我们学习过很多的知识，比如布局我们会是用css，操作页面JS中的DOM，而DOM技术其实本身也是一种开发思路，但是现在我们要完全抛弃DOM操作了

MVVM不依赖DOM操作，它完全依靠数据，用数据去驱动页面

目前流行MVVM框架或类似于MVVM核心理念的框架有很多，主流的以下几个
1、vue：它是一个入门型的开发框架，很容易上手，但是提高很难
2、react：上手难，提高更难
3、angular：难上加难
4、svelte：上手比较简单，但是非常考验基本功，特别是原生JS和底层JS，还有
ES6+



### 1.2、SPA

SPA全称叫做单页面应用程序，指的是整个程序在经过处理之后只有一个页面，单页web应用（single page web application，SPA） ，这种程序全程只靠一个web也完成

上面介绍的 vue / react / angular 都可以实现单页面开发

## 2、认识vue

目前来讲vue的主要版本包含vue2和vue3，同时vue3里面基本上包含了vue2的所有核心功能，所以这里我们使用vue3的版本，同时讲解目前的2种语法

> 同时，现在只是针对vue框架本身功能的学习，我们还会使用到很多的vue框架体系下的其他工具来完成我们的项目开发，所以我们还会后续学习其他的vue体系下的工具

1、第一种基于vue2的语法格式叫做 options API【选项式API】

2、第二种基于vue3的语法格式叫做 composiAPItion API【组合式API】

在vue中先引入vue框架来学习vue的基础语法

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js">
</script>
```

## 3、Vue接管页面数据

vue是一个数据驱动页面并实现单页面开发的框架，数据驱动页面就是使用数据管理页面，简而言之，**就是数据变化，页面变化，同时页面变化，数据也变化**

**数据与页面实现了双向的绑定**

在旧版本里面，我们使用如下方式实现vue实例

```js
new Vue();
```

但是现在我们引入的是vue3的框架，所以以上写法在3的体系下会报错，新版本使用如下

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h1>{{userName}}</h1>
        <input type="text" v-model="userName">
    </div>


</body>
<script>
    Vue.createApp({
        //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
        data() {
            //data这里return返回的对象里面就是页面接管区域的数据来源
            return {
                userName: '张三'
            };
        },
    }).mount('#app');
</script>

</html>
```

在上面的例子中，我们可以发现如果要继续操作页面，已经可以不再依赖DOM技术

## 4、vue的数据绑定

### 4.1、插值语法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>01-插值语法</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h1>{{userName}}</h1>
        <h2>{{age}} </h2>
        <h2>{{age}} </h2>
        <!-- 二进制 -->
        <h2>{{num1.toString(2)}} </h2>
        <h2>{{}}</h2>
        <h2>{{1+1}}</h2>
        <h2>{{str1}}</h2>
        <h2 v-html="str1"></h2>

    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    age: 20,
                    num1: 18,
                    str1: "<input type='text' placeholder = '请输入账号'> "
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 插值语法通过 {{ }} 形式在页面上显示数据，这个数据的来源是vue的data里所存在的数据，同时插值语法也面在里面写普通的ES代码，比如条件运算，方法的调用执行，这种种插值语法旧相当于设置了一个元素的innerText属性

### 4.2、v-text

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>02-vue指令语法</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
       <h2 v-text="str1"></h2>
        <h2 v-text="userName"></h2>
        <h2 v-html="str1"></h2> 
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    age: 20,
                    num1: 18,
                    str1: "<input type='text' placeholder = '请输入账号'> "
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> v-text就相当于原生DOM中的innerText属性

### 4.3、v-html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>02-vue指令语法</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
		<h2 v-html="str1"></h2>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    age: 20,
                    num1: 18,
                    str1: "<input type='text' placeholder = '请输入账号'> "
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 这个v-html就相当于是innerHTML属性

### 4.4、v-model

在页面上显示数据的时候，我们还有一种特殊的元素就是表单，如果要绑定表单元素的数据，则要使用v-model

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>02-vue指令语法</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <!-- <h2 v-text="str1"></h2>
        <h2 v-text="userName"></h2>
        <h2 v-html="str1"></h2> -->

        <!-- v-model -->
        <h2>{{userName}} </h2>
        <input type="text" v-model="userName">
        <br>
        <input type="range" v-model="age">
        <h2> {{age}}</h2>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    age: 20,
                    num1: 18,
                    str1: "<input type='text' placeholder = '请输入账号'> "
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

接一下实现一个单选绑定

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vue</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <input type="radio" name="sex" value="男" v-model="a">男
        <input type="radio" name="sex" value="女" v-model="a">女
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    a: '女',
                    userName: '张三',
                    age: 20,
                    num1: 18,
                    str1: "<input type='text' placeholder = '请输入账号'> "
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

我们再来实现一个多选绑定

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <input type="checkbox" name="hobby" v-model="hobbyList" value="看书">看书
        <input type="checkbox" name="hobby" v-model="hobbyList" value="睡觉">睡觉
        <input type="checkbox" name="hobby" v-model="hobbyList" value="吃饭">吃饭
        <input type="checkbox" name="hobby" v-model="hobbyList" value="玩游戏">玩游戏
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    hobbyList: ['看书', '吃饭']
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

> 注意：
>
> 多选框的绑定是需要使用数组的方式去完成的
> 

### 4.5、v-once

v-once是单次绑定，它只会在第一次的时候做数据渲染，渲染完成之后就于vue断开了联系，后续如果数据发生变化，这个地方（整个元素）不再变化

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <input type="text" v-model="userName">
        <h2>{{userName}} </h2>
        <h2 v-once>{{userName}}</h2>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三'
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

### 4.6、v-show

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h2 v-show="true">今天是双11</h2>
        <h2 v-show="false">东西都很便宜</h2>
        <h2 v-show="1>2">我昨天买了一个平板</h2>
        <h2 v-show="'0'">比平时便宜800块</h2>
        <h2>纠结好久是买新的还是二手的</h2>
        <h2>因为二手的比新的还要便宜800</h2>
        <!-- 大家要记得可以为false的6个值是什么 -->
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三'
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 通过上面的例子，我们可以看到，这里显示或者不显示已经变的非常简单，只要v-show的值为true就显示，为false就隐藏，通过display样式来完成

在工作中，v-show使用会非常频繁，举例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <input type="range" v-model="age">{{age}}
        <h2 v-show="age<18">你的年龄没有达到18岁，所以你不能进入网吧</h2>
        <hr>
        <input type="text" v-model="userName" placeholder="请输入用户名">
        <span v-show="userName.length ==0">用户名不能为空</span>
        <hr>
        <input type="text" v-model="money">
        <span v-show="!/^\d+(\.\d+)*$/.test(money)">必须是数字</span>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    age: 18,
                    money: 0
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

### 4.7、v-if、v-else、v-else-if

条件渲染，根据条件来决定是否渲染，这个东西与v-show看起来非常像，但是本质上是完全不同的两个东西

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h2 v-if="age>=18">你是大人</h2>
        <h2 v-else>你是小孩</h2>
        <hr>
        <input type="text" v-model="score">
        <h2 v-if="score>=90">优秀</h2>
        <h2 v-else-if="score>=80">良好</h2>
        <h2 v-else-if='score>=70'> 中等</h2>
        <h2 v-else-if='score>=60'>及格</h2>
        <h2 v-else>不及格</h2>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    age: 18,
                    money: 0,
                    score: 98
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

后面我们会讲到生命周期，这个时候我们再来看v-show和v-if的区别

### 4.8、v-for

列表渲染，学完这个之后就可以把template模板引擎丢掉了

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h2>列表渲染</h2>
        <h3 v-for="(item,index) in stuList" :key="index">{{item}}---{{index}}</h3>
        <hr>
        <h3 v-for="(item,index) in Array.from(teachers)">{{item}}</h3>
        <hr>
        <h3 v-for="(item,index) in obj">{{item}}-{{index}}</h3>
        <hr>

    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    stuList: ["张三", "李四", '王五', "赵六"],
                    teachers: new Set(['哈哈', '呵呵', '嘻嘻']),
                    obj: {
                        0: 'abc',
                        1: '123',
                        2: 'def'
                    },
                    obj2: {
                        userName: '小白',
                        sex: '女'
                    }
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

除了渲染数组之外 ，还可以列表渲染对象

现在我们想要实现一个**数据筛选**，只**渲染筛选**的结果，以前我们可以同for循环内嵌if判断的方式可以完成，而现在在vue中正好也有v-for和v-if能够实现相应效果，所以我们可以两者搭配使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h2>列表渲染</h2>
        <ul>
            <!-- <template v-for="(item,index) in stuList">
                <li v-if="index%2==0">{{item}}---{{index}}</li>
            </template> -->
            <li v-for="(item,index) in stuList" v-if="index%2==0">{{item}}---{{index}}</li>
        </ul>

        <hr>
        <h2 v-for="(item,index) in 4">{{item}}---{{index}}</h2>
        <!-- item从1开始，index从0开始 -->
        <hr>
        <h2 v-for="({userName,age},index) in stuObj"></h2>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    stuList: ["张三", "李四", '王五', "赵六"],
                    stuObj: [
                        {

                        },
                        {

                        },
                        {

                        }
                    ]
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

> 这里要注意：
>
> v-for和v-if是可以写在一个元素上，但是访问不到index的这个值，需要通过template再去包裹一层
>
> **v-for和v-if的优先级不明确**

如果v-if和v-for放一个元素上使用

```html
   <li v-for="(item,index) in stuList" v-if="index%2==0">{{item}}---{{index}}</li>
```

> 代码分析：
>
> 这里我们会发现，第二个列表在渲染的时候会报警告信息
>
> ```cmd
> Property "index" was accessed during render but is not defined on instance.
> ```
>
> 原理是因为v-if的优先级比v-for要高一些，当这两个指令在同一个元素上面的时候，它会先执行v-if，再去执行v-for
>
> 在上的代码中，当我们执行v-if的时候，里面的条件中的index，这个时候还没有被v-for执行出来，所以index不存在，这个时候就会报警告
>
> 在vue3中v-for可以遍历的不一定非要是数组，还可以是对象
>
> v-for还可以执行普通的for循环
>
> ```html
> <h2 v-for="(item,index) in 10">{{item}}---{{index}}</h2>
> <!-- item从1开始，index从0开始 -->
> ```
>
> v-for正在执行遍历的时候可以直接解构
>
> ```html
>  <h2 v-for="({userName,age},index) in stuObj"></h2>
> 
> 
> 
> 
> <script>
>         Vue.createApp({
>             //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
>             data() {
>                 //data这里return返回的对象里面就是页面接管区域的数据来源
>                 return {
>                     stuList: ["张三", "李四", '王五', "赵六"],
>                     stuObj: [
>                         {
>                             userName: "张三",
>                             age: 20
>                         },
>                         {
>                             userName: "李四",
>                             age: 30
>                         }
>                     ]
>                 };
>             },
>         }).mount('#app');
>     </script>
> ```
>

### 4.9、v-once与v-show的惰性

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <button @click="flag=true">按钮</button>
        <input type="text" v-model="userName">
        <h2 v-show="flag">{{userName}}</h2>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: "张三",
                    flag: false
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

### 4.10、v-bind

之前我们学习的所有指令都是让页面上面显示内容，但是如果要对一个html属性进行绑定动态的值，需要使用到 v-bind:属性名 这种方式来完成

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <a v-bind:href="y">{{x}}</a>
        <!-- 简写形式 -->
        <a :href="y">{{x}}</a>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    x: '百度一下',
                    y: 'https://www.baidu.com/'
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

因为属性绑定这种操作后期会经常使用，所以vue提供了一种简写的方法

```html
<a :href="y">{{x}}</a>
```

## 5、vue的事件及事件对象

vue是数据驱动页面的框架，所以它不仅仅可以接管页面的数据，还可以接管页面的事件

### 5.1、vue绑定事件的方式

```html
<button v-on:click="">按钮</button>
```

> 上面的代码中，我们可以看到 v-on:事件名 这就是vue的事件绑定

因为事件的绑定时一个非常常用的操作，所以vue也提供了简写方式

```html
<button @click="">按钮</button>
```

> 简写方式就是 @事件名
> 

### 5.2、以方法的形式接管事件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <!-- 这里的事件方法是没有加小括号的，因为它不需要传递实参  -->
        <button @click="sayHello">按钮</button>
        <button @click="abc(12)">按钮2</button>
        <button @click="aaa">按钮3变成王五</button>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    username: '张三',
                    x: '百度一下',
                    y: 'https://www.baidu.com/'
                };
            },
            // 接管页面的事件方法
            methods: {
                aaa() {
                    this.username = '王五';
                },
                sayHello() {
                    console.log('大家好');
                },
                abc(age) {
                    console.log(`今年${age}岁`);

                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 1、data负责接管页面的数据，methods负责接管页面上面的方法
>
> 2、v-on:事件名 可以赋值一个函数名，这个函数可以有小括号，也可以没有，如果你需要传递实参就条件小括号，不需要则可以省略
> 

### 5.3、以行内的方式接管事件

> 这种写法非常简单，它直接把代码写再事件的属性名里面

```html
 <button @click="username='李四'">按钮3变成李四</button>
```

> 代码分析：
>
> 如果行内的事件要操作vue自身的data里面的数据，不要加this【在vue的托管区域内部是严禁出现this】
> 

### 5.4、vue的方法访问vue的数据

> 这里我们先做原理上的简单了解

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <!-- 这里的事件方法是没有加小括号的，因为它不需要传递实参  -->
        <button @click="sayHello">按钮</button>
        <button @click="abc(12)">按钮2</button>

        <button @click="username='李四'">按钮3变成李四</button>
        <h2>{{username}}</h2>
        <button @click="aaa">按钮3变成王五</button>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    username: '张三',
                    x: '百度一下',
                    y: 'https://www.baidu.com/'
                };
            },
            // 接管页面的事件方法
            methods: {
                aaa() {
                    //如果在事件方法里面，想拿到自己的data里面的数据，可以直接通过自己的对象来完成
                    //完整写法

                    console.log(this.$data.username);
                    //通过代理来获取自己对象data中的数据
                    console.log(this.username);
                    //当面试官问你，为什么this.userName可以渠道this.$data.userName的值
                    //因为this指向的vue实例对象是一个proxy代理对象，这个代理对象内部的handler代理方法进行了处理
                    this.username = '王五';
                },
                sayHello() {
                    console.log('大家好');
                },
                abc(age) {
                    console.log(`今年${age}岁`);
                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

### 5.5、vue的事件修饰符

> 修饰符：vue中的修饰符主要是用来修饰事件的，让事件有一个更具体的触发条件

这里我们通过事件对象制作一个阻止事件传播的例子

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <div class="box" @click="aaa">
            <!-- 阻止bbb事件冒泡 -->
            <button @click.stop="bbb($event)">按钮</button>
        </div>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    username: '张三',
                    x: '百度一下',
                    y: 'https://www.baidu.com/'
                };
            },
            // 接管页面的事件方法
            methods: {
                aaa() {
                    console.log('我是aaa方法');
                },
                bbb(event) {
                    console.log('我是bbb方法');
                    console.log(event);
                    // event.stopPropagation();
                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 上面我们使用事件对象中的 stopPropagation() 来阻止了事件的传播

但是在vue中要实现阻止事件传播就非常简单

```html
 <div class="box" @click="aaa">
        <!-- 阻止bbb事件冒泡 -->
        <button @click.stop="bbb($event)">按钮</button>
</div>
```

上面的 @click.stop 就是使用了vue的事件修饰符，stop的修饰符就是阻止事件冒泡，与之相似的修饰符非常多，列举一下

**事件修饰符**

- stop
- prevent
- self
- capture
- once
- passive

**按键修饰符**

vue为一些常用的按钮提供了别名：

- enter
- tab
- delete (捕获delete和backspace两个案件)
- esc
- space
- up
- down
- left
- right

举例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <!-- 在输入框里面输入内容以后，回车，把输入的内容添加到一个列表中 -->
        <input type="text" v-model.trim="txt" @keyup.enter="stuList.add(txt)">
        <hr>
        <ul>
            <!-- 当我们双击某一个列表项的时候，把该项删除 -->
            <li v-for="(item,index) in stuList" :key="index" @dblclick="stuList.delete(item)">{{item}}---{{index}}</li>
        </ul>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    txt: '',
                    stuList: new Set(['张三', '李四'])
                };
            },
            // 接管页面的事件方法
            methods: {
                aaa() {
                    console.log('我是aaa方法');
                },
                bbb(event) {
                    console.log('我是bbb方法');
                    console.log(event);
                    // event.stopPropagation();
                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

## 6、关于数据无法实现相应的问题

**在vue2中**，会存在一个问题，通过方法执行新增的数据无法实现响应，为了解决这个问题，vue2推出了$set方法来实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <h2>{{userInfo.userName}}</h2>
        <h2>{{userInfo.sex}}</h2>
        <button @click="aaa">添加对象属性</button>
        <button @click="bbb">添加对象属性1</button>

    </div>
    <script src="./js/vue2.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                userInfo: {
                    userName: '张三'
                }
            },
            methods: {
                aaa() {
                    //第一种方式
                    this.userInfo.sex = '男';
                    //强制更新，强制重新渲染页面，这个非常消耗性能
                    this.$forceUpdate();
                },
                bbb() {
                    //第二种方式
                    // 使用Vue的$set方法，将userInfo对象的sex属性设置为'男'
                    //vue2  访问器属性
                    this.$set(this.userInfo, 'sex', '男');
                    //可以解决新增属性不能响应的问题
                    // this.$delete();
                }
            },
        })
    </script>
</body>

</html>
```

> 代码分析：
>
> **注意：上面的代码实现是基于vue2的版本框架与vue3无关**
>
> 在上面的代码中，我们可以看到，在最开始渲染的时候，userInfo这个对象里面并没有sex属性，但是后面我们主动追加了这个属性，结果，页面并没有正常显示这个属性，因为vue2对于新增的属性并没有实现响应
>
> 如果要结果这个问题可以使用下面2个方法
>
> 1、this.$forceUpdate() 强制更新vue状态，但是会非常消耗浏览器性能
>
> 2、this.$set(）来扩展新属性，这个扩展出来的新属性就是响应式的
>
> #### 同理还有一个$delete用来在删除data中的属性时实现响应式
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> 
> <head>
> <meta charset="UTF-8">
> <meta name="viewport" content="width=device-width, initial-scale=1.0">
> <title>Document</title>
> </head>
> 
> <body>
> <div id="app">
>   <h2 v-show="!userInfo.flag">{{userInfo.userName}}</h2>
>   <h2>{{userInfo.sex}}</h2>
>   <button @click="aaa">删除对象属性</button>
>   <button @click="bbb">删除对象属性1</button>
> 
> </div>
> <script src="./js/vue2.js"></script>
> <script>
>   var app = new Vue({
>       el: '#app',
>       data: {
>           userInfo: {
>               userName: '张三',
>               flag: true
>           }
>       },
>       methods: {
>           aaa() {
>               delete this.userInfo.flag;
>               this.$forceUpdate();
>           },
>           bbb() {
>               //第二种方式
>               // 使用Vue的$set方法，将userInfo对象的sex属性设置为'男'
>               //vue2  访问器属性
>               this.$delete(this.userInfo, 'flag');
>               //可以解决新增属性不能响应的问题
>               // this.$delete();
>           }
>       },
>   })
> </script>
> </body>
> 
> </html>
> ```
> ### 注意：
>
> 针对$set和$delete新增和删除实现响应式的情况，主要出现在vue2当中，在
>
> **vue3中该问题已经被解决，通过字面量对象的新增和删除操作就可以直接实现** **响应式的结果**

## 7、vue的计算属性

之前我们讲过，vue是数据驱动页面，它的数据主要来源data这个选项，那么，这里我们做一个扩展，在接管区域内的数据不一定只来源于data，还可以是其他地方

计算属性是需要计算以后才会得到的，比如

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <!-- 阻止bbb事件冒泡 -->

        <h2>男生数：{{boyCount}}</h2>
        <h2>女生数：{{girlCount}}</h2>

    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    username: '张三',
                    stuList: [
                        {
                            stuName: '小白',
                            sex: '女'
                        },
                        {
                            stuName: '小红',
                            sex: '男'
                        },
                        {
                            stuName: '小蓝',
                            sex: '女'
                        },
                        {
                            stuName: '小紫',
                            sex: '女'
                        },
                        {
                            stuName: '小黑',
                            sex: '女'
                        },
                        {
                            stuName: '小绿',
                            sex: '男'
                        },
                    ]

                };
            },
            // 接管页面的事件方法
            methods: {
                aaa() {
                    console.log('我是aaa方法');
                },
                bbb(event) {
                    console.log('我是bbb方法');
                    console.log(event);
                    // event.stopPropagation();
                }
            },
            computed: {
                boyCount() {
                    let count = this.stuList.filter(item =>
                        item.sex == '男'
                    ).length;
                    return count;
                },
                girlCount() {
                    let count = this.stuList.filter(item =>
                        item.sex == '女'
                    ).length;
                    return count;
                },
            }
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 在上面的代码，我们现在想得到男或女一共多少人，在上面代码中提供的数据里面是没有直接表示的，所以，如果想实现这个需求，就必须要将data中的属性进行计算之后才能得到结果，那么这个计算过程的实现，在vue中可以通过计算属性来实现



## 8、vue监听器（数据监听）

### 8.1、普通监听

普通监听主要应用在原始数据类型的监听

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h2>{{userName}}</h2>
        <button @click="userName ='李四'">按钮</button>

        <hr>
        <h2>{{userInfo.userAge}}</h2>
        <button @click="userInfo.userAge = 30">按钮</button>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    userInfo: {
                        userAge: 20
                    }
                };
            },
            watch: {
                // 你要监听谁，这里的就写一个同名的函数
                userName(newValue, oldValue) {
                    //该方法会接收两个实参，分别是newValue修改之后的值，oldValue修改之前的值
                    console.log(newValue, oldValue);
                },
                //  深度监听
                userInfo: {
                    deep: true,
                    //当数据发生变化之后的后续操作由handler方法来接管
                    handler(newValue) {
                        console.log(newValue);
                    }
                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 监听器就是在watch选项下的一个函数，如果要监听某一个数据，就写这个数据同名的函数即可，当这个数据发生变化的时候会自动调用这个函数，同时这个函数会有两个参数，第一个参数代表变化之后的值，第二个参数表示变化之前的值

### 8.2、深度监听

在监听器里面，默认情况下，它只能监听原始数据类型，对于数据集合（对象）是监听不到它的变化的，如果想实现对对象的而监听，应该使用深度监听

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h2>{{userName}}</h2>
        <button @click="userName ='李四'">按钮</button>

        <hr>
        <h2>{{userInfo.userAge}}</h2>
        <button @click="userInfo.userAge = 30">按钮</button>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    userName: '张三',
                    userInfo: {
                        userAge: 20
                    }
                };
            },
            watch: {
                //  深度监听
                userInfo: {
                    deep: true,
                    //当数据发生变化之后的后续操作由handler方法来接管
                    handler(newValue) {
                        console.log(newValue);
                    }
                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 上面的userInfo就是实现了深度监听，深度监听不仅仅是一个单独的函数了，它是一个对象，这个对象上面有一个deep属性，使用设置是否处于深度监听的状态，还有一个handler方法是监听到变化之后的后续处理函数

## 9、购物车综合案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .page-title {
            text-align: center;
        }

        .table1 {
            width: 1200px;
            margin: 0 auto;
            border: 1px solid #000;
            border-collapse: collapse;
        }

        .table1 :is(td, th) {
            /* 设置表格单元格和表头单元格的边框为1像素的实线，颜色为黑色 */
            border: 1px dotted #000;
            height: 35px;
            padding: 5px;
        }

        .total-info {
            width: 1200px;
            font-weight: bold;
            font-size: 22px;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <h2 class="page-title">购物车列表</h2>
        <table class="table1">
            <tr>
                <th>序号</th>
                <th>商品名称</th>
                <th>价格</th>
                <th>数量</th>
                <th>价格</th>
            </tr>
            <tr v-for="(item,index) in goodsList" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.goodsName}}</td>
                <td>{{item.price}}</td>
                <td>
                    <button @click="item.count--" :disabled="item.count<=0">-</button>
                    {{item.count}}
                    <button @click="item.count++" :disabled="item.count>=99">+</button>

                </td>
                <td>{{item.price *item.count}}</td>
            </tr>


        </table>
        <div class="total-info">商品总数:{{totalInfo.totalCount}}件,商品总额:{{totalInfo.totalMoney}}</div>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    goodsList: [
                        {
                            goodsName: 'iphone 15',
                            price: 5000,
                            count: 1
                        },
                        {
                            goodsName: '充电宝',
                            price: 130,
                            count: 3
                        },
                        {
                            goodsName: '笔记本电脑',
                            price: 7000,
                            count: 2
                        },
                        {
                            goodsName: '数据线',
                            price: 30,
                            count: 5
                        },
                    ]
                };
            },
            computed: {
                totalInfo() {
                    // 一次性得到totalCount和totalMoney
                    let totalCount = 0;
                    let totalMoney = 0;
                    this.goodsList.forEach(({ price, count }) => {
                        totalCount += count;
                        totalMoney += count * price;
                    });
                    return {
                        totalCount,
                        totalMoney
                    };
                }
            },
            watch: {

            }
        }).mount('#app');
    </script>
</body>

</html>
```

## 10、vue样式的class绑定

为什么需要样式绑定？

在以前的DOM开发里面，如果我们要动态的切换页面元素的样式，需要动态的去设置classList或者style，这样操作很麻烦，举例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .ul1 li {
            list-style: 40px;
            border: 1px solid #000;
        }

        /* -- 选择器，选择类名为ul1的元素下的li元素，且li元素具有active类  */
        .ul1 li.active {
            background-color: red;
            font-weight: bold;
        }

        .box {
            width: 200px;
            height: 200px;
            border: 2px solid #000;
        }

        .box.active {
            background-color: greenyellow;
        }
    </style>
</head>

<body>

    <ul class="ul1">
        <li>第1项</li>
        <li>第2项</li>
        <li>第3项</li>
    </ul>
    <script>
        let ul1 = document.querySelector('.ul1');
        ul1.addEventListener('click', function (event) {
            if (event.target.matches('li')) {
                let activeElement = document.querySelector('.ul1>li.active');
                if (activeElement) {
                    activeElement.classList.remove('active');
                }
                event.target.classList.add('active');
            }
        })

    </script>
    <!-- 原生写法  ----------------end----------------- -->
</body>

</html>
```

> 代码分析：
上面的代码就是当我们点击某一项li的时候，会给它添加一个样式，其他的样式则移除，这种效果在原始的DOM操作下会非常麻烦，因为每次操作都要去查找DOM元素，所以它的开发效率是很低下的
现在的vue开发中，因为不再需要纯粹的依赖于DOM操作，所以可以使用vue里面的数据驱动页面的思路来可完成
**如果想改变页面，则应该是改变数据，vue的数据是双向绑定的数据，数据改变页面改变，页面改变数据改变**

### 10.1、对象语法

它的语法格式如下

```html
<div :class="{类名:布尔值,类名:布尔值}"></div>
```

如果布尔的结果为true，则当前样式生效，反之

```html
<div class="box" :class="{active:true}"></div>
```

上面的代码里面，因为active的样式后面的值是一个true，那么，我们就可以认为这个样式生效了



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .ul1 li {
            list-style: 40px;
            border: 1px solid #000;
        }

        /* -- 选择器，选择类名为ul1的元素下的li元素，且li元素具有active类  */
        .ul1 li.active {
            background-color: red;
            font-weight: bold;
        }

        .box {
            width: 200px;
            height: 200px;
            border: 2px solid #000;
        }

        .box.active {
            background-color: greenyellow;
        }
    </style>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <div class="box" :class="{active:flag}" @click="flag=!flag">
            这是一个盒子
        </div>

        <ul class="ul1">
            <li v-for="(item,index) in list" :key="index" :class="{active:currentIndex == index}"
                @click="currentIndex=index">{{item}}</li>

        </ul>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    flag: false,
                    list: ['第1项', '第2项', '第3项'],
                    currentIndex: -1
                };
            },
            watch: {
                // 你要监听谁，这里的就写一个同名的函数
                userName(newValue, oldValue) {
                    //该方法会接收两个实参，分别是newValue修改之后的值，oldValue修改之前的值
                    console.log(newValue, oldValue);
                },
                //  深度监听
                userInfo: {
                    deep: true,
                    //当数据发生变化之后的后续操作由handler方法来接管
                    handler(newValue) {
                        console.log(newValue);
                    }
                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
在上面的代码中，我们可以看到active的样式是否生效主要看后面的flag变化，这个数据值默认是false，然后我们在当前元素的上面添加了click事件，并设置了 flag = !flag ，这样flag的值就会在true / false 之间来回切换，那么就实现了active样式的切换

现在我们在来通过vue来上面原生操作DOM的例子 上面便是例子

### 10.2、数组语法

它的语法格式如下：

```html
<div :Class="[条件1?'类名1':'类名2',条件2?'类名3':'类名4']"></div>
```

数组语法每一个数组元素就是一个判断条件，根据判断结果来决定给哪个类名

```html
<div :Class="[条件1?'active':null]"></div>
```

举例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            border: 2px solid #000;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .active {
            background-color: pink;
        }

        .unactive {
            background-color: lightgreen;
        }
    </style>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <div class="box" :class="[age>18 ?'active':'unactive']">
            <button @click="age++">按钮</button>
        </div>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    age: 17
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
> 上面的代码中，我们使用 :`class="[age>18?'active':'unactive']" `去完成了动态样式的切换
> 

## 11、vue样式的style绑定

有了class的动态绑定之后，为什么还需要style绑定，**因为style属性直接操作样式，不需要单独去写一个类，有时候会比较方便**

### 11.1、对象语法

```html
<div :style="{属性名:数据值,属性名:数据值}"></div>
```

举例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            border: 2px solid #000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <div class="box" :style="{backgroundColor:color}">
            <button @click="color='black'">黑色</button>
            <button @click="color='red'">红色</button>
            <button @click="color='blue'">蓝色</button>
        </div>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管 了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    color: 'white'
                };
            },
        }).mount('#app');
    </script>
</body>

</html>
```

综合案例：手动进度条

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .progress {
            width: 400px;
            height: 30px;
            border: 1px solid #ccc;
            background-image: linear-gradient(to right, red, red);
            display: flex;
            background-repeat: no-repeat;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
        }

        span.active {
            color: white;
        }
    </style>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <div class="progress" :style="{backgroundSize:`${precentage}% 100%`}">
            <span :class="{active:precentage>55}">{{precentage}}%</span>
        </div>
        <hr>
        <button @click="precentage--" :disabled="precentage<=0">-</button>
        <button @click="precentage++" :disabled="precentage>=100">+</button>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管 了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    precentage: 50
                };
            },
            watch: {
                precentage(newValue, oldValue) {
                    if (newValue > 100) {
                        this.precentage = 100;
                    }
                }
            }
        }).mount('#app');
    </script>
</body>

</html>
```

### 11.2、数组语法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            width: 100px;
            height: 100px;
            border: 1px solid #000;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease-out;
        }
    </style>
</head>

<body>
    <!--id为app的元素就是vue的管理区域-->
    <div id="app">
        <div class="box" :style="[1< 2 ? obj1:null,obj2]">
            33333</div>
        <button @click="change">修改样式</button>
    </div>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({
            //  vue接管 了#app的区域 在该区域内所有的操作都由vue来执行
            data() {
                //data这里return返回的对象里面就是页面接管区域的数据来源
                return {
                    obj1: {
                        backgroundColor: 'red',
                        borderRadius: '50%'
                    },
                    obj2: {

                    }
                };
            },
            methods: {
                change() {
                    this.obj1.width = '200px';
                    this.obj1.height = '200px';
                    this.obj2.transform = 'rotateZ(45deg)';
                }
            },
        }).mount('#app');
    </script>
</body>

</html>
```

## 12、vue过滤器

> vue3已经废弃，但是在vue2中还是会被经常用到

在vue2中，过滤器就是数据格式化工具，或者数据需要二次处理的时候会作用到它

### 12.1、全局过滤器

故名思意就是可以在全局使用的，它的语法格式如下

```js
Vue.filter("过滤器名称",function(参数){
    //这里的第一个参数就是要格式化处理的数据
    //过滤器函数必须要有一个返回值
})
```

在使用过滤器的时候如下

```html
<div>{{content | 过滤器}}</div>
```

举例：时间数据格式化处理

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <h2 v-for="(item,index) in list">
            {{item | formatDateTime}}
        </h2>
    </div>
    <script src="./js/vue2.js"></script>
    <script>
        //编写一个过滤器
        Vue.filter("formatDateTime", function (d) {
            let _d = new Date(d);
            let year = _d.getFullYear();
            let month = _d.getMonth() + 1;
            let day = _d.getDate();
            let hour = _d.getHours();
            let second = _d.getSeconds();
            let minute = _d.getMinutes();
            // return `${year}.${month}.${day} - ${hour}:${minute}:${second}`;
            return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
        });
        var app = new Vue({
            el: '#app',
            data: {

                list: [
                    new Date(),
                    12567385127835,
                    '2021.09.09 12:12:12'
                ]

            },
            filters: {

            },
            methods: {
                aaa() {
                    delete this.userInfo.flag;
                    this.$forceUpdate();
                },
                bbb() {
                    //第二种方式
                    // 使用Vue的$set方法，将userInfo对象的sex属性设置为'男'
                    //vue2  访问器属性
                    this.$delete(this.userInfo, 'flag');
                    //可以解决新增属性不能响应的问题
                    // this.$delete();
                }
            },
        })
    </script>
</body>

</html>
```

### 12.2、局部过滤器

现在我们制作一个用于文本长度大于规定长度时，把多余部分替换成省略号的局部过滤器

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <div class="box1">{{content1 | txt}}</div>
        <div class="box2">{{content2 | txt}}</div>
        <div class="box3" v-html="txt(content2,30)"></div>
    </div>
    <script src="./js/vue2.js"></script>
    <script>

        var app = new Vue({
            el: '#app',
            data: {
                content1: '东风汽车旗下高端智慧新能源品牌，东风岚图的最新力作——岚图知音，以及其他10家车企的整车下线将标志2024年中国新能源汽车1000万辆正式达成。同时，在活动现场，多家民族汽车品牌也将集中亮相，共同奏响2024年中国新能源汽车1000万辆达成的荣耀交响曲。',
                content2: '过去十年，中国新能源汽车产业建立了领先优势，引领全球汽车工业转型潮流。而今，在中国新能源汽车即将达成年度1000万辆的里程碑。'

            },
            filters: {
                // 编写一个局部过滤器
                txt(str, maxLength = 20) {
                    if (str.length > maxLength) {
                        return str.substr(0, maxLength) + '...';
                    } else {
                        return str;
                    }
                }
            },
            methods: {
                // 编写一个局部过滤器
                txt(str, maxLength = 20) {
                    if (str.length > maxLength) {
                        return str.substr(0, maxLength) + `... <a href='#'>更多</a>`;
                    } else {
                        return str;
                    }
                }
            },
        })
    </script>
</body>

</html>
```

**思考：vue3为什么会废弃过滤器？**

例子

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <div class="box1">{{content1 | txt}}</div>
        <div class="box2">{{content2 | txt}}</div>
        <div class="box3" v-html="txt(content2,30)"></div>
    </div>
    <script src="./js/vue2.js"></script>
    <script>

        var app = new Vue({
            el: '#app',
            data: {
                content1: '东风汽车旗下高端智慧新能源品牌，东风岚图的最新力作——岚图知音，以及其他10家车企的整车下线将标志2024年中国新能源汽车1000万辆正式达成。同时，在活动现场，多家民族汽车品牌也将集中亮相，共同奏响2024年中国新能源汽车1000万辆达成的荣耀交响曲。',
                content2: '过去十年，中国新能源汽车产业建立了领先优势，引领全球汽车工业转型潮流。而今，在中国新能源汽车即将达成年度1000万辆的里程碑。'

            },
            methods: {
                // 编写方法  来代替 一个局部过滤器
                txt(str, maxLength = 20) {
                    if (str.length > maxLength) {
                        return str.substr(0, maxLength) + `... <a href='#'>更多</a>`;
                    } else {
                        return str;
                    }
                }
            },
        })
    </script>
</body>

</html>
```

## 13、vue的DOM操作

在vue框架下面，我们是不推荐做DOM操作的，但是不代表vue不能进行DOM操

作，它也是完全可以的

1、最原始的方式就是原生JS中提供的DOM技术，比如document.querySelector().......

2、可以利用事件对象当中的currentTarget事件绑定者和target事件触发者来获取到一个DOM对象，这个东西有个缺点，只能找到自己或者以自己为中心的元素

3、vue提供了一个ref属性用来获取DOM，这个是vue推荐方式

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <h2 ref="abc">张三</h2>
        <h3 ref="abc">张三</h3>
        <button @click="aaa">anniu</button>
        <ul>
            <li v-for="(item,index) in list" ref="aaa">{{item}}</li>
        </ul>
    </div>
    <script src="./js/vue2.js"></script>
    <script>

        var app = new Vue({
            el: '#app',
            data: {
                list: ['a', 'b', 'c', 'd']
            },

            methods: {
                aaa() {
                    // console.log(this.$refs.abc);
                    console.log(this.$refs.aaa);

                }
            },
        })
    </script>
</body>

</html>
```

**ref在使用时需要注意的点：**
**1、当出现同名的ref时**
	当在vue的挂载区域内出现多个同名的ref的时候，通过$refs调出来的是最后一个
**2、当通过v-for渲染出来的标签也带有ref的时候**
	这种通过列表渲染产生的同名ref，在获取时会作为一个数组到，每一个数组元素就对一个ref标记的标签

> 注意：
>
> 两种情况其实都是针对ref同名的情况下出现的，但是，如果是自己手写的ref同名，只会获取到最后一个，而通过v-for渲染出来的同名，会全部获取到并作为一个数组表示

# vue组件化开发

现在有一个问题，如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div class="box">
        <h2>我是标题1</h2>
        <p>我是内容1</p>
    </div>
    <div id="app">

    </div>

    <template id="user-info">
        <div class="box">
            <h2>我是标题1</h2>
            <p>我是内容1</p>
        </div>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        Vue.createApp({

        }).mount('#app') 
    </script>
</body>

</html>
```

当我们在html中需要重复的生成某些东西的时会，会造成大量的代码冗余现在我们要想办法，怎么去简化上面的代码，换句话就是提高代码利用率

## 1、虚拟DOM概念 

能够简化代码最好的办法就是封装，封装这个概念我们其实一致在践行，比如JS的封装依靠的就是function函数，如果是css的封装我们可以使用到公共样式，但是好像并没有针对HTML的封装

为了实现一种HTML的封装方式，所以我们提出一个叫做 virtual DOM的概念，我们可以把要封装的HTML代码当成一个整体的DOM元素来看待

```html
<div id="app">
    <user-info></user-info>
    <user-info></user-info>
    <user-info></user-info>
</div>
<template id="user-info">
    <div class="box">
        <h2>我是标题1</h2>
        <p>我是内容1</p>
    </div>
</template>
```

现在我们把需要封装的html代码通过template标签封装一个整体，然后将它转换程一个虚拟标签 `<user-info></user-info>` ，最后我们去使用这个标签即可【以上代码是一种思路体现，如果执行浏览器控制台会告诉我们user-info不是一个元素】
那么针对这个问题，我们可以把user-info制作成一个DOM元素，然后在html调用虚拟DOM
目前能够实现虚拟DOM的框架如下：

1、vue

2、react

3、angular
在这三个框架中虚拟DOM都被叫做组件



## 2、全局组件

vue3的全局组件和vue2的全局组件方式不太一样，组件也叫component，组件本身可以看做是一个小型的vue实例对象（小型应用实例对象）

注册全局组件：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <aaa></aaa>
        <bbb></bbb>
    </div>
    <template id="temp1">
        <div class="box">
            <h2>我是box标题1</h2>
            <p>我是box内容1</p>
        </div>
    </template>
    <template id="temp2">
        <h1>我是最大的标题</h1>
        <aaa></aaa>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        const app = Vue.createApp({

        });
        // 注册全局组件
        app.component('aaa', {
            template: '#temp1'
        });
        app.component('bbb', {
            template: '#temp2'
        });
        app.mount('#app');
    </script>
</body>

</html>
```

> 注意事项：
>
> 在注册全局组件的时候，一定要在挂载之前注册
>
> 全局组件的注册语法格式如下
>
> ```js
> app.component("组件名",组件配置对象)
> ```
>
> ### **关于组件的命名**
>
> 当组件被注册成功会有对应的虚拟标签名可以使用，为了区别常规的html标签
>
> 名，虚拟标签名在取名的时，可以采用大驼峰写法

因为我们现在注册是全局组件，所以可以全局调用，如上面的：

## 3、局部组件

局部组件与全局组件在功能上是一样的，只是使用范围有限制而已

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <!-- <user-info></user-info> -->
        <btn-box></btn-box>
        <!-- <input-box></input-box> -->
    </div>
    <template id="temp1">
        <div class="box">
            <h2>我是一个盒子</h2>
            <p>马上下班了，很开心</p>
        </div>
    </template>
    <template id="temp2">
        <user-info></user-info>
        <div class="btn">
            <button>登录</button>
        </div>
    </template>
    <template id="temp3">
        <div class="input">
            <input type="text">
        </div>
        <user-info></user-info>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        let UserInfo = {
            template: '#temp1'
        };
        let BtnBox = {
            template: "#temp2",
            components: {
                UserInfo
            }
        };
        let InputBox = {
            template: "#temp3",
        };
        const app = Vue.createApp({
            //这里注册局部变量
            components: {
                UserInfo,
                BtnBox,
                InputBox
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 局部组件本质上就是一个对象，只是这个对象要注册到某一个组件的内容才可以使用，同时在optionsAPI语法下注册的组件，其组件名在转换成虚拟标签的时候，要改写法
>
> 举例：
>
> 组件名叫做UserInfo，虚拟标签名就为 user-info

以上的注册虽然是局部组件，但是并没有体现出来局部组件的局部



> 代码分析：
>
> 以上代码中，我们创建了3个组件，分别是UserInfo，BtnBox，InputBox，其中UserInfo作为BtnBox的局部组件被注册到BtnBox中并且进行了调用，同时在InputBox我们虽然也调用了UserInfo，但是我们并没有把UserInfo注册成InputBox的局部组件，所以在挂载区域中分别调用btn-box和input-box之后，我们可以看到，在input-box中并没有user-info的标签结构被渲染出来
>
> **注意：**
>
> **组件一定要先注册再使用**
> 

## 4、组件中的数据

组件本身就是一个小型的vue，所以它的内部的原理与我们之前所学习的东西是一样的，它的内部也会有data，也会有methods，也会有watch等等

针对组件内部的数据来源：

1、组件自身的数据data

2、外部传入的数据

3、组件自身的computed

4、全局数据

### 4.1、组件自身的数据

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <aaa msg="haha"></aaa>
    </div>

    <!-- 所谓组件自身的数据，可以简单理解就是组件内部data中本身就存在的数据 -->
    <template id="temp1">
        <div class="box">
            <h2>大家好,我叫{{nickName}}</h2>
        </div>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
            data() {
                return {
                    nickName: '张三'
                };
            },
            props: {

            }
        };
        const app = Vue.createApp({
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

>  代码分析：
>
> 所谓组件自身的数据，可以简单理解就是组件内部data中本身就存在的数据
> 

### 4.2、组件接收的外部数据

其实在大多数的开发场景下，我们可以看到，组件的布局是相同的，但是数据是不一样的

这种情况下，我们一般都利用父组件将数据通过列表渲染的方式传递给子组件来完成

组件是可以接受外部传递进入的数据，数据在传递的时候需要使用到**自定义属性传递**

```html
<aaa msg="haha"></aaa>
```

如果我们采用上面的方式来完成，这个时候我们就可以看到组件上有一个msg自定义属性，这个属性的值是“haha” ，在组件内部就可以实现值的接收

在接收过程中分为数组语法和对象语法两种：

**1、数组语法**

```js
let aaa = {
    template:"#temp1",
    props:["msg","sex"]
}
```

**2、对象语法**

```js
let aaa = {
	template:"#temp1",
	props:{
        msg:{
            type:String,
            required:true
        },
        sex:
            {
                type:String,
                default:"女"	
            }
   	}
}
```

在使用对象语法接受的时候，我们可以使用一些描述信息，比如**type去制定接受的数据类型**，default指定默认值，比如required指定这个值必须传递进来

> **关于外部传入数据的注意事项**
>
> 1、关于自定义属性名的设置问题
>
> 当在子组件中设置的props的接收数据的属性名是一个驼峰写法的时候，在作为自定义属性写的时候需要转义，比如：nickName -----> nick-name
>
> 2、关于传递的值的数据类型的问题
>
> 在正常情况下传入组件内部的数据值都是字符串类型的，如果想携带数据类型将值传入，需要在传入的时候使用动态属性绑定的方式传入，比如
>
> ```html
> <aaa flag="false"></aaa>
> <!-- 上面情况下传入的并不是布尔的false，而是字符串的false -->
> ```
>
> 正确携带数据类型传入的方式如下：
>
> ```html
> <aaa :flag="false"></aaa>
> <!-- 使用动态属性绑定的方式，将自定义属性做成动态属性，就可以携带数据类型
> 传入 -->
> ```
>

### 4.3、全局数据

全局数据可以解决跨组件调用的问题，比如父级组件传递给孙子组件，比如，兄弟之间相互传递数据，面对这种情况，我们可以使用全局数据完成，目前的全局数据的解决方案有以下几种：

1、vuex

2、pinia

3、vue3自带provide和inject方法

## 5、组件的事件与方法

组件本身就是一个小型的vue，所以它的内部一定会有数据和事件，那么有事件就必然也会有方法，所以我们来看下组件内的事件与方法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <h2>aaa组件的外部</h2>
        <button @click="m1">外面按钮</button>
        <aaa msg="haha" sex="怪兽" ref="aaa"></aaa>
    </div>

    <!-- 所谓组件自身的数据，可以简单理解就是组件内部data中本身就存在的数据 -->
    <template id="temp1">
        <div class="box">
            <h2>大家好,我叫{{nickName}}</h2>
            <h2>{{msg}}---{{sex}}</h2>
            <button @click="sayHello">按钮</button>
        </div>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
            data() {
                return {
                    nickName: '张三'
                };
            },
            methods: {
                sayHello() {
                    console.log('大家好，我叫' + this.nickName);

                }
            },
            // 数组语法
            // props: ["msg", "sex"]
            // 对象语法
            props: {
                msg: {
                    type: String,
                    <!-- 是否必填 -->
                    required: true
                },
                sex: {
                    type: String,
                    default: '男'
                }
            }
        };
        const app = Vue.createApp({
            methods: {
                m1() {
                    // 在这里我们想调用aaa组件内部的sayHello方法
                    this.$refs.aaa.sayHello();
                }
            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

上面的代码中，我们可以看到，组件内部的事件可以在组件内部处理方法的执行

### 5.1、父组件调用子组件的方法

当父组件需要调用 子组件的方法时候，我们可以通过 $refs 来找到这个组件，只要找到这个组件就可以调用这个子组件内部的方法

```html
<aaa nick-name="大哥哥" ref="aaa"></aaa>
```

最后在使用的时候，直接通过 `this.$refs.aaa.方法名()`; 就可以调用子组件里面的方法

```js
methods: {
    m1() {
        // 在这里我们想调用aaa组件内部的sayHello方法
        this.$refs.aaa.sayHello();
    }
},
```

## 6、数据流的单向性

数据流的单向性指的是数据只能从外部流向内部，**外部改变了，内部也改变**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <h1>组件外面 -----{{nickName}}</h1>
        <button @click="nickName='炎拳'">按钮</button>
        <aaa :nick-name="nickName"></aaa>
    </div>

    <!-- 所谓组件自身的数据，可以简单理解就是组件内部data中本身就存在的数据 -->
    <template id="temp1">
        <div class="box">
            <h2>大家好,我叫{{nickName}}</h2>

        </div>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
            data() {
                return {
                };
            },
            methods: {
                sayHello() {
                    console.log('大家好，我叫' + this.nickName);

                }
            },
            // 数组语法
            // props: ["msg", "sex"]
            // 对象语法
            props: {
                nickName: {
                    type: String,
                },

            }
        };
        const app = Vue.createApp({
            data() {
                return {
                    nickName: '大哥哥'
                };
            },
            methods: {

            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

当我们点击了按钮之后，我们发现外部的数据变了，内部的数据也变化了，这是因为数据是有流行性的，由外向内进行传递，**这个过程不可逆**

数据流的单向性就注定了只能外边改变，里面再改变，而不能里面改变，外边再改变，当我们尝试这么去做会报错的

## 7、破坏数据流的单向性

### 7.1、利用对象的堆栈原理
vue中进行组件传递的值的时候，可以使用const锁栈不锁堆的原理，当值接收到之后，不可以再去改动栈里面的内容，但是可以改变堆里面的内容
同时我们还知道，对象再传递的时候传递的是堆的内存地址（浅拷贝） 

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <h1>组件外面 -----{{userInfo.nickName}}</h1>
        <button @click="nickName='炎拳'">按钮</button>
        <aaa :user-info="userInfo"></aaa>
    </div>

    <!-- 所谓组件自身的数据，可以简单理解就是组件内部data中本身就存在的数据 -->
    <template id="temp1">
        <div class="box">
            <h2>大家好,我叫{{userInfo.nickName}}</h2>
            <button @click="changeUserInfo">内部按钮</button>
        </div>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
            data() {
                return {
                };
            },
            methods: {
                changeUserInfo() {
                    this.userInfo.nickName = '电锯人';
                }
            },
            // 数组语法
            props: ["userInfo"]
            // 对象语法
            // props: {
            //     userInfo : {
            //         nickName
            //     },

            // }
        };
        const app = Vue.createApp({
            data() {
                return {
                    userInfo: {
                        nickName: '大哥哥'
                    }
                };
            },
            methods: {

            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 再上面的代码中，我们本传递到aaa中的是一个原始数据类型，但是现在我们把它改成了一个userInfo的对象，它是一个引用数据类型，对象在传递的时候是地址传递（浅拷贝），同时去修改userInfo的时候，就可以修改userInfo内部的东西
> 

### 7.2、利用自定义事件

vue官方推荐使用自定义事件来解决数据流单向的问题

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <h2>我的名字叫做:{{userName}}</h2>
        <aaa :my-name="userName" @abc="changeMyName"></aaa>
    </div>

    <!-- 所谓组件自身的数据，可以简单理解就是组件内部data中本身就存在的数据 -->
    <template id="temp1">
        <div class="box">
            <h2>我的名字叫做{{myName}}</h2>
            <button @click="changeMyName">内部修改名字的按钮</button>
        </div>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
            data() {
                return {
                    userName: '张三',
                    newName: '帕瓦'
                };
            },
            methods: {
                // 这里使用$emit方法，该方法会创建并触发一个自定义事件
                changeMyName() {
                    this.$emit('abc', this.newName);
                }
            },
            // 数组语法
            props: ['myName'],
            // 对象语法
            // props: {
            //     userInfo : {
            //         nickName
            //     },

            // }
        };
        const app = Vue.createApp({
            data() {
                return {
                    userName: '张三'
                };
            },
            methods: {
                changeMyName(data) {
                    this.userName = data;
                    // this.userName = '早川秋';
                }
            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 在上面的代码中，我们在子组件aaa中声明了一个changeMyName的方法，该方法会触发一个自定义事件abc，然后，我们在父组件中调用该子组件并且监听abc事件
>
> 当子组件aaa中的changeMyName方法被执行后，就会触发abc事件，同时父组件中会监听到abc事件的触发从而执行了父组件中的changeMyName的方法
>
> 而父组件中的changeMyName方法是修改父组件自己的userName的数据值，而userName的数据值又通过aaa组件的自定义属性传递给了aaa组件内部，所以当userName的值被修改的时候传递给子组件的值也会被修改
>
> 把上面一系列逻辑总结到一起：
>
> 在子组件中触发了自定义事件abc，然后abc执行了父组件的changeMyName方法，该方法修改了父组件的userName，所以传递给子组件的uerName的值也一并修改，最终形成了一个通过子组件触发父组件方法来修改父组件数据的这么一个流程

同时，如果组件的内部要触发自定义事件，还可以将子组件内部的数据一并传递给外部

```js
this.$emit("abc",参数2)
```

这里参数2就是传递给外部组件的数据

同时，在父组件中被自定义事件触发的方法可以接受到emit传递的数据，从而实现了子组件向父组件传递数据的操作

完整代码如上面的代码块

## 8、组件的插槽

当我们在封装组件的时候，我们会发现有一些情况下90%的标签结构都是一样，而小部分地方的标签结构不一样，这种情况下了我们就可以把小部分不同的地方空出来，放入一个插槽，后期通过插槽插入不同的标签结构即可

### 8.1、普通插槽（默认插槽）

举例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <aaa>
            <input type="text">
        </aaa>
    </div>
    <template id="temp1">
        <slot></slot>
        <h2>大家好</h2>
        <h2>我是一个组件</h2>
        <slot></slot>
    </template>

    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
        };
        const app = Vue.createApp({
            data() {
                return {
                    userName: '张三'
                };
            },
            methods: {
                changeMyName(data) {
                    this.userName = data;
                    // this.userName = '早川秋';
                }
            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 插槽的制作依靠**一个slot标签来完成**，在template中写入slot标签，表示该slot所处的位置，会作为一个插槽空出来，然后，我们可以通过在虚拟标签的中间插入内容，从而将插入的内容插入到slot插槽所在的位置
> 

### 8.2、具名插槽

故名思意就是具有名字的插槽，插槽在默认情况是不写的名字（默认名字就是“默认”），但是也可以指定名字，然后我们就可以通过名字来指定哪个内容插入到哪个插槽

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <aaa>
            <template #default>
                <input type="text">
            </template>
            <template v-slot:footer>
                <button>按钮</button>
            </template>

        </aaa>
    </div>
    <template id="temp1">
        <!-- 默认插槽 -->
        <slot></slot>
        <h2>大家好</h2>
        <h2>我是一个组件</h2>
        <!-- 具名插槽 -->
        <slot name="footer"></slot>
    </template>

    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
        };
        const app = Vue.createApp({
            data() {
                return {
                    userName: '张三'
                };
            },
            methods: {
                changeMyName(data) {
                    this.userName = data;
                    // this.userName = '早川秋';
                }
            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> 具名插槽通过给slot标签的name属性设置值来取名字
>
> 如果这个插槽没有名字默认就有一个叫做default的名字，也叫默认插槽
>
> 如果想向一个具名插槽插入内容，应该使用 <template v-slot:插槽名>来插入
>
> v-slot是vue2.6.1之后更新的语法



现在在vue3中又有新的插槽语法：

```html
<template #default>
    <input type="text" >
</template>
<template #footer>
    <button>按钮</button>
</template>
```

在新语法中，我们把` v-slot:插槽名` 改成了 `#插槽名`

现在我们了解插槽之后，我们来尝试做一个简单封装案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .title-bar {
            display: flex;
            padding: 0 20px;
            height: 60px;
            background-color: skyblue;
            justify-content: center;
            align-items: center;
            position: relative;
            color: aliceblue;
        }

        .left-back {
            position: absolute;
            left: 20px;
        }

        .right-menu {
            position: absolute;
            right: 20px;
        }
    </style>
</head>

<body>
    <div id="app">
        <title-bar>
            微信
            <template #right>
                搜索
            </template>
        </title-bar>
        <!--  -->
        <title-bar :show-back="true">
            朋友圈
            <template #right>
                发朋友圈
            </template>
        </title-bar>

    </div>
    <template id="temp1">
        <div class="title-bar">
            <div class="left-back" v-show="showBack">返回</div>
            <slot></slot>
            <div class="right-menu">
                <slot name="right"></slot>
            </div>
        </div>
    </template>
    <script src="./js/vue3.global.js"></script>
    <script>
        const app = Vue.createApp({
            data() {
                return {
                    userName: '张三'
                };
            },
            methods: {
                changeMyName(data) {
                    this.userName = data;
                    // this.userName = '早川秋';
                }
            },

        });
        app.component('title-bar', {
            template: '#temp1',
            props: {
                showBack: {
                    type: Boolean,
                    default: false
                }
            }
        });
        app.mount('#app');
    </script>
</body>

</html>
```

> 代码分析：
>
> ### 以上代码，我们自己封装了一个title-bar全局组件，然后通过不同地方的调用来插入不同的内容从而实现了html的复用

## 9、插槽的默认值

**插槽可以设置默认的内容**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <aaa>
            <!-- <template #default>
                <input type="text">
            </template> -->
            <template v-slot:footer>
                <button>按钮</button>
            </template>

        </aaa>
    </div>
    <template id="temp1">
        <!-- 默认插槽 -->
        <slot>
            <button>我是默认值</button>
        </slot>
        <h2>大家好</h2>
        <h2>我是一个组件</h2>
        <!-- 具名插槽 -->
        <slot name="footer"></slot>
    </template>

    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
        };
        const app = Vue.createApp({
            data() {
                return {
                    userName: '张三'
                };
            },
            methods: {
                changeMyName(data) {
                    this.userName = data;
                    // this.userName = '早川秋';
                }
            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

## 10、插槽作用域

**作用域插槽就是在插槽中调用组件内部的数据**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 300px;
        border: 2px solid #000;
        padding: 10px;
    }
</style>

<body>
    <div id="app">
        <aaa>
            <template #default="scope">
                <h3>我是插入的内容---{{scope.age}}---{{scope.abc}}</h3>
            </template>
        </aaa>
    </div>
    <template id="temp1">
        <h2>我是一个组件</h2>
        <slot abc="123" :age="age"></slot>
    </template>

    <script src="./js/vue3.global.js"></script>
    <script>
        let aaa = {
            template: '#temp1',
            data() {
                return {
                    userName: '张三',
                    age: 18
                };
            },
        };
        const app = Vue.createApp({
            data() {
                return {
                    userName: '张三'
                };
            },
            methods: {
                changeMyName(data) {
                    this.userName = data;
                    // this.userName = '早川秋';
                }
            },
            //这里注册局部变量
            components: {
                aaa
            }
        });

        app.mount('#app');
    </script>
</body>

</html>
```

同时，我们也可以采用ES6解构取值的方式直接从scope中获取需要渲染的数据

```html
<template #footer="{age,abc}">
    <h3>我是插入的内容 --- {{age}} --- {{abc}}</h3>
</template>
```

