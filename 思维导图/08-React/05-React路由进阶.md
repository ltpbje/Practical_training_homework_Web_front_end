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

  