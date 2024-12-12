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

### 2.3、数据修改过程的性能优化

- 在上面的shouldComponentUpdate函数中，我们知道它会被自动注入两个参数，分别是修改后的props和修改后的state，而是否真的去做数据更新会根据这个函数的return值来决定，这里我们可以手写一个业务逻辑来对程序进行性能优化

- 业务逻辑大致就是，如果修改之后的props或者state的值于修改之前的是一样的，那么我们就没有必要专门再去把数据更新一遍，因为这样会重新执行一遍render渲染页面结构

- 把上面的业务逻辑转换成代码：

- ```JSX
  shouldComponentUpdate(newProps, newState){
      if (newState.str === this.state.str) {
          return false;
      } else {
          return true;
      }
  }
  ```

- 上面的代码过于冗余，做如下修改

- ```JSX
  shouldComponentUpdate(newProps,newState){
      return newState.str !== this.state.str
  }
  ```

- 如果props修改之后的值于修改之前的值是一样的，那么也不执行更新

- ```JSX
  shouldComponentUpdate(newProps,newState){
      return (newState.str !== this.state.str) || (newProps.cstr!== this.props.cstr)
  }
  ```

### 2.4、PureComponent

- PureComponent是React15.3版本新增的一个继承自Component的子类，当我们的类组件继承自PureComponent的时候，该组件会自动加载

- shouldComponentUpdate生命周期函数，当组件更新的时候会自动对组件的props和state做新旧对比，如果没有发生变化就不会触发render方法让组件二次渲染，这样就可以达到一个与上面一样的效果

- ```JSX
  import { Component, PureComponent } from "react";
  class Son extends PureComponent {
      //当类组件继承自PrueComponent的时候就相当于自动实现了如下的代码
      /*
      shouldComponentUpdate(newProps,newState){
      return (newState.str !== this.state.str) ||
      (newProps.cstr !== this.props.cstr)
      */
  }
  }
  ```

  

## 3、卸载阶段

- 卸载阶段可以理解成是组件切换的时候，切换之前的而组建会被卸载掉，在这个阶段只有一个生命周期函数

- 1、 componentWillUnmount 当组件卸载时触发

- 创建组件Unmount做代码演示：

- ```jsx
  import { Component } from "react";
  export default class Unmount extends Component {
      render() {
          return (
              <div></div>
          );
      }
      componentWillUnmount() {
          console.log("当组件卸载时");
      }
  }
  ```

- 然后，在index.js中通过setTimeout制作对root中渲染的组件做一个延迟执行

- ```jsx
  //......
  import Unmount from './components/Unmount';
  const root =
      ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <Unmount></Unmount>
  );
  setTimeout(() => {
      root.render(
          <App />
      );
  }, 5000);
  ```

- 然后我们还可以通过一些小例子来看下卸载的作用

- 举个例子：

  ```jsx
  import { Component } from "react";
  export default class Unmount extends Component {
      componentDidMount() {
          document.addEventListener("click", this.dbClick);
      }
      dbClick() {
          console.log("我点击了这个页面");
      }
      render() {
          return (
              <div></div>
          );
      }
      componentWillUnmount() {
          console.log("当组件卸载时");
          document.removeEventListener("click", this.dbClick);
      }
  }
  ```

  - > 代码分析：
    >
    > 上面的代码主要情况就是，我们在Unmount这个组件挂载之后给整个文档绑定
    >
    > 了一个点击事件，当组件被跳转走之后，我们会发现这个全局的点击事件依然
    >
    > 是存在的，所以我们在卸载的时候记得这样针对全局的事件要在卸载的同时移
    >
    > 除掉
    >
    > 注意：
    >
    > 这种方式再次进入到Unmount的时候，还是会再次被绑定的，因为绑定和移除
    >
    > 的操作全部写在Unmount组件的生命周期上面，所以事件的绑定与移除是跟着
    >
    > Unmount组件走的

## 4、React16+新增生命周期函数

- 在上面介绍的生命周期函数中，有部分在新版本会被弃用的，取而代之的有一些新增的生命周期函数

### 4.1、getDerivedStateFromProps

- 这个是一个静态方法，所以在类组件中声明的时候记得带上static修饰符，它主要是替代了挂载阶段的componentWillMount和更新阶段中的
- componentWillReceiveProps，也就是说getDerivedStateFromProps在挂载和更新阶段都会被调用
- 该方法会接收两个参数
- 参数1：nextProps即将更新的props，父组件更新了传入到子组件中的数据时，更新后的数据会传入到此参数
- 参数2：prevState 子组件内部的更新之前的状态（旧的状态）
- 返回值：该方法返回一个对象用来更新组件的内部状态state，如果返回null则不更新

