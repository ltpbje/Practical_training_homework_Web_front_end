
# **nodeJS**

简单来说就是JavaScript在服务器上的运行环境



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

# nodeJS第三方模块
之前我们学习了内置模块，其实node还有大量的第三方模块提供给我们，比如，axios请求库，抓包分析cheerio，数据库操作mysql，还有比较一些基于nodeJS环境下运行的后端程序框架express，koa，egg等这些第三方模块有一个专门的管理工具叫做npm，在安装nodejs的时候已经自带安装了这个工具 network package mananger

## 1、npm初始化

nodeJS都是以文件夹为单位来管理项目，如果当前的文件夹是一个node项目则应该首先进行初始化操作，初始化操作命令

```cmd
npm init
```

在初始化过程中会叫你添加项目的注册信息：

- package name：项目名称
- version：版本号
- description：项目简介
- entry point：项目入口文件
- test command：项目的自定义命令
- git repository：项目版本控制
- keywords：项目关键字
- author：项目作者
- license: (ISC) ：项目发行许可

初始化完成之后会生成一个package.json的文件，这个文件主要就是用来记录当前项目的详细信息，后面我们如果安装了第三方模块，还会将这些第三方相关的依赖包信息也进行记录，方便后续版本迭代、项目迁移、项目上线部署的时候还原项目，也可以防止项目维护中的误删除操作

## 2、npm远程仓库



有一个网站上面记录了npm这个包管理器中所管理的所有的第三方模块，网站地址：www.npmjs.com，我们可以根据自己的需求去查找包的相关信息同时我们也可以通过npm包管理器提供的相关指令直接在命令行中进行操作

```cmd
npm info 包名称 #查询包信息
npm install 包名称 #安装包
```

同时我们在执行包安装的时候还会添加一些名称参数（选项）来对安装信息做一些记录

- --save：生产环境
- --save-dev：开发环境

而当我们做好以上记录之后，当我们的项目发生迁移迭代或者上线部署的时候，我们可以通过以下命令做包的重构

```cmd
npm install
```

同时，我们在安装包的时候还可以直接包的版本

```cmd
npm install axios@1
```

如果需要卸载已经安装好的包

```cmd
npm uninstall 包名称
```

> **npm**  **镜像设置**
>
> 由于npm在下载包的时候是从国外服务器下载，所以会非常慢，并且经常超时
>
>
> 到底下载失败，所以我们会设置npm使用国内镜像的地址来进行下载安装
> ```cmd
> npm config set registry https://registry.npmmirror.com
> ```

命令总结：

| **说明**         | **命令**                    | **简写**                  |
| ---------------- | --------------------------- | ------------------------- |
| 安装包           | npm install 包名            | npm i 包名                |
| 安装生产环境包   | npm install 包名 --save     | npm i 包名 -S             |
| 安装开发环境包   | npm install 包名 --save-dev | npm i 包名 -D             |
| 删除包           | npm uninstall 包名          | npm un 包名               |
| 只安装生产环境包 | npm install --production    | npm i -production         |
| 只安装开发环境包 | npm install --development   | npm install --development |

## **3、使用 axios + cheerio 完成数据抓取**

制作一个简单的本地基于node运行的数据抓取的小工具，需要使用到的两个包

1、axios这个是一个跨平台的包，可以在node环境下使用，也可以直接在浏览器中使用，这个是一个当前比较主流的用来做http/https数据请求的库

2、cheerio ，这个包是一个html文档分析的包，然后我们可以通过JQuery的语法来操作html字符串中的数据

```js
const axios = require("axios");
let url = "https://axios-http.com/zh/docs/example";
const getData = async () => {
let resp = await axios.get(url);
console.log(resp.data);
}
getData();
```

>
>
>代码分析：
>
>经过上面的代码，我们可以得到服务器返回的结果，这个结果是一个浏览器请
>
>求一个网站以后返回的结果，其中响应的结果是一个固定的数据结构，其中真
>
>实的响应数据在这个数据结构的data属性中，返回的数据一般会根据后端的设
>
>置情况来决定的，这里的请求的地址请求的并不是单纯的数据，而是请求的页
>
>面（html字符串）
>
>总结以上步骤：
>
>1、axios模拟了一个请求
>
>2、axios是基于Promise封装的一个请求库，所以我们可以使用 await / async
>
>或者 then().catch() 来实现响应处理
>
>3、响应结果会在axios中发送请求的方法的返回值中，其中真实数据的部分在
>
>返回值的data属性中

抓取图片

