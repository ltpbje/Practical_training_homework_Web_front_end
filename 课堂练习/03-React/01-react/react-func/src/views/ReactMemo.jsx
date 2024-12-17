import React, { useMemo, useState } from 'react';

export default function ReactMemo() {

    const [strFather, setStrFather] = useState('father');
    const [strSon, setStrSon] = useState('son');
    let newStrFather = useMemo(() => strFather, [strFather]);
    return (
        <div>
            <h2>我是父组件的 strFather : {strFather}</h2>
            <button onClick={() => setStrFather(val => val + 'Component')}>修改strFather</button>
            <hr />
            <Son strSon={strSon}></Son>
        </div>
    );
}

const Son = React.memo(props => {
    return (
        <>
            {console.log('子组件更新了')}
            <h2>我是子组件:{props.strSon}</h2>
        </>

    );
});