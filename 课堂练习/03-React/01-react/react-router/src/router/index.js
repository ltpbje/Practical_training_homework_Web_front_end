//BrowserRouter是一个路由组件（路由管理对象），还组件自带history模式，还有一个HashRouter，自带hash模式
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../views/Home/Home";
import About from "../views/About/About";
import Shops from '../views/Home/shops/Shops';
import Order from '../views/Home/order/Order';
import Page404 from "../views/page404/Page404";
import App from "../App";
const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={() => (<App>
                    <Switch>
                        <Route path='/about' component={() => (<About></About>)}></Route>
                        <Route path='/home' component={() => (
                            <Home>
                                <Switch>
                                    <Route path='/home/shops' component={Shops}></Route>
                                    <Route path='/home/order' component={Order}></Route>
                                    <Route component={Page404}></Route>
                                </Switch>
                            </Home>
                        )}></Route>


                    </Switch>
                </App>)}></Route>
            </Switch>
        </BrowserRouter >
    );
};


export default Routers;