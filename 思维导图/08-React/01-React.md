# React介绍



- react是一个用于构建用户界面的JavaScript库，它原本是fackbook的的内部项目，用于构建instagram的，之后进行开源，react主要关注的是我们之前所说的MVVM模式当中V的部分，相对来说性能较好

## react特点

- **声明式设计**
  - react是一种面向数据编程的框架，不需要去控制DOM再操作数据渲染，react会自己去帮你操作DOM，可以帮助开发者省略很多操作DOM的代码

- JSX语法
  - JSX是JavaScript的扩展，react开发的大部分使用JSX语法，简单来说，就是我们会在JS代码里面写html标签

- **灵活**
  - react所控制的DOM就只有一个id为root的DOM，页面上其他的DOM你可以通过比如使用JQ等框架来操作，也就是说可以与其他的库并存，不会存在冲突

- **单向数据流**
  - react的数据流是单向的，父给子组件传递数据，子组件可以直接调用，但是不能直接通过子组件修改传递过来的数据

- 虚拟DOM

- 这个其实就和vue是一样的，使用虚拟DOM开发的好处就是当数据或者状态发生变化的时候，会自动同步到虚拟DOM中去，并且仅将需要变化的部分同步到虚拟DOM中，也就是说并不会刷新整个DOM树

## 创建react项目

- 在学习过vue之后，我们知道像这种组件化开发的框架我们一般会使用脚手架搭建工程项目，react也有自己的脚手架工具
- 官方间我们在学习的时候可以是使用官方脚手架

### 1、create-react-app

- create-react-app是fackbook官方推出的一个构建react项目的脚手架工具，它内部集成了webpack来配置运行项目，并且还内置了一系列的loader来帮助我们可以实现零配置开发react项目

- ```cmd
  npx create-react-app 项目名称
  ```

- > 这里，我们使用的是npx而不是npm，这里我们可以理解成我们并没有把这些脚手架工具下载到本地保存再通过保存到本地的脚手架工具搭建环境，npx将create-react-app下载到一个临时目录，使用以后删除调，所以，以后再执行以上命令的时候，会重新下载create-react-app

- 创建好之后的项目的目录结构和之前vite创建的vue项目的差不多，主要需要编辑的内容全部再src目录，这里我们先主要看两个文件

### 2、index入口文件

```jsx
import React from 'react'; //导入react
import ReactDOM from 'react-dom/client'; //导入用于创建虚拟节点的对象
import './index.css'; //导入全局样式
import App from './App'; //导入项目的顶层组件app
import reportWebVitals from './reportWebVitals'; //导入性能指标
//将public目录中的index.html中的id为root的元素作为react的挂载区域
const root =
ReactDOM.createRoot(document.getElementById('root'));
//render方法用于再root挂载区域内渲染组件
root.render(
//采用了react的严格模式渲染组件
<React.StrictMode>
<!-- 把根组件app进行渲染 -->
<App />
</React.StrictMode>
);
// If you want to start measuring performance in your app, pass a
function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more:
https://bit.ly/CRA-vitals
reportWebVitals(); //调用性能指标，我们可以通过
reportWebVitals(console.warn)查看当前项目的性能
```

- > 扩展：
  >
  > 使用5.0版本的create-react-app创建项目的话，新增以一个reportWebVitals.js
  >
  > 文件，这个webvital是google推出的，检测用户体验的标准，这个指标包含了
  >
  > 三个关键指标（CLS，FID，LCP）和两个辅助指标（FCP，TTFB），具体含义
  >
  > 如下：
  >
  > LCP（Largest Contentful Paint）：最大内容渲染时间，指的是用户从请求网
  >
  > 址到窗口中渲染最大可见内容所需要的时间（最大可见内容通常就是图片或者
  >
  > 视频，或者大块文本）
  >
  > FID（First Input Delay）：首次输入延迟，指的是用户首次与网页互动（点击
  >
  > 超链接，按钮）到浏览器响应此次互动直接的时间，用于判断网页进入互动状
  >
  > 态的时间
  >
  > CLS（Cumulative Layout Shift）：累计布局偏移，得分范围0-1之间，指的是
  >
  > 页面布局再加载时期的偏移量，0表示没有偏移，1表示最大偏移，这个指标表
  >
  > 示用户与网站的交互体验，如果网站再加载过程中布局一直在跳动，用户体验
  >
  > 会非常差，比如，加载一张图片，但是没有大小空白占位，导致图片显示时页
  >
  > 面高度跳动
  >
  > FCP（First Contentful Paint）：首次内容绘制，标记浏览器渲染来自DOM第
  >
  > 一个位内容的时间点，内容可能时文本或者图像等等
  >
  > TTFB（Time To First Byte）首字节到达的时间点

