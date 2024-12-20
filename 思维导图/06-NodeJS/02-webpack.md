# webpack

现在我们接触了node可以发现，再node环境下做开发的时候会有大量的依赖文件生成，这个时候会导致一些问题

- 同一个JS文件在不同的页面中进行引入，能否导入一次之后按需加载
- 因为前端代码是直接运行在浏览器里面，所以我们也不能使用最新语法，因为要考虑兼容性的问题
- 我们页面会有很多css3.0的样式，这些样式代码也需要考虑兼容性的问题
- 一个网页当中的css文件和js文件非常多，这些文件都是同script和link标签导入的，这样导入会导致页面请求次数过多

需要处理以上的问题，我们就需要一种打包技术

目前的打包工具有很多：

1、gulp

2、grunt

3、webpack

4、rollup

5、rolldown

## 1、什么是webpack

我们可以把webpack理解成是一个产品经理，他本身不干任何事情，他如果想干什么事情会找别人来做（第三方模块插件）

webpack可以将各种松散的资源打包到一起，可以实现按需加载，同时打包的过程当中可以加载第三方的模块和插件来实现一些特殊效果，比如，提高css的兼容性，将ES6的代码转换成ES5



## 2、webpack的四个核心点

1、入口 entry

2、出口 output

3、模块 loader

4、插件 plugin

入口决定了程序在什么地方开始，出口决定了程序打包之后生成的地方，loader决定了当前你使用什么规则来处理你需要打包的代码，插件决定了打包好之后的可以干什么

## 3、webpack安装

```cmd
npm i webpack webpack-cli -D
```

webpack：打包工具本身

webpack-cli：让webpack可以使用命令行来操作

Person.js

```js
class Person {
    constructor(nickName){
        this.nickName = nickName;
    }
}
export default Person
```

Student.js

```js

import Person from './Person.js';
class Student extends Person {
    constructor(nickName, sex) {
        super(nickName);
        this.sex = sex;
    }
    sayHello() {
        console.log(`大家好，我叫${this.nickName}`);
    }
}
export default Student;
```

index.js

```js
import Student from "./Student.js";
let s = new Student("张三","男");
s.sayHello();
```

现在我们使用node执行index.js文件，会发现一个问题，nodeJS是不支持ESModule，它会报错，所以我们可以使用webpack来整合一下

现在我们知道index.js是整个程序的入口

现在我们可以在package.json中配置一个执行脚本build

```json
"build":"webpack ./index.js -o ./dist"
```

>在package.json文件中有一个scripts选项，这个选项是用来编辑npm执行脚本的一个选项，当我们有一些工具的命令需要使用的时候，我们可以通过该选项进行一个封装处理，包装成一个npm指令
>
>这个时候，当一些工具的指令需要配置环境变量的时候，我们就不需要配置了，直接npm自己会帮我们去直接找到对应的指令文件来执行

然后我们只需要执行`npm run build` 来启动webpack打包即可

上面我们进行了简单的webpack运行，并没有加载任何配置，这种方式我们基础上是不用的，因为我们使用webpack除了整合项目之外，还需要使用大量的第三方模块和插件来完成一些更高级的功能，所以需要一些更精细划的配置行为，这个时候，我们就开始真正的配置webpack

## 4、webpack配置

webpack配置分为两个情况：

1、生产环境

2、开发环境

### 4.1、生产环境配置

> 注意：
>
> 我们这里虽然是配置的生产环境的配置，但是我们实际在写mode的时候会写成development，这里主要是为了方便观察打包之后的代码，因为生产环境打包后的代码会压缩，没有格式，可读性非常差

**在当前项目下新建一个js文件叫做webpack.config.js**

```js
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行
打包;
//webpack的配置文件中，使用CommonJS模块化规范
const path = require("path");
const config = {
    //mode设置webpack基于开发或者生产环境打包
    mode: "development",
    //entry设置webpack的入口文件路径
    entry: path.join(__dirname, "./js/index.js"),
    //output设置webpack打包之后生成的新文件的文件名和保存路径
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "./dist"),
        publicPath: "./"
    },
    //module在打包过程根据你自己的需求载入webpack的第三方模块，对打包过程添
    加规则
    module: {
    
    },
    //plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
    ]
};
module.exports = config;
```

