# React路由



- React也是通过路由来实现页面跳转，前端路由基本都是基于hash或者history两种来实现页面跳转，同时React的路由也是一个专门的依赖包来实现的

- 安装包

- ```cmd
  npm i React-router-dom@5 --save
  ```

## 1、配置路由

- 新建router目录，创建index.js

- 然后再创建views目录，创建两个页面组件home和about来作为路由跳转的演示页面

- ```jsx
  //BrowserRouter是一个路由组件（路由管理对象），还组件自带history模式，还有一个HashRouter，自带hash模式，但是不推荐;
  import { BrowserRouter, Switch, Route } from "react-router-dom";
  import Home from "../views/Home/Home";
  import About from "../views/About/About";
  //react当中的路由管理对象是一个组件，所以我们这里需要创建一个组件来作为路由管理对象使用，这里我们采用函数组件;
  const Routers = () => {
      return (
          //表示该路由使用history模式
          <BrowserRouter>
              <Switch>
                  <Route exact path="/home" component={Home}>
                  </Route>
                  <Route exact path="/about" component={About}>
                  </Route>
              </Switch>
          </BrowserRouter>
      );
  };
  export default Routers;
  ```

  

- 然后，我们能把路由组件导入到App组件中调用

- ```js
  import './App.css';
  import Routers from './router';
  function App() {
      return (
          <div className="App">
              <Routers></Routers>
          </div>
      );
  }
  export default App;
  ```

- 现在在页面上，我们可以通过手动输入路径的方式来实现跳转

## 2、嵌套路由

- 嵌套路由其实就是对需要跳转的页面进行层级划分，现在根据之前vue的案例，来制作嵌套路由

```jsx
//BrowserRouter是一个路由组件（路由管理对象），还组件自带history模式，还有一个HashRouter，自带hash模式，但是不推荐;
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../views/Home/Home";
import About from "../views/About/About";
import Order from "../views/Home/order/Order";
import Shops from "../views/Home/shops/shops";
//react当中的路由管理对象是一个组件，所以我们这里需要创建一个组件来作为路由管理对象使用，这里我们采用函数组件;
const Routers = () => {
    return (
        //表示该路由使用history模式
        <BrowserRouter>
            <Switch>
                <Route path="/home" component={() => (<Home>
                    <Switch>
                        <Route path="/home/shops" component=
                            {Shops}></Route>
                        <Route path="/home/order" component=
                            {Order}></Route>
                    </Switch>
                </Home>)}></Route>
                <Route path="/about" component={About}></Route>
            </Switch>
        </BrowserRouter>
    );
};
export default Routers;
```

- > 代码分析：
  >
  > 现在我们制作了一个在App组件下切换的一级页面home与about，然后再home下面我们设置了二级页面shops和Order，这里二级页面需要在home这个一级页面中进行切换渲染，但是我们发现直接在页面上输入对应的二级路径却无法显示对应的二级路由指向的组件内容这里因为确实了一个用作组件渲染的路由窗口

- 所以，这里我们打开home组件

- ```jsx
  import { Component } from "react";
  export default class Home extends Component {
      state = {
          num: 1
      };
      render() {
          return (
              <>
                  <h2>我是home</h2>
                  <div>{this.props.children}</div>
              </>
          );
      }
  }
  ```

  - >  代码分析：
    >
    > this.props.children 这句话就相当于是vue中的router - view的作用，在home页面中可以切换显示shops和about

## 3、路由跳转

- 现在我们可以手动输入地址来切换页面，如果实现点击切换的效果

- 1、Link：react-router-dom提供一个Link组件可以实现页面跳转

- 2、编程式导航：类似vue从路由对象中调用跳转到执行跳转

- Link实现：打开home.jsx

- ```jsx
  import { Component } from "react";
  import { Link } from 'react-router-dom';
  export default class Home extends Component {
      state = {
          num: 1
      };
      render() {
          return (
              <>
                  <h2>我是home</h2>
                  <Link to="/home/shops">shops</Link> | <Link
                      to="/home/order">order</Link>
                  <div>{this.props.children}</div>
              </>
          );
      }
  }
  ```