### 3、App.js

```jsx
import './App.css';
import Home from './home';
// import One from './components/one';
// import Two from './components/two';
// import SetState from './components/SetState';
// import Data from './components/Data.jsx';
// import List from './components/List';
import Ref from './components/Ref';
//这个App函数就时组件本体，这种写法就是所谓JSX语法
function App() {
  return (
    <div className="App">
      <Home></Home>
      {/* <One></One> */}
      {/* <Two></Two> */}
      {/* <hr /> */}
      {/* <SetState></SetState> */}
      <hr />
      {/* <Data></Data> */}
      {/* <List></List> */}
      <Ref></Ref>
    </div>
  );
}


export default App;

```

### 4、react组件的写法

- 上面我们看到的是函数式组件，react还支持另外一种类式组件，新建一个home.jsx，扩展名也可以是js，这里为了和普通的js文件做区分，我们的react组件文件都采用jsx作为扩展名

- ```jsx
  import { Component } from "react";
  export default class Home extends Component {
      render(){
          return (
              <div>哈哈哈哈</div>
          )
      }
  }
  ```

- 然后在index.js中导入Home并修改下render中渲染的虚拟DOM，我们可以看到是可以正常渲染的

- 现在我们可以把根组件相关的文件删除掉，然后重写我们自己的根组件

### 5、react组件编写的注意事项

- 1、return的标签结构只能包含一个根标签（vue3可以支持多个根标签），同时，react还支持没有标签名的标签作为根标签，如下

- ```jsx
  return (
      <>
          <div></div>
      </>
  )
  ```

  

- 2、return的标签结构并不是真正的html标签，而是react的虚拟标签，所以区别大小写
- 3、类语法的类名和函数语法的函数名其实就可以理解成组件作为虚拟标签使用的标签名，为了方便区别组件名和虚拟标签名，我们首字母大写，而组件内部的虚拟标签采用小写
- 4、如果我们需要在虚拟表亲啊的属性值上执行js，需要使用 { }括号

### 6、JSX语法糖

- React采用是JSX来替换常规的javascript语法，简单来说，JSX就是 JavaScript+XML（可扩展标记语言），在react当中JSX会被babel编译成JavaScript

- 举例说明：

- > 这里我们把原本Home组件中解构导入的Component换成导入整个React实例，因为我们还要使用React的其他方法

- ```jsx
  import React from "react";
  export default class Home extends React.Component {
      render(){
              return (
                  <div>哈哈哈哈</div>
              )
      }
  }
  ```

  

- 按照上面的说法，react组件中return的div标签其实并不是一个html标签，而是react创建的一个虚拟标签，所以这里return其实应该写成如下：

- ```jsx
  import React from "react";
  export default class Home extends React.Component {
    render() {
      return React.createElement(
        "div", //标签名
        null, //标签属性
        "hahaha" //标签内容
      );
    }
  }
  ```

- > 代码分析：
  >
  > 上面的代码可以理解成JSX中虚拟标签div通过babel编译成了JS代码的一个情况，所以我们直接像上面这样写在react中一样可以实现渲染

### 7、JSX语法的注意事项

- 因为react中使用的是JSX语法，会在JS里面写入标签，而标签的使用一定会涉及到标签属性的使用，所以这里我们需要注意，有一些常会用的标签属性名与JS中的关键字是一样的，所以就意味着会有冲突，所以在JSX中对于一些常用的标签属性名做了一些调整

- 举例：

- 新建一个components目录，在内部新建一个one.jsx，然后新建一个one.css导入到one.jsx

- ```jsx
  import './one.css';
  function One() {
    return (
      <>
        <div style={{ color: 'red' }}>我是第一个组件</div>
        <div className="box"></div>
        <label htmlFor="userName">
          用户名：
          <input type="text" id='userName' />
        </label>
      </>
    );
  }
  export default One;
  ```