接下来在package.json中修改webpack的驱动脚本，因为我们已经通过配置文件配置了webpack的入口和出口，所以不再需要直接在webpack指令后面设置入口和出口，同时将webpack的启动配置为通过webpack.config.js文件作为配置文件进行启动

```js
"build":"webpack --config ./webpack.config.js"
```

以上代码就表示，现在webpack在启动的时候需要使用webpack.config.js文件作为配置文件使用

>**强调：**
>
>在上面的配置文件中，我们把mode写成了development，这样生成的代码是没有经过压缩的，方便我们阅读，但是实际写的配置还是生产环境下的5、babel的配置与使用
>

## 5、babel的配置与使用

babel的本身就是一个完整的JS编译器，其主要作用就是对JS的语法进行兼容处理，babel根据模块化的思维拆分成了多个模块组成，所有的babel模块都做为一个独立的npm包发布的，起始范围@babel（从babel7开始）

- @babel/core 将源代码转换成抽象语法树（AST）
- @babel/cli 可以使用babel使用命令行编译文件
- @babel/plugin* 语法转换插件
- @babel/preset-env ES6语法转换插件的集合
- @core-js ES6新增API的补丁：这个主要是用ES5来实现ES6+的API，比如像
- Proxy，Symbol由于ES5局限性，无法对其转换
- @babel/plugin-transform-runtime 复用帮助模块，为代码创建一个沙盒环境

现在我们已经配置了好了基础的配置文件，现在需要提高JS代码的兼容性，**将ES6+的语法转换成ES5的代码**，  **但是webpack本身是不具备这个功能的**，**它需要借助第三方的loader来实现，而babel就是专门用来转换ES代码**

**安装所需要的包**

```cmd
npm i babel-loader @balbel/core -D
```

- babel-loader 基于webpack的babel模块包
- @balbel/core 实现ES转换编译的核心

配置规则：

```js
module: {
    //rules是一个webpack的规则数组，数组中的每一个元素就是一条规则，每一条规
    则就是一个匿名的配置对象;
    rules: [
        //创建一条规则，这条规则适用于所有的JS文件
        {
            test: /\.js$/, //匹配所有的JS文件
            exclude: /node_modules/, //把mode_modules目录中的js文件
            排除在babel的转换以外
            loader: "babel-loader" //把当前规则所匹配的JS文件在打包过
            程中需要进入到babel中进行处理
        }
    ];
}
```

>代码分析：
>
>上面的代码的意思，告诉webpack如果匹配到了除node_modules目录以外的JS文件，就使用第三方模块babel-loader来进行处理
>
>当我们去配置上面的规则之后，我们发现JS代码并没有转换成ES5的，为什么？

### 5.1、配置babel的预设信息

如果要让babel来处理自己的JS代码，一定要告诉它你的预设信息是什么（就是你最终想要的效果是什么）

**在项目目录中创建一个文件，取名 .babelrc，作为语法转换的配置文件**

下载@babel/preset-env

```cmd
npm i @babel/preset-env -D
```

怎么来理解这个包的作用，我们可以把名字拆成两半来看

- preset 预设好的插件集合包
- env 目标环境

Babel编译的是ES6+的语法，这个编译是同plugin语法转换插件来实现的，但是每年都会有新的ES提案，也就是新的语法，但是我们不可能一个一个插件去单独配置，所以有了preset这个东西，我们就不需要再单独一个一个的进行配置，只要有新语法的转化插件，只需要把这个插件装入preset插件集合包当中就可以自动配置

所以这个包的作用就是根据当前的配置来进行**自动化的语法转换**

> **但是在ES6 除了语法以外，还有很多新增的API**

比如，Map，Set，Reflect，Proxy，这些对象在ES5中是不存在的，怎么办？

为什么了弥补ES5里面没有ES6新增的对象特点，babel还需要加载一个core-js

