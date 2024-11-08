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

## 3、什么是scss

上面的sass语法是非常严格的，这些代码写起来会造成很大的负担，这个sass推出了一个语法叫做scss

使用了sass的标准，但是融合css的规则 ，从而形成了scss，所以简单理解，scss就是sass+css的综合体，通过css的语法来实现sass的功能



scss学习过程主要四个核心点

- 变量

- 嵌套

- 混合

- 继承

  

## 4、变量

```scss
$color1 :red;

.box{
    width: 100px;
    height: 100px;
    color: $color1;
}

$color1:blue;
.box1{
    color:$color1;
}
```

变量可以多次赋值，后面的会把前面的覆盖掉

**但是，并不是所有后面定义的变量都会把前面的覆盖掉**

```scss
$color1 :red;

.box{
    width: 100px;
    height: 100px;
    color: $color1;
}

$color1:blue!default;
.box1{
    color:$color1;
}
```

## 5、嵌套

```scss
.box1{
    width: 100px;
    &:hover{
        color: red;
    }
    a{
        color: red;
        p{
            font-size: 20px;
        }

    }
    h2{
        color: blue;
    }
}
```

编译之后

```scss
.box1 {
  width: 100px;
}
.box1:hover {
  color: red;
}
.box1 a {
  color: red;
}
.box1 a p {
  font-size: 20px;
}
.box1 h2 {
  color: blue;
}
```

## 6、父级选择符 &

```scss
.box1{
    &:hover{
        color: red;
    }
}
```

编译之后

```scss
.box1:hover {
  color: red;
}
```

在嵌套的语法中，会自动根据我们的嵌套关系来实现，后代，子代，相邻，兄弟的选择，同时嵌套还多一个父级选择

## 7、混合

混合我们就直接就理解成JS中的函数，定义了函数就可以调用，混合定义函数可以接收参数，也可以有返回值

举例：假设我们希望在某一个页面上面的button具备一个基础样式，然后再这个基础样式上面扩展新的样式

```scss
//定义一个混合器
@mixin btn(){
    min-width: 100px;
    height: 36px;
    border: 1px solid #000;
    text-align: center;
    border-radius: 10px;
}



.btn1{
    background-color: red;
    @include btn();
}

.btn2{
    background-color: blue;
    @include btn();
}
```

编译之后

```scss
.btn1 {
  background-color: red;
  min-width: 100px;
  height: 36px;
  border: 1px solid #000;
  text-align: center;
  border-radius: 10px;
}

.btn2 {
  background-color: blue;
  min-width: 100px;
  height: 36px;
  border: 1px solid #000;
  text-align: center;
  border-radius: 10px;
}
```

### 7.1、混合带参

```scss
@mixin flex-box($dir:row){
    display: flex;
    flex-direction: $dir;
}
.box1{
    width: 500px;
    @include flex-box();
}
.box2{
    height: 500px;
    @include flex-box(column);
}
```

编译之后

```scss
.box1 {
  width: 500px;
  display: flex;
  flex-direction: row;
}

.box2 {
  height: 500px;
  display: flex;
  flex-direction: column;
}
```

```
注意：
混合器如果没有传实参，后面的小括号可以省略掉
```

## 8、继承

让一个选择器中的样式继承另外一个选择器中的样式

```scss
.box1{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
}

.box2 {
    background-color: red;
    @extend .box1;
}
.box3{
    background-color: blue;
    @extend .box1;
}
```

编译之后

```css
.box1, .box3, .box2 {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}

.box2 {
  background-color: red;
}

.box3 {
  background-color: blue;
}

```

## 9、跳出

跳出主要是针对嵌套的，它使用@at-root来完成

```scss
.box1{
    width: 100px;
    .abc{
        height: 100px;
        @at-root{
            .def{
                color: red;
            }
        }
    }
}
```

编译之后

```css
.box1 {
  width: 100px;
}
.box1 .abc {
  height: 100px;
}
.def {
  color: red;
}

```

> 注意：
>
> @at-root默认情况下不能跳出 @media媒体查询
> ```scss
> @media only screen and (max-width:768px) {
> .box1{
> width: 100px;
> .abc{
>   height: 100px;
>   @at-root{
>       .def{
>           color: red;
>       }
>   }
> }
> }
> }
> ```
> 编译之后
>
> ```css
> @media only screen and (max-width: 768px) {
> .box1 {
>  width: 100px;
> }
> .box1 .abc {
>  height: 100px;
> }
> .def {
>  color: red;
> }
> }
> 
> ```

## 10、数组与对象

```scss
$a:red,yellow,blue;

$b:(red,yellow,blue);

$themeColor:(
    primary:lightgreen,
    danger:red,
    warning:orange,
    success:green
);

@each $key,$value in $themeColor{
    .bg-#{$key}{
        background-color: $value;
    }
}  


.box1{
    width: 100px;
    color: map-get( $themeColor,success);
}
```

编译之后

```scss
.bg-primary {
  background-color: lightgreen;
}

.bg-danger {
  background-color: red;
}

.bg-warning {
  background-color: orange;
}

.bg-success {
  background-color: green;
}

.box1 {
  width: 100px;
  color: green;
}

```

> 注意：
>
> 在sass中支持set与map集合，而我们上面定义的数组就是一个set集合，上面第一的对象就是一个map集合

## 11、循环

在sass中使用@for来 开始循环
循环语法
```scss
// @for $i from start to end {

// }
// //start表示开始，end表示结束
// @for $i from start through end {

// }
// //through包含end，to不包含end



@for $i from 1 through 5 {
    .div#{$i}{
        background-image: url('./img/#{$i}.png');
    }
}
```

现在我们想生成以下结果

```scss
.div1{
    background-image:url("./img/1.png");
}
.div2{
    background-image:url("./img/2.png");
}
.div3{
background-image:url("./img/3.png");
}
.div4{
    background-image:url("./img/4.png");
}
.div5{
    background-image:url("./img/5.png");
}
```

scss代码：

```scss
@for $i from 1 through 5 {
    .div#{$i}{
        background-image: url('./img/#{$i}.png');
    }
}
```

> 注意两个点：
>
> 1、through和to的区别
>
> 2、如果要将变量做插入需要使用 #{ } 来完成

## 12、条件判断

sass实现判断两种方式

1、三目运算

2、@if

```scss
$w:100px;
.box1{
    color:  red;
    @if $w >200px{
        background-color: blue;
    }

    @else{
        background-color: green;
    }
}

$index1:4;
.box{
    width: 120px;
    @if $index1 ==1{
        background-color: red;
    }
    @else if $index1 == 2{
        background-color: blue;
    }@else{
        background-color: green;
    }
}

$a:2;
.div1{
    color: red;
    background-color: if($a ==1,rgb(255,255,0),blue);
}


```

使用if()来实现判断，这种判断方式类似三目运算

## 13、函数

sass中的函数基本上就与JS中的函数一样，它使用@function来定义，还是可以@return设置返回值

```scss
$baseFontSize:16px!default;

@function pxToRem($px){
     @return calc($px / $baseFontSize * 1rem)
}

.boxa{
    width: pxToRem(100px);
}
```

> 这里我们使用 / 作为运算符使用，在scss中使用运算符两边一定要留空格