- > 代码分析：
  >
  > style属性：添加行内样式的时候，样式属性名与值需要做成一个对象，这里的
  >
  > style有两层大括号需要分开理解，外层的 { } 表示需要在标签属性上执行JS，内
  >
  > 层的大括号表示对象的大括号
  >
  > className：因为现在标签写在JS里面，所以原本的class属性会与JS中的用于
  >
  > 声明类的class关键字冲突，所以改成了className
  >
  > htmlFor：原本label中的for属性是可以指向一个表单的id，但是循环使用的关
  >
  > 键字也叫做for，所以这里改成了htmlFor

- > **扩展问题：**
  >
  > **为什么react不用原生的html而要使用自己JSX虚拟标签**
  >
  > 我们可以看下以下代码，直接在index.js中执行
  >
  > ```jsx
  > let HtmlDom = document.createElement("div"); //创建原生DOM
  > let ReactDom = React.createElement("div"); //创建react虚拟DOM;
  > for (let i in HtmlDom) {
  >     console.log("这是原生DOM：", i);
  > }
  > for (let i in ReactDom) {
  >     console.log("这是ReactDOM：", i);
  > }
  > ```
  >
  > 从打印结果来看，原生的DOM与ReactDOM内部的体量相差巨大

# 类组件

- react中有两种组件写法，分别是类式组件和函数式组件，而这两种组件最大的区别就是有无状态和生命周期，而函数式组件没有状态没有生命周期，所以也叫做无状态组件，这里我们先从类组件开始学习

- > PS：
  >
  > 在react16.8中新增了一批hook函数，这些hook函数可以在函数式组件中特带
  >
  > state、生命周期这些特征

## 1、创建类组件

- react组件当中的数据被称为状态state，而定义数据其实就是在组件内创建一个state对象来管理数据

- ```jsx
  import { Component } from "react";
  export default class Two extends Component {
      constructor() {
          super();
          this.state = {
              num: 10
          };
      }
      changeNum() {
          this.state.num++;
          console.log(this.state.num);
      }
      render() {
          return (
              <>
                  <p>{this.state.num}</p>
                  <button onClick={this.changeNum.bind(this)}>按钮
                  </button>
              </>
          );
      }
  }
  ```

- > 代码分析：
  >
  > 我们在类组件中通过constructor内部生命一个state状态对象，来定义当前组件内部的数据，然后我们又定义了changeNum方法，这种定义方式与ES6语法一样，只不过数据一定要定义在state对象里面
  >
  > 
  >
  > 在changeNum方法中尝试对state中的num值进行修改，所以我们该方法通过onClick绑定到了button上面，这里在button的onClick上面执行JS代码，不要忘记套大括号，同时因为这里的标签并不是真正的html标签，所以changeNum当中的this是无法指向当two的，这里就需要通过bind的方式修改方法内的this指向，让其指向two从而可以调用到two的state属性
  >
  > 
  >
  > 当我们点击按钮发现changeNum执行后，num的数据确实是修改了，但是页面渲染的结果并没有一并修改，因为React的数据默认是非响应式的，如果要实现响应式数据，那么需要使用setState方法来修改state，如下：
  >
  > ```jsx
  > 
  > changeNum(){
  >     this.setState({
  >         num: this.state.num + 1 //这里要实现累加不能使用++
  >     });
  >     console.log(this.state.num);
  > }
  > ```
  >
  > 这里就可以实现数据的响应式

## 2、setState方法

- 通过上面的changeNum方法的执行，我们可以看到一个情况，我们通过setState修改了树，但是紧接着打印的num却还是修改之前的值，这里其实就说明一个情况，setState方法是一个“异步方法”
- 如果我们像让数据修改轴再执行后面的语句，该方法为我们提供了第二个参数，一个回调函数，写在这个回调函数内的语句，会再修改完成之后再执行

- ```jsx
  changeNum(){
      this.setState({
          num: this.state.num + 1
      }, () => {
          console.log(this.state.num);
      });
  }
  
  ```

- setState有两种写法，分别对象写法和函数写法

### 2.1、对象式写法

- 对象式写法就是我们上面的例子中的写法

- ```jsx
  changeNum(){
      this.setState({
          num: this.state.num + 1
      }, () => {
          console.log(this.state.num);
      });
  }
  
  ```

  