- 编程式导航实现：先开打shops.jsx

- ```jsx
  import { Component } from "react";
  export default class Shops extends Component {
      state = {
          num: 1
      };
      //制作一个跳转到order页面的方法
      goOrder() {
          this.props.history.push("/home/order");
      }
      render() {
          return (
              <>
                  <h2>Shops</h2>
                  <button onClick={this.goOrder.bind(this)}>跳转
                      order</button>
              </>
          );
      }
  }
  ```

- 然后，我们打开order.jsx

- ```jsx
  import { Component } from "react";
  export default class Order extends Component {
      state = {
          num: 1
      };
      //制作一个返回上一个页面的方法
      goBack() {
          this.props.history.goBack();
      }
      render() {
          return (
              <>
                  <h2>Order</h2>
                  <button onClick={this.goBack.bind(this)}>返回
                  </button>
              </>
          );
      }
  }
  ```

  

- 现在我们可以在页面中通过点击按钮来实现跳转，其中shops页面中的按钮点击之后执行goOrder方法跳转到order页面，在order页面点击按钮执行goBack返回上一个页面

## 4、404页面

- 当我们的路由跳转发生问题的时候，我们会发现一个情况，如果跳转的页面不存在了，那么在浏览器窗口会出现一个空白的情况，不会有任何的反馈信息，我们之前一直都在说，用户所做的任何操作都必须要有反馈，那么，现在的情况就是一片空白没有反馈

- 那么，一般针对跳转失败的情况无外乎两种，一个是超时，一个是页面丢失而现在做的是一个单页面应用开发的话，是不存在跳转页面超时的，因为所有的页面都在一个html文件中，不会出现通过网络请求去找第二个页面的情况所以，情况只剩下页面丢失，而一般情况下页面丢失我们会反馈一个404页面告诉用户页面丢失

- 举例：

- 在views目录中，新建一个Page404.jsx

- ```jsx
  import { Component } from "react";
  export default class Page404 extends Component {
      render() {
          return (
              //这里随便找了一张网络图片作为404页面的效果演示
              <div>
                  <img
                      src="https://p0.itc.cn/images01/20220331/63764fa8e8b94e7695b85596a71444f5.jpeg" alt="" />
              </div>
          );
      }
  }
  ```

- 在router目录的index.js中

- ```jsx
  //BrowserRouter是一个路由组件（路由管理对象），还组件自带history模式，还有一个HashRouter，自带hash模式，但是不推荐;
  import { BrowserRouter, Switch, Route } from "react-router-dom";
  import Home from "../views/Home/Home";
  import About from "../views/About/About";
  import Order from "../views/Home/order/Order";
  import Shops from "../views/Home/shops/shops";
  import Page404 from "../views/page404/Page404";
  //react当中的路由管理对象是一个组件，所以我们这里需要创建一个组件来作为路由管理对象使用，这里我们采用函数组件;
  const Routers = () => {
      return (
          //表示该路由使用history模式
          <BrowserRouter>
              <Switch>
                  <Route path="/home" component={() => (<Home>
                      <Switch>
                          <Route path="/home/shops" component=
                              {Shops}></Route>
                          <Route path="/home/order" component=
                              {Order}></Route>
                          {/* <!-- 新增一个Route作为404页面的路由对象 --> */}
                          <Route component={Page404}></Route>
                      </Switch>
                  </Home>)}></Route>
                  <Route path="/about" component={About}></Route>
              </Switch>
          </BrowserRouter>
      );
  };
  export default Routers;
  ```

  

- > 代码分析：
  >
  > 这里我们在设置404页面的时候，并没有通过path指定路径，那么，当地址处了是shops和order以外的都会进入到这个404页面
  >
  > 注意：
  >
  > 这里我们把404页面设置home路由上面，所以这个404页面只会针对home路径下的二级路径丢失作用，一级路径错误的话是不会有响应的，如果需要一级路径下的页面也有404响应就在一级路由中也添加404路由即可

