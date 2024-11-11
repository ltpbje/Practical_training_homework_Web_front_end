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

