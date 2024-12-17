import Home from "../views/Home";
import My from "../views/My";
import Comp404 from "../views/Comp404";
import Order from "../views/Order.jsx";
import Search from "../views/Search";
import Shops from "../views/Shops";
import { Navigate } from "react-router-dom";
const routers = [
    {

        path: '/',
        element: <Navigate to='/home/shops'></Navigate>
    },
    {
        path: '/',
        element: <Home ></Home>,
        children: [
            {
                path: '/home/order',
                element: <Order></Order>
            },
            {
                path: '/home/search',
                element: <Search></Search>
            },
            {
                path: '/home/shops',
                element: <Shops></Shops>
            },
        ]
    },
    {

        path: '/my',
        element: <My></My>
    },
    {

        path: '*',
        element: <Comp404></Comp404>
    },
];


export default routers;