import React, { startTransition, useEffect, useState } from 'react';

function Trasition() {
    const [first, setFirst] = useState('a');
    const [second, setSecond] = useState('b');
    const changeValue = () => {
        setFirst('zhangsan');
        startTransition(() => {
            setSecond('lisi');
        });
    };
    useEffect(() => {
        console.log(first, second);

    }, [first]);
    return (
        <div>
            <button onClick={changeValue}>按钮</button>

        </div>
    );
}

export default Trasition; 