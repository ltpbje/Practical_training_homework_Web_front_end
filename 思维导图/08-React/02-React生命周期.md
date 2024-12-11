# React生命周期



- 我们这里所说的生命周期是类组件的，主要分三个阶段
- 挂载
- 更新
- 卸载
- 以上每个阶段都有自己的一系列在当前生命周期中可以被自动执行的生命周期函数（类似于vue中的钩子函数）

## 1、挂载阶段（初始化）

- 在该阶段按照执行顺序分别有以下几个生命周期函数
- 1、 constructor 初始化整个组件的state以及调用super(props)，该方法只会在组件创建的时候执行一次
- 2、 componentWillMount 挂载之前（这个函数会报弃用警告，目前react19依然还是可以使用）
- 3、 render 返回需要渲染的页面结构，一般情况下不要包含其他的业务逻辑
- 4、 componentDidMount 挂载之后，可以获取DOM节点并操作，服务器请求，启动事件监听，调用setState等等都可以在这个函数内完成，该方法只会在创建时执行一次

```jsx
import { Component } from "react";
export default class Mount extends Component {
    constructor(props) {
        super(props);
        console.log("1、初始化");
    }
    componentWillMount() {
        console.log("2、挂载之前");
    }
    render() {
        console.log("3、页面结构渲染");
        return (
            <div></div>
        );
    }
    componentDidMount() {
        console.log("4、挂载之后");
    }
}
```

- > **注意事项：**
  >
  > 在执行的时候我们在控制台会发现几个情况：
  >
  > 1、控制台会报一个警告，这个警告主要就时告诉我们关于
  >
  > componentWillMount 函数在React18以后要做一个名字的修改，如下
  >
  > ```jsx
  > UNSAFE_componentWillMount(){
  >     console.log("2、挂载之前")
  > }
  > ```
  >
  > 2、按照上面的写法修改之后还有一个警告，告诉我们严格模式下使用
  >
  > UNSAFE_ 前缀的写法可以会导致代码中存在错误，这个可以在入口文件
  >
  > index.js中设置React.StrictMode删除掉就没有了
  >
  > 3、如果在严格模式下，我们会发现我们的生命周期函数除了
  >
  > componentWillMount 之外其他三个都被执行了两边，把严格模式删除即可
  >
  > **扩展内容：为什么会被渲染两次？**
  >
  > 在严格模式下渲染两次的是严格模式下react为我们提供的一种检测手段，主要
  >
  > 用于检测生命周期函数在执行渲染时的副作用，而调用两次就时严格模式用于
  >
  > 检测副作用的检测方式
  >
  > 这种渲染两次的行为对性能造成一定影响，但是它只是针对开发环境，在生产
  >
  > 环境里面不会发生渲染两次的情况

## 2、更新阶段

- 更新阶段分两种情况，分别时props更新时和state更新时，我们先来看state更新时会执行的生命周期函数

### 2.1、state更新

- state更新时按照执行顺序会触发如下函数：
- 1、 shouldComponentUpdate 根据return的布尔值来决定是否开始更新数据
- 2、 componentWillUpdate 准备开始更新
- 3、 render 重新渲染页面结构
- 4、 componentDidUpdate 更新之后

- > 注意事项：
  >
  > 1、如果 shouldComponentUpdate 方法返回的是false，则后面三个函数不会
  >
  > 执行，同时该方法可以接收两个参数，分实是更新之后的state数据和更新之后
  >
  > 的props数据

```jsx
import { Component } from "react";
export default class Son extends Component {
    state = {
        str: "yoho"
    };
    shouldComponentUpdate(newProps, newState) {
        console.log("1、是否开始更新", newProps, newState);
        return true;
    }
    componentWillUpdate() {
        console.log("2、准备开始更新");
    }
    render() {
        console.log("3、重新渲染页面结构");
        return (
            <div>
                <h2>{this.state.str}</h2>
                <button onClick={this.changeStr.bind(this)}>更新
                    state</button>
            </div>
        );
    }
    componentDidUpdate() {
        console.log("4、更新之后");
    }
    changeStr() {
        this.setState({
            str: "haha"
        });
    }
}
```

- > 代码分析：
  >
  > 以上是当一个组件中state被修改之后，会触发的一系列的state更新函数，在这
  >
  > 个过程中有部分生命周期函数会出现警告
  >
  > componentWillUpdate 函数会遇到和上面挂载阶段函数修改的警告一样的提
  >
  > 示，把该函数名加上前缀UNSAFE_即可
  >
  > ```jsx
  > UNSAFE_componentWillUpdate(){
  >     console.log("2、准备开始更新");
  > }
  > ```
  >
  > 

### 2.2、props更新

- 其实在 shouldComponentUpdate 之前还会有一个被执行的生命周期函数componentWillReceiveProps ，该方法可以把新更新的props作为实参接收，而只有当props更新的时候，才会触发 componentWillReceiveProps 生命周期函数，如果只是组件自己内部的state修改，是不会触发的
- 所以，我们在上面的更新触发的基础上增加一个父组件，用于传递数据给子组件，同时在父组件中设置一个用于修改传递给子组件数据的父组件方法，来触发props的更新

```jsx
import { Component } from "react";
class Son extends Component {
    state = {
        str: "yoho"
    };
    componentWillReceiveProps(newProps) {
        console.log("0、接收到新的props", newProps);
    }
    shouldComponentUpdate(newProps, newState) {
        console.log("1、是否开始更新", newProps, newState);
        return true;
    }
    componentWillUpdate() {
        console.log("2、准备开始更新");
    }
    render() {
        console.log("3、重新渲染页面结构");
        return (
            <div>
                <h2>{this.state.str}</h2>
                <button onClick={this.changeStr.bind(this)}>更新
                    state</button>
            </div>
        );
    }
    componentDidUpdate() {
        console.log("4、更新之后");
    }
    changeStr() {
        this.setState({
            str: "haha"
        });
    }
}
export default class UpdateFather extends Component {
    state = {
        num: 1
    };
    changeNum() {
        this.setState({
            num: 2
        });
    }
    render() {
        return (
            <div>
                <h2>{this.state.num}</h2>
                <button onClick={this.changeNum.bind(this)}>修改
                    num</button>
                <Son num={this.state.num}></Son>
            </div>
        );
    }
}
```

- > 代码分析：
  >
  > 这个时候我们可以在控制台看到，到父组件执行了changeNum的方法修改了自
  >
  > 己传递给子组件的数据时，componentWillReceiveProps 会被触发并且是在
  >
  > shouldComponentUpdate 之前触发的
  >
  > 注意事项：
  >
  > componentWillReceiveProps 函数会报警告要求我们替换成新的 static
  >
  > getDerivedStateFromProps 或者加上UNSAFE_前缀