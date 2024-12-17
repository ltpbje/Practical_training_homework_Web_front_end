import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            Home
            {/*  渲染子路由组件 */}
            <Outlet></Outlet>
        </div>
    );
}