```cmd
npm i @babel/plugin-transform-runtime @babel/runtime core-js@3 -D
```
1、**core-js@3**
这个包主要的作用就是在于实现ES6新增语法API的转换

2、**@babel/runtime**（这个包在安装@babel/preset-env会一起安装，但是我们还是再安装一次）

在实现ES语法转换的时候，@babel/preset-env 依赖包会在JS文件中注入一些辅助函数来帮助高版本语法向底版本语法兼容的转换，但是，我们实际项目中会有非常多的JS文件的，那么就意味着，这些辅助函数在没有一个JS文件中都会被注入一遍，这个时候通过@babel/runtime可以将这些辅助函数做一个npm依赖包，通过导入的方式在所需要转换的JS文件中注入辅助函数，从而压缩项目体积，提高代码复用

3、**@babel/plugin-transform-runtime**

上面我们提供@babel/runtime 将辅助函数作为一个npm包进行引用，但是这个引用的过程是一个手动的，需要开发者自己手动在需要转换的JS文件中写入引入代码，同时，@babel/preset-env的编译会给转换的JS文件写入一遍辅助函数，所以需要我们把@babel/preset-env写入的辅助函数删除掉，同时又要把@babel/runtime包中的辅助函数自动引入，@babel/plugin-transform-runtime就可以实现

> **扩展内容：**
>
> 

> **@babel/plugin-transform-runtime** **三大作用**
>
> 1、自动移除语法转换后内联的辅助函数（inline Babel helpers），使用
>
> @babel/runtime/helpers 里面的辅助函数来替换
>
> 2、当代码里面使用了core-js的API，自动引入@babel/runtime-corejs3/core
>
> js-stable，以此作为替换全局引入的core-js/stable
>
> 3、当代码中使用 Generator / async函数，自动引入
>
> @babel/runtime/regenrator，以此来替代全局引入的regenrator-rumtime/runtime
>
> **注意：**
>
> 我们现在安装了一个core-js@3包，这个包的作用上面我们也提到过，可以让ES5实现ES6+的新增API，但是，无法转换生成器函数和async函数，所以我们会使用@babel/ployfill（已被弃用）这个包来进行补齐，不过这种方式会造成全局污染，例如，Promise，我们的ployfill是对浏览器的全局对象进行重新赋值，重写了Promise及其原型链，这个时候JS开发的就会出现冲突，这个时候@babel/plugin-transform-runtime的第二条作用就可以解决这个问题，第三条作用其实也一样
>
> 
>
> 但是，这里还有一个情况，因为polyfill已经被弃用，那么就意味着我们不能使用这个包进行补齐，其实我们稍微了解以西polyfill这个包的本质就可以解决这个问题，其实这个polyfill包内部包含了两个包，分别就是core-js和regenerator-runtime，core-js我们知道是干嘛的，regenerator-runtime这个包作用是用来补齐生成器函数和async函数，而上面的第三条的作用就是自动引入@babel/runtime/regenrator，而这个包等价于regenerator-runtime的作用，而@babel/runtime/regenrator这个包在安装@babel/preset-env的时候就已经内置安装了，不给过在我们当前项目中，我们一般还是会再单独安装一遍@babel/runtime

同时基于上面的内容，我们还可以安装一个包 @babel/runtime-corejs3

```cmd
npm i @babel/runtime-corejs3 -D
```

### 5.2、配置babel-loader预设

上面我们再项目的根目录中创建一个`.babelrc`文件，这个文件作为我们再webpack中载入babel-laoder的配置文件使用

>注意：
>
>文件名于文件路径不要随意更改，并且这里写的配置语法是一个JSON对象，基于基本键值对的逻辑来完成的配置

.babelrc