- > **注意事项：**
  >
  > 在使用该方法的时候，一定要设置state，就算是个空对象都行，在介绍该方法
  >
  > 的作用之前我们需要先扩展一些知识点

### 4.2、扩展知识：派生状态

- > 在介绍getDerivedStateFromProps方法的使用之前我们要先理解一个特殊的组件内部状态，派生状态，而介绍派生状态之前我们还要去简单复习并扩展以下之前讲过的受控组件和不受控组件

- 所谓受控和不受控我们之前的介绍主要是应用了一个表单数据的双向绑定来表示的，受控可以理解成组件的内部状态受组件自身的控制，不受控则反之理解即可

- 现在我把这个受控和不受控的范围扩展一下，现在我们把这个概念用于到组件与组件之间的控制关系上，如果现在父组件向子组件中传入一条数据，子组件可以通过props进行接收并在组件内部调用，这种情况下看似子组件中的渲染结果受控于父组件传入的数据，但是是否受父组件控制的标准是要看子组件的内部状态而不是看props的

- 所以，这个时候，我们如果把props当中接收到外部数据赋值给子组件的内部状态中去，那么，这个时候子组件是否就算受父组件控制了呢？

- 举例：

  ```jsx
  import { Component } from "react";
  export default class Pai extends Component {
      constructor(props) {
          super(props);
          this.state = {
              textVal: "zhangsan"
          };
      }
      changeVal() {
          this.setState({
              textVal: "lisi"
          });
      }
      render() {
          return (
              <div>
                  <h2>父组件：{this.state.textVal}</h2>
                  <button onClick={this.changeVal.bind(this)}>修改父
                      组件的state</button>
                  <Son textVal={this.state.textVal} changeVal=
                      {this.changeVal.bind(this)}></Son>
              </div>
          );
      }
  }
  class Son extends Component {
      constructor(props) {
          super(props);
          this.state = {
              sonVal: this.props.textVal //把父组件传递过来的textVal赋
  值给了子组件Son的内部状态sonVal上
          };
      }
      changeVal() {
          this.setState({
              sonVal: "lisi"
          });
      }
      render() {
          return (
              <div>
                  <h2>子组件state：{this.state.sonVal}</h2>
                  <h2>子组件props：{this.props.textVal}</h2>
                  <button onClick={this.changeVal.bind(this)}>修改子
                      组件state按钮</button>
              </div>
          );
      }
  }import { Component } from "react";
  export default class Pai extends Component {
      constructor(props) {
          super(props);
          this.state = {
              textVal: "zhangsan"
          };
      }
      changeVal() {
          this.setState({
              textVal: "lisi"
          });
      }
      render() {
          return (
              <div>
                  <h2>父组件：{this.state.textVal}</h2>
                  <button onClick={this.changeVal.bind(this)}>修改父
                      组件的state</button>
                  <Son textVal={this.state.textVal} changeVal=
                      {this.changeVal.bind(this)}></Son>
              </div>
          );
      }
  }
  class Son extends Component {
      constructor(props) {
          super(props);
          this.state = {
              sonVal: this.props.textVal //把父组件传递过来的textVal赋
  值给了子组件Son的内部状态sonVal上
          };
      }
      changeVal() {
          this.setState({
              sonVal: "lisi"
          });
      }
      render() {
          return (
              <div>
                  <h2>子组件state：{this.state.sonVal}</h2>
                  <h2>子组件props：{this.props.textVal}</h2>
                  <button onClick={this.changeVal.bind(this)}>修改子
                      组件state按钮</button>
              </div>
          );
      }
  }
  ```

  - > 代码分析：
    > 以上的情况我们可以认为，父组件向子组件传入了数据“zhangsan”，但是在子
    > 组件中我们通过 sonVal:this.props.textVal 将该数据指派给了子组件自己的内
    > 部状态sonVal
    > 然后我们在通过父组件中修改父组件状态的changeVal方法修改了父组件的状
    > 态值，子组件中sonVal的值并没有跟着一起变化，这情况下虽然子组件的
    > sonVal的值是通过父组件传入赋值得到的，但是它并不受控与父组件
    > 而派生状态的使用就是为了让你上面这种情况下的组件中的sonVal依然还可以
    > 受控于父组件，也就是说子组件的内部状态的值会根据父组件的内部状态的值
    > 的改变而改变
    > 注意点：
    > 派生状态的实现的功能于直接在组件中通过props调用渲染父组件传入的数据
    > 所形成的效果是一样的，但是原理完全不同
    >
    > - props的实现方式始终都没有触及到组件自身的内部状态，一直使用的都是父组件的数据
    > - 派生状态的实现本事还是调用组件自身的内部状态，子组件通过props将父组件传入的数据赋值给子组件的内部状态