## 5、路由重定向

- 现在根据我们之前的项目制作经验，我们知道，在单页面应用中，根路径下一般是没有组件指向可以显示的，但是默认情况下，用户在浏览器中输入一个网址（域名）默认进入的是该服务器下的根路径，所以当用户进入的时候我们需要对根路径重定向到一个我们指定的首页上去

- > 现在我们通过访问根路径得知，根路径会渲染App根组件，所以，我们在App的根组件上面使用生命周期函数作一个浏览器地址栏的路径判断，来决定是否跳转到我们指定的首页路径

- 打开App.jsx

- ```jsx
  import './App.css';
  import Routers from './router';
  import { Component } from 'react';
  class App extends Component {
      UNSAFE_componentWillMount() {
          if (window.location.pathname === "/") {
              window.location.href = "/home/shops";
          }
      }
      render() {
          return (
              <div className="App">
                  <Routers></Routers>
              </div>
          );
      }
  }
  export default App;
  ```

  

- > 代码分析：
  >
  > 现在我们在App组件中通过生命周期UNSAFE_componentWillMount的触发来执行一个路径判断，看到前渲染App组件的时候访问路径是否未根路径，如果是就跳转
  >
  > **问题一：为什么要做判断不直接跳转？**
  >
  > 因为App作为根组件，不管你现在跳转哪个路径都会调用并渲染App组件，所以，这里我们需要做一个判断来表明现在访问的是根路径才做指定的首页跳转，不然你访问任何路径都会重定向到我们指定的首页路径上
  >
  > **问题二：为什么要使用BOM中的locaition对象，不使用props中的location对象？**
  >
  > 因为App组件作为根组件它没有父级组件，而props中的东西都是需要有父组件传递的，所以在App组件中调用props我们会发现它成了一个空对象，所以我们就直接使用BOM中的location来直接调出浏览器地址栏中的地址进行判断使用
  >
  > **问题三：如何让App组件中的props变成可用的？**
  >
  > 首先，在解释这个问题之前，我们有几个在react当中关于组件的概念需要了解，当路由参与到react当中之后，我们所有的react都会围绕路由来开始制作，原本制作的views中的页面组件就会作为路由组件来进行使用，因为页面组件之间的跳转需要依靠路由来实现
  >
  > 所以，具体制作的时候我们会把页面组件注册成一个路由组件来使用，但是涉及到嵌套路由的时候，有的页面组件会作为路由窗口组件来使用，这个时候，
  >
  > 这些窗口组件是无法被路由对象传入路由对象信息的，所以导致现在的App组件中无法从props当中调出location和history，从而无法获取到页面路径和跳转API来使用
  >
  > 那么，这个时候这些窗口组件就需要通过react - router - dom中提供一个方法withRouter进行一个二次处理，让这些窗口组件既可以作为窗口组件从props中调出children来切换显示，也可以调出history、locaiton、match这些路由信息;
  >
  > 带入如下：
  >
  > ```jsx
  > import './App.css';
  > import { Component } from 'react';
  > import { withRouter } from 'react-router-dom';
  > class App extends Component {
  >     constructor(props) {
  >         super(props);
  >     }
  >     UNSAFE_componentWillMount() {
  >         console.log(this.props);
  >         if (this.props.location.pathname === "/") {
  >             this.props.history.push("/home/shops");
  >         }
  >     }
  >     render() {
  >         return (
  >             <div className="App">
  >                 {this.props.children}
  >             </div>
  >         );
  >     }
  > }
  > export default withRouter(App); //记得一定要让App被withRouter处理之后再导出;
  > ```
  >
  > 

# redux与antd

- redux是一个可以用在react上的全局状态管理
- antd是蚂蚁金服开发一套ui框架，主打react

## 1、使用antd快速搭建页面

- 安装包

- ```cmd
  npm install antd --save
  ```

