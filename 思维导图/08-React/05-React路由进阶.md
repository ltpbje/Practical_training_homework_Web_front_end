# React路由进阶

- 之前我们讲过react-router-dom@5的使用，现在我们来同v6版本来学习一些关于路由进阶知识

- 安装依赖包

- ```cmd
  npm i --save react-router-dom@6
  ```

  

## 1、路由组件

- 之前我们在v5的版本中创建路由的时候使用的组件，在v6版本中一些组件被替换了在v5版本中：
  - BroswerRouter：路由管理组件，决定路由模式（history模式）
  - Switch：路由切换组件，根据浏览器地址栏来决定需要切换到哪个ruote
  - Route：单体路由组件，与vue中的路由单体对象作用一致，用来设置具体的跳转路径和对应渲染的组件
- 在v6版本中：
  - BroswerRouter：使用方式不变
  - V5中的Switch组件被替换成Routes
  - Route的使用不变，但是原来component与render属性，统一替换成element属性

## 2、使用路由表动态渲染路由组件

- 所谓路由表其实就是相当于是我们之前在vue中创建路由管理对象时，作为参数传入的存放了路由单体对象的数组，在react中，我们可以通过路由表来动态创建我们的路由组件
- 新建routers目录，创建index.js

```jsx
import Home from "../views/Home";
import My from "../views/My";
import Comp404 from "../views/Comp404";
const routers = [
    {
        title: "首页",
        path: "/",
        component: Home
    },
    {
        title: "我的",
        path: "/my",
        component: My
    },
    {
        title: "404",
        path: "",
        component: Comp404
    }
];
export default routers;
```

- 新建router.js，导入路由表动态渲染路由组件

- ```js
  import routers from "./";
  import { BrowserRouter as Router, Routes, Route } from "reactrouter-dom";
  const AppRouter = () => {
      return (
          <Router>
              <Routes>
                  {
                      routers.map((item, index) => {
                          return (
                              <Route
                                  path={item.path}
                                  key={index}
                                  element={<item.component />} />
                          );
                      })
                  }
              </Routes>
          </Router>
      );
  };
  export default AppRouter
  
  ```

  

## 3、使用hook函数渲染路由

- react-router-dom提供了自己定义的useRoutes方法，只需要将路由表作为参数传入就可以将渲染好的路由组件返回出来
- 新建路由表，添加二级路由

```jsx
import Home from "../views/Home";
import My from "../views/My";
import Comp404 from "../views/Comp404";
import Order from "../views/order";
import Search from "../views/search";
import Shops from "../views/shops";
import { Navigate } from "react-router-dom";
const routers = [
    {
        path: "/",
        element: <Navigate to="/home/shops" /> //重定向
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                path: "/home/order",
                element: <Order />
            },
            {
                path: "/home/search",
                element: <Search />
            },
            {
                path: "/home/shops",
                element: <Shops />
            }
        ]
    },
    {
        path: "/my",
        element: <My />
    },
    {
        path: "*",
        element: <Comp404 />
    }
];
export default routers;
```

- 在router.js文件中

- ```jsx
  import routers from "./";
  import { BrowserRouter as Router, useRoutes } from "react-routerdom";
  const AppRouter = () => {
      const GetRouter = () => useRoutes(routers);
      //直接调用useRoutes将路由表作为参数传入返回动态生成的路由组件
      return (
          <Router>
              <GetRouter />
          </Router>
      );
  };
  export default AppRouter;
  ```

- 这里我们针对home路由下面嵌套的二级路由，还需要配合Outlet组件渲染其二级路由的页面渲染窗口\

- home.jsx

- ```JSX
  import React from 'react';
  import { Outlet } from 'react-router-dom';
  export default function Home() {
      return (
          //这里的Outlet组件的作用就与之前的类组件中{this.props.children}作用一致
          <div>
              <h2>我时home</h2>
              <Outlet></Outlet>
  
          </div>
      );
  }
  ```

  - > 注意事项：
    >
    > - 使用useRoutes时一定记得要包在一个函数内使用，作为该函数的返回值使用
    > - 如果使用的是useRoutes生成的路由，其中如果包含了路由嵌套，必须要使用Outlet组件指定二级页面的窗口

## 4、useNavigate实现跳转

- useNavigate是react-router-dom V6提供的一个新的用于路由跳转的hook函数