### 2.2、函数式写法

- 将传入的第一个参数换成一个函数传入

- ```jsx
  this.setState((state, props) => {
      //这里可以写一些需要执行的语句
      return {
          num: state.num + 1
      };
  }, () => {
      console.log(this.state.num);
  });
  ```

- > 注意：
  >
  > setState是一个同步方法，但是setState引起的React后续更新状态的动作是异步的
  >
  > 举例
  >
  > ```jsx
  > import { Component } from "react";
  > export default class SetState extends Component {
  >     state = {
  >         num: 1
  >     };
  >     changeNum() {
  >         this.state.num += 1;
  >         this.setState((state, props) => {
  >             console.log(state.num);
  >             return {
  >                 num: state.num + 2
  >             };
  >         });
  >     }
  >     render() {
  >         return (
  >             <>
  >                 <h2>{this.state.num}</h2>
  >                 <button onClick={this.changeNum.bind(this)}>
  >                     按钮</button>
  >             </>
  >         );
  >     }
  > }
  > ```
  >
  > 分析：
  > 按照上面的业务逻辑，在changeNum方法开始执行的时候，如果setState方法
  > 本身是一个异步方法，那么 {num:state.num + 2} 的这个操作应该会被提到
  > 与 this.state.num += 1; 同时执行，而 this.state.num += 1 是直接调用
  > 状态值修改无法实现响应式，所以修改之后的结果不会同步渲染到页面上，那
  > 么，渲染到页面上的应该是通过setState修改的+1的效果，渲染结果应该是3，
  > 但是页面的实际渲染结果却是4，同时，我们在setState的函数语法内部还加上
  > 了一个console.log打印结果是2，那久说明，执行到console.log为止的时候，
  > num只被加了1，如果同时执行了 num:state.num + 2 那么控制台打印出来
  > 的应该是3或者4才对
  > 结论：
  > 在setState方法中，之后修改react组件状态的部分才是异步执行的，按照上面
  > 函数式的写法，就时return后面执行的部分才是异步的

## 3.3、两种写法的使用原则

- 如果新状态不依赖原状态，使用对象式语法
- 如果新状态依赖原状态，使用函数式语法
- 如果需要在setState执行后获取最新的状态数据，要在第二个回调函数中读取
- 对象式的setState其实事函数式setState的简写方式（语法糖）

## 4、事件绑定的三种方式

- 当我们给onClick绑定方法的时候使用bind来从新定义changeNum方法内this的指向，如果不通过bind修改this指向的话，那么根据我们以前学习的关于this的解释，方法内的this永远也指向不到外面的类组件

- 基于以上的情况，我们还可以通过一些其他方式来修改this指向

- 第一种：通过bind

- ```jsx
  <button onClick={this.changeNum.bind(this)}>按钮</button>
  ```

- 第二种：在构造器里面声明一个属性，实现把this指向进行修改

- ```jsx
  import { Component } from "react";
  export default class SetState extends Component {
      constructor() {
          this.changeNum = this.changeNum.bind(this);
      }
      //......
      changeNum() {
          //.......
      }
      render() {
          return (
              <>
                  <button onClick={this.changeNum}>按钮</button>
              </>
          );
      }
  }
  ```

  

- 第三种：利用bind修改this指向的原理

- ```jsx
  <button onClick={() => this.changeNum()}>按钮</button>
  ```

  

- > bind()会创建一个新的绑定函数，这个绑定函数包装了原函数的对象，调用绑定函数通过会执行包装函数

- 一般情况下，我们使用第一种或第三种方式

## 5、React实现双向数据绑定

- 我们在vue中可以通过v-model指令来完成表单数据的双向绑定，而react中实现需要自己手动来写过程
- 在components目录中新建一个Data.jsx

```jsx
import { Component } from "react";
export default class SetState extends Component {
    constructor() {
        super();
        this.changeNum = this.changeNum.bind(this);
    }
    state = {
        num: 1
    };
    changeNum() {
        this.state.num += 1;
        this.setState((state, props) => {
            console.log(state.num);
            return {
                num: state.num + 2
            };
        });
    }
    render() {
        return (
            <>
                <h2>{this.state.num}</h2>
                <button onClick={this.changeNum}>按钮</button>
            </>
        );
    }
}
```