- 简单测试下是否安装成功

- 新建listData.jsx

```jsx
import { Component } from "react";
import { Button } from 'antd';
export default class ListData extends Component {
    render() {
        return (
            <div>
                <Button type="primary">Primary Button</Button>
            </div>
        );
    }
}
```

- 我们把list页面作为home下的二级页面在路由上进行设置

```jsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
//.......
import List from "../views/Home/List/List";
const Routers = () => {
    return (
        //表示该路由使用history模式
        <BrowserRouter>
            <Switch>
                <Route path="/" component={() => (<App>
                    <Switch>
                        <Route path="/home" component={() =>
                        (<Home>
                            <Switch>
                                <Route path="/home/shops"
                                    component={Shops}></Route>
                                <Route path="/home/order"
                                    component={Order}></Route>
                                <Route path="/home/list"
                                    component={List}></Route>
                                <Route component={Page404}>
                                </Route>
                            </Switch>
                        </Home>)}></Route>
                        <Route path="/about" component={About}>
                        </Route>
                    </Switch>
                </App>)}></Route>
            </Switch>
        </BrowserRouter>
    );
};
export default Routers;
```

- 然后浏览器手动输入地/home/list地址，没有问题的话我们是可以看到一个蓝色按钮的

## 2、list案例

- 现在我们制作一个简单的list案例，设置一个input和button，将input中输入的内容通过button点击执行添加到组件的内部状态中，然后通过antd的List组件进行列表渲染

- listData.jsx

- ```jsx
  import { Component } from "react";
  import { Button, Input, List } from 'antd';
  import './listData.css';
  export default class ListData extends Component {
      constructor(props) {
          super(props);
          this.state = {
              arr: ["zhangsan", "lisi", "wangwu"]
          };
      }
      render() {
          return (
              <div className="box">
                  <div className="top">
                      <Input placeholder="请输入内容"></Input>
                      <Button className="m-l" type="primary">添加内
                          容</Button>
                  </div>
                  <div className="bottom">
                      <List
                          itemLayout="vertical"
                          dataSource={this.state.arr}
                          renderItem={item => (
                              <List.Item>
                                  {item}
                              </List.Item>
                          )}
                      />
                  </div>
              </div>
          );
      }
  }
  ```

- 新建listData.css

- ```css
  .box{
      width:600px;
      margin:100px auto;
  }
  .top{
      display: flex;
      margin-bottom:20px;
  }
  .m-l{
      margin-left:10px;
  }
  ```

  

- > 代码分析：
  >
  > 上面这套代码我们主要关注两个点：
  >
  > 1、在父组件中修改子组件的样式：
  >
  > 我们之前在学习vue的时候知道，vue的组件有一个特性，可以通过style标签的
  >
  > scoped属性让样式封闭在组件中，但是这样也就意味着外部也无法修改，如果
  >
  > 要修改需要通过v-deep实现，而react中没有这个情况，我们可以直接找到组件
  >
  > 中标签的类名来直接修改，也可以添加新的类名来修改
  >
  > 2、antd的List组件的使用
  >
  > 这里antd组件的使用其实和elementPlus基本一模一样，所以对于已经学会使
  >
  > 用elementPlus的人来说基本是直接就拿来用，
  >
  > **同时注意，我们现在使用的antd是针对PC端的，如果要适配移动端可以使用**
  >
  > **antd mobile**

## 将Input组件制作成受控组件

- 现在Input组件输入的数据并不受React的state控制，其数据还是受DOM自身控制，所以我们现在要Input制作成受控组件

