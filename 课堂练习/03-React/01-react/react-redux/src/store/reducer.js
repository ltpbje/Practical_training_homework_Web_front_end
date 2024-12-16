//reducer文件中只负责两件事
// 1、声明默认状态
//2、导出一个修改状态的函数
//defaultState默认全局状态
// import { ARR, DEL, TEXT_VAL } from "./actionType";
const defaultState = {
    num: 20
};
//导出reducer函数（操作全局数据的方法）
export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'toAdd':
            newState.num++;
            break;
    }
    return newState;
};