import React from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function Shops() {
    const location = useLocation();
    console.log(location);

    const params = useParams();
    console.log(params);

    const [search, setSearch] = useSearchParams(); //类似useState返回search参数与一个修改search参数的方法
    const navigate = useNavigate();
    const pushSearch = () => {
        setSearch({
            id: 2,
            userName: 'lisi'
        });
        navigate(`/home/search${window.location.search}`);
    };
    console.log(search.get('id'));


    return (
        <div>
            shops
            <button onClick={pushSearch}>跳转到search</button>
        </div>

    );
}