```jsx
import React, { Component } from 'react';
import { Button, Input, List } from 'antd';
import 'antd/dist/reset.css';
import '../assets/css/list.css';
export default class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ['zhangsan', 'lisi', 'wangwu'],
            textVal: '' //设置textVal储存Input的value的值
        };
    }
    //制作获取Input的value值的方法，让其成为受控组件
    getInputVal(event) {
        this.setState({
            textVal: event.target.value
        });
    }
    //将每次Input输入的内容添加到arr数组的前面，从而实时渲染新值的列表项
    addItem() {
        this.state.arr.unshift(this.state.textVal);
        this.setState({
            arr: this.state.arr,
            textVal: '' //每次新增之清除之前输入的内容
        });
    }
    render() {
        return (
            <div className='box'>
                <div className="top">
                    <Input placeholder='请输入内容' value=
                        {this.state.textVal} onChange={this.getInputVal.bind(this)}>
                    </Input>
                    <Button className='m-l' type="primary"
                        onClick={this.addItem.bind(this)}>添加</Button>
                </div>
                <div className="bottom">
                    <List
                        bordered
                        dataSource={this.state.arr}
                        renderItem={item => (<List.Item>{item}</List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}
```

## redux全局状态管理

- 安装包

- ```cmd
  npm i redux
  ```

- 新建store文件夹，然后新建两个js文件，index.js 和 reducer.js

- 先来看reducer.js 管理数据的文件

- ```jsx
  //reducer文件只负责两件事
  //1、声明默认状态
  //2、导出一个修改状态的函数
  //defaultState默认数据
  const defaultState = {
      msg: "hello"
  };
  //导出一个函数，这个函数有两个参数，其实state的默认值是默认状态，这个方法会返回一个state;
  //这个导出的函数就是修改状态的方法
  export default (state = defaultState, action) => {
      return state;
  };
  ```

- index.js 全局状态管理入口文件

- ```jsx
  import {createStore} from "redux" //导入创建store实例的方法
  import reducer from './reducer' //导入要在实例中引入使用的数据
  const store = createStore(reducer); //创建store实例，然后引用reducer方法
  export default store //导出store实例
  ```

- > 代码分析：
  >
  > 两个文件的关系有点类似于数据与数据管理员的关系，reducer.js负责储存操作
  >
  > 数据，index.js负责管理reducer的数据

- **现在我们把上面案例中的数据使用全局状态管理的方式进行调用**

- 把原来list中的数据删掉改写到reducer中，然后从reducer中再把数据调回到list中

- ```jsx
  //......
  import store from '../store';
  export default class list extends Component {
      constructor(props) {
          super(props);
          this.state = store.getState();
      }
      //......
  }
  ```

  - > 代码分析：
    >
    > 从导入的store中使用getState方法来调出全局的状态在当前组件中使用，但是
    >
    > 上面的写法有点问题，如果直接覆盖掉原组件中的state，可能会把组件自己的
    >
    > 状态也覆盖掉，所以我们可以通过展开运算来获取全局状态
    >
    > ```jsx
    > this.state = {
    >     ...store.getState(
    > }
    > ```
    >
    > 

### redux-devtools调试工具

- 我们可以给浏览器安装插件redux - devtools，这里我们就可以在开发工具中实时观察到全redux内的状态

- edge浏览器直接在插件扩展的商店里面搜索redux - devtools安装

- 安装好之后，我们在store的index.js中要添加如下代码

- ```jsx
  import { createStore } from "redux"; //导入创建store实例的方法
  import reducer from './reducer'; //导入要在实例中引入使用的数据
  const store =createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()); //创建store实例，然后引用reducer方法;
  export default store; //导出store实例
  ```

- > 给createStore的第二个参数设置如下
  >
  > `window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()`

- 配置好之后，我们继续会到list上操作之前做好的添加功能会发现，功能是可以正常运行的，但是新增的数据缺没有不同到redux中，相当于是现在新增的数据还是在list组件内部

- 原因：
- 我们在getInputVal方法中使用的是this.setState方法修改，这个方法的修改只能是针对组件自己的状态，而无法修改redux中调用的状态，所以我们需要改用redux的方法来进行修改

### dispatch派发方法

- 我们从store中调用dispatch方法来修改

- ```jsx
  getInputVal(event){
      //使用dispatch方法必须要传入一个action对象，所以我们创建一个action对象
      let action = {
          type: "textVal",
          value: event.target.value
      };
      store.dispatch(action);
  }
  ```

  