```json
// babel的配置文件
{
  // 预设信息
    "presets": [
        // 代表现在使用默认配置好的插件包集合
        [
            "@babel/preset-env",{
                // 使用了插件包中的哪个插件，在打包的时候就打包哪个插件
                "useBuiltIns":"usage",
                // 指定core-js 的版本是3
                "corejs":"3",
                // 目标环境
                "targets":{
                    "browsers":[
                        // "ie 6"
                        //最新的两个大版本
                        "last 2 versions",
                       //全球使用人数超过1%的浏览器
                        "> 1%",
                      //排除超过两年没有更新的浏览器
                        "not dead"
                        //这里最终的过滤结果就是通过last 2 versions筛选的浏览器中，全球使用率低于1%  且官方声明不再维护或者事实上已经两年没有更新过版本的浏览器
                    ]
                }
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

**useBuiltIns：**

- entry：再打包入口文件中导入API的补齐模块
- usage 自动打包需要使用的模块，没用的不管
- false 默认值

**targets：**

- browsers 设置目标环境（需要兼容的浏览器）

**modules：**

 -  commonjs 使用commonjs模块化语法做导入导出
 -  auto
 - false 使用ESModules规范

## 6、配置html-webpack-plugin

上面打包好的JS文件最终是要在html文件里面使用的，所以我们生成的JS文件需要自动插入到所需要的html文件中，这个时候我们可以使用webpack的插件html-webpack-plugin

安装插件

```cmd
npm i html-webpack-plugin -D
```

**准备一个html文件作为引入打包好的JS文件的模板文件使用**

配置插件

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = {
    //.........
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './index.html'),
            //生成的新文件名称
            filename: 'index.html',
            //生成的js和css自动插入
            inject: true
        }),
        new CleanWebpackPlugin(),

    ]
};


module.exports = config;

```

## 7、配置clean-webpack-plugin

我们在生成目录中，会有一些不需要的文件，这个时候手动删除是一个很危险的行为，现在我们可以使用clean-webpack-plugin它会自动分析，将不需要的文件删除

安装包

```cmd
npm i clean-webpack-plugin -D
```

配置

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = {
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
       //.........
        new CleanWebpackPlugin(),

    ]
};


module.exports = config;

```

## 8、使用webpack处理css

首先我们先明确，webpack本身只能处理JS，是不支持css执行的，所以我们把css通过import导入JS中来实现CSS打包

新建一个css文件，导入到打包的入口文件中

```js
import "../css/index.css"
```

webpack本身不能加载css代码，在js里面也不能带入css代码，但是可以借助loader来实现

**安装loader**

```cmd
npm i css-loader style-loader -D
```

css-loader：负责解析导入到JS中的css代码

style-loader：在DOM中创建一个style，将css-loader负责解析的样式代码写入到style标签中形成一个内部样式
**配置规则**

```js
//.......
rules: [
    //......
    {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ]
    }
];
//......
```

把配置完成之后，我们可以先去设置css目标环境

可以在package.json设置

```json
"browserslist":[
    "last 2 version",
    "> 1%",
    "ie 6"
]
```

>**扩展：**
>
>这里再package.json中设置的browserslist其实跟.babelrc中配置的targets是一个东西，都是目标环境，只不过在 .babelrc中的是针对babel转换ES语法时配置的目标环境，不会影响到css
>
>而在package.json中写的browserslist是项目全局可用，冰鞋写在不同的位置有优先级存在
>
>
>
>基于上面的内容，我们简单来说下如何管理目标环境（项目需要兼容的浏览器）的几种写法
>
>- 作为babel预设配置文件中的配置写入，这样只针对JS
>- 在项目的package.json中写入，针对项目全局（推荐写法）
>- 在项目的根目录下新建一个 .browserslistrc 文件写入
>
>





## 9、使用postcss处理css的兼容性

安装loader

```cmd
npm i postcss-loader -D
```

配置

```js
{
    test:/\.css$/,
    use:[
        "style-loader",
        "css-loader",
        "postcss-loader"
    ]
}
```

当完成配置之后，我们发现postcss并没有帮助我们解决css兼容性问题，因为postcss只是提供了一个编译环境，在这个环境要如何编译css需要做一个预设信息的配置，这些**预设信息的配置我们通过postcss这个loader自身来完成**

### 9.1、安装postcss的预设信息插件

```cmd
npm i postcss-import postcss-preset-env cssnano -D
```

postcss-import ：如果在css中发现@import指令，进行处理

postcss-preset-env：提供css兼容性处理的插件，自动添加厂家前缀，自动转化代码（以前我们使用的postcss-cssnext已经被弃用）

cssnano：可以对需要处理的css做进一步压缩

### 9.2、配置postcss的预设信息

在当前项目根目录下创建一个文件postcss.config.js，**文件名必须是这个名字**

```js
module.exports = {
    plugins:[
        require("postcss-import"),
        reuqire("postcss-preset-env"),
        require("cssnano")
    ]
}
```

> 注意：
> 如果在编译的时候报 true is not Postcss Plugin 是因为postcss版本过低，我们可以手动提升版本
>
> ```cmd
> npm i postcss@latest -D
> ```
>

## 10、重新分离CSS

我们需要把打包之后的css代码，再单独分离出来方便我们后续的一些处理，需要使用到webpack的一个第三方插件 mini-css-extract-plugin

安装插件

```cmd
npm i mini-css-extract-plugin -D
```

**修改配置规则，并调用css分离插件**

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = {
    // mode设置webpack基于开发或者生产环境打包
    mode: 'development',
    // entry 入口
    //entry设置webpack的入口文件路径
    entry: path.join(__dirname, './js/index.js'),
    // output设置webpack打包之后生成的新文件的文件名和保存路径  出口
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist'),
        publicPath: './'
    },
    // module在打包过程 根据你自己的需求载入 webpack的第三方模块  对打包过程添加规则
    module: {
        //rules是一个webpack的规则数组，数组中的每一个元素就是一条规则  每一条规则就是一个匿名的配置对象
        rules: [
            //创建一条规则，这条规则适用于所有的JS文件
            {
                test: /\.js$/, //匹配所有的JS文件
                exclude: /node_modules/, //把node_modules目录中的js文件排除在babel的转换以外
                loader: "babel-loader",//把当前规则所匹配的JS文件在打包过程中需要进入到babel中进行处理
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './index.html'),
            //生成的新文件名称
            filename: 'index.html',
            //生成的js和css自动插入
            inject: true
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/index.[hash:8].css",
            //是否忽略第三方插件处理
            ignoreOrder: false,
        }),
    ]
};


module.exports = config;

```