### 4.3、扩展知识：实现派生状态

- getDerivedStateFromProps方法的目的就只有一个，就是实现派生状态，是组件可以根据props的结果来更新自己的内部状态

- > **注意：慎用派生状态**

- 举例：

```jsx
import { Component } from "react";
export default class Father extends Component {
    state = {
        fatherVal: "hello"
    };
    changeVal(e) {
        this.setState({
            fatherVal: e.target.value
        });
    }
    render() {
        return (
            <div>
                父组件:<input type="text" value=
                    {this.state.fatherVal} onChange={this.changeVal.bind(this)} />
                <Son textVal={this.state.fatherVal}></Son>
            </div>
        );
    }
}
class Son extends Component {
    state = {
        sonVal: this.props.textVal
    };
    render() {
        return <h2>子组件：{this.state.sonVal}</h2>;
    }
    static getDerivedStateFromProps(nextProps) {
        return {
            sonVal: nextProps.textVal
        };
    }
}
```

- > 代码分析：
  >
  > 这里我们实现了派生状态，将Father组件的内部状态fatherVal传入Son组件，
  >
  > 并指派给Son组件的内部状态sonVal，当父组件触发changeVal的时候，父组件
  >
  > 的内部状态fatherVal发生变化触发了组件的重新渲染，而这个渲染过程会波及
  >
  > 到子组件使子组件也会一并从更新，而子组件的更新也必然会触发其生命周期
  >
  > 函数getDerivedStateFromProps 将父组件更新后传入子组件中的数据从props
  >
  > 当中调出来再次赋值给子组件的内部状态
  >
  > 现在子组件中的sonVal就是一个真正意义上的**派生状态（子组件的一种特殊内部状态）**

### 4.4、扩展知识：派生状态的常见bug

- 举例：
- 现在我们对上面的例子做一点修改，现在我们把子组件中的派生状态sonVal在子组件中实现与一个input的双向数据绑定

```jsx
import { Component } from "react";
//father组件省略......
class Son extends Component {
    state = {
        sonVal: this.props.textVal
    };
    //制作双向绑定的方法
    changeSonVal(e) {
        this.setState({ sonVal: e.target.value });
    }
    render() {
        return (
            //把sonVal渲染到一个表单上，然后绑定onChange事件执行双向绑定
            <div>
                <h2>子组件：{this.state.sonVal}</h2>
                <input type="text" value={this.state.sonVal}
                    onChange={this.changeSonVal.bind(this)} />
            </div>
        );
    }
    static getDerivedStateFromProps(nextProps) {
        return {
            sonVal: nextProps.textVal
        };
    }
}
```

- > 代码分析：
  >
  > 上面这样写是有问题的，我们会发现子组件中的input永远无法输入新的值进去
  >
  > 原因：
  >
  > 其实并不是写不进去数据，而是每当我们输入一个数据的时候就会触发组件的
  >
  > 更新，而组件一更新就会重新渲染，而一旦重新渲染sonVal的值就又会被从新
  >
  > 指派成父组件传入的textVal的值，在input的value上面渲染的数据也就又会编
  >
  > 程父组件指派的数据，周而复始，只要一直持续输入数据就一直这样，导致在
  >
  > input中输入的数据一直被覆盖掉，无法将新数据保留下来
  >
  > **解决方案：完全受控组件**
  >
  > 直接全程props，从子组件中彻底抛弃内部状态，子组件直接使用props不再去
  >
  > 组件内部接收父组件的指派状态
  >
  > ```jsx
  > import { Component } from "react";
  > export default class Father extends Component {
  >     state = {
  >         fatherVal: "hello"
  >     };
  >     changeVal(e) {
  >         this.setState({
  >             fatherVal: e.target.value
  >         });
  >     }
  >     render() {
  >         return (
  >             <div>
  >                 父组件:<input type="text" value=
  >                     {this.state.fatherVal} onChange={this.changeVal.bind(this)}
  >                 />
  >                 <Son textVal={this.state.fatherVal}
  >                     changeVal={this.changeVal.bind(this)}></Son>
  >             </div>
  >         );
  >     }
  > }
  > class Son extends Component {
  >     state = {
  >         sonVal: this.props.textVal
  >     };
  >     render() {
  >         return (
  >             <div>
  >                 <h2>子组件：{this.state.sonVal}</h2>
  >                 <input type="text" value={this.props.sonVal}
  >                     onChange={this.props.changeVal.bind(this)} />
  >             </div>
  >         );
  >     }
  > }
  > ```
  >
  > 