- > 代码分析：
  >
  > action对象中，有两个固定的属性分别是type和value
  >
  > type：表示本次修改的行为
  >
  > value：表示本次修改的实际值
  >
  > 然后把设置好的action传入dispatch方法的参数中
  >
  > **这里的  action  会传入到  reducer.js  中导出的函数的  action  参数 中**

- 在进入reducer.js中，在这个文件中导出的方法我们之前说过就是用来修改全局状态的方法，所以在方法内部开始编写修改业务

- ```jsx
  const defaultState = {
      arr: ['zhangsan', 'lisi', 'wangwu'],
      textVal: ''
  };
  export default (state = defaultState, action) => {
      if (action.type === "textVal") {
          state.textVal = action.value;
      }
      return state;
  };
  ```

  - > 代码分析：
    >
    > 上面导出的方法中的action形参，会接收到在组件中的dispatch方法传入的
    >
    > action实参，然后我们在方法内部制作一个if判断，通过action中的type来决定
    >
    > 当前action中的value要赋值给全局state中的哪个属性值上
    >
    > 我们可以通过刚才安装的redux-devtool工具来实时查看修改情况
    >
    > **注意：**
    >
    > 1. 这里还是会有问题，因为我们在组件中dispatch是通过onChange，所以每
    >
    > 在Input中输入一个字符就会修改一次全局state中的textVal，导致我们没
    >
    > 有办法将完整的数据写入到全局state中
    >
    > 2. 因为我们现在取消了组件中的setState，所以导致Input中的数据无法双向
    >
    > 绑定更新，永远都是初始值的 “ ” 空字符串

### subscribe订阅方法

- 解决上面的问题我们会使用到subscribe订阅方法，之前我们在vue3中使用pinia的时候就有讲过这个方法，vuex里面也有这个方法，这个方法的本质就是一个监听器，用于监听全局状态的变化，当全局状态发生变化的时候执行一个操作

- 在list组件中我们再创建一个方法用于获取每次修改全局state修改之后的数据

- ```jsx
  viewChange(){
      this.setState(store.getState())
  }
  ```

- > 代码分析：
  >
  > 现在的情况是redux中的state现在虽然可以更新了，但是渲染在界面上的数据
  >
  > 还没有更新，所以我们这里需要获取到最新的redux中的state，然后通过
  >
  > setState进行双向绑定

- 然后我们需要从store中调用subscribe方法，当redux中的全局state放生变化的时候执行 viewChange 方法，让组件中的state进行实时更新，再通过setState方法实时渲染到界面上

- ```jsx
  //......
  constructor(props){
      super(props);
      this.state = {
          ...store.getState()
      };
      store.subscribe(this.viewChange.bind(this));
  }
  //......
  ```

- > 代码分析：
  >
  > 我们之前在讲生命周期的时候就讲过constuctor就是一个挂载阶段的生命周期
  >
  > 函数，所以我们在list组件被载入的时候就执行了 subscribe 方法开始监听
  >
  > store中的全局state，而我们只要在Input中输入了数据，就会触发onChange
  >
  > 事件从而执行 getInputVal 方法，而getInputVal方法的执行会向redux中传入
  >
  > action修改全局state，而全局state被修改就会触发 subscribe 方法去执行
  >
  > viewChange 方法，从而完成了这样一个反复循环的过程

- 实现了全局state和页面数据的实时修改之后，我们就开始把数组的部分也进行修改，把界面中的列表部分也实现同步更新

- 修改addItem方法

- ```jsx
  addItem(){
      let action = {
          type: "arr"
      };
      store.dispatch(action);
  }
  ```

  - > 代码分析：
    >
    > 这里不需要设置value，因为需要新增到数组中的数据已经在之前的Input的输
    >
    > 入过程中已经同步到全局state中的textVal中了

- 进入reducer.js中修改导出方法的业务逻辑

