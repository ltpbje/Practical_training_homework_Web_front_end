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
