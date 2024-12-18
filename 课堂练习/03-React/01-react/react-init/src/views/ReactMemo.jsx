import React, { useMemo, useState } from 'react';

export default function ReactMemo() {

    const [strFather, setStrFather] = useState('father');
    const [strSon, setStrSon] = useState([1, 2, 3, 4]);
    let newStrFather = useMemo(() => strFather, [strFather]);
    const changeStrSon = () => {
        setStrSon([...strSon, 5]);
        console.log(strSon);

    };
    return (
        <div>
            <h2>我是父组件的 strFather : {newStrFather}</h2>
            <button onClick={() => setStrFather(val => val + 'Com')}>修改strFather</button>
            <button onClick={changeStrSon}>修该strSon</button>
            <hr />
            <Son strSon={strSon}></Son>
        </div>
    );
}

const Son = React.memo(props => {
    const { strSon } = props;
    return (
        <>
            {console.log('子组件更新了')}
            <h2>我是子组件渲染的列表</h2>
            {
                strSon.map((item, index) => <div key={index}>{item}</div>
                )
            }
        </>

    );
});