- ```jsx
  //defaultState默认数据
  const defaultState = {
      arr: ['zhangsan', 'lisi', 'wangwu'],
      textVal: ''
  };
  export default (state = defaultState, action) => {
      if (action.type === "textVal") {
          state.textVal = action.value;
      } else if (action.type === "arr") {
          state.arr.unshift(state.textVal);
          //把新输入的数据放入数组之后，把textVal清空，这样同步的界面中的
          input也会被清空;
          state.textVal = "";
      }
      return state;
  };
  ```

  ### 制作删除功能

- 因为我们这里的数据都是从全局状态中拿来的，所以删除就相当于是把原本添加到全局arr中的数据再删除掉，所以需要把之前的添加逻辑再跑一遍，只不过在reducer中的业务逻辑要做点修改

- 在list的标签结构上添加删除按钮

- ```jsx
  <List.Item>
      <span>{item}</span>
      <Button type="primary" danger>删除</Button>
  </List.Item>
  ```

- 制作删除方法

- ```jsx
  delItem(index){
      let action = {
          type: "del",
          value: index
      };
      store.dispatch(action);
  }
  ```

- > 代码分析：
  >
  > 这里需要通过delItem方法删除的是全局状态，所以必须要使用dispatch方法，
  >
  > 而删除全局状态中额数组元素时需要对应的索引，所以我们将索引通过action
  >
  > 的value传递给reducer

- 绑定delItem方法

- ```jsx
  <List
      bordered
      dataSource={this.state.arr}
      renderItem={(item, index) => (
          <List.Item>
              <span>{item}</span>
              <Button onClick={this.delItem.bind(this, index)}
                  type="primary" danger>删除</Button>
          </List.Item>
      )}
  />;
  ```

  

- > 代码分析：
  >
  > 上面有说到删除需要用到索引，而索引的获取我们可以通过antd组件List提供
  >
  > 的renderItem获取到，这个renderItem的使用就类似与vue中的v-for指令，可
  >
  > 以在遍历过程中得到当前遍历项的index，然后通过bind将索引传入到delItem
  >
  > 方法中

- 打开reducer.js 修改导出方法

- ```jsx
  //defaultState默认数据
  const defaultState = {
      arr: ['zhangsan', 'lisi', 'wangwu'],
      textVal: ''
  };
  export default (state = defaultState, action) => {
      if (action.type === "textVal") {
          state.textVal = action.value;
      } else if (action.type === "arr") {
          state.arr.unshift(state.textVal);
          state.textVal = "";
      } else if (action.type === "del") {
          state.arr.splice(action.value, 1);
      }
      return state;
  };
  ```

  ### reducer函数写法优化

- 在reducer函数中我们根据action的type来做判断决定后续修改的全局state，那么if后面的else if就会越来越多，我们改成switch语句

- 打开reducer.js

- ```jsx
  //defaultState默认数据
  const defaultState = {
      arr: ['zhangsan', 'lisi', 'wangwu'],
      textVal: ''
  };
  export default (state = defaultState, action) => {
      switch (action.type) {
          case "textVal":
              state.textVal = action.value;
              break;
          case "arr":
              state.arr.unshift(state.textVal);
              newState.textVal = "";
              break;
          case "del":
              state.arr.splice(action.value, 1);
              break;
          default:
              break;
      }
      return state;
  };
  ```

  - 同时为了避免后续因为数据类型导致的赋值深浅拷贝问题，

  - ```jsx
    //defaultState默认数据
    const defaultState = {
        arr: ['zhangsan', 'lisi', 'wangwu'],
        textVal: ''
    };
    export default (state = defaultState, action) => {
        //对state做一个深拷贝，并且下面所有的state全部替换成newState
        let newState = JSON.parse(JSON.stringify(state));
        switch (action.type) {
            case "textVal":
                newState.textVal = action.value;
                break;
            case "arr":
                newState.arr.unshift(state.textVal);
                newState.textVal = "";
                break;
            case "del":
                newState.arr.splice(action.value, 1);
                break;
            default:
                break;
        }
        return newState;
    };
    ```

    

