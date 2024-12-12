//BrowserRouter是一个路由组件（路由管理对象），还组件自带history模式，还有一个HashRouter，自带hash模式
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../views/Home/Home";
import About from "../views/About/About";
import Shops from '../views/Home/shops/Shops';
import Order from '../views/Home/order/Order';

const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={() => (
                    <Home>
                        <Switch>
                            <Route path='/home/shops' component={Shops}></Route>
                            <Route path='/home/order' component={Order}></Route>
                        </Switch>
                    </Home>
                )}></Route>

                {/* <Route exact path='/home' component={Home}></Route> */}
                <Route path='/about' component={About}></Route>
            </Switch>
        </BrowserRouter >
    );
};


export default Routers;