- > 分析：
  >
  > 双向绑定的主要实现手段事通过事件对象中的target来获取当前input的value值，然后再通过setState方法来是心啊textVal的实时渲染

## 6、受控组件与不受控组件

- 这是一个react中对于组件状态state进行操作时的操控方式的区别产生的一种组件概念，简单来说说久事组件中的状态再渲染到标签结构中时，实现的时单向数据绑定，还是双向数据绑定

- 状态实现了数据双向绑定的就是受控组件
- 状态实现的是单向绑定的就是不受控组件
- 具体举例说明：

- 上面的双向数据绑定的例子就已经说明了受控组件使用setState进行更新，从而呈现表单的react组件也控制着后续用户输入时该表单中发生的情况，以这种由react控制的输入表单元素改变其值的方式，称为受控组件
- 而对于不受控组件表单数据由DOM自身处理，既不受setState的控制，如果想要得到表单中的数据作为状态值，我们需要做如下操作：

```jsx
import { Component, createRef } from "react";
export default class Data extends Component {
    constructor() {
        super();
        this.user = createRef();
        this.state = {
            textVal: "用户名"
        };
    }
    valChange(e) {
        // this.setState({
        // textVal:e.target.value
        // })
        console.log(this.user.current.value);
    }
    render() {
        return (
            <>
                <input type="text" ref={this.user} placeholder=
                    {this.state.textVal} onChange={this.valChange.bind(this)} />
                <p>{this.state.textVal}</p>在vue中我们可以通过v-for指令来进行列表渲染，而react当中跟上面的双向绑定一
样，也需要自己来手写
            </>
        );
    }
}
```

## 7、React列表渲染

- 在vue中我们可以通过v-for指令来进行列表渲染，而react当中跟上面的双向绑定一样，也需要自己来手写
- 在components目录中新建一个List.jsx

```jsx
import { Component } from "react";

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            arrData: ["zhangsan", "lisi", "wangwu"]
        };
    }
    render() {
        return (
            <>
                <ul>
                    {
                        this.state.arrData.map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            );
                        })
                    }
                </ul>
            </>
        );
    }
}
```

- > 代码分析：
  >
  > 通过调用state中的数组进行遍历来完成列表渲染，这里列表渲染也需要key来
  >
  > 记录状态
  >
  > 这里我们使用map方法实现遍历，在回调中的return我们又使用（）因为需要
  >
  > 渲染li标签，所以我们得到一个结论，在react组件的render方法中需要执行的
  >
  > 语句如果时JS就套在大括号里面，如果是虚拟标签就套在小括号里
  >
  > 上面的map方法我们还可以通过ES6中箭头函数的语法进一步简化去掉map中
  >
  > 的return
  >
  > ```jsx
  > render(){
  >     return (
  >         <>
  >             <ul>
  >                 {
  >                     this.state.arrData.map((item, index)
  >                         => <li key={index}>{item}</li>)
  >                 }
  >             </ul>
  >         </>
  >     );
  > }
  > ```
  >
  > 以上情况下return去掉之后，依然还是执行的虚拟标签，但是可以不在map里面的虚拟标签上添加小括号，加上也没有问题

- 现在我想修改arrData中的数据，并且同步修改页面渲染结果，按照上面的情况，这个操作过程也需要我们手动通过原生JS来完成

```jsx
import { Component } from "react";
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            arrData: ["zhangsan", "lisi", "wangwu"]
        };
    }
    //制作一个用于修改数组的方法
    changeArr() {
        this.state.arrData.push("haha");
        this.setState({
            arrData: this.state.arrData
        });
    }
    render() {
        return (
            <>
                <ul>
                    {
                        this.state.arrData.map((item, index) =>
                            <li key={index}>{item}</li>)
                    }
                </ul>;

                <button onClick={this.changeArr.bind(this)}>按钮
                </button>
            </>
        );
    }
}
```

- > 代码分析：
  >
  > 以上我们完成了一个简单的关于列表渲染的动态修改，但是以上写法还是会有
  >
  > 一个小问题，如果我们现在操作的并不是往数组的最后面添加一个元素，而是
  >
  > 往数组的中间或者前面添加一个元素的时候，我们会发现会把后面不需要渲染
  >
  > 的元素也一起从新渲染，这个问题主要就是出在key的状态记录上面，因为使用
  >
  > 的是索引
  >
  > 这个问题我们之前在vue中说过，这里我们可以直接把key的值
  >
  > ```jsx
  > this.state.arrData.map((item,index) => <li key={item}>{item}</li>)
  > ```
  >
  > 

