import React, { memo, useState, useDeferredValue } from 'react';
const fakeDataArr = new Array(10000).fill(1);
const DataList = (({ query }) => {
    console.log('开始渲染');
    return (
        <div>
            {fakeDataArr.map((item, index) => <div key={index}>{query}</div>
            )}

        </div>
    );
});


const MemoDataList = memo(DataList);

const TrasitionDemo = () => {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);//把修改好的状态延迟1秒更新
    const changeTransition = e => {
        setQuery(e.target.value);
    };
    return (
        <div>
            <input type="text" onChange={changeTransition} />
            <MemoDataList query={deferredQuery}></MemoDataList>
        </div>
    );
};

export default TrasitionDemo;