- > - v4版本中，我们使用withRouter导出组件既可以在组件的props调出history对象来实现路由跳转
  > - v5版本中，提供了一个hook函数叫做useHistory，相当于直接省略了withRouter的导出，直接可以在组件内调出history对象来实现编程式导航跳转
  > - v6版本中，提供了useNavigate来替换useHistory的使用

- 举例：

- ```jsx
  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  export default function Order() {
      const navigate = useNavigate(); //调用useNavigate返回一个跳转方法;
      const pushShops = () => {
          navigate("/home/shops");
      };
      return (
          <div>
              <h2>orders</h2>
              <button onClick={pushShops}>跳转shops</button>
          </div>
      );
  }
  ```

  - 我们之前使用方法跳转的时候，都是从history中push、replace、back这三个方法来实现不同需要的跳转，而useNavigate将这三种方法全部合并成其返回的一个方法，需要通过传参的方式来实现

  - 举例：通过useNavigate 实现 push、replace、back

- ```jsx
  const navigate = useNavigate();
  
  //push实现
  const pushPage = () => {
      navigate("/home/shops");
  };
  //replace实现
  const replacePage = () => {
      navigate("/home/shops", { replace: true });
  };
  //back实现
  const backPage = () => {
      navigate(-1);
  };
  ```

## 5、useNavigate跳转携带参数

- 之前我们在将react路由的时候说过，我们有三种跳转带参的方式，分别是search、params、state，现在我们通过useNavigate来实现

- ```jsx
  const pushSearch = id => {
      navigate(`/home/shops?id=${id}`); //search传参，直接以键值对的形式写在跳转路径？的后面;
  };
  const pushParams = id => {
      navigate(`/home/shops/${id}`); //params传参，注意要在路由中声明接收params参数--path: "/home/shops/:id";
  };
  const pushState = () => {
      navigate(`/home/shops`, {
          state: {
              id: 1,
              name: 'zhangsan'
          }
      });
  };
  ```

  

- > ##### 注意：useNavigate只能在函数组件中使用

## 6、获取地址栏参数

