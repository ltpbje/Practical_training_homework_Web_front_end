import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Order() {
    const navigate = useNavigate();//调用useNavigate返回一个跳转方法
    const pushShops = () => {
        navigate('/home/shops');
    };
    const pushSearch = id => {
        navigate(`/home/shops?id=${id}`); //search传参，直接以键值对的形式写在跳转路径？的后面         
    };
    const pushParams = id => {
        navigate(`/home/shops/${id}`); //params传参，注意要在路由中声明接收params参数        
    };
    const pushState = () => {
        navigate(`/home/shops`, {
            state: {
                id: 1,
                name: 'zhangsan'
            }
        });
    };
    // const replacePage = () => {
    //     navigate('/home/shops', { replace: true });
    // };
    // const backPage = () => {
    //     navigate(-1);
    // };
    return (
        <div>
            order
            <button onClick={pushShops}>跳转到shops</button>
            <button onClick={() => pushSearch(5)}>search跳转</button>
            <button onClick={() => pushParams(5)}>Params跳转</button>
            <button onClick={() => pushState()}>State跳转</button>
        </div>

    );
}
