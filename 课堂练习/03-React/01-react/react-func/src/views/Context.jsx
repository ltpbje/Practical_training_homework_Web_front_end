import React, { createContext, useContext, useState } from 'react'

//第一步：创建上下文环境空间 这个函数的执行会返回一个组件  所以我们的常量名会作为组件名使用  首字母大写
const ContextMsg = createContext();
const Btn = props => {
       const {str,setStr} = useContext(ContextMsg);
    return (
        <>
            <button onClick={() => setStr({
                ...str,
                userName: 'lisi',
            })}>按钮</button>
        </>
        )
}


const Son = () => {
    // 第三步：在后代组件中通过useContext 从执行的上下文环境中调出数据使用
   const {str,setStr} = useContext(ContextMsg);
    return (
        <>
            <p>我是Son我叫 { str.userName}我今年{ str.age}</p>
        </>
    )
}


export default function Context() {
   const [str, setStr] = useState({
        userName: 'zhangsan',
        age: 18
   }) 
  //第二步：在父组件中调用上下文环境组件中的Provider提供器   通过其value属性向上下文环境中提供数据
  //将状态和方法通过ES6的语法打包成一个匿名对象，传入到上下文环境中
  return (
    <ContextMsg.Provider value={{str,setStr}}>
        <div>
              <Son></Son>
              <Btn></Btn>
        </div>
          
    </ContextMsg.Provider>
  )
}