- `使用不同方式传递的参数，需要使用对应的hook函数来获取
- useSearchParams： 获取search参数
- useParams： 获取params参数
- useLocation： 获取state参数

### 6.1、useSearchParams

- ```jsx
  import React from 'react';
  import { useSearchParams, useNavigate } from 'react-router-dom';
  export default function Shops() {
      const [search, setSearch] = useSearchParams(); //类似useState返
      回search参数与一个修改search参数的方法;
      console.log(search.get("id"));
      const navigate = useNavigate();
      const pushSearch = () => {
          setSearch({
              id: 2,
              userName: "lisi"
          });
          navigate(`/home/search${window.location.search}`);
      };
      return (
          <div>
              <h2>shops</h2>
              <button onClick={pushSearch}>跳转search</button>
          </div>
      );
  }
  ```

  

- > 代码分析：
  >
  > useSearchParams会返回一个数组，数组中的第一个元素就是我们BOM中的searchParams对象，所以我们可以从中调出get方法来获取实际的search参数值
  >
  > 第二个数组元素是一个用于修改地址栏search参数的方法，我们可以通过该方法来设置跳转时需要传入的search参数，以上面为例，我们在跳转到search的页面通过setSearch方法设置了id和userName这两个search参数，然后我们通过原生的location对象调出设置好的search参数拼接到跳转路径上从而实现地址栏search传参
  >
  > 注意 ：
  >
  > 这里的locaiton一定要带上window，不然react会报错

### 6.2、useParams

- ```jsx
  //在跳转的目标页面中导入useParams直接调用，就可以返回params的参数
  const params = useParams();
  console.log(params.id)
  ```

  

### 6.3、useLocation

- ```jsx
  let location = useLocation();
  console.log(location) //数据都在location的state属性中
  ```

  

- > 这个hook返回的对象中，除了state之后，还有其它的一些
  >
  > - pathname：浏览器地址栏的路径
  > - search：通过search方式传入的参数
  > - hash：地址栏#后面的部分
  > - state：通过state方式传入的参数
  > - key：一个随机字符串
  >
  > 注意：useLocation不要再组件的方法内调用，会报错

## 7、react路由守卫

- 在vue中我们通过路由管理对象调出一个beforeEach方法，通过该方法的参数调出跳转的路由单体中我们事先设置好的一些路由相关的元信息，通过这些元信息来进行判断决定是否可以执行next进行跳转，而react中这个过程我们全程手动编辑
- 现在我们需要自己手动来渲染路由，最好就不好使用useRoutes，通过map方法便利路由表，在遍历的过程中根据路由表中设置的一些类似vue中meta对象中设置的属性来决定生成的路由单体组件如何实现跳转
- 举例：
- 现在我们来模拟一个登录，根据登录与否来决定是否可以跳转到目标页面，如果没登录直接重定向到登录页面
- 现在在路由表中添加一个Login页面

```jsx
import Home from "../views/Home";
import My from "../views/My";
import Comp404 from "../views/Comp404";
import Order from "../views/Order";
import Search from "../views/Search";
import Shops from "../views/Shops";
import Login from "../views/Login";
import { Navigate } from "react-router-dom";
const routers = [
    {
        path: "/",
        auth: false,
        element: <Navigate to="/home/shops" /> //重定向
    },
    {
        path: "/home",
        auth: false,
        element: <Home />,
        children: [
            {
                path: "/home/order",
                auth: true,
                element: <Order />
            },
            {
                path: "/home/search",
                auth: false,
                element: <Search />
            },
            {
                path: "/home/shops/:id",
                auth: false,
                element: <Shops />
            }
        ]
    },
    {
        path: "/my",
        auth: false,
        element: <My />
    },
    {
        path: "*",
        auth: false,
        element: <Comp404 />
    },
    {
        path: "/login",
        auth: false,
        element: <Login />
    }
];
export default routers;
```

- > 注意：
  >
  > 这里每个子路由都添加了一个auth属性，这个可以理解成当前页面在跳转浅是
  >
  > 否检测登录状态，false为不需要，true为需要，这里我们把order路由设置为
  >
  > true，表示需要登录才能跳转到该页面，不然直接重定向到登录页面

- 打开router.js进行修改，通过map遍历的方法渲染路由组件

```jsx
import routers from "./";
import { Navigate, useLocation, Route, Routes } from "react-router-dom";
const AppRouter = () => {
    const location = useLocation();
    const { pathname } = location;
    let isLogin = false; //表示是否有登录
    const RouteNav = router => {
        return (
            router.map(item => {
                return (
                    <Route
                        path={item.path}
                        element={item.path === pathname &&
                            item.auth && !isLogin ? <Navigate to='/login'></Navigate> :
                            item.element}
                        key={item.path}
                    >
                        {
                            item.children &&
                            RouteNav(item.children)
                        }
                    </Route>
                );
            })
        );
    };
    return (
        <Routes>
            {
                RouteNav(routers)
            }
        </Routes>
    );
};
export default AppRouter;
```

- > 代码分析：
  >
  > 之前我们就讲过，react中的路由其实本质就时一个react函数组件，所以我们
  >
  > 可以在路由组件的内部创建状态和方法，这里我们先通过useLocation获取当前
  >
  > 用户跳转的页面地址，然后通过RouteNav的递归调用生成路由
  >
  > 关键点：
  >
  > RouteNav方法，这个是在路由组件中声明一个方法，该方法的主要目的就
  >
  > 是当我们的路由包含嵌套路由的时候，我们可以通过递归的方式实现路由
  >
  > 组件的动态渲染
  >
  > 递归渲染中在route提供的element属性上，我们执行了一个三元运算，判
  >
  > 断条件是执行一个逻辑与运算，这个逻辑与运算我们写了三个用于判断的
  >
  > 表达式：
  >
  > 1、执行逻辑当每次跳转之后，先获取当前的页面地址判断是否与当前
  >
  > 路由指向的路径一致，这步判断主要是为了能够执行404页面的跳转
  >
  > 2、判断当前遍历项中的auth属性，这里我们直接设置的true或者
  >
  > false，作用就是表示当前路由在跳转时是否需要做鉴权，上面的例子
  >
  > 上我们对order页面设置了true，所以当跳转这个页面的会进行鉴权
  >
  > 3、第三个非运算其实也是为了做鉴权，这里执行的是一个登录有否的
  >
  > 判断，根据isLogin的值来决定是否已经登录，如果没登录同时第二个
  >
  > 判断又是true的情况下就需要重定向到login页面
  >
  > 如果以上的逻辑与运算过程中，某一个结果为false就会立即触发逻辑运算
  >
  > 的熔断机制，直接渲染item.element

- 最后在入口文件中render渲染组件

- ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter as Router } from 'react-router-dom';
  import AppRouter from './routers/router';
  const root =
      ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <Router>
          <AppRouter></AppRouter>
      </Router>
  );
  ```

  - > 注意事项：
    >
    > 这里我们千万不要把BrowserRouter直接写在路由组件的内部，因为我们在路
    >
    > 由组件中使用hook函数useLocation，而这个hook函数不能直接在路由组件的
    >
    > 内部使用，所以我们需要像上面这样，单独调用BrowserRouter，先让其在程
    >
    > 序中程序上下文环境，再在该上下文环境中渲染路由

