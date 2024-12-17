import React, { useState } from 'react'

//创建子组件child设置形参props接收父组件传入的数据与方法
function Child  (props)  {
    return (
        <>
          <p>我是child</p>
          <h2>{props.num}</h2>
          <button onClick={()=>props.changeNum(20)}>按钮</button>
        </>
    )  
}

export default function Func() {
    const [num, setNum] = useState(10);
    const changeNum = (val) => {
      setNum(num + val)
    }
    // const changeNum = val => setNum(num + val);
    // const changeNum = val => {
    //     return ()=> setNum(prev=> prev+val)
    // }
  return (
    <div>
          <h2>
            {num}
          </h2>

          <button onClick={() => changeNum(10)}>按钮</button>
          {/* <button onClick={changeNum(10)}>按钮</button> */}
          {/* <button onClick={changeNum.bind(this,10)}>按钮</button> */}
          
          <Child num={num} changeNum={changeNum }></Child>
    </div>

  )
}