## 8、列表渲染的注意事项

- 因为我们采用的修改方式是直接赋值的方式，而数组是引用数据类型，现在一个一维数组所以其实还好，但是如果是个多维数组就可能会有问题，所以我们最好在这里对数组进行深拷贝，这里我们采用一个另辟蹊径的做法

- ```jsx
  changeArr(){
      //先调用原始的state中的数组进行修改
      this.state.arrData.push("haha");
      //将已经修改好的arrData进行序列化转换成字符串，然后再转回来成为一个数组赋值给newArr，相当于创建了一个新数组;
      let newArr = JSON.parse(JSON.stringify(this.state.arrData));
      this.setState({
          arrData: newArr
      });
  }
  ```

  ## 9、React中操作DOM

- 在React中我们可以通过以下三种方式来操作DOM

### 9.1、函数方式

```jsx
import { Component } from "react";
export default class Ref extends Component {
    printDom() {
        console.log(this.htmlElement);
    }
    render() {
        return (
            <>
                <input type="text" ref={ref => this.htmlElement =ref} />
                <button onClick={this.printDom.bind(this)}>按钮
                </button>
            </>
        );
    }
}
```

- > 分析：
  >
  > 通过ref标记赋值一个函数，参数ref会被注入当前DOM元素，
  >
  > this.htmlElement = ref 相当于是在当前类中声明一个属性叫做
  >
  > htmlElement，然后将注入到参数ref中的DOM对象赋值给这个属性上，之后
  >
  > 我们就可以在组件内通过this调用

### 9.2、通过React.createRef方法获取

- ```jsx
  import { Component, createRef } from "react";
  export default class Data extends Component {
      constructor() {
          super();
          this.user = createRef();
      }
      valChange(e) {
          console.log(this.user.current.value);
      }
      render() {
          return (
              <>
                  <input type="text" ref={this.user} onChange=
                      {this.valChange.bind(this)} />
              </>;
          )
      }
  }
  ```

  

- > 注意：
  >
  > 获取到的DOM对象在user的current属性中

- 还有第三中方式是通过ref标记赋值一个字符串来获取，但是这种方式官方已经很早就不推荐使用了，所以这里我们不去单独说它

## 10、父子组件

- React的类式组件时通过在一个js文件中写入class创建的，所以，我们可以在一个文件一个类，也可以一个文件多个类，也就时说，我们可以在一个文件里面面完成父子组件
- 新建一个Father.jsx

```jsx
import { Component } from 'react';
export default class Father extends Component {
    //这里我们可以省略构造器，因为构造器主要时为了类的继承作用的，但是我们这里
    的类式组件不存在继承关系;
    state = {
        fatherData: "zhangsan"
    };
    render() {
        return (
            <>
                <Child num={this.state.fatherData}></Child>
            </>
        );
    }
}
class Child extends Component {
    constructor(state, props) {
        super();
    }
    //在子组件中客户以通过定义静态属性的方式，定义props的默认值
    static defaultProps = {
        num: 50
    };
    render() {
        //在子组件的类中默认声明了一个props的属性对象，用于存放父组件传递过来
        的数据;
        return (
            <>
                <h2>我是child组件</h2>
                <h2>{this.props.num}</h2>
            </>
        );
    }
}
```

- > 代码分析：
  >
  > 其实类组件当中，在构造器里面会默认设置一个props并通过super继承，完成写出来如下
  >
  > ```jsx
  > class Child extends Component {
  >     constructor(props) {
  >         super();
  >     }
  >     //......
  > }
  > ```
  >
  > 

- 之前在vue中，我们可以设置需要接收的数据类型，在react也可以实现

```jsx
import { Component } from 'react';
import defaultTypes from 'prop-types'; //导入设置期望类型的对象
//.......
class Child extends Component {
    constructor(state, props) {
        super();
    }
    //在子组件中可以通过定义静态属性propTyps来设置默认接收的数据类型
    static propTypes = {
        num: defaultTypes.number
    };
    //在子组件中可以通过定义静态属性的方式，定义props的默认值
    static defaultProps = {
        num: 50
    };
    render() {
        //在子组件的类中默认声明了一个props的属性对象，用于存放父组件传递过来的数据;
        return (
            <>
                <h2>我是child组件</h2>
                <h2>{this.props.num}</h2>
            </>
        );
    }
}
```