- 按照上面的写法，我们只需要在登录与未登录时，去修改isLogin的值即可实现登录跳转的鉴权操作，我们把isLogin放到全局状态当中进行管理

- reducer.js

- ```jsx
  const defaultState = {
      isLogin: false
  };
  export default (state = defaultState, action) => {
      let newState = JSON.parse(JSON.stringify(state));
      switch (action.type) {
          case "changeLoginState":
              newState.isLogin = true;
              break;
          default:
              break;
      }
      return newState;
  };
  ```

  

- index.js

- ```jsx
  import { createStore } from "redux";
  import reducer from "./reducer";
  const store = createStore(reducer);
  export default store
  ```

- 然后我们通过react-redux中提供的Provider提供器，在入口文件向全局提供store实例

- ```jsx
  //......
  import { Provider } from 'react-redux';
  import store from './store';
  const root =
      ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <Provider store={store}>
          <Router>
              <AppRouter></AppRouter>
          </Router>
      </Provider>
  );
  ```

  

- 在router.js中调用connect方法获取isLogin

```jsx
import routers from "./";
import { Navigate, useLocation, Route, Routes } from "react-routerdom";
import { connect } from "react-redux";
const AppRouter = (props) => {
    const location = useLocation();
    const { pathname } = location;
    const { isLogin } = props;
    //......
    return (
        <Routes>
            {
                RouteNav(routers)
            }
        </Routes>
    );
};

const mapStateToProps = state => { //映射全局状态isLogin
    return {
        isLogin: state.isLogin
    };
};
export default connect(mapStateToProps)(AppRouter);
```

- 在login组件中设置映射派发修改行为的方法dispatch，用来修改isLogin的值，模拟登录成功

```jsx
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Login(props) {
    const navigate = useNavigate();
    const checkLogin = () => {
        props.changeLoginState();
        navigate(-1);
    };
    return (
        <div>
            <h2>login</h2>
            <button onClick={checkLogin}>登录</button>
        </div>
    );
}
const mapStateToProps = state => { //映射全局状态isLogin
    return {
        isLogin: state.isLogin
    };
};
const mapDispatchToProps = dispatch => {
    return {
        changeLoginState() {
            let action = {
                type: "changeLoginState"
            };
            dispatch(action);
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
```

# React高阶组件

- 所谓组件的进阶用法就是通过函数来返回组件，这种用法主要起到的就是组件复用的作用，这种组件我们也可以叫做高阶组件（HOC）
- 举例：
- 这里我们通过类组件来说明情况，我们这里有两个类组件，其内部有部分内容是相似或者完全一样，这个时候，根据我们以前学习过的封装思维，将公共的部分提取出来进行封装来提高代码的复用率
- 现在有如下代码：

- > 有Son1和Son2两个子组件在Hoc父组件当中渲染，两个子组件有相同的
  >
  > state，相同的需要渲染的标签结构，还有相同的changeData方法，但是修改
  >
  > 的state的值是不一样的

```jsx
import React, { Component } from 'react';
class Son1 extends Component {
    state = {
        userName: "zhangsan"
    };
    changeData() {
        this.setState({
            userName: "lisi"
        });
    }
    render() {
        return (
            <div>
                <h2>子组件1：{this.state.userName}</h2>
                <button onClick={this.changeData.bind(this)}>子组
                    件1按钮</button>
            </div>
        );
    }
}
class Son2 extends Component {
    state = {
        userName: "zhangsan"
    };
    changeData() {
        this.setState({
            userName: "wangwu"
        });
    }
    render() {
        return (
            <div>
                <h2>子组件2：{this.state.userName}</h2>
                <button onClick={this.changeData.bind(this)}>子组
                    件2按钮</button>
            </div>
        );
    }
}
export default class Hoc extends Component {
    render() {
        return (
            <div>
                <Son1></Son1>
                <hr />
                <Son2></Son2>
            </div>
        );
    }
}
```