> 注意：
>
> 这里我们把分离的css样式放到了一个独立的css文件中，就相当于是把导入到JS中的css做成了一个外部样式，所以，我们这里就不再需要style-loader，因为style-loader本质上来讲是把css-loader解析的css代码做成了一个内部样式



## 11、配置sass

我们通过第三方 sass-loader 来实现

安装包

```cmd
npm i sass-loader -D
```

```js
 {
    test: /\.s[ca]ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    importLoaders: 2
                }
            },
            "postcss-loader",
            "sass-loader"
        ];
}
```

## 12、webpack文件处理

在css样式中我们使用了背景图片，字体文件等一些静态资源，那么，在打包的时候针对这些文件我们需要怎么处理？

现在我们使用的webpack5的版本其实可以自动对文件进行处理，但是处理效果很稀烂，所以，我们还是自己来通过loader去实现，这里我们会使用到 url-loader 和file-loader

- url-loader：用于处理路径
- file-loader：用于处理文件，它会把涉及到的文件拷贝到出口目录中

安装包

```cmd
npm i url-loader file-loader -D
```

### 12.1、图片文件处理

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const loader = require('sass-loader');
const { type } = require('os');
const config = {
     //......
    // module在打包过程 根据你自己的需求载入 webpack的第三方模块  对打包过程添加规则
    module: {
        //rules是一个webpack的规则数组，数组中的每一个元素就是一条规则  每一条规则就是一个匿名的配置对象
        rules: [
        	//.......
            {
                test: /\.(jpe?g|png|gif|svg|bmp|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: "img/",
                            esModule: false,
                            publicPath: '../img',
                            limit: 8 * 1024 //把小于8KB的图片转换成base64格式
                        }
                    },
                ],
                type: 'javascript/auto'
            },

    },
   
};


module.exports = config;

