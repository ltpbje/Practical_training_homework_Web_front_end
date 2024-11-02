

# **nodeJS**

简单来说就是JavaScript在服务器上的运行环境

test

我们之前在学习JavaScript的时候有这么一个概念，JavaScript是运行在浏览器上面的，它必须依托HTML才能存在，没有网页的存在就没有JS的执行， 所以我们认为浏览器和HTML就分别是JavaScript在客户端中运行的平台和环境，但是后期人们把运行在浏览器中的chorme V8移植到了服务器里，这样就可以保障我们的JS代码可以在服务器端运行，而不需要依赖浏览器和网页了

> 注意：
>
> node中只有ES，没有DOM和BOM

## 1、nodeJS基础
安装好之后，可以在命令行终端输入 node -v查看，如果显示了版本号就说明安装成
功
安装成功之后，我们如果想允许一个JS文件非常简单，一个指令

```powershell
node 文件名.js //node指令后面其实是一个路径指向一个需要执行的JS文件
```

在node中不能允许DOM和BOM，只能允许ECMAScript

```powershell
window.alert("a"); //报错，因为window是BOM中提供的对象，不能在node中使用
```

## 2、CommonJS模块化开发

之前我们在学习ES6+的时候，使用的是ESModule的模块化规范，这是ES的通用规范，基本上90%以上使用到JS的地方都是遵循这个规范，但是node就不是的，它执行的是CommonJS规范

> **模块化开发现行规范**
>
> 1、浏览器及ECMA执行的是通用规范ESModule
>
> 2、nodeJS平台使用的是CommonJS

| **规范** | **导入**  | **导出**       |
| -------- | --------- | -------------- |
| ESModule | import    | export default |
| CommonJS | require() | module.exports |

## 3、CommonJS的模块导入

现在有以下文件

a.js

```js
console.log("我是a文件")
```

b.js

```js
console.log("我是b文件");
require("./a.js") //console.log("我是a文件")
require("./a.js") //console.log("我是a文件")
require("./a.js") //console.log("我是a文件")
require("./a.js") //console.log("我是a文件")
require("./a.js") //console.log("我是a文件")
require("./a.js") //console.log("我是a文件")
```

当我们多次导入的时候，我们发现最终a.js的代码只执行了一次

require方法导入一个模块之后，它会这个模块缓存下来，下在再导入的时候，则直接从缓存里面拿，在上面的代码中，表面上看起来是导入了6次，但是实际上只有第一次导入是真的导入了，剩下的5次全部都是从缓存里面拿的

## 4、CommonJS的模块导出

导入和导出其实是一对，所以在node中如果我们导出可以使用以下两个方式

1、module.exports 直接导出

2、exports 指针导出



a.js

```js
let userName = 123;
module.exports = userName;
```

b.js

```js
const userName = require('./a.js');
console.log(userName);
```

以上完成了一个基础的导入导出

在CommonJS规范中，每个文件都会专门用于导出的属性叫做module.exports，而

在require中导入的实际上module.exports



### 4.1、module.exports

在每个文件里面都会有一个负责导出的对象，module.exports，如果我们直接打印

这个对象我们会看到一个空对象

```js
let userName = 123;
let age = 20;
let obj = {
userName,
age
}
module.exports = obj;
```

如果我们有多个变量需要同时导出，我们可以把这个变量封装成对象，然后导出

b.js

```js
const {userName,age} = require('./a.js'); //ES6解构导入
console.log(userName);
```

### 4.2、exports

在CommonJS当中，真正负责导出的只有module.exports，但是还有一个指针可以

指向这个module.exports

```js
module.exports === exports
```

a.js

```js
let userName = 123;
let age = 20;
module.exports = userName;
exports = age;
```

b.js

```js
const abc = require('./a.js');
console.log(abc);
```

上面的代码中，既有module.exports，又有exports，那么b里面到底导入的是谁？

始终记住一句话，真正负责导入的是 module.exports ，所以结果是userName



## 5、node平台的模块化功能

node是一个运行平台，与浏览器一样用于运行JS，同理在弄得、上面，它会内置一些模块提供给我们使用

### 5.1、path模块

path模块是node平台子代的模块化开发中使用的一个内置模块，遵循CommonJS的模块化开发规范

```js
__dirname //代表当前JS文件所属的文件夹所在目录的路径
__filename //代表当前JS文件的路径
```

以上两个内置变量是node平台上面的最基础的两个点，也是经常会使用到的变量，
这两个变量负责路径
其中关于路径的处理，nodeJS平台有专门的模块去处理，这个模块就是path模块，
它不用下载，在安装nodeJS的时候就已经自带了



```js
const path = require("path")
```


```js
const path = require("path")
//1、join方法路径拼接
let p1 = path.join(__dirname,'/txt');
console.log(p1);
//2、extname方法，获取某个路径的后缀名、
let p2 = path.extname(__filename);
console.log(p2);
//3、isAbsolute方法，判断是否是绝对路径
let p3 = path.isAbsolute(__dirname);
console.log(p3);
//4、resolve方法，将相对路径转换成绝对路径
let p4 = path.resolve("./txt/abc.txt");
console.log(p4);
```

### 5.2、fs模块



一般我们有了路径之后，就会有文件，我们可以通过某一个路径找到某一个文件或者目录，在node当中有一个专门用来读写文件的模块就是FS模块（flie system）

```js


const path = require("path");

const fs = require("fs");
//1、fs.existsSync() 判断路径是否存在
let p1 = path.join(__dirname,"/txt/abc.txt");
let result = fs.existsSync(p1);
console.log(result);
//2、fs.rmdirSync() 删除空文件夹，如果删除的不是空文件夹会报错
let p2 = path.join(__dirname,"/img");
if(fs.existsSync(p2)){
fs.rmdirSync(p2);
}else{
console.log("这个文件夹路径不存在")
}
//3、fs.unlinkSync() 根据路径删除文件
let p3 = path.join(__dirname,'/txt/abc.txt');
if(fs.existsSync(p3)){
fs.unlinkSync(p3)
}else{
console.log("这个文件不存在")
}
//4、fs.copyFileSync(oldPath,newPath) 复制文件
let oldPath = path.join(__dirname,"/txt/abc.txt");
let newPath = path.join(__dirname,"/123/abc.txt");
fs.copyFileSync(oldPath,newPath);
//5、fs.renameSync(oldPath,newPath) 文件重命名
let oldPath = path.join(__dirname,"/txt/abc.txt");
let newPath = path.join(__dirname,"/txt/123.txt");
fs.renameSync(oldPath,newPath);
//6、fs.mkdirSync() 根据路径创建文件夹
let p6 = path.join(__dirname,"/css");
if(fs.existsSync(p6)){
console.log("当前路径已经存在")
}else{
fs.mkdirSync(p6);
}
//7、fs.readdirSync() 读取某一个路径下的文件夹内部信息
let arr = fs.readdirSync(__dirname + "/txt");
console.log(arr);
```

8. fs.statSync() 读取路径状态

```js
let sta = fs.statSync(__dirname + "/txt");
console.log(sta);
sta.isFile() //判断是否是文件路径
sta.isDirectory() //判断是否是文件夹路径
```

9、fs.readFileSync() 通过路径读取路径指向文件的内部内容

```js
let result = fs.readFileSync(__dirname + "/123/abc.txt",{
encoding:"utf8"
})
console.log(result);
```

10、fs.writeFileSync() 把内容写入一个文件

```js
let str = `今天天气不错`;
fs.writeFileSync(__dirname + "/123/abc.txt",str,
{encoding:"utf8"})
```