## 11、子组件修改父组件数据

```jsx
import { Component } from 'react';
import defaultTypes from 'prop-types'; //导入设置期望类型的对象
export default class Father extends Component {
    //这里我们可以省略构造器，因为构造器主要时为了类的继承作用的，但是我们这里
    的类式组件不存在继承关系;
    state = {
        fatherData: "zhangsan"
    };
    //在父组件中创建一个修改自己内部数据的方法
    changeFatherData() {
        this.setState({
            fatherData: "lisi"
        });
    }
    render() {
        return (
            <>
                <h2>{this.state.fatherData}</h2>
                <Child num={this.state.fatherData} changeData=
                    {this.changeFatherData.bind(this)}></Child>
            </>
        );
    }
}
class Child extends Component {
    constructor(props) {
        super();
    }
    //在子组件中可以通过定义静态属性propTyps来设置默认接收的数据类型
    static propTypes = {
        num: defaultTypes.number
    };
    //在子组件中可以通过定义静态属性的方式，定义props的默认值
    static defaultProps = {
        num: 50
    };
    //在子组件中创建一个方法，在该方法内部调用父组件传递过来的修改父组件数据的
    方法;
    changeFatherData() {
        this.props.changeData();
    }
    render() {
        //在子组件的类中默认声明了一个props的属性对象，用于存放父组件传递过来的数据;
        return (
            <>
                <h2>我是child组件</h2>
                <h2>{this.props.num}</h2>
                <button onClick=
                    {this.changeFatherData.bind(this)}>修改父组件</button>
            </>
        );
    }
}
```

- > 代码分析：
  >
  > 上述的制作方式类似于vue的自定义事件，只不过执行逻辑上react更加直接一
  >
  > 些，在父组件中声明修改自己数据的方法，然后将该方法传递给子组件，然
  >
  > 后，子组件再声明一个方法。从props中调出父组件传递过来的修改父组件数
  >
  > 据的方法，最后子组件中执行该方法，从而执行父组件传递过来的修改父组件
  >
  > 数据的方法

## 12、context进行跨级传递数据

- React组件之间的通信是基于props的数据传递，但是这种传递方式只能一层一层从上至下传递，如果组件的层级嵌套太多了就会超级麻烦
- 在react组件中配置context解决跨级传递问题：

```jsx
import { Component, createContext } from "react";
class GrandSon extends Component {
    render() {
        return (
            <>
                <FatherContext.Consumer>
                    {
                        fstr => <h2>{fstr}</h2>
                    }
                </FatherContext.Consumer>
            </>
        );
    }
}
class Son extends Component {
    render() {
        return (
            <>
                <GrandSon></GrandSon>
            </>
        );
    }
}
export default class Father extends Component {
    state = {
        str: "hahahahah"
    };
    render() {
        return (
            <>
                <FatherContext.Provider value={this.state.str}>
                    <Son></Son>
                </FatherContext.Provider>
            </>
        );
    }
}
const FatherContext = createContext("light");
```

- > 代码分析：
  >
  > 现在我们通过createContext创建一个上下文环境，并且在调用时传入一个实参值作为上下文环境的默认值
  >
  > 当创建成功之后我们可以在上下文环境对象中调用 Provider 向上下文环境内注
  >
  > 入数据，然后通过 Consumer 调出上下文环境中注入的数据，从而完成一个跨
  >
  > 级的数据传递
  >
  > **扩展：**
  >
  > 在react19之前的版本中，还有一套context的API可以实现上下文环境的跨级传递数据，但是在react19中已经被移动不能使用
  >
  > 我们来认识之前的老API
  >
  > 1、static contextTypes 设置在需要接收数据的子组件上
  >
  > 2、static ChildContextTypes 设置在需要向下传递数据的父组件上
  >
  > 3、getChildContext() 方法设置在需要向下传递数据的父组件上，在方法体内return需要传递的数据到上下文环境中
  >
  > 基于上面三项操作，只要时处于当前父组件上下文环境中的子组件都可以调用到环境内的数据