import React, { useReducer } from 'react'

export default function Reducer() {
    //通过useReducer创建一个数据管理器，并把修改方法和需要管理的数据作为参数传入
    //该方法会一个数组，我们通过解构取值 获取到管理器中的数据state和派发修改欣慰的dispatch方法
    const changeNum = () => {
        let action = {
            type: 'num',
            value:10
        }
        dispatch(action)       
    }
    let [state, dispatch] = useReducer(stateReducer, {num:10})
  return (
      <div>
          <h2>{state.num}</h2>
          <button onClick={changeNum}>按钮</button>
    </div>
  )
}


const stateReducer = (state,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'num':
            newState.num += action.value;
            break;
        default:
            break;
    }
    return newState;
}