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