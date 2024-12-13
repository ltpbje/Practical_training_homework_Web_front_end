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