### 4.5、getSnapshotBeforeUpdate函数

- 这是一个新增的更新阶段的生命周期函数，它在render之后触发，其接收两个参数，一个返回值
- 参数1：更新之前的props
- 参数2：更新之前的state
- 返回值：改返回值会作为componentDidUpdate生命周期函数的第三个参数传入，一般我们会返回之前的一些页面状态，从而进行页面状态的保持
- 举例：
- 现在有一个移动端页面，我们现在希望当组件更新之后，调整当前滚动的位置

```jsx
import { Component } from "react";
import './scroll.css';
export default class Scroll extends Component {
    state = {
        num: 1
    };
    //当组件加载时设置一个定时器，4秒轴修改状态从而触发组件更新
    componentDidMount() {
        this.clearTime = setTimeout(() => {
            this.setState({
                num: 2
            });
        }, 4000);
        console.log(this.wrap);
    }
    //一般情况下，我们会把组件内设置的定时器，在组件卸载的时候清除掉
    componentWillUnmount() {
        clearTimeout(this.clearTime);
    }
    render() {
        return (
            <div className="wrap" ref={ref => this.wrap = ref}>
                <div className="box1">111</div>
                <div className="box2">{this.state.num}</div>
            </div>
        );
    }
    //当开始更新时，将更新之前的wrap元素的scrollTop返回出去
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return this.wrap.scrollTop;
    }
    //在更新之后，通过componentDidUpdate的第三个参数调出wrap元素更新之前的scrollTop值减去300，再赋值给更新之后的wrap;
    componentDidUpdate(prevProps, prevState, prevScrollTop) {
        this.wrap.scrollTop = prevScrollTop - 300;
    }
}
```

- scroll.css

```css
*{
    padding:0;
    margin:0;
}
.wrap{
    width:100vw;
    height:100vh;
    overflow: auto;
}
.box1{
    height:1000px;
    background:#f00;
}
.box2{
    height:1000px;
    background:#0f0;
}
```

- > 代码分析：
  >
  > 上面的例子中，我们Scroll组件应该会再加载好的4秒之后自动修改内部状态，
  >
  > 从而触发更新生命周期，然后当前滚动的位置会向上自动滚动300px的位置，
  >
  > 这里主要依靠的就时 getSnapshotBeforeUpdate 将更新之前的scrollTop的值
  >
  > 返回出去，然后更新之后的生命周期函数 componentDidUpdate 可以接收到
  >
  > 该值作为第三个参数的实参，并将更新之前的scrollTop的值再赋值给更新之后
  >
  > 的scrollTop
  >
  > 注意：
  >
  > 这里减去300主要是为了通过位置移动观察生命周期函数的效果，如果单纯只
  >
  > 是为了保持滚动位置我们是不需要去减的

## 5、特殊生命周期 -- React异常捕获

- 从React16开始引入了一个新的概念叫做**错误边界**
- 错误边界可以理解成是一个React组件，其应用场景与概念比较类似于我们之前vue中讲过的异步组件，只不过它并不是一个Promise对象，这种组件可以捕获并答应发生在子组件树任意位置二点原生JavaScript错误，并且渲染出来错误情况下的ui界面，而不是渲染错误的子组件树
- 目前只有类组件可以作为错误边界组件使用，要实现错误边界组件需要使用以下两个函数
  - getDerivedStateFromError(error)
  - componentDidCatch(error,info)

- 以上两个函数任意一个或两个都用都可以构成一个错误边界组件，这两个函数功能类似

### 5.1、getDerivedStateFromError(error)

- 该方法是一个静态方法，接收一个参数，返回一个对象

- 参数：错误对象

- 返回值：返回一个匿名对象，这个对象直接指向当前组件的state
- 举例：