- > 以上的代码，有很多相同的部分，那么我们是不是可以把公共的部分提取出来
  >
  > 进行二次封装提升代码的复用率

- 对以上代码做修改：

```jsx
import React, { Component } from 'react';
class Son1 extends Component {
    render() {
        return (
            <div>
                <h2>子组件1：{this.props.userName}</h2>
                <button onClick=
                    {this.props.changeData.bind(this)}>子组件1按钮</button>
            </div>
        );
    }
}
class Son2 extends Component {
    render() {
        return (
            <div>
                <h2>子组件2：{this.props.userName}</h2>
                <button onClick=
                    {this.props.changeData.bind(this)}>子组件2按钮</button>
            </div>
        );
    }
}
const HOCfunc = (newName, Comp) => {
    return class extends Component {
        state = {
            userName: "zhangsan"
        };
        changeData() {
            this.setState({
                userName: newName
            });
        }
        render() {
            return (
                <Comp userName={this.state.userName} changeData=
                    {this.changeData.bind(this)}></Comp>
            );
        }
    };
};
let Child1 = HOCfunc("lisi", Son1);
let Child2 = HOCfunc("wangwu", Son2);
export default class Hoc extends Component {
    render() {
        return (
            <div>
                <Child1></Child1>
                <hr />
                <Child2></Child2>
            </div>
        );
    }
}
```

- > 代码分析：
  >
  > 把Son1和Son2中的state和changeData这两个部分提取出来，单独封装在了另
  >
  > 外一个类组件当中，这个类组件作为一个匿名类组件写在HOCfunc这个函数组
  >
  > 件的返回值上，当我们调用HOCfunc，就会把这个匿名类组件返回出来，并且
  >
  > 根据函数组件传入的参数来决定返回的组件中的之前没提取出来封装之前的不
  >
  > 同的地方
  >
  > 其中比较有特点就是Comp参数，这个参数我们这里设定的是接收组件作为实
  >
  > 参，这个每次调用的时候可以传入不同的组件作为HOCfun返回组件的子组件
  >
  > 使用，其实就相当于是决定了匿名组件自身的标签结构
  >
  > 这里的代码逻辑，其实与我们最早学习的构造函数如出一辙，通过new调用一
  >
  > 个构造函数来实例化一个基于该构造函数为模板的对象出来和这里通过调用
  >
  > HOCfunc返回一个基于该函数返回的类结构的一个类组件基本思路是一样的

# 组件懒加载

- > React实现懒加载需要使用以下两个东西：
  >
  > 1、React.lazy() 在lazy方法内传入一个回调函数，在回调函数内通过
  >
  > import("xxxxx")导入组件，lazy方法就会把你通过import导入的组件包装成一个懒
  >
  > 加载组件返回出来
  >
  > 2、 `<Suspense></Suspense>` 在调用懒加载组件的时候需要给它嵌套一个
  >
  > Suspense组件，然后通过其属性fallback设置一个在懒加载过程中需要显示的过渡
  >
  > 内容
  >
  > 举例：
  >
  > 新建一个components目录，在这里创建一个child.jsx，作为懒加载组件使用

- ```jsx
  import React, { Component } from 'react';
  export default class Child extends Component {
      render() {
          return (
              <div>
                  <h2>我是一个懒加载组件</h2>
              </div>
          );
      }
  }
  ```

  - > 把这个组件做成一个懒加载组件是在把它导入到另外一个组件的时候通过React.lazy
    >
    > 方法来实现

  - ```jsx
    import React, { Component, Suspense } from 'react';
    const Child = React.lazy(() => import('../components/Child'));
    export default class LazyLoad extends Component {
        render() {
            return (
                <div>
                    <Suspense fallback={<div>loading.....</div>}>
                        <Child></Child>
                    </Suspense>
                </div>
            );
        }
    }
    ```

    

- > 最后把这个LazyLoad组件导入到App根组件当中进行渲染，我们可以通过浏览器的
  >
  > 性能来查看结果

- > 备注：
  >
  > 我们可以把fallback的值直接写成一个专门的loading动画组件