```

> 注意：
在上面规则配置过程中，我们发现我们并没有载入file-loader，但是文件依然处理成功，因为url-loader模块中有一个options叫做fallBack，这个配置默认调用的就是file-loader
**记得把需要打包的图片文件引入到css文件中，不然在webpack打包的时候无法被检索到**

### 12.2、字体文件处理

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const loader = require('sass-loader');
const { type } = require('os');
const config = {
   //.......
    // module在打包过程 根据你自己的需求载入 webpack的第三方模块  对打包过程添加规则
    module: {
        //rules是一个webpack的规则数组，数组中的每一个元素就是一条规则  每一条规则就是一个匿名的配置对象
        rules: [
          	// ......
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: "fonts/",
                            esModule: false,
                            publicPath: '../fonts',
                            limit: 8 * 1024 //把小于8KB的图片转换成base64格式
                        }
                    },
                ],
                type: 'javascript/auto'
            }
        ],

    },
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './index.html'),
            //生成的新文件名称
            filename: 'index.html',
            //生成的js和css自动插入
            inject: true
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/index.[hash:8].css",
            //是否忽略第三方插件处理
            ignoreOrder: false,
        }),
        // 创建一个ProgressBarWebpackPlugin实例，设置进度条的格式为绿色文字“进度:”，白色文字“[:bar]”，绿色文字“:percent”，并且不清除进度条
        new ProgressBarWebpackPlugin({
            format: chalk.green('进度:') + chalk.white("[:bar]") + chalk.green(':percent'),
            clear: false
        })
    ]
};


module.exports = config;

```

总结：

按照上面的逻辑，我们可以认为，其他类型的文件我们都可以按照找个规则设置的逻辑来进行处理

> 注意：
字体和图片作为文件被处理的时候我们设置了limit，所以如果处理的文件大小，小于limit的设置，那么这个文件不会有新文件出现在导出目录中生成，因为小于limit设置的文件都会被转换成base64的格式

## 13、配置打包进度条

因为webpack的打包过程比较慢，所以打包过程中，会给人一种卡住的感觉，我们希望通过进度条来表示我们的打包时在正确的执行中，所以我们会做一个进度条，来查看webpack的打包进度，这个需要一个插件完成

```cmd
npm i chalk@4 progress-bar-webpack-plugin -D
```

chalk 是一个可以在终端例显示彩色字体的包，注意，5的版本不支持node环境下的导入

progress-bar-webpack-plugin 可以显示webpack的打包进度条

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const loader = require('sass-loader');
const { type } = require('os');
const config = {
     //.....
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
      //.......
        // 创建一个ProgressBarWebpackPlugin实例，设置进度条的格式为绿色文字“进度:”，白色文字“[:bar]”，绿色文字“:percent”，并且不清除进度条
        new ProgressBarWebpackPlugin({
            format: chalk.green('进度:') + chalk.white("[:bar]") + chalk.green(':percent'),
            clear: false
        })
    ]
};


module.exports = config;

```

**至此，我们的生产环境配置就完成了，如果要打包生产环境的代码，需要把mod的值改成production**

## 14、多页面配置

多页面配置其实就是要多设置几个入口文件作为打包入口，但是这样就意味着会生成多个打包文件，所以我们在自动插入到html中的时候也需要做对应的多套配置，说明哪个打包文件要插入到哪个html模板文件中

同时我们还可以对哪些不需要打包的文件通过 copy-webpack-plugin 插件直接将这些文件拷贝到打包之后的目录中

安装插件

```cmd
npm i copy-webpack-plugin -D
```

修改入口配置与插件配置

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const loader = require('sass-loader');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { type } = require('os');
const config = {
    // mode设置webpack基于开发或者生产环境打包
    mode: 'production',
    // entry 入口
    //entry设置webpack的入口文件路径
    entry: {
        index: './js/index.js',
        login: "./js/login.js"
    },
    // output设置webpack打包之后生成的新文件的文件名和保存路径  出口
    output: {
        filename: 'js/[name].[fullhash:8].js',
        path: path.join(__dirname, './dist'),
        publicPath: './',
        clean: true
    },
// .......
  	
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './index.html'),
            //生成的新文件名称
            filename: 'index.html',
            //生成的js和css自动插入
            inject: true,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './login.html'),
            //生成的新文件名称
            filename: 'login.html',
            //生成的js和css自动插入
            inject: true,
            //指定要插入的chunk
            chunks: ["login"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, './static'),
                    to: path.join(__dirname, './dist/static'),
                }
            ]
        }),
     //......
    ]
};
module.exports = config;

```