```jsx
import { Component } from "react";
export default class ErrorComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false, //error用来表示当前错误边界组件是否捕获到错误
        };
    }
    static getDerivedStateFromError(error) {
        console.log(error);
        return {
            error: true
        };
    }
    render() {
        if (this.state.error) {
            return (
                <>
                    <p>我是错误</p>
                </>
            );
        } else {
            return (
                <>
                    <Child></Child>
                </>
            );
        }
    }
}
class Child extends Component {
    render() {
        throw new Error("我是一个错误"); //在子组件中人为抛出一个错误触发getDerivedStateFromError;
        return (
            <div>渲染child组件</div>
        );
    }
}
```

- > 代码分析：
  >
  > 上面的代码中，我们创建一个ErrorComp组件作为错误边界组件，在内部调用
  >
  > 在子组件中人为抛出一个错误触发getDerivedStateFromError，同时创建和一
  >
  > 个子组件Child并在其渲染的时候手动抛出一个错误，当组件渲染时，
  >
  > ErrorComp接收到子组件抛出的错误触发getDerivedStateFromError通过该方
  >
  > 法的返回值修改了error状态的值为true，在ErrorComp组件在render的时候，
  >
  > 根据error状态的值做一个判断来决定渲染内容

### 5.2、componentDidCatch(error,info)

- 该方法的作用其实和上面的方法基本一致，就是制作逻辑不太一样，接收两个参数，没有返回值
- 参数1：错误信息对象
- 参数2：自动注入一个对象，对象内部有一个componentStack属性记录当前错误的路径
- 举例：

```jsx
import { Component } from "react";
export default class ErrorComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false, //error用来表示当前错误边界组件是否捕获到错误
            text: ""
        };
    }
    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({ //通过setState修改内部状态（于之前的return其实
            是一样的效果）
            error: error,
            text: info.componentStack //把错误信息路径赋值给text
        });
    }
    render() {
        if (this.state.error) {
            return (
                <>
                    <p>我是错误：{this.state.text}</p>
                </>
            );
        } else {
            return (
                <>
                    <Child></Child>
                </>
            );
        }
    }
}
class Child extends Component {
    render() {
        throw new Error("我是一个错误"); //在子组件中人为抛出一个错误触发
        return (
            <div>渲染child组件</div>
        );
    }
}
```

- - > 代码分析：
    >
    > 上面的例子其实执行的效果与getDerivedStateFromError方法的执行效果大差
    >
    > 不多，只不过客户以多接收一个参数记录错误位置，一般我们可以把这个错误
    >
    > 作为错误日志上传给服务器，同时因为没有return的方式修改错误状态error的
    >
    > 值，所以我们直接使用setState来修改

- 以上两个方法如果一起用，我们可以用getDerivedStateFromError来修改错误状态，用componentDidCatch来调用一个上传接口上传错误给服务器做错误日志

- > 注意事项：
  >
  > - 错误边界组件只能捕获自己组件的子组件中的错误，所以我们首先会专门制作多个需要在不同错误状态下渲染的错误信息组件
  > - 在开发环境下就算渲染出来了备用组件，依然还是会弹出React自己的报错页面，生产环境下不会，所以说错误边界组件是为生产环境下准备的

### 5.3、无法捕获的异常情况

- 有4种情况无法被错误边界捕获
  - 事件处理
  - 异步代码
  - 服务端渲染
  - 自身抛出的错误
- 对于错误边界无法捕获的异常，我们可以使用 try...catch... 语句
- 举例：

```jsx
import { Component } from "react";
export default class ErrorCatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    bandleClick() {
        try {
            throw new Error("我是一个错误"); //在try种手动抛出一个错误
            让catch捕获;
        } catch (error) {
            this.setState({ error });
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.error ? <p>{'我是错误的'}</p> : <p>
                        {'我是正确的'}</p>
                }
                <button onClick={this.bandleClick.bind(this)}>按钮
                </button>
            </div>
        );
    }
}
```

- > 代码分析：
  >
  > 我们通过点击事件触发一个try...catch语句的执行，并且在try中年故意抛出一个错误，从而 修改error的状态值，来控制当前组件的渲染结果

## 6、React生命周期整理

- React的生命周期会比较复杂一些，我们现在来做一个总结性质的生命周期函数整理

### 6.1、老生命周期函数

- **挂载阶段：**
  - 1、 constuctor 初始化着呢个组件的state已经调用props，该方法只会执行一次
  - 2、 componentWillMount 挂载之前（已经被弃用，但是目前的react19中依然可以使用，但是会报警告）
  - 3、 render 只返回需要渲染的页面结构，最好不要包含其他的业务代码
  - 4、 componentDidMount 挂载之后，可以获取DOM节点操作，服务器请求，启动事件监听，调用setState等，都可以在这个函数中执行

