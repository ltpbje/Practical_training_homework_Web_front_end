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