### 为后期维护提供便利

#### 1、把type值提取成公用部分

- 现在我们action中的type如果要修改，那么我们就需要把reducer函数中的判断也做修改，并且，我们这里是全局state，就意味着可能不只有一个组件调用，那么这个时候各种地方都需要逐一修改，极度不方便后期维护，所以我们需要把这些type值提取成公共部分来使用
- 在store文件夹内新建actionTypes.js

- >  注意：这个文件名是固定的不能随便取

```js
export const TEXT_VAL = "textVal";
export const ARR = "arr";
export const DEL = "del";
```

- > 这里action的type在取名的时候都是大写，这个是一个约定熟成的规则

- 然后在需要调用的地方解构导入对应需要的type值即可

- ```js
  import {TEXT_VAL,ARR,DEL} from '../store/actionTypes'
  //把原来list和reducer中的使用type替换成上面导入的值
  ```

#### 2、把action与dispatch部分提取

- 我们可以看到在list组件中，只要是涉及到修改全局state的方法，内部的语法都是大差不多，都需要创建action执行dispatch

- 在store文件夹中新建actionCreators.js，把之前list组件中用于操作全局state的方法体提取出来\

- ```js
  import store from './';
  export default (type, value) => {
      let action = {
          type,
          value
      };
      store.dispatch(action);
  };
  ```

- 然后在list中导入调用并传入对应的实参

- ```jsx
  //......
  import { TEXT_VAL, ARR, DEL } from '../store/actionTypes';
  import actionCreators from '../store/actionCreators';
  export default class list extends Component {
      //......
      getInputVal(event) {
          actionCreators(TEXT_VAL, event.target.value);
      }
      addItem() {
          actionCreators(ARR);
      }
      delItem(index) {
          actionCreators(DEL, index);
      }
      //......
  }
  ```

## React-redux

- 我们上面所讲的其实可以理解成是原生redux，redux作为全局状态管理是可以应用在很多库开发的前端全局状态管理上，比如JQ，但是这种原生的写法非常麻烦，我们现在通过React-redux对上面的写法进行优化
- 我们现在先新建react项目，通过原生redux实现一个简单的累加过程

- 新建好的react项目我们先做以下操作：

  - src文件夹下面只保留App.js和index.js，其他全部删掉
  - 把index.js内部引入的已经被删除的文件导入和调用都删除掉，把严格模式的标签也删除掉
  - 把App.js中的代码全部删除，替换成类式组件代码

- 安装原生redux的方式把创建好store

- 新建reducer.js

- ```jsx
  //设置全局状态（全局数据）
  const defaultState = {
      num: 20
  };
  //导出reducer函数（操作全局数据的方法）
  export default (state = defaultState, action) => {
      let newState = JSON.parse(JSON.stringify(state));
      switch (action.type) {
          case value:
              break;
          default:
              break;
      }
      return newState;
  };
  ```

- 在store内新建index.js

- ```jsx
  import { createStore } from "redux";
  import reducer from "./reducer";
  //创建store实例，并让redux开发工具捕获到实时的全局状态
  const store =createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())
  //导出store
  export default store
  ```

- 新建views文件夹创建一个Page1.js当做调用操作全局状态num的组件实现累加

```jsx
import React, { Component } from 'react';
import store from '../store'; //导入store实例
export default class Page1 extends Component {
    constructor(props) {
        super(props);
        //将全局状态导入到Page组件的state中
        this.state = store.getState();
    }
    //制作修改全局状态的方法
    toAdd() {
        //根据action的type值来决定reducer函数内部执行哪种操作修改全局状态
        let action = {
            type: "toAdd"
        };
        //将action派发给全局状态
        store.dispatch(action);
    }
    render() {
        return (
            <div>
                <p>{this.state.num}</p>
                <button onClick={this.toAdd.bind(this)}>按钮</button>
            </div>
        );
    }
}
```