# React Hooks的闭包陷阱

- 先看一个例子

- ```jsx
  import React, { useState, useEffect } from 'react';
  export default function Test() {
      const [count, setCount] = useState(0);
      useEffect(() => {
          setInterval(() => {
              console.log(count);
          }, 1000);
      }, []);
      const changeCount = () => {
          setCount(count + 1);
      };
      return (
          <div>
              <h2>count值：{count}</h2>
              <button onClick={changeCount}>按钮</button>
          </div>
      );
  }
  ```

- > ###### 代码分析：
  >
  > 现在我们会发现，我们点击按钮执行count+1的操作，页面上渲染的结果没有
  > 问题，但是在控制台里面面一致打印的都是0，这里其实就是闭包带来的问题
  > 这里我们分析两个问题：
  >
  > ###### 问题1：当我们点击按钮执行setCount(count + 1)之后发生了什么？
  >
  > 之前我们在将hook函数的时候说过，函数组件内的状态发生变化的时候会将整
  > 个组件重新渲染一遍，也就是相当于重新把作为组件的函数重新执行一遍，而
  > 函数组件本质就是一个函数，而在函数内创建的状态其本质就是一个局部变
  > 量，那么随着函数执行完毕，局部变量就被自然销毁释放掉，所以，我们认为
  > 每次的重新渲染创建的状态都是一个全新的count，与上一次执行的count是没
  > 有什么关系的
  >
  > ###### 问题2：闭包带来的影响？
  >
  > 闭包其实简单解释就是上级作用域内的变量被下及作用域引用，而导致无法被
  > 释放，必须要等到下级作用域执行完毕才能被正常释放掉，但是这里，我们使
  > 用setInterval在内部调用了test组件的状态（test函数的局部变量），而
  > setInterval如果要执行完毕必须要使用clearInterval，所以导致在setInterval内
  > 部调用的状态一致都无法被释放掉，从而反复调用的都是第一次执行时创建的
  > count值

- 解决方案：使用useRef

```jsx
import React, { useState, useEffect, useRef } from 'react';
export default function Test() {
    const countRef = useRef(0);
    useEffect(() => {
        setInterval(() => {
            console.log(countRef.current);
        }, 1000);
    }, []);
    const changeCount = () => {
        countRef.current++;
    };
    return (
        <div>
            <h2>count值：{countRef.current}</h2>
            <button onClick={changeCount}>按钮</button>
        </div>
    );
}
```

- > 代码分析：
  >
  > 这里我们借鉴了类组件中的this的特点，因为this的指向在组件的生命周期中是
  >
  > 不变的，所以它永远都会指向当前的类组件自身，而useRef我们之前只用在获
  >
  > 取DOM对象上面，而对象也是一种数据结构，我们平时也会用useState创建对
  >
  > 象结构的状态来使用，我们通过将useRef创建出来的数据赋值给countRef完成
  >
  > 了数据的引用，也就是说仙子啊的countRef只会指向useRef创建出来的数据，
  >
  > 让countRef和useRef创建出来的数据形成了映射关系，从而达到你变我也变的
  >
  > 效果

- > 但是组件渲染到页面上的内容不会变化，因为 countRef.current的改变并不会引起
  >
  > 函数组件的重新渲染，所以需要配合useState使用

- ```jsx
  import React, { useState, useEffect, useRef } from 'react';
  export default function Test() {
      const countRef = useRef(0);
      const [count, setCount] = useState(0);
      useEffect(() => {
          setInterval(() => {
              console.log(countRef.current);
          }, 1000);
      }, []);
      const changeCount = () => {
          setCount(++countRef.current);
      };
      return (
          <div>
              <h2>count值：{countRef.current}</h2>
              <button onClick={changeCount}>按钮</button>
          </div>
      );
  }
  ```

  

- > 代码分析：
  >
  > 通过将每次递增计算的结果通过setCount再赋值给countRef.current，现在我
  >
  > 们就可以看到组件的内容与打印结果是一致的了，同时我们可以把
  >
  > changeCount通过useCallback进行缓存，避免每次修改count重新执行Test组
  >
  > 件的时候，还要再创建一个遍changeCount
  >
  > ```jsx
  > const changeCount = useCallback(() => {
  >     setCount(++countRef.current)
  > })
  > ```
  >
  > 