**我们现在就完成了一个多页面配置的生产环境下的webpack配置**

## 15、开发环境下配置webpack

安装devServer

```cmd
npm i webpack-dev-server -D
```

开发环境配置

新建和一个webpack.config.dev.js

```js
// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const chalk = require('chalk');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const loader = require('sass-loader');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { type } = require('os');
const config = {
    // mode设置webpack基于开发或者生产环境打包
    mode: 'development',
    // entry 入口
    //entry设置webpack的入口文件路径
    entry: {
        index: './js/index.js',
        login: "./js/login.js"
    },
    // output设置webpack打包之后生成的新文件的文件名和保存路径  出口
    output: {
        filename: 'js/[name].[fullhash:8].js',
        path: path.join(__dirname, './dist'),
        clean: true
    },
    // module在打包过程 根据你自己的需求载入 webpack的第三方模块  对打包过程添加规则
    module: {
        //rules是一个webpack的规则数组，数组中的每一个元素就是一条规则  每一条规则就是一个匿名的配置对象
        rules: [
            //创建一条规则，这条规则适用于所有的JS文件
            {
                test: /\.js$/, //匹配所有的JS文件
                exclude: /node_modules/, //把node_modules目录中的js文件排除在babel的转换以外
                loader: "babel-loader",//把当前规则所匹配的JS文件在打包过程中需要进入到babel中进行处理
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    // {
                    //     loader: 'sass-loader'
                    // }
                ]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|bmp|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: "img/",
                            esModule: false,
                            limit: 8 * 1024 //把小于8KB的图片转换成base64格式
                        }
                    },
                ],
                type: 'javascript/auto'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: "fonts/",
                            esModule: false,
                            publicPath: '../fonts',
                            limit: 8 * 1024 //把小于8KB的图片转换成base64格式
                        }
                    },
                ],
                type: 'javascript/auto'
            }
        ],

    },
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './index.html'),
            //生成的新文件名称
            filename: 'index.html',
            //生成的js和css自动插入
            inject: true,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './login.html'),
            //生成的新文件名称
            filename: 'login.html',
            //生成的js和css自动插入
            inject: true,
            //指定要插入的chunk
            chunks: ["login"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, './static'),
                    to: path.join(__dirname, './dist/static'),
                }
            ]
        }),
        new CleanWebpackPlugin(),
        // 创建一个ProgressBarWebpackPlugin实例，设置进度条的格式为绿色文字“进度:”，白色文字“[:bar]”，绿色文字“:percent”，并且不清除进度条
        new ProgressBarWebpackPlugin({
            format: chalk.green('进度:') + chalk.white("[:bar]") + chalk.green(':percent'),
            clear: false
        })
    ],
    // 配置开发服务器
    devServer: {
        // 设置端口号为8088
        port: 8088,
        // 允许所有主机访问
        allowedHosts: '*',
        // 配置静态文件目录
        static: {
            // 静态文件目录为当前目录下的static文件夹
            directory: path.join(__dirname, './static')
        },
        // 配置客户端
        client: {
            // 显示错误信息
            overlay: true,
            // 显示编译进度
            progress: true,
        },
        // 监听文件变化
        watchFiles: [
            // 监听index.html文件变化
            "./index.html",
            // 监听login.html文件变化
            './login.html',
        ],
        // 启用热更新
        hot: true
    }
};


module.exports = config;

```

当我们配置好文件之后，我们在package.json中配置我们的开发环境下的启动脚本

```json
"dev":"webpack-dev-server --config ./webpack.config.dev.js"
```

> 注意：
开发环境下是基于本地服务器启动的，所以命令行的启动命令，webpack-dev-server，而不是webpack

启动之后dist目录中是不会有打包文件生成的，因为开发环境下的一切打包结果都存在运行内存中