- **更新阶段情况一：state更新时**
  - 1、 shouldComponentUpdate(nextProps,nextState) 有两个参数分别表示更新之后的props和state，返回一个布尔值，true表示会触发后续更新，false表示不会触发后续更新，默认返回true，我们通过利用这个生命周期来优化React的性能
  - 2、 componentWillUpdate 准备开始更新（已弃用，但是目前的react19中依然可以使用，但是会报警告）
  - 3、 render 重新渲染页面结构（与挂载阶段共享的一个生命周期函数）
  - 4、 componentDidUpdate 在组件完成更新之后立即调用，在初始化的时候不会被调用
- **更新阶段情况二：props更新时**
- 1、 componentWillReceiveProps(nextProps) 外部传入的数据发生变化的时候触发（父组件修改了自己内部的数据，而这个被修改的数据有传递给子组件）
- 2、 shouldComponentUpdate(nextProps,nextState) 有两个参数分别表示更新之后的props和state，返回一个布尔值，true表示会触发后续更新，false表示不会触发后续更新，默认返回true，我们通过利用这个生命周期来优化React的性能
- 3、 componentWillUpdate 准备开始更新（已弃用，但是目前的react19中依然可以使用，但是会报警告）
- 4、 render 重新渲染页面结构（与挂载阶段共享的一个生命周期函数）
- 5、 componentDidUpdate 在组件完成更新之后立即调用，在初始化的时候不会被调用
- **卸载阶段：**

- 1、 componentWillUnmount 当组件卸载的时候触发，我们一般在这个函数里面去清除一些定时器，取消网络请求，清除无效的DOM元素，清理缓存等等一些垃圾清理工作

- > **以上已经被弃用的生命周期函数**
  >
  > componentWillMount
  >
  > componentWillReceiveProps(nextProps)
  >
  > componentWillUpdate
  >
  > 但是在当前react19的版本中依然还是可以使用，但是会报警告，要求加上前缀UNSAFE_

### 6.2、新生命周期函数

- **挂载阶段：**

  - 1、 constuctor 初始化着呢个组件的state已经调用props，该方法只会执行一次
  - 2、 getDerivedStateFromProps(nextProps,prevState) 这个是一个静态方法，所以在类组件中声明的时候记得带上static修饰符，接收的两个参数分别是新传入的props和修改之前的state，它返回一个对象来更新组件的内部状态，如果返回null则不更新任何内容
  - 3、 render 只返回需要渲染的页面结构，最好不要包含其他的业务代码
  - 4、 componentDidMount 挂载之后，可以获取DOM节点操作，服务器请求，启动事件监听，调用setState等，都可以在这个函数中执行

- **更新阶段：**

  - 1、 componentWillReceiveProps(nextProps) 外部传入的数据发生变化的时候触发（父组件修改了自己内部的数据，而这个被修改的数据有传递给子组件）
  - 2、 shouldComponentUpdate(nextProps,nextState) 有两个参数分别表示更新之后的props和state，返回一个布尔值，true表示会触发后续更新，false表示不会触发后续更新，默认返回true，我们通过利用这个生命周期来优化React的性能
  - 3、 getDerivedStateFromProps(nextProps,prevState) 这个是一个静态方法，所以在类组件中声明的时候记得带上static修饰符，接收的两个参数分别是新传入的props和修改之前的state，它返回一个对象来更新组件的内部状态，如果返回null则不更新任何内容
  - 4、 render 重新渲染页面结构（与挂载阶段共享的一个生命周期函数）
  - 5、 getSnapshotBeforeUpdate(prevProps,prevState) 有两个参数分别接收更新之前的props和state，返回一个值，这个值会作为componentDidUpdate的第三个参数使用，如果你不向返回值，可以返回null，该生命周期函数主要配合componentDidUpdate搭配使用

  - 6、 componentDidUpdate(prevProps,prevState,snapShot) 在组件完成更新之后立即调用，在初始化的时候不会被调用，该方法被调用后会接收三个参数，分别表示跟新之前的props，更新之前的state，getSnapshotBeforeUpdate的返回值，主要可以用于做状态保持的使用

- **卸载阶段：**
- 1、 componentWillUnmount 当组件卸载的时候触发，我们一般在这个函数里面去清除一些定时器，取消网络请求，清除无效的DOM元素，清理缓存等等一些垃圾清理工作
