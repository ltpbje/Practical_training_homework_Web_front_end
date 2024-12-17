import Home from "../views/Home";
import My from "../views/My";
import Comp404 from "../views/Comp404";

const routers = [
    {
        title: "首页",
        path: '/',
        component: Home
    },
    {
        title: "我的",
        path: '/my',
        component: My
    },
    {
        title: "404",
        path: '*',
        component: Comp404
    },
];


export default routers;