```js
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const getData = async () => {
try{
let result = [];
let url = 'https://www.jd.com';
let resp = await axios.get(url);
let $ = cheerio.load(resp.data);
$(".service_list li").each((index,item) => {
let obj = {};
obj.imgSrc =
$(item).find(".service_ico_img").attr("src");
obj.title = $(item).find(".service_txt").text();
result.push(obj);
})
fs.writeFileSync(path.join(__dirname,"/imgResult.txt"),JSON.stri
ngify(result),{encoding:"utf8"});
console.log("写入成功");
//图片的真实地址已经被我们抓取到了，现在我们可以开始下载图片了
for(let item of result){
//遍历所有的图片地址
let url2 = item.imgSrc;
let p = await axios.get(url2,{
responseType:"stream"
})
let currentImgPath =
path.join(__dirname,`/iconImg/${item.title}.png`);
//创建一个可以写入流数据的容器
let currentImgStream =
fs.createWriteStream(currentImgPath);
p.data.pipe(currentImgStream);
console.log("图片下载成功")
}
}catch(error){
console.log(error);
}
}
getData();
```



>代码分析：
>
>这里代码与上面的文本抓取主要区别的两个地方
>
>1、axios的请求过程中，我们把响应的数据类型改成stream
>
>2、我们使用fs模块中的createWriteStream方法创建一个可以写入流的容器
>
>注意：
>
>上面的功能看起来实现了数据和文件的抓取，但是本质上是利用了文件上传的功能，因为我们现在写的功能都是基于nodeJS的，而nodeJS是JavaScript的服务器运行环境，所以我们这里抓取图片实际上是将一个图片文件传递到我们自己的本地服务器中保存，这个过程其实就是一个文件上传的过程



## 4、nodeJS对Excel文件的操作

先下载第三方模块，node-xlsx

```cmd
npm i node-xlsx -S
```

### 4.1、读取excel文件

```js
const path = require("path");
const fs = require("fs");
const xlsx = require("node-xlsx");
let result = fs.readFileSync(path.join(__dirname,"/demo.xlsx"));
let xp = xlsx.parse(result);
console.log(xp);
```

读取结果

```js
[
    { name: 'Sheet1', data: [ [Array], [Array], [Array] ] },
    { name: 'Sheet2', data: [] },
    { name: 'Sheet3', data: [] }
]
```

它的结果是个数组，在这个数组中有三个对象，这三个对象我们可以认为就是对应的excel表格当中的工作表，里面的name属性就是一个单独的工作表标题，data里面就是当前工作表的数据，然后每一个工作表形成一个对象，然后多个工作表组合成excel数组，我们就认为这个excel数组其实就是整个excel文件然后我们答应工作表中的data属性

```js
[
    [ '姓名', '性别', '身高', '体重' ],
    [ '张三', '男', 170, 170 ],
    [ '李四', '女', 170, 170 ]
]
```

以上就是data中的数据结构，我们可以发现，data是一个二维数组，其中二维的部分的每一个数组就相当于是一行数据接下来把上面的数据转换成JSON格式



>注意：
>
>千万不要直接就序列化，因为JSON对象是按键值对的形式来储存数据的，但是上面的数据中只有值（value），没有键（key），所以对于这种数据我们在转JSON的时候需要对其做一些二次处理，给这些数据拼上key

```js
const path = require("path");
const fs = require("fs");
const xlsx = require("node-xlsx");
let result = fs.readFileSync(path.join(__dirname,"/demo.xlsx"));
let xp = xlsx.parse(result);
//将xp中的数据转换成JSON格式
let resultArr = [];
let firstExcelTable = xp[0];
for(let i = 0;i < firstExcelTable.data.length;i++){
//每循环一次，代表一行数据
let obj = {};
for(let j = 0;j < firstExcelTable.data[i].length;j++){
//遍历一行当中的每一个数据
let propertyName = firstExcelTable.data[0][j]; //获取obj对
象的属性名
obj[propertyName] = firstExcelTable.data[i][j]; //获取obj
对象的属性值
}
resultArr.push(obj);
}
fs.writeFileSync(path.join(__dirname,"/excel.json"),JSON.stringif
y(resultArr),{encoding:"utf8"})
console.log("写入成功")
```

### 4.2、写入excel文件

```js
const path = require("path");
const fs = require("fs");
const xlsx = require("node-xlsx");
//第一步：读取JSON文件
let result1 =
fs.readFileSync(path.join(__dirname,"/excel.json"));
let objStr = result1.toString();
let jsonObj = JSON.parse(objStr);
//第二步：构造所需的excel数据结构
let excelObj = {
name:"haha",
data:[]
}
//第三步：转换数据结构
//构造第一行数据，也就是excel的表头，内容即为现在jsonObj对象的属性名
let excelFirstLine = Object.keys(jsonObj[0]);
//将第一行数据添加到工作表的data中
excelObj.data.push(excelFirstLine);
//接下来添加excel当中真正的数据，也就是每个对象的属性值
jsonObj.forEach(item => {
excelObj.data.push(Object.values(item));
});
//第四步：根据数据生成excel文件
//现在我们把excelObj当中的数据再转回成buffer类型，准备写入
let excelBuffer = xlsx.build([excelObj]);
//把数据写入到硬盘（注意：写入硬盘实际就是把数据作为文件保存下来）
fs.writeFileSync(path.join(__dirname,"/new.xlsx"),excelBuffer,
{encoding:"utf8"})
console.log("写入成功")
```

