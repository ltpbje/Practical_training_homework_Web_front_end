import React, { useCallback, useEffect, useRef, useState } from 'react';

function Test() {
    const conutRef = useRef(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        setInterval(() => {
            console.log(conutRef.current);

        }, 1000);
    }, []);
    const changeCount = useCallback(() => {
        // setCount(count + 1);
        setCount(++conutRef.current);
        // conutRef.current++;
    });
    return (
        <div>
            <h2>count:{conutRef.current}</h2>
            <button onClick={changeCount}>按钮</button>
        </div>

    );
}

export default Test;