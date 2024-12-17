import Home from "../views/Home";
import My from "../views/My";
import Comp404 from "../views/Comp404";
import Order from "../views/Order.jsx";
import Search from "../views/Search";
import Shops from "../views/Shops";
import { Navigate } from "react-router-dom";
import Login from "../views/Login.jsx";
const routers = [
    {

        path: '/',
        auth: false,
        element: <Navigate to='/home/shops'></Navigate>
    },
    {
        path: '/',
        element: <Home ></Home>,
        children: [
            {
                path: '/home/order',
                auth: true,
                element: <Order></Order>
            },
            {
                path: '/home/search',
                auth: false,
                element: <Search></Search>
            },
            {
                path: '/home/shops',
                auth: false,
                element: <Shops></Shops>
            },

        ]
    },
    {

        path: '/my',
        auth: false,
        element: <My></My>
    },
    {

        path: '*',
        auth: false,
        element: <Comp404></Comp404>
    },
    {
        path: '/login',
        auth: false,
        element: <Login></Login>

    }
];


export default routers;