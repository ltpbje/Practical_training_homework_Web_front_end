//reducer文件中只负责两件事
// 1、声明默认状态
//2、导出一个修改状态的函数
//defaultState默认全局状态
import { ARR, DEL, TEXT_VAL } from "./actionType";
const defaultState = {
    msg: 'hello',
    arr: ['张三', 'lisi', 'wangwu'],
    textVal: ""
};


export default (state = defaultState, action) => {
    // if (action.type === 'textVal') {
    //     state.textVal = action.value;
    // }
    // else if (action.type === 'arr') {
    //     state.arr.unshift(state.textVal);
    //     state.textVal = '';
    // }
    // else if (action.type === 'del') {
    //     state.arr.splice(action.value, 1);
    // }
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TEXT_VAL:
            newState.textVal = action.value;
            break;
        case ARR:
            newState.arr.unshift(state.textVal);
            newState.textVal = '';
            break;
        case DEL:
            newState.arr.splice(action.value, 1);
            break;
        default:
            break;
    }
    return newState;
};