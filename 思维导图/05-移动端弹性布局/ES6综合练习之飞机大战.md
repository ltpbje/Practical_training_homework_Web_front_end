# ES6综合练习之飞机大战

## **项目创建**



在电脑上面创建一个文件夹，取名为planeGame，然后将准备好的资源素材图片文件assets复制到项目的目录下面，然后使用开发工具打开项目，本次项目所需资源





## 编写启动页面与所需目录

在项目下面创建一个 index.html ，然后设置title标题为姓名+飞机大战，如“标哥哥飞机大战”，同时构建整个项目所需要使用的文件夹结构，如下所示

```bash
-assets
-css
	index.css
-js
	index.js
-index.html
```

## **技术平台介绍**

本次游戏采用HTML的网页展现形式，使用HTML5里面canvas画布进行，采用最新的ES6的语法完成，通过ESModule实现模块化开发，通过Ajax实现用户数据的上传，音频效果采用Audio来进行

## **开发过程**

### **一、创建游戏画布**

本次游戏因为要使用canvas进行，所以我们在 index.html 的页上面创建一个画布，取名为game

```html
<script>
<canvas id="game"></canvas>
</script>
```

在上面的画布里面，我们并没有设置宽度与高度，因为最终的宽度与高度是由游戏的背景决定的

### **二、创建游戏控制对象**

采用面向对象的方式进行开发

```js
const gameControl = {
dom:{
},
data:{
},
bindEvent(){
},
init(){
}
}
gameControl.init();
```

