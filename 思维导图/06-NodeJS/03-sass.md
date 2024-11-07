# sass可编译的css语言

sass是一种预处理语言，通过sass的功能，我们可以在写css的时候，使用到变量，继承，循环，判断等等

现在我们是在nodeJS中学习sass，所以我们需要使用到sass的编译环境（以前使用的是一个叫做node-sass的包，现在已经弃用）

目前来说，主要的css预编译语言有以下几种

1、less

2、sass

3、stylus

sass并不能直接运行在浏览器上面，它必须借助编译器编译成css之后，才可以运行

## 1、sass的基础语法

```sass
.box
    width:100px
    height:100px
```

上面的就是sass语法，它没有分号，没有空格，这就是最原始的sass语法，不能被浏览器直接运行，需要依赖sass环境编译成css才行

## 2、安装sass编译环境执行编译

安装sass依赖包搭建环境，这个包有个曾用名 dart-sass

```cmd
npm i sass -gD
```

配置sass的编译命令

举例：我们现在把index.sass文件的预编译样式变成css代码写入到一个index.css文件中

```cmd
sass ./index.sass:./index.css
```

**格式：sass 输入文件:输出文件**
**同时处理多个文件**，使用空格隔开

```cmd
sass ./index.sass:./index.css index1.sass:./index1.css
```

**处理目录**，将sass目录下所有的sass文件变成css样式写入到css目录下的css文件中

```
sass ./sass:./css
```

当我们通过上面的命令执行编译以后，我们发现除了编译完成以外，还会额外生成一个同名的map文件，这里面记录了编译资源的来源，如果不想生成这个文件我们可以在命令中配置一个选项 --no-source-map

```cmd
sass --no-source-map ./sass:./css
```

现在我们在package.json中配置执行脚本

```cmd
"css":"sass --no-source-map --watch sass:css"
```

该脚本我们我们对sass指令添加一个--watch选项，该选项的作用可以实时监控sass目录中的代码变化，如果监控到变化实时进行编译，这样我们就不需要每次修改sass源码，重新执行一次sass指令了

只需要在项目一开始直接执行 npm run css即可