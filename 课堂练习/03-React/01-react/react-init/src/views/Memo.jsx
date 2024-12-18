import React, { useMemo, useState } from 'react';

export default function Memo() {
    const [obj, setObj] = useState({
        filterStr: '',
        inputStr: '',
        list: [
            {
                id: 1,
                userName: 'zhangsan1'
            },
            {
                id: 2,
                userName: 'zhangsan2'
            },
            {
                id: 3,
                userName: 'zhangsan3'
            },
        ]
    });
    const changeInputStr = (e) => {
        setObj({
            ...obj,
            inputStr: e.target.value
        });

    };

    //现在我们创建一个用于筛选1ist数组的一个方法，将筛选之后的新数组在页面上渲染
    const changeList = (str) => {
        console.log(1);

        return obj.list.filter(item => {
            if (item.userName.includes(str)) {
                return item;
            }
        });
    };
    let newList = useMemo(() => changeList(obj.filterStr), [obj.filterStr]);

    // let newList = changeList(obj.filterStr);
    return (
        <div>
            <input type="text" onChange={e => changeInputStr(e)} value={obj.inputStr} />
            {
                newList.map(item => {
                    return (
                        <div key={item.id}>{item.userName}</div>
                    );
                })
            }
        </